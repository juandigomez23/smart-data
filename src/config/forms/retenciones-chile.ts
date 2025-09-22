import { FormConfig } from "@/components/formgenerator"

export const retencionesChile: FormConfig = {
  title: "Retenciones – Chile",
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
      name: "tipo_asignacion",
      label: "Tipo asignación",
      type: "select",
      options: [
        { label: "Terminación programada", value: "terminacion" },
        { label: "Winback", value: "winback" },
        { label: "Entrante", value: "entrante" },
        { label: "Asignado por correo", value: "correo" },
        { label: "Asignado por cartera", value: "cartera" },
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
        { label: "Inconformidad con facturas", value: "facturas" },
        { label: "Cambio de proveedor", value: "proveedor" },
        { label: "Cambio de residencia", value: "residencia" },
        { label: "Cliente fallecido", value: "fallecido" },
        { label: "No aplica", value: "na" },
      ],
    },
    {
      name: "codigo_gestion",
      label: "Código gestión",
      type: "select",
      options: [
        { label: "Retención", value: "retencion" },
        { label: "No acepta retención", value: "no_retencion" },
        { label: "Cliente ya retenido", value: "retenido" },
        { label: "Volver a llamar", value: "volver_llamar" },
        { label: "Posible fraude", value: "fraude" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Cliente fallecido", value: "fallecido" },
      ],
    },
    { name: "resumen", label: "Resumen de la gestión", type: "text", required: false },
    { name: "fecha_proxima_gestion", label: "Fecha próxima gestión", type: "date" },
  ],
}