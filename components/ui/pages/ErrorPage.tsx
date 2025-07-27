import PageTitle from "./PageTitle"

export default function ErrorPage({
  title,
  message,
  action,
}: Readonly<{ title: string; message: string; action: React.ReactNode }>) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <PageTitle title={title} />
      <p>{message}</p>
      {action}
    </div>
  )
}
