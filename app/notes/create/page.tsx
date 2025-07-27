import type { Metadata } from "next"
import PageTitle from "@/components/ui/pages/PageTitle"
import NoteForm from "../components/NoteForm"

export const metadata: Metadata = {
  title: "New Note",
}

const NEW_NOTE_TITLE_ID = "new-note-title"

export default function NewNote() {
  return (
    <div className="flex h-full flex-col justify-center gap-10">
      <PageTitle id={NEW_NOTE_TITLE_ID} title="New Note" />
      <div className="mx-auto w-full max-w-sm">
        <NoteForm aria-labelledby={NEW_NOTE_TITLE_ID} />
      </div>
    </div>
  )
}
