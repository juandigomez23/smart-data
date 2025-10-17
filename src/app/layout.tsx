import "./globals.css"
import Providers from "@/components/providers"
import ClientLayout from "@/components/client-layout"

export const metadata = {
  title: "Smart Data",
  description: "Plataforma de gestión corporativa",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>
        <div
          style={{
            minHeight: '100vh',
            width: '100vw',
            backgroundImage: 'url(/Fondo.jpg)',
            backgroundSize: 'auto',
            backgroundPosition: 'top left',
            backgroundRepeat: 'repeat',
          }}
        >
          <Providers>
            <ClientLayout>{children}</ClientLayout>
          </Providers>
        </div>
      </body>
    </html>
  )
}
