import SidebarAsesor from "@/app/asesor/sidebar"
import Topbar from "@/components/topbar"

export default function AsesorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: 'url(/Fondo.jpg)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'top left',
      }}
    >
      <div className="flex">
        <SidebarAsesor />
        <div className="flex-1 ml-64 min-h-screen flex flex-col">
          <Topbar />
          <main className="flex-1 min-h-screen">{children}</main>
        </div>
      </div>
    </div>
  )
}
