import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// 📌 POST: guardar formulario
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { tipo, datos } = body;

    if (!tipo || !datos) {
      return NextResponse.json(
        { success: false, error: "Campos obligatorios faltantes" },
        { status: 400 }
      );
    }

    //  Si es asesor => guarda su ID
    //  Si es admin/auditor => guarda NULL en asesor_id, y nombre en asesor_nombre
    let asesorId: number | null = null;
    const asesorNombre: string = user.username;

    if (user.role === "asesor") {
      asesorId = Number(user.id);
    }

    //  Guardar formulario
    const result = await pool.query(
      `INSERT INTO public.formularios (tipo, asesor_id, asesor_nombre, datos) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [tipo, asesorId, asesorNombre, JSON.stringify(datos)]
    );

    //  Si es asesor, actualizar métricas en la tabla asesores
    if (asesorId) {
      await pool.query(
        `UPDATE asesores 
         SET formularios_completados = formularios_completados + 1,
             updated_at = NOW()
         WHERE id = $1`,
        [asesorId]
      );

      //  Aquí más adelante puedes añadir lógica real de eficiencia
      // Ejemplo inicial: eficiencia = formularios_completados * 10 (dummy)
      await pool.query(
        `UPDATE asesores
         SET eficiencia = (formularios_completados * 10)
         WHERE id = $1`,
        [asesorId]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Formulario guardado correctamente",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error en POST:", error);
    return NextResponse.json(
      { success: false, error: "Error al guardar en la base de datos" },
      { status: 500 }
    );
  }
}

//  GET: obtener formularios del asesor autenticado
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Usuario no autenticado" },
        { status: 401 }
      );
    }

    // Leer filtros de la query
    const { searchParams } = new URL(req.url);
    const tipo = searchParams.get("tipo") || "";
    const asesor = searchParams.get("asesor") || "";
    const fechaDesde = searchParams.get("fechaDesde") || "";
    const fechaHasta = searchParams.get("fechaHasta") || "";

    // Construir consulta dinámica
  const where: string[] = [];
  const params: (string | number)[] = [];
    let idx = 1;

    if (user.role !== "admin" && user.role !== "auditor") {
      where.push(`f.asesor_id = $${idx}`);
      params.push(user.id);
      idx++;
    }
    if (tipo) {
      where.push(`f.tipo ILIKE $${idx}`);
      params.push(`%${tipo}%`);
      idx++;
    }
    if (asesor) {
      where.push(`f.asesor_nombre ILIKE $${idx}`);
      params.push(`%${asesor}%`);
      idx++;
    }
    if (fechaDesde) {
      where.push(`f.created_at >= $${idx}`);
      params.push(fechaDesde);
      idx++;
    }
    if (fechaHasta) {
      where.push(`f.created_at <= $${idx}`);
      params.push(fechaHasta);
      idx++;
    }

    const whereClause = where.length ? `WHERE ${where.join(" AND ")}` : "";
    const query = `SELECT f.id, f.tipo, f.asesor_nombre as asesor, f.datos, f.created_at FROM public.formularios f ${whereClause} ORDER BY f.created_at DESC`;
    const result = await pool.query(query, params);

    return NextResponse.json({
      success: true,
      total: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("❌ Error en GET formularios:", error);
    return NextResponse.json(
      { success: false, error: "Error al leer formularios" },
      { status: 500 }
    );
  }
}
