import { NextResponse } from "next/server"

interface Formulario {
  id: number
  tipo: string
  fecha: string
  usuario: string
  datos: Record<string, string | number | boolean>
}

// Datos en memoria temporal
const dataStore: Formulario[] = []

// POST → guardar nuevo formulario
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const nuevoFormulario: Formulario = {
      id: Date.now(),
      tipo: body.tipo || "desconocido",
      fecha: new Date().toISOString(),
      usuario: body.usuario || "anonimo",
      datos: body.datos || {},
    }
    dataStore.push(nuevoFormulario)

    return NextResponse.json({
      success: true,
      message: "Formulario guardado correctamente",
      data: nuevoFormulario,
    })
  } catch (err: unknown) {
    console.error("Error en POST:", err)
    return NextResponse.json(
      { success: false, error: "Error al guardar" },
      { status: 500 }
    )
  }
}

// GET → obtener formularios (opcionalmente filtrados)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const tipo = searchParams.get("tipo")
  const usuario = searchParams.get("usuario")

  let resultados = dataStore

  if (tipo) {
    resultados = resultados.filter((f) => f.tipo === tipo)
  }

  if (usuario) {
    resultados = resultados.filter((f) => f.usuario === usuario)
  }

  return NextResponse.json(resultados)
}
