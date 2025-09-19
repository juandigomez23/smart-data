"use client"

import { useSession, signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function Topbar() {
  const { data: session } = useSession()

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b shadow-sm">
      {/* Logo o título */}
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl text-gray-800">Smart Data</span>
      </div>

      {/* Usuario + Cerrar sesión */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end">
          <span className="font-semibold text-gray-800">
            {session?.user?.name || "Usuario"}
          </span>
          <span className="text-sm text-gray-500">
            {session?.user?.role || "sin rol"}
          </span>
        </div>

        {/* Botón cerrar sesión grande y rojo */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-sm shadow-md transition"
        >
          <LogOut className="w-5 h-5" />
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}
