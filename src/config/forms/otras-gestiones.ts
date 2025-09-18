import { FormConfig } from "@/components/formgenerator";

export const otrasGestionesForm: FormConfig = {
  title: "Otras Gestiones",
  fields: [
    { name: "fechaGestion", label: "Fecha de gestión", type: "date", required: true },
    { name: "tipoGestion", label: "Tipo de gestión", type: "text", required: true },
    { name: "descripcion", label: "Descripción", type: "text" },
    { name: "responsable", label: "Responsable", type: "text" },
    {
      name: "estado",
      label: "Estado",
      type: "select",
      options: [
        { label: "Pendiente", value: "pendiente" },
        { label: "Completado", value: "completado" },
        { label: "Cancelado", value: "cancelado" },
      ],
    },
    { name: "observaciones", label: "Observaciones", type: "text" },
  ],
};
