import SideNav from "../ui/notes/SideNav"

export default function NotesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-full flex-col md:flex-row">
      <div className="md:w-64">
        <SideNav />
      </div>
      <main className="flex-1 p-4 md:overflow-auto md:p-8">{children}</main>
    </div>
  )
}
