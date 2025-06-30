import NextLink from "next/link"

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, "className">

export default function Link({ children, ...props }: LinkProps) {
  return (
    <NextLink
      className="flex items-center justify-center gap-2 text-sm/6 font-medium"
      {...props}
    >
      {children}
    </NextLink>
  )
}
