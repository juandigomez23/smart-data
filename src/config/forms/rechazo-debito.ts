import { FormConfig } from "@/components/formgenerator"

export const rechazoDebitoForm: FormConfig = {
  title: "Rechazo Débito",
  tipo: "rechazo-debito",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text", required: true, auto: true },
    // SAN first so users can paste/type SAN and we can infer `pais` from its prefix
    { name: "san", label: "SAN", type: "text", required: true, inferFromSan: true },
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
      name: "numero_telefonico_peru",
      label: "Número telefónico",
      type: "text",
      showIf: (values) => values.pais === "peru"
    },
    {
      name: "medio_contacto_peru",
      label: "Medio de contacto",
      type: "select",
      showIf: (values) => values.pais === "peru",
      options: [
        { label: "Estaqueue", value: "estaqueue" },
        { label: "WhatsApp", value: "whatsapp" },

        { label: "No se realiza llamada", value: "no_llamada" },
        { label: "Mensaje en WhatsApp", value: "mensaje_whatsapp" }
      ],
    },
    {
      name: "ciclo_factura_peru",
      label: "Ciclo de la factura",
      type: "date",
      showIf: (values) => values.pais === "peru"
    },
    {
      name: "motivo_rechazo_peru",
      label: "Motivo por el cual el cliente informa que no le funciona el débito automático",
      type: "select",
      showIf: (values) => values.pais === "peru",
      options: [
        { label: "Sin cupo", value: "sin_cupo" },
        { label: "Vencida", value: "vencida" },
        { label: "Bloqueada", value: "bloqueada" },
        { label: "Canceló la tarjeta", value: "tarjeta_cancelada" },
        { label: "Inconformidad con el servicio", value: "inconformidad_servicio" },
        { label: "Canceló la inscripción al débito", value: "cancelacion_inscripcion" },
        { label: "Inconformidad con la factura", value: "inconformidad_factura" },
        { label: "Informa que el error es de Hughesnet", value: "error_hughesnet" },
        { label: "Informa que cambió la tarjeta", value: "cambio_tarjeta" },
        { label: "N/A", value: "na" }
      ],
    },
    {
      name: "acepta_debito_peru",
      label: "¿Acepta continuar con el débito automático?",
      type: "select",
      showIf: (values) => values.pais === "peru",
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" },
        { label: "N/A", value: "na" }
      ],
    },
    {
      name: "fecha_acuerdo_pago_peru",
      label: "Fecha de acuerdo de pago",
      type: "date",
      showIf: (values) => values.pais === "peru"
    },
    {
      name: "codigo_gestion_peru",
      label: "Código de gestión",
      type: "select",
      showIf: (values) => values.pais === "peru",
      options: [
        { label: "Aceptó el débito automático", value: "acepto_debito" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Fuera de servicio", value: "fuera_servicio" },
        { label: "Volver a llamar", value: "volver_llamar" },
        { label: "Tiene TRM", value: "tiene_trm" },
        { label: "Mensaje con tercero", value: "mensaje_tercero" },
        { label: "No recibe información", value: "no_recibe_info" },
        { label: "No acepta seguir con el debito", value: "no_acepta_debito" },
        { label: "Buzón", value: "buzon" },
        { label: "Cuelga llamada", value: "cuelga_llamada" },
        { label: "Número equivocado", value: "numero_equivado" },

        { label: "Cancelará el servicio", value: "cancelara_servicio" },
        { label: "Solicita información por WhatsApp", value: "info_whatsapp" },
        { label: "Ya está inscrito al débito", value: "ya_inscrito" },
        { label: "Acuerdo de pago", value: "acuerdo_pago" },
        { label: "Tiene suspensión temporal", value: "suspension_temporal" },
        { label: "SAN inactiva", value: "san_inactiva" }
      ],
    },
    {
      name: "observaciones_peru",
      label: "Observaciones",
      type: "text",
      multiline: true,
      showIf: (values) => values.pais === "peru",
      description: "Agrega cualquier comentario relevante."
    },
    {
      name: "numero_telefonico_ecuador",
      label: "Número telefónico",
      type: "text",
      showIf: (values) => values.pais === "ecuador"
    },
    {
      name: "medio_contacto_ecuador",
      label: "Medio de contacto",
      type: "select",
      showIf: (values) => values.pais === "ecuador",
      options: [
        { label: "Estaqueue", value: "estaqueue" },
        { label: "WhatsApp", value: "whatsapp" },
   
        { label: "No se realiza llamada", value: "no_llamada" },
        { label: "Mensaje en WhatsApp", value: "mensaje_whatsapp" }
      ],
    },
    {
      name: "ciclo_factura_ecuador",
      label: "Ciclo de la factura",
      type: "date",
      showIf: (values) => values.pais === "ecuador"
    },
    {
      name: "motivo_rechazo_ecuador",
      label: "Motivo por el cual el cliente informa que no le funciona el débito automático",
      type: "select",
      showIf: (values) => values.pais === "ecuador",
      options: [
        { label: "Sin cupo", value: "sin_cupo" },
        { label: "Vencida", value: "vencida" },
        { label: "Bloqueada", value: "bloqueada" },
        { label: "Canceló la tarjeta", value: "tarjeta_cancelada" },
        { label: "Inconformidad con el servicio", value: "inconformidad_servicio" },
        { label: "Canceló la inscripción al débito", value: "cancelacion_inscripcion" },
        { label: "Inconformidad con la factura", value: "inconformidad_factura" },
        { label: "Informa que el error es de Hughesnet", value: "error_hughesnet" },
        { label: "Informa que cambió la tarjeta", value: "cambio_tarjeta" },
        { label: "N/A", value: "na" }
      ],
    },
    {
      name: "acepta_debito_ecuador",
      label: "¿Acepta continuar con el débito automático?",
      type: "select",
      showIf: (values) => values.pais === "ecuador",
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" },
        { label: "N/A", value: "na" }
      ],
    },
    {
      name: "fecha_acuerdo_pago_ecuador",
      label: "Fecha de acuerdo de pago",
      type: "date",
      showIf: (values) => values.pais === "ecuador"
    },
    {
      name: "codigo_gestion_ecuador",
      label: "Código de gestión",
      type: "select",
      showIf: (values) => values.pais === "ecuador",
      options: [
        { label: "Aceptó el débito automático", value: "acepto_debito" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Fuera de servicio", value: "fuera_servicio" },
        { label: "Volver a llamar", value: "volver_llamar" },
        { label: "Tiene TRM", value: "tiene_trm" },
        { label: "Mensaje con tercero", value: "mensaje_tercero" },
        { label: "No recibe información", value: "no_recibe_info" },
        { label: "No acepta seguir con el debito", value: "no_acepta_debito" },
        { label: "Buzón", value: "buzon" },
        { label: "Cuelga llamada", value: "cuelga_llamada" },
        { label: "Número equivocado", value: "numero_equivocado" },
   
        { label: "Cancelará el servicio", value: "cancelara_servicio" },
        { label: "Solicita información por WhatsApp", value: "info_whatsapp" },
        { label: "Ya está inscrito al débito", value: "ya_inscrito" },
        { label: "Acuerdo de pago", value: "acuerdo_pago" },
        { label: "Tiene suspensión temporal", value: "suspension_temporal" },
        { label: "SAN inactiva", value: "san_inactiva" }
      ],
    },
    {
      name: "observaciones_ecuador",
      label: "Observaciones",
      type: "text",
      multiline: true,
      showIf: (values) => values.pais === "ecuador",
      description: "Agrega cualquier comentario relevante."
    },
    {
      name: "numero_telefonico_colombia",
      label: "Número telefónico",
      type: "text",
      showIf: (values) => values.pais === "colombia"
    },
    {
      name: "medio_contacto_colombia",
      label: "Medio de contacto",
      type: "select",
      showIf: (values) => values.pais === "colombia",
      options: [
        { label: "Estaqueue", value: "estaqueue" },
        { label: "WhatsApp", value: "whatsapp" },
    
        { label: "No se realiza llamada", value: "no_llamada" },
        { label: "Mensaje en WhatsApp", value: "mensaje_whatsapp" }
      ],
    },
    {
      name: "ciclo_factura_colombia",
      label: "Ciclo de la factura",
      type: "date",
      showIf: (values) => values.pais === "colombia"
    },
    {
      name: "motivo_rechazo_colombia",
      label: "Motivo por el cual el cliente informa que no le funciona el débito automático",
      type: "select",
      showIf: (values) => values.pais === "colombia",
      options: [
        { label: "Sin cupo", value: "sin_cupo" },
        { label: "Vencida", value: "vencida" },
        { label: "Bloqueada", value: "bloqueada" },
        { label: "Canceló la tarjeta", value: "tarjeta_cancelada" },
        { label: "Inconformidad con el servicio", value: "inconformidad_servicio" },
        { label: "Canceló la inscripción al débito", value: "cancelacion_inscripcion" },
        { label: "Inconformidad con la factura", value: "inconformidad_factura" },
        { label: "Informa que el error es de Hughesnet", value: "error_hughesnet" },
        { label: "Informa que cambió la tarjeta", value: "cambio_tarjeta" },
        { label: "N/A", value: "na" }
      ],
    },
    {
      name: "acepta_debito_colombia",
      label: "¿Acepta continuar con el débito automático?",
      type: "select",
      showIf: (values) => values.pais === "colombia",
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" },
        { label: "N/A", value: "na" }
      ],
    },
    {
      name: "fecha_acuerdo_pago_colombia",
      label: "Fecha de acuerdo de pago",
      type: "date",
      showIf: (values) => values.pais === "colombia"
    },
    {
      name: "codigo_gestion_colombia",
      label: "Código de gestión",
      type: "select",
      showIf: (values) => values.pais === "colombia",
      options: [
        { label: "Aceptó el débito automático", value: "acepto_debito" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Fuera de servicio", value: "fuera_servicio" },
        { label: "Volver a llamar", value: "volver_llamar" },
        { label: "Tiene TRM", value: "tiene_trm" },
        { label: "Mensaje con tercero", value: "mensaje_tercero" },
        { label: "No recibe información", value: "no_recibe_info" },
        { label: "No acepta seguir con el debito", value: "no_acepta_debito" },
        { label: "Buzón", value: "buzon" },
        { label: "Cuelga llamada", value: "cuelga_llamada" },
        { label: "Número equivocado", value: "numero_equivocado" },
        { label: "Cancelará el servicio", value: "cancelara_servicio" },
        { label: "Solicita información por WhatsApp", value: "info_whatsapp" },
        { label: "Ya está inscrito al débito", value: "ya_inscrito" },
        { label: "Acuerdo de pago", value: "acuerdo_pago" },
        { label: "Tiene suspensión temporal", value: "suspension_temporal" },
        { label: "SAN inactiva", value: "san_inactiva" }
      ],
    },
    {
      name: "observaciones_colombia",
      label: "Observaciones",
      type: "text",
      multiline: true,
      showIf: (values) => values.pais === "colombia",
      description: "Agrega cualquier comentario relevante."
    },
    {
      name: "numero_telefonico",
      label: "Número telefónico",
      type: "text",
      showIf: (values) => values.pais === "chile"
    },
    {
      name: "medio_contacto",
      label: "Medio de contacto",
      type: "select",
      showIf: (values) => values.pais === "chile",
      options: [
        { label: "Estaqueue", value: "estaqueue" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "No se realiza llamada", value: "no_llamada" },
        { label: "Mensaje en WhatsApp", value: "mensaje_whatsapp" }
      ],
    },
    {
      name: "ciclo_factura",
      label: "Ciclo de la factura",
      type: "date",
      showIf: (values) => values.pais === "chile"
    },
    {
      name: "motivo_rechazo",
      label: "Motivo por el cual el cliente informa que no le funciona el débito automático",
      type: "select",
      showIf: (values) => values.pais === "chile",
      options: [
        { label: "Sin cupo", value: "sin_cupo" },
        { label: "Vencida", value: "vencida" },
        { label: "Bloqueada", value: "bloqueada" },
        { label: "Canceló la tarjeta", value: "tarjeta_cancelada" },
        { label: "Inconformidad con el servicio", value: "inconformidad_servicio" },
        { label: "Canceló la inscripción al débito", value: "cancelacion_inscripcion" },
        { label: "Inconformidad con la factura", value: "inconformidad_factura" },
        { label: "Informa que el error es de Hughesnet", value: "error_hughesnet" },
        { label: "Informa que cambió la tarjeta", value: "cambio_tarjeta" },
        { label: "N/A", value: "na" }
      ],
    },
    {
      name: "acepta_debito",
      label: "¿Acepta continuar con el débito automático?",
      type: "select",
      showIf: (values) => values.pais === "chile",
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" },
        { label: "N/A", value: "na" }
      ],
    },
    {
      name: "fecha_acuerdo_pago",
      label: "Fecha de acuerdo de pago",
      type: "date",
      showIf: (values) => values.pais === "chile"
    },
    {
      name: "codigo_gestion",
      label: "Código de gestión",
      type: "select",
      showIf: (values) => values.pais === "chile",
      options: [
        { label: "Aceptó el débito automático", value: "acepto_debito" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Fuera de servicio", value: "fuera_servicio" },
        { label: "Volver a llamar", value: "volver_llamar" },
        { label: "Tiene TRM", value: "tiene_trm" },
        { label: "Mensaje con tercero", value: "mensaje_tercero" },
        { label: "No recibe información", value: "no_recibe_info" },
        { label: "No acepta seguir con el debito", value: "no_acepta_debito" },
        { label: "Buzón", value: "buzon" },
        { label: "Cuelga llamada", value: "cuelga_llamada" },
        { label: "Número equivocado", value: "numero_equivocado" },

        { label: "Cancelará el servicio", value: "cancelara_servicio" },
        { label: "Solicita información por WhatsApp", value: "info_whatsapp" },
        { label: "Ya está inscrito al débito", value: "ya_inscrito" },
        { label: "Acuerdo de pago", value: "acuerdo_pago" },
        { label: "Tiene suspensión temporal", value: "suspension_temporal" },
        { label: "SAN inactiva", value: "san_inactiva" }
      ],
    },
    {
      name: "observaciones",
      label: "Observaciones",
      type: "text",
      multiline: true,
      showIf: (values) => values.pais === "chile",
      description: "Agrega cualquier comentario relevante."
    }
  ]
}