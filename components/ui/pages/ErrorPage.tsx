import PageTitle from "./PageTitle"

export default function ErrorPage({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <PageTitle title="Ooops..." />
      {children}
    </div>
  )
}
