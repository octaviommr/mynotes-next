"use client"

import { useSearchParams } from "next/navigation"
import { useActionState, useEffect } from "react"
import { type LogInActionState, logIn } from "@/lib/actions"
import TextField from "@/components/ui/form/TextField"
import PasswordField from "@/components/ui/form/PasswordField"
import Button from "@/components/ui/Button"
import { useMessageDispatch } from "@/contexts/message/MessageContext"

export default function LogInForm(
  props: Readonly<{
    "aria-labelledby": string
  }>,
) {
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
    <form action={formAction} aria-labelledby={props["aria-labelledby"]}>
      <section className="flex flex-col gap-6">
        <TextField
          name="email"
          label="Email"
          error={actionState.validationErrors?.email}
        />
        {/* 
          NOTE: No need to mark this field as required, since it's already obvious for users that the email field is
          required when logging in.
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
      <section className="mt-6">
        <Button type="submit" className="w-full" disabled={isPending}>
          Log In
        </Button>
      </section>
    </form>
  )
}
