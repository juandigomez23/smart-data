"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return
    if (!session || session.user?.role !== "admin") {
      router.push("/login")
    }
  }, [session, status, router])

  if (status === "loading") return <p>Cargando...</p>

  return <h1>Bienvenido Admin 👑</h1>
}
