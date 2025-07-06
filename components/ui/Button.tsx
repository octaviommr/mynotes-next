import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@headlessui/react"
import clsx from "clsx"

type ButtonProps = Omit<HeadlessButtonProps, "className"> &
  Readonly<{
    variant?: "primary" | "secondary"
    fullWidth?: boolean
  }>

export default function Button({
  children,
  variant,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <HeadlessButton
      className={clsx(
        "rounded-md border border-solid border-[var(--border)] px-3 py-1.5 text-sm/6 font-semibold",
        {
          "bg-[var(--secondary-background)]": variant !== "secondary",
          "w-full": fullWidth,
        },
      )}
      {...props}
    >
      {children}
    </HeadlessButton>
  )
}
