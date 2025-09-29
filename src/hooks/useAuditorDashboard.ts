// hooks/useAuditorDashboard.ts
import { useState, useMemo } from 'react'

export interface Audit {
  id: string
  name: string
  priority: 'Alta' | 'Media' | 'Baja'
  date: string
  status: 'Pendiente' | 'En Progreso' | 'Completada'
}

export interface MonthlyData {
  month: string
  value: number
}

export interface Stats {
  total: number
  pending: number
  completed: number
  complianceRate: number
}

export const useAuditorDashboard = () => {
  const [audits, setAudits] = useState<Audit[]>([
    {
      id: '1',
      name: 'Auditoria Q3 2024',
      priority: 'Alta',
      date: '2024-09-15',
      status: 'Pendiente'
    },
    {
      id: '2',
      name: 'Revisión Seguridad',
      priority: 'Media',
      date: '2024-09-18',
      status: 'En Progreso'
    },
    {
      id: '3',
      name: 'Complimiento GDPR',
      priority: 'Alta',
      date: '2024-09-20',
      status: 'Completada'
    },
    {
      id: '4',
      name: 'Nueva Auditoria 22/9/2025',
      priority: 'Media',
      date: '2025-09-22',
      status: 'Pendiente'
    }
  ])

  const [loading, setLoading] = useState(true)

  setTimeout(() => {
    setLoading(false)
  }, 1000)

  const stats = useMemo(() => {
    const total = audits.length
    const pending = audits.filter(a => a.status === 'Pendiente').length
    const completed = audits.filter(a => a.status === 'Completada').length
    const complianceRate = total > 0 ? Math.round((completed / total) * 100) : 0

    return { total, pending, completed, complianceRate }
  }, [audits])

  const monthlyData: MonthlyData[] = [
    { month: 'Ene', value: 12 },
    { month: 'Feb', value: 8 },
    { month: 'Mar', value: 15 },
    { month: 'Abr', value: 10 },
    { month: 'May', value: 18 },
    { month: 'Jun', value: 14 }
  ]

  const createNewAudit = () => {
    const newAudit: Audit = {
      id: Date.now().toString(),
      name: `Nueva Auditoría ${new Date().toLocaleDateString()}`,
      priority: 'Media',
      date: new Date().toISOString().split('T')[0],
      status: 'Pendiente'
    }
    
    setAudits(prev => [newAudit, ...prev])
    alert('Nueva auditoría creada exitosamente')
  }

  const updateAuditStatus = (id: string, status: 'Pendiente' | 'En Progreso' | 'Completada') => {
    setAudits(prev => 
      prev.map(audit => 
        audit.id === id ? { ...audit, status } : audit
      )
    )
  }

  const deleteAudit = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta auditoría?')) {
      setAudits(prev => prev.filter(audit => audit.id !== id))
      alert('Auditoría eliminada exitosamente')
    }
  }

  const generateReport = () => {
    alert('Reporte generado exitosamente')
  }

  return {
    stats,
    audits,
    monthlyData,
    loading,
    createNewAudit,
    updateAuditStatus,
    deleteAudit,
    generateReport
  }
}