import type { Metadata } from "next"
import FormPage, { TITLE_ID } from "@/components/ui/pages/FormPage"
import Link from "@/components/ui/Link"
import SignUpForm from "./SignUpForm"

export const metadata: Metadata = {
  title: "Sign Up",
}

export default function SignUp() {
  return (
    <FormPage
      title="Log In"
      footer={() => (
        <footer className="flex items-center justify-center gap-2">
          <p>Already have an account?</p>
          <Link href="/login">Log In</Link>
        </footer>
      )}
    >
      <SignUpForm aria-labelledby={TITLE_ID} />
    </FormPage>
  )
}
