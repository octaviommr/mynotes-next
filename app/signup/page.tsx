import type { Metadata } from "next"
import Link from "next/link"
import SignUpForm from "../ui/auth/sign-up-form"

export const metadata: Metadata = {
  title: "Sign Up",
}

export default function SignUp() {
  return (
    <main className="flex h-full flex-col justify-center gap-10">
      <h2 className="text-center text-2xl font-bold">Sign Up</h2>
      <div className="mx-auto w-full max-w-sm">
        <SignUpForm />
      </div>
      <div className="flex flex-col items-center">
        <p>Already have an account?</p>
        <Link href="/login" className="text-sm/6 font-medium">
          Log In
        </Link>
      </div>
    </main>
  )
}
