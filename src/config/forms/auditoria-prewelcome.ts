import { FormConfig } from "@/components/formgenerator"

export const auditoriaPrewelcomeForm: FormConfig = {
  title: "Auditoria Prewelcome",
  tipo: "auditoria-prewelcome",
  fields: [
    { 
      name: "correo", 
      label: "Correo electrónico", 
      type: "text", 
      required: true,
      auto: true
    },
    {
      name: "pais",
      label: "País",
      type: "select",
      required: true,
      options: [
        { label: "Chile", value: "chile" },
        { label: "Colombia", value: "colombia" },
        { label: "Ecuador", value: "ecuador" },
        { label: "Perú", value: "peru" }
      ],
    },
    { 
      name: "san", 
      label: "SAN", 
      type: "text", 
      required: true 
    },
    { 
      name: "fecha_creacion_san", 
      label: "Fecha creación SAN", 
      type: "date" 
    },
    {
      name: "master_dealer",
      label: "Master Dealer",
      type: "select",
      options: [
        { label: "ANavarrete Dealer MD", value: "anavarrete" },
        { label: "HCL-CSepulveda MD Dealer", value: "hcl_csepulveda" },
        { label: "HCL-FORTEL CL", value: "hcl_fortel" },
        { label: "HCL-JMaraboli MD Dealer", value: "hcl_jmaraboli" },
        { label: "HCL-INECOM Dealer MD", value: "hcl_inecom" },
        { label: "HCL-IUrrea Dealer MD", value: "hcl_iurrea" },
        { label: "HCL-Mjara Dealer MD", value: "hcl_mjara" },
        { label: "HCL-M&G Telecom Dealer MD", value: "hcl_mg" },
        { label: "HCL-RccGroup MD Dealer", value: "hcl_rcc" },
        { label: "HCL-JRiquelme Dealer MD", value: "hcl_jriquelme" }
      ],
    },
    {
      name: "documento_id",
      label: "Documento de ID",
      type: "select",
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" },
        { label: "Pendiente", value: "pendiente" }
      ],
    },
    {
      name: "correo_electronico",
      label: "Correo electrónico",
      type: "select",
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" }
      ],
    },
    { 
      name: "telefono", 
      label: "Teléfono", 
      type: "text" 
    },
    {
      name: "direccion",
      label: "Dirección",
      type: "select",
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" },
        { label: "Pendiente", value: "pendiente" }
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
        { label: "4 de 4", value: "4" }
      ],
    },
    { 
      name: "documento_cliente", 
      label: "Documento cliente", 
      type: "text" 
    },
    { 
      name: "linea_contacto_principal", 
      label: "Línea de contacto principal", 
      type: "text" 
    },
    { 
      name: "linea_contacto_secundaria", 
      label: "Línea de contacto secundaria", 
      type: "text" 
    },
    { 
      name: "email", 
      label: "Email", 
      type: "text" 
    },
    {
      name: "tipo_venta",
      label: "Tipo de venta",
      type: "select",
      options: [
  { label: "Persona natural", value: "persona_natural" },
        { label: "PYME", value: "pyme" }
      ],
    },
  ],
}