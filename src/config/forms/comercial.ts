import { FormConfig } from "@/components/formgenerator";

export const comercialForm: FormConfig = {
  title: "Gestión Comercial",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text", required: true },
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
        { label: "Perú", value: "peru" },
      ],
    },

    {
      name: "tipo_servicio",
      label: "Tipo de servicio",
      type: "select",
      options: [
        { label: "Persona natural", value: "natural" },
        { label: "PYME", value: "pyme" },
      ],
    },

    {
      name: "medio_contacto",
      label: "Medio de contacto",
      type: "select",
      options: [
        { label: "Estaqueue", value: "estaqueue" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Ya se recibió solución desde SAC", value: "sac" },
        { label: "Ya se recibió solución de retención", value: "retencion" },
        { label: "Validación interna (correos, mesa operativa, mora, TRM)", value: "validacion" },
      ],
    },

    {
      name: "campaña",
      label: "Campaña",
      type: "select",
      options: [
        { label: "Campaña Heavy Callers – Reincidentes", value: "heavy_callers" },
        { label: "Tarjeta de crédito expirada", value: "tarjeta_expirada" },
        { label: "Inconvenientes Transbank", value: "transbank" },
        { label: "Declined Payments Base Clientes Autopay RoSA", value: "declined_payments" },
        { label: "Clientes Perú sin consumo mayo", value: "peru_sin_consumo" },
        { label: "M5 – M10 – M11", value: "m5_m10_m11" },
      ],
    },

    {
      name: "logra_contacto",
      label: "¿Se logra contacto?",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
        { label: "Ya se recibió solución desde SAC", value: "sac" },
        { label: "Ya se recibió solución de retención", value: "retencion" },
        { label: "Validación interna (correos, mesa operativa, mora, TRM)", value: "validacion" },
      ],
    },

    { name: "numero_contacto", label: "Número por el cual se logró contacto", type: "text" },

    {
      name: "motivo_reincidencia",
      label: "Motivo de reincidencia",
      type: "select",
      options: [
        { label: "Información de facturación", value: "facturacion" },
        { label: "Información de pago / cobrar pago", value: "pago" },
        { label: "Visita técnica", value: "visita" },
        { label: "Suspender", value: "suspender" },
        { label: "Traslado / ubicación", value: "traslado" },
        { label: "Reactivar", value: "reactivar" },
        { label: "Cancelar servicio", value: "cancelar" },
        { label: "Ajustes factura", value: "ajustes" },
        { label: "Conectividad intermitente", value: "intermitente" },
        { label: "Sin conectividad a internet", value: "sin_internet" },
        { label: "Información general", value: "info_general" },
        { label: "Actualizar información de la cuenta", value: "actualizar_cuenta" },
        { label: "Cambiar plan de servicio", value: "cambiar_plan" },
        { label: "Cancelación de orden", value: "cancelar_orden" },
        { label: "Inconvenientes con el ingreso a la plataforma", value: "plataforma" },
        { label: "No puede encontrar la red WI-FI", value: "wifi" },
        { label: "Comprar tokens", value: "tokens" },
        { label: "Orden de instalación", value: "instalacion" },
        { label: "Preguntas de uso", value: "uso" },
        { label: "Posible fraude", value: "fraude" },
        { label: "Campaña M5-M10-M11", value: "campaña_m" },
        { label: "Inactivo", value: "inactivo" },
      ],
    },

    {
      name: "solucion_recibida",
      label: "¿Qué solución recibió?",
      type: "select",
      options: [
        { label: "Se brinda información de la factura", value: "info_factura" },
        { label: "Cambio de contraseña", value: "cambio_password" },
        { label: "Referencia de pago", value: "referencia_pago" },
        { label: "Cambio de titular", value: "cambio_titular" },
        { label: "Traslado de servicio", value: "traslado" },
        { label: "Visita técnica", value: "visita" },
        { label: "Ajuste de factura", value: "ajuste_factura" },
        { label: "Cambio de plan", value: "cambio_plan" },
        { label: "Se escala retención", value: "escala_retencion" },
        { label: "Tokens", value: "tokens" },
        { label: "Se educa sobre el servicio", value: "educacion" },
        { label: "No aplica", value: "na" },
        { label: "Suspensión temporal", value: "suspension" },
        { label: "Ya recibió solución de retención", value: "retencion" },
        { label: "Cuenta reactivada", value: "reactivada" },
        { label: "Descuento", value: "descuento" },
        { label: "Actualización de datos", value: "actualizacion" },
        { label: "Seguimiento", value: "seguimiento" },
        { label: "SAN inactiva", value: "san_inactiva" },
        { label: "Acuerdo de pago", value: "acuerdo_pago" },
        { label: "Ya tiene TRM programada", value: "trm" },
        { label: "Cliente en mora", value: "mora" },
      ],
    },

    {
      name: "se_escala",
      label: "Se escala a",
      type: "select",
      options: [
        { label: "Retención", value: "retencion" },
        { label: "Soporte técnico", value: "soporte" },
        { label: "No se escala / se brindó solución", value: "no_escala" },
      ],
    },

    {
      name: "acepta_pat",
      label: "¿Acepta PAT?",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
        { label: "Cliente ya está inscrito", value: "inscrito" },
        { label: "No aplica", value: "na" },
      ],
    },

    {
      name: "codigo_gestion",
      label: "Código de gestión",
      type: "select",
      options: [
        { label: "Acepta información", value: "acepta_info" },
        { label: "No recibe información", value: "no_info" },
        { label: "Ya recibió solución desde SAC", value: "sac" },
        { label: "Solicita retiro del servicio", value: "retiro" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Fuera de servicio", value: "fuera_servicio" },
        { label: "Mensaje con tercero", value: "tercero" },
        { label: "Cliente cuelga la llamada", value: "cuelga" },
        { label: "Número equivocado", value: "equivocado" },
        { label: "SAN inactiva", value: "san_inactiva" },
        { label: "Tiene TRM programada", value: "trm" },
        { label: "Posible fraude", value: "fraude" },
        { label: "Validación de cumplimiento", value: "cumplimiento" },
        { label: "Se escala por correo", value: "correo" },
        { label: "Cliente en mora", value: "mora" },
        { label: "Se escala a mesa operativa", value: "mesa_operativa" },
        { label: "Volver a llamar", value: "volver_llamar" },
        { label: "Ya recibió solución desde retención", value: "retencion" },
        { label: "Cliente solicita información por medios electrónicos", value: "medios_electronicos" },
        { label: "Acepta retención", value: "acepta_retencion" },
      ],
    },

    { name: "observaciones", label: "Observaciones", type: "text" },
    { name: "sugerencias", label: "Sugerencias o recomendaciones", type: "text" },
  ],
};
