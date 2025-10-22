import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";


export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const asesorIdRaw = session?.user?.id;
    const asesorId = typeof asesorIdRaw === "string" ? parseInt(asesorIdRaw, 10) : asesorIdRaw;
    console.log("🔎 asesorId en métricas:", asesorId);

    if (!asesorId) {
      return NextResponse.json(
        { success: false, error: "Usuario no autenticado" },
        { status: 401 }
      );
    }


    const gestionesHoy = await pool.query(
      `SELECT COUNT(*)::int AS total
       FROM public.formularios
       WHERE asesor_id = $1
         AND DATE(created_at) = CURRENT_DATE`,
      [asesorId]
    );

    const totalFormularios = await pool.query(
      `SELECT COUNT(*)::int AS total
       FROM public.formularios
       WHERE asesor_id = $1`,
      [asesorId]
    );

 

    return NextResponse.json({
      success: true,
      metrics: {
        gestionesHoy: gestionesHoy.rows[0].total,
        totalFormularios: totalFormularios.rows[0].total,
        eficiencia: 0,
      },
    });
  } catch (error) {
    console.error("❌ Error en GET métricas:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener métricas" },
      { status: 500 }
    );
  }
}
