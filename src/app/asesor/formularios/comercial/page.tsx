"use client"

import FormGenerator, { FormConfig } from "@/components/formgenerator"

const config: FormConfig = {
  title: "Gestión Comercial",
  tipo: "comercial",
  image: "/icons/comercial.png",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text", required: true },
    { name: "san", label: "SAN", type: "text" },
    {
      name: "tipo_servicio",
      label: "Tipo de servicio",
      type: "select",
      options: [
        { label: "Persona natural", value: "natural" },
        { label: "PYME", value: "pyme" },
      ],
    },
    { name: "observacion", label: "Observación", type: "text" },
  ],
}

export default function ComercialPage() {
  return <FormGenerator config={config} />
}
