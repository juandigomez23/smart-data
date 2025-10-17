"use client"

import Link from "next/link"
import Image from "next/image"
import { ClipboardList, CheckSquare, Briefcase, XCircle, FileText, FileSpreadsheet } from "lucide-react"

const formularios = [
  { title: "Retenciones – Colombia", href: "/admin/formularios/colombia", flag: "/flags/co.png", cardColor: "bg-gray-100 border-gray-300" },
  { title: "Retenciones – Perú", href: "/admin/formularios/peru", flag: "/flags/pe.png", cardColor: "bg-gray-100 border-gray-300" },
  { title: "Retenciones – Chile", href: "/admin/formularios/chile", flag: "/flags/cl.png", cardColor: "bg-gray-100 border-gray-300" },
  { title: "Retenciones – Ecuador", href: "/admin/formularios/ecuador", flag: "/flags/ec.png", cardColor: "bg-gray-100 border-gray-300" },
  { title: "Auditoría Prewelcome", href: "/admin/formularios/auditoria-prewelcome", icon: ClipboardList, color: "bg-blue-100 text-blue-800", cardColor: "bg-white border-blue-200" },
  { title: "Welcome", href: "/admin/formularios/welcome", icon: CheckSquare, color: "bg-blue-100 text-blue-800", cardColor: "bg-white border-blue-200" },
  { title: "Comercial", href: "/admin/formularios/comercial", icon: Briefcase, color: "bg-blue-100 text-blue-800", cardColor: "bg-white border-blue-200" },
  { title: "Rechazo Débito", href: "/admin/formularios/rechazo-debito", icon: XCircle, color: "bg-blue-100 text-blue-800", cardColor: "bg-white border-blue-200" },
  { title: "Gestión FCR", href: "/admin/formularios/gestion-fcr", icon: FileText, color: "bg-blue-100 text-blue-800", cardColor: "bg-white border-blue-200" },
  { title: "Otras Gestiones", href: "/admin/formularios/otras-gestiones", icon: FileSpreadsheet, color: "bg-blue-100 text-blue-800", cardColor: "bg-white border-blue-200" },
]

export default function FormulariosPage() {
  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-300 mb-10">Formularios Disponibles</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {formularios.map((f, i) => (
          <Link key={i} href={f.href}>
            <div className={`cursor-pointer rounded-xl shadow-lg p-6 border hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col items-center gap-4 ${f.cardColor || 'bg-white border-blue-200'}`}>
              {f.flag ? (
                <Image src={f.flag} alt={f.title} width={48} height={32} className="rounded-md" />
              ) : f.icon ? (
                <div className={`p-4 rounded-full ${f.color}`}>
                  <f.icon className="w-7 h-7" />
                </div>
              ) : null}
              <h3 className="text-base font-semibold text-gray-800 text-center">{f.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}