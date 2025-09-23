"use client"

import { usePathname } from "next/navigation"
import Topbar from "@/components/topbar"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  // Ocultar topbar en home y login
  const hideTopbar = pathname === "/" || pathname === "/login"

  return (
    <div className="min-h-screen bg-gray-50">
      {!hideTopbar && <Topbar />}
      <main className={!hideTopbar ? "pt-16 px-6" : ""}>
        {children}
      </main>
    </div>
  )
}
