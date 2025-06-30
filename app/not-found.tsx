import ErrorPage from "@/components/ui/pages/ErrorPage"
import Link from "@/components/ui/Link"

export default function NotFound() {
  return (
    <ErrorPage>
      <p>Page not found.</p>
      <Link href="/">Go to Homepage</Link>
    </ErrorPage>
  )
}
