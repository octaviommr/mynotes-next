"use server"

import { isRedirectError } from "next/dist/client/components/redirect"
import { AuthError } from "next-auth"
import mongoose from "mongoose"
import type { FormActionState } from "@/types/ActionState"
import UserModel from "@/models/User"
import dbConnect from "@/lib/dbConnect"
import { signIn } from "@/lib/auth"

interface LogInValidationErrors {
  email?: string
  password?: string
}

export interface LogInActionState
  extends FormActionState<LogInValidationErrors> {
  callbackUrl?: string
}

function handleLogInValidationErrors(
  error: mongoose.Error.ValidationError,
): LogInActionState {
  return {
    validationErrors: {
      email: error?.errors["email"]?.message,
      password: error?.errors["password"]?.message,
    },
  }
}

/* 
  Set up the server action called via the "action" attribute when the log in form is submitted.

  Behind the scenes, this creates a "POST" API endpoint.
*/
export async function logIn(
  prevState: LogInActionState,
  formData: FormData,
): Promise<LogInActionState> {
  const { email, password } = Object.fromEntries(formData.entries())

  try {
    await dbConnect()

    // validate email against the schema
    await UserModel.validate({ email }, ["email"])

    /* 
      Sign in using Auth.js.
      
      If the sign in is successful, redirect the user to either:
      - The last page requiring authentication that was attempted before the user was logged in
      - The note board page if the user accessed the log in page directly
    */
    return await signIn("credentials", {
      email,
      password,
      redirectTo: prevState.callbackUrl ?? "/notes",
    })
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const validationErrors = handleLogInValidationErrors(error)

      return {
        ...validationErrors,
        callbackUrl: prevState.callbackUrl,
      }
    }

    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return {
        error: "Invalid email or password.",
        callbackUrl: prevState.callbackUrl,
      }
    }

    /*
      Re-throw the error triggered by Next.js "redirect" function, which is used by Auth.js to perform a redirect after a
      successful sign-in.
      
      This error is expected and should not be handled here, as it is part of the normal redirect flow.
    */
    if (isRedirectError(error)) {
      throw error
    }

    // log the error
    console.error(error)

    return {
      error: "An unknown error has occurred while logging in.",
      callbackUrl: prevState.callbackUrl,
    }
  }
}
