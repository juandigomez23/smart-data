"use client"

import FormGenerator, { FormConfig } from "@/components/formgenerator"

const config: FormConfig = {
  title: "Rechazo Débito",
  tipo: "rechazo-debito",
  image: "/icons/debito.png",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text" },
    { name: "san", label: "SAN", type: "text" },
    { name: "telefono", label: "Número telefónico", type: "text" },
    {
      name: "motivo",
      label: "Motivo rechazo débito",
      type: "select",
      options: [
        { label: "Sin cupo", value: "sin_cupo" },
        { label: "Vencida", value: "vencida" },
        { label: "Bloqueada", value: "bloqueada" },
        { label: "Canceló la tarjeta", value: "cancelo" },
        { label: "Inconformidad con servicio", value: "servicio" },
      ],
    },
    { name: "observaciones", label: "Observaciones", type: "text" },
  ],
}

export default function RechazoDebitoPage() {
  return <FormGenerator config={config} />
}
