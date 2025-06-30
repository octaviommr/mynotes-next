export default function ErrorMessage({
  id,
  message,
}: Readonly<{ id: string; message: string }>) {
  return (
    <p id={id} className="text-sm/6 text-red-500" role="alert">
      {message}
    </p>
  )
}
