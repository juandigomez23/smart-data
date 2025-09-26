import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// 📌 GET: métricas en tiempo real del asesor autenticado
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

    // 🔹 Formularios completados HOY
    const gestionesHoy = await pool.query(
      `SELECT COUNT(*)::int AS total
       FROM public.formularios
       WHERE asesor_id = $1
         AND DATE(created_at) = CURRENT_DATE`,
      [asesorId]
    );

    // 🔹 Total de formularios del asesor
    const totalFormularios = await pool.query(
      `SELECT COUNT(*)::int AS total
       FROM public.formularios
       WHERE asesor_id = $1`,
      [asesorId]
    );

    // 🔹 Eficiencia (a definir)
    // Ejemplo: porcentaje de formularios con código_gestion = 'retenido'
    /*
    const eficiencia = await pool.query(
      `SELECT 
         ROUND(100.0 * SUM(CASE WHEN datos->>'codigo_gestion' = 'retenido' THEN 1 ELSE 0 END)::numeric / NULLIF(COUNT(*), 0), 2) AS eficiencia
       FROM public.formularios
       WHERE asesor_id = $1`,
      [asesorId]
    );
    const eficienciaValue = eficiencia.rows[0].eficiencia || 0;
    */

    return NextResponse.json({
      success: true,
      metrics: {
        gestionesHoy: gestionesHoy.rows[0].total,
        totalFormularios: totalFormularios.rows[0].total,
        eficiencia: 0, // ⚡ pendiente definir fórmula
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
