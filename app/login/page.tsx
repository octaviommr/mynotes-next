import type { Metadata } from "next"
import Link from "next/link"
import LogInForm from "../ui/auth/log-in-form"

export const metadata: Metadata = {
  title: "Log In",
}

export default function LogIn() {
  return (
    <main className="flex h-full flex-col justify-center gap-10">
      <h2 className="text-center text-2xl font-bold">Log In</h2>
      <div className="mx-auto w-full max-w-sm">
        <LogInForm />
      </div>
      <div className="flex flex-col items-center">
        <p>Don&apos;t have an account yet?</p>
        <Link href="/signup" className="text-sm/6 font-medium">
          Sign Up
        </Link>
      </div>
    </main>
  )
}
