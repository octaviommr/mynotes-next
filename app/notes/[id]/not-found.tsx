import ErrorPage from "@/components/ui/pages/ErrorPage"
import Link from "@/components/ui/Link"

export default function NotFoundNote() {
  return (
    <ErrorPage
      title="Ooops..."
      message="Note not found."
      action={<Link href="/notes">Go to Note Board</Link>}
    />
  )
}
