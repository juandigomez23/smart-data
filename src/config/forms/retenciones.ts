// Archivo unificado para el formulario de retenciones de todos los países

import { FormConfig } from "@/components/formgenerator";

export const retencionesForm: FormConfig = {
  title: "Retenciones",
  tipo: "retenciones",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text", required: true, auto: true },
    { name: "san", label: "SAN", type: "text", required: true },
    {
      name: "medio_comunicacion",
      label: "Medio de comunicación",
      type: "select",
      required: true,
      options: [
        { label: "Llamada telefónica", value: "llamada" },
        { label: "Gestión WhatsApp", value: "whatsapp" },
        { label: "Gestión correo", value: "correo" }
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
      ],
      conditionalFields: [

        {
  condition: { field: "codigo_gestion", value: "posible_retencion" },
  fields: [
    {
      name: "resultado_gestion_info",
      label: "Resultado de la gestión",
      type: "info",
      description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
    },
    {
      name: "resumen_gestion",
      label: "Resumen de la gestión",
      type: "text",
      description: "Redacta aquí el resumen completo de la gestión realizada."
    },
    {
      name: "fecha_proxima_gestion",
      label: "Fecha próxima gestión",
      type: "date"
    }
  ]
},

        {
          condition: { field: "codigo_gestion", value: "retencion" },
          fields: [
            {
              name: "matriz_retencion_info",
              label: "Si cliente acepta retención",
              type: "info",
              description: "Recuerde que debe seleccionar la opción de retención que más se ajuste a la situación del cliente."
            },
            {
              name: "matriz_retencion",
              label: "Matriz de retención",
              type: "select",
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
              conditionalFields: [
                {
                  condition: { field: "matriz_retencion", value: "descuentos_escalonados" },
                  fields: [
                    {
                      name: "descuentos_escalonados_info",
                      label: "Descuentos escalonados",
                      type: "info",
                      description: "Si el cliente aceptó descuento, por favor indique cuál fue el aceptado."
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
                      ]
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
                      ]
                    }
                  ]
                },
                {
                  condition: { field: "matriz_retencion", value: "cambio_plan" },
                  fields: [
                    {
                      name: "cambio_plan_info",
                      label: "Cambio de plan",
                      type: "info",
                      description: "Esta opción la usaremos cuando se realice alguna modificación en el plan que se tenga."
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
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: "debito_automatico_info",
              label: "Débito automático",
              type: "info",
              description: "Es importante explicar esta alternativa, brindar los beneficios a obtener en caso de aceptar y ser muy comerciales en el momento de hacerlo."
            },
            {
              name: "debito_automatico",
              label: "¿Acepta débito automático?",
              type: "select",
              options: [
                { label: "Sí", value: "si" },
                { label: "No", value: "no" }
              ]
            },
            {
              name: "cierre_llamada_info",
              label: "Cierre de la llamada",
              type: "info",
              description: "Si se tuvo contacto directo con el cliente, independientemente de si aceptó o no la retención, llene la siguiente información."
            },
            {
              name: "linea_principal",
              label: "Línea principal del cliente donde se tuvo contacto",
              type: "text"
            },
            {
              name: "actualiza_datos",
              label: "¿Actualiza datos?",
              type: "select",
              options: [
                { label: "Sí", value: "si" },
                { label: "No", value: "no" }
              ]
            },
            {
              name: "recomienda_hughesnet",
              label: "¿Recomendaría Hughesnet?",
              type: "select",
              options: [
                { label: "Sí", value: "si" },
                { label: "No", value: "no" }
              ]
            },
            {
              name: "mejor_horario",
              label: "Mejor horario para atendernos",
              type: "select",
              options: [
                { label: "En la mañana", value: "manana" },
                { label: "En la tarde", value: "tarde" },
                { label: "En la noche", value: "noche" }
              ]
            },
            {
              name: "medio_contacto_futuro",
              label: "¿Cuál es el medio más efectivo para tener contacto a futuro?",
              type: "select",
              options: [
                { label: "Telefónico", value: "telefonico" },
                { label: "Whatsapp", value: "whatsapp" },
                { label: "Correo electrónico", value: "correo" }
              ]
            },
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },


        {
  condition: { field: "codigo_gestion", value: "ya_retenido" },
  fields: [
    {
      name: "resultado_gestion_info",
      label: "Resultado de la gestión",
      type: "info",
      description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
    },
    {
      name: "resumen_gestion",
      label: "Resumen de la gestión",
      type: "text",
      description: "Redacta aquí el resumen completo de la gestión realizada."
    },
    {
      name: "fecha_proxima_gestion",
      label: "Fecha próxima gestión",
      type: "date"
    }
  ]
},


        {
          condition: { field: "codigo_gestion", value: "oferta_especial_winback" },
          fields: [
            {
              name: "matriz_retencion_info",
              label: "Si cliente acepta retención",
              type: "info",
              description: "Recuerde que debe seleccionar la opción de retención que más se ajuste a la situación del cliente."
            },
            {
              name: "matriz_retencion",
              label: "Matriz de retención",
              type: "select",
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
              conditionalFields: [
                {
                  condition: { field: "matriz_retencion", value: "descuentos_escalonados" },
                  fields: [
                    {
                      name: "descuentos_escalonados_info",
                      label: "Descuentos escalonados",
                      type: "info",
                      description: "Si el cliente aceptó descuento, por favor indique cuál fue el aceptado."
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
                      ]
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
                      ]
                    }
                  ]
                },
                {
                  condition: { field: "matriz_retencion", value: "cambio_plan" },
                  fields: [
                    {
                      name: "cambio_plan_info",
                      label: "Cambio de plan",
                      type: "info",
                      description: "Esta opción la usaremos cuando se realice alguna modificación en el plan que se tenga."
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
                      ]
                    }
                  ]
                }
              ]
            },
            {
              name: "debito_automatico_info",
              label: "Débito automático",
              type: "info",
              description: "Es importante explicar esta alternativa, brindar los beneficios a obtener en caso de aceptar y ser muy comerciales en el momento de hacerlo."
            },
            {
              name: "debito_automatico",
              label: "¿Acepta débito automático?",
              type: "select",
              options: [
                { label: "Sí", value: "si" },
                { label: "No", value: "no" }
              ]
            },
            {
              name: "cierre_llamada_info",
              label: "Cierre de la llamada",
              type: "info",
              description: "Si se tuvo contacto directo con el cliente, independientemente de si aceptó o no la retención, llene la siguiente información."
            },
            {
              name: "linea_principal",
              label: "Línea principal del cliente donde se tuvo contacto",
              type: "text"
            },
            {
              name: "actualiza_datos",
              label: "¿Actualiza datos?",
              type: "select",
              options: [
                { label: "Sí", value: "si" },
                { label: "No", value: "no" }
              ]
            },
            {
              name: "recomienda_hughesnet",
              label: "¿Recomendaría Hughesnet?",
              type: "select",
              options: [
                { label: "Sí", value: "si" },
                { label: "No", value: "no" }
              ]
            },
            {
              name: "mejor_horario",
              label: "Mejor horario para atendernos",
              type: "select",
              options: [
                { label: "En la mañana", value: "manana" },
                { label: "En la tarde", value: "tarde" },
                { label: "En la noche", value: "noche" }
              ]
            },
            {
              name: "medio_contacto_futuro",
              label: "¿Cuál es el medio más efectivo para tener contacto a futuro?",
              type: "select",
              options: [
                { label: "Telefónico", value: "telefonico" },
                { label: "Whatsapp", value: "whatsapp" },
                { label: "Correo electrónico", value: "correo" }
              ]
            },
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "no_acepta" },
          fields: [
            {
              name: "no_acepta_info",
              label: "Si cliente no acepta retención",
              type: "info",
              description: "Recuerden que el cliente puede tener varios motivos por los cuales no nos acepte la retención, pero en esta oportunidad vamos a seleccionar la de mayor relevancia (Los demás motivos los especificamos en las observaciones)"
            },
            {
              name: "motivo_no_acepta",
              label: "Motivo por el cual no acepta retención",
              type: "select",
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
                { label: "Finalizo proyecto y ya no requiere el servicio", value: "fin_proyecto" },
                { label: "Tercero responsable del pago", value: "tercero_pago" }
              ]
            },
            {
              name: "sustituye_servicio",
              label: "¿Con qué va a sustituir su servicio de internet?",
              type: "text",
              description: "La idea con esta pregunta es que indaguemos con qué va reemplazar el internet, ya que no nos aceptó la retención y desea retirar el servicio."
            },
            {
              name: "cierre_llamada_info",
              label: "Cierre de la llamada",
              type: "info",
              description: "Si se tuvo contacto directo con el cliente, independientemente de si aceptó o no la retención, llene la siguiente información."
            },
            {
              name: "linea_principal",
              label: "Línea principal del cliente donde se tuvo contacto",
              type: "text"
            },
            {
              name: "actualiza_datos",
              label: "¿Actualiza datos?",
              type: "select",
              options: [
                { label: "Sí", value: "si" },
                { label: "No", value: "no" }
              ]
            },
            {
              name: "recomienda_hughesnet",
              label: "¿Recomendaría Hughesnet?",
              type: "select",
              options: [
                { label: "Sí", value: "si" },
                { label: "No", value: "no" }
              ]
            },
            {
              name: "mejor_horario",
              label: "Mejor horario para atendernos",
              type: "select",
              options: [
                { label: "En la mañana", value: "manana" },
                { label: "En la tarde", value: "tarde" },
                { label: "En la noche", value: "noche" }
              ]
            },
            {
              name: "medio_contacto_futuro",
              label: "¿Cuál es el medio más efectivo para tener contacto a futuro?",
              type: "select",
              options: [
                { label: "Telefónico", value: "telefonico" },
                { label: "Whatsapp", value: "whatsapp" },
                { label: "Correo electrónico", value: "correo" }
              ]
            },
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "volver_llamar" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "mensaje_tercero" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "no_solicita_cancelacion" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "notifica_recogieron_equipos" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "mensaje_voz" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "fuera_servicio" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "numero_equivocado" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "fallecido" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "posible_fraude" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "activado_churn" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "no_contesta" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "colgo" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "gestion_whatsapp" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
          condition: { field: "codigo_gestion", value: "cliente_nuevo" },
          fields: [
            {
              name: "resultado_gestion_info",
              label: "Resultado de la gestión",
              type: "info",
              description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
            },
            {
              name: "resumen_gestion",
              label: "Resumen de la gestión",
              type: "text",
              description: "Redacta aquí el resumen completo de la gestión realizada."
            },
            {
              name: "fecha_proxima_gestion",
              label: "Fecha próxima gestión",
              type: "date"
            }
          ]
        },
        {
  condition: { field: "codigo_gestion", value: "san_inactiva" },
  fields: [
    {
      name: "resultado_gestion_info",
      label: "Resultado de la gestión",
      type: "info",
      description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
    },
    {
      name: "resumen_gestion",
      label: "Resumen de la gestión",
      type: "text",
      description: "Redacta aquí el resumen completo de la gestión realizada."
    },
    {
      name: "fecha_proxima_gestion",
      label: "Fecha próxima gestión",
      type: "date"
    }
  ]
},
{
  condition: { field: "codigo_gestion", value: "no_gestiona_cancelacion_autorizada" },
  fields: [
    {
      name: "resultado_gestion_info",
      label: "Resultado de la gestión",
      type: "info",
      description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
    },
    {
      name: "resumen_gestion",
      label: "Resumen de la gestión",
      type: "text",
      description: "Redacta aquí el resumen completo de la gestión realizada."
    },
    {
      name: "fecha_proxima_gestion",
      label: "Fecha próxima gestión",
      type: "date"
    }
  ]
},
{
  condition: { field: "codigo_gestion", value: "no_apto_retener" },
  fields: [
    {
      name: "resultado_gestion_info",
      label: "Resultado de la gestión",
      type: "info",
      description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
    },
    {
      name: "resumen_gestion",
      label: "Resumen de la gestión",
      type: "text",
      description: "Redacta aquí el resumen completo de la gestión realizada."
    },
    {
      name: "fecha_proxima_gestion",
      label: "Fecha próxima gestión",
      type: "date"
    }
  ]
},
{
  condition: { field: "codigo_gestion", value: "no_brinda_dni" },
  fields: [
    {
      name: "resultado_gestion_info",
      label: "Resultado de la gestión",
      type: "info",
      description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
    },
    {
      name: "resumen_gestion",
      label: "Resumen de la gestión",
      type: "text",
      description: "Redacta aquí el resumen completo de la gestión realizada."
    },
    {
      name: "fecha_proxima_gestion",
      label: "Fecha próxima gestión",
      type: "date"
    }
  ]
},
{
  condition: { field: "codigo_gestion", value: "envio_correo" },
  fields: [
    {
      name: "resultado_gestion_info",
      label: "Resultado de la gestión",
      type: "info",
      description: "Seamos muy detallistas en el momento de redactar la gestión, no olviden que esta información es vital para HughesNet (Número de contacto donde logramos ubicar el cliente, persona encargada de los pagos, beneficios otorgados, horarios donde nos podemos comunicar, motivo de cancelación, entre otros)."
    },
    {
      name: "resumen_gestion",
      label: "Resumen de la gestión",
      type: "text",
      description: "Redacta aquí el resumen completo de la gestión realizada."
    },
    {
      name: "fecha_proxima_gestion",
      label: "Fecha próxima gestión",
      type: "date"
    }
  ]
},
      ]
    },
  ]
};
