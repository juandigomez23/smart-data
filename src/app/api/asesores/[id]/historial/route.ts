import { NextRequest, NextResponse } from "next/server"
import pool from "@/lib/db"

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const id = parseInt(context.params.id);
  if (isNaN(id)) {
    return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const fechaDesde = searchParams.get("fechaDesde");
  const fechaHasta = searchParams.get("fechaHasta");

  let query = `SELECT id, tipo, datos, created_at FROM formularios WHERE asesor_id = $1`;
  const params: (string | number)[] = [id];

  if (fechaDesde) {
    query += ` AND created_at >= $${params.length + 1}`;
    params.push(fechaDesde);
  }
  if (fechaHasta) {
    query += ` AND created_at <= $${params.length + 1}`;
    params.push(fechaHasta + ' 23:59:59');
  }
  query += ` ORDER BY created_at DESC`;

  let client;
  try {
    client = await pool.connect();
    const result = await client.query(query, params);
    return NextResponse.json({ success: true, data: result.rows });
  } catch {
    return NextResponse.json({ success: false, error: "Error al obtener historial" }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}