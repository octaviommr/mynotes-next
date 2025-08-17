"use server"

import { redirect } from "next/navigation"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { FormActionState } from "@/types/ActionState"
import UserModel from "@/models/User"
import dbConnect from "@/lib/dbConnect"

interface SignUpValidationErrors {
  email?: string
  name?: string
  password?: string
  confirmationPassword?: string
}

export type SignUpActionState = FormActionState<SignUpValidationErrors>

function handleSignUpValidationErrors(
  error?: mongoose.Error.ValidationError,
  confirmationPasswordError?: string,
): SignUpActionState {
  return {
    validationErrors: {
      email: error?.errors["email"]?.message,
      name: error?.errors["name"]?.message,
      password: error?.errors["password"]?.message,
      confirmationPassword: confirmationPasswordError,
    },
  }
}

function validateConfirmationPassword(
  password: string,
  confirmationPassword: string,
): string | null {
  if (!confirmationPassword) {
    return "Confirmation password is required."
  }

  if (password !== confirmationPassword) {
    return "Passwords don't match."
  }

  return null
}

/* 
  Set up the server action called via the "action" attribute when the sign up form is submitted.

  Behind the scenes, this creates a "POST" API endpoint.
*/
export async function signUp(
  prevState: SignUpActionState,
  formData: FormData,
): Promise<SignUpActionState> {
  const { email, name, password, confirmationPassword } = Object.fromEntries(
    formData.entries(),
  )

  // validate confirmation password outside of schema since that field is not part of it
  const confirmationPasswordError = validateConfirmationPassword(
    password as string,
    confirmationPassword as string,
  )

  try {
    await dbConnect()

    // validate input against the schema
    await UserModel.validate({ email, name, password })

    if (confirmationPasswordError) {
      return handleSignUpValidationErrors(undefined, confirmationPasswordError)
    }

    const hashedPassword = await bcrypt.hash(password as string, 10)

    await UserModel.create(
      [{ email, name, password: hashedPassword }],
      { validateBeforeSave: false }, // skip validation since we've already performed it above
    )
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return handleSignUpValidationErrors(
        error,
        confirmationPasswordError ?? undefined,
      )
    }

    /* 
      Handle MongoDB duplicate key errors, since we're using the "unique" option in the schema.
      
      This option is NOT a validator and won't cause a mongoose validation error.
    */
    if (error instanceof mongoose.mongo.MongoError && error.code === 11000) {
      return {
        error: `${email} is already in use.`,
      }
    }

    // log the error
    console.error(error)

    return {
      error: "An unknown error has occurred while signing up.",
    }
  }

  // serve a redirect to the log in page so the user can log in and start using the application
  redirect("/login")
}
