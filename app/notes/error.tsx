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
      <h1 className="text-3xl font-bold">Ooops...</h1>
      <p>Something went wrong.</p>
      <Button
        className="rounded-md border border-solid border-[var(--border)] px-3 py-1.5 text-sm/6 font-semibold"
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
