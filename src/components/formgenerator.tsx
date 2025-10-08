"use client"

import { useForm, FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ZodTypeAny } from "zod"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useAsesor } from "@/hooks/useAsesor"

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "number" | "select" | "checkbox" | "date" | "info" | "time";
  required?: boolean;
  options?: { label: string; value: string }[];
  showIf?: Record<string, string | number | boolean> | ((values: FieldValues) => boolean);
  auto?: boolean;
  image?: string;
  description?: string;
  multiline?: boolean;
  conditionalFields?: Array<{
    condition: { field: string; value: string };
    fields: FieldConfig[];
  }>;
}

export type FormConfig = {
  title: string;
  tipo?: string;
  image?: string;
  fields: FieldConfig[];
}

function shouldShowField(field: FieldConfig, values: FieldValues) {
  if (!field.showIf) return true
  if (typeof field.showIf === "function") return field.showIf(values)
  return Object.entries(field.showIf).every(([key, val]) => values[key] === val)
}

type FormGeneratorProps = {
  config: FormConfig;
  schema?: ZodTypeAny;
};

export default function FormGenerator({ config, schema }: FormGeneratorProps) {
  const { register, handleSubmit, reset, setValue, watch, formState } = useForm<FieldValues>({
  // Usamos 'as any' en el resolver porque el generador es dinámico y los tipos de Zod y React Hook Form no pueden coincidir perfectamente.
  // Es seguro y recomendado en este contexto para mantener flexibilidad y validación automática.
  resolver: schema ? (zodResolver(schema) as any) : undefined
  })

  // Resetear el formulario cada vez que cambia el config (nuevo formulario) o se monta el componente
  useEffect(() => {
    reset();
  }, [config, reset]);

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "warning" } | null>(null)
  const { id: asesorId, nombre: asesorNombre, email: asesorEmail, autenticado, cargando } = useAsesor()
  const values = watch()

  // Autocompletar campos con auto: true
  useEffect(() => {
    config.fields.forEach(field => {
      if (field.auto && field.name === "correo" && asesorEmail) {
        setValue(field.name, asesorEmail)
      }
    })
  }, [asesorEmail, config.fields, setValue])

  const onSubmit = async (data: Record<string, unknown>) => {
    if (!asesorId) {
      setMessage({ text: "⚠️ Debes iniciar sesión como asesor", type: "error" })
      return
    }
    setLoading(true)
    setMessage(null)
    try {
      // Detectar país desde el título del formulario
      let tipoFormulario = config.tipo || "generico";
      if (config.title) {
        if (config.title.toLowerCase().includes("colombia")) tipoFormulario = "retenciones_colombia";
        else if (config.title.toLowerCase().includes("chile")) tipoFormulario = "retenciones_chile";
        else if (config.title.toLowerCase().includes("ecuador")) tipoFormulario = "retenciones_ecuador";
        else if (config.title.toLowerCase().includes("perú") || config.title.toLowerCase().includes("peru")) tipoFormulario = "retenciones_peru";
      }
      const res = await fetch("/api/formularios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: tipoFormulario, asesor: asesorId, datos: data }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error del servidor")
      if (json.success) {
        setMessage({ text: "✅ Formulario guardado correctamente", type: "success" })
        reset()
      } else {
        throw new Error(json.error || "Error al guardar")
      }
    } catch (error) {
      setMessage({ text: error instanceof Error ? `❌ ${error.message}` : "⚠️ Error desconocido", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  if (cargando) return <p className="text-gray-500">Cargando sesión...</p>
  if (!autenticado) return <p className="text-red-600">⚠️ Debes iniciar sesión para usar el formulario</p>

  return (
  <div className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        {config.image && (
          <Image src={config.image} alt={`${config.title} bandera`} width={40} height={25} className="rounded-sm shadow-sm" />
        )}
        <h2 className="text-2xl font-bold text-gray-800">{config.title}</h2>
      </div>
      {asesorNombre && (
        <p className="mb-4 text-sm text-gray-600">Sesión activa: <strong>{asesorNombre}</strong></p>
      )}
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        {config.fields.filter(field => shouldShowField(field, values)).map((field) => (
          <div key={field.name} className="flex flex-col w-full">
            {field.name === "documento_id" && (
              <div className="relative flex flex-row items-center gap-3 p-4 mb-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-l-8 border-blue-500 text-blue-900 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                </svg>
                <span className="font-bold text-blue-700 text-lg">Digitacion de datos correctamente</span>
              </div>
            )}
            {field.name === "documento_cliente" && (
              <div className="relative flex flex-row items-center gap-3 p-4 mb-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-l-8 border-blue-500 text-blue-900 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                </svg>
                <span className="font-bold text-blue-700 text-lg">Datos del cliente</span>
              </div>
            )}
            {field.type === "info"
              ? (
                <div className="relative flex flex-row items-start gap-3 p-4 mb-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-l-8 border-blue-500 text-blue-900 rounded-xl shadow-md">
                  <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-bold text-blue-700 text-lg mb-1 whitespace-pre-line">{field.label}</span>
                    {field.description && (
                      <span className="block text-base text-blue-700 leading-relaxed mt-1">{field.description}</span>
                    )}
                  </div>
                </div>
              )
              : (
                <>
                  <label className="mb-1 font-medium text-gray-700">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.description && <p className="text-xs text-gray-500 mb-2">{field.description}</p>}
                </>
              )}
            {field.type === "text" && (
              field.multiline
                ? (<textarea {...register(field.name, { required: field.required })} rows={6} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-2xl resize-vertical" placeholder={`Ingrese ${field.label}`} />)
                : (field.name === "resumen_gestion"
                  ? (<textarea {...register(field.name, { required: field.required })} rows={5} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-2xl resize-vertical" placeholder={`Ingrese ${field.label}`} />)
                  : field.name === "correo"
                    ? (<input type="text" {...register(field.name, { required: field.required })} className="border p-2 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed w-full max-w-lg" placeholder={`Ingrese ${field.label}`} readOnly />)
                    : field.name === "san"
                      ? (<>
                          {/** Determinar país seleccionado */}
                          {(() => {
                            const pais = values.pais;
                            let prefix = "";
                            let ejemplo = "SAN";
                            if (pais === "colombia") {
                              prefix = "HCO";
                              ejemplo = "HCO2000126867";
                            } else if (pais === "chile") {
                              prefix = "HCL";
                              ejemplo = "HCL2000751067";
                            } else if (pais === "ecuador") {
                              prefix = "HEC";
                              ejemplo = "HEC2000756147";
                            } else if (pais === "peru" || pais === "perú") {
                              prefix = "HPE";
                              ejemplo = "HPE2000756297";
                            }
                            return (
                              <>
                                <input type="text"
                                  {...register(field.name, {
                                    required: field.required,
                                    validate: value => {
                                      if (!prefix) return true;
                                      if (!value) return true;
                                      return value.startsWith(prefix) || `El SAN debe iniciar con ${prefix}`;
                                    }
                                  })}
                                  className={`border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-lg ${formState.errors.san ? 'border-red-500' : ''}`}
                                  placeholder={`Ejemplo: ${ejemplo}`}
                                />
                                {formState.errors.san && (
                                  <span className="text-red-600 text-xs mt-1">{formState.errors.san.message as string}</span>
                                )}
                              </>
                            );
                          })()}
                        </>
                      )
                      : (<input type="text" {...register(field.name, { required: field.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-lg" placeholder={`Ingrese ${field.label}`} />)
                )
            )}
            {field.type === "time" && (
              <input type="time" {...register(field.name, { required: field.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 w-full max-w-md" step="60" />
            )}
            {field.type === "number" && (
              <input type="number" {...register(field.name, { required: field.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-md" placeholder={`Ingrese ${field.label}`} />
            )}
            {field.type === "date" && (
              <input type="date" {...register(field.name, { required: field.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 w-full max-w-md" />
            )}
            {field.type === "select" && field.options && field.name === "master_dealer" ? (
              <select defaultValue="" {...register(field.name, { required: field.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 w-full max-w-md">
                <option value="" disabled hidden>(Seleccione una opción)</option>
                {(() => {
                  const pais = values.pais;
                  let options = [];
                  if (pais === "chile") {
                    options = [
                      { label: "ANavarrete Dealer MD", value: "anavarrete" },
                      { label: "HCL-CSepulveda MD Dealer", value: "hcl_csepulveda" },
                      { label: "HCL-FORTEL CL", value: "hcl_fortel" },
                      { label: "HCL-JMaraboli MD Dealer", value: "hcl_jmaraboli" },
                      { label: "HCL-INECOM Dealer MD", value: "hcl_inecom" },
                      { label: "HCL-IUrrea Dealer MD", value: "hcl_iurrea" },
                      { label: "HCL-Mjara Dealer MD", value: "hcl_mjara" },
                      { label: "HCL-M&G Telecom Dealer MD", value: "hcl_mg" },
                      { label: "HCL-RccGroup MD Dealer", value: "hcl_rcc" },
                      { label: "HCL-JRiquelme Dealer MD", value: "hcl_jriquelme" }
                    ];
                  } else if (pais === "colombia") {
                    options = [
                      { label: "HCO - A1 Gaviota Propio", value: "hco_a1gaviota" },
                      { label: "HCO - Cosering Dealer MD", value: "hco_cosering" },
                      { label: "HCO - FORTEL CO", value: "hco_fortel" },
                      { label: "HCO - S&M Dealer MD", value: "hco_sm" },
                      { label: "HCO - Speedmovil Dealer MD", value: "hco_speedmovil" },
                      { label: "HCO - TP Call Col", value: "hco_tpcall" }
                    ];
                  } else if (pais === "peru" || pais === "perú") {
                    options = [
                      { label: "HPE - Adsystel Pyme Retail Dealer", value: "hpe_adsystel" },
                      { label: "HPE - CC Fortel", value: "hpe_ccfortel" },
                      { label: "HPE - J&C Soluciones Dealer Norte", value: "hpe_jcsoluciones" },
                      { label: "HPE - Grupo Ham & Ma Dealer", value: "hpe_grupoham" },
                      { label: "HPE - Midmarket", value: "hpe_midmarket" },
                      { label: "HPE - SATELITAL Dealer MD", value: "hpe_satelital" },
                      { label: "HPE - SICOM Dealer MD", value: "hpe_sicom" },
                      { label: "HPE - STOF Dealer", value: "hpe_stof" }
                    ];
                  } else if (pais === "ecuador") {
                    options = [
                      { label: "ECU TP CALL", value: "ecu_tpcall" },
                      { label: "S&M ECUADOR VENTAS", value: "sm_ecuador" },
                      { label: "HEC - FORTEL EC", value: "hec_fortel" }
                    ];
                  } else {
                    options = field.options;
                  }
                  return options.map(opt => (
                    <option key={opt.value} value={opt.value} className="text-gray-900">{opt.label}</option>
                  ));
                })()}
              </select>
            ) : field.type === "select" && field.options ? (
              <select defaultValue="" {...register(field.name, { required: field.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 w-full max-w-md">
                <option value="" disabled hidden>(Seleccione una opción)</option>
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value} className="text-gray-900">{opt.label}</option>
                ))}
              </select>
            ) : null}
            {field.type === "checkbox" && (
              <div className="flex items-center space-x-2 text-gray-900">
                <input type="checkbox" {...register(field.name)} className="h-4 w-4" />
                <span>{field.label}</span>
                <span className="ml-2 text-gray-400 text-xs">(Seleccione una opción)</span>
              </div>
            )}
            {field.type !== "info" && formState.errors[field.name] && (
              <span className="text-red-600 text-xs mt-1">campo obligatorio</span>
            )}

            {/* Renderizar campos condicionales si existen y la condición se cumple, de forma recursiva */}
            {field.conditionalFields && field.conditionalFields.map((cond) => (
              values[field.name] === cond.condition.value && (
                <div key={cond.condition.value} className="flex flex-col ml-4 p-3 rounded-md border-l-4 border-blue-400 bg-white shadow-sm">
                  {/* Mostrar aviso solo si la opción es retención */}
                  {cond.condition.value === "retencion" && (
                    <div className="flex items-center mb-2">
                      <svg className="w-5 h-5 text-blue-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" /></svg>
                      <span className="text-blue-600 text-base font-semibold">Si cliente acepta retención</span>
                    </div>
                  )}
                  {cond.fields.map(subField => (
                    shouldShowField(subField, values) && (
                      <div key={subField.name} className="flex flex-col w-full mb-6">
                        {subField.type === "info"
                          ? (
                            <div className="relative flex flex-col gap-2 p-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-l-8 border-blue-500 text-blue-900 rounded-xl mb-5 shadow-md">
                              <span className="font-bold text-lg tracking-wide mb-1">{subField.label}</span>
                              {subField.description && (
                                <span className="block text-base text-blue-700 leading-relaxed pl-2 border-l-2 border-blue-300 bg-blue-50 rounded-md py-2">{subField.description}</span>
                              )}
                            </div>
                          )
                          : (
                            <>
                              <label className="mb-1 font-medium text-gray-700">
                                {subField.label} {subField.required && <span className="text-red-500">*</span>}
                              </label>
                              {subField.description && <p className="text-xs text-gray-500 mb-2">{subField.description}</p>}
                            </>
                          )}
                        {subField.type === "text" && (
                          (subField.name === "resumen_gestion"
                            ? (<textarea {...register(subField.name, { required: subField.required })} rows={5} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-2xl resize-vertical" placeholder={`Ingrese ${subField.label}`} />)
                            : (<input type="text" {...register(subField.name, { required: subField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-lg" placeholder={`Ingrese ${subField.label}`} />)
                          )
                        )}
                        {subField.type === "number" && (
                          <input type="number" {...register(subField.name, { required: subField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-md" placeholder={`Ingrese ${subField.label}`} />
                        )}
                        {subField.type === "date" && (
                          <input type="date" {...register(subField.name, { required: subField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 w-full max-w-md" />
                        )}
                        {subField.type === "select" && subField.options && (
                          <select defaultValue="" {...register(subField.name, { required: subField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 w-full max-w-md">
                            <option value="" disabled hidden>(Seleccione una opción)</option>
                            {subField.options.map(opt => (
                              <option key={opt.value} value={opt.value} className="text-gray-900">{opt.label}</option>
                            ))}
                          </select>
                        )}
                        {subField.type === "checkbox" && (
                          <div className="flex items-center space-x-2 text-gray-900">
                            <input type="checkbox" {...register(subField.name)} className="h-4 w-4" />
                            <span>{subField.label}</span>
                          </div>
                        )}
                        {/* Renderizar condicionales anidados recursivamente */}
                        {subField.conditionalFields && subField.conditionalFields.map((nestedCond) => (
                          values[subField.name] === nestedCond.condition.value && (
                            <div key={nestedCond.condition.value} className="flex flex-col ml-4 p-3 rounded-md border-l-4 border-blue-300 bg-blue-50 shadow-sm">
                              {nestedCond.fields.map(nestedField => (
                                shouldShowField(nestedField, values) && (
                                  <div key={nestedField.name} className="flex flex-col w-full mb-4">
                                    {nestedField.type === "info"
                                      ? (
                                        <div className="relative flex flex-col gap-2 p-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-l-8 border-blue-500 text-blue-900 rounded-xl mb-5 shadow-md">
                                          <span className="font-bold text-lg tracking-wide mb-1">{nestedField.label}</span>
                                          {nestedField.description && (
                                            <span className="block text-base text-blue-700 leading-relaxed pl-2 border-l-2 border-blue-300 bg-blue-50 rounded-md py-2">{nestedField.description}</span>
                                          )}
                                        </div>
                                      )
                                      : (
                                        <>
                                          <label className="mb-1 font-medium text-gray-700">
                                            {nestedField.label} {nestedField.required && <span className="text-red-500">*</span>}
                                          </label>
                                          {nestedField.description && <p className="text-xs text-gray-500 mb-2">{nestedField.description}</p>}
                                        </>
                                      )}
                                    {nestedField.type === "text" && (
                                      <input type="text" {...register(nestedField.name, { required: nestedField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-lg" placeholder={`Ingrese ${nestedField.label}`} />
                                    )}
                                    {nestedField.type === "number" && (
                                      <input type="number" {...register(nestedField.name, { required: nestedField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-md" placeholder={`Ingrese ${nestedField.label}`} />
                                    )}
                                    {nestedField.type === "date" && (
                                      <input type="date" {...register(nestedField.name, { required: nestedField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 w-full max-w-md" />
                                    )}
                                    {nestedField.type === "select" && nestedField.options && (
                                      <select defaultValue="" {...register(nestedField.name, { required: nestedField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 w-full max-w-md">
                                        <option value="" disabled hidden>(Seleccione una opción)</option>
                                        {nestedField.options.map(opt => (
                                          <option key={opt.value} value={opt.value} className="text-gray-900">{opt.label}</option>
                                        ))}
                                      </select>
                                    )}
                                    {nestedField.type === "checkbox" && (
                                      <div className="flex items-center space-x-2 text-gray-900">
                                        <input type="checkbox" {...register(nestedField.name)} className="h-4 w-4" />
                                        <span>{nestedField.label}</span>
                                      </div>
                                    )}
                                  </div>
                                )
                              ))}
                            </div>
                          )
                        ))}
                      </div>
                    )
                  ))}
                </div>
              )
            ))}
          </div>
        ))}
        <div className="flex justify-end gap-4">
          <button type="reset" className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800" disabled={loading}>Cancelar</button>
          <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>{loading ? "Guardando..." : "Guardar"}</button>
        </div>
      </form>
      {message && (
        <p className={`mt-4 text-sm font-medium text-center ${message.type === "success" ? "text-green-600" : message.type === "error" ? "text-red-600" : "text-yellow-600"}`}>{message.text}</p>
      )}
    </div>
  )
}
