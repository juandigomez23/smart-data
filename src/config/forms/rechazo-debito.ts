import { FormConfig } from "@/components/formgenerator";

export const rechazoDebitoForm: FormConfig = {
  title: "Rechazo Débito",
  fields: [
    { name: "fechaGestion", label: "Fecha de gestión", type: "date", required: true },
    { name: "cliente", label: "Cliente", type: "text", required: true },
    { name: "documento", label: "Documento", type: "text" },
    {
      name: "motivoRechazo",
      label: "Motivo del rechazo",
      type: "select",
      options: [
        { label: "Fondos insuficientes", value: "fondos" },
        { label: "Cuenta cerrada", value: "cuenta_cerrada" },
        { label: "Datos erróneos", value: "datos_erroneos" },
        { label: "Otro", value: "otro" },
      ],
    },
    { name: "observaciones", label: "Observaciones", type: "text" },
  ],
};
