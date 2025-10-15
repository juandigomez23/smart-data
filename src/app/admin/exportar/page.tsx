"use client"

import ExcelJS from "exceljs"
import { saveAs } from "file-saver"
interface FormularioExport {
  id: number;
  tipo: string;
  asesor: string;
  created_at: string;
  datos: Record<string, unknown>;
}

import { FileSpreadsheet, Search, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminExportarPage() {
  const [tipo, setTipo] = useState("");
  const [asesor, setAsesor] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [loading, setLoading] = useState(false);
  const [registros, setRegistros] = useState<FormularioExport[]>([]);
  const [tipos, setTipos] = useState<string[]>([]);
  const [asesores, setAsesores] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/formularios/opciones")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTipos(data.tipos);
          setAsesores(data.asesores);
        }
      });
  }, []);

  const fetchFormularios = async () => {
    setLoading(true)

    const res = await fetch(`/api/formularios?tipo=${tipo}&asesor=${asesor}&fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}`)
  const data = await res.json()
  setRegistros(data.data || [])
    setLoading(false)
  }

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Formularios")
    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Tipo", key: "tipo", width: 20 },
      { header: "Asesor", key: "asesor", width: 20 },
      { header: "Fecha", key: "created_at", width: 25 },
      { header: "Datos", key: "datos", width: 60 },
    ];
    registros.forEach((r) => {
      worksheet.addRow({
        ...r,
        datos: JSON.stringify(r.datos, null, 2),
      });
    });
    const buffer = await workbook.xlsx.writeBuffer()
    saveAs(new Blob([buffer]), `formularios-exportados-${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center gap-3 mb-8">
        <FileSpreadsheet className="w-10 h-10 text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Exportar Formularios</h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-800 mb-8">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
          <Search className="w-5 h-5 text-blue-500" /> Filtros de búsqueda
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <select value={tipo} onChange={e => setTipo(e.target.value)} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <option value="">Todos los tipos</option>
            {tipos.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <select value={asesor} onChange={e => setAsesor(e.target.value)} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
            <option value="">Todos los asesores</option>
            {asesores.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
          <input type="date" placeholder="Desde" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
          <input type="date" placeholder="Hasta" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100" />
        </div>
        <div className="flex gap-4">
          <button onClick={fetchFormularios} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow font-semibold transition disabled:opacity-50" disabled={loading}>
            <Search className="w-5 h-5" /> Buscar
          </button>
          <button onClick={exportToExcel} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow font-semibold transition disabled:opacity-50" disabled={loading || registros.length === 0}>
            <FileSpreadsheet className="w-5 h-5" /> Exportar a Excel
          </button>
        </div>
        {loading && (
          <div className="flex items-center gap-2 mt-4 text-blue-600">
            <Loader2 className="animate-spin w-5 h-5" /> Cargando...
          </div>
        )}
      </div>

      {registros.length > 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-300 dark:border-gray-700 mt-6">
          <h2 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">Resultados ({registros.length})</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-blue-600 dark:bg-blue-900 text-white">
                  <th className="border p-3 text-left">ID</th>
                  <th className="border p-3 text-left">Tipo</th>
                  <th className="border p-3 text-left">Asesor</th>
                  <th className="border p-3 text-left">Fecha</th>
                  <th className="border p-3 text-left">Datos</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((r) => (
                  <tr key={r.id} className="hover:bg-blue-100 dark:hover:bg-blue-800 transition">
                    <td className="border p-3 font-semibold text-gray-800 dark:text-gray-100">{r.id}</td>
                    <td className="border p-3 text-blue-700 dark:text-blue-300">{r.tipo}</td>
                    <td className="border p-3 text-green-700 dark:text-green-300">{r.asesor}</td>
                    <td className="border p-3 text-gray-700 dark:text-gray-200">{r.created_at}</td>
                    <td className="border p-3 text-xs text-gray-700 dark:text-gray-200 whitespace-pre-wrap max-w-xs">
                      {typeof r.datos === "object" ? JSON.stringify(r.datos, null, 2) : r.datos}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-800 mt-6 text-center text-gray-500 dark:text-gray-400">
          <h2 className="text-lg font-semibold mb-4">No se encontraron resultados</h2>
          <p>Intenta cambiar los filtros o verifica los datos.</p>
        </div>
      )}
    </div>
  )
}
