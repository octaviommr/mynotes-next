"use client"

import { useActionState, useEffect } from "react"
import { Button } from "@headlessui/react"
import { TrashIcon } from "@heroicons/react/20/solid"
import { NoteActionState, deleteNote, revalidateNotes } from "@/app/lib/actions"
import { Note } from "@/app/models/Note"
import { useMessage } from "../messages/MessageContext"

export default function DeleteButton({ note }: Readonly<{ note: Note }>) {
  const [actionState, formAction] = useActionState<NoteActionState>(
    deleteNote.bind(null, note.id),
    {},
  )
  /*
    NOTE: We're using a bound function for the server action that already includes an initial parameter containing the
    note ID value. This is because actions are only called with the state and payload parameters.
  */

  const messageContext = useMessage()

  // display success and error messages
  useEffect(() => {
    if (!messageContext) {
      return
    }

    if (actionState.isSuccess) {
      messageContext.showMessage({
        severity: "success",
        content: "Note deleted successfully!",
      })

      /* 
        Call a server action to revalidate the path for the note board page. This will trigger a new server request and
        update the page, reflecting the deleted note.
      */
      revalidateNotes()
      return
    }

    if (actionState.error) {
      messageContext.showMessage({
        severity: "error",
        content: actionState.error,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionState.isSuccess, actionState.error])

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
