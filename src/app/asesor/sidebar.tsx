"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, FilePlus, Users } from "lucide-react"

const links = [
  { name: "Dashboard", href: "/asesor", icon: LayoutDashboard },
  { name: "Registrar llamada", href: "/asesor/registrar", icon: FilePlus },
  { name: "Mis clientes", href: "/asesor/clientes", icon: Users },
]

export default function SidebarAsesor() {
  const pathname = usePathname()

  return (
  <aside className="w-64 h-screen bg-gray-900 text-gray-100 flex flex-col fixed left-0 top-0 z-50 shadow-lg">
      <div className="py-6 flex flex-col items-center border-b border-blue-800">
  <span className="text-xl font-extrabold tracking-wide">Smart Data</span>
  <span className="text-xs text-gray-400 mt-1">Asesor</span>
      </div>

      <nav className="flex-1 px-6 py-8 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-4 p-3 rounded-lg font-medium transition ${
                isActive ? "bg-gray-800 text-white shadow" : "hover:bg-gray-800"
              }`}
            >
              <link.icon className="w-6 h-6" />
              {link.name}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
