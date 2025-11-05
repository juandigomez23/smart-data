"use client"

import { useForm, FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {ZodTypeAny} from "zod"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { useAsesor } from "@/hooks/useAsesor"

export interface FieldConfig {
  name: string;
  label: string | ((args: { values: FieldValues }) => string);
  type: "text" | "number" | "select" | "checkbox" | "date" | "info" | "time";
  required?: boolean;
  options?: { label: string; value: string }[];
  
  defaultValue?: string;
  showIf?: Record<string, string | number | boolean> | ((values: FieldValues) => boolean);
  auto?: boolean;
  image?: string;
  description?: string;
  multiline?: boolean;
  conditionalFields?: Array<{
    condition: { field: string; value: string };
    fields: FieldConfig[];
    readonly?: boolean;
  }>;
  validate?: (args: { values: unknown, value: unknown }) => true | string;
  
  inferFromSan?: boolean;
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
  function getVisibleFieldNames(fields: FieldConfig[], values: FieldValues): string[] {
    let result: string[] = [];
    for (const field of fields) {
      if (shouldShowField(field, values)) {
        result.push(field.name);
        if (field.conditionalFields) {
          for (const cond of field.conditionalFields) {
            if (values[field.name] === cond.condition.value) {
              result = result.concat(getVisibleFieldNames(cond.fields, values));
            }
          }
        }
      }
    }
    return result;
  }

  
  const wrappedResolver = schema
    ? async (values: FieldValues, context: unknown, options: unknown) => {
       
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const base = await (zodResolver(schema as any) as any)(values, context, options)
        
        const visible = new Set(getVisibleFieldNames(config.fields, values))
        
        const filteredErrors: Record<string, unknown> = {}
        if (base && base.errors) {
          for (const key of Object.keys(base.errors)) {
            if (visible.has(key)) filteredErrors[key] = (base.errors as Record<string, unknown>)[key]
          }
        }
        return { values: base.values, errors: filteredErrors }
      }
    : undefined

  const { register, handleSubmit, reset, setValue, watch, getValues, formState, trigger } = useForm<FieldValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: wrappedResolver as any,
    mode: "onChange"
  })

  
  useEffect(() => {
    reset();
  }, [config, reset]);

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "warning" } | null>(null)
  const { id: asesorId, nombre: asesorNombre, email: asesorEmail, autenticado, cargando } = useAsesor()
  const values = watch()


 
  const [horaLocal, setHoraLocal] = useState("");

