import type { Metadata } from "next"
import Link from "next/link"
import { getNotes } from "../lib/data"
import NoteBoardItem from "../ui/notes/NoteBoardItem"

export const metadata: Metadata = {
  title: "Note Board",
}

export default async function NoteBoard() {
  const notes = await getNotes()

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
        {notes.map((note) => (
          <NoteBoardItem key={note.id} note={note} />
        ))}
      </div>
      {!notes.length && (
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <p>No notes yet.</p>
          <Link href="/notes/create" className="text-sm/6 font-medium">
            Add Note
          </Link>
        </div>
      )}
    </>
  )
}
