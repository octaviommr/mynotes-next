import type { Metadata } from "next"
import NoteForm from "../components/NoteForm"

export const metadata: Metadata = {
  title: "New Note",
}

export default function NewNote() {
  return (
    <div className="flex h-full flex-col justify-center gap-10">
      <h1 id="page-title" className="text-center text-3xl font-bold">
        New Note
      </h1>
      <div className="mx-auto w-full max-w-sm">
        <NoteForm />
      </div>
    </div>
  )
}
