"use client"

import { useForm, FieldValues } from "react-hook-form"
import Image from "next/image"

export type FieldConfig = {
  name: string
  label: string
  type: "text" | "number" | "select" | "checkbox" | "date"
  required?: boolean
  options?: { label: string; value: string }[]
}

export type FormConfig = {
  title: string
  image?: string // 👈 Bandera o icono opcional
  fields: FieldConfig[]
}

export default function FormGenerator({ config }: { config: FormConfig }) {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: FieldValues) => {
    console.log("📌 Datos enviados:", data)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Encabezado con bandera */}
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

      {/* Formulario */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {config.fields.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              {field.label}{" "}
              {field.required && <span className="text-red-500">*</span>}
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
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="text-gray-900"
                  >
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
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  )
}
