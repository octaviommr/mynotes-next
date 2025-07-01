import type { Metadata } from "next"
import FormPage, { TITLE_ID } from "@/components/ui/pages/FormPage"
import NoteForm from "../components/NoteForm"

export const metadata: Metadata = {
  title: "New Note",
}

export default function NewNote() {
  return (
    <FormPage title="New Note">
      <NoteForm aria-labelledby={TITLE_ID} />
    </FormPage>
  )
}
