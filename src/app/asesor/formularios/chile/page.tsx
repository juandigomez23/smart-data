"use client"

import FormGenerator, { FormConfig } from "@/components/formgenerator"

const config: FormConfig = {
  title: "Gestión Retenciones – Chile",
  tipo: "retenciones-chile",
  image: "/flags/cl.png",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text", required: true },
    { name: "san", label: "SAN", type: "text", required: true },
    {
      name: "medio_comunicacion",
      label: "Medio de comunicación",
      type: "select",
      options: [
        { label: "Llamada telefónica", value: "llamada" },
        { label: "Gestión WhatsApp", value: "whatsapp" },
        { label: "Gestión correo", value: "correo" },
      ],
    },
    {
      name: "motivo_cancelacion",
      label: "Motivo de cancelación del cliente",
      type: "select",
      options: [
        { label: "Inconformidad con facturas", value: "facturas" },
        { label: "Cliente fallecido", value: "fallecido" },
        { label: "Cambio de proveedor", value: "proveedor" },
        { label: "Orden público", value: "orden_publico" },
        { label: "Intermitencia servicio", value: "intermitencia" },
        { label: "No aplica", value: "na" },
      ],
    },
    {
      name: "codigo_gestion",
      label: "Código de gestión",
      type: "select",
      options: [
        { label: "Retención", value: "retencion" },
        { label: "No acepta retención", value: "no_retencion" },
        { label: "Posible retención", value: "posible" },
        { label: "Mensaje tercero", value: "mensaje_tercero" },
        { label: "Fuera de servicio", value: "fuera_servicio" },
      ],
    },
    { name: "resumen", label: "Resumen de la gestión", type: "text" },
    { name: "fecha_proxima", label: "Fecha próxima gestión", type: "date" },
  ],
}

export default function RetencionesChilePage() {
  return <FormGenerator config={config} />
}
