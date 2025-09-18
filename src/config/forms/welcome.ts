import { FormConfig } from "@/components/formgenerator";

export const welcomeForm: FormConfig = {
  title: "WELCOME",
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
        { label: "Perú", value: "peru" },
      ],
    },

    { name: "san_chile", label: "SAN Chile", type: "text" },

    {
      name: "tipo_servicio_chile",
      label: "Tipo de servicio (Chile)",
      type: "select",
      options: [
        { label: "Persona natural", value: "persona_natural" },
        { label: "PYME", value: "pyme" },
      ],
    },

    {
      name: "medio_contrato_chile",
      label: "Medio de contrato (Chile)",
      type: "select",
      options: [
        { label: "Estaqueue", value: "estaqueue" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Email", value: "email" },
        { label: "Respuesta encuesta", value: "encuesta" },
        { label: "No se realiza llamada", value: "no_llamada" },
      ],
    },

    {
      name: "md_chile",
      label: "MD Chile",
      type: "select",
      options: [
        { label: "COMUNICACIÓN CL", value: "comunicacion_cl" },
        { label: "COMUNICACIÓN LTDA MD", value: "comunicacion_ltda_md" },
        { label: "CONECTA CL", value: "conecta_cl" },
        { label: "ESPECIAL CL", value: "especial_cl" },
        { label: "FORTEL CL", value: "fortel_cl" },
        { label: "RCC CL", value: "rcc_cl" },
        { label: "REGIONAL CONECTA", value: "regional_conecta" },
        { label: "REGIONAL NORTE RCC", value: "regional_norte_rcc" },
        { label: "TEMUTEL CL", value: "temutel_cl" },
        { label: "TEMUTEL MD", value: "temutel_md" },
        { label: "TEMUTEL REGIONAL", value: "temutel_regional" },
        { label: "KIWOX CL", value: "kiwox_cl" },
        { label: "ISLANET CL", value: "islanet_cl" },
        { label: "BACKOFFICE RCC", value: "backoffice_rcc" },
        { label: "ÁLEX NAVARRETE CÁCERES", value: "alex_navarrete" },
        { label: "JONATHAN MARABOLI VILLA", value: "jonathan_maraboli" },
        { label: "CARMEN GLORIA SEPÚLVEDA SEGUEL", value: "carmen_sepulveda" },
        { label: "JUAN SALAZAR – RUTH ULLOA", value: "juan_salazar" },
        { label: "MÓNICA PACHECO OVIEDO", value: "monica_pacheco" },
        { label: "ALEJANDRO CURIHUAL", value: "alejandro_curihual" },
        { label: "ERNESTO THER THER", value: "ernesto_ther" },
        { label: "ISABEL URREA NAHUELHUAL", value: "isabel_urrea" },
        { label: "JUAN RIQUELME TORRES", value: "juan_riquelme" },
        { label: "MAURICIO JARA SOTO", value: "mauricio_jara" },
        { label: "MARCELA HURTADO THER", value: "marcela_hurtado" },
        { label: "REINSTALL CL", value: "reinstall_cl" },
        { label: "MG TELECOM CL", value: "mg_telecom_cl" },
        { label: "TECPLAN CL", value: "tecplan_cl" },
        { label: "INECOM CL", value: "inecom_cl" },
        { label: "CS SERVICIOS CL", value: "cs_servicios_cl" },
      ],
    },

    {
      name: "pago_boleta",
      label: "¿Pagó la 1er Boleta? (Chile)",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
      ],
    },

    {
      name: "satisfecho_servicio",
      label: "¿Se encuentra satisfecho con el servicio? (Chile)",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
        { label: "Aún no ha usado el servicio", value: "no_usa" },
        { label: "No se logra contacto", value: "no_contacto" },
        { label: "No se realiza llamada", value: "no_llamada" },
        { label: "Seguimiento", value: "seguimiento" },
      ],
    },

    {
      name: "uso_servicio",
      label: "¿Qué uso le da al servicio? (Chile)",
      type: "select",
      options: [
        { label: "Estudiar", value: "estudiar" },
        { label: "Trabajar", value: "trabajar" },
        { label: "Redes sociales", value: "redes" },
        { label: "Cámaras de seguridad", value: "camaras" },
        { label: "Comunicación", value: "comunicacion" },
        { label: "Diversión (Netflix, videos, juegos)", value: "diversion" },
        { label: "No aplica", value: "na" },
      ],
    },

    {
      name: "pago_planificado",
      label: "¿Cuénteme para cuando va a realizar el pago?",
      type: "select",
      options: [
        { label: "Hoy realizo el pago", value: "hoy" },
        { label: "Lo realizaré en el próximo corte", value: "prox_corte" },
        { label: "Lo realizaré la próxima semana", value: "prox_semana" },
        { label: "Ya realizo el pago", value: "ya_pago" },
        { label: "No aplica", value: "na" },
      ],
    },

    {
      name: "forma_pago",
      label: "¿De qué manera pagó o pagará su boleta? (Chile)",
      type: "select",
      options: [
        { label: "En línea", value: "en_linea" },
        { label: "Presencial", value: "presencial" },
        { label: "Transferencia al banco Santander", value: "santander" },
        { label: "Cliente se encuentra inscrito al PAT", value: "pat" },
        { label: "Mes gratis", value: "mes_gratis" },
        { label: "No aplica", value: "na" },
      ],
    },

    { name: "fecha_pago", label: "Si no ha pagado, ¿qué día pagará?", type: "date" },

    {
      name: "acepta_pat",
      label: "¿Acepta PAT?",
      type: "select",
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" },
        { label: "Ya inscrito al PAT", value: "ya_pat" },
        { label: "No aplica", value: "na" },
      ],
    },

    {
      name: "motivo_no_pat",
      label: "Si la respuesta es NO, motivo",
      type: "select",
      options: [
        { label: "Si aceptó", value: "si" },
        { label: "No tiene tarjeta de crédito", value: "no_tc" },
        { label: "No tiene tarjeta crédito sino débito", value: "debito" },
        { label: "No tiene cupo en la tarjeta", value: "sin_cupo" },
        { label: "Prefiere pagar de manera manual", value: "manual" },
        { label: "Malas experiencias", value: "malas_experiencias" },
        { label: "No cree en beneficios", value: "desconfianza" },
        { label: "Tarjeta bloqueada", value: "bloqueada" },
        { label: "No sabe manejar la tarjeta", value: "no_maneja" },
        { label: "Es PYME, paga por otro medio", value: "pyme_otro" },
        { label: "Le preguntará a otra persona", value: "consulta_otro" },
        { label: "No aplica", value: "na" },
      ],
    },

    { name: "telefono_contacto", label: "Número por el cual se logró contacto (Chile)", type: "text" },

    {
      name: "codigo_gestion",
      label: "Código de gestión",
      type: "select",
      options: [
        { label: "Se realiza encuesta", value: "encuesta" },
        { label: "No recibe información", value: "no_info" },
        { label: "Solicita información por correo", value: "info_correo" },
        { label: "Volver a llamar", value: "volver_llamar" },
        { label: "Re – llamada", value: "rellamada" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Buzón de mensaje", value: "buzon" },
        { label: "Fuera de servicio", value: "fuera_servicio" },
        { label: "Mensaje con tercero", value: "tercero" },
        { label: "Colgó", value: "colgo" },
        { label: "Número equivocado", value: "num_equivocado" },
        { label: "Solicita retiro del servicio", value: "retiro" },
        { label: "Presenta novedad (Loreto)", value: "loreto" },
        { label: "Cliente con TRM activa", value: "trm" },
        { label: "PYME", value: "pyme" },
        { label: "SAN inactiva", value: "san_inactiva" },
        { label: "Cliente fallecido", value: "fallecido" },
        { label: "Suspensión temporal", value: "suspension" },
        { label: "Se cancela SAN BRM", value: "san_brm" },
        { label: "Welcome no completado", value: "no_completado" },
        { label: "Piloto global", value: "piloto_global" },
        { label: "Piloto Loreto", value: "piloto_loreto" },
        { label: "Reinstalación", value: "reinstalacion" },
      ],
    },

    { name: "observacion", label: "Observación", type: "text" },
    { name: "sugerencia", label: "¿Qué sugerencia u observación le dejaría a HughesNet?", type: "text" },
  ],
};
