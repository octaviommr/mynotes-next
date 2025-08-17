import type { Metadata } from "next"
import { getNotes } from "@/app/notes/lib/data"
import Link from "@/components/ui/Link"
import NoteBoardItem from "./NoteBoardItem"

export const metadata: Metadata = {
  title: "Note Board",
}

export default async function NoteBoard() {
  const notes = await getNotes()

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {notes.map((note) => (
          <NoteBoardItem key={note.id} note={note} />
        ))}
      </ul>
      {!notes.length && (
        <div className="flex h-full items-center justify-center gap-2">
          <p>No notes yet.</p>
          <Link href="/notes/create">Add One</Link>
        </div>
      )}
    </>
  )
}
