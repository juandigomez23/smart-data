import { FormConfig } from "@/components/formgenerator";

export const fcrForm: FormConfig = {
  title: "Gestión FCR",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text", required: true },
    { name: "san", label: "SAN", type: "text", required: true },
    { name: "fso", label: "FSO", type: "text" },

    {
      name: "pais",
      label: "País",
      type: "select",
      required: true,
      options: [
        { label: "Colombia", value: "colombia" },
        { label: "Ecuador", value: "ecuador" },
      ],
    },

    { name: "codigo_error_inicial", label: "Código de error inicial", type: "text" },
    { name: "codigo_error_final", label: "Código de error final", type: "text" },

    {
      name: "codigo_gestion",
      label: "Código de gestión",
      type: "select",
      required: true,
      options: [
        { label: "Realización de pruebas", value: "pruebas" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Mensaje de voz", value: "mensaje_voz" },
        { label: "Mensaje con tercero", value: "mensaje_tercero" },
        { label: "Mensaje por WhatsApp", value: "whatsapp" },
        { label: "Mensaje correo electrónico", value: "correo" },
        { label: "Volver a llamar", value: "volver_llamar" },
        { label: "Número equivocado", value: "numero_equivocado" },
        { label: "SAN sin instalar", value: "san_no_instalada" },
        { label: "No tiene FSO", value: "no_fso" },
        { label: "No se contacta modem quemado", value: "modem_quemado" },
        { label: "No se contacta cliente en mora", value: "mora" },
        { label: "No se contacta cliente con terminación programada", value: "terminacion" },
        { label: "No se contacta cliente con suspensión temporal", value: "suspension" },
        { label: "No se contacta Beam errado", value: "beam_errado" },
        { label: "FSO ya agendada", value: "fso_agendada" },
        { label: "FSO express wifi", value: "fso_express" },
        { label: "FSO completada", value: "fso_completada" },
        { label: "Cancelación FSO sin contacto cliente", value: "cancelacion_sin_contacto" },
        { label: "Cancelación FSO requiere traslado", value: "cancelacion_traslado" },
        { label: "Cancelación FSO mal creada", value: "cancelacion_mal_creada" },
        { label: "Cancelación FSO imposibilidad técnica", value: "cancelacion_tecnica" },
        { label: "Cancelación FSO cliente desea cancelar el servicio", value: "cancelacion_cliente" },
        { label: "Cancelación FSO cliente en mora", value: "cancelacion_mora" },
      ],
    },

    {
      name: "accion_realizada",
      label: "Acción realizada",
      type: "select",
      required: true,
      options: [
        { label: "Se reporta por Beam errado", value: "beam_errado" },
        { label: "Pendiente contacto con el cliente", value: "pendiente_contacto" },
        { label: "Orden asignada", value: "orden_asignada" },
        { label: "FSO ya agendada", value: "fso_agendada" },
        { label: "FSO express wifi", value: "fso_express" },
        { label: "Escalado", value: "escalado" },
        { label: "Creación de traslado", value: "traslado" },
        { label: "Cancelación FSO sin contacto con el cliente", value: "cancelacion_sin_contacto" },
        { label: "Cancelación FSO servicio funcional", value: "cancelacion_funcional" },
        { label: "Cancelación FSO requiere traslado", value: "cancelacion_traslado" },
        { label: "Cancelación FSO mal creada", value: "cancelacion_mal_creada" },
        { label: "Cancelación FSO imposibilidad técnica", value: "cancelacion_tecnica" },
        { label: "Cancelación FSO cliente desea cancelar el servicio", value: "cancelacion_cliente" },
        { label: "Cancelación FSO cliente con ST", value: "cancelacion_st" },
        { label: "N/A", value: "na" },
        { label: "Cancelación FSO cliente en mora", value: "cancelacion_mora" },
      ],
    },

    { name: "observaciones", label: "Observaciones", type: "text" },
  ],
};
