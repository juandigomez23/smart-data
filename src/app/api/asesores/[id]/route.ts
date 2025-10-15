
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
          data.nombre,
          data.email,
          data.cedula,
          data.estado,
          data.rol,
          Array.isArray(data.formularios_permitidos) ? data.formularios_permitidos : [],
          id
        ]
      )

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: "Asesor no encontrado" },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: result.rows[0],
        message: "Asesor actualizado exitosamente",
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
