"use server"

import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import { isRedirectError } from "next/dist/client/components/redirect"
import { AuthError } from "next-auth"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import dbConnect from "./db-connect"
import NoteModel, { NoteDocument } from "../models/Note"
import UserModel from "../models/User"
import { auth, signIn, signOut } from "@/auth"

interface ActionState {
  error?: string
}

export interface FormActionState<T> extends ActionState {
  validationErrors?: T
}

export interface NoteValidationErrors {
  title?: string
}

export interface LogInValidationErrors {
  email?: string
  password?: string
}

export interface LogInActionState
  extends FormActionState<LogInValidationErrors> {
  callbackUrl?: string
}

export interface SignUpValidationErrors {
  email?: string
  name?: string
  password?: string
  confirmationPassword?: string
}

const handleNoteValidationErrors = (
  error: mongoose.Error.ValidationError,
): FormActionState<NoteValidationErrors> => {
  const state: FormActionState<NoteValidationErrors> = {
    validationErrors: { title: error.errors["title"]?.message },
  }

  if (error.errors["userId"]) {
    // handle errors related to user validation as general errors because the user is not a form field
    state.error = error.errors["userId"].reason
      ? "An unknown error has occurred while validating the user."
      : error.errors["userId"].message
  }

  return state
}

const handleLogInValidationErrors = (
  error: mongoose.Error.ValidationError,
): FormActionState<LogInValidationErrors> => {
  return {
    validationErrors: {
      email: error?.errors["email"]?.message,
      password: error?.errors["password"]?.message,
    },
  }
}

const handleSignUpValidationErrors = (
  error?: mongoose.Error.ValidationError,
  confirmationPasswordError?: string,
): FormActionState<SignUpValidationErrors> => {
  return {
    validationErrors: {
      email: error?.errors["email"]?.message,
      name: error?.errors["name"]?.message,
      password: error?.errors["password"]?.message,
      confirmationPassword: confirmationPasswordError,
    },
  }
}

const validateConfirmationPassword = (
  password: string,
  confirmationPassword: string,
): string | null => {
  if (!confirmationPassword) {
    return "Confirmation password is required."
  }

  if (password !== confirmationPassword) {
    return "Passwords don't match."
  }

  return null
}

/* 
  Server actions called by client-side components directly or via the "action" attribute when a form is submitted (behind
  the scenes, these create "POST" API endpoints)
*/
export async function createNote(
  prevState: FormActionState<NoteValidationErrors>,
  formData: FormData,
): Promise<FormActionState<NoteValidationErrors>> {
  const { title, content, important } = Object.fromEntries(formData.entries())
  const session = await auth()

  try {
    await dbConnect()

    await NoteModel.create({
      title,
      content,
      important,
      userId: session!.user!.id,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return handleNoteValidationErrors(error)
    }

    // log the error
    console.error(error)

    return {
      error: "An unknown error has occurred while creating the note.",
    }
  }

  /* 
    Clear cached data (server-side and client-side) for the note board page path.
    
    This will trigger a new server request and update the page when it's next visited.
  */
  revalidatePath("/notes")

  // serve a redirect back to the note board page
  redirect("/notes")
}

export async function updateNote(
  id: string,
  prevState: FormActionState<NoteValidationErrors>,
  formData: FormData,
): Promise<FormActionState<NoteValidationErrors>> {
  const { title, content, important } = Object.fromEntries(formData.entries())
  const session = await auth()

  let updatedNote: NoteDocument | null

  try {
    await dbConnect()

    updatedNote = await NoteModel.findOneAndReplace(
      { _id: id, userId: session!.user!.id },
      { title, content, important, userId: session!.user!.id },
    )
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return handleNoteValidationErrors(error)
    }

    // log the error
    console.error(error)

    return {
      error: "An unknown error has occurred while updating the note.",
    }
  }

  if (!updatedNote) {
    // render the "not-found" file and serve it, along with a 404
    notFound()
  }
  /* 
    NOTE: The "notFound" function works by throwing an error, so that's why we're doing this check outside of the 
    "try/catch" block.
  */

  /* 
    Clear cached data (server-side and client-side) for the note board page path.
    
    This will trigger a new server request and update the page when it's next visited.
  */
  revalidatePath("/notes")

  // serve a redirect back to the note board page
  redirect("/notes")
}

export async function deleteNote(id: string): Promise<ActionState> {
  const session = await auth()

  let deletedNote: NoteDocument | null

  try {
    await dbConnect()

    deletedNote = await NoteModel.findOneAndDelete({
      _id: id,
      userId: session!.user!.id,
    })
  } catch (error) {
    // log the error
    console.error(error)

    return {
      error: "An unknown error has occurred while deleting the note.",
    }
  }

  if (!deletedNote) {
    // render the "not-found" file and serve it, along with a 404
    notFound()
  }
  /* 
    NOTE: The "notFound" function works by throwing an error, so that's why we're doing this check outside of the 
    "try/catch" block.
  */

  // action was successful!
  return {}
}
/*
  NOTE: As an example, we're showing a message after a successful delete action. For that, we can't run the revalidation
  of the note board page path directly in the action, since that would refresh the page before we could process the return
  object and trigger the success message. In this situation, we call the "revalidateNotes" server action below directly
  from the client-side component AFTER showing the message.

  If we wanted to do the same for the create and update actions, we could keep the revalidate call in the action (since
  those actions are not called from within the note board page) but we'd need to remove the redirect call and perform
  the redirection in the client-side component using the "useRouter" hook.
*/

export async function revalidateNotes() {
  /* 
    Clear cached data (server-side and client-side) for the note board page path. 
    
    This will trigger a new server request and update the page when this action is called from within it, or when the page
    is next visited.
  */
  revalidatePath("/notes")
}

export async function logIn(
  prevState: LogInActionState,
  formData: FormData,
): Promise<LogInActionState> {
  const { email, password } = Object.fromEntries(formData.entries())

  try {
    await dbConnect()

    // validate input against the relevant paths of the schema
    await UserModel.validate({ email, password }, ["email", "password"])

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
      Re-throw the error caused by the Next.js redirect called by Auth.js after a successful sign in (the redirect works
      by throwing an error)
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

export async function logOut() {
  // sign out using Auth.js, redirecting the user back to the log in page
  await signOut({ redirectTo: "/login" })
}

export async function signUp(
  prevState: FormActionState<SignUpValidationErrors>,
  formData: FormData,
): Promise<FormActionState<SignUpValidationErrors>> {
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
      { validateBeforeSave: false }, // skip validation since we've already ran it above
    )
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return handleSignUpValidationErrors(
        error,
        confirmationPasswordError ?? undefined,
      )
    }

    /* 
      Handle MongoDB duplicate key errors, since we're using the "unique" option in the schema (this option is NOT a
      validator and won't cause a mongoose validation error)
    */
    if (error instanceof mongoose.mongo.MongoError && error.code === "11000") {
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
