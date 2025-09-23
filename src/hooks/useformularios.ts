"use client"

import { useEffect, useState } from "react"

export interface Formulario {
  id: number
  tipo: string
  fecha: string
  asesor: string
  datos: Record<string, string | number | boolean>
}

export function useFormularios() {
  const [formularios, setFormularios] = useState<Formulario[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/formularios")
        if (!res.ok) throw new Error("Error al obtener formularios")
        const data = await res.json()
        setFormularios(data)
      } catch (err) {
        setError((err as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { formularios, loading, error }
}
