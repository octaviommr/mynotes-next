import Link from "next/link"

export default function NotFoundNote() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Ooops...</h1>
      <p>Note not found.</p>
      <Link href="/notes" className="text-sm/6 font-medium">
        Go to Note Board
      </Link>
    </div>
  )
}
