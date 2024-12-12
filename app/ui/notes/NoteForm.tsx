"use client"

import Link from "next/link"
import { useActionState, useEffect } from "react"
import { Button } from "@headlessui/react"
import { NoteActionState, createNote, updateNote } from "@/app/lib/actions"
import { Note } from "@/app/models/Note"
import TextField from "../form/TextField"
import TextareaField from "../form/TextareaField"
import CheckboxField from "../form/CheckboxField"

export default function NoteForm({ note }: Readonly<{ note?: Note }>) {
  const [actionState, formAction] = useActionState<NoteActionState, FormData>(
    note ? updateNote.bind(null, note.id) : createNote,
    {},
  )
  /*
    NOTE: For the update action, we're using a bound function that already includes an initial parameter containing the
    note ID value. This is because actions are only called with the state and payload parameters.
  */

  useEffect(() => {
    if (actionState.error) {
      // TODO: trigger toast notification with error message
      console.log(`${note ? "Update" : "Create"} error: ${actionState.error}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionState.error])

  return (
    <form action={formAction} aria-labelledby="page-title">
      <div className="flex flex-col gap-6">
        <TextField
          name="title"
          label="Title (required)"
          defaultValue={note?.title}
          error={actionState.validationErrors?.title}
        />
        <TextareaField
          name="content"
          label="Content"
          rows={5}
          defaultValue={note?.content}
        />
        <CheckboxField
          name="important"
          label="Important"
          defaultChecked={note?.important}
        />
      </div>
      <div className="mt-6 flex items-center justify-end gap-4">
        <Link href="/notes" className="text-sm/6 font-medium">
          Cancel
        </Link>
        <Button
          type="submit"
          className="rounded-md border border-solid border-black/[.08] px-3 py-1.5 text-sm/6 font-semibold dark:border-white/[.145]"
        >
          {note ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  )
}
