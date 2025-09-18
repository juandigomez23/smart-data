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
    <aside className="w-64 h-screen bg-gray-900 text-gray-100 flex flex-col fixed">
      <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
        Smart Data - Asesor
      </div>

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
    </aside>
  )
}
