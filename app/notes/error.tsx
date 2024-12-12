"use client"

import { useEffect } from "react"
import { Button } from "@headlessui/react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // log the error
    console.error(error)
  }, [error])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Ooops...</h2>
      <p>Something went wrong.</p>
      <Button
        type="button"
        className="rounded-md border border-solid border-black/[.08] px-3 py-1.5 text-sm/6 font-semibold dark:border-white/[.145]"
        onClick={
          // attempt to recover by trying to re-render the route segment where the error ocurred
          () => reset()
        }
      >
        Try Again
      </Button>
    </div>
  )
}
