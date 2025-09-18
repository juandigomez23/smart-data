import { FormConfig } from "@/components/formgenerator";

export const fcrForm: FormConfig = {
  title: "Gestión FCR",
  fields: [
    { name: "fechaGestion", label: "Fecha de gestión", type: "date", required: true },
    { name: "nombreCliente", label: "Nombre del cliente", type: "text", required: true },
    { name: "documentoCliente", label: "Documento del cliente", type: "text" },
    {
      name: "resultadoFcr",
      label: "Resultado FCR",
      type: "select",
      required: true,
      options: [
        { label: "Resuelto en primer contacto", value: "resuelto" },
        { label: "Escalado a otra área", value: "escalado" },
        { label: "Pendiente de respuesta", value: "pendiente" },
      ],
    },
    { name: "observaciones", label: "Observaciones", type: "text" },
  ],
};
