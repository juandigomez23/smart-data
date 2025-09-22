import { NextResponse } from "next/server"
import pool from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tipo, usuario, datos, pais } = body;

    console.log("📨 POST recibido:", { tipo, usuario, pais })

    // Validación
    if (!tipo) {
      return NextResponse.json(
        { success: false, error: "Campo obligatorio faltante: tipo" },
        { status: 400 }
      );
    }
    
    if (!usuario) {
      return NextResponse.json(
        { success: false, error: "Campo obligatorio faltante: usuario" },
        { status: 400 }
      );
    }
    
    if (!datos) {
      return NextResponse.json(
        { success: false, error: "Campo obligatorio faltante: datos" },
        { status: 400 }
      );
    }

    // Insertar en BD
    const result = await pool.query(
      `INSERT INTO public.formularios (tipo, usuario, datos, pais) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [tipo, usuario, JSON.stringify(datos), pais || null]
    );

    console.log("✅ Formulario guardado. ID:", result.rows[0].id)

    return NextResponse.json({
      success: true,
      message: "Formulario guardado correctamente",
      data: result.rows[0],
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error("❌ Error en POST:", errorMessage);
    return NextResponse.json(
      { success: false, error: "Error al guardar en la base de datos" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM public.formularios ORDER BY created_at DESC');
    return NextResponse.json({
      success: true,
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error("Error en GET:", errorMessage);
    return NextResponse.json(
      { success: false, error: "Error al leer de la base de datos" },
      { status: 500 }
    );
  }
}