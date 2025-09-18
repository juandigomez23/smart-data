export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Configuración del sistema</h1>
      <div className="bg-white p-6 shadow rounded-lg space-y-4">
        <p>Aquí podrás configurar los parámetros globales de la aplicación.</p>
        <div>
          <label className="block text-sm font-medium">Nombre de la empresa</label>
          <input
            type="text"
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="Ej: HughesNet Center"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Correo de soporte</label>
          <input
            type="email"
            className="mt-1 w-full border rounded px-3 py-2"
            placeholder="soporte@empresa.com"
          />
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          Guardar cambios
        </button>
      </div>
    </div>
  )
}
