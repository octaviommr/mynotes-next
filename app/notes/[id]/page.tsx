"use client"

import { useParams } from "next/navigation"

export default function NoteDetail() {
  const { id } = useParams()

  return <div>TODO: NoteDetail page of note {id}</div>
}
