import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/20/solid"

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Welcome to MyNotes!</h1>
      <Link href="/notes" className="flex items-center gap-2">
        <span className="text-sm/6 font-medium">See My Notes</span>
        <ArrowRightIcon className="size-5" />
      </Link>
    </main>
  )
}
