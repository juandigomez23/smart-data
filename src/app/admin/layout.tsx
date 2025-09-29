import Sidebar from "./sidebar"
import Topbar from "@/components/topbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      {}
      <Sidebar />

      {}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Topbar */}
        <Topbar />

        {}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  )
}
