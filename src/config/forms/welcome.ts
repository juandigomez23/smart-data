import { FormConfig } from "@/components/formgenerator";

export const welcomeForm: FormConfig = {
  title: "Welcome",
  fields: [
    { name: "fechaGestion", label: "Fecha de gestión", type: "date", required: true },
    { name: "nombreCliente", label: "Nombre del cliente", type: "text", required: true },
    { name: "documentoCliente", label: "Documento del cliente", type: "number", required: true },
    { name: "telefono", label: "Teléfono de contacto", type: "text" },
    {
      name: "estadoBienvenida",
      label: "Estado de bienvenida",
      type: "select",
      required: true,
      options: [
        { label: "Exitosa", value: "exitosa" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Número equivocado", value: "equivocado" },
        { label: "Rechaza bienvenida", value: "rechazo" },
      ],
    },
    { name: "observaciones", label: "Observaciones", type: "text" },
  ],
};
