import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const totalRes = await pool.query('SELECT COUNT(*)::int AS total FROM public.formularios');
    const missingRes = await pool.query('SELECT COUNT(*)::int AS missing FROM public.formularios WHERE asesor_id IS NULL');
    const sampleRes = await pool.query('SELECT id, tipo, asesor_id, asesor_nombre, created_at FROM public.formularios ORDER BY created_at DESC LIMIT 10');

    return NextResponse.json({
      success: true,
      total: totalRes.rows[0].total,
      missingAsesorId: missingRes.rows[0].missing,
      recent: sampleRes.rows,
    });
  } catch (error) {
    console.error('Error diagnosticando formularios:', error);
    return NextResponse.json({ success: false, error: 'Error al inspeccionar formularios' }, { status: 500 });
  }
}
