"use client"

import { Users, Settings, FileText } from "lucide-react"
import Link from "next/link"

const features = [
  {
    name: "Gestión de usuarios",
    description: "Administra cuentas de asesores y auditores.",
    href: "/admin/users",
    icon: Users,
    color: "bg-blue-600",
  },
  {
    name: "Configuración del sistema",
    description: "Controla parámetros y ajustes de la aplicación.",
    href: "/admin/settings",
    icon: Settings,
    color: "bg-green-600",
  },
  {
    name: "Reportes y auditorías",
    description: "Consulta informes generados por asesores y auditores.",
    href: "/admin/reports",
    icon: FileText,
    color: "bg-yellow-500",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Bienvenido, Administrador 👑
        </h1>
        <p className="text-gray-600">
          Desde aquí puedes gestionar usuarios, configurar el sistema y revisar reportes.
        </p>
      </div>

      {/* Sección de accesos directos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-lg text-white ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                {item.name}
              </h2>
            </div>
            <p className="text-gray-600 text-sm flex-1">{item.description}</p>
            <span className="mt-4 text-sm font-medium text-blue-600 hover:underline">
              Ir a {item.name} →
            </span>
          </Link>
        ))}
      </div>

      {/* Comunicaciones rápidas */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Comunicaciones rápidas
        </h2>
        <ul className="space-y-2 text-sm text-blue-600">
          <li>
            <Link href="/admin/users" className="hover:underline">
              ➤ Ver listado de usuarios
            </Link>
          </li>
          <li>
            <Link href="/admin/settings" className="hover:underline">
              ➤ Revisar configuraciones recientes
            </Link>
          </li>
          <li>
            <Link href="/admin/reports" className="hover:underline">
              ➤ Consultar últimos reportes de auditoría
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
