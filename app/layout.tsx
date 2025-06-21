import type { Metadata } from "next"
import localFont from "next/font/local"
import "@/styles/globals.css"
import Header from "@/components/layout/Header"
import MessageProvider from "@/contexts/message/MessageContext"
import ModalProvider from "@/contexts/modal/ModalContext"

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: {
    template: "%s | MyNotes",
    default: "MyNotes",
  },
  description:
    "A very simple note board application showcasing the Next.js framework, written for sandboxing and demonstration purposes.",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MessageProvider>
          <ModalProvider>
            <div className="flex h-full flex-col font-[family-name:var(--font-geist-sans)]">
              <Header />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
          </ModalProvider>
        </MessageProvider>
      </body>
    </html>
  )
}
