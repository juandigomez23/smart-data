"use client"

import Link from "next/link"
import Image from "next/image"
import { ClipboardList, CheckSquare, Briefcase, XCircle, FileText, FileSpreadsheet } from "lucide-react"

const formularios = [
  { title: "Retenciones – Colombia", href: "/admin/formularios/colombia", flag: "/flags/co.png" },
  { title: "Retenciones – Perú", href: "/admin/formularios/peru", flag: "/flags/pe.png" },
  { title: "Retenciones – Chile", href: "/admin/formularios/chile", flag: "/flags/cl.png" },
  { title: "Retenciones – Ecuador", href: "/admin/formularios/ecuador", flag: "/flags/ec.png" },
  { title: "Auditoría Prewelcome", href: "/admin/formularios/auditoria-prewelcome", icon: ClipboardList, color: "bg-purple-100 text-purple-700" },
  { title: "Welcome", href: "/admin/formularios/welcome", icon: CheckSquare, color: "bg-green-100 text-green-700" },
  { title: "Comercial", href: "/admin/formularios/comercial", icon: Briefcase, color: "bg-teal-100 text-teal-700" },
  { title: "Rechazo Débito", href: "/admin/formularios/rechazo-debito", icon: XCircle, color: "bg-red-100 text-red-700" },
  { title: "Gestión FCR", href: "/admin/formularios/gestion-fcr", icon: FileText, color: "bg-orange-100 text-orange-700" },
  { title: "Otras Gestiones", href: "/admin/formularios/otras-gestiones", icon: FileSpreadsheet, color: "bg-gray-100 text-gray-700" },
]

export default function FormulariosPage() {
  return (
    <div className="p-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-10">Formularios Disponibles</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {formularios.map((f, i) => (
          <Link key={i} href={f.href}>
            <div className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-blue-700 hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col items-center gap-4">
              {f.flag ? (
                <Image src={f.flag} alt={f.title} width={48} height={32} className="rounded-md" />
              ) : f.icon ? (
                <div className={`p-4 rounded-full ${f.color}`}>
                  <f.icon className="w-7 h-7" />
                </div>
              ) : null}
              <h3 className="text-base font-semibold text-blue-700 dark:text-blue-300 text-center">{f.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}