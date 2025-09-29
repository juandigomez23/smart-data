import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
   
    const asesoresRes = await pool.query(
      `SELECT nombre FROM asesores ORDER BY nombre`
    );
    const asesores = asesoresRes.rows.map((r) => r.nombre);

    
    const tiposRes = await pool.query(
      `SELECT DISTINCT tipo FROM public.formularios ORDER BY tipo`
    );
    const tipos = tiposRes.rows.map((r) => r.tipo);

    return NextResponse.json({
      success: true,
      asesores,
      tipos,
    });
  } catch (error) {
    console.error("❌ Error en GET opciones:", error);
    return NextResponse.json(
      { success: false, error: "Error al leer opciones" },
      { status: 500 }
    );
  }
}