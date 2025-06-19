import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Ooops...</h1>
      <p>Page not found.</p>
      <Link href="/" className="text-sm/6 font-medium">
        Go to Homepage
      </Link>
    </div>
  )
}
