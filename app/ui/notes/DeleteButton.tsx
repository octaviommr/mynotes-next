"use client"

import { useActionState, useEffect } from "react"
import { Button } from "@headlessui/react"
import { TrashIcon } from "@heroicons/react/20/solid"
import { NoteActionState, deleteNote } from "@/app/lib/actions"
import { Note } from "@/app/models/Note"

export default function DeleteButton({ note }: Readonly<{ note: Note }>) {
  const [actionState, formAction] = useActionState<NoteActionState>(
    deleteNote.bind(null, note.id),
    {},
  )
  /*
    NOTE: We're using a bound function for the action that already includes an initial parameter containing the note ID
    value. This is because actions are only called with the state and payload parameters.
  */

  useEffect(() => {
    if (actionState.error) {
      // TODO: trigger toast notification with error message
      console.log("Delete error: " + actionState.error)
    }
  }, [actionState.error])

  return (
    <form action={formAction}>
      <Button
        type="submit"
        aria-label="Delete"
        onClick={(event) => event.stopPropagation()}
      >
        <TrashIcon className="size-5 fill-red-500" />
      </Button>
    </form>
  )
}
