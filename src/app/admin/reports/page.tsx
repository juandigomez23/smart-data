"use client"

export default function ReportsPage() {
  const reports = [
    { id: 1, title: "Reporte de ventas Q1", createdAt: "2025-03-01" },
    { id: 2, title: "Auditoría interna Abril", createdAt: "2025-04-15" },
    { id: 3, title: "Reporte de desempeño Mayo", createdAt: "2025-05-30" },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reportes y auditorías</h1>
      <div className="bg-white shadow rounded-lg divide-y">
        {reports.map((r) => (
          <div key={r.id} className="p-4 flex justify-between">
            <span>{r.title}</span>
            <span className="text-gray-500 text-sm">{r.createdAt}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
