import "./globals.css"
import Providers from "@/components/providers"
import Navbar from "@/components/navbar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <Providers>
          <Navbar />
          <main className="p-6">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
