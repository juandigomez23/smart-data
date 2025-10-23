"use client"

import { useSession } from "next-auth/react"

export function useAsesor() {
  const { data: session, status } = useSession()

  return {
    id: session?.user?.id ?? null,
    // next-auth exposes `name` and `email` by default; `username` may not exist.
    nombre: session?.user?.name ?? session?.user?.email ?? null,
    email: session?.user?.email ?? null,
    role: session?.user?.role ?? null,
    cargando: status === "loading",
    autenticado: status === "authenticated",
  }
}
