import NextLink from "next/link"

type LinkProps = Omit<React.ComponentProps<typeof NextLink>, "className">

export default function Link({ children, ...props }: LinkProps) {
  return (
    <NextLink className="text-sm/6 font-medium" {...props}>
      {children}
    </NextLink>
  )
}
