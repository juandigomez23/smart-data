"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { LayoutDashboard, Users, FileText, LogOut } from "lucide-react"

const links = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Asesores", href: "/admin/users", icon: Users },
  { name: "Reportes", href: "/admin/reports", icon: FileText },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-100 flex flex-col fixed">
      {/* Logo */}
      <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
        Smart Data
      </div>

      {/* Navegación */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 p-2 rounded transition ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-800"
              }`}
            >
              <link.icon className="w-5 h-5" />
              {link.name}
            </Link>
          )
        })}
      </nav>

      {/* Cerrar sesión */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 text-red-400 hover:text-red-300 w-full"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
