import {
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid"
import clsx from "clsx"

export type MessageSeverity = "error" | "warning" | "info" | "success"

interface AlertProps {
  severity: MessageSeverity
  message: string
}

export default function Alert({ severity, message }: Readonly<AlertProps>) {
  return (
    <div
      className="flex max-w-lg items-center gap-2 rounded-md border border-solid border-[var(--border)] bg-[var(--main-background)] p-4"
      role="alert"
    >
      {severity === "error" && <XCircleIcon className="size-6 fill-red-500" />}
      {severity === "warning" && (
        <ExclamationTriangleIcon className="size-6 fill-yellow-500" />
      )}
      {severity === "info" && (
        <InformationCircleIcon className="size-6 fill-gray-500" />
      )}
      {severity === "success" && (
        <CheckCircleIcon className="size-6 fill-green-500" />
      )}
      <p
        className={clsx("text-sm/6", {
          "text-red-500": severity === "error",
          "text-yellow-500": severity === "warning",
          "text-gray-500": severity === "info",
          "text-green-500": severity === "success",
        })}
      >
        {message}
      </p>
    </div>
  )
}
