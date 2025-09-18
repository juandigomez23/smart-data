"use client"

import Image from "next/image"
import Link from "next/link"
import { FileSpreadsheet, ClipboardList, CheckSquare, Briefcase, XCircle, FileText } from "lucide-react"

export default function AsesorDashboardPage() {
  const formularios = [
    // Retenciones
    { title: "Retenciones – Colombia", code: "co", href: "/asesor/formularios/colombia", color: "bg-green-100 text-green-700", flag: "/flags/co.png" },
    { title: "Retenciones – Perú", code: "pe", href: "/asesor/formularios/peru", color: "bg-red-100 text-red-700", flag: "/flags/pe.png" },
    { title: "Retenciones – Chile", code: "cl", href: "/asesor/formularios/chile", color: "bg-blue-100 text-blue-700", flag: "/flags/cl.png" },
    { title: "Retenciones – Ecuador", code: "ec", href: "/asesor/formularios/ecuador", color: "bg-yellow-100 text-yellow-700", flag: "/flags/ec.png" },
    { title: "Auditoría Prewelcome", code: "apw", href: "/asesor/formularios/auditoria-prewelcome", color: "bg-purple-100 text-purple-700", icon: <ClipboardList className="w-6 h-6" /> },
    { title: "Welcome", code: "wel", href: "/asesor/formularios/welcome", color: "bg-blue-100 text-blue-700", icon: <CheckSquare className="w-6 h-6" /> },
    { title: "Comercial", code: "com", href: "/asesor/formularios/comercial", color: "bg-teal-100 text-teal-700", icon: <Briefcase className="w-6 h-6" /> },
    { title: "Rechazo Débito", code: "rd", href: "/asesor/formularios/rechazo-debito", color: "bg-red-100 text-red-700", icon: <XCircle className="w-6 h-6" /> },
    { title: "Gestión FCR", code: "fcr", href: "/asesor/formularios/gestion-fcr", color: "bg-orange-100 text-orange-700", icon: <FileText className="w-6 h-6" /> },
    { title: "Otras Gestiones", code: "og", href: "/asesor/formularios/otras-gestiones", color: "bg-gray-100 text-gray-700", icon: <FileSpreadsheet className="w-6 h-6" /> },
  ]

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-2">
          Menú Asesor <span className="text-pink-500">📊</span>
        </h1>
        <p className="text-gray-600 mb-8">
          Aquí puedes acceder a tus formularios y gestiones.
        </p>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formularios.map((f) => (
            <Link key={f.code} href={f.href}>
              <div className="cursor-pointer bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${f.color}`}>
                    {f.flag ? (
                      <Image src={f.flag} alt={f.title} width={32} height={32} className="rounded-full" />
                    ) : (
                      f.icon || <FileSpreadsheet className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {f.title}{" "}
                      <span className="uppercase text-gray-500 text-sm">{f.code}</span>
                    </h2>
                    <p className="text-gray-500 text-sm">Completar y revisar registros</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
