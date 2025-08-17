"use client"

import { useActionState, useEffect } from "react"
import { type SignUpActionState, signUp } from "./actions"
import TextField from "@/components/ui/form/TextField"
import PasswordField from "@/components/ui/form/PasswordField"
import Button from "@/components/ui/Button"
import { useMessageDispatch } from "@/contexts/message/MessageContext"

export default function SignUpForm(
  props: Readonly<{
    "aria-labelledby": string
  }>,
) {
  const [actionState, formAction, isPending] = useActionState<
    SignUpActionState,
    FormData
  >(signUp, {})

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
          required
        />
        <TextField
          name="name"
          label="Name"
          error={actionState.validationErrors?.name}
          required
        />
        <PasswordField
          name="password"
          label="Password"
          error={actionState.validationErrors?.password}
          required
        />
        <PasswordField
          name="confirmationPassword"
          label="Confirm Password"
          error={actionState.validationErrors?.confirmationPassword}
          required
        />
      </section>
      <section className="mt-8">
        <Button type="submit" className="w-full" disabled={isPending}>
          Sign Up
        </Button>
      </section>
    </form>
  )
}
