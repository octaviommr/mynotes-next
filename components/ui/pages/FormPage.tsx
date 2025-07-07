import PageTitle from "./PageTitle"

export const TITLE_ID = "form-page-title"

export default function FormPage({
  title,
  children,
  footer,
}: Readonly<{
  title: string
  children: React.ReactNode
  footer?: React.ReactNode
}>) {
  return (
    <div className="flex h-full flex-col justify-center gap-10">
      <PageTitle id={TITLE_ID} title={title} />
      <div className="mx-auto w-full max-w-sm">{children}</div>
      {footer}
    </div>
  )
}
