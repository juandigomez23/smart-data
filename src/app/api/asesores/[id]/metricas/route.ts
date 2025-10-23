import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";


export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const asesorIdRaw = session?.user?.id as string | undefined
    console.log("🔎 asesorId en métricas:", asesorIdRaw);

    const asesorId = asesorIdRaw ? Number(asesorIdRaw) : undefined

    if (!asesorId) {
      return NextResponse.json(
        { success: false, error: "Usuario no autenticado" },
        { status: 401 }
      );
    }


    const qGestionesHoy = `SELECT COUNT(*)::int AS total
       FROM public.formularios
       WHERE asesor_id = $1
         AND DATE(created_at) = CURRENT_DATE`;

    const qTotalFormularios = `SELECT COUNT(*)::int AS total
       FROM public.formularios
       WHERE asesor_id = $1`;

    let gestionesHoy, totalFormularios
    try {
  console.log("SQL métricas - qGestionesHoy:", qGestionesHoy, "params:", [asesorId])
  gestionesHoy = await pool.query(qGestionesHoy, [asesorId])

  console.log("SQL métricas - qTotalFormularios:", qTotalFormularios, "params:", [asesorId])
  totalFormularios = await pool.query(qTotalFormularios, [asesorId])
    } catch (err: unknown) {
      // Cast to a flexible Postgres error-like shape for logging
      const pgErr = err as { message?: string; code?: string; detail?: string; hint?: string } | undefined
      // Log useful Postgres error metadata when available
      console.error("Error ejecutando consultas métricas:", {
        message: pgErr?.message,
        code: pgErr?.code,
        detail: pgErr?.detail,
        hint: pgErr?.hint,
      })

      // If relation missing, give a clear message, otherwise include code when present
      if (pgErr?.code === '42P01') {
        return NextResponse.json(
          { success: false, error: "Tabla 'formularios' no encontrada en la base de datos" },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { success: false, error: "Error al ejecutar consultas de métricas", code: pgErr?.code ?? null },
        { status: 500 }
      )
    }

 

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
