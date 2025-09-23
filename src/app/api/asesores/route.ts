import { NextRequest, NextResponse } from 'next/server'
import pool from '@/lib/db'

// Interface para el error de PostgreSQL
interface PostgreSQLError extends Error {
  code?: string
}

// Type guard para verificar si es error de PostgreSQL
function isPostgreSQLError(error: unknown): error is PostgreSQLError {
  return error instanceof Error && 'code' in error
}

export async function GET() {
  let client;
  try {
    client = await pool.connect()
    
    const result = await client.query(`
      SELECT 
        id,
        nombre,
        email,
        telefono,
        pais,
        estado,
        rol,
        fecha_registro as "fechaRegistro",
        ultimo_acceso as "ultimoAcceso",
        formularios_completados as "formulariosCompletados",
        eficiencia,
        created_at,
        updated_at
      FROM asesores 
      ORDER BY created_at DESC
    `)

    return NextResponse.json({ 
      success: true, 
      data: result.rows 
    })
  } catch (error) {
    console.error('Error obteniendo asesores:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener asesores' }, 
      { status: 500 }
    )
  } finally {
    if (client) {
      client.release()
    }
  }
}

export async function POST(request: NextRequest) {
  let client;
  try {
    const data = await request.json()
    
    // Validar datos requeridos
    if (!data.nombre || !data.email) {
      return NextResponse.json(
        { success: false, error: 'Nombre y email son requeridos' },
        { status: 400 }
      )
    }

    client = await pool.connect()
    
    const result = await client.query(`
      INSERT INTO asesores 
        (nombre, email, telefono, pais, estado, rol)
      VALUES 
        ($1, $2, $3, $4, $5, $6)
      RETURNING 
        id,
        nombre,
        email,
        telefono,
        pais,
        estado,
        rol,
        fecha_registro as "fechaRegistro",
        ultimo_acceso as "ultimoAcceso",
        formularios_completados as "formulariosCompletados",
        eficiencia
    `, [
      data.nombre, 
      data.email, 
      data.telefono || null, 
      data.pais || null, 
      data.estado || 'activo', 
      data.rol || 'asesor'
    ])

    return NextResponse.json({ 
      success: true, 
      data: result.rows[0],
      message: 'Asesor creado exitosamente' 
    }, { status: 201 })
  } catch (error) {
    console.error('Error creando asesor:', error)
    
    // Manejar error de duplicado de email
    if (isPostgreSQLError(error) && error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'El email ya está registrado' }, 
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Error al crear asesor' }, 
      { status: 500 }
    )
  } finally {
    if (client) {
      client.release()
    }
  }
}