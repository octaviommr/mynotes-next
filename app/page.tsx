import { ArrowRightIcon } from "@heroicons/react/20/solid"
import PageTitle from "@/components/ui/pages/PageTitle"
import Link from "@/components/ui/Link"

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <PageTitle title="Welcome to MyNotes!" />
      <Link href="/notes">
        <span>Go to Note Board</span>
        <ArrowRightIcon className="size-5" />
      </Link>
    </div>
  )
}
