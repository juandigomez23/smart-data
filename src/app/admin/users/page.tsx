"use client"

import { Users, UserPlus, Trash2, Search, Edit, IdCard } from "lucide-react"
import { useState, useEffect } from "react"
import useSWR from "swr"

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
  completadosHoy?: number
  formularios_permitidos?: string[]
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
  onSave: (asesorData: Omit<Asesor, 'id' | 'fechaRegistro' | 'ultimoAcceso' | 'formulariosCompletados' | 'eficiencia'> & { formularios_permitidos: string[] }) => void
}

export default function AdminDashboardPage() {
  const [mensajeAccion, setMensajeAccion] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [modalConfirm, setModalConfirm] = useState<{ id: number | null; nombre?: string } | null>(null);
  const [asesores, setAsesores] = useState<Asesor[]>([])
  const [mostrarModalAsesor, setMostrarModalAsesor] = useState(false)
  const [asesorEditando, setAsesorEditando] = useState<Asesor | null>(null)
  const [busquedaAsesores, setBusquedaAsesores] = useState("")
  const [filtroEstadoAsesor, setFiltroEstadoAsesor] = useState<string>("")
  const [filtroRolAsesor, setFiltroRolAsesor] = useState<string>("")


  useEffect(() => {
    const fetchAsesores = async () => {
      try {
        const res = await fetch("/api/asesores")
        const json = await res.json()
        if (json.success) setAsesores(json.data)
      } catch (err) {
        console.error("❌ Error al cargar asesores:", err)
        setAsesores([])
      }
    }
    fetchAsesores()
  }, [])


  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const todayStr = new Date().toISOString().split("T")[0]
  const { data: formulariosData } = useSWR(`/api/formularios?fechaDesde=${todayStr}&fechaHasta=${todayStr}` , fetcher)
  const formulariosHoy = formulariosData?.success ? formulariosData.data : []

  interface Formulario {
    id: number;
    tipo: string;
    asesor: string;
    datos: Record<string, unknown>;
    created_at: string;
  }
  // Excluir roles administrativos (administrador / admin / owner) en la vista de gestión
  const _excludedRoles = new Set(['administrador', 'admin', 'owner'])
  const asesoresVisibles = asesores.filter(a => !_excludedRoles.has(String(a.rol)))

  const asesoresConEficienciaDiaria = asesoresVisibles.map(asesor => {
    const completadosHoy = (formulariosHoy as Formulario[]).filter(f => f.asesor === asesor.nombre).length
    const eficienciaDiaria = Math.min(Math.round((completadosHoy / 45) * 100), 100)
    
    return { ...asesor, eficiencia: eficienciaDiaria, completadosHoy }
  })
  const asesoresOrdenados = [...asesoresConEficienciaDiaria].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }));

  const asesoresFiltrados = asesoresOrdenados.filter(asesor => {
    const coincideBusqueda = 
      asesor.nombre.toLowerCase().includes(busquedaAsesores.toLowerCase()) ||
      asesor.email.toLowerCase().includes(busquedaAsesores.toLowerCase()) ||
      asesor.cedula.toLowerCase().includes(busquedaAsesores.toLowerCase())
    
    const coincideEstado = !filtroEstadoAsesor || asesor.estado === filtroEstadoAsesor
    const coincideRol = !filtroRolAsesor || asesor.rol === filtroRolAsesor

    return coincideBusqueda && coincideEstado && coincideRol
  })


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

  const eliminarAsesor = (id: number, nombre?: string) => {
    setModalConfirm({ id, nombre });
  };

  const confirmarEliminacion = async () => {
    if (!modalConfirm || modalConfirm.id == null) return;
    try {
      const res = await fetch(`/api/asesores/${modalConfirm.id}`, { method: 'DELETE' });
      const json = await res.json();
      if (res.ok && json.success) {
        setAsesores(prev => prev.filter(a => a.id !== modalConfirm.id));
        setMensajeAccion({ text: '✅ Asesor eliminado exitosamente', type: "success" });
      } else {
        setMensajeAccion({ text: `❌ ${json.error || "Error al eliminar el asesor"}`, type: "error" });
      }
    } catch (err) {
      console.error('Error eliminando asesor:', err);
      setMensajeAccion({ text: '❌ Error al eliminar el asesor', type: "error" });
    }
    setTimeout(() => setMensajeAccion(null), 3500);
    setModalConfirm(null);
  };

  const cancelarEliminacion = () => {
    setModalConfirm(null);
  };

  return (
  <div className="min-h-screen transition-colors relative">
    {mensajeAccion && (
      <div className={`fixed inset-0 flex items-center justify-center z-50 pointer-events-none`}>
        <div className={`px-8 py-6 rounded-2xl shadow-2xl text-center text-lg font-bold border-2 ${mensajeAccion.type === "success" ? "bg-green-100 text-green-800 border-green-300" : "bg-red-100 text-red-800 border-red-300"}`} style={{ minWidth: 320, maxWidth: 400 }}>
          {mensajeAccion.text}
        </div>
      </div>
    )}
    {modalConfirm && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
        <div className="bg-white dark:bg-gray-900 px-8 py-8 rounded-2xl shadow-2xl text-center border-2 border-blue-300 dark:border-blue-700" style={{ minWidth: 340, maxWidth: 420 }}>
          <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-200 mb-4">¿Estás seguro?</h2>
          <p className="text-base text-gray-700 dark:text-gray-100 mb-6">
            {modalConfirm.nombre
              ? `¿Deseas eliminar al asesor "${modalConfirm.nombre}"? Esta acción no se puede deshacer.`
              : `¿Deseas eliminar este asesor? Esta acción no se puede deshacer.`}
          </p>
          <div className="flex gap-6 justify-center">
            <button
              className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold shadow hover:bg-red-700 transition-colors"
              onClick={confirmarEliminacion}
            >
              Sí, eliminar
            </button>
            <button
              className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              onClick={cancelarEliminacion}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )}

    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Gestión de Asesores</h1>
        <p className="text-gray-600">Administra usuarios y sus datos</p>
      </div>
    </div>


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

    {mostrarModalAsesor && (
      <ModalAsesor
        asesor={asesorEditando}
        onClose={() => setMostrarModalAsesor(false)}
        onSave={async (asesorData) => {
          if (asesorEditando) {
        
            try {
              const res = await fetch(`/api/asesores/${asesorEditando.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...asesorEditando, ...asesorData })
              });
              const json = await res.json();
              if (res.ok && json.success) {
                setAsesores(prev => prev.map(a => a.id === asesorEditando.id ? { ...a, ...json.data } : a));
                setMensajeAccion({ text: '✅ Asesor actualizado exitosamente', type: "success" });
              } else {
                setMensajeAccion({ text: `❌ ${json.error || "Error al actualizar asesor"}`, type: "error" });
              }
            } catch {
              setMensajeAccion({ text: '❌ Error al actualizar asesor', type: "error" });
            }
          } else {
          
            try {
              const res = await fetch('/api/asesores', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(asesorData)
              });
              const json = await res.json();
              if (res.ok && json.success) {
                setAsesores(prev => [...prev, json.data]);
                setMensajeAccion({ text: '✅ Asesor creado exitosamente', type: "success" });
              } else {
                setMensajeAccion({ text: `❌ ${json.error || "Error al crear asesor"}`, type: "error" });
              }
            } catch {
              setMensajeAccion({ text: '❌ Error al crear asesor', type: "error" });
            }
          }
          setTimeout(() => setMensajeAccion(null), 3500);
          setMostrarModalAsesor(false);
        }}
      />
    )}
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
    <div className="space-y-8">
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre, email o cédula..."
              value={busquedaAsesores}
              onChange={(e) => setBusquedaAsesores(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-blue-200 dark:border-blue-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-blue-400 dark:placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={filtroEstadoAsesor}
            onChange={(e) => setFiltroEstadoAsesor(e.target.value)}
            className="p-2 border border-blue-200 dark:border-blue-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los estados</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="vacaciones">Vacaciones</option>
          </select>
          <select
            value={filtroRolAsesor}
            onChange={(e) => setFiltroRolAsesor(e.target.value)}
            className="p-2 border border-blue-200 dark:border-blue-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Todos los roles</option>
            <option value="asesor">Asesor</option>
            <option value="supervisor">Supervisor</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
        <button
          onClick={crearAsesor}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white rounded-xl shadow-lg font-bold text-lg transition-all border-2 border-blue-600 animate-pulse"
        >
          <UserPlus className="w-6 h-6" />
          Nuevo Asesor
        </button>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {asesores.map((asesor) => (
          <div key={asesor.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-blue-200 dark:border-blue-700 flex flex-col gap-4 hover:shadow-2xl transition-transform duration-200">
            {/* Avatar y nombre */}
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-300 to-blue-600 dark:from-blue-800 dark:to-blue-400 flex items-center justify-center text-white font-bold text-2xl">
                {asesor.nombre.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">{asesor.nombre}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{asesor.email}</p>
                <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <IdCard className="w-4 h-4" /> {asesor.cedula}
                </span>
              </div>
            </div>
            
            <div className="flex gap-2 items-center mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                asesor.rol === 'administrador' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' :
                asesor.rol === 'supervisor' ? 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-200' :
                'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
              }`}>
                {asesor.rol.charAt(0).toUpperCase() + asesor.rol.slice(1)}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                asesor.estado === 'activo' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                asesor.estado === 'inactivo' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {asesor.estado.charAt(0).toUpperCase() + asesor.estado.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs text-gray-800 dark:text-blue-200">Eficiencia</span>
                <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                    // map completadosHoy to percentage visual over a baseline of 45 (capped at 100%)
                    style={{ width: `${Math.min(((asesor.completadosHoy ?? 0) / 45) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="text-xs font-bold text-green-700 dark:text-green-200">{asesor.completadosHoy ?? 0} formularios</span>
            </div>
            
            {asesor.formularios_permitidos && asesor.formularios_permitidos.length > 0 && (
              <div className="mb-2">
                <span className="text-xs font-semibold text-gray-800 dark:text-blue-200">Formularios permitidos (códigos):</span>
                <ul className="flex flex-wrap gap-1 mt-1">
                  {asesor.formularios_permitidos.map((codigo) => (
                    <li key={codigo} className="px-2 py-0.5 rounded bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 text-xs font-mono border border-blue-300 dark:border-blue-700">
                      {codigo}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => editarAsesor(asesor)}
                className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                title="Editar asesor"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => eliminarAsesor(asesor.id)}
                className="p-2 rounded-full bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                title="Eliminar asesor"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <select
                value={asesor.estado}
                onChange={(e) => cambiarEstadoAsesor(asesor.id, e.target.value as 'activo' | 'inactivo' | 'vacaciones')}
                className="flex-1 text-xs p-2 border border-blue-200 dark:border-blue-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Cambiar estado"
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
        <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-2xl">
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
    rol: (asesor?.rol as 'asesor' | 'supervisor' | 'administrador') || 'asesor',
    formularios_permitidos: asesor?.formularios_permitidos || []
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