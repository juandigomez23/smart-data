
import { NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

interface PostgreSQLError extends Error {
  code?: string
}


function isPostgreSQLError(error: unknown): error is PostgreSQLError {
  return error instanceof Error && "code" in error
}


export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await context.params
    const id = parseInt(idString)

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "ID inválido" },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    try {
      const result = await client.query(
        `
        SELECT 
          id,
          nombre,
          email,
          cedula,
          estado,
          rol,
          fecha_registro as "fechaRegistro",
          ultimo_acceso as "ultimoAcceso",
          formularios_completados as "formulariosCompletados",
          eficiencia,
          formularios_permitidos
        FROM asesores 
        WHERE id = $1
        `,
        [id]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: "Asesor no encontrado" },
          { status: 404 }
        )
      }

      return NextResponse.json({ success: true, data: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("❌ Error obteniendo asesor:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener asesor" },
      { status: 500 }
    )
  }
}


export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await context.params
    const id = parseInt(idString)

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "ID inválido" },
        { status: 400 }
      )
    }

    const data = await request.json()
    const client = await pool.connect()

    try {
      // Leer fila existente para permitir actualizaciones parciales
      const existingRes = await client.query(`SELECT * FROM asesores WHERE id = $1 LIMIT 1`, [id])
      if (existingRes.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: "Asesor no encontrado" },
          { status: 404 }
        )
      }

      const existing = existingRes.rows[0]

      // Detectar si el payload incluye la propiedad (incluso si es null)
      const has = (k: string) => Object.prototype.hasOwnProperty.call(data, k)

      const nombrePayload = has('nombre') ? data.nombre : undefined
      const emailPayload = has('email') ? data.email : undefined
      const cedulaPayload = has('cedula') ? data.cedula : undefined
      const estadoPayload = has('estado') ? data.estado : undefined
      const rolPayload = has('rol') ? data.rol : undefined

      let nombre = nombrePayload !== undefined ? nombrePayload : existing.nombre
      const email = emailPayload !== undefined ? emailPayload : existing.email
      const cedula = cedulaPayload !== undefined ? cedulaPayload : existing.cedula
      const estado = estadoPayload !== undefined ? estadoPayload : existing.estado
      const rol = rolPayload !== undefined ? rolPayload : existing.rol

      // 'nombre' column is NOT NULL: ensure we don't write NULL or empty string
      if (nombre === null || nombre === undefined || String(nombre).trim() === '') {
        const candidate = (email as string) || existing.email
        if (candidate) nombre = String(candidate).split('@')[0] || 'Sin nombre'
        else nombre = 'Sin nombre'
      }

      // Manejar formularios_permitidos: si viene en payload usarlo, si no conservar existing
      let formulariosPermitidosToStore: string
      if (has('formularios_permitidos')) {
        formulariosPermitidosToStore = JSON.stringify(Array.isArray(data.formularios_permitidos) ? data.formularios_permitidos : [])
      } else {
        // existing may be string or array — stringify appropriately
        const existingFP = existing.formularios_permitidos
        formulariosPermitidosToStore = typeof existingFP === 'string' ? existingFP : JSON.stringify(existingFP || [])
      }

      const result = await client.query(
        `
        UPDATE asesores 
        SET 
          nombre = $1,
          email = $2,
          cedula = $3,
          estado = $4,
          rol = $5,
          formularios_permitidos = $6,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *
        `,
        [
          nombre,
          email,
          cedula,
          estado,
          rol,
          formulariosPermitidosToStore,
          id
        ]
      )

      return NextResponse.json({
        success: true,
        data: result.rows[0],
        message: 'Asesor actualizado exitosamente',
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("❌ Error actualizando asesor:", error)

    if (isPostgreSQLError(error) && error.code === "23505") {
      return NextResponse.json(
        { success: false, error: "El email ya está registrado" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: "Error al actualizar asesor" },
      { status: 500 }
    )
  }
}


export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await context.params
    const id = parseInt(idString)

    if (isNaN(id)) {
      return NextResponse.json(
        { success: false, error: "ID inválido" },
        { status: 400 }
      )
    }

    const client = await pool.connect()
    try {
      const result = await client.query(
        "DELETE FROM asesores WHERE id = $1 RETURNING *",
        [id]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: "Asesor no encontrado" },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        message: "Asesor eliminado exitosamente",
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error("❌ Error eliminando asesor:", error)
    return NextResponse.json(
      { success: false, error: "Error al eliminar asesor" },
      { status: 500 }
    )
  }
}
