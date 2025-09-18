// config/forms/auditoria-prewelcome.ts
import { FormConfig } from "@/components/formgenerator";

export const auditoriaPrewelcomeForm: FormConfig = {
  title: "Auditoría Prewelcome",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text", required: true },
    {
      name: "pais",
      label: "País",
      type: "select",
      required: true,
      options: [
        { label: "Chile", value: "chile" },
        { label: "Colombia", value: "colombia" },
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
        { label: "HCL-CSepulveda MD Dealer", value: "csepulveda" },
        { label: "HCL-FORTEL CL", value: "fortel" },
        { label: "HCL-JMaraboli MD Dealer", value: "maraboli" },
        { label: "HCL-INECOM Dealer MD", value: "inecom" },
        { label: "HCL-IUrrea Dealer MD", value: "urrea" },
        { label: "HCL-Mjara Dealer MD", value: "mjara" },
        { label: "HCL-M&G Telecom Dealer MD", value: "mgtelecom" },
        { label: "HCL-RccGroup MD Dealer", value: "rccgroup" },
        { label: "HCL-JRiquelme Dealer MD", value: "riquelme" },
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
      name: "correo_electronico",
      label: "Correo electrónico",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
      ],
    },

    { name: "telefono", label: "Teléfono", type: "text", required: true },

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

    { name: "documento_cliente", label: "Documento cliente", type: "text" },
    { name: "linea_contacto_principal", label: "Línea de contacto principal", type: "text" },
    { name: "linea_contacto_secundaria", label: "Línea de contacto secundaria", type: "text" },
    { name: "email", label: "Email", type: "text" },
    {
      name: "tipo_venta",
      label: "Tipo de venta",
      type: "select",
      options: [
        { label: "Persona natural", value: "natural" },
        { label: "PYME", value: "pyme" },
      ],
    },

    {
      name: "correo_valido",
      label: "Correo válido",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "direccion_valida",
      label: "Dirección válida",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
        { label: "Pendiente", value: "pendiente" },
      ],
    },

    {
      name: "docuemnto_de_id",
      label: "Docuemnto de ID",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
      ],
    },
    
    {
      name: "validacion_id",
      label: "Validación ID",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
      ],
    },
    {
      name: "factura_carta",
      label: "Factura o carta",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
        { label: "No aplica", value: "na" },
      ],
    },
    {
      name: "historial_crediticio",
      label: "Historial crediticio",
      type: "select",
      options: [
        { label: "Aprobado", value: "aprobado" },
        { label: "Rechazado", value: "rechazado" },
        { label: "No aplica", value: "na" },
        { label: "No info", value: "noinfo" },
      ],
    },
    {
      name: "confirmacion_contrato",
      label: "Confirmación del contrato",
      type: "select",
      options: [
        { label: "Firmado", value: "firmado" },
        { label: "Pendiente", value: "pendiente" },
        { label: "Error del sistema", value: "error" },
      ],
    },

    {
      name: "hughespro",
      label: "HughesPro",
      type: "select",
      options: [
        { label: "Confirmado", value: "confirmado" },
        { label: "Pendiente", value: "pendiente" },
        { label: "No enviado", value: "no_enviado" },
      ],
    },

    {
      name: "validacion_id_",
      label: "Validación de ID",
      type: "select",
      options: [
        { label: "Exitoso", value: "exitoso" },
        { label: "Pendiente", value: "pendiente" },
        { label: "Fallido", value: "fallido" },
        { label: "No enviado", value: "no_enviado" },
        { label: "No aplica", value: "no_aplica" },
      ],
    },

    {
      name: "aprobado_historial_crediticio",
      label: "Aprobado (historial crediticio)",
      type: "select",
      options: [
        { label: "Excepcionado", value: "excepcionado" },
        { label: "No", value: "no" },
        { label: "No aplica", value: "no_aplica" },

      ],
    },

    {
      name: "autorizado_por_gerencia",
      label: "Autorizado por gerencia (cliente con mas de un servicio)",
      type: "select",
      options: [
        { label: "Autorizado sin pago anticipado", value: "autorizado _sin_pago_anticipado" },
        { label: "Autorizado pago de 6 meses", value: "autorizado_pago_de_6_meses" },
        { label: "Autorizado pago de 12 meses", value: "Autorizado_pago_de_12_meses" },
        { label: "No autorizado", value: "no_autorizado" },
        { label: "No aplica", value: "no_aplica" },
      ],
    },

    {
      name: "estado_servicio",
      label: "Estado del servicio",
      type: "select",
      options: [
        { label: "Pendiente de pago", value: "pendiente_pago" },
        { label: "Cupón vencido", value: "cupon_vencido" },
        { label: "Cancelada por el MD", value: "cancelada_md" },
        { label: "SAN asignada TP", value: "san_tp" },
      ],
    },
    { name: "fecha_liberacion", label: "Fecha de liberación", type: "date" },
    {
      name: "codigo_gestion",
      label: "Código de gestión",
      type: "select",
      options: [
        { label: "No pasa auditoría", value: "no_pasa" },
        { label: "Auditoría exitosa", value: "exitosa" },
        { label: "No auditada", value: "no_auditada" },
      ],
    },
    { name: "observacion", label: "Observación", type: "text" },
  ],
};
