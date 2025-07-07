import type { Metadata } from "next"
import FormPage, { TITLE_ID } from "@/components/ui/pages/FormPage"
import Link from "@/components/ui/Link"
import LogInForm from "./LogInForm"

export const metadata: Metadata = {
  title: "Log In",
}

export default function LogIn() {
  return (
    <FormPage
      title="Log In"
      footer={
        <footer className="flex items-center justify-center gap-2">
          <p>Don&apos;t have an account yet?</p>
          <Link href="/signup">Sign Up</Link>
        </footer>
      }
    >
      <LogInForm aria-labelledby={TITLE_ID} />
    </FormPage>
  )
}
