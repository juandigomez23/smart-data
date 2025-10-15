// Archivo unificado para el formulario de retenciones de todos los países

import { FormConfig } from "@/components/formgenerator";

export const retencionesForm: FormConfig = {
  title: "Retenciones",
  tipo: "retenciones",
  fields: [
    
    { name: "correo", label: "Correo electrónico", type: "text", required: true, auto: true },
    {
      name: "san",
      label: ({ values }) => {
        const pais = values.pais;
        if (pais === "colombia") return "SAN (debe iniciar con HCO)";
        if (pais === "chile") return "SAN (debe iniciar con HCL)";
        if (pais === "ecuador") return "SAN (debe iniciar con HEC)";
        if (pais === "peru" || pais === "perú") return "SAN (debe iniciar con HPE)";
        return "SAN";
      },
      type: "text",
      required: true,
      description: "Colombia(HCO), Chile(HCL), Ecuador(HEC), Perú(HPE)",
      validate: ({ values, value }) => {
  const vals = values as { pais?: string };
  const pais = vals.pais;
  if (!value) return "Campo obligatorio";
  const valStr = typeof value === "string" ? value.trim() : String(value);
  if (pais === "colombia" && !valStr.startsWith("HCO")) return "El SAN debe iniciar con HCO para Colombia";
  if (pais === "chile" && !valStr.startsWith("HCL")) return "El SAN debe iniciar con HCL para Chile";
  if (pais === "ecuador" && !valStr.startsWith("HEC")) return "El SAN debe iniciar con HEC para Ecuador";
  if ((pais === "peru" || pais === "perú") && !valStr.startsWith("HPE")) return "El SAN debe iniciar con HPE para Perú";
  return true;
      }
    },
    {
      name: "medio_comunicacion",
      label: "Medio de comunicación",
      type: "select",
      required: true,
      options: [
        { label: "Llamada telefónica", value: "llamada" },
        { label: "Gestión WhatsApp", value: "whatsapp" },
        { label: "Gestión correo", value: "correo" },
        { label: " Correo electrónico", value: "correoe" }
      ]
    },
    {
      name: "tipo_asignacion",
      label: "Tipo asignación",
      type: "select",
      required: true,
      options: [
        { label: "Terminación programada", value: "terminacion" },
        { label: "Winback", value: "winback" },
        { label: "Entrante", value: "entrante" },
        { label: "Asignado por correo", value: "correo" },
        { label: "Asignado por cartera", value: "cartera" },
        { label: "Consideraciones", value: "consideraciones" },
        { label: "PQR", value: "pqr" },
        { label: "Llamadas de TP", value: "llamadas_tp" }
      ]
    },
    {
      name: "motivo_cancelacion",
      label: "Motivo de cancelación del cliente",
      type: "select",
      required: true,
      options: [
        { label: "Dificultades financieras", value: "financieras" },
        { label: "Falla velocidad", value: "velocidad" },
        { label: "Cobertura", value: "cobertura" },
        { label: "Inconformidad con las facturas", value: "facturas" },
        { label: "Retoma presencialidad", value: "retoma_presencialidad" },
        { label: "Cliente fallecido", value: "fallecido" },
        { label: "Finalizó proyecto y no requiere servicio", value: "fin_proyecto" },
        { label: "Cliente se va del país", value: "se_va_pais" },
        { label: "Cambio de proveedor", value: "proveedor" },
        { label: "Cancelación de uno de sus servicios", value: "cancela_servicio" },
        { label: "Servicio no suple sus necesidades", value: "no_suple_necesidades" },
        { label: "Tercero responsable del pago", value: "tercero_pago" },
        { label: "Orden publico", value: "orden_publico" },
        { label: "No necesita el servicio", value: "no_necesita" },
        { label: "Cambio de residencia", value: "residencia" },
        { label: "Incumplimiento de la matriz de retención", value: "incumple_matriz" },
        { label: "Inconformidad con el servicio", value: "inconformidad_servicio" },
        { label: "Daños en el sector", value: "danos_sector" },
        { label: "Intermitencia en el servicio", value: "intermitencia" },
        { label: "No aplica", value: "na" }
      ],
      description: "Recuerden que al tener contacto directo con el cliente es muy importante identificar el motivo de su cancelación, ya que esta información será un insumo muy importante para desarrollar la llamada (en caso de no lograr contacto con el cliente simplemente seleccionamos NO APLICA)"
    },
    {
      name: "codigo_gestion",
      label: "Código gestión",
      type: "select",
      required: true,
      options: [
        { label: "Retención", value: "retencion" },
        { label: "No acepta retención", value: "no_acepta" },
        { label: "Cliente ya retenido", value: "ya_retenido" },
        { label: "Posible retención", value: "posible_retencion" },
        { label: "Volver a llamar", value: "volver_llamar" },
        { label: "Mensaje tercero", value: "mensaje_tercero" },
        { label: "Cliente no solicita cancelación", value: "no_solicita_cancelacion" },
        { label: "Cliente notifica recogieron los equipos", value: "notifica_recogieron_equipos" },
        { label: "Mensaje de voz", value: "mensaje_voz" },
        { label: "Fuera de servicio", value: "fuera_servicio" },
        { label: "Numero equivocado", value: "numero_equivocado" },
        { label: "Cliente fallecido", value: "fallecido" },
        { label: "Posible fraude", value: "posible_fraude" },
        { label: "SAN inactiva", value: "san_inactiva" },
        { label: "Cliente activado por campaña CHURN", value: "activado_churn" },
        { label: "No contesta", value: "no_contesta" },
        { label: "Colgó", value: "colgo" },
        { label: "No se gestiona por cancelación autorizada", value: "no_gestiona_cancelacion_autorizada" },
        { label: "Cliente no apto para retener", value: "no_apto_retener" },
        { label: "No brinda DNI", value: "no_brinda_dni" },
        { label: "Retención oferta especial Winback", value: "oferta_especial_winback" },
        { label: "Gestión WhatsApp", value: "gestion_whatsapp" },
        { label: "Cliente nuevo", value: "cliente_nuevo" },
        { label: "Envio de correo", value: "envio_correo" }
      ]
    },
    
    {
      name: "matriz_retencion_info",
      label: "Si cliente acepta retención",
      type: "info",
      required: true,
      description: "Recuerde que debe seleccionar la opción de retención que más se ajuste a la situación del cliente.",
      showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
    },
    {
      name: "matriz_retencion",
      label: "Matriz de retención",
      type: "select",
      required: true,
      options: [
        { label: "Descuentos escalonados", value: "descuentos_escalonados" },
        { label: "Descuento del 50% sobre la factura", value: "descuento_50" },
        { label: "Ajuste facturación", value: "ajuste_facturacion" },
        { label: "Cambio de plan", value: "cambio_plan" },
        { label: "Visita técnica", value: "visita_tecnica" },
        { label: "Educación del servicio", value: "educacion_servicio" },
        { label: "Traslado", value: "traslado" },
        { label: "Cesión", value: "cesion" },
        { label: "Token", value: "token" },
        { label: "Suspensión temporal", value: "suspension_temporal" }
      ],
      showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
    },
    {
      name: "descuentos_escalonados_info",
      label: "Descuentos escalonados",
      type: "info",
      required: true,
      description: "Si el cliente aceptó descuento, por favor indique cuál fue el aceptado.",
      showIf: { matriz_retencion: "descuentos_escalonados" }
    },
    {
      name: "descuento_otorgado",
      label: "Descuento otorgado",
      type: "select",
      required: true,
      options: [
        { label: "39.000", value: "39000" },
        { label: "58.500", value: "58500" },
        { label: "78.000", value: "78000" },
        { label: "90.000", value: "90000" }
      ],
      showIf: { matriz_retencion: "descuentos_escalonados" }
    },
    {
      name: "meses_descuento",
      label: "¿Por cuántos meses fue otorgado este descuento?",
      type: "select",
      required: true,
      options: [
        { label: "3", value: "3" },
        { label: "6", value: "6" },
        { label: "9", value: "9" },
        { label: "12", value: "12" }
      ],
      showIf: { matriz_retencion: "descuentos_escalonados" }
    },
    {
      name: "cambio_plan_info",
      label: "Cambio de plan",
      type: "info",
      required: true,
      description: "Esta opción la usaremos cuando se realice alguna modificación en el plan que se tenga.",
      showIf: { matriz_retencion: "cambio_plan" }
    },
    {
      name: "beneficio_plan",
      label: "Beneficio brindado para el plan",
      type: "select",
      required: true,
      options: [
        { label: "Aumento del plan mismo costo", value: "aumento_mismo_costo" },
        { label: "Aumento del plan con incremento de factura", value: "aumento_con_incremento" },
        { label: "Disminuir el plan", value: "disminuir_plan" }
      ],
      showIf: { matriz_retencion: "cambio_plan" }
    },
    {
      name: "motivo_no_acepta",
      label: "Motivo por el cual no acepta retención",
      type: "select",
      required: true,
      options: [
        { label: "Disminución de ingresos", value: "disminucion_ingresos" },
        { label: "Incumplimiento de la matriz de retención", value: "incumplimiento_matriz" },
        { label: "Inconformidad con el servicio", value: "inconformidad_servicio" },
        { label: "Ofertas no son llamativas", value: "ofertas_no_llamativas" },
        { label: "Cambio proveedor", value: "cambio_proveedor" },
        { label: "Venta de la propiedad", value: "venta_propiedad" },
        { label: "Visita técnica incumplida", value: "visita_incumplida" },
        { label: "Orden publico", value: "orden_publico" },
        { label: "Cambio de residencia a zona rural", value: "residencia_rural" },
        { label: "Cambio de residencia a zona urbana", value: "residencia_urbana" },
        { label: "Se va del pais", value: "se_va_pais" },
        { label: "Daños en el sector", value: "danos_sector" },
        { label: "Finalizó proyecto y ya no requiere el servicio", value: "fin_proyecto" },
        { label: "Tercero responsable del pago", value: "tercero_pago" }
      ],
      showIf: { codigo_gestion: "no_acepta" }
    },
    {
      name: "sustituye_servicio",
      label: "¿Con qué va a sustituir su servicio de internet?",
      type: "text",
      required: true,
      description: "La idea con esta pregunta es que indaguemos con qué va reemplazar el internet, ya que no nos aceptó la retención y desea retirar el servicio.",
      showIf: { codigo_gestion: "no_acepta" }
    },
    {
      name: "cierre_llamada_info_no_acepta",
      label: "Cierre de la llamada",
      type: "info",
      required: true,
      description: "Si se tuvo contacto directo con el cliente, independientemente de si aceptó o no la retención, llene la siguiente información.",
      showIf: (values) => values.codigo_gestion === "no_acepta"
    },
    {
      name: "linea_principal_no_acepta",
      label: "Línea principal del cliente donde se tuvo contacto",
      type: "text",
      required: true,
      showIf: (values) => values.codigo_gestion === "no_acepta"
    },
    {
      name: "actualiza_datos_no_acepta",
      label: "¿Actualiza datos?",
      type: "select",
      required: true,
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" }
      ],
      showIf: (values) => values.codigo_gestion === "no_acepta"
    },
    {
      name: "recomienda_hughesnet_no_acepta",
      label: "¿Recomendaría Hughesnet?",
      type: "select",
      required: true,
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" }
      ],
      showIf: (values) => values.codigo_gestion === "no_acepta"
    },
    {
      name: "mejor_horario_no_acepta",
      label: "Mejor horario para atendernos",
      type: "select",
      required: true,
      options: [
        { label: "En la mañana", value: "manana" },
        { label: "En la tarde", value: "tarde" },
        { label: "En la noche", value: "noche" }
      ],
      showIf: (values) => values.codigo_gestion === "no_acepta"
    },
    {
      name: "medio_contacto_futuro_no_acepta",
      label: "¿Cuál es el medio más efectivo para tener contacto a futuro?",
      type: "select",
      required: true,
      options: [
        { label: "Telefónico", value: "telefonico" },
        { label: "Whatsapp", value: "whatsapp" },
        { label: "Correo electrónico", value: "correo" }
      ],
      showIf: (values) => values.codigo_gestion === "no_acepta"
    },


    {
      name: "debito_automatico_info",
      label: "Aviso débito automático",
      type: "info",
      required: true,
      description: "Recuerde informar al cliente que si tiene débito automático, debe verificar que la retención se aplique correctamente en su próxima factura.",
      showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
    },
    {
      name: "debito_automatico",
      label: "¿Cliente tiene débito automático?",
      type: "select",
      required: true,
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" }
      ],
      showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
    },




    
    {
      name: "cierre_llamada_info",
      label: "Cierre de la llamada",
      type: "info",
      required: true,
      description: "Si se tuvo contacto directo con el cliente, independientemente de si aceptó o no la retención, llene la siguiente información.",
      showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
  },
    {
      name: "linea_principal",
      label: "Línea principal del cliente donde se tuvo contacto",
      type: "text",
      required: true,
      showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
  },
    {
      name: "actualiza_datos",
      label: "¿Actualiza datos?",
      type: "select",
      required: true,
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" }
      ],
      showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
  },
    {
      name: "recomienda_hughesnet",
      label: "¿Recomendaría Hughesnet?",
      type: "select",
      required: true,
      options: [
        { label: "Sí", value: "si" },
        { label: "No", value: "no" }
      ],
      showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
  },
    {
      name: "mejor_horario",
      label: "Mejor horario para atendernos",
      type: "select",
      required: true,
      options: [
        { label: "En la mañana", value: "manana" },
        { label: "En la tarde", value: "tarde" },
        { label: "En la noche", value: "noche" }
      ],
      showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
  },
    {
      name: "medio_contacto_futuro",
      label: "¿Cuál es el medio más efectivo para tener contacto a futuro?",
      type: "select",
      required: true,
      options: [
        { label: "Telefónico", value: "telefonico" },
        { label: "Whatsapp", value: "whatsapp" },
        { label: "Correo electrónico", value: "correo" }
      ],
      showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
  },


    {
  name: "resultado_gestion_info",
  label: "Resultado de la gestión",
  type: "info",
  required: true,
  description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros).",
  showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
},
{
  name: "resumen_gestion",
  label: "Resumen de la gestión",
  type: "text",
  required: true,
  description: "Redacta aquí el resumen completo de la gestión realizada.",
  showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
},
{
  name: "fecha_proxima_gestion",
  label: "Fecha próxima gestión",
  type: "date",
  required: true,
  showIf: (values) => values.codigo_gestion === "retencion" || values.codigo_gestion === "oferta_especial_winback"
},

    
    {
      name: "resultado_gestion_info",
      label: "Resultado de la gestión",
      type: "info",
      required: true,
      description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros).",
      showIf: (values) => values.codigo_gestion && values.codigo_gestion !== "retencion" && values.codigo_gestion !== "oferta_especial_winback"
    },
    {
      name: "resumen_gestion",
      label: "Resumen de la gestión",
      type: "text",
      required: true,
      description: "Redacta aquí el resumen completo de la gestión realizada.",
      showIf: (values) => values.codigo_gestion && values.codigo_gestion !== "retencion" && values.codigo_gestion !== "oferta_especial_winback"
    },
    {
      name: "fecha_proxima_gestion",
      label: "Fecha próxima gestión",
      type: "date",
      required: true,
      showIf: (values) => values.codigo_gestion && values.codigo_gestion !== "retencion" && values.codigo_gestion !== "oferta_especial_winback"
    },
  ]
};
