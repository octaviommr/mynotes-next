export default function PageTitle({ title }: Readonly<{ title: string }>) {
  return <h1 className="text-center text-3xl font-bold">{title}</h1>
}
