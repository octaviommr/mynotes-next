import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getNote } from "@/lib/data"
import FormPage from "@/components/ui/pages/FormPage"
import NoteForm from "../components/NoteForm"

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
    <FormPage title="Edit Note">
      <NoteForm note={note} />
    </FormPage>
  )
}
