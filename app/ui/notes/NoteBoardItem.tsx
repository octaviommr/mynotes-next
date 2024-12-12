import Link from "next/link"
import { Note } from "@/app/models/Note"
import DeleteButton from "./DeleteButton"

export default function NoteBoardItem({ note }: Readonly<{ note: Note }>) {
  return (
    <Link
      href={`/notes/${note.id}`}
      className="flex h-72 flex-col gap-4 rounded-xl border border-solid border-black/[.08] p-4 hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
      aria-label={`Edit ${note.title}`}
    >
      <div className="flex items-center gap-4">
        <h3 className="flex-1 truncate text-xl font-bold">{note.title}</h3>
        {note.important && (
          <span
            className="rounded-md border border-solid border-black/[.08] p-4 px-2 py-1 text-xs font-medium dark:border-white/[.145]"
            role="status"
          >
            Important
          </span>
        )}
      </div>
      <p className="line-clamp-5 whitespace-pre-wrap">{note.content}</p>
      <span className="flex-1" />
      <div className="flex justify-end">
        <DeleteButton note={note} />
      </div>
    </Link>
  )
}
