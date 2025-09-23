"use client"

import { useSession } from "next-auth/react"

export function useAsesor() {
  const { data: session, status } = useSession()

  return {
    id: session?.user?.id ?? null,
    nombre: session?.user?.username ?? null,
    email: session?.user?.email ?? null,
    role: session?.user?.role ?? null,
    cargando: status === "loading",
    autenticado: status === "authenticated",
  }
}
