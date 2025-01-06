"use client"

import { useActionState, useEffect } from "react"
import { Button } from "@headlessui/react"
import { LogInActionState, logIn } from "@/app/lib/actions"
import TextField from "../form/TextField"
import PasswordField from "../form/PasswordField"
import { useMessageDispatch } from "../messages/MessageContext"
import { useSearchParams } from "next/navigation"

export default function LogInForm() {
  const searchParams = useSearchParams()

  const [actionState, formAction, isPending] = useActionState<
    LogInActionState,
    FormData
  >(logIn, { callbackUrl: searchParams.get("callbackUrl") ?? undefined })

  const dispatchMessage = useMessageDispatch()

  // display error messages
  useEffect(() => {
    if (actionState.error) {
      dispatchMessage({
        type: "open",
        message: {
          severity: "error",
          content: actionState.error,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionState])

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-6">
        <TextField
          name="email"
          label="Email"
          error={actionState.validationErrors?.email}
        />
        <PasswordField
          name="password"
          label="Password"
          error={actionState.validationErrors?.password}
        />
        <Button
          type="submit"
          className="rounded-md border border-solid border-[var(--border)] bg-[var(--secondary-background)] px-3 py-1.5 text-sm/6 font-semibold"
          disabled={isPending}
        >
          Log In
        </Button>
      </div>
    </form>
  )
}
