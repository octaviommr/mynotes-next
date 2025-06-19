import type { Metadata } from "next"
import Link from "next/link"
import SignUpForm from "../ui/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up",
}

export default function SignUp() {
  return (
    <div className="flex h-full flex-col justify-center gap-10">
      <h1 className="text-center text-3xl font-bold">Sign Up</h1>
      <div className="mx-auto w-full max-w-sm">
        <SignUpForm />
      </div>
      <footer className="flex items-center justify-center gap-2">
        <p>Already have an account?</p>
        <Link href="/login" className="text-sm/6 font-medium">
          Log In
        </Link>
      </footer>
    </div>
  )
}
