"use client"

import { useActionState, useEffect } from "react"
import { Button } from "@headlessui/react"
import {
  FormActionState,
  SignUpValidationErrors,
  signUp,
} from "@/app/lib/actions"
import TextField from "../form/TextField"
import PasswordField from "../form/PasswordField"
import { useMessageDispatch } from "../messages/MessageContext"

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
      <div className="flex flex-col gap-6">
        <TextField
          name="email"
          label="Email"
          error={actionState.validationErrors?.email}
        />
        <TextField
          name="name"
          label="Name"
          error={actionState.validationErrors?.name}
        />
        <PasswordField
          name="password"
          label="Password"
          error={actionState.validationErrors?.password}
        />
        <PasswordField
          name="confirmationPassword"
          label="Confirm Password"
          error={actionState.validationErrors?.confirmationPassword}
        />
        <Button
          type="submit"
          className="rounded-md border border-solid border-[var(--border)] bg-[var(--secondary-background)] px-3 py-1.5 text-sm/6 font-semibold"
          disabled={isPending}
        >
          Sign Up
        </Button>
      </div>
    </form>
  )
}
