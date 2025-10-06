"use client"

import Link from "next/link"
import Image from "next/image"
import { 
  Users, FileText,
  ClipboardList, CheckSquare, Briefcase, 
  XCircle, FileSpreadsheet, Moon, Sun,
  Trash2, Search, Filter, ChevronLeft, ChevronRight
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useMemo, useEffect, useCallback } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts"
import useSWR from "swr"



interface Formulario {
  id: number
  tipo: string
  asesor: string
  datos: Record<string, unknown>
  created_at: string
}

interface Asesor {
  id: number;
  nombre: string;
  email: string;
  cedula: string;
  estado: string;
  rol: string;
  fechaRegistro: string;
  ultimoAcceso: string;
  formulariosCompletados: number;
  eficiencia: number;
  formularios_permitidos: string[];
  created_at: string;
  updated_at: string;
}

interface Filtros {
  tipo: string
  asesor: string
  fechaDesde: string
  fechaHasta: string
}

export default function AdminDashboardPage() {
  
  const [showFormularios, setShowFormularios] = useState(false);
  const { theme, setTheme } = useTheme()
  const [dark, setDark] = useState(theme === "dark")
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, isLoading } = useSWR("/api/formularios", fetcher, { refreshInterval: 10000 })
  const registros: Formulario[] = useMemo(() => data?.success ? data.data : [], [data])
  const loading = isLoading
  const [busqueda, setBusqueda] = useState("")
  const [filtros, setFiltros] = useState<Filtros>({
    tipo: "",
    asesor: "",
    fechaDesde: "",
    fechaHasta: ""
  })
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [seleccionados, setSeleccionados] = useState<number[]>([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [registrosPorPagina] = useState(10)

  const toggleTheme = () => {
    setDark(!dark)
    setTheme(dark ? "light" : "dark")
  }

 
  const registrosFiltrados = registros.filter(registro => {
    const coincideBusqueda = 
      registro.tipo.toLowerCase().includes(busqueda.toLowerCase()) ||
      registro.asesor.toLowerCase().includes(busqueda.toLowerCase()) ||
      registro.id.toString().includes(busqueda)

    const coincideTipo = !filtros.tipo || registro.tipo === filtros.tipo
    const coincideUsuario = !filtros.asesor || registro.asesor === filtros.asesor
    
    const fechaRegistro = new Date(registro.created_at)
    const coincideFechaDesde = !filtros.fechaDesde || fechaRegistro >= new Date(filtros.fechaDesde)
    const coincideFechaHasta = !filtros.fechaHasta || fechaRegistro <= new Date(filtros.fechaHasta + 'T23:59:59')

    return coincideBusqueda && coincideTipo && coincideUsuario && coincideFechaDesde && coincideFechaHasta
  })

 
  const indexUltimoRegistro = paginaActual * registrosPorPagina
  const indexPrimerRegistro = indexUltimoRegistro - registrosPorPagina
  const registrosPagina = registrosFiltrados.slice(indexPrimerRegistro, indexUltimoRegistro)
  const totalPaginas = Math.ceil(registrosFiltrados.length / registrosPorPagina)

  
  const toggleSeleccion = (id: number) => {
    setSeleccionados(prev =>
      prev.includes(id)
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    )
  }

  const toggleSeleccionTodos = () => {
    if (seleccionados.length === registrosPagina.length) {
      setSeleccionados([])
    } else {
      setSeleccionados(registrosPagina.map(registro => registro.id))
    }
  }


  const eliminarRegistro = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.")) {
      return
    }

    try {
      const res = await fetch(`/api/formularios/${id}`, {
        method: "DELETE"
      })

      if (res.ok) {
        setSeleccionados(prev => prev.filter(selectedId => selectedId !== id))
        alert("✅ Registro eliminado exitosamente")
      } else {
        throw new Error("Error al eliminar")
      }
    } catch (err) {
      console.error("❌ Error al eliminar registro:", err)
      alert("❌ Error al eliminar el registro")
    }
  }

  const eliminarSeleccionados = async () => {
    if (seleccionados.length === 0) {
      alert("❌ No hay registros seleccionados")
      return
    }

    if (!confirm(`¿Estás seguro de que deseas eliminar ${seleccionados.length} registro(s)? Esta acción no se puede deshacer.`)) {
      return
    }

    try {
      const resultados = await Promise.allSettled(
        seleccionados.map(id =>
          fetch(`/api/formularios/${id}`, { method: "DELETE" })
        )
      )

      const exitosos = resultados.filter(r => r.status === 'fulfilled').length
      const errores = resultados.filter(r => r.status === 'rejected').length

  
  setSeleccionados([])

      if (errores === 0) {
        alert(`✅ ${exitosos} registro(s) eliminados exitosamente`)
      } else {
        alert(`⚠️ ${exitosos} eliminados, ${errores} con errores`)
      }
    } catch (err) {
      console.error("❌ Error al eliminar registros:", err)
      alert("❌ Error al eliminar los registros")
    }
  }

  
  const limpiarFiltros = () => {
    setFiltros({
      tipo: "",
      asesor: "",
      fechaDesde: "",
      fechaHasta: ""
    })
    setBusqueda("")
    setPaginaActual(1)
  }

  
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

  
  const tiposUnicos = Array.from(new Set(registros.map(r => r.tipo))).sort()
  const usuariosUnicos = Array.from(new Set(registros.map(r => r.asesor))).sort()


  
  
  const [fechaActual, setFechaActual] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setFechaActual(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

 
  const [fechaFiltroChart, setFechaFiltroChart] = useState(() => {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  });


  //const hoy = fechaFiltroChart;


  const esFechaFiltroChart = useCallback((fechaStr: string) => {
    const fecha = new Date(fechaStr);
    const filtro = new Date(fechaFiltroChart + 'T00:00:00');
    return fecha.getFullYear() === filtro.getFullYear() &&
      fecha.getMonth() === filtro.getMonth() &&
      fecha.getDate() === filtro.getDate();
  }, [fechaFiltroChart])

  
  const esHoyLocal = useCallback((fechaStr: string) => {
    const fecha = new Date(fechaStr)
    return fecha.getFullYear() === fechaActual.getFullYear() &&
      fecha.getMonth() === fechaActual.getMonth() &&
      fecha.getDate() === fechaActual.getDate()
  }, [fechaActual])

  
  const { data: asesoresData } = useSWR("/api/asesores", fetcher);
  const asesoresTodos = useMemo(() => {
    if (!asesoresData?.success) return [];
    return (asesoresData.data as Asesor[]);
  }, [asesoresData]);

  
  const asesoresActivosHoy = useMemo(() =>
    asesoresTodos.filter(asesor =>
      registros.some(r => r.asesor === asesor.nombre && esFechaFiltroChart(r.created_at))
    ), [registros, asesoresTodos, esFechaFiltroChart]
  );

  const asesoresInactivos = useMemo(() =>
    asesoresTodos.filter(asesor =>
      !registros.some(r => r.asesor === asesor.nombre && esFechaFiltroChart(r.created_at))
    ), [registros, asesoresTodos, esFechaFiltroChart]
  );

  const actividadHoy = useMemo(() =>
    asesoresTodos.map(asesor => {
      const gestionesHoy = registros.filter(r => r.asesor === asesor.nombre && esFechaFiltroChart(r.created_at)).length;
      let color = "bg-red-500";
      if (gestionesHoy >= 8) color = "bg-green-500";
      else if (gestionesHoy >= 5) color = "bg-orange-400";
      return { asesor: asesor.nombre, gestionesHoy, color, id: asesor.id };
    }).sort((a, b) => b.gestionesHoy - a.gestionesHoy),
    [registros, asesoresTodos, esFechaFiltroChart]
  );

  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-[#000000] dark:text-[#38bdf8] tracking-tight mb-2">Panel de Administración</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Monitoriza asesores, gestiones y auditorías en tiempo real</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-xs text-gray-500 dark:text-gray-400">{fechaActual.toLocaleDateString()} {fechaActual.toLocaleTimeString()}</span>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-2"
            >
              {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
            </button>
          </div>
        </div>
      </div>

      {}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
  <div className="bg-[#909296] rounded-2xl shadow-lg p-8 flex flex-col items-center border border-[#1e3a8a]">
    <Users className="w-10 h-10 text-white mb-2" />
    <span className="text-4xl font-extrabold text-white animate-pulse">
      {asesoresActivosHoy.length}
    </span>
    <span className="text-base text-white/80 mt-2">Asesores activos hoy</span>
  </div>

  <div className="bg-[#64748b] rounded-2xl shadow-lg p-8 flex flex-col items-center border border-[#475569]">
    <Users className="w-10 h-10 text-white mb-2" />
    <span className="text-4xl font-extrabold text-white">
      {asesoresInactivos.length}
    </span>
    <span className="text-base text-white/80 mt-2">Asesores inactivos hoy</span>
  </div>

  <div className="bg-[#38435c] rounded-2xl shadow-lg p-8 flex flex-col items-center border border-[#1e293b]">
    <Users className="w-10 h-10 text-white mb-2" />
    <span className="text-4xl font-extrabold text-white">
      {asesoresTodos.length}
    </span>
    <span className="text-base text-white/80 mt-2">Total asesores</span>
  </div>

  <div className="bg-[#4ea86f] rounded-2xl shadow-lg p-8 flex flex-col items-center border border-[#166534]">
    <FileText className="w-10 h-10 text-white mb-2" />
    <span className="text-4xl font-extrabold text-white">
      {registros.filter(r => esHoyLocal(r.created_at)).length}
    </span>
    <span className="text-base text-white/80 mt-2">Formularios hoy</span>
  </div>
</div>


 <div className="mb-8 flex justify-center">
        <button
          onClick={() => setShowFormularios(true)}
          className="bg-gradient-to-r from-[#2563eb] to-[#0ea5e9] hover:from-[#1e293b] hover:to-[#2563eb] text-white px-10 py-5 rounded-2xl shadow-2xl font-bold flex items-center gap-4 text-2xl transition-all border-2 border-[#2563eb] tracking-wide"
        >
          <ClipboardList className="w-8 h-8" /> Formularios disponibles
        </button>
      </div>
      {}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 border border-gray-200 dark:border-gray-700 mb-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h2 className="text-4xl font-extrabold text-[#000000] dark:text-[#38bdf8]">Gestiones de asesores hoy</h2>
          <div className="flex gap-2 items-center">
            <input
              type="date"
              value={fechaFiltroChart}
              onChange={e => setFechaFiltroChart(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <select className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
              <option value="">Todos los asesores</option>
              {asesoresTodos.map(asesor => (
                <option key={asesor.id} value={asesor.nombre}>{asesor.nombre}</option>
              ))}
            </select>
          </div>
        </div>



  <ResponsiveContainer width="100%" height={Math.max(asesoresTodos.length * 50, 420)}>
          <BarChart data={actividadHoy} layout="vertical" margin={{ top: 20, right: 40, left: 0, bottom: 20 }} barCategoryGap={20}>
            <XAxis
              type="number"
              domain={[0, 12]}
              tick={{ fontSize: 16 }}
              axisLine={false}
              interval={0}
              ticks={[0,1,2,3,4,5,6,7,8,9,10,11,12]}
            />
            <YAxis
              dataKey="asesor"
              type="category"
              width={400}
              axisLine={false}
              tick={({ y, payload }) => (
                <g>
                  <defs>
                    <linearGradient id="nombreGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#e0e7ff" />
                      <stop offset="100%" stopColor="#c7d2fe" />
                    </linearGradient>
                  </defs>
                  <rect x={40} y={y - 14} width={320} height={28} rx={12} fill="url(#nombreGrad)" opacity="0.85" />
                  <text x={56} y={y + 6} fontSize="16" fontWeight="600" fill="#2563eb" textAnchor="start" alignmentBaseline="middle" style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.5px' }}>
                    {payload.value}
                  </text>
                </g>
              )}
            />
            <Tooltip
              contentStyle={{ borderRadius: 16, background: 'linear-gradient(90deg,#2563eb,#38bdf8)', color: '#fff', fontSize: 18, boxShadow: '0 4px 24px #2563eb33' }}
              itemStyle={{ fontWeight: 700 }}
              formatter={(value) => `${value} gestiones`}
              cursor={{ fill: '#2563eb22' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 16, fontWeight: 600 }} />
              {/* Definir gradientes SVG fuera del ciclo */}
              <defs>
                {actividadHoy.map((entry, index) => {
                  const gradId = `gradBarra-${index}`;
                  if (entry.gestionesHoy <= 3) {
                    // Solo rojo
                    return (
                      <linearGradient key={gradId} id={gradId} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#ef4444" />
                      </linearGradient>
                    );
                  } else if (entry.gestionesHoy <= 8) {
                    // Rojo a naranja
                    return (
                      <linearGradient key={gradId} id={gradId} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="100%" stopColor="#f59e42" />
                      </linearGradient>
                    );
                  } else {
                    // Rojo a naranja a verde
                    return (
                      <linearGradient key={gradId} id={gradId} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#f59e42" />
                        <stop offset="100%" stopColor="#22c55e" />
                      </linearGradient>
                    );
                  }
                })}
              </defs>
              <Bar dataKey="gestionesHoy" name="Gestiones"
                radius={[20, 20, 20, 20]}
                isAnimationActive={true}
                animationDuration={1400}
                barSize={32}
                label={{ position: 'right', fontSize: 18, fontWeight: 700, fill: '#2563eb', fontFamily: 'Inter, sans-serif' }}
              >
                {actividadHoy.map((entry, index) => {
                  const gradId = `gradBarra-${index}`;
                  return (
                    <Cell key={`cell-${index}`} fill={`url(#${gradId})`} filter="url(#sombraBarra)" />
                  );
                })}
              </Bar>
              <defs>
                <filter id="sombraBarra" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#2563eb" floodOpacity="0.15" />
                </filter>
                <linearGradient id="gradGreen" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="gradOrange" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e42" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <linearGradient id="gradRed" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f87171" />
                </linearGradient>
              </defs>
            <defs>
              <linearGradient id="verde" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <linearGradient id="naranja" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f59e42" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <linearGradient id="rojo" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f87171" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-end mt-4 text-base text-gray-500 dark:text-gray-400 gap-6">
          <span className="inline-flex items-center"><span className="inline-block w-4 h-4 rounded bg-[#22c55e] mr-2"></span>Meta cumplida (≥8)</span>
          <span className="inline-flex items-center"><span className="inline-block w-4 h-4 rounded bg-[#f59e42] mr-2"></span>En progreso (3-8)</span>
          <span className="inline-flex items-center"><span className="inline-block w-4 h-4 rounded bg-[#ef4444] mr-2"></span>Bajo (&lt;3)</span>
        </div>
      </div>


      {}
     

      {}
      {showFormularios && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-gradient-to-br from-[#1e293b] via-[#2563eb] to-[#0ea5e9] dark:from-[#1e293b] dark:via-[#2563eb] dark:to-[#0ea5e9] rounded-2xl shadow-2xl p-8 max-w-2xl w-full relative border-2 border-[#2563eb]">
            <button
              onClick={() => setShowFormularios(false)}
              className="absolute top-4 right-4 text-white hover:text-red-400 text-2xl font-bold"
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-white dark:text-[#e0f2fe] mb-6 text-center">Formularios Disponibles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {formularios.map((f, i) => (
                <Link key={i} href={f.href}>
                  <div className="cursor-pointer bg-white/80 dark:bg-[#1e293b]/80 rounded-xl shadow-md p-6 border border-[#2563eb] dark:border-[#0ea5e9] hover:shadow-xl transition transform hover:-translate-y-1 flex items-center gap-4">
                    {f.flag ? (
                      <Image src={f.flag} alt={f.title} width={40} height={28} className="rounded-md" />
                    ) : f.icon ? (
                      <div className={`p-3 rounded-full ${f.color}`}>
                        <f.icon className="w-6 h-6" />
                      </div>
                    ) : null}
                    <h3 className="text-lg font-medium text-[#2563eb] dark:text-[#38bdf8]">{f.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Búsqueda */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por ID, tipo, o asesor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
          
          {}
          <div className="flex gap-2">
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg"
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <button
              onClick={limpiarFiltros}
              className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg"
            >
              Limpiar
            </button>
          </div>
        </div>

        {}
        {mostrarFiltros && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <select
              value={filtros.tipo}
              onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-400 dark:bg-gray-600"
            >
              <option value="">Todos los tipos</option>
              {tiposUnicos.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>

            <select
              value={filtros.asesor}
              onChange={(e) => setFiltros({...filtros, asesor: e.target.value})}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600"
            >
              <option value="">Todos los asesores</option>
              {usuariosUnicos.map(asesor => (
                <option key={asesor} value={asesor}>{asesor}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <input
                type="date"
                value={filtros.fechaDesde}
                onChange={(e) => setFiltros({...filtros, fechaDesde: e.target.value})}
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600"
                placeholder="Desde"
              />
              <input
                type="date"
                value={filtros.fechaHasta}
                onChange={(e) => setFiltros({...filtros, fechaHasta: e.target.value})}
                className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600"
                placeholder="Hasta"
              />
            </div>
          </div>
        )}

        {}
        {seleccionados.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mt-4">
            <span className="text-yellow-800 dark:text-yellow-200">
              {seleccionados.length} registro(s) seleccionado(s)
            </span>
            <button
              onClick={eliminarSeleccionados}
              className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar seleccionados
            </button>
          </div>
        )}
      </div>

      {}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        {}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            Registros de Formularios
          </h2>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>
              Mostrando {indexPrimerRegistro + 1}-{Math.min(indexUltimoRegistro, registrosFiltrados.length)} de {registrosFiltrados.length}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando registros...</p>
          </div>
        ) : registrosFiltrados.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No hay registros que coincidan con los criterios de búsqueda
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-3 w-8">
                      <input
                        type="checkbox"
                        checked={seleccionados.length === registrosPagina.length && registrosPagina.length > 0}
                        onChange={toggleSeleccionTodos}
                        className="rounded border-gray-300"
                      />
                    </th>
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Tipo</th>
                    <th className="pb-3">Asesor</th>
                    <th className="pb-3">Fecha</th>
                    <th className="pb-3 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {registrosPagina.map((r) => (
                    <tr key={r.id} className="border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-3">
                        <input
                          type="checkbox"
                          checked={seleccionados.includes(r.id)}
                          onChange={() => toggleSeleccion(r.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="py-3 font-mono text-xs">{r.id}</td>
                      <td className="py-3">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs">
                          {r.tipo}
                        </span>
                      </td>
                      <td className="py-3 font-medium">{r.asesor}</td>
                      
                      <td className="py-3 text-xs">
                        {new Date(r.created_at).toLocaleString()}
                      </td>
                      <td className="py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => eliminarRegistro(r.id)}
                            className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                            title="Eliminar registro"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {}
            {totalPaginas > 1 && (
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={() => setPaginaActual(p => Math.max(1, p - 1))}
                  disabled={paginaActual === 1}
                  className="flex items-center gap-2 px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: Math.min(5, totalPaginas) }, (_, i) => {
                    const pagina = paginaActual <= 3 
                      ? i + 1 
                      : paginaActual >= totalPaginas - 2 
                      ? totalPaginas - 4 + i 
                      : paginaActual - 2 + i
                    
                    if (pagina < 1 || pagina > totalPaginas) return null
                    
                    return (
                      <button
                        key={pagina}
                        onClick={() => setPaginaActual(pagina)}
                        className={`w-8 h-8 rounded ${
                          pagina === paginaActual
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {pagina}
                      </button>
                    )
                  })}
                </div>
                
                <button
                  onClick={() => setPaginaActual(p => Math.min(totalPaginas, p + 1))}
                  disabled={paginaActual === totalPaginas}
                  className="flex items-center gap-2 px-3 py-1 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50"
                >
                  Siguiente
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}