import Link from "next/link"
import { auth } from "@/lib/auth"
import LogOutButton from "./LogOutButton"

export default async function Header() {
  const session = await auth()

  return (
    <header className="flex h-16 items-center border-b border-solid border-[var(--border)] px-4">
      <Link href="/" className="text-3xl font-bold">
        MyNotes
      </Link>
      <span className="flex-1" />
      {session && <LogOutButton />}
    </header>
  )
}
