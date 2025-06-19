import type { Metadata } from "next"
import Link from "next/link"
import LogInForm from "../ui/auth/log-in-form"

export const metadata: Metadata = {
  title: "Log In",
}

export default function LogIn() {
  return (
    <div className="flex h-full flex-col justify-center gap-10">
      <h1 className="text-center text-3xl font-bold">Log In</h1>
      <div className="mx-auto w-full max-w-sm">
        <LogInForm />
      </div>
      <footer className="flex items-center justify-center gap-2">
        <p>Don&apos;t have an account yet?</p>
        <Link href="/signup" className="text-sm/6 font-medium">
          Sign Up
        </Link>
      </footer>
    </div>
  )
}
