import dbConnect from "./dbConnect"
import NoteModel, { Note, makeNote } from "@/app/models/Note"

// data fetching methods called inside server components
export const getNotes = async (): Promise<Note[]> => {
  await dbConnect()

  const notes = await NoteModel.find({})

  return notes.map(makeNote)
}

export const getNote = async (id: string): Promise<Note | null> => {
  await dbConnect()

  const note = await NoteModel.findById(id)

  if (!note) {
    return note
  }

  return makeNote(note)
}
