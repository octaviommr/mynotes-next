import connect from "./connect"
import NoteModel, { Note, makeNote } from "@/app/models/Note"

// queries called inside server components
export const getNotes = async (): Promise<Note[]> => {
  await connect()

  const notes = await NoteModel.find({})

  return notes.map(makeNote)
}
