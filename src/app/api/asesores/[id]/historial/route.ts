import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const id = parseInt((await params).id);
  if (isNaN(id)) {
    return NextResponse.json(
      { success: false, error: "ID inválido" },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(request.url);
  const fechaDesde = searchParams.get("fechaDesde");
  const fechaHasta = searchParams.get("fechaHasta");
  const tipo = searchParams.get("tipo");

  let query = `SELECT id, tipo, datos, created_at FROM formularios WHERE asesor_id = $1`;
  const context: (string | number)[] = [id];

  if (fechaDesde) {
    query += ` AND created_at >= $${context.length + 1}`;
    context.push(fechaDesde);
  }
  if (fechaHasta) {
    query += ` AND created_at <= $${context.length + 1}`;
    context.push(fechaHasta + " 23:59:59");
  }
  if (tipo) {
    query += ` AND tipo ILIKE $${context.length + 1}`;
    context.push(`%${tipo}%`);
  }
  query += ` ORDER BY created_at DESC`;

  let client;
  try {
    client = await pool.connect();
  const result = await client.query(query, context);
  return NextResponse.json({ success: true, total: result.rowCount, data: result.rows });
  } catch {
    return NextResponse.json(
      { success: false, error: "Error al obtener historial" },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}
