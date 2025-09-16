export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">Admin Navbar</header>
      <main className="p-6">{children}</main>
    </div>
  )
}
