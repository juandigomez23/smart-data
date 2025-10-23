import { NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"


interface PostgreSQLError extends Error {
  code?: string
}


function isPostgreSQLError(error: unknown): error is PostgreSQLError {
  return error instanceof Error && "code" in error
}

export async function GET() {
  let client
  try {
    client = await pool.connect()

    const result = await client.query(`
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
        formularios_permitidos,
        created_at,
        updated_at
      FROM asesores
      ORDER BY created_at DESC
    `)

    // Normalize formularios_permitidos for each row to ensure it's always an array
    const normalizedRows = result.rows.map((r: unknown) => {
      const row = r as Record<string, unknown>;
      const raw = row.formularios_permitidos;
      let normalized: string[] = [];
      if (Array.isArray(raw)) normalized = raw;
      else if (!raw) normalized = [];
      else if (typeof raw === 'string') {
        try {
          const parsed = JSON.parse(raw);
          normalized = Array.isArray(parsed) ? parsed : [];
        } catch {
          normalized = [];
        }
      } else {
        normalized = [];
      }
      return {
        id: row.id as number,
        nombre: row.nombre as string,
        email: row.email as string | null,
        cedula: row.cedula as string | null,
        estado: row.estado as string,
        rol: row.rol as string,
        fechaRegistro: row.fechaRegistro as string | null,
        ultimoAcceso: row.ultimoAcceso as string | null,
        formulariosCompletados: row.formularios_completados as number,
        eficiencia: row.eficiencia as number,
        formularios_permitidos: normalized,
        created_at: row.created_at as string | null,
        updated_at: row.updated_at as string | null,
      };
    });

    return NextResponse.json({
      success: true,
      data: normalizedRows,
    })
  } catch (error) {
    console.error("Error obteniendo asesores:", error)
    return NextResponse.json(
      { success: false, error: "Error al obtener asesores" },
      { status: 500 }
    )
  } finally {
    if (client) client.release()
  }
}

export async function POST(request: NextRequest) {
  let client
  try {
    const data = await request.json()

    
    if (!data.nombre || !data.email) {
      return NextResponse.json(
        { success: false, error: "Nombre y email son requeridos" },
        { status: 400 }
      )
    }

    client = await pool.connect()

    // Let the database assign the serial integer id (no UUIDs)
    const result = await client.query(
      `
      INSERT INTO asesores 
        (nombre, email, cedula, estado, rol, formularios_permitidos, updated_at)
      VALUES 
        ($1, $2, $3, $4, $5, $6, NOW())
      RETURNING 
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
        formularios_permitidos,
        created_at,
        updated_at
      `,
      [
        data.nombre,
        data.email,
        data.cedula || null,
        data.estado || "activo",
        data.rol || "asesor",
        JSON.stringify(Array.isArray(data.formularios_permitidos) ? data.formularios_permitidos : []),
      ]
    )

    return NextResponse.json(
      {
        success: true,
        data: result.rows[0],
        message: "Asesor creado exitosamente",
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creando asesor:", error)

   
    if (isPostgreSQLError(error) && error.code === "23505") {
      return NextResponse.json(
        { success: false, error: "El email ya está registrado" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { success: false, error: "Error al crear asesor" },
      { status: 500 }
    )
  } finally {
    if (client) client.release()
  }
}
