"use client"

import { useEffect } from "react"
import ErrorPage from "@/components/ui/pages/ErrorPage"
import Button from "@/components/ui/Button"

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
    <ErrorPage
      title="Oh no..."
      message="Something went wrong."
      action={
        <Button
          onClick={
            // attempt to recover by trying to re-render the route segment where the error ocurred
            () => reset()
          }
        >
          Try Again
        </Button>
      }
    />
  )
}
