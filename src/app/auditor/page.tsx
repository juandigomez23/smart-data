'use client'

import { useAuditorDashboard } from '@/hooks/useAuditorDashboard'

export default function AuditorDashboard() {
  const {
    stats,
    audits,
    monthlyData,
    loading,
    createNewAudit,
    updateAuditStatus,
    deleteAudit, // Importar la nueva función
    generateReport
  } = useAuditorDashboard()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  const statsData = [
    { title: 'Auditorías Totales', value: stats.total.toString(), change: '+12%', icon: '📊' },
    { title: 'Pendientes', value: stats.pending.toString(), change: '-5%', icon: '⏳' },
    { title: 'Completadas', value: stats.completed.toString(), change: '+8%', icon: '✅' },
    { title: 'Tasa de Cumplimiento', value: `${stats.complianceRate}%`, change: '+3%', icon: '🎯' }
  ]

  const maxValue = Math.max(...monthlyData.map(d => d.value))

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Auditor</h1>
        <p className="text-gray-600">Resumen general de actividades de auditoría</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                  {stat.change}
                </span>
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Auditorías por Mes</h2>
          <div className="space-y-4">
            {monthlyData.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="w-16 text-sm text-gray-600">{item.month}</span>
                <div className="flex-1 ml-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>{item.value} auditorías</span>
                    <span>{Math.round((item.value / maxValue) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(item.value / maxValue) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Audits */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Auditorías Recientes</h2>
            <span className="text-sm text-gray-500">{audits.length} total</span>
          </div>
          <div className="space-y-4">
            {audits.map(audit => (
              <div key={audit.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{audit.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      audit.priority === 'Alta' ? 'bg-red-100 text-red-800' :
                      audit.priority === 'Media' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {audit.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{audit.date}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <select 
                    value={audit.status}
                    onChange={(e) => updateAuditStatus(audit.id, e.target.value as 'Pendiente' | 'En Progreso' | 'Completada')}
                    className={`px-3 py-1 rounded-full text-sm font-medium border-0 focus:ring-2 focus:ring-blue-500 ${
                      audit.status === 'Completada' ? 'bg-green-100 text-green-800' :
                      audit.status === 'En Progreso' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Progreso">En Progreso</option>
                    <option value="Completada">Completada</option>
                  </select>
                  
                  {/* Botón de eliminar */}
                  <button
                    onClick={() => deleteAudit(audit.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar auditoría"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={createNewAudit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Nueva Auditoría
          </button>
          <button 
            onClick={generateReport}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Generar Reporte
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
            Ver Historial
          </button>
        </div>
      </div>
    </div>
  )
}