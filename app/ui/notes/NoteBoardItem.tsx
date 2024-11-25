import Link from "next/link"
import clsx from "clsx"
import { Checkbox } from "@headlessui/react"
import { CheckIcon } from "@heroicons/react/16/solid"
import { Note } from "@/app/models/Note"

interface NoteBoardItemProps {
  note: Note
  selected: boolean
  onToggle: (selected: boolean) => void
}

export default function NoteBoardItem({
  note,
  selected,
  onToggle,
}: Readonly<NoteBoardItemProps>) {
  return (
    <Link
      href={`/notes/${note.id}`}
      className={clsx(
        "flex h-72 flex-col items-start gap-4 rounded-xl border border-solid border-black/[.08] p-4 hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]",
        {
          "bg-[#f2f2f2] dark:bg-[#1a1a1a]": selected,
        },
      )}
      aria-label={`Edit ${note.title}`}
    >
      <div className="flex w-full items-center gap-4">
        <h3 className="flex-1 truncate text-lg font-bold">{note.title}</h3>
        <Checkbox
          checked={selected}
          onChange={onToggle}
          className="group size-6 rounded-md p-1 ring-1 ring-inset ring-black/[.08] hover:cursor-default dark:ring-white/[.145]"
          aria-label={`Toggle ${note.title}`}
        >
          <CheckIcon className="hidden size-4 group-data-[checked]:block" />
        </Checkbox>
      </div>
      <p className="line-clamp-5 w-full whitespace-pre-wrap text-sm/6">
        {note.content}
      </p>
      <span className="flex-1"></span>
      {note.important && (
        <span
          className="rounded-md border border-solid border-black/[.08] p-4 px-2 py-1 text-xs font-medium dark:border-white/[.145]"
          role="status"
        >
          Important
        </span>
      )}
    </Link>
  )
}
