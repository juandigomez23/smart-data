"use client"

import FormGenerator, { FormConfig } from "@/components/formgenerator"

const config: FormConfig = {
  title: "Auditoría Prewelcome",
  tipo: "auditoria-prewelcome",
  image: "/icons/auditoria.png",
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
    { name: "san", label: "SAN", type: "text", required: true },
    { name: "fecha_creacion_san", label: "Fecha creación SAN", type: "date" },
    {
      name: "master_dealer",
      label: "Master Dealer",
      type: "select",
      options: [
        { label: "ANavarrete Dealer MD", value: "navarrete" },
        { label: "HCL-CSepulveda MD Dealer", value: "sepulveda" },
        { label: "HCL-FORTEL CL", value: "fortel" },
        { label: "HCL-JMaraboli MD Dealer", value: "maraboli" },
      ],
    },
    {
      name: "documento_id",
      label: "Documento de ID",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
        { label: "Pendiente", value: "pendiente" },
      ],
    },
    {
      name: "correo_ok",
      label: "Correo validado",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
      ],
    },
    { name: "telefono", label: "Teléfono", type: "text" },
    {
      name: "direccion",
      label: "Dirección",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
        { label: "Pendiente", value: "pendiente" },
      ],
    },
    {
      name: "total_datos_correctos",
      label: "Total de datos correctos",
      type: "select",
      options: [
        { label: "0 de 4", value: "0" },
        { label: "1 de 4", value: "1" },
        { label: "2 de 4", value: "2" },
        { label: "3 de 4", value: "3" },
        { label: "4 de 4", value: "4" },
      ],
    },
    { name: "observacion", label: "Observación", type: "text" },
  ],
}

export default function AuditoriaPrewelcomePage() {
  return <FormGenerator config={config} />
}
