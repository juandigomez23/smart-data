import { FormConfig } from "@/components/formgenerator"

export const equipoComercialForm: FormConfig = {
  title: "Equipo Comercial",
  tipo: "equipo-comercial",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text", required: true, auto: true },
    { name: "san", label: "SAN", type: "text", required: true },
    {
      name: "pais",
      label: "País",
      type: "select",
      required: true,
      options: [
        { label: "Colombia", value: "colombia" },
        { label: "Ecuador", value: "ecuador" },
        { label: "Chile", value: "chile" },
        { label: "Perú", value: "peru" }
      ],
    },
    {
    name: "tipo_servicio",
    label: "Tipo de servicio",
    type: "select",
      options: [
        { label: "Persona natural", value: "natural" },
        { label: "PYME", value: "pyme" }
      ],
    },
    {
    name: "medio_contacto",
    label: "Medio de contacto",
    type: "select",
      options: [
        { label: "Estaqueue", value: "estaqueue" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Ya se recibió solución desde SAC", value: "solucion_sac" },
        { label: "Ya se recibió solución de retención", value: "solucion_retencion" },
        { label: "Se realiza validación interna", value: "validacion_interna" }
      ],
    },
    {
      name: "campana",
      label: "Campaña",
      type: "select",
      options: [
        { label: "Campaña Heavy_Callers - Reincidentes", value: "heavy_callers" },
        { label: "Tarjeta de crédito expirada", value: "tarjeta_expirada" },
        { label: "Inconvenientes Transbank", value: "transbank" },
        { label: "Declined_Payments_Base_Clientes_Autopay_RoSA", value: "declined_payments" },
        { label: "Clientes Perú sin consumo mayo", value: "peru_sin_consumo" },
        { label: "M5 - M10 - M11", value: "m5_m10_m11" }
      ],
    },
    {
      name: "logra_contacto",
      label: "¿Se logra contacto?",
      type: "select",
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" },
        { label: "Ya se recibió solución desde SAC", value: "solucion_sac" },
        { label: "Ya se recibió solución de retención", value: "solucion_retencion" },
        { label: "Se realiza validación interna (Envío de correos, Mesa operativa, mora, TRM)", value: "validacion_interna" }
      ],
    }
    ,
    
    {
      name: "info_si_contacto",
      type: "info",
      label: "Si se logra contacto",
  showIf: (values) => values.logra_contacto === "si"
    },
    {
      name: "numero_contacto",
      label: "Número por el cual se logró contacto",
      type: "text",
  showIf: (values) => values.logra_contacto === "si"
    },
    {
      name: "motivo_reincidencia",
      label: "Motivo de reincidencia",
      type: "select",
  showIf: (values) => values.logra_contacto === "si",
      options: [
        { label: "Información de facturación", value: "info_facturacion" },
        { label: "Información de pago / cobrar pago", value: "info_pago" },
        { label: "Visita técnica", value: "visita_tecnica" },
        { label: "Suspender", value: "suspender" },
        { label: "Traslado / ubicación", value: "traslado" },
        { label: "Reactivar", value: "reactivar" },
        { label: "Cancelar servicio", value: "cancelar" },
        { label: "Ajustes factura", value: "ajustes_factura" },
        { label: "Conectividad intermitente", value: "conectividad_intermitente" },
        { label: "Sin conectividad a internet", value: "sin_conectividad" },
        { label: "Información general", value: "info_general" },
        { label: "Actualizar información de la cuenta", value: "actualizar_info" },
        { label: "Cambiar plan de servicio", value: "cambiar_plan" },
        { label: "Inconvenientes con el ingreso a la plataforma", value: "problemas_plataforma" },
        { label: "No puede encontrar la red WI-FI", value: "no_encuentra_wifi" },
        { label: "Comprar tokens", value: "comprar_tokens" },
        { label: "Orden de instalación", value: "orden_instalacion" },
        { label: "Preguntas de uso", value: "preguntas_uso" },
        { label: "Posible fraude", value: "posible_fraude" },
        { label: "Inactivo", value: "inactivo" }
      ],
    },
    {
      name: "solucion_recibida",
      label: "¿Qué solución recibió?",
      type: "select",
  showIf: (values) => values.logra_contacto === "si",
      options: [
        { label: "Se brinda información de la factura", value: "info_factura" },
        { label: "Cambio de contraseña", value: "cambio_password" },
        { label: "Referencia de pago", value: "referencia_pago" },
        { label: "Cambio de titular", value: "cambio_titular" },
        { label: "Traslado de servicio", value: "traslado_servicio" },
        { label: "Visita técnica", value: "visita_tecnica" },
        { label: "Ajuste de factura", value: "ajuste_factura" },
        { label: "Cambio de plan", value: "cambio_plan" },
        { label: "Se escala retención", value: "escala_retencion" },
        { label: "Tokens", value: "tokens" },
        { label: "Se educa sobre el servicio", value: "educacion_servicio" },
        { label: "No aplica", value: "no_aplica" },
        { label: "Suspensión temporal", value: "suspension_temporal" },
        { label: "Ya recibió solución de retención", value: "solucion_retencion" },
        { label: "Cuenta reactivada", value: "cuenta_reactivada" },
        { label: "Descuento", value: "descuento" },
        { label: "Actualización de datos", value: "actualizacion_datos" },
        { label: "Seguimiento", value: "seguimiento" },
        { label: "SAN inactiva", value: "san_inactiva" },
        { label: "Acuerdo de pago", value: "acuerdo_pago" },
        { label: "Ya tiene TRM programada", value: "trm_programada" },
        { label: "Cliente en mora", value: "cliente_mora" }
      ],
    },
    {
      name: "escala_a",
      label: "Se escala a",
      type: "select",
  showIf: (values) => values.logra_contacto === "si",
      options: [
        { label: "Retención", value: "retencion" },
        { label: "Area encargada", value: "area_encargada" },
        { label: "No se escala / se brindó solución", value: "no_escala" }
      ],
    },
    {
      name: "acepta_pat",
      label: "¿Acepta PAT?",
      type: "select",
      showIf: (values) => values.logra_contacto === "si",
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" },
        { label: "Cliente ya está inscrito", value: "ya_inscrito" },
        { label: "No aplica", value: "no_aplica" }
      ],
    },
    {
      name: "info_post_pat",
      type: "info",
      label: "¡Ten en cuenta!\nRecordar el Chat Bot correspondiente a cada país:\nColombia: +57 1 6072936\nChile: +56 2 3210 7622\nPerú: +51 1 7097858\nConfirmar datos\nPreguntar si tiene sugerencias o recomendaciones",
      showIf: (values) => values.logra_contacto === "si"
    },
    
    {
      name: "info_cierre",
      type: "info",
      label: "Cierre",
  showIf: (values) => values.logra_contacto !== undefined
    },
    {
      name: "codigo_gestion",
      label: "Código de gestión",
      type: "select",
  showIf: (values) => values.logra_contacto !== undefined,
      options: [
        { label: "Acepta información", value: "acepta_info" },
        { label: "No recibe información", value: "no_recibe_info" },
        { label: "Ya recibió solución desde SAC", value: "solucion_sac" },
        { label: "Solicita retiro del servicio", value: "retiro_servicio" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Fuera de servicio", value: "fuera_servicio" },
        { label: "Mensaje con tercero", value: "mensaje_tercero" },
        { label: "Cliente cuelga la llamada", value: "cliente_cuelga" },
        { label: "Numero equivocado", value: "numero_equivocado" },
        { label: "SAN inactiva", value: "san_inactiva" },
        { label: "Tiene TRM programada", value: "trm_programada" },
        { label: "Posible fraude", value: "posible_fraude" },
        { label: "Validación de cumplimiento", value: "validacion_cumplimiento" },
        { label: "Se escala por correo", value: "escala_correo" },
        { label: "Cliente en mora", value: "cliente_mora" },
        { label: "Volver a llamar", value: "volver_llamar" },
        { label: "Ya recibió solución desde retención", value: "solucion_retencion" },
        { label: "Cliente solicita información por medios electrónicos", value: "info_electronica" },
        { label: "Acepta retención", value: "acepta_retencion" }
      ],
    },
    {
      name: "observaciones",
      label: "Observaciones",
  type: "text",
  multiline: true,
      showIf: (values) => values.logra_contacto !== undefined,
      description: "Agrega cualquier comentario relevante."
    },
    {
      name: "sugerencias",
      label: "Sugerencias o recomendaciones",
  type: "text",
  multiline: true,
  showIf: (values) => values.logra_contacto !== undefined
    }
  ],
}