"use client"

import { useSession, signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

export default function Topbar() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-gray-800 shadow-md z-50">
        <span className="text-gray-300">Cargando sesión...</span>
      </header>
    )
  }

  const username = session?.user?.username || "Usuario"
  const role = session?.user?.role || "sin rol"

  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
  <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-6 bg-gray-800 shadow-md z-40 w-full">
      
      <div className="flex items-center gap-2">
        <span className="font-bold text-xl text-white">   </span>
      </div>

      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold shadow">
            {initials}
          </div>

          
          <div className="flex flex-col items-end">
            <span className="font-semibold text-white">
              Bienvenido, {username}
            </span>
            <span className="text-sm text-gray-300 capitalize">
              {role}
            </span>
          </div>
        </div>

        
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
