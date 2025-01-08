import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNote } from "@/app/lib/data"
import NoteForm from "@/app/ui/notes/note-form"

export const metadata: Metadata = {
  title: "Edit Note",
}

export default async function NoteDetail({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>) {
  const id = (await params).id
  const note = await getNote(id)

  if (!note) {
    notFound()
  }

  return (
    <div className="flex h-full flex-col justify-center gap-10">
      <h2 id="page-title" className="text-center text-2xl font-bold">
        Edit Note
      </h2>
      <div className="mx-auto w-full max-w-sm">
        <NoteForm note={note} />
      </div>
    </div>
  )
}
