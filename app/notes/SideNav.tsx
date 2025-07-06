"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Icon } from "@/types/Icon"

interface SideNavLinkProps {
  href: string
  icon: Icon
  label: string
}

function SideNavLink({ href, icon: Icon, label }: Readonly<SideNavLinkProps>) {
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
      <Icon className="size-6" />
      <span className="font-medium">{label}</span>
    </Link>
  )
}

export default function SideNav() {
  return (
    <nav className="flex h-full gap-2 border-b border-solid border-[var(--border)] px-3 py-4 md:flex-col md:border-b-0 md:border-r md:px-2">
      <SideNavLink href="/notes" icon={HomeIcon} label="Note Board" />
      <SideNavLink href="/notes/create" icon={PlusIcon} label="Add Note" />
    </nav>
  )
}
