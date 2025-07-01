export default function PageTitle({
  title,
  id,
}: Readonly<{ title: string; id?: string }>) {
  return (
    <h1 id={id} className="text-center text-3xl font-bold">
      {title}
    </h1>
  )
}
