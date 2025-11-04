"use client";

import { useState, useEffect } from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

type FormularioExport = {
  id: number;
  tipo: string;
  asesor?: string | null;
  datos: Record<string, unknown>;
  created_at: string;
};

export default function ExportarPage() {
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [tipo, setTipo] = useState("");
  const [asesor, setAsesor] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);
  const [registros, setRegistros] = useState<FormularioExport[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const [tipos, setTipos] = useState<string[]>([]);
  const [asesores, setAsesores] = useState<string[]>([]);

  const obtenerRegistros = async () => {
    setError(null);
    setLoading(true);
    try {
      const qs = new URLSearchParams();
      if (fechaDesde) qs.set("fechaDesde", fechaDesde);
      if (fechaHasta) qs.set("fechaHasta", fechaHasta);
      if (tipo) qs.set("tipo", tipo);
      if (asesor) qs.set("asesor", asesor);

      const res = await fetch(`/api/formularios?${qs.toString()}`);
      if (!res.ok) throw new Error(`Error al obtener registros: ${res.status}`);
      const json = await res.json();
      const data: FormularioExport[] = json.data || [];
      setRegistros(data);

      const tiposUnicos = Array.from(new Set(data.map((r) => r.tipo ?? ""))).filter(Boolean);
      const asesoresUnicos = Array.from(new Set(data.map((r) => r.asesor ?? ""))).filter(Boolean);
      setTipos(tiposUnicos);
      setAsesores(asesoresUnicos);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al obtener datos");
    } finally {
      setLoading(false);
    }
  };

  const registrosFiltrados = registros.filter((r) => {
    if (!busqueda.trim()) return true;
    const texto = busqueda.toLowerCase();
    const datosTexto = JSON.stringify(r.datos || {}).toLowerCase();
    return (
      r.tipo.toLowerCase().includes(texto) ||
      (r.asesor?.toLowerCase().includes(texto) ?? false) ||
      datosTexto.includes(texto)
    );
  });

  const toggleSeleccion = (id: number) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSeleccionTodos = () => {
    if (seleccionados.length === registrosFiltrados.length) {
      setSeleccionados([]);
    } else {
      setSeleccionados(registrosFiltrados.map((r) => r.id));
    }
  };

 const handleExport = async () => {
  try {
    const items =
      seleccionados.length > 0
        ? registrosFiltrados.filter((r) => seleccionados.includes(r.id))
        : registrosFiltrados;

    if (items.length === 0) {
      setError("No hay registros seleccionados para exportar.");
      return;
    }

    const workbook = new ExcelJS.Workbook();

    // Agrupar por tipo de formulario
    const grupos = items.reduce((acc, r) => {
      if (!acc[r.tipo]) acc[r.tipo] = [];
      acc[r.tipo].push(r);
      return acc;
    }, {} as Record<string, FormularioExport[]>);

    // Crear una hoja por tipo
    for (const [tipo, registrosTipo] of Object.entries(grupos)) {
      const hoja = workbook.addWorksheet(tipo.slice(0, 31));

      // Claves en orden del primer registro (orden de llenado)
      const ordenClaves =
        registrosTipo.length > 0 && registrosTipo[0].datos
          ? Object.keys(registrosTipo[0].datos)
          : [];

      // Asegurar que se incluyan todas las claves que puedan aparecer
      const allKeys = new Set(ordenClaves);
      registrosTipo.forEach((r) => {
        if (r.datos) Object.keys(r.datos).forEach((k) => allKeys.add(k));
      });

      const dataColumns = [
        ...ordenClaves,
        ...Array.from(allKeys).filter((k) => !ordenClaves.includes(k)),
      ].map((k) => ({
        header: k,
        key: k,
      }));

      const baseColumns = [
        { header: "ID", key: "id" },
        { header: "Tipo", key: "tipo" },
        { header: "Asesor", key: "asesor" },
        { header: "Fecha", key: "created_at" },
      ];

      hoja.columns = [...baseColumns, ...dataColumns];

      // Añadir filas
      registrosTipo.forEach((r) => {
        const rowData: Record<string, unknown> = {
          id: r.id,
          tipo: r.tipo,
          asesor: r.asesor,
          created_at: new Date(r.created_at).toLocaleString(),
        };
        Object.entries(r.datos || {}).forEach(([key, value]) => {
          rowData[key] = value;
        });
        hoja.addRow(rowData);
      });

      // Estilos de encabezado
      const headerRow = hoja.getRow(1);
      headerRow.font = { bold: true, color: { argb: "FFFFFFFF" } };
      headerRow.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF1E3A8A" },
      };
      headerRow.alignment = { horizontal: "center", vertical: "middle" };
      headerRow.height = 25;

     // ✅ Ajuste automático del ancho de columna (versión segura)
      hoja.columns?.forEach((column) => {
        if (!column) return; // Si por alguna razón no existe la columna, la saltamos

        let maxLength = 10;
        column.eachCell?.({ includeEmpty: true }, (cell) => {
          const valor = cell?.value ? String(cell.value) : "";
          if (valor.length > maxLength) maxLength = valor.length;
        });
        column.width = Math.min(maxLength + 4, 50); // Máx. 50 caracteres de ancho
      });

    }

    // Descargar Excel
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer]),
      `formularios-${new Date().toISOString().split("T")[0]}.xlsx`
    );
  } catch (err) {
    console.error(err);
    setError(err instanceof Error ? err.message : String(err));
  }
};


    useEffect(() => {
      void obtenerRegistros();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


  return (
    <div>
      <div className="max-w-6xl mx-auto backdrop-blur-sm bg-black/40 rounded-2xl shadow-xl p-8 border border-green-500/40">
        <h1 className="text-3xl font-bold text-green-300 mb-8 flex items-center gap-2">
          📊 Exportar Formularios
        </h1>

        {/* Filtros */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <label className="text-sm font-medium">
            Desde:
            <input
              type="date"
              value={fechaDesde}
              onChange={(e) => setFechaDesde(e.target.value)}
              className="mt-1 w-full px-2 py-1 bg-black/60 border border-green-600 rounded-md text-green-100"
            />
          </label>
          <label className="text-sm font-medium">
            Hasta:
            <input
              type="date"
              value={fechaHasta}
              onChange={(e) => setFechaHasta(e.target.value)}
              className="mt-1 w-full px-2 py-1 bg-black/60 border border-green-600 rounded-md text-green-100"
            />
          </label>
          <label className="text-sm font-medium">
            Tipo:
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="mt-1 w-full px-2 py-1 bg-black/60 border border-green-600 rounded-md text-green-100"
            >
              <option value="">Todos</option>
              {tipos.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Asesor:
            <select
              value={asesor}
              onChange={(e) => setAsesor(e.target.value)}
              className="mt-1 w-full px-2 py-1 bg-black/60 border border-green-600 rounded-md text-green-100"
            >
              <option value="">Todos</option>
              {asesores.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Buscar:
            <input
              type="text"
              placeholder="Texto, tipo, asesor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="mt-1 w-full px-2 py-1 bg-black/60 border border-green-600 rounded-md text-green-100"
            />
          </label>
        </div>

        {/* Botones */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={obtenerRegistros}
            disabled={loading}
            className="px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded-lg transition"
          >
            {loading ? "Buscando..." : "Aplicar filtros"}
          </button>

          <button
            onClick={handleExport}
            disabled={loading || registrosFiltrados.length === 0}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition"
          >
            Exportar Excel
          </button>
        </div>


          <p className="mt-4 text-green-300">
            {registrosFiltrados.length > 0
              ? `Total de formularios: ${registrosFiltrados.length}`
              : "No hay registros."}
          </p>


        {error && <div className="mb-4 text-red-300">{error}</div>}

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full border border-green-700 text-sm rounded-lg overflow-hidden">
            <thead className="bg-green-800 text-white">
              <tr>
                <th className="p-2">
                  <input
                    type="checkbox"
                    checked={
                      seleccionados.length === registrosFiltrados.length &&
                      registrosFiltrados.length > 0
                    }
                    onChange={toggleSeleccionTodos}
                  />
                </th>
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Tipo</th>
                <th className="p-2 text-left">Asesor</th>
                <th className="p-2 text-left">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map((r, i) => (
                <tr
                  key={r.id}
                  className={`border-b border-green-700 ${
                    i % 2 === 0 ? "bg-black/40" : "bg-black/20"
                  } hover:bg-green-900/40 transition`}
                >
                  <td className="p-2 text-center">
                    <input
                      type="checkbox"
                      checked={seleccionados.includes(r.id)}
                      onChange={() => toggleSeleccion(r.id)}
                    />
                  </td>
                  <td className="p-2">{r.id}</td>
                  <td className="p-2">{r.tipo}</td>
                  <td className="p-2">{r.asesor ?? "-"}</td>
                  <td className="p-2">
                    {new Date(r.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
      </div>
    </div>
  );
}
