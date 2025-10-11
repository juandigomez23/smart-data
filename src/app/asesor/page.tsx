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
  const { data: session } = useSession();
  const { data: metrics } = useSWR(
    "/api/asesores/[id]/metricas",
    fetcher,
    { refreshInterval: 10000 }
  );
  const { data: asesorData } = useSWR(
    session?.user?.id ? `/api/asesores/${session.user.id}` : null,
    fetcher
  );
  const formularios = [
    { title: "Retenciones – Colombia", code: "co", href: "/asesor/formularios/colombia", color: "bg-gradient-to-r from-green-400 to-green-200 text-green-900", flag: "/flags/co.png" },
    { title: "Retenciones – Perú", code: "pe", href: "/asesor/formularios/peru", color: "bg-gradient-to-r from-red-400 to-red-200 text-red-900", flag: "/flags/pe.png" },
    { title: "Retenciones – Chile", code: "cl", href: "/asesor/formularios/chile", color: "bg-gradient-to-r from-blue-400 to-blue-200 text-blue-900", flag: "/flags/cl.png" },
    { title: "Retenciones – Ecuador", code: "ec", href: "/asesor/formularios/ecuador", color: "bg-gradient-to-r from-yellow-400 to-yellow-200 text-yellow-900", flag: "/flags/ec.png" },
    { title: "Auditoría Prewelcome", code: "apw", href: "/asesor/formularios/auditoria-prewelcome", color: "bg-gradient-to-r from-purple-400 to-purple-200 text-purple-900", icon: <ClipboardList className="w-6 h-6" /> },
    { title: "Welcome", code: "wel", href: "/asesor/formularios/welcome", color: "bg-gradient-to-r from-blue-500 to-blue-300 text-blue-900", icon: <CheckSquare className="w-6 h-6" /> },
    { title: "Comercial", code: "com", href: "/asesor/formularios/comercial", color: "bg-gradient-to-r from-teal-400 to-teal-200 text-teal-900", icon: <Briefcase className="w-6 h-6" /> },
    { title: "Rechazo Débito", code: "rd", href: "/asesor/formularios/rechazo-debito", color: "bg-gradient-to-r from-red-500 to-red-300 text-red-900", icon: <XCircle className="w-6 h-6" /> },
    { title: "Gestión FCR", code: "fcr", href: "/asesor/formularios/gestion-fcr", color: "bg-gradient-to-r from-orange-400 to-orange-200 text-orange-900", icon: <FileText className="w-6 h-6" /> },
    { title: "Otras Gestiones", code: "otr", href: "/asesor/formularios/otras-gestiones", color: "bg-gradient-to-r from-gray-400 to-gray-200 text-gray-900", icon: <FileSpreadsheet className="w-6 h-6" /> },
  ];
  const permitidos = asesorData?.data?.formularios_permitidos;
  const formulariosFiltrados = permitidos
    ? formularios.filter(f => permitidos.includes(f.code))
    : formularios;
  // Sección de tips/noticias
  const tips = [
    "Recuerda revisar tus gestiones antes de enviarlas.",
    "Completa todos los campos obligatorios para evitar rechazos.",
    "Consulta el manual de usuario para mejores prácticas.",
    "¡Tu esfuerzo suma! Cada gestión cuenta para tu historial."
  ];
  return (
    <div className="min-h-screen transition-colors bg-gradient-to-br from-blue-50 via-white to-blue-100 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-8">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <Image src="/globe.svg" alt="Logo" width={64} height={64} className="w-16 h-16" />
            <div>
              <h1 className="text-4xl font-extrabold text-blue-700 mb-1 flex items-center gap-2">
                ¡Bienvenid@, {session?.user?.username || "Asesor"}!
              </h1>
              <p className="text-lg text-blue-900 font-medium">Tu espacio para gestionar y crecer profesionalmente.</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 w-full md:w-96 md:ml-8">
            <h2 className="text-xl font-bold text-blue-700 mb-2">Tips para asesores</h2>
            <ul className="list-disc pl-5 text-blue-900 text-sm">
              {tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div
            className="bg-white p-8 rounded-2xl shadow-xl flex items-center gap-6 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-transform duration-200 border-2 border-blue-200"
            onClick={() => {
              window.location.href = "/asesor/formularios";
            }}
          >
            <Activity className="w-12 h-12 text-blue-500" />
            <div>
              <p className="text-blue-700 text-lg font-semibold">Gestiones Hoy</p>
              <h3 className="text-3xl font-extrabold text-blue-900">
                {metrics?.metrics?.gestionesHoy ?? 0}
              </h3>
            </div>
          </div>
          <div
            className="bg-white p-8 rounded-2xl shadow-xl flex items-center gap-6 cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-transform duration-200 border-2 border-green-200"
            onClick={() => {
              window.location.href = "/asesor/historial";
            }}
          >
            <CheckSquare className="w-12 h-12 text-green-500" />
            <div>
              <p className="text-green-700 text-lg font-semibold">Tu historial de gestiones</p>
              <h3 className="text-3xl font-extrabold text-green-900">
                {metrics?.metrics?.totalFormularios ?? 0}
              </h3>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mb-6 mt-2 text-center">Formularios disponibles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {formulariosFiltrados.map((f) => (
            <Link key={f.code} href={f.href}>
              <div className={`cursor-pointer rounded-2xl shadow-lg p-8 border-2 ${f.color} hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col items-center gap-4 relative`}>
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{f.title.split('–')[1]?.trim() || f.title}</div>
                <div className="p-4 rounded-full bg-white shadow flex items-center justify-center">
                  {f.flag ? (
                    <Image src={f.flag} alt={f.title} width={40} height={40} className="rounded-full" />
                  ) : (
                    f.icon || <FileSpreadsheet className="w-8 h-8" />
                  )}
                </div>
                <h2 className="text-lg font-bold text-blue-900 text-center mt-2">{f.title}</h2>
                <span className="text-xs text-gray-700 font-semibold">Haz clic para gestionar</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
