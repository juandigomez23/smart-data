import SidebarAsesor from "@/app/asesor/sidebar"
import Topbar from "@/components/topbar"

export default function AsesorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <SidebarAsesor />
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <Topbar />
           <main className="flex-1 min-h-screen bg-gray-100">{children}</main>
      </div>
    </div>
  )
}
