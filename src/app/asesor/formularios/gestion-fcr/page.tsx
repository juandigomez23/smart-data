"use client"

import FormGenerator, { FormConfig } from "@/components/formgenerator"

const config: FormConfig = {
  title: "Gestión FCR",
  tipo: "gestion-fcr",
  image: "/icons/fcr.png",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text" },
    { name: "san", label: "SAN", type: "text" },
    { name: "fso", label: "FSO", type: "text" },
    {
      name: "codigo_gestion",
      label: "Código de gestión",
      type: "select",
      options: [
        { label: "Realización de pruebas", value: "pruebas" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Mensaje de voz", value: "voz" },
        { label: "Volver a llamar", value: "llamar" },
      ],
    },
    { name: "observacion", label: "Observación", type: "text" },
  ],
}

export default function GestionFCRPage() {
  return <FormGenerator config={config} />
}
