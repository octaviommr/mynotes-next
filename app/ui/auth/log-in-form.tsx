"use client"

import { useActionState, useEffect } from "react"
import { Button } from "@headlessui/react"
import { LogInActionState, logIn } from "@/app/lib/actions"
import TextField from "../form/text-field"
import PasswordField from "../form/password-field"
import { useMessageDispatch } from "../messages/message-context"
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
      <section className="flex flex-col gap-6">
        <TextField
          name="email"
          label="Email"
          error={actionState.validationErrors?.email}
        />
        {/* 
          NOTE: No need to mark this field as required, since it's already obvious for users that the email field is
          required when logging in
        */}

        <PasswordField
          name="password"
          label="Password"
          error={actionState.validationErrors?.password}
        />
        {/*
          NOTE: For security reasons, we want to give potential attackers as few hints as possible about the password.
          Therefore, we won't mark the field as required.
        */}
      </section>
      <section className="mt-8 flex flex-col">
        <Button
          type="submit"
          className="rounded-md border border-solid border-[var(--border)] bg-[var(--secondary-background)] px-3 py-1.5 text-sm/6 font-semibold"
          disabled={isPending}
        >
          Log In
        </Button>
      </section>
    </form>
  )
}
