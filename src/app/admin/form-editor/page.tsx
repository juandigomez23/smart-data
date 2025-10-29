"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FormConfig } from "@/components/formgenerator"

type Field = {
  name: string
  label?: string | ((args: { values: Record<string, unknown> }) => string)
  type?: "number" | "text" | "select" | "checkbox" | "date" | "info" | "time"
  required?: boolean
  description?: string
  options?: Array<{ label: string; value: string }>
  multiline?: boolean
  auto?: boolean
  showIf?: Record<string, unknown> | ((values: Record<string, unknown>) => boolean)
}

type EditorField = Field & {
  conditionalFields?: Array<{
    condition?: Record<string, unknown> | { field?: string; value?: unknown };
    fields: EditorField[];
  }>;
}
export default function AdminFormEditorPage() {
  const [files, setFiles] = useState<{ filename: string; title?: string }[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [config, setConfig] = useState<FormConfig | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [statusType, setStatusType] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  useEffect(() => {
    fetch("/api/forms/list")
      .then((r) => r.json())
      .then((data) => {
        if (data && Array.isArray(data.files)) {
          
          const normalized = data.files.map((f: unknown) => {
            
            if (typeof f === "string") return { filename: f }
            if (f && typeof f === "object") {
              const obj = f as Record<string, unknown>
              const filename = typeof obj.filename === "string" ? obj.filename : String(obj.filename ?? "")
              const title = typeof obj.title === "string" ? obj.title : undefined
              return { filename, title }
            }
            
            return { filename: String(f) }
          })
          setFiles(normalized)
        }
      })
      .catch((e) => console.error("list error", e))
  }, [])

  useEffect(() => {
    if (!selected) {
      setConfig(null)
      return
    }
    
    fetch(`/api/forms/get?file=${encodeURIComponent(selected)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.config) setConfig(data.config)
        else if (data?.raw) {
          
          setConfig(null)
        } else {
          setConfig(null)
        }
      })
      .catch((e) => {
        console.error("get config error", e)
        setConfig(null)
      })
  }, [selected])

  // legacy index-based updater removed in favor of name-based updates to
  // correctly handle nested/conditional fields without duplication.

  function addField() {
    const f = { name: `field_${Date.now()}`, label: "Nuevo campo", type: "text" } as FormConfig["fields"][number]
    setConfig((c) => {
      const base = (c ?? { title: "Nuevo formulario", fields: [] }) as FormConfig
      return { ...base, fields: [...(base.fields || []), f] }
    })
  }

  // Recursively find and update a field by name (searches nested conditionalFields too)
  function updateFieldByName(name: string, patch: Partial<Field>) {
    if (!config) return
    const clone = JSON.parse(JSON.stringify(config)) as FormConfig

    function recurse(fields: EditorField[]): boolean {
      for (let i = 0; i < fields.length; i++) {
        const f = fields[i]
        if (f.name === name) {
          fields[i] = { ...f, ...patch }
          return true
        }
        if (Array.isArray(f.conditionalFields)) {
          for (const cond of f.conditionalFields) {
            if (recurse(cond.fields)) return true
          }
        }
      }
      return false
    }

    recurse((clone.fields || []) as EditorField[])
    setConfig(clone)
  }

  // Build a flattened, deduplicated list of fields for the editor UI. If a field
  // appears in multiple places (top-level and conditional), we show it once and
  // indicate that it's conditional via the `meta.conditionalParents` array.
  function getFlattenedFields(cfg: FormConfig) {
    const map = new Map<string, { field: EditorField; meta: { conditionalParents: string[] } }>()

    function walk(fields: EditorField[], parentConditional?: string) {
      for (const f of fields) {
        const existing = map.get(f.name)
        if (!existing) {
          map.set(f.name, { field: f, meta: { conditionalParents: parentConditional ? [parentConditional] : [] } })
        } else if (parentConditional) {
          const arr = existing.meta.conditionalParents
          if (!arr.includes(parentConditional)) arr.push(parentConditional)
        }
        if (Array.isArray(f.conditionalFields)) {
          for (const cond of f.conditionalFields) {
            let condLabel = ""
            if (cond.condition && typeof cond.condition === "object") {
              const c = cond.condition as Record<string, unknown>
              if (Object.prototype.hasOwnProperty.call(c, "value")) condLabel = String((c as Record<string, unknown>).value)
              else condLabel = JSON.stringify(c)
            } else {
              condLabel = String(cond.condition)
            }
            walk(cond.fields, `${f.name}=${condLabel}`)
          }
        }
      }
    }

    walk((cfg.fields || []) as EditorField[])
    return Array.from(map.values()).map(v => ({ ...v.field, _meta: v.meta }))
  }

  // Remove a field by name from the config (searches nested conditionalFields as well)
  function removeFieldByName(name: string) {
    if (!config) return
    const clone = JSON.parse(JSON.stringify(config)) as FormConfig

    function recurse(fields: EditorField[]): boolean {
      let removed = false
      for (let i = fields.length - 1; i >= 0; i--) {
        const f = fields[i]
        if (f.name === name) {
          fields.splice(i, 1)
          removed = true
          continue
        }
        if (Array.isArray(f.conditionalFields)) {
          for (const cond of f.conditionalFields) {
            if (recurse(cond.fields)) removed = true
          }
        }
      }
      return removed
    }

    recurse((clone.fields || []) as EditorField[])
    setConfig(clone)
  }

  // Drag & drop and index-based remove are intentionally removed for the
  // flattened editor view to avoid ambiguous reordering of nested fields.

  async function save() {
    if (!selected || !config) return
    setStatus("Guardando...")
    setStatusType('saving')
    try {
      const res = await fetch("/api/forms/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: selected, config }),
      })
      if (!res.ok) {
        try {
          const j = await res.json()
          const msg = j?.error || j?.message || JSON.stringify(j)
          setStatus("Error: " + msg)
        } catch {
          const txt = await res.text()
          setStatus("Error: " + txt)
        }
        setStatusType('error')
        return
      }
      setStatus("Guardado correctamente")
      setStatusType('success')
      setTimeout(() => {
        setStatus(null)
        setStatusType('idle')
      }, 2500)
    } catch (e: unknown) {
      console.error(e)
      const msg = e instanceof Error ? e.message : String(e)
      setStatus("Error: " + msg)
      setStatusType('error')
    }
  }

  function clearStatus() {
    setStatus(null)
    setStatusType('idle')
  }

  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4">
      <div className="w-full max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">Editor de formularios</h1>
            <p className="mt-1 text-gray-600">Edita la configuración y vista (asesor) de los formularios.</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => window.location.reload()}>Recargar</Button>
            <Button onClick={() => addField()}>Agregar campo</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <aside className="lg:col-span-1">
            <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-lg">
              <label className="block text-sm font-medium text-gray-900 mb-2">Seleccionar formulario</label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm bg-white text-gray-900"
                value={selected ?? ""}
                onChange={(e) => setSelected(e.target.value || null)}
              >
                <option value="">-- Selecciona --</option>
                {files.length > 0 ? (
                  files.map((f) => {
                    const title = f.title || f.filename.replace(/\.ts$/, "")
                    return (
                      <option key={f.filename} value={f.filename}>
                        {title}
                      </option>
                    )
                  })
                ) : (
                  <option disabled>Cargando formularios...</option>
                )}
              </select>

              <div className="mt-4">
                <p className="text-sm text-gray-600">Estado:</p>
                <div className="mt-2 text-sm font-medium" data-status-type={statusType}>
                  <span className={
                    statusType === 'error' ? 'text-red-700' :
                    statusType === 'saving' ? 'text-blue-700' :
                    statusType === 'success' ? 'text-green-700' : 'text-gray-700'
                  }>{status ?? "Listo"}</span>
                </div>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-2">
            {!config && (
              <div className="p-8 rounded-2xl bg-white/80 backdrop-blur border border-gray-200 shadow-lg">
                <p className="text-gray-600">Selecciona un formulario a la izquierda para comenzar a editar su configuración.</p>
              </div>
            )}

            {config && (
              <div className="p-6 rounded-2xl bg-white shadow-2xl border border-gray-200 text-gray-900">
                <div className="mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{config.title ?? config.tipo}</h2>
                    <p className="text-sm text-gray-600">Tipo: {config.tipo ?? "generico"}</p>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-900 mb-2">Preguntas</label>
                    <div className="space-y-3">
                      {getFlattenedFields(config).map((field, idx) => (
                        <div
                          key={field.name || idx}
                          className="p-4 border rounded-xl bg-white shadow-sm hover:shadow-md transition flex flex-col min-w-0"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="text-gray-400">☰</div>
                                  <input
                                    className="text-lg font-medium text-gray-800 focus:outline-none min-w-0"
                                    value={typeof field.label === "string" ? field.label : String(field.label ?? "")}
                                    onChange={(e) => updateFieldByName(field.name, { label: e.target.value })}
                                  />
                                </div>

                                <div className="flex items-center gap-2">
                                  <select className="rounded-md border-gray-300 px-2 py-1 text-sm" value={field.type ?? "text"} onChange={(e) => updateFieldByName(field.name, { type: e.target.value as Field['type'] })}>
                                    <option value="text">Texto</option>
                                    <option value="select">Selección</option>
                                    <option value="number">Número</option>
                                    <option value="date">Fecha</option>
                                    <option value="checkbox">Casilla</option>
                                    <option value="info">Info</option>
                                    <option value="time">Hora</option>
                                  </select>
                                  <label className="inline-flex items-center text-sm">
                                    <input type="checkbox" checked={!!field.required} onChange={(e) => updateFieldByName(field.name, { required: e.target.checked })} className="form-checkbox h-4 w-4 text-blue-600" />
                                    <span className="ml-2 text-xs text-gray-700">Oblig.</span>
                                  </label>
                                  <Button size="sm" variant="destructive" onClick={() => removeFieldByName(field.name)}>Eliminar</Button>
                                </div>
                              </div>

                              {field.description !== undefined && (
                                <div className="mt-2">
                                  <input className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" placeholder="Descripción (opcional)" value={field.description ?? ""} onChange={(e) => updateFieldByName(field.name, { description: e.target.value })} />
                                </div>
                              )}

                              {field.type === "select" && (
                                <div className="mt-3">
                                  <label className="text-xs font-semibold text-gray-800">Opciones</label>
                                  <div className="mt-2 space-y-2">
                                    {(field.options || []).map((o, oi) => (
                                      <div key={oi} className="flex gap-2 min-w-0">
                                        <input className="flex-1 min-w-0 rounded-md border border-gray-300 px-2 py-1 text-sm" value={o.label} onChange={(e) => {
                                          const newOpts = [...(field.options || [])]
                                          newOpts[oi] = { ...newOpts[oi], label: e.target.value }
                                          updateFieldByName(field.name, { options: newOpts })
                                        }} />
                                        <input className="w-36 min-w-0 rounded-md border border-gray-300 px-2 py-1 text-sm" value={o.value} onChange={(e) => {
                                          const newOpts = [...(field.options || [])]
                                          newOpts[oi] = { ...newOpts[oi], value: e.target.value }
                                          updateFieldByName(field.name, { options: newOpts })
                                        }} />
                                        <Button size="sm" variant="ghost" onClick={() => {
                                          const newOpts = (field.options || []).filter((_, i) => i !== oi)
                                          updateFieldByName(field.name, { options: newOpts })
                                        }}>Eliminar</Button>
                                      </div>
                                    ))}
                                    <div className="flex gap-2 min-w-0">
                                      <input id={`new-opt-label-${idx}`} className="flex-1 min-w-0 rounded-md border border-gray-300 px-2 py-1 text-sm" placeholder="Etiqueta" />
                                      <input id={`new-opt-value-${idx}`} className="w-36 min-w-0 rounded-md border border-gray-300 px-2 py-1 text-sm" placeholder="Valor" />
                                      <Button size="sm" onClick={() => {
                                        const labelEl = document.getElementById(`new-opt-label-${idx}`) as HTMLInputElement | null
                                        const valueEl = document.getElementById(`new-opt-value-${idx}`) as HTMLInputElement | null
                                        const label = labelEl?.value || "Opción"
                                        const value = valueEl?.value || String(Date.now())
                                        const newOpts = [...(field.options || []), { label, value }]
                                        updateFieldByName(field.name, { options: newOpts })
                                        if (labelEl) labelEl.value = ""
                                        if (valueEl) valueEl.value = ""
                                      }}>Agregar</Button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <div className="flex items-center gap-3">
                    <Button onClick={save} disabled={statusType === 'saving'}>{statusType === 'saving' ? 'Guardando...' : 'Guardar'}</Button>

                    {status && (
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${statusType === 'error' ? 'bg-red-50 border border-red-200 text-red-800' : statusType === 'saving' ? 'bg-blue-50 border border-blue-200 text-blue-800' : 'bg-green-50 border border-green-200 text-green-800'}`}>
                        <span className="text-sm">
                          {statusType === 'saving' ? '⏳' : statusType === 'success' ? '✅' : '❌'}
                        </span>
                        <span className="whitespace-nowrap">{status}</span>
                        <button onClick={clearStatus} className="ml-2 text-xs underline">Cerrar</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
