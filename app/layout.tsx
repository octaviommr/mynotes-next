import type { Metadata } from "next"
import localFont from "next/font/local"
import "./ui/globals.css"
import Header from "./ui/header"
import MessageProvider from "./ui/messages/message-context"
import ModalProvider from "./ui/modals/modal-context"

const geistSans = localFont({
  src: "./ui/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./ui/fonts/GeistMonoVF.woff",
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
              <div className="flex-1">{children}</div>
            </div>
          </ModalProvider>
        </MessageProvider>
      </body>
    </html>
  )
}
