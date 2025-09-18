export default function AuditorDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bienvenido, Auditor 🔍</h1>
      <p className="text-gray-600 mb-6">
        Aquí puedes revisar registros de asesores, generar reportes y consultar tu historial de auditorías.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold mb-2">Pendientes</h2>
          <p className="text-sm text-gray-500 mb-4">Registros de clientes sin auditar.</p>
          <a
            href="/auditor/pendientes"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Revisar →
          </a>
        </div>

        <div className="p-6 bg-white rounded shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold mb-2">Reportes</h2>
          <p className="text-sm text-gray-500 mb-4">Genera y consulta reportes de calidad.</p>
          <a
            href="/auditor/reportes"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Ver reportes →
          </a>
        </div>

        <div className="p-6 bg-white rounded shadow hover:shadow-md transition">
          <h2 className="text-lg font-semibold mb-2">Historial</h2>
          <p className="text-sm text-gray-500 mb-4">Consulta el historial de auditorías realizadas.</p>
          <a
            href="/auditor/historial"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Ver historial →
          </a>
        </div>
      </div>
    </div>
  )
}
