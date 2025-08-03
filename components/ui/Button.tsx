import { forwardRef } from "react"
import {
  Button as HeadlessButton,
  type ButtonProps as HeadlessButtonProps,
} from "@headlessui/react"
import clsx from "clsx"

type ButtonVariant = "primary" | "secondary"

type ButtonProps = Omit<
  HeadlessButtonProps,
  "aria-disabled" | "as" | "children"
> &
  Readonly<{
    children?: React.ReactNode
    variant?: ButtonVariant
  }>

export default forwardRef<
  React.ComponentRef<typeof HeadlessButton>,
  ButtonProps
>(function Button({ className, children, variant, ...props }, ref) {
  return (
    <HeadlessButton
      ref={ref}
      className={clsx(
        "rounded-md border border-solid border-[var(--border)] px-3 py-1.5 text-sm/6 font-semibold",
        {
          "bg-[var(--secondary-background)]": variant !== "secondary",
        },
        className,
      )}
      {...props}
    >
      {children}
    </HeadlessButton>
  )
})
