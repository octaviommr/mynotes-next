import {
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid"

export type MessageSeverity = "error" | "warning" | "info" | "success"

interface AlertProps {
  severity: MessageSeverity
  message: string
}

function ErrorAlert({ message }: Readonly<{ message: string }>) {
  return (
    <div
      className={
        "flex max-w-lg items-center gap-2 rounded-md border border-solid border-black/[.08] p-4 dark:border-white/[.145]"
      }
      role="alert"
    >
      <XCircleIcon className="size-6 fill-red-500" />
      <p className="text-red-500">{message}</p>
    </div>
  )
}

function WarningAlert({ message }: Readonly<{ message: string }>) {
  return (
    <div
      className={
        "flex max-w-lg items-center gap-2 rounded-md border border-solid border-black/[.08] p-4 dark:border-white/[.145]"
      }
      role="alert"
    >
      <ExclamationTriangleIcon className="size-6 fill-yellow-500" />
      <p className="text-sm/6 text-yellow-500">{message}</p>
    </div>
  )
}

function InfoAlert({ message }: Readonly<{ message: string }>) {
  return (
    <div
      className={
        "flex max-w-lg items-center gap-2 rounded-md border border-solid border-black/[.08] p-4 dark:border-white/[.145]"
      }
      role="alert"
    >
      <InformationCircleIcon className="size-6 fill-gray-500" />
      <p className="text-sm/6 text-gray-500">{message}</p>
    </div>
  )
}

function SuccessAlert({ message }: Readonly<{ message: string }>) {
  return (
    <div
      className={
        "flex max-w-lg items-center gap-2 rounded-md border border-solid border-black/[.08] p-4 dark:border-white/[.145]"
      }
      role="alert"
    >
      <CheckCircleIcon className="size-6 fill-green-500" />
      <p className="text-sm/6 text-green-500">{message}</p>
    </div>
  )
}

export default function Alert({ severity, message }: Readonly<AlertProps>) {
  return (
    <>
      {severity === "error" && <ErrorAlert message={message} />}
      {severity === "warning" && <WarningAlert message={message} />}
      {severity === "info" && <InfoAlert message={message} />}
      {severity === "success" && <SuccessAlert message={message} />}
    </>
  )
}
