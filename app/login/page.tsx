import type { Metadata } from "next"
import PageTitle from "@/components/ui/pages/PageTitle"
import Link from "@/components/ui/Link"
import LogInForm from "./LogInForm"

export const metadata: Metadata = {
  title: "Log In",
}

const LOG_IN_TITLE_ID = "log-in-title"

export default function LogIn() {
  return (
    <div className="flex h-full flex-col justify-center gap-10">
      <PageTitle id={LOG_IN_TITLE_ID} title="Log In" />
      <div className="mx-auto w-full max-w-sm">
        <LogInForm aria-labelledby={LOG_IN_TITLE_ID} />
      </div>
      <footer className="flex items-center justify-center gap-2">
        <p>Don&apos;t have an account yet?</p>
        <Link href="/signup">Sign Up</Link>
      </footer>
    </div>
  )
}
