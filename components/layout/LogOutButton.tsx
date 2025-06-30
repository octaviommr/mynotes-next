"use client"

import { Button } from "@headlessui/react"
import { ArrowLeftStartOnRectangleIcon } from "@heroicons/react/24/outline"
import { logOut } from "@/lib/actions"

export default function LogOutButton() {
  return (
    <Button className="flex items-center gap-2" onClick={() => logOut()}>
      <ArrowLeftStartOnRectangleIcon className="size-6" />
      <span className="font-medium">Log Out</span>
    </Button>
  )
}
