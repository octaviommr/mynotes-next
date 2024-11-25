import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/20/solid"

export default function Home() {
  return (
    <div className="flex h-full items-center justify-center">
      <main className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Welcome to MyNotes!</h1>
        <Link href="/notes" className="flex items-center gap-2 font-medium">
          <span className="text-sm/6">Go to my notes</span>
          <ArrowRightIcon className="size-5" />
        </Link>
      </main>
    </div>
  )
}
