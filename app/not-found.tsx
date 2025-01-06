import Link from "next/link"

export default async function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Ooops...</h2>
      <p>Page not found.</p>
      <Link href="/" className="text-sm/6 font-medium">
        Go to Homepage
      </Link>
    </div>
  )
}
