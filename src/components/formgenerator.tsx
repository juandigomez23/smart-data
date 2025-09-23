"use client"

import { useForm, FieldValues } from "react-hook-form"
import Image from "next/image"
import { useState } from "react"
import { useAsesor } from "@/hooks/useAsesor"  // 👈 importar hook

export type FieldConfig = {
  name: string
  label: string
  type: "text" | "number" | "select" | "checkbox" | "date"
  required?: boolean
  options?: { label: string; value: string }[]
}

export type FormConfig = {
  title: string
  tipo: string   // 👈 OBLIGATORIO - tipo de formulario
  image?: string // Bandera o ícono opcional
  fields: FieldConfig[]
}

export default function FormGenerator({ config }: { config: FormConfig }) {
  const { register, handleSubmit, reset } = useForm<FieldValues>()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "warning" } | null>(null)

  const { id: asesorId, nombre: asesorNombre, autenticado, cargando } = useAsesor()

  const onSubmit = async (data: Record<string, unknown>) => {
    if (!asesorId) {
      setMessage({ text: "⚠️ Debes iniciar sesión como asesor", type: "error" })
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const tipoFormulario = config.tipo || "retenciones-generico"

      console.log("📤 Enviando formulario...", {
        tipo: tipoFormulario,
        asesor: asesorId,
        datos: data,
      })

      const res = await fetch("/api/formularios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: tipoFormulario,
          asesor: asesorId, // 👈 ahora se manda el ID real del asesor
          datos: data,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || "Error del servidor")
      }

      if (json.success) {
        setMessage({ text: "✅ Formulario guardado correctamente", type: "success" })
        reset()
        console.log("🎯 Formulario guardado ID:", json.data.id)
      } else {
        throw new Error(json.error || "Error al guardar")
      }
    } catch (error) {
      console.error("❌ Error al enviar formulario:", error)
      setMessage({ 
        text: error instanceof Error ? `❌ ${error.message}` : "⚠️ Error desconocido", 
        type: "error" 
      })
    } finally {
      setLoading(false)
    }
  }

  if (cargando) {
    return <p className="text-gray-500">Cargando sesión...</p>
  }

  if (!autenticado) {
    return <p className="text-red-600">⚠️ Debes iniciar sesión para usar el formulario</p>
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Encabezado */}
      <div className="flex items-center gap-3 mb-4">
        {config.image && (
          <Image
            src={config.image}
            alt={`${config.title} bandera`}
            width={40}
            height={25}
            className="rounded-sm shadow-sm"
          />
        )}
        <h2 className="text-2xl font-bold text-gray-800">{config.title}</h2>
      </div>

      {/* Mostrar asesor activo */}
      {asesorNombre && (
        <p className="mb-4 text-sm text-gray-600">
          Sesión activa: <strong>{asesorNombre}</strong>
        </p>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {config.fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === "text" && (
              <input
                type="text"
                {...register(field.name, { required: field.required })}
                className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                placeholder={`Ingrese ${field.label}`}
              />
            )}

            {field.type === "number" && (
              <input
                type="number"
                {...register(field.name, { required: field.required })}
                className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
                placeholder={`Ingrese ${field.label}`}
              />
            )}

            {field.type === "date" && (
              <input
                type="date"
                {...register(field.name, { required: field.required })}
                className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            )}

            {field.type === "select" && (
              <select
                {...register(field.name, { required: field.required })}
                className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
              >
                <option value="">Selecciona una opción</option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-gray-900">
                    {opt.label}
                  </option>
                ))}
              </select>
            )}

            {field.type === "checkbox" && (
              <div className="flex items-center space-x-2 text-gray-900">
                <input
                  type="checkbox"
                  {...register(field.name)}
                  className="h-4 w-4"
                />
                <span>{field.label}</span>
              </div>
            )}
          </div>
        ))}

        {/* Botones */}
        <div className="flex justify-end gap-4">
          <button
            type="reset"
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>

      {/* Mensaje */}
      {message && (
        <p
          className={`mt-4 text-sm font-medium text-center ${
            message.type === "success"
              ? "text-green-600"
              : message.type === "error"
              ? "text-red-600"
              : "text-yellow-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  )
}
