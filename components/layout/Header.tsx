import Link from "next/link"

export default function Header() {
  return (
    <header className="flex h-16 items-center border-b border-solid border-[var(--border)] px-4">
      <Link href="/" className="text-2xl font-bold">
        MyNotes
      </Link>
      <span className="flex-1" />
    </header>
  )
}
