import NoteModel, { type Note, makeNote } from "@/models/Note"
import dbConnect from "@/lib/dbConnect"
import { auth } from "@/lib/auth"

// set up data fetching functions to be called inside server components
export async function getNotes(): Promise<Note[]> {
  const session = await auth()

  await dbConnect()

  const notes = await NoteModel.find({ userId: session!.user!.id })

  return notes.map(makeNote)
}

export async function getNote(id: string): Promise<Note | null> {
  const session = await auth()

  await dbConnect()

  const note = await NoteModel.findOne({ _id: id, userId: session!.user!.id })

  if (!note) {
    return note
  }

  return makeNote(note)
}
