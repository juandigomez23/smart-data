import { FormConfig } from "@/components/formgenerator"

export const welcomeForm: FormConfig = {
  title: "Welcome",
  tipo: "welcome",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text", required: true },
    {
      name: "pais",
      label: "País",
      type: "select",
      required: true,
      options: [
        { label: "Colombia", value: "colombia" },
        { label: "Chile", value: "chile" },
        { label: "Ecuador", value: "ecuador" },
        { label: "Perú", value: "peru" }
      ],
    },
    { name: "san_chile", label: "SAN Chile", type: "text" },
    {
      name: "tipo_servicio_chile",
      label: "Tipo de servicio Chile",
      type: "select",
      options: [
        { label: "Persona natural", value: "natural" },
        { label: "PYME", value: "pyme" }
      ],
    },
    {
      name: "medio_contrato_chile",
      label: "Medio de contrato Chile",
      type: "select",
      options: [
        { label: "Estaqueue", value: "estaqueue" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Email", value: "email" },
        { label: "Respuesta encuesta", value: "encuesta" },
        { label: "No se realiza llamada", value: "no_llamada" }
      ],
    },
    {
      name: "md_chile",
      label: "MD Chile",
      type: "select",
      options: [
        { label: "COMUNICACIÓN CL", value: "comunicacion_cl" },
        { label: "COMUNICACIÓN LTDA MD", value: "comunicacion_ltda" },
        { label: "CONECTA CL", value: "conecta_cl" },
        { label: "ESPECIAL CL", value: "especial_cl" },
        { label: "FORTEL CL", value: "fortel_cl" },
        { label: "RCC CL", value: "rcc_cl" },
        { label: "REGIONAL CONECTA", value: "regional_conecta" },
        { label: "REGIONAL NORTE RCC", value: "regional_norte" },
        { label: "TEMUTEL CL", value: "temutel_cl" },
        { label: "TEMUTEL MD", value: "temutel_md" },
        { label: "TEMUTEL REGIONAL", value: "temutel_regional" },
        { label: "KIWOX CL", value: "kiwox_cl" },
        { label: "ISLANET CL", value: "islanet_cl" },
        { label: "BACKOFFICE RCC", value: "backoffice_rcc" }
      ],
    },
    {
      name: "pago_primer_boleta",
      label: "¿Pagó la 1er Boleta? Chile",
      type: "select",
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" }
      ],
    },
    {
      name: "satisfecho_servicio",
      label: "¿Se encuentra satisfecho con el servicio? Chile",
      type: "select",
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" },
        { label: "Aún no ha usado el servicio", value: "no_usado" },
        { label: "No se logra contacto", value: "no_contacto" },
        { label: "No se realiza llamada", value: "no_llamada" },
        { label: "Seguimiento", value: "seguimiento" }
      ],
    },
    {
      name: "uso_servicio",
      label: "¿Qué uso le da al servicio? Chile",
      type: "select",
      options: [
        { label: "Estudiar", value: "estudiar" },
        { label: "Trabajar", value: "trabajar" },
        { label: "Redes sociales", value: "redes" },
        { label: "Cámaras de seguridad", value: "camaras" },
        { label: "Comunicación", value: "comunicacion" },
        { label: "Diversión (Netflix, videos, juegos)", value: "diversion" },
        { label: "No aplica", value: "no_aplica" }
      ],
    },
    {
      name: "fecha_pago",
      label: "¿Cuénteme para cuando va a realizar el pago?",
      type: "select",
      options: [
        { label: "Hoy realizo el pago", value: "hoy" },
        { label: "Lo realizare en el próximo corte", value: "proximo_corte" },
        { label: "Lo realizare la próxima semana", value: "proxima_semana" },
        { label: "Ya realizo el pago", value: "ya_pago" },
        { label: "No aplica", value: "no_aplica" }
      ],
    },
    {
      name: "metodo_pago",
      label: "¿De qué manera pagó o pagará su boleta? Chile",
      type: "select",
      options: [
        { label: "En línea", value: "linea" },
        { label: "Presencial", value: "presencial" },
        { label: "Transferencia al banco Santander", value: "santander" },
        { label: "Cliente se encuentra inscrito al PAT", value: "pat_inscrito" },
        { label: "Mes gratis", value: "mes_gratis" },
        { label: "No aplica", value: "no_aplica" }
      ],
    },
    { name: "dia_pago", label: "Si el cliente no ha realizado el pago, confirmar ¿qué día va a pagar?", type: "text" },
    {
      name: "acepta_pat",
      label: "Acepta PAT",
      type: "select",
      options: [
        { label: "Si", value: "si" },
        { label: "No", value: "no" },
        { label: "Ya se encuentra inscrito al PAT", value: "ya_inscrito" },
        { label: "No aplica", value: "no_aplica" }
      ],
    },
    {
      name: "motivo_no_pat",
      label: "Si la respuesta es NO, indague el motivo por el cual no está interesado",
      type: "select",
      options: [
        { label: "No tiene tarjeta de crédito", value: "no_tarjeta" },
        { label: "No tiene tarjeta crédito sino debito", value: "solo_debito" },
        { label: "No tiene cupo en la tarjeta", value: "sin_cupo" },
        { label: "Prefiere pagar de manera manual", value: "prefiere_manual" },
        { label: "Ha tenido malas experiencias con este tipo de sistema", value: "malas_experiencias" },
        { label: "No cree en los beneficios (desconfía)", value: "desconfia" },
        { label: "Tiene la tarjeta bloqueada", value: "tarjeta_bloqueada" },
        { label: "No sabe manejar la tarjeta", value: "no_sabe_manejar" },
        { label: "Es PYME, paga por otro medio", value: "pyme_otro_medio" },
        { label: "Le preguntará a otra persona", value: "consultara" },
        { label: "No aplica", value: "no_aplica" }
      ],
    },
    { name: "numero_contacto", label: "Número por el cual se logró contacto, Chile", type: "text" },
    {
      name: "codigo_gestion",
      label: "Código de gestión",
      type: "select",
      options: [
        { label: "Se realiza encuesta", value: "encuesta_realizada" },
        { label: "No recibe información", value: "no_info" },
        { label: "Solicita información por correo", value: "info_correo" },
        { label: "Volver a llamar", value: "volver_llamar" },
        { label: "Re-llamada", value: "re_llamada" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Buzón de mensaje", value: "buzon" },
        { label: "Fuera de servicio (número fuera de servicio)", value: "fuera_servicio" },
        { label: "Mensaje con tercero", value: "mensaje_tercero" },
        { label: "Colgó", value: "colgo" },
        { label: "Numero equivocado", value: "numero_equivocado" },
        { label: "Solicita retiro del servicio", value: "retiro_servicio" },
        { label: "Presenta novedad (se escala a Loreto)", value: "novedad_loreto" },
        { label: "Cliente con TRM activa", value: "trm_activa" },
        { label: "PYME", value: "pyme" },
        { label: "SAN inactiva", value: "san_inactiva" },
        { label: "Cliente fallecido", value: "fallecido" },
        { label: "Suspensión temporal", value: "suspension_temporal" },
        { label: "Se cancela SAN BRM", value: "cancela_san_brm" },
        { label: "Welcome no completado", value: "no_completado" },
        { label: "Piloto global", value: "piloto_global" },
        { label: "Piloto Loreto", value: "piloto_loreto" },
        { label: "Reinstalación", value: "reinstalacion" }
      ],
    },
    { name: "observacion", label: "Observación", type: "text" },
    { name: "sugerencia", label: "¿Que sugerencia u observación le dejaría a HughesNet?", type: "text" }
  ],
}