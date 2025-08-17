"use client"

import { Button } from "@headlessui/react"
import { TrashIcon } from "@heroicons/react/20/solid"
import type { Note } from "@/models/Note"
import { useMessageDispatch } from "@/contexts/message/MessageContext"
import { useModalControl } from "@/contexts/modal/ModalContext"
import {
  deleteNote as runDeleteNoteAction,
  revalidateNotes,
} from "./lib/actions"

export default function DeleteButton({ note }: Readonly<{ note: Note }>) {
  const dispatchMessage = useMessageDispatch()
  const { showModal } = useModalControl()

  const deleteNote = async () => {
    const confirmationModalResult = await showModal({
      type: "alert",
      title: "Delete Note",
      content: "Are you sure you want to delete the note?",
      okLabel: "Delete",
      cancelLabel: "Cancel",
    })

    if (!confirmationModalResult) {
      return
    }

    const actionResult = await runDeleteNoteAction(note.id)

    if (actionResult.error) {
      dispatchMessage({
        type: "open",
        message: {
          severity: "error",
          content: actionResult.error,
        },
      })

      return
    }

    // show a success message
    dispatchMessage({
      type: "open",
      message: {
        severity: "success",
        content: "Note deleted successfully!",
      },
    })

    /* 
      Call a server action to revalidate the path for the note board page.
      
      This will trigger a new server request and update the page, reflecting the deleted note.
    */
    revalidateNotes()
  }

  return (
    <Button aria-label="Delete" onClick={() => deleteNote()}>
      <TrashIcon className="size-5 fill-red-500" />
    </Button>
  )
}
