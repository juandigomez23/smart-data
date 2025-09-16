export default function AsesorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-600 text-white p-4">Asesor Navbar</header>
      <main className="p-6">{children}</main>
    </div>
  )
}
