import Link from "next/link"
import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline"

export default function SideNav() {
  return (
    <nav className="flex h-full gap-2 px-3 py-4 md:flex-col md:px-2">
      <Link
        href="/notes"
        className="flex items-center justify-center gap-2 rounded-md p-3 text-sm/6 font-medium hover:bg-[#f2f2f2] md:justify-start md:p-2 md:px-3 dark:hover:bg-[#1a1a1a]"
      >
        <HomeIcon className="size-6" />
        <span>Note Board</span>
      </Link>
      <Link
        href="/notes/create"
        className="flex items-center justify-center gap-2 rounded-md p-3 text-sm/6 font-medium hover:bg-[#f2f2f2] md:justify-start md:p-2 md:px-3 dark:hover:bg-[#1a1a1a]"
      >
        <PlusIcon className="size-6" />
        <span>Add note</span>
      </Link>
      <span className="flex-1"></span>
    </nav>
  )
}
