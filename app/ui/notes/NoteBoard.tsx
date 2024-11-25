"use client"

import { useState } from "react"
import { Note } from "@/app/models/Note"
import NoteBoardItem from "./NoteBoardItem"

export default function NoteBoard({ notes }: Readonly<{ notes: Note[] }>) {
  const [selected, setSelected] = useState<string[]>([])

  const onToggle = (noteID: string, selected: boolean) => {
    setSelected((previousSelection) =>
      selected
        ? [...previousSelection, noteID]
        : previousSelection.filter(
            (selectedNoteID) => selectedNoteID !== noteID,
          ),
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-4">
      {notes.map((note) => (
        <NoteBoardItem
          key={note.id}
          note={note}
          selected={selected.includes(note.id)}
          onToggle={(selected) => onToggle(note.id, selected)}
        />
      ))}
    </div>
  )
}
