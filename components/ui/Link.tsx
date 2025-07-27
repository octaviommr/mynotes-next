import { forwardRef } from "react"
import NextLink from "next/link"
import clsx from "clsx"

export default forwardRef<
  React.ComponentRef<typeof NextLink>,
  React.ComponentProps<typeof NextLink>
>(function Link({ className, children, ...props }, ref) {
  return (
    <NextLink
      ref={ref}
      className={clsx("text-sm/6 font-medium", className)}
      {...props}
    >
      {children}
    </NextLink>
  )
})
