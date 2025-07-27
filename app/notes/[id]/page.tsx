import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNote } from "@/lib/data"
import PageTitle from "@/components/ui/pages/PageTitle"
import NoteForm from "../components/NoteForm"

export const metadata: Metadata = {
  title: "Edit Note",
}

const NOTE_DETAIL_TITLE_ID = "note-detail-title"

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
      <PageTitle id={NOTE_DETAIL_TITLE_ID} title="Edit Note" />
      <div className="mx-auto w-full max-w-sm">
        <NoteForm note={note} aria-labelledby={NOTE_DETAIL_TITLE_ID} />
      </div>
    </div>
  )
}
