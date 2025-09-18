import { FormConfig } from "@/components/formgenerator";

export const comercialForm: FormConfig = {
  title: "Comercial",
  fields: [
    { name: "fechaGestion", label: "Fecha de gestión", type: "date", required: true },
    { name: "asesor", label: "Asesor responsable", type: "text", required: true },
    { name: "cliente", label: "Nombre del cliente", type: "text", required: true },
    { name: "documento", label: "Documento", type: "text", required: true },
    {
      name: "resultado",
      label: "Resultado gestión",
      type: "select",
      required: true,
      options: [
        { label: "Venta exitosa", value: "venta_exitosa" },
        { label: "Interesado", value: "interesado" },
        { label: "No interesado", value: "no_interesado" },
        { label: "Volver a llamar", value: "volver_llamar" },
      ],
    },
    { name: "observaciones", label: "Observaciones", type: "text" },
  ],
};