useEffect(() => {
  const ahora = new Date();
  const offset = ahora.getTimezoneOffset() * 60000; // diferencia con UTC
  const local = new Date(ahora.getTime() - offset);
  const localISOTime = local.toISOString().slice(11, 16); // formato HH:mm
  setHoraLocal(localISOTime);

  // si usas react-hook-form:
  if (setValue) {
    setValue("hora_inicio_gestion", localISOTime);
  }
}, [setValue]);





  useEffect(() => {
    if (!message) return
    
    if (message.type !== "success") return
    const t = setTimeout(() => setMessage(null), 3000)
    return () => clearTimeout(t)
  }, [message])

  
  useEffect(() => {
   
    try {
      const correoActual = getValues("correo");
     
      config.fields.forEach(field => {
        if (field.auto && field.name === "correo" && (correoActual || asesorEmail)) {
          setValue(field.name, correoActual || asesorEmail);
        }
        
        const maybeDefault = (field as FieldConfig & { defaultValue?: string }).defaultValue;
        if (maybeDefault) {
          const cur = getValues(field.name);
          if (!cur || cur === "") {
            setValue(field.name, maybeDefault);
          }
        }
      });
    } catch {
      
    }
  }, [asesorEmail, config.fields, setValue, getValues]);

  
  const lastInferredPaisRef = useRef<string | null>(null);

  
  useEffect(() => {
    try {
  const sanField = config.fields.find(f => f.inferFromSan);
      if (!sanField) return;
      const sanName = sanField.name;
      const sanVal = getValues(sanName) as string | undefined;
      if (!sanVal || typeof sanVal !== 'string') return;

      const s = sanVal.trim().toUpperCase();
      let inferred: string | undefined;
      if (s.startsWith('HCL')) inferred = 'chile';
      else if (s.startsWith('HCO')) inferred = 'colombia';
      else if (s.startsWith('HEC')) inferred = 'ecuador';
      else if (s.startsWith('HPE')) inferred = 'peru';

      if (!inferred) return;

      const currentPais = getValues('pais') as string | undefined;
      
      if (currentPais && currentPais !== '' && lastInferredPaisRef.current && currentPais !== lastInferredPaisRef.current) {
        return;
      }

      if (currentPais !== inferred) {
        setValue('pais', inferred);
        lastInferredPaisRef.current = inferred;
      }
    } catch {
      // ignore
    }
  }, [values.san, config.fields, getValues, setValue]);

  
  function getVisibleRequiredFields(fields: FieldConfig[], values: FieldValues): FieldConfig[] {
    let result: FieldConfig[] = [];
    for (const field of fields) {
      if (shouldShowField(field, values)) {
        
        const isRequired = field.type !== "info" && (field.required || (config.tipo === "welcome"));
        if (isRequired) result.push(field);
        
        if (field.conditionalFields) {
          for (const cond of field.conditionalFields) {
            if (values[field.name] === cond.condition.value) {
              result = result.concat(getVisibleRequiredFields(cond.fields, values));
            }
          }
        }
      }
    }
    return result;
  }

  const onSubmit: import("react-hook-form").SubmitHandler<Record<string, unknown>> = async (data) => {
    if (!asesorId) {
      setMessage({ text: "Debes iniciar sesión como asesor", type: "error" })
      return
    }

    
  const allValues = getValues();

  const visibleRequiredFields = getVisibleRequiredFields(config.fields, allValues);
  const requiredVisibleFieldNames = visibleRequiredFields.map(f => f.name);

  const valid = await trigger(requiredVisibleFieldNames);
    if (!valid) {
     
      const errorKeys = Object.keys(formState.errors || {});
      const missing = requiredVisibleFieldNames.filter(name => errorKeys.includes(name) || !(data[name] && data[name] !== ""));
      const missingLabels = visibleRequiredFields
        .filter(f => missing.includes(f.name))
        .map(f => (typeof f.label === "function" ? f.label({ values: data as FieldValues }) : f.label));

      const msg = missingLabels.length > 0
        ? `Completa los campos obligatorios: ${missingLabels.join(", ")}`
        : "Completa los campos obligatorios visibles";

      setMessage({ text: msg, type: "error" });

      
      try {
        const first = missing[0];
        if (first) {
          const el = document.querySelector(`[name="${first}"]`) as HTMLElement | null;
          if (el && typeof el.focus === "function") {
            el.focus();
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      } catch {
       
      }

      return;
    }

    
 
    const filteredDatos: Record<string, unknown> = {};

    const usedLabels = new Set<string>();

    function makeLabelKey(field: FieldConfig) {
      const rawLabel = typeof field.label === 'function' ? String(field.label({ values: allValues })) : String(field.label);
      let key = rawLabel || field.name;
      if (usedLabels.has(key)) {
        // ensure uniqueness
        key = `${key}__${field.name}`;
      }
      usedLabels.add(key);
      return key;
    }

    function collectFields(fields: FieldConfig[]) {
      for (const field of fields) {
        if (!shouldShowField(field, allValues)) continue;

        const labelKey = makeLabelKey(field);

        if (field.type === "checkbox") {
          const v = allValues[field.name] as unknown;

          let selectedLabels: string[] = []

          
          if (Array.isArray(v)) {
            selectedLabels = v.map(val => String(val)).map(val => {
              const optLabel = field.options?.find(o => o.value === val)?.label
              return optLabel ?? val
            })
          }

         
          else if (v && typeof v === 'object') {
            selectedLabels = Object.entries(v as Record<string, unknown>)
              .filter(([, val]) => val === true || String(val) === "true")
              .map(([key]) => {
                const optLabel = field.options?.find(o => o.value === key)?.label
                if (optLabel) return optLabel
                return key
              })
          }

         
          else if (typeof v === 'boolean') {
            if (v) {
              
              if (field.options && field.options.length === 1) selectedLabels = [field.options[0].label]
              else selectedLabels = [typeof field.label === 'function' ? String(field.label({ values: allValues })) : String(field.label)]
            }
          }

          if (selectedLabels.length) filteredDatos[labelKey] = selectedLabels
        } else {
          const v = allValues[field.name];
          if (v !== undefined && v !== null && v !== "") {
            if (field.type === "select") {
              
              let label: string | undefined;
             
              label = field.options?.find(o => o.value === String(v))?.label;
              if (!label) {
                
                try {
                  const sel = document.querySelector(`[name="${field.name}"]`) as HTMLSelectElement | null;
                  const optEl = sel?.querySelector(`option[value="${String(v)}"]`) as HTMLOptionElement | null;
                  label = optEl?.textContent?.trim() || undefined;
                } catch {
                 
                }
              }
              filteredDatos[labelKey] = label ?? v;
            } else {
              filteredDatos[labelKey] = v as unknown;
            }
          }
        }

        
        if (field.conditionalFields) {
          for (const cond of field.conditionalFields) {
            if (allValues[field.name] === cond.condition.value) {
              collectFields(cond.fields);
            }
          }
        }
      }
    }

    collectFields(config.fields);

    setLoading(true)
    setMessage(null)
    try {
      let tipoFormulario = config.tipo || "generico";
      if (config.title) {
        if (config.title.toLowerCase().includes("colombia")) tipoFormulario = "retenciones_colombia";
        else if (config.title.toLowerCase().includes("chile")) tipoFormulario = "retenciones_chile";
        else if (config.title.toLowerCase().includes("ecuador")) tipoFormulario = "retenciones_ecuador";
        else if (config.title.toLowerCase().includes("perú") || config.title.toLowerCase().includes("peru")) tipoFormulario = "retenciones_peru";
      }

     
      try {
        if (process.env.NODE_ENV === 'development') {
          console.info("[FormGenerator] Enviando formulario", { tipo: tipoFormulario, datos: filteredDatos, raw: getValues() });
        }
      } catch {
       
      }

      const res = await fetch("/api/formularios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: tipoFormulario, asesor: asesorId, datos: filteredDatos }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Error del servidor")
      if (json.success) {
        setMessage({ text: "✅ Formulario guardado correctamente", type: "success" })
        const correoActual = data.correo as string;
        reset();

        
        config.fields.forEach(field => {
          if (field.auto && field.name === "correo" && (correoActual || asesorEmail)) {
            setValue(field.name, correoActual || asesorEmail);
          }
        });
      } else {
        throw new Error(json.error || "Error al guardar")
      }
    } catch (error) {
      setMessage({ text: error instanceof Error ? `❌ ${error.message}` : "Error desconocido", type: "error" })
    } finally {
      setLoading(false)
    }
  }

  if (cargando) return <p className="text-gray-500">Cargando sesión...</p>
  if (!autenticado) return <p className="text-red-600">Debes iniciar sesión para usar el formulario</p>

  return (
    <div className="min-h-screen py-12 px-2 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl border border-blue-200 p-10">
    <div className="flex flex-col items-center mb-6">
      <div className="mb-4">
        {/* Simple black logo (no extra container) - uses the PNG as a mask so we don't need a separate asset */}
        <div
          role="img"
          aria-label="Logo Bambubpo"
          className="mx-auto"
          style={{
            width: 120,
            height: 40,
            backgroundColor: '#000',
            WebkitMaskImage: 'url(/bambubpo.png)',
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskImage: 'url(/bambubpo.png)',
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
          }}
        />
        <span className="sr-only">Bambubpo</span>
      </div>
      <div className="flex items-center gap-3">
        {config.image && (
          <span className="inline-block bg-neutral-200 rounded-full p-2 shadow-sm">
            <Image src={config.image} alt={`${config.title} bandera`} width={40} height={25} className="rounded-md" />
          </span>
        )}
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" /></svg>
          {config.title}
        </h2>
      </div>
    </div>
        {asesorNombre && (
          <div className="mb-4 flex items-center gap-2 bg-neutral-50 rounded-lg px-3 py-1.5 text-gray-700 text-xs font-medium shadow-sm">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" /></svg>
            Sesión activa: <strong>{asesorNombre}</strong>
          </div>
        )}
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          {config.fields.filter(field => shouldShowField(field, values)).map((field) => (
          <div key={field.name} className="flex flex-col w-full">
            {field.name === "documento_de_id" && (
              <div className="relative flex flex-row items-center gap-3 p-4 mb-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-l-8 border-blue-500 text-blue-900 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                </svg>
                <span className="font-bold text-blue-700 text-lg">Digitacion de datos correctamente</span>
              </div>
            )}
             {field.name === "telefono" && (
              <div className="relative flex flex-row items-center gap-3 p-4 mb-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-l-8 border-blue-500 text-blue-900 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                </svg>
                <span className="font-bold text-blue-700 text-lg">Si es una PYME no se exige más de una linea de contacto</span>
              </div>
            )}
            {field.name === "codigo_gestion" && (
              <div className="relative flex flex-row items-center gap-3 p-4 mb-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-l-8 border-blue-500 text-blue-900 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                </svg>
                <span className="font-bold text-blue-700 text-lg">Cierre de gestión</span>
              </div>
            )}
            {field.name === "estado_servicio_pyme" && (
              <div className="relative flex flex-row items-center gap-3 p-4 mb-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-l-8 border-blue-500 text-blue-900 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                </svg>
                <span className="font-bold text-blue-700 text-lg">Resultado de Auditoria</span>
              </div>
            )}
             {field.name === "estado_servicio" && (
              <div className="relative flex flex-row items-center gap-3 p-4 mb-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-l-8 border-blue-500 text-blue-900 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                </svg>
                <span className="font-bold text-blue-700 text-lg">Resultado de Auditoria</span>
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
            {field.type === "info" ? (
              <div className="relative flex flex-row items-start gap-3 p-4 mb-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-l-8 border-blue-500 text-blue-900 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-bold text-blue-700 text-lg mb-1 whitespace-pre-line">{typeof field.label === "function" ? field.label({ values }) : field.label}</span>
                  {field.description && (
                    <span className="block text-base text-blue-700 leading-relaxed mt-1">{field.description}</span>
                  )}
                </div>
              </div>
            ) : (
              
              field.type === "checkbox" ? (
                <>
                  {field.description && <p className="text-xs text-gray-500 mb-2">{field.description}</p>}
                </>
              ) : (
                <>
                  <label className="mb-1 font-medium text-gray-700">
                    {typeof field.label === "function" ? field.label({ values }) : field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.description && <p className="text-xs text-gray-500 mb-2">{field.description}</p>}
                </>
              )
            )}
            {field.type === "text" && (
              field.multiline
                ? (<textarea {...register(field.name, { required: shouldShowField(field, values) && field.required })} rows={6} className="border p-4 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-2xl resize-vertical" placeholder={`Ingrese ${field.label}`} />)
                : (field.name === "resumen_gestion"
                  ? (<textarea {...register(field.name, { required: shouldShowField(field, values) && field.required })} rows={5} className="border p-4 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-2xl resize-vertical" placeholder={`Ingrese ${field.label}`} />)
                  : field.name === "correo"
                    ? (<input type="text" {...register(field.name, { required: shouldShowField(field, values) && field.required })} className="border p-3 rounded-xl bg-gray-100 text-gray-500 cursor-not-allowed w-full max-w-xl" placeholder={`Ingrese ${field.label}`} readOnly />)
                    : field.name === "san"
                      ? (<>
                          <input
                            type="text"
                            {...register(field.name, {
                              required: shouldShowField(field, values) && field.required,
                              validate: value => {
                                if (typeof field.validate === "function") {
                                  return field.validate({ values, value });
                                }
                                return true;
                              }
                            })}
                            className={`border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-xl ${formState.errors.san ? 'border-red-500' : ''}`}
                            placeholder={typeof field.label === "function" ? field.label({ values }) : "Ingrese SAN"}
                          />
                          {formState.errors.san && (
                            <span className="text-red-600 text-xs mt-1">{formState.errors.san.message as string}</span>
                          )}
                        </>
                      )
                      : (<input type="text" {...register(field.name, { required: shouldShowField(field, values) && field.required })} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-xl" placeholder={`Ingrese ${field.label}`} />)
                )
            )}



         {field.type === "time" && (
              <input
                type="time"
                {...register(field.name, {
                  required: shouldShowField(field, values) && field.required,
                })}
                value={
                  field.name === "hora_inicio_gestion"
                    ? horaLocal // usamos la hora local calculada
                    : watch(field.name)
                }
                readOnly={field.name === "hora_inicio_gestion"}
                onChange={(e) => {
                  if (field.name !== "hora_inicio_gestion") {
                    setValue(field.name, e.target.value);
                  }
                }}
                className={`border p-3 rounded-xl text-gray-900 placeholder-gray-400 w-full max-w-xl ${
                  field.name === "hora_inicio_gestion"
                    ? "bg-gray-200 cursor-not-allowed"
                    : "focus:ring-2 focus:ring-blue-500"
                }`}
              />
            )}





            {field.type === "number" && (
              <input type="number" {...register(field.name, { required: shouldShowField(field, values) && field.required })} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-md" placeholder={`Ingrese ${field.label}`} />
            )}
            {field.type === "date" && (
              <input type="date" {...register(field.name, { required: shouldShowField(field, values) && field.required })} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 w-full max-w-md" />
            )}
            {field.type === "select" && field.options && field.name === "master_dealer" ? (
              <select defaultValue="" {...register(field.name, { required: shouldShowField(field, values) && field.required })} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 w-full max-w-md">
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
              <select defaultValue="" {...register(field.name, { required: shouldShowField(field, values) && field.required })} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 w-full max-w-md">
                <option value="" disabled hidden>(Seleccione una opción)</option>
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value} className="text-gray-900">{opt.label}</option>
                ))}
              </select>
            ) : null}
        

                {field.type === "checkbox" && (
                  <div className="space-y-2 text-gray-900">
                    <p className="font-medium">
                      {typeof field.label === "function" ? field.label({ values }) : field.label}
                    </p>

                    {field.options?.map((option, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={option.value}
                          {...register(field.name)}
                          className="h-4 w-4 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                        <span>{option.label}</span>
                      </div>
                    ))}
                  </div>
                )}



            {field.type !== "info" && formState.errors[field.name] && field.name !== "san" && (
              <span className="text-red-600 text-xs mt-1">campo obligatorio</span>
            )}

           
            {field.conditionalFields && field.conditionalFields.map((cond) => (
              values[field.name] === cond.condition.value && (
                <div key={cond.condition.value} className="flex flex-col ml-4 p-3 rounded-md border-l-4 border-blue-400 bg-white shadow-sm">
                  
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
                              <span className="font-bold text-lg tracking-wide mb-1">{typeof subField.label === "function" ? subField.label({ values }) : subField.label}</span>
                              {subField.description && (
                                <span className="block text-base text-blue-700 leading-relaxed pl-2 border-l-2 border-blue-300 bg-blue-50 rounded-md py-2">{subField.description}</span>
                              )}
                            </div>
                          )
                          : (
                            <>
                              <label className="mb-1 font-medium text-gray-700">
                                {typeof subField.label === "function" ? subField.label({ values }) : subField.label} {subField.required && <span className="text-red-500">*</span>}
                              </label>
                              {subField.description && <p className="text-xs text-gray-500 mb-2">{subField.description}</p>}
                            </>
                          )}
                        {subField.type === "text" && (
                          (subField.name === "resumen_gestion"
                            ? (<textarea {...register(subField.name, { required: shouldShowField(subField, values) && subField.required })} rows={5} className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-2xl resize-vertical" placeholder={`Ingrese ${subField.label}`} />)
                            : (<input type="text" {...register(subField.name, { required: shouldShowField(subField, values) && subField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-lg" placeholder={`Ingrese ${subField.label}`} />)
                          )
                        )}
                        {subField.type === "number" && (
                          <input type="number" {...register(subField.name, { required: shouldShowField(subField, values) && subField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-md" placeholder={`Ingrese ${subField.label}`} />
                        )}
                        {subField.type === "date" && (
                          <input type="date" {...register(subField.name, { required: shouldShowField(subField, values) && subField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 w-full max-w-md" />
                        )}
                        {subField.type === "select" && subField.options && (
                          <select defaultValue="" {...register(subField.name, { required: shouldShowField(subField, values) && subField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 w-full max-w-md">
                            <option value="" disabled hidden>(Seleccione una opción)</option>
                            {subField.options.map(opt => (
                              <option key={opt.value} value={opt.value} className="text-gray-900">{opt.label}</option>
                            ))}
                          </select>
                        )}
                        {subField.type === "checkbox" && (
                          <div className="flex items-center space-x-2 text-gray-900">
                            <input type="checkbox" {...register(subField.name)} className="h-4 w-4" />
                            <span>{typeof subField.label === "function" ? subField.label({ values }) : subField.label}</span>
                          </div>
                        )}
                        
                        {subField.conditionalFields && subField.conditionalFields.map((nestedCond) => (
                          values[subField.name] === nestedCond.condition.value && (
                            <div key={nestedCond.condition.value} className="flex flex-col ml-4 p-3 rounded-md border-l-4 border-blue-300 bg-blue-50 shadow-sm">
                              {nestedCond.fields.map(nestedField => (
                                shouldShowField(nestedField, values) && (
                                  <div key={nestedField.name} className="flex flex-col w-full mb-4">
                                    {nestedField.type === "info"
                                      ? (
                                        <div className="relative flex flex-col gap-2 p-4 bg-gradient-to-r from-blue-100 via-blue-50 to-blue-100 border-l-8 border-blue-500 text-blue-900 rounded-xl mb-5 shadow-md">
                                          <span className="font-bold text-lg tracking-wide mb-1">{typeof nestedField.label === "function" ? nestedField.label({ values }) : nestedField.label}</span>
                                          {nestedField.description && (
                                            <span className="block text-base text-blue-700 leading-relaxed pl-2 border-l-2 border-blue-300 bg-blue-50 rounded-md py-2">{nestedField.description}</span>
                                          )}
                                        </div>
                                      )
                                      : (
                                        <>
                                          <label className="mb-1 font-medium text-gray-700">
                                            {typeof nestedField.label === "function" ? nestedField.label({ values }) : nestedField.label} {nestedField.required && <span className="text-red-500">*</span>}
                                          </label>
                                          {nestedField.description && <p className="text-xs text-gray-500 mb-2">{nestedField.description}</p>}
                                        </>
                                      )}
                                    {nestedField.type === "text" && (
                                      <input type="text" {...register(nestedField.name, { required: shouldShowField(nestedField, values) && nestedField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-lg" placeholder={`Ingrese ${nestedField.label}`} />
                                    )}
                                    {nestedField.type === "number" && (
                                      <input type="number" {...register(nestedField.name, { required: shouldShowField(nestedField, values) && nestedField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 w-full max-w-md" placeholder={`Ingrese ${nestedField.label}`} />
                                    )}
                                    {nestedField.type === "date" && (
                                      <input type="date" {...register(nestedField.name, { required: shouldShowField(nestedField, values) && nestedField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 w-full max-w-md" />
                                    )}
                                    {nestedField.type === "select" && nestedField.options && (
                                      <select defaultValue="" {...register(nestedField.name, { required: shouldShowField(nestedField, values) && nestedField.required })} className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 w-full max-w-md">
                                        <option value="" disabled hidden>(Seleccione una opción)</option>
                                        {nestedField.options.map(opt => (
                                          <option key={opt.value} value={opt.value} className="text-gray-900">{opt.label}</option>
                                        ))}
                                      </select>
                                    )}
                                    {nestedField.type === "checkbox" && (
                                      <div className="flex items-center space-x-2 text-gray-900">
                                        <input type="checkbox" {...register(nestedField.name)} className="h-4 w-4" />
                                        <span>{typeof nestedField.label === "function" ? nestedField.label({ values }) : nestedField.label}</span>
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
        <button
            type="submit"
            className={`mt-6 w-full py-2.5 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow transition`}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar formulario"}
          </button>
      </form>
      {message && (
        <div className={`mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-center shadow-lg
          ${message.type === "success" ? "bg-green-50 text-green-700" : message.type === "error" ? "bg-red-50 text-red-700" : "bg-yellow-50 text-yellow-700"}`}
        >
          {message.type === "success" && (
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          )}
          {message.type === "error" && (
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          )}
          {message.type === "warning" && (
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" /></svg>
          )}
          <span>{message.text}</span>
        </div>
      )}
      </div>
    </div>
  )
}
