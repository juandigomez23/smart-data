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
    {
      name: "hughespro",
      label: "HughesPro",
      type: "select",
      options: [
        { label: "Confirmado", value: "confirmado" },
        { label: "Pendiente", value: "pendiente" },
        { label: "No enviado", value: "no_enviado" }
      ],
    },
    {
      name: "validacion_id_detalle",
      label: "Validación de ID",
      type: "select",
      options: [
        { label: "Exitoso", value: "exitoso" },
        { label: "Pendiente", value: "pendiente" },
        { label: "Fallido", value: "fallido" },
        { label: "No enviado", value: "no_enviado" },
        { label: "No aplica", value: "no_aplica" }
      ],
    },
    {
      name: "aprobado_historial",
      label: "Aprobado (historial crediticio)",
      type: "select",
      options: [
        { label: "Excepcionado", value: "excepcionado" },
        { label: "No", value: "no" },
        { label: "No aplica", value: "no_aplica" }
      ],
    },
    {
      name: "autorizado_gerencia_sin_hughespro",
      label: "Autorizado por gerencia (sin HughesPro)",
      type: "select",
      options: [
        { label: "Excepcionado", value: "excepcionado" },
        { label: "No", value: "no" },
        { label: "HughesPro", value: "hughespro" }
      ],
    },
    {
      name: "autorizado_gerencia_multiservicio",
      label: "Autorizado por gerencia (cliente con más de un servicio)",
      type: "select",
      options: [
        { label: "Autorizado sin pago anticipado", value: "sin_pago" },
        { label: "Autorizado pago de 6 meses", value: "6_meses" },
        { label: "Autorizado pago de 12 meses", value: "12_meses" },
        { label: "No autorizado", value: "no_autorizado" },
        { label: "No aplica", value: "no_aplica" }
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
        { label: "SAN asignada IP", value: "san_tp" }
      ],
    },
    { 
      name: "fecha_liberacion", 
      label: "Fecha de liberación", 
      type: "date" 
    },
    {
      name: "codigo_gestion",
      label: "Código de gestión",
      type: "select",
      options: [
        { label: "No pasa auditoria", value: "no_pasa" },
        { label: "Auditoria exitosa", value: "exitosa" },
        { label: "No auditada", value: "no_auditada" }
      ],
    },
    { 
      name: "observaciones", 
      label: "Observación", 
      type: "text",
      description: "Agrega cualquier comentario relevante." 
    }
  ],
}