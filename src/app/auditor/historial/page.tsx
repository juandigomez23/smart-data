"use client"

export default function Historial() {
  const auditorias = [
    { id: 1, cliente: "Carlos López", resultado: "Aprobado", fecha: "2025-09-15" },
    { id: 2, cliente: "María Pérez", resultado: "Rechazado", fecha: "2025-09-14" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Historial de auditorías</h1>
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Cliente</th>
              <th className="p-3 border">Resultado</th>
              <th className="p-3 border">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {auditorias.map((a) => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className="p-3 border">{a.cliente}</td>
                <td className="p-3 border">{a.resultado}</td>
                <td className="p-3 border">{a.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
