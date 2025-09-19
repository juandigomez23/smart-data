"use client"

import Link from "next/link"
import Image from "next/image"
import { 
  Users, FileText, BarChart3,
  ClipboardList, CheckSquare, Briefcase, 
  XCircle, FileSpreadsheet, Moon, Sun, Download
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import ExcelJS from "exceljs"
import { saveAs } from "file-saver"

export default function AdminDashboardPage() {
  const { theme, setTheme } = useTheme()
  const [dark, setDark] = useState(theme === "dark")

  const toggleTheme = () => {
    setDark(!dark)
    setTheme(dark ? "light" : "dark")
  }

  // 📊 Ejemplo de métricas
  const metricas = [
    { titulo: "Total Usuarios", valor: "142", icono: <Users className="w-6 h-6" />, color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200" },
    { titulo: "Formularios Completados", valor: "387", icono: <CheckSquare className="w-6 h-6" />, color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200" },
    { titulo: "Auditorías Pendientes", valor: "25", icono: <ClipboardList className="w-6 h-6" />, color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200" },
    { titulo: "Tasa Finalización", valor: "78%", icono: <BarChart3 className="w-6 h-6" />, color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200" },
  ]

  // 📋 Formularios disponibles
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

  // 📑 Datos ficticios de últimos registros
  const registros = [
    { id: 1, formulario: "Retenciones – Colombia", usuario: "Juan Pérez", fecha: "2025-09-15", estado: "Completado" },
    { id: 2, formulario: "Welcome", usuario: "Ana Gómez", fecha: "2025-09-16", estado: "Pendiente" },
    { id: 3, formulario: "Auditoría Prewelcome", usuario: "Carlos Ruiz", fecha: "2025-09-17", estado: "En revisión" },
  ]

  // 📤 Exportar a Excel con ExcelJS
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Registros")

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Formulario", key: "formulario", width: 30 },
      { header: "Usuario", key: "usuario", width: 30 },
      { header: "Fecha", key: "fecha", width: 20 },
      { header: "Estado", key: "estado", width: 20 },
    ]

    registros.forEach((r) => worksheet.addRow(r))

    const buffer = await workbook.xlsx.writeBuffer()
    saveAs(new Blob([buffer]), "registros.xlsx")
  }

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Dashboard Administrador</h1>
          <p className="text-gray-600 dark:text-gray-400">Supervisa usuarios, formularios y auditorías</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>
          <button 
            onClick={exportToExcel} 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          >
            <Download className="w-5 h-5" />
            Exportar
          </button>
        </div>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metricas.map((m, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{m.titulo}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{m.valor}</p>
            </div>
            <div className={`p-3 rounded-full ${m.color}`}>{m.icono}</div>
          </div>
        ))}
      </div>

      {/* Formularios */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Formularios Disponibles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {formularios.map((f, i) => (
          <Link key={i} href={f.href}>
            <div className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition transform hover:-translate-y-1 flex items-center gap-4">
              {f.flag ? (
                <Image src={f.flag} alt={f.title} width={40} height={28} className="rounded-md" />
              ) : f.icon ? (
                <div className={`p-3 rounded-full ${f.color}`}>
                  <f.icon className="w-6 h-6" />
                </div>
              ) : null}
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">{f.title}</h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Últimos registros */}
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Últimos Registros</h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 dark:text-gray-300">
              <th className="pb-2">ID</th>
              <th className="pb-2">Formulario</th>
              <th className="pb-2">Usuario</th>
              <th className="pb-2">Fecha</th>
              <th className="pb-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((r) => (
              <tr key={r.id} className="border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                <td className="py-2">{r.id}</td>
                <td className="py-2">{r.formulario}</td>
                <td className="py-2">{r.usuario}</td>
                <td className="py-2">{r.fecha}</td>
                <td className="py-2">{r.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
