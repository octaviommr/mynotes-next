import Link from "next/link"

export default function Header() {
  return (
    <header className="flex h-16 items-center border-b border-solid border-black/[.08] px-4 dark:border-white/[.145]">
      <Link href="/" className="text-2xl font-bold">
        MyNotes
      </Link>
      <span className="flex-1"></span>
    </header>
  )
}
