import Link from "next/link"
import { PencilSquareIcon } from "@heroicons/react/16/solid"
import { Note } from "@/app/models/Note"
import DeleteButton from "./delete-button"

export default function NoteBoardItem({ note }: Readonly<{ note: Note }>) {
  return (
    <li className="flex h-72 flex-col gap-4 rounded-xl border border-solid border-[var(--border)] p-4">
      <header className="flex items-center gap-4">
        <h3 className="flex-1 truncate text-lg font-bold">{note.title}</h3>
        {note.important && (
          <span
            className="rounded-md border border-solid border-[var(--border)] p-4 px-2 py-1 text-xs font-medium"
            role="status"
          >
            Important
          </span>
        )}
      </header>
      <p className="line-clamp-5 whitespace-pre-wrap">{note.content}</p>
      <span className="flex-1" />
      <footer className="flex items-center justify-between">
        <DeleteButton note={note} />
        <Link href={`/notes/${note.id}`} aria-label={`Edit ${note.title}`}>
          <PencilSquareIcon className="size-5" />
        </Link>
      </footer>
    </li>
  )
}
