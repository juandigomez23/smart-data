export default function AuditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-purple-600 text-white p-4">Auditor Navbar</header>
      <main className="p-6">{children}</main>
    </div>
  )
}
