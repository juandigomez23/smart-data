"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, FileSpreadsheet, ClipboardList, FileText } from "lucide-react"

const links = [
  { name: "Menú", href: "/admin", icon: LayoutDashboard },
  { name: "Gestión Asesores", href: "/admin/users", icon: Users },
  { name: "Editor de formularios", href: "/admin/form-editor", icon: FileText },
  { name: "Exportar Formularios", href: "/admin/exportar", icon: FileSpreadsheet },
  
]

export default function AdminSidebar() {
  const pathname = usePathname()
  return (
  <aside className="w-64 h-screen bg-gray-900 text-gray-100 flex flex-col fixed left-0 top-0 z-50">
      <div className="py-4 text-2xl font-bold border-b border-gray-700 flex items-center justify-center">
        Smart Data Admin
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          
          if (link.name === "Gestión Asesores") {
            return (
              <React.Fragment key="gestion-asesores-formularios">
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 p-2 rounded transition font-sans text-base font-semibold tracking-wide ${
                    isActive ? "bg-blue-600 text-white" : "text-gray-100 hover:bg-gray-800"
                  }`}
                  style={{ textAlign: 'left' }}
                >
                  <link.icon className="w-5 h-5" />
                  {link.name}
                </Link>
                
                <Link
                  key="Formularios disponibles"
                  href="/admin/formularios"
                  className={`flex items-center gap-3 p-2 rounded transition font-sans text-base font-semibold tracking-wide w-full mt-1 ${
                    pathname === "/admin/formularios" ? "bg-blue-600 text-white" : "text-gray-100 hover:bg-gray-800"
                  }`}
                  style={{ textAlign: 'left' }}
                >
                  <ClipboardList className="w-5 h-5" />
                  Formularios
                </Link>
                <Link
                  key="Permisos de Asesor"
                  href="/admin/permisos"
                  className={`flex items-center gap-3 p-2 rounded transition font-sans text-base font-semibold tracking-wide w-full mt-1 ${
                    pathname === "/admin/permisos" ? "bg-blue-600 text-white" : "text-gray-100 hover:bg-gray-800"
                  }`}
                  style={{ textAlign: 'left' }}
                >
                  <Users className="w-5 h-5" />
                  Permisos de Asesor
                </Link>
              </React.Fragment>
            )
          }
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 p-2 rounded transition font-sans text-base font-semibold tracking-wide ${
                isActive ? "bg-blue-600 text-white" : "text-gray-100 hover:bg-gray-800"
              }`}
              style={{ textAlign: 'left' }}
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
