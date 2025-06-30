import ErrorPage from "@/components/ui/pages/ErrorPage"
import Link from "@/components/ui/Link"

export default function NotFoundNote() {
  return (
    <ErrorPage>
      <p>Note not found.</p>
      <Link href="/notes">Go to Note Board</Link>
    </ErrorPage>
  )
}
