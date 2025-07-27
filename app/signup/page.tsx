import type { Metadata } from "next"
import PageTitle from "@/components/ui/pages/PageTitle"
import Link from "@/components/ui/Link"
import SignUpForm from "./SignUpForm"

export const metadata: Metadata = {
  title: "Sign Up",
}

const SIGN_UP_TITLE_ID = "sign-up-title"

export default function SignUp() {
  return (
    <div className="flex h-full flex-col justify-center gap-10">
      <PageTitle id={SIGN_UP_TITLE_ID} title="Sign Up" />
      <div className="mx-auto w-full max-w-sm">
        <SignUpForm aria-labelledby={SIGN_UP_TITLE_ID} />
      </div>
      <footer className="flex items-center justify-center gap-2">
        <p>Already have an account?</p>
        <Link href="/login">Log In</Link>
      </footer>
    </div>
  )
}
