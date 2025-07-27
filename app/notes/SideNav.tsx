"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HomeIcon, PlusIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"
import { Icon } from "@/types/Icon"

function SideNavLink({
  href,
  icon: Icon,
  label,
}: Readonly<{ href: string; icon: Icon; label: string }>) {
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
  const sideNavLinks = [
    { href: "/notes", icon: HomeIcon, label: "Note Board" },
    { href: "/notes/create", icon: PlusIcon, label: "Add Note" },
  ]

  return (
    <nav className="flex h-full gap-2 border-b border-solid border-[var(--border)] px-3 py-4 md:flex-col md:border-b-0 md:border-r md:px-2">
      {sideNavLinks.map(({ href, icon, label }) => (
        <SideNavLink key={href} href={href} icon={icon} label={label} />
      ))}
    </nav>
  )
}
