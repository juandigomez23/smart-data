"use client"

import { 
  Users, FileText, BarChart3, UserPlus, UserCheck,
  Moon, Sun, Trash2, Search, Edit, Shield,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface Formulario {
  id: number
  tipo: string
  usuario: string
  pais: string | null
  datos: Record<string, unknown>
  created_at: string
}

interface Asesor {
  id: number
  nombre: string
  email: string
  cedula: string
  estado: 'activo' | 'inactivo' | 'vacaciones'
  rol: 'asesor' | 'supervisor' | 'administrador'
  fechaRegistro: string
  ultimoAcceso: string
  formulariosCompletados: number
  eficiencia: number
}

interface Filtros {
  tipo: string
  usuario: string
  pais: string
  fechaDesde: string
  fechaHasta: string
}


interface VistaFormulariosProps {
  registros: Formulario[]
  loading: boolean
  busqueda: string
  setBusqueda: (value: string) => void
  filtros: Filtros
  setFiltros: (filtros: Filtros) => void
  paginaActual: number
  setPaginaActual: (pagina: number) => void
  registrosPorPagina: number
}

interface VistaGestionAsesoresProps {
  asesores: Asesor[]
  busquedaAsesores: string
  setBusquedaAsesores: (value: string) => void
  filtroEstadoAsesor: string
  setFiltroEstadoAsesor: (value: string) => void
  filtroRolAsesor: string
  setFiltroRolAsesor: (value: string) => void
  crearAsesor: () => void
  editarAsesor: (asesor: Asesor) => void
  cambiarEstadoAsesor: (id: number, estado: 'activo' | 'inactivo' | 'vacaciones') => void
  eliminarAsesor: (id: number) => void
}

interface ModalAsesorProps {
  asesor: Asesor | null
  onClose: () => void
  onSave: (asesorData: Omit<Asesor, 'id' | 'fechaRegistro' | 'ultimoAcceso' | 'formulariosCompletados' | 'eficiencia'>) => void
}

export default function AdminDashboardPage() {
  const { theme, setTheme } = useTheme()
  const [dark, setDark] = useState(theme === "dark")
  const [registros, setRegistros] = useState<Formulario[]>([])
  const [asesores, setAsesores] = useState<Asesor[]>([])
  const [loading, setLoading] = useState(true)
  const [vistaActiva, setVistaActiva] = useState<'formularios' | 'asesores'>('formularios')
  const [mostrarModalAsesor, setMostrarModalAsesor] = useState(false)
  const [asesorEditando, setAsesorEditando] = useState<Asesor | null>(null)

  // Estados para formularios
  const [busqueda, setBusqueda] = useState("")
  const [filtros, setFiltros] = useState<Filtros>({
    tipo: "", usuario: "", pais: "", fechaDesde: "", fechaHasta: ""
  })
  const [paginaActual, setPaginaActual] = useState(1)
  const [registrosPorPagina] = useState(10)

  // Estados para asesores
  const [busquedaAsesores, setBusquedaAsesores] = useState("")
  const [filtroEstadoAsesor, setFiltroEstadoAsesor] = useState<string>("")
  const [filtroRolAsesor, setFiltroRolAsesor] = useState<string>("")

  const toggleTheme = () => {
    setDark(!dark)
    setTheme(dark ? "light" : "dark")
  }


  useEffect(() => {
    fetchData()
    fetchAsesores()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/formularios")
      const json = await res.json()
      if (json.success) setRegistros(json.data)
    } catch (err) {
      console.error("❌ Error al cargar registros:", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchAsesores = async () => {
    try {
      const res = await fetch("/api/asesores")
      const json = await res.json()
      if (json.success) setAsesores(json.data)
    } catch (err) {
      console.error("❌ Error al cargar asesores:", err)
      // Datos de ejemplo
      setAsesores(datosAsesoresEjemplo)
    }
  }


  const datosAsesoresEjemplo: Asesor[] = [
    {
      id: 1,
      nombre: "asesor_demo",
      email: "asesor@empresa.com",
      cedula: "123456789",
      estado: "activo",
      rol: "asesor",
      fechaRegistro: "2024-01-15",
      ultimoAcceso: "2025-09-22T17:36:04",
      formulariosCompletados: 18,
      eficiencia: 95
    },
    {
      id: 2,
      nombre: "maria_gonzalez",
      email: "maria.gonzalez@empresa.com",
      cedula: "987654321",
      estado: "activo",
      rol: "supervisor",
      fechaRegistro: "2024-02-20",
      ultimoAcceso: "2025-09-22T16:45:00",
      formulariosCompletados: 42,
      eficiencia: 88
    },
    {
      id: 3,
      nombre: "carlos_rodriguez",
      email: "c.rodriguez@empresa.com",
      cedula: "87654321",
      estado: "vacaciones",
      rol: "asesor",
      fechaRegistro: "2024-03-10",
      ultimoAcceso: "2025-09-20T12:30:00",
      formulariosCompletados: 156,
      eficiencia: 92
    },
    {
      id: 4,
      nombre: "ana_martinez",
      email: "a.martinez@empresa.com",
      cedula: "7654321",
      estado: "inactivo",
      rol: "asesor",
      fechaRegistro: "2024-01-08",
      ultimoAcceso: "2025-09-18T10:15:00",
      formulariosCompletados: 89,
      eficiencia: 85
    }
  ]


  const asesoresFiltrados = asesores.filter(asesor => {
    const coincideBusqueda = 
      asesor.nombre.toLowerCase().includes(busquedaAsesores.toLowerCase()) ||
      asesor.email.toLowerCase().includes(busquedaAsesores.toLowerCase()) ||
      asesor.cedula.toLowerCase().includes(busquedaAsesores.toLowerCase())
    
    const coincideEstado = !filtroEstadoAsesor || asesor.estado === filtroEstadoAsesor
    const coincideRol = !filtroRolAsesor || asesor.rol === filtroRolAsesor

    return coincideBusqueda && coincideEstado && coincideRol
  })


  const metricasGenerales = [
    { 
      titulo: "Total Formularios", 
      valor: registros.length.toString(), 
      icono: <FileText className="w-6 h-6" />, 
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200" 
    },
    { 
      titulo: "Asesores Activos", 
      valor: `${asesores.filter(a => a.estado === 'activo').length} de ${asesores.length}`, 
      icono: <UserCheck className="w-6 h-6" />, 
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200" 
    },
    { 
      titulo: "Eficiencia Promedio", 
      valor: asesores.length > 0 
        ? `${Math.round(asesores.reduce((acc, a) => acc + a.eficiencia, 0) / asesores.length)}%` 
        : "0%", 
      icono: <BarChart3 className="w-6 h-6" />, 
      color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200" 
    },
    { 
      titulo: "Supervisores", 
      valor: asesores.filter(a => a.rol === 'supervisor').length.toString(), 
      icono: <Shield className="w-6 h-6" />, 
      color: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200" 
    },
  ]


  const crearAsesor = () => {
    setAsesorEditando(null)
    setMostrarModalAsesor(true)
  }

  const editarAsesor = (asesor: Asesor) => {
    setAsesorEditando(asesor)
    setMostrarModalAsesor(true)
  }

  const cambiarEstadoAsesor = async (id: number, nuevoEstado: 'activo' | 'inactivo' | 'vacaciones') => {
    try {
      const res = await fetch(`/api/asesores/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      })

      if (res.ok) {
        setAsesores(prev => prev.map(a => a.id === id ? { ...a, estado: nuevoEstado } : a))
        alert(`✅ Estado del asesor actualizado a ${nuevoEstado}`)
      }
    } catch (err) {
      console.error('Error actualizando asesor:', err)
      alert('❌ Error al actualizar el asesor')
    }
  }

  const eliminarAsesor = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este asesor? Esta acción no se puede deshacer.')) return

    try {
      const res = await fetch(`/api/asesores/${id}`, { method: 'DELETE' })
      
      if (res.ok) {
        setAsesores(prev => prev.filter(a => a.id !== id))
        alert('✅ Asesor eliminado exitosamente')
      }
    } catch (err) {
      console.error('Error eliminando asesor:', err)
      alert('❌ Error al eliminar el asesor')
    }
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
          <button onClick={toggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
            {dark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800" />}
          </button>
        </div>
      </div>

      {}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setVistaActiva('formularios')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            vistaActiva === 'formularios'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          📊 Formularios
        </button>
        <button
          onClick={() => setVistaActiva('asesores')}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            vistaActiva === 'asesores'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          👥 Gestión de Asesores
        </button>
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metricasGenerales.map((m, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{m.titulo}</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{m.valor}</p>
            </div>
            <div className={`p-3 rounded-full ${m.color}`}>{m.icono}</div>
          </div>
        ))}
      </div>

      {}
      {vistaActiva === 'formularios' && (
        <VistaFormularios
          registros={registros}
          loading={loading}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
          filtros={filtros}
          setFiltros={setFiltros}
          paginaActual={paginaActual}
          setPaginaActual={setPaginaActual}
          registrosPorPagina={registrosPorPagina}
        />
      )}

      {}
      {vistaActiva === 'asesores' && (
        <VistaGestionAsesores
          asesores={asesoresFiltrados}
          busquedaAsesores={busquedaAsesores}
          setBusquedaAsesores={setBusquedaAsesores}
          filtroEstadoAsesor={filtroEstadoAsesor}
          setFiltroEstadoAsesor={setFiltroEstadoAsesor}
          filtroRolAsesor={filtroRolAsesor}
          setFiltroRolAsesor={setFiltroRolAsesor}
          crearAsesor={crearAsesor}
          editarAsesor={editarAsesor}
          cambiarEstadoAsesor={cambiarEstadoAsesor}
          eliminarAsesor={eliminarAsesor}
        />
      )}

      {}
      {mostrarModalAsesor && (
        <ModalAsesor
          asesor={asesorEditando}
          onClose={() => setMostrarModalAsesor(false)}
          onSave={(asesorData) => {
            if (asesorEditando) {
    
              setAsesores(prev => prev.map(a => a.id === asesorEditando.id ? { ...a, ...asesorData } : a))
            } else {
              
              const nuevoAsesor: Asesor = {
                id: Math.max(...asesores.map(a => a.id)) + 1,
                ...asesorData,
                fechaRegistro: new Date().toISOString().split('T')[0],
                ultimoAcceso: new Date().toISOString(),
                formulariosCompletados: 0,
                eficiencia: 0
              }
              setAsesores(prev => [...prev, nuevoAsesor])
            }
            setMostrarModalAsesor(false)
          }}
        />
      )}
    </div>
  )
}


const VistaFormularios: React.FC<VistaFormulariosProps> = ({ 
  registros, 
//   loading, 
//   busqueda, 
//   setBusqueda, 
//   filtros, 
//   setFiltros, 
//   paginaActual, 
//   setPaginaActual, 
//   registrosPorPagina 
 }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Vista de Formularios
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Mostrando {registros.length} formularios
      </p>
      {}
    </div>
  )
}

const VistaGestionAsesores: React.FC<VistaGestionAsesoresProps> = ({
  asesores,
  busquedaAsesores,
  setBusquedaAsesores,
  filtroEstadoAsesor,
  setFiltroEstadoAsesor,
  filtroRolAsesor,
  setFiltroRolAsesor,
  crearAsesor,
  editarAsesor,
  cambiarEstadoAsesor,
  eliminarAsesor
}) => {
  return (
    <div className="space-y-6">
      {}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar asesor por nombre, email o país..."
              value={busquedaAsesores}
              onChange={(e) => setBusquedaAsesores(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={filtroEstadoAsesor}
            onChange={(e) => setFiltroEstadoAsesor(e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="vacaciones">Vacaciones</option>
          </select>

          <select
            value={filtroRolAsesor}
            onChange={(e) => setFiltroRolAsesor(e.target.value)}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los roles</option>
            <option value="asesor">Asesor</option>
            <option value="supervisor">Supervisor</option>
            <option value="administrador">Administrador</option>
          </select>

          <button
            onClick={crearAsesor}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            Nuevo Asesor
          </button>
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {asesores.map((asesor) => (
          <div key={asesor.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            {}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{asesor.nombre}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{asesor.email}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => editarAsesor(asesor)}
                  className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                  title="Editar asesor"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => eliminarAsesor(asesor.id)}
                  className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  title="Eliminar asesor"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">{asesor.cedula}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{asesor.rol}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  asesor.estado === 'activo' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  asesor.estado === 'inactivo' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {asesor.estado}
                </span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {asesor.eficiencia}% eficiencia
                </span>
              </div>
            </div>

            {/* Estado de conexión y última conexión */}
            <div className="mt-2">
              {asesor.estado === 'activo' ? (
                <span className="text-xs font-semibold text-green-700 dark:text-green-300">Conectado ahora</span>
              ) : (
                <span className="text-xs text-gray-600 dark:text-gray-400">Última conexión: {asesor.ultimoAcceso ? new Date(asesor.ultimoAcceso).toLocaleString('es-ES') : 'Sin registro'}</span>
              )}
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{asesor.formulariosCompletados}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Formularios</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Registro</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(asesor.fechaRegistro).toLocaleDateString('es-ES')}
                </p>
              </div>
            </div>

            {}
            <div className="flex gap-2 mt-4">
              <select
                value={asesor.estado}
                onChange={(e) => cambiarEstadoAsesor(asesor.id, e.target.value as 'activo' | 'inactivo' | 'vacaciones')}
                className="flex-1 text-sm p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="vacaciones">Vacaciones</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {asesores.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
          <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No hay asesores que coincidan con los criterios de búsqueda</p>
        </div>
      )}
    </div>
  )
}


const ModalAsesor: React.FC<ModalAsesorProps> = ({ asesor, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: asesor?.nombre || '',
    email: asesor?.email || '',
    cedula: asesor?.cedula || '',
    estado: (asesor?.estado as 'activo' | 'inactivo' | 'vacaciones') || 'activo',
    rol: (asesor?.rol as 'asesor' | 'supervisor' | 'administrador') || 'asesor'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          {asesor ? 'Editar Asesor' : 'Nuevo Asesor'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Nombre
            </label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa el nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ejemplo@empresa.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cédula
            </label>
            <input
              type="text"
              value={formData.cedula}
              onChange={(e) => setFormData({...formData, cedula: e.target.value})}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Cédula del asesor"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Estado
              </label>
              <select
                value={formData.estado}
                onChange={(e) => setFormData({...formData, estado: e.target.value as 'activo' | 'inactivo' | 'vacaciones'})}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="vacaciones">Vacaciones</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Rol
              </label>
              <select
                value={formData.rol}
                onChange={(e) => setFormData({...formData, rol: e.target.value as 'asesor' | 'supervisor' | 'administrador'})}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="asesor">Asesor</option>
                <option value="supervisor">Supervisor</option>
                <option value="administrador">Administrador</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              {asesor ? 'Actualizar' : 'Crear'} Asesor
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}