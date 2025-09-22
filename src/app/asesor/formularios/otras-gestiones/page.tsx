"use client"

import FormGenerator, { FormConfig } from "@/components/formgenerator"

const config: FormConfig = {
  title: "Otras Gestiones",
  tipo: "otras-gestiones",
  image: "/icons/otros.png",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text" },
    { name: "hora_inicio", label: "Hora inicio de gestión", type: "text" },
    {
      name: "pais",
      label: "País",
      type: "select",
      options: [
        { label: "Colombia", value: "colombia" },
        { label: "Chile", value: "chile" },
        { label: "Ecuador", value: "ecuador" },
        { label: "Perú", value: "peru" },
      ],
    },
    { name: "san", label: "SAN / Cédula / NIT", type: "text" },
    {
      name: "tipo_gestion",
      label: "Tipo de gestión",
      type: "select",
      options: [
        { label: "Actualización de datos", value: "actualizacion" },
        { label: "Auditoría de llamadas", value: "auditoria" },
        { label: "Campaña comercial", value: "comercial" },
        { label: "Debito automático/PAT", value: "pat" },
      ],
    },
    { name: "observacion", label: "Observación", type: "text" },
  ],
}

export default function OtrasGestionesPage() {
  return <FormGenerator config={config} />
}
