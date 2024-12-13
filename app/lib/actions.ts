"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import mongoose from "mongoose"
import dbConnect from "./dbConnect"
import NoteModel from "../models/Note"

export interface ActionState<T> {
  isSuccess?: boolean
  validationErrors?: T
  error?: string
}

export interface NoteValidationError {
  title?: string
}

export type NoteActionState = ActionState<NoteValidationError>

const makeNoteValidationErrors = (
  error: mongoose.Error.ValidationError,
): NoteActionState => {
  return { validationErrors: { title: error.errors["title"]?.message } }
}

/* 
  Server actions called by client-side components directly or via the "action" attribute when a form is submitted (behind
  the scenes, these create "POST" API endpoints).
*/
export async function createNote(
  prevState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
  const flatFormData = Object.fromEntries(formData.entries())

  try {
    await dbConnect()

    await NoteModel.create(flatFormData)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return makeNoteValidationErrors(error)
    }

    // log the error
    console.error(error)

    return {
      error: "An unknown error has occurred while creating the note.",
    }
  }

  /* 
    Clear cached data (server-side and client-side) for the note board page path. This will trigger a new server request
    and update the page when it's next visited.
  */
  revalidatePath("/notes")

  // serve a redirect back to the note board page
  redirect("/notes")
}

export async function updateNote(
  id: string,
  prevState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
  const flatFormData = Object.fromEntries(formData.entries())

  try {
    await dbConnect()

    await NoteModel.findOneAndReplace({ _id: id }, flatFormData)
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return makeNoteValidationErrors(error)
    }

    // log the error
    console.error(error)

    return {
      error: "An unknown error has occurred while updating the note.",
    }
  }

  /* 
    Clear cached data (server-side and client-side) for the note board page path. This will trigger a new server request
    and update the page when it's next visited.
  */
  revalidatePath("/notes")

  // serve a redirect back to the note board page
  redirect("/notes")
}

export async function deleteNote(id: string): Promise<NoteActionState> {
  try {
    await dbConnect()

    await NoteModel.findByIdAndDelete(id)
  } catch (error) {
    // log the error
    console.error(error)

    return {
      error: "An unknown error has occurred while deleting the note.",
    }
  }

  // action was successful!
  return { isSuccess: true }
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
    Clear cached data (server-side and client-side) for the note board page path. This will trigger a new server request
    and update the page when this action is called from within it, or when the page is next visited.
  */
  revalidatePath("/notes")
}
