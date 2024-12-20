"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

export default function SideNav() {
  const path = usePathname()

  return (
    <nav className="flex h-full gap-2 px-3 py-4 md:flex-col md:px-2">
      <Link
        href="/notes"
        className={clsx(
          "flex items-center justify-center gap-2 rounded-md p-3 hover:bg-[var(--secondary-background)] md:justify-start md:p-2 md:px-3",
          {
            "bg-[var(--secondary-background)]": path === "/notes",
          },
        )}
      >
        <HomeIcon className="size-6" />
        <span className="font-medium">Note Board</span>
      </Link>
      <Link
        href="/notes/create"
        className={clsx(
          "flex items-center justify-center gap-2 rounded-md p-3 hover:bg-[var(--secondary-background)] md:justify-start md:p-2 md:px-3",
          {
            "bg-[var(--secondary-background)]": path === "/notes/create",
          },
        )}
      >
        <PlusIcon className="size-6" />
        <span className="font-medium">Add Note</span>
      </Link>
      <span className="flex-1" />
    </nav>
  )
}
