import type { Metadata } from "next"
import FormPage from "@/components/ui/pages/FormPage"
import NoteForm from "../components/NoteForm"

export const metadata: Metadata = {
  title: "New Note",
}

export default function NewNote() {
  return (
    <FormPage title="New Note">
      <NoteForm />
    </FormPage>
  )
}
