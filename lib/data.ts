import NoteModel, { type Note, makeNote } from "@/models/Note"
import dbConnect from "./dbConnect"
import { auth } from "./auth"

// data fetching methods called inside server components
export const getNotes = async (): Promise<Note[]> => {
  const session = await auth()

  await dbConnect()

  const notes = await NoteModel.find({ userId: session!.user!.id })

  return notes.map(makeNote)
}

export const getNote = async (id: string): Promise<Note | null> => {
  const session = await auth()

  await dbConnect()

  const note = await NoteModel.findOne({ _id: id, userId: session!.user!.id })

  if (!note) {
    return note
  }

  return makeNote(note)
}
