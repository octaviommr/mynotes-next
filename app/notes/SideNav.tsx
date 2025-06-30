"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
interface SideNavLinkProps {
  href: string
  children: React.ReactNode
}

function SideNavLink({ href, children }: Readonly<SideNavLinkProps>) {
  const currentPath = usePathname()

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center justify-center gap-2 rounded-md p-3 hover:bg-[var(--secondary-background)] md:justify-start md:p-2 md:px-3",
        {
          "bg-[var(--secondary-background)]": currentPath === href,
        },
      )}
    >
      {children}
    </Link>
  )
}

export default function SideNav() {
  return (
    <nav className="flex h-full gap-2 border-b border-solid border-[var(--border)] px-3 py-4 md:flex-col md:border-b-0 md:border-r md:px-2">
      <SideNavLink href="/notes">
        <HomeIcon className="size-6" />
        <span className="font-medium">Note Board</span>
      </SideNavLink>
      <SideNavLink href="/notes/create">
        <PlusIcon className="size-6" />
        <span className="font-medium">Add Note</span>
      </SideNavLink>
    </nav>
  )
}
