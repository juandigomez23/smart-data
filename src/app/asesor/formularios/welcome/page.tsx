"use client"

import FormGenerator, { FormConfig } from "@/components/formgenerator"

const config: FormConfig = {
  title: "Welcome",
  tipo: "welcome",
  image: "/icons/welcome.png",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text", required: true },
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
    { name: "san", label: "SAN", type: "text" },
    {
      name: "satisfaccion",
      label: "¿Está satisfecho con el servicio?",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
        { label: "No ha usado el servicio", value: "pendiente" },
      ],
    },
    { name: "observacion", label: "Observación", type: "text" },
  ],
}

export default function WelcomePage() {
  return <FormGenerator config={config} />
}
