"use server"

import { revalidatePath } from "next/cache"
import { notFound, redirect } from "next/navigation"
import mongoose from "mongoose"
import type { ActionState, FormActionState } from "@/types/ActionState"
import NoteModel, { type NoteDocument } from "@/models/Note"
import dbConnect from "@/lib/dbConnect"
import { auth } from "@/lib/auth"

interface NoteValidationErrors {
  title?: string
}

export type NoteActionState = FormActionState<NoteValidationErrors>

function handleNoteValidationErrors(
  error: mongoose.Error.ValidationError,
): NoteActionState {
  const state: NoteActionState = {
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

/* 
  Set up the server actions called via the "action" attribute when the note form is submitted, and those called directly by
  the note delete button.

  Behind the scenes, these create "POST" API endpoints.
*/
export async function createNote(
  prevState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
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
  prevState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
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
    try/catch block.
  */

  // action was successful!
  return {}
}
/*
  NOTE: As an example, we're showing a message after a successful delete action. In order to do that, we can't perform the
  revalidation of the note board page path directly in the action, since that would refresh the page before we could process
  the return object and trigger the success message. In this situation, we call the "revalidateNotes" action below directly
  from the client-side component AFTER showing the message.

  If we wanted to do the same for the create and update actions, we could keep the "revalidatePath" call in the actions
  (since they're not being called from within the note board page), but we'd need to remove the "redirect" call and perform
  the redirect in the client-side component using the "useRouter" hook.
*/

export async function revalidateNotes() {
  /* 
    Clear cached data (server-side and client-side) for the note board page path. 
    
    This will trigger a new server request and update the page when this action is called from within it, or when the page
    is next visited.
  */
  revalidatePath("/notes")
}
