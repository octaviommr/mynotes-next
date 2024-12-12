"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import mongoose from "mongoose"
import dbConnect from "./dbConnect"
import NoteModel from "../models/Note"

export interface ActionState<T> {
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
    Server actions called via the "action" attribute when a form is submitted (behind the scenes, these create "POST" API
    endpoints) 
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
    Clear client-side cache for the note board route to make sure a new request to the server is made the next time the
    page is visited (since we have new data)
  */
  revalidatePath("/notes")

  // serve a redirect back to the note board
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

    const updatedNote = await NoteModel.findOneAndReplace(
      { _id: id },
      flatFormData,
    )

    if (!updatedNote) {
      // TODO: handle note not found
    }
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
    Clear client-side cache for the note board route to make sure a new request to the server is made the next time the
    page is visited (since we have updated data)
  */
  revalidatePath("/notes")

  // serve a redirect back to the note board
  redirect("/notes")
}

export async function deleteNote(id: string): Promise<NoteActionState> {
  // DEBUG
  console.log("Deleting note with id: ", id)

  try {
    await dbConnect()

    const deletedNote = await NoteModel.findByIdAndDelete(id)

    if (!deletedNote) {
      // TODO: handle note not found
    }
  } catch (error) {
    // log the error
    console.error(error)

    return {
      error: "An unknown error has occurred while deleting the note.",
    }
  }

  /* 
    Clear client-side cache for the note board route, in which this action is called. This will trigger a new server
    request and update the page, reflecting the deleted data.
  */
  revalidatePath("/notes")

  // action was successful!
  return {}
}
