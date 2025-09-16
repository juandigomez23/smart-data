"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

export default function Navbar() {
  const { data: session } = useSession()

  if (!session) return null // No mostrar si no hay sesión

  const role = session.user.role

  const links = {
    admin: [
      { href: "/admin", label: "Dashboard" },
      { href: "/admin/users", label: "Usuarios" },
    ],
    asesor: [
      { href: "/asesor", label: "Dashboard" },
      { href: "/asesor/clientes", label: "Clientes" },
    ],
    auditor: [
      { href: "/auditor", label: "Dashboard" },
      { href: "/auditor/reportes", label: "Reportes" },
    ],
  }

  return (
    <nav className="w-full bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <h1 className="text-lg font-bold">Hughesnet Center</h1>
      <div className="flex gap-4">
        {links[role as keyof typeof links].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:underline"
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
        >
          Cerrar sesión
        </button>
      </div>
    </nav>
  )
}
