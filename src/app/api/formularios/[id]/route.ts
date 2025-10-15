import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (!id || isNaN(id)) {
      return NextResponse.json({ success: false, error: "ID inválido" }, { status: 400 });
    }
    const result = await pool.query("DELETE FROM public.formularios WHERE id = $1 RETURNING id", [id]);
    if (result.rowCount === 0) {
      return NextResponse.json({ success: false, error: "Registro no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("❌ Error al eliminar registro:", error);
    return NextResponse.json({ success: false, error: "Error al eliminar en la base de datos" }, { status: 500 });
  }
}
