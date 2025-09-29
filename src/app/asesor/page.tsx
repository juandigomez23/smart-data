"use client"

import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { 
  FileSpreadsheet, ClipboardList, CheckSquare, 
  Briefcase, XCircle, FileText, Activity 
} from "lucide-react"

// Fetcher para SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function AsesorDashboardPage() {
  const { data: session } = useSession()


  const { data: metrics } = useSWR(
    "/api/asesores/[id]/metricas",
    fetcher,
    { refreshInterval: 10000 }
  )

  
  const { data: asesorData } = useSWR(
    session?.user?.id ? `/api/asesores/${session.user.id}` : null,
    fetcher
  )

  const formularios = [
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
  ];

  
  const permitidos = asesorData?.data?.formularios_permitidos;
  const formulariosFiltrados = permitidos
    ? formularios.filter(f => permitidos.includes(f.code))
    : formularios;

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="max-w-6xl mx-auto">
       
        {}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 flex items-center gap-2">
          Hola, {session?.user?.username || "Asesor"} 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Aquí puedes acceder a tus formularios y revisar tus gestiones.
        </p>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center gap-4">
            <Activity className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Gestiones Hoy</p>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {metrics?.metrics?.gestionesHoy ?? 0}
              </h3>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center gap-4">
            <CheckSquare className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Formularios</p>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {metrics?.metrics?.totalFormularios ?? 0}
              </h3>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md flex items-center gap-4">
            <FileSpreadsheet className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Eficiencia</p>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {metrics?.metrics?.eficiencia ?? "0%"}
              </h3>
            </div>
          </div>
        </div>
         {}
        <div className="flex justify-center mb-10">
        <Link href="/asesor/formularios">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-500 font-semibold text-lg transition-all duration-200">
            <span className="inline-flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5" />
              Ver formularios llenados hoy
            </span>
          </button>
        </Link>
      </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formulariosFiltrados.map((f) => (
            <Link key={f.code} href={f.href}>
              <div className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition transform hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${f.color}`}>
                    {f.flag ? (
                      <Image src={f.flag} alt={f.title} width={32} height={32} className="rounded-full" />
                    ) : (
                      f.icon || <FileSpreadsheet className="w-6 h-6" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                      {f.title}{" "}
                      <span className="uppercase text-gray-500 text-sm">{f.code}</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Completar y revisar registros</p>
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
