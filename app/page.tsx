import PageTitle from "@/components/ui/pages/PageTitle"
import Link from "@/components/ui/Link"

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <PageTitle title="Welcome to MyNotes!" />
      <Link href="/notes">Go to Note Board</Link>
    </div>
  )
}
