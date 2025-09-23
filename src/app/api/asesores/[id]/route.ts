// app/api/asesores/[id]/route.ts - VERSIÓN CORREGIDA
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const client = await pool.connect()
    
    try {
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
          eficiencia
        FROM asesores WHERE id = $1
      `, [id])

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Asesor no encontrado' }, 
          { status: 404 }
        )
      }

      return NextResponse.json({ success: true, data: result.rows[0] })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error obteniendo asesor:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener asesor' }, 
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const data = await request.json()
    const client = await pool.connect()
    
    try {
      const result = await client.query(`
        UPDATE asesores 
        SET 
          nombre = $1,
          email = $2,
          telefono = $3,
          pais = $4,
          estado = $5,
          rol = $6,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *
      `, [data.nombre, data.email, data.telefono, data.pais, data.estado, data.rol, id])

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Asesor no encontrado' }, 
          { status: 404 }
        )
      }

      return NextResponse.json({ 
        success: true, 
        data: result.rows[0],
        message: 'Asesor actualizado exitosamente' 
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error actualizando asesor:', error)
    
    // Type guard para verificar si es error de PostgreSQL
    if (isPostgreSQLError(error) && error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'El email ya está registrado' }, 
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Error al actualizar asesor' }, 
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const client = await pool.connect()
    
    try {
      const result = await client.query('DELETE FROM asesores WHERE id = $1 RETURNING *', [id])

      if (result.rows.length === 0) {
        return NextResponse.json(
          { success: false, error: 'Asesor no encontrado' }, 
          { status: 404 }
        )
      }

      return NextResponse.json({ 
        success: true, 
        message: 'Asesor eliminado exitosamente' 
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error eliminando asesor:', error)
    return NextResponse.json(
      { success: false, error: 'Error al eliminar asesor' }, 
      { status: 500 }
    )
  }
}