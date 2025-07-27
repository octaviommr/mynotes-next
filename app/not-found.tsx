import ErrorPage from "@/components/ui/pages/ErrorPage"
import Link from "@/components/ui/Link"

export default function NotFound() {
  return (
    <ErrorPage
      title="Ooops..."
      message="Page not found."
      action={<Link href="/">Go to Homepage</Link>}
    />
  )
}
