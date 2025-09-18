export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso denegado</h1>
        <p className="text-gray-600 mb-6">
          No tienes permisos para acceder a esta sección.
        </p>
        <a
          href="/login"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Ir al login
        </a>
      </div>
    </div>
  )
}
