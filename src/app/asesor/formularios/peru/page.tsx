"use client"

import FormGenerator, { FormConfig } from "@/components/formgenerator"

const config: FormConfig = {
  title: "Gestión Retenciones – Perú",
  tipo: "retenciones-peru",
  image: "/flags/pe.png",
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
      name: "tipo_asignacion",
      label: "Tipo asignación",
      type: "select",
      options: [
        { label: "Terminación programada", value: "terminacion" },
        { label: "Winback", value: "winback" },
        { label: "Entrante", value: "entrante" },
        { label: "Asignado por correo", value: "correo" },
        { label: "PQR", value: "pqr" },
      ],
    },
    {
      name: "motivo_cancelacion",
      label: "Motivo de cancelación del cliente",
      type: "select",
      options: [
        { label: "Dificultades financieras", value: "financieras" },
        { label: "Falla velocidad", value: "velocidad" },
        { label: "Cobertura", value: "cobertura" },
        { label: "Cambio de proveedor", value: "proveedor" },
        { label: "No necesita el servicio", value: "no_necesita" },
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
        { label: "Cliente ya retenido", value: "retenido" },
        { label: "Volver a llamar", value: "llamar" },
        { label: "No contesta", value: "no_contesta" },
      ],
    },
    { name: "resumen", label: "Resumen de la gestión", type: "text" },
    { name: "fecha_proxima", label: "Fecha próxima gestión", type: "date" },
  ],
}

export default function RetencionesPeruPage() {
  return <FormGenerator config={config} />
}
