import "./globals.css"
import Providers from "@/components/providers"

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
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
