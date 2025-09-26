"use client"

import Link from "next/link"
import Image from "next/image"
import { 
  Users, FileText,
  ClipboardList, CheckSquare, Briefcase, 
  XCircle, FileSpreadsheet, Moon, Sun, Download,
  Trash2, Search, Filter, ChevronLeft, ChevronRight

} from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import ExcelJS from "exceljs"
import { saveAs } from "file-saver"

interface Formulario {
  id: number
  tipo: string
  asesor: string
  datos: Record<string, unknown> 
  created_at: string
}

interface Filtros {
  tipo: string
  asesor: string
  fechaDesde: string
  fechaHasta: string
}

export default function AdminDashboardPage() {
  const { theme, setTheme } = useTheme()
  const [dark, setDark] = useState(theme === "dark")
  const [registros, setRegistros] = useState<Formulario[]>([])
  const [loading, setLoading] = useState(true)
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

  // 🔄 Traer formularios reales de la BD
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/formularios")
      const json = await res.json()
      if (json.success) {
        setRegistros(json.data)
      }
    } catch (err) {
      console.error("❌ Error al cargar registros:", err)
    } finally {
      setLoading(false)
    }
  }

  // 🔍 Filtrar y buscar registros
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

  // 📊 Paginación
  const indexUltimoRegistro = paginaActual * registrosPorPagina
  const indexPrimerRegistro = indexUltimoRegistro - registrosPorPagina
  const registrosPagina = registrosFiltrados.slice(indexPrimerRegistro, indexUltimoRegistro)
  const totalPaginas = Math.ceil(registrosFiltrados.length / registrosPorPagina)

  // 🎯 Selección múltiple
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

  // 🗑️ Eliminar registros
  const eliminarRegistro = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.")) {
      return
    }

    try {
      const res = await fetch(`/api/formularios/${id}`, {
        method: "DELETE"
      })

      if (res.ok) {
        setRegistros(prev => prev.filter(registro => registro.id !== id))
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

      // Actualizar datos locales
      setRegistros(prev => prev.filter(registro => !seleccionados.includes(registro.id)))
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

  // 🔄 Limpiar filtros
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

  // 📊 Métricas dinámicas
  const metricas = [
    { 
      titulo: "Total Formularios", 
      valor: registros.length.toString(), 
      icono: <FileText className="w-6 h-6" />, 
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200" 
    },
    { 
      titulo: "Usuarios únicos", 
      valor: new Set(registros.map(r => r.asesor)).size.toString(), 
      icono: <Users className="w-6 h-6" />, 
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200" 
    },
    { 
      titulo: "Tipos de formulario", 
      valor: new Set(registros.map(r => r.tipo)).size.toString(), 
      icono: <ClipboardList className="w-6 h-6" />, 
      color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200" 
    },
    { 
      titulo: "Filtrados", 
      valor: `${registrosFiltrados.length} de ${registros.length}`, 
      icono: <Filter className="w-6 h-6" />, 
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200" 
    },
  ]

  // 📤 Exportar registros
  const exportToExcel = async (todos: boolean = false) => {
    const datosExportar = todos ? registrosFiltrados : registrosPagina
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Formularios")

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Tipo", key: "tipo", width: 20 },
      { header: "Asesor", key: "asesor", width: 20 },
      { header: "Fecha", key: "created_at", width: 25 },
    ]

    datosExportar.forEach((r) => worksheet.addRow(r))

    const buffer = await workbook.xlsx.writeBuffer()
    saveAs(new Blob([buffer]), `formularios-${new Date().toISOString().split('T')[0]}.xlsx`)
  }

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

  // 📊 Datos únicos para filtros
  const tiposUnicos = Array.from(new Set(registros.map(r => r.tipo))).sort()
  const usuariosUnicos = Array.from(new Set(registros.map(r => r.asesor))).sort()


  return (
    <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Menú Administrador</h1>
          <p className="text-gray-600 dark:text-gray-400">Supervisa asesores, formularios y auditorías</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
              <Download className="w-5 h-5" />
              Exportar
            </button>
            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hidden group-hover:block z-10">
              <button 
                onClick={() => exportToExcel(false)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Exportar página actual
              </button>
              <button 
                onClick={() => exportToExcel(true)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Exportar todos filtrados
              </button>
            </div>
          </div>
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

      {/* Controles de búsqueda y filtros */}
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
          
          {/* Botones de control */}
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

        {/* Filtros avanzados */}
        {mostrarFiltros && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <select
              value={filtros.tipo}
              onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600"
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

        {/* Controles de selección múltiple */}
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

      {/* Tabla de registros */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        {/* Header de la tabla */}
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

            {/* Paginación */}
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