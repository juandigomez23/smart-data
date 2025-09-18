"use client"

export default function Pendientes() {
  const registros = [
    { id: 1, cliente: "Carlos López", estado: "Pendiente" },
    { id: 2, cliente: "María Pérez", estado: "Pendiente" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Registros pendientes</h1>
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Cliente</th>
              <th className="p-3 border">Estado</th>
              <th className="p-3 border">Acción</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="p-3 border">{r.cliente}</td>
                <td className="p-3 border">{r.estado}</td>
                <td className="p-3 border">
                  <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                    Aprobar
                  </button>
                  <button className="ml-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">
                    Rechazar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
