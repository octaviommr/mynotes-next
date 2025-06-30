import PageTitle from "./PageTitle"

export default function FormPage({
  title,
  children,
  footer,
}: Readonly<{
  title: string
  formLabelId?: string
  children: React.ReactNode
  footer?: () => React.ReactNode
}>) {
  return (
    <div className="flex h-full flex-col justify-center gap-10">
      <PageTitle title={title} />
      <div className="mx-auto w-full max-w-sm">{children}</div>
      {footer && footer()}
    </div>
  )
}
