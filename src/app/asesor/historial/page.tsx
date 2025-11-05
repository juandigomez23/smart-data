"use client"

import { useSession } from "next-auth/react"

import useSWR from "swr"
import { FileSpreadsheet } from "lucide-react"
import VolverAtras from "@/components/volverAtras"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

type Gestion = {
  id: number;
  tipo: string;
  datos: Record<string, unknown>;
  created_at: string;
}

import { useState } from "react";

export default function HistorialPage() {
  const { data: session } = useSession();
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [tipo, setTipo] = useState("");

  const query = session?.user?.id
    ? `/api/asesores/${session.user.id}/historial?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}${tipo ? `&tipo=${encodeURIComponent(tipo)}` : ''}`
    : null;
  const { data: historial } = useSWR(query, fetcher);

  const gestiones: Gestion[] = historial?.data || [];

  return (
    <div
      className="p-8 min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'url(/Fondo.jpg)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'top left',
      }}
    >
      <div className="max-w-5xl mx-auto w-full">
        <VolverAtras />
        <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center flex items-center gap-2">
          <FileSpreadsheet className="w-7 h-7 text-blue-500" />
          Historial de gestiones
        </h1>
        <form className="flex gap-4 items-center mb-6 justify-center">
          <label className="text-gray-700 dark:text-gray-200 text-sm font-semibold">Desde:
            <input type="date" value={fechaDesde} onChange={e => setFechaDesde(e.target.value)} className="ml-2 px-2 py-1 rounded border border-gray-300" />
          </label>
          <label className="text-gray-700 dark:text-gray-200 text-sm font-semibold">Hasta:
            <input type="date" value={fechaHasta} onChange={e => setFechaHasta(e.target.value)} className="ml-2 px-2 py-1 rounded border border-gray-300" />
          </label>
        </form>
        
        {historial && (
          <div className="mb-4 text-center space-y-2">
            <div>
              <label className="text-sm text-gray-700 mr-2">Tipo:</label>
              <select value={tipo} onChange={e => setTipo(e.target.value)} className="px-2 py-1 rounded border border-gray-300">
                <option value="">(Todos)</option>
                <option value="retenciones">Retenciones</option>
                <option value="gestion-fcr">Gestion FCR</option>
                <option value="welcome">Welcome</option>
                <option value="rechazo-debito">Rechazo débito</option>
                <option value="otras-gestiones">Otras gestiones</option>
                <option value="equipo-comercial">Equipo comercial</option>
                <option value="auditoria-prewelcome">Auditoría prewelcome</option>
              </select>
            </div>
            <div>
              <span className="inline-block bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                Resultados: {typeof historial.total === 'number' ? historial.total : (Array.isArray(historial.data) ? historial.data.length : gestiones.length)}
              </span>
            </div>
          </div>
        )}
        {gestiones.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">No tienes historial de gestiones aún.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <th className="px-4 py-3 border-b">ID</th>
                  <th className="px-4 py-3 border-b">Tipo</th>
                  <th className="px-4 py-3 border-b">Fecha</th>
                  <th className="px-4 py-3 border-b">Datos</th>
                </tr>
              </thead>
              <tbody>
                {gestiones.map((f: Gestion, idx: number) => (
                  <tr key={f.id} className={idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : "bg-white dark:bg-gray-800"}>
                    <td className="px-4 py-2 border-b text-center font-mono text-xs text-gray-700 dark:text-gray-200">{f.id}</td>
                    <td className="px-4 py-2 border-b text-center text-gray-800 dark:text-gray-100 font-semibold">{f.tipo}</td>
                    <td className="px-4 py-2 border-b text-center text-gray-600 dark:text-gray-300">{new Date(f.created_at).toLocaleString()}</td>
                    <td className="px-4 py-2 border-b">
                      <pre className="text-xs whitespace-pre-wrap break-words bg-gray-100 dark:bg-gray-900 rounded p-2 text-gray-800 dark:text-gray-100">{JSON.stringify(f.datos, null, 2)}</pre>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
