"use client"

import { useActionState, useEffect } from "react"
import type { Note } from "@/models/Note"
import TextField from "@/components/ui/form/TextField"
import TextareaField from "@/components/ui/form/TextareaField"
import CheckboxField from "@/components/ui/form/CheckboxField"
import Button from "@/components/ui/Button"
import Link from "@/components/ui/Link"
import { useMessageDispatch } from "@/contexts/message/MessageContext"
import { type NoteActionState, createNote, updateNote } from "../lib/actions"

export default function NoteForm({
  note,
  ...props
}: Readonly<{
  note?: Note
  "aria-labelledby": string
}>) {
  const [actionState, formAction, isPending] = useActionState<
    NoteActionState,
    FormData
  >(note ? updateNote.bind(null, note.id) : createNote, {})
  /*
    NOTE: For the update server action, we're using a bound function that already includes an initial parameter containing
    the note ID value. This is because actions are only called with the state and payload parameters.
  */

  const dispatchMessage = useMessageDispatch()

  // display error messages
  useEffect(() => {
    if (actionState.error) {
      dispatchMessage({
        type: "open",
        message: {
          severity: "error",
          content: actionState.error,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionState])

  return (
    <form action={formAction} aria-labelledby={props["aria-labelledby"]}>
      <section className="flex flex-col gap-8">
        <TextField
          name="title"
          label="Title"
          defaultValue={note?.title}
          error={actionState.validationErrors?.title}
          required
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
          value="true"
        />
      </section>
      <section className="mt-8 flex items-center justify-end gap-4">
        <Link href="/notes">Cancel</Link>
        <Button type="submit" disabled={isPending}>
          {note ? "Update" : "Create"}
        </Button>
      </section>
    </form>
  )
}
