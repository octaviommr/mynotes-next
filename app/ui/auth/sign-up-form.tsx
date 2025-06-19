"use client"

import { useActionState, useEffect } from "react"
import { Button } from "@headlessui/react"
import {
  FormActionState,
  SignUpValidationErrors,
  signUp,
} from "@/app/lib/actions"
import TextField from "../form/text-field"
import PasswordField from "../form/password-field"
import { useMessageDispatch } from "../messages/message-context"

export default function SignUpForm() {
  const [actionState, formAction, isPending] = useActionState<
    FormActionState<SignUpValidationErrors>,
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
    <form action={formAction}>
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
      <section className="mt-8 flex flex-col">
        <Button
          type="submit"
          className="rounded-md border border-solid border-[var(--border)] bg-[var(--secondary-background)] px-3 py-1.5 text-sm/6 font-semibold"
          disabled={isPending}
        >
          Sign Up
        </Button>
      </section>
    </form>
  )
}
