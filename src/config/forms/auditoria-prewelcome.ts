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
      type: "date",
      required: true
    },
    {
      name: "master_dealer",
      label: "Master Dealer",
      type: "select",
      required: true,
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
      required: true,
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
      required: true,
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" }
      ],
    },
    { 
      name: "telefono", 
      label: "Teléfono", 
      type: "text",
      required: true
    },
    {
      name: "direccion",
      label: "Dirección",
      type: "select",
      required: true,
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
      required: true,
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
      type: "text",
      required: true
    },
    { 
      name: "linea_contacto_principal", 
      label: "Línea de contacto principal", 
      type: "text",
      required: true
    },
    { 
      name: "linea_contacto_secundaria", 
      label: "Línea de contacto secundaria", 
      type: "text",
      required: true
    },
    { 
      name: "email", 
      label: "Email", 
      type: "text",
      required: true
    },
    {
      name: "tipo_venta",
      label: "Tipo de venta",
      type: "select",
      required: true,
      options: [
        { label: "Persona natural", value: "persona_natural" },
        { label: "PYME", value: "pyme" }
      ],
    },
    
    {
      name: "documentos_persona_natural",
      label: "Documentos persona natural",
      type: "info",
      required: true,
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "documento_id_natural",
      label: "Documento de ID",
      type: "select",
      required: true,
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" }
      ],
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "validacion_id_natural",
      label: "Validación ID",
      type: "select",
      required: true,
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" }
      ],
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "factura_carta_natural",
      label: "Factura o carta",
      type: "select",
      required: true,
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" },
        { label: "No aplica", value: "no_aplica" }
      ],
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "historial_crediticio_natural",
      label: "Historial crediticio",
      type: "select",
      required: true,
      options: [
        { label: "Aprobado", value: "aprobado" },
        { label: "Rechazado", value: "rechazado" },
        { label: "No aplica", value: "no_aplica" },
        { label: "No info", value: "no_info" }
      ],
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "confirmacion_contrato_natural",
      label: "Confirmación del contrato",
      type: "select",
      required: true,
      options: [
        { label: "Firmado", value: "firmado" },
        { label: "Pendiente", value: "pendiente" },
        { label: "Error del Sistema", value: "error_sistema" },
        { label: "Contrato call", value: "contrato_call" }
      ],
      showIf: { tipo_venta: "persona_natural" }
    },
    
    {
      name: "documentos_pyme",
      label: "Documentos PYME",
      type: "info",
      required: true,
      showIf: { tipo_venta: "pyme" }
    },
      {
        name: "nit_rut_pyme",
        label: "NIT/RUT",
        type: "select",
        required: true,
        options: [
          { label: "Si", value: "si" },
          { label: "No", value: "no" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "documento_id_representante_pyme",
        label: "Documento de ID del representante legal",
        type: "select",
        required: true,
        options: [
          { label: "Si", value: "si" },
          { label: "No", value: "no" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "validacion_id_representante_pyme",
        label: "Validación ID del representante legal",
        type: "select",
        required: true,
        options: [
          { label: "Si", value: "si" },
          { label: "No", value: "no" },
          { label: "No aplica", value: "no_aplica" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "factura_carta_pyme",
        label: "Factura o carta",
        type: "select",
        required: true,
        options: [
          { label: "Si", value: "si" },
          { label: "No", value: "no" },
          { label: "No aplica", value: "no_aplica" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "autorizacion_tercero_pyme",
        label: "Autorización de tercero",
        type: "select",
        required: true,
        options: [
          { label: "Si", value: "si" },
          { label: "No", value: "no" },
          { label: "No aplica", value: "no_aplica" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "historial_crediticio_pyme",
        label: "Historial crediticio",
        type: "select",
        required: true,
        options: [
          { label: "Aprobado", value: "aprobado" },
          { label: "Rechazado", value: "rechazado" },
          { label: "No aplica", value: "no_aplica" },
          { label: "No info", value: "no_info" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "confirmacion_contrato_pyme",
        label: "Confirmación del contrato (PYME)",
        type: "select",
        required: true,
        options: [
          { label: "Firmado", value: "firmado" },
          { label: "Pendiente", value: "pendiente" },
          { label: "Error del sistema", value: "error_sistema" },
          { label: "Contrato call", value: "contrato_call" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      
      {
        name: "hughespro_truora_pyme",
        label: "HughesPro (Truora)",
        type: "info",
        required: true,
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "hughespro_estado_pyme",
        label: "HughesPro",
        type: "select",
        required: true,
        options: [
          { label: "Confirmado", value: "confirmado" },
          { label: "Pendiente", value: "pendiente" },
          { label: "No enviado", value: "no_enviado" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "hughespro_validacion_id_pyme",
        label: "Validación de ID",
        type: "select",
        required: true,
        options: [
          { label: "Exitoso", value: "exitoso" },
          { label: "Pendiente", value: "pendiente" },
          { label: "Fallido", value: "fallido" },
          { label: "No enviado", value: "no_enviado" },
          { label: "No aplica", value: "no_aplica" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      
      {
        name: "autorizacion_gerencia_info_pyme",
        label: "Autorización de gerencia",
        type: "info",
        required: true,
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "autorizacion_gerencia_historial_pyme",
        label: "Aprobado (historial crediticio)",
        type: "select",
        required: true,
        options: [
          { label: "Excepcionado", value: "excepcionado87" },
          { label: "No", value: "no" },
          { label: "No aplica", value: "no_aplica" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "autorizado_gerencia_sin_hughespro_pyme",
        label: "Autorizado por gerencia (sin HughesPro)",
        type: "select",
        required: true,
        options: [
          { label: "Excepcionado", value: "excepcionado" },
          { label: "No", value: "no" },
          { label: "HughesPro", value: "hughespro" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "autorizado_gerencia_mas_servicios_pyme",
        label: "Autorizado por gerencia (cliente con más de un servicio)",
        type: "select",
        required: true,
        options: [
          { label: "Autorizado sin pago anticipado", value: "sin_pago" },
          { label: "Autorizado pago de 6 meses", value: "pago_6m" },
          { label: "Autorizado pago de 12 meses", value: "pago_12m" },
          { label: "No autorizado", value: "no_autorizado" },
          { label: "No aplica", value: "no_aplica" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "estado_servicio_pyme",
        label: "Estado del servicio",
        type: "select",
        required: true,
        options: [
          { label: "Pendiente de pago", value: "pendiente_pago" },
          { label: "Cupón vencido", value: "cupon_vencido" },
          { label: "Cancelada por el MD", value: "cancelada_md" },
          { label: "SAN asignada IP", value: "san_ip" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "fecha_liberacion_pyme",
        label: "Fecha de liberación",
        type: "date",
        showIf: { tipo_venta: "pyme" }
      },
      {
        name: "codigo_gestion_pyme",
        label: "Código de gestión",
        type: "select",
        required: true,
        options: [
          { label: "No pasa auditoria", value: "no_pasa" },
          { label: "Auditoria exitosa", value: "exitosa" },
          { label: "No auditada", value: "no_auditada" }
        ],
        showIf: { tipo_venta: "pyme" }
      },
    
    {
      name: "hughespro_truora",
      label: "HughesPro (Truora)",
      type: "info",
      required: true,
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "hughespro_estado",
      label: "HughesPro",
      type: "select",
      required: true,
      options: [
        { label: "Confirmado", value: "confirmado" },
        { label: "Pendiente", value: "pendiente" },
        { label: "No enviado", value: "no_enviado" }
      ],
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "hughespro_validacion_id",
      label: "Validación de ID",
      type: "select",
      required: true,
      options: [
        { label: "Exitoso", value: "exitoso" },
        { label: "Pendiente", value: "pendiente" },
        { label: "Fallido", value: "fallido" },
        { label: "No enviado", value: "no_enviado" },
        { label: "No aplica", value: "no_aplica" }
      ],
      showIf: { tipo_venta: "persona_natural" }
    },

    
    
    {
      name: "autorizacion_gerencia_info_natural",
      label: "Autorización de gerencia",
      type: "info",
      required: true,
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "autorizacion_gerencia_historial",
      label: "Aprobado (historial crediticio)",
      type: "select",
      required: true,
      options: [
        { label: "Excepcionado", value: "excepcionado" },
        { label: "No", value: "no" },
        { label: "No aplica", value: "no_aplica" }
      ],
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "autorizado_gerencia_sin_hughespro",
      label: "Autorizado por gerencia (sin HughesPro)",
      type: "select",
      required: true,
      options: [
        { label: "Excepcionado", value: "excepcionado" },
        { label: "No", value: "no" },
        { label: "HughesPro", value: "hughespro" }
      ],
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "autorizado_gerencia_mas_servicios",
      label: "Autorizado por gerencia (cliente con más de un servicio)",
      type: "select",
      required: true,
      options: [
        { label: "Autorizado sin pago anticipado", value: "sin_pago" },
        { label: "Autorizado pago de 6 meses", value: "pago_6m" },
        { label: "Autorizado pago de 12 meses", value: "pago_12m" },
        { label: "No autorizado", value: "no_autorizado" },
        { label: "No aplica", value: "no_aplica" }
      ],
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "estado_servicio",
      label: "Estado del servicio",
      type: "select",
      required: true,
      options: [
        { label: "Pendiente de pago", value: "pendiente_pago" },
        { label: "Cupón vencido", value: "cupon_vencido" },
        { label: "Cancelada por el MD", value: "cancelada_md" },
        { label: "SAN asignada IP", value: "san_ip" }
      ],
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "fecha_liberacion",
      label: "Fecha de liberación",
      type: "date",
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "codigo_gestion",
      label: "Código de gestión",
      type: "select",
      required: true,
      options: [
        { label: "No pasa auditoria", value: "no_pasa" },
        { label: "Auditoria exitosa", value: "exitosa" },
        { label: "No auditada", value: "no_auditada" }
      ],
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "observacion",
      label: "Observación",
      type: "text",
      required: true,
      multiline: true,
      showIf: { tipo_venta: "persona_natural" }
    },
    {
      name: "observacion_pyme",
      label: "Observación",
      type: "text",
      required: true,
      multiline: true,
      showIf: { tipo_venta: "pyme" }
    }
  ]
}