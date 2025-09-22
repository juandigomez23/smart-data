import { FormConfig } from "@/components/formgenerator"

export const rechazoDebitoForm: FormConfig = {
  title: "Rechazo Débito",
  tipo: "rechazo-debito",
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
        { label: "Perú", value: "peru" }
      ],
    },
    { name: "san_colombia", label: "SAN COLOMBIA", type: "text" },
    { name: "numero_telefonico", label: "Número telefónico", type: "text" },
    {
      name: "medio_contacto",
      label: "Medio de contacto",
      type: "select",
      options: [
        { label: "Estaqueue", value: "estaqueue" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Correo", value: "correo" },
        { label: "No se realiza llamada", value: "no_llamada" },
        { label: "Mensaje en WhatsApp", value: "mensaje_whatsapp" }
      ],
    },
    { name: "ciclo_factura", label: "Ciclo de la factura", type: "text" },
    {
      name: "motivo_rechazo",
      label: "Motivo por el cual el cliente informa que no le funciona el débito automático",
      type: "select",
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
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" },
        { label: "N/A", value: "na" }
      ],
    },
    { name: "fecha_acuerdo_pago", label: "Fecha de acuerdo de pago", type: "date" },
    {
      name: "codigo_gestion",
      label: "Código de gestión",
      type: "select",
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
        { label: "Se deja mensaje en WhatsApp", value: "mensaje_whatsapp" },
        { label: "No contesta llamada WhatsApp", value: "no_contesta_whatsapp" },
        { label: "Cancelará el servicio", value: "cancelara_servicio" },
        { label: "Solicita información por WhatsApp", value: "info_whatsapp" },
        { label: "Ya está inscrito al débito", value: "ya_inscrito" },
        { label: "Acuerdo de pago", value: "acuerdo_pago" },
        { label: "Tiene suspensión temporal", value: "suspension_temporal" },
        { label: "SAN inactiva", value: "san_inactiva" }
      ],
    },
    { name: "observaciones", label: "Observaciones", type: "text" }
  ],
}