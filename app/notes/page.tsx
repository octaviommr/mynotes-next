import { getNotes } from "../lib/db/queries"
import NoteBoard from "../ui/notes/NoteBoard"

export default async function NoteList() {
  const notes = await getNotes()

  return (
    <>
      <NoteBoard notes={notes} />
      {!notes.length && (
        <div className="flex h-full items-center justify-center">
          <span className="text-sm/6">No notes yet.</span>
        </div>
      )}
    </>
  )
}
