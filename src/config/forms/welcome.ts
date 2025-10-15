import { FormConfig } from "@/components/formgenerator";
export const welcomeForm: FormConfig = {
  title: "Welcome",
  tipo: "welcome",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text", required: true, auto: true },
{ name: "san", label: "SAN", type: "text", required: true },
{ name: "pais", label: "País", type: "select", required: true, options: [
  { label: "Colombia", value: "colombia" },
  { label: "Chile", value: "chile" },
  { label: "Ecuador", value: "ecuador" },
  { label: "Perú", value: "peru" },
] },
    { name: "avis_peru_inicio", label: "Perú inicio de gestión", type: "info", showIf: { pais: "peru" } },

    { name: "tipo_servicio_peru", label: "Tipo de servicio Perú", type: "select", showIf: { pais: "peru" }, options: [
      { label: "Persona natural", value: "natural" },
      { label: "PYME", value: "pyme" }
    ] },
    { name: "medio_contacto_peru", label: "Medio de contacto Perú", type: "select", showIf: { pais: "peru" }, options: [
      { label: "Estaqueue", value: "estaqueue" },
      { label: "WhatsApp", value: "whatsapp" },
      { label: "No se realiza llamada", value: "no_llamada" }
    ] },
    { name: "md_peru", label: "MD Perú", type: "select", showIf: { pais: "peru" }, options: [
      { label: "SATELITAL PERÚ", value: "satelital_peru" },
      { label: "FORTEL CC", value: "fortel_cc" },
      { label: "TVOLUTION", value: "tvolution" },
      { label: "VIATEK PERÚ", value: "viatek_peru" },
      { label: "GLOBAL LIMA", value: "global_lima" },
      { label: "SICOM", value: "sicom" },
      { label: "OBREX", value: "obrex" },
      { label: "BACKOFFICE LIMA", value: "backoffice_lima" },
      { label: "WINBACK PERÚ", value: "winback_peru" },
      { label: "FANERO", value: "fanero" },
      { label: "J&C SOLUCIONES", value: "jc_soluciones" },
      { label: "NOVOA COMPANY", value: "novoa_company" },
      { label: "DORIS SALDIVAR", value: "doris_saldivar" },
      { label: "INTERNET SATELITAL E.I.R.L", value: "internet_satelital_eirl" },
      { label: "ADSYSTEL PYME RETAIL", value: "adsystel_pyme_retail" },
      { label: "MIDMARKET", value: "midmarket" },
      { label: "HAM&MA PERÚ STOF PERÚ", value: "hamma_peru_stof_peru" }
    ] },
    { name: "san_seguimiento_peru", label: "SAN de seguimiento?", type: "select", showIf: { pais: "peru" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" }
    ] },
    { name: "pago_primer_recibo_peru", label: "¿Pagó el 1er recibo? Perú", type: "select", showIf: { pais: "peru" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" }
    ] },
    { name: "satisfecho_servicio_peru", label: "¿Se encuentra satisfecho con el servicio? Perú", type: "select", showIf: { pais: "peru" }, options: [
      
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "Aun no ha usado el servicio", value: "no_usado" },
      { label: "No se logra contacto", value: "no_contacto" },
      { label: "No se realiza la llamada", value: "no_llamada" },
      { label: "Seguimiento", value: "seguimiento" },
      { label: "Mensaje con tercero", value: "mensaje_tercero" }
    ] },
    
       { name: "info_no_satisfecho_peru", label: "No está satisfecho con el servicio", type: "info", showIf: { pais: "peru", satisfecho_servicio_peru: "no" } },
     
      { name: "motivo_no_satisfecho_peru", label: "Indique el/los motivos por los cuales no se encuentra satisfecho con el servicio, Perú", type: "select", showIf: { pais: "peru", satisfecho_servicio_peru: "no" }, options: [
      { label: "Es muy intermitente", value: "intermitente" },
      { label: "Actualmente no tiene internet", value: "sin_internet" },
      { label: "Su plan se consumió muy rápido", value: "plan_rapido" },
      { label: "Tiene mala cobertura", value: "mala_cobertura" },
      { label: "No le funciona para videoconferencias", value: "no_videoconferencias" },
      { label: "No le funciona para juegos en línea", value: "no_juegos" },
      { label: "Solo contrató para plataformas de Streaming y no le funciona", value: "no_streaming" },
      { label: "No le funciona para VPN", value: "no_vpn" },
      { label: "No le funciona para cámaras IPV4", value: "no_camaras_ipv4" },
      { label: "No le ha funcionado desde la instalación", value: "no_funciona_desde_instalacion" },
      { label: "No tenía conocimiento del plan (valores, pago anticipado, entre otras)", value: "no_conocimiento_plan" },
      { label: "Le brindaron mal servicio al cliente", value: "mal_servicio_cliente" },
      { label: "No tuvo servicio y solicita descuento por días sin consumo", value: "descuento_sin_consumo" },
      { label: "Novedad/caso especial", value: "novedad" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "escala_soporte_peru", label: "¿Se escala a soporte técnico?", type: "select", showIf: { pais: "peru", satisfecho_servicio_peru: "no" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "continuar_servicio_peru", label: "¿Desea continuar con el servicio?", type: "select", showIf: { pais: "peru", satisfecho_servicio_peru: "no" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "No aplica", value: "no_aplica" }
      
    ] },

    { name: "info_satisfecho_peru", label: "Si está satisfecho con el servicio y desea continuar", type: "info", showIf: { pais: "peru", satisfecho_servicio_peru: "si" } },
     
      { name: "uso_servicio_peru_continuar", label: "¿Qué uso le da al servicio? Perú", type: "select", showIf: { pais: "peru", continuar_servicio_peru: "si" }, options: [
      { label: "Estudiar", value: "estudiar" },
      { label: "Trabajar", value: "trabajar" },
      { label: "Redes sociales", value: "redes" },
      { label: "Camaras de seguridad", value: "camaras" },
      { label: "Comunicación", value: "comunicacion" },
      { label: "Diversión (Netflix, videos, juegos)", value: "diversion" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "cuando_pago_peru_continuar", label: "¿Cuénteme para cuando va a realizar el pago?", type: "select", showIf: { pais: "peru", continuar_servicio_peru: "si" }, options: [
      { label: "Hoy realizo el pago", value: "hoy" },
      { label: "Lo realizaré en el próximo corte", value: "proximo_corte" },
      { label: "Lo realizaré la próxima semana", value: "proxima_semana" },
      { label: "Ya realizo el pago", value: "ya_pago" },
      { label: "Mes gratis", value: "mes_gratis" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "medio_pago_peru_continuar", label: "¿De qué forma pagó o pagará su recibo? Perú", type: "select", showIf: { pais: "peru", continuar_servicio_peru: "si" }, options: [
      { label: "BCP", value: "bcp" },
      { label: "BBVA", value: "bbva" },
      { label: "Banco Nacional", value: "banco_nacional" },
      { label: "Agente Cash", value: "agente_cash" },
      { label: "Pago en efectivo", value: "efectivo" },
      { label: "Debito automático", value: "debito_automatico" },
      { label: "No aplica", value: "no_aplica" },
      { label: "Yape", value: "yape" },
      { label: "InterBank", value: "interbank" }
    ] },
    { name: "fecha_pago_peru_continuar", label: "Si el cliente NO ha realizado el pago, confirmar ¿Qué día va a pagar? (fecha)", type: "date", showIf: { pais: "peru", continuar_servicio_peru: "si", cuando_pago_peru_continuar: "hoy" } },
    { name: "acepta_debito_peru_continuar", label: "¿Acepta débito automático?", type: "select", showIf: { pais: "peru", continuar_servicio_peru: "si" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "Ya está inscrito al débito automático", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "como_debito_peru_continuar_si", label: "Si el cliente aceptó el débito, seleccione de que manera se realizó o realizará el proceso", type: "select", showIf: { pais: "peru", continuar_servicio_peru: "si", acepta_debito_peru_continuar: "si" }, options: [
      { label: "En línea (a través de la app o portal)", value: "en_linea" },
      { label: "Se transfiere al IVR", value: "ivr" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "No aceptó", value: "no_acepto" },
      { label: "Ya está inscrito al debito automático", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "como_debito_peru_continuar_inscrito", label: "Si el cliente aceptó el débito, seleccione de que manera se realizó o realizará el proceso", type: "select", showIf: { pais: "peru", continuar_servicio_peru: "si", acepta_debito_peru_continuar: "inscrito" }, options: [
      { label: "En línea (a través de la app o portal)", value: "en_linea" },
      { label: "Se transfiere al IVR", value: "ivr" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "No aceptó", value: "no_acepto" },
      { label: "Ya está inscrito al debito automático", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "motivo_no_debito_peru_continuar", label: "Si la respuesta es NO indague el motivo por el cuál no está interesado", type: "select", showIf: { pais: "peru", continuar_servicio_peru: "si", acepta_debito_peru_continuar: "no" }, options: [
      { label: "Si aceptó", value: "si_acepto" },
      { label: "No tiene tarjeta", value: "no_tarjeta" },
      { label: "No tiene tarjeta", value: "no_tarjeta2" },
      { label: "No tiene tarjeta crédito sino debito", value: "solo_debito" },
      { label: "No tiene cupo en la tarjeta", value: "sin_cupo" },
      { label: "Prefiere pagar por otro medio", value: "otro_medio" },
      { label: "No cree en los beneficios (desconfía)", value: "desconfia" },
      { label: "El proceso es complejo", value: "complejo" },
      { label: "Tienen la tarjeta bloqueada", value: "bloqueada" },
      { label: "No sabe manejar la tarjeta", value: "no_sabe" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "uso_servicio_peru", label: "¿Qué uso le da al servicio? Perú", type: "select", showIf: { pais: "peru", satisfecho_servicio_peru: "si" }, options: [
      { label: "Estudiar", value: "estudiar" },
      { label: "Trabajar", value: "trabajar" },
      { label: "Redes sociales", value: "redes" },
      { label: "Camaras de seguridad", value: "camaras" },
      { label: "Comunicación", value: "comunicacion" },
      { label: "Diversión (Netflix, videos, juegos)", value: "diversion" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "cuando_pago_peru", label: "¿Cuénteme para cuando va a realizar el pago?", type: "select", showIf: { pais: "peru", satisfecho_servicio_peru: "si" }, options: [
      { label: "Hoy realizo el pago", value: "hoy" },
      { label: "Lo realizaré en el próximo corte", value: "proximo_corte" },
      { label: "Lo realizaré la próxima semana", value: "proxima_semana" },
      { label: "Ya realizo el pago", value: "ya_pago" },
      { label: "Mes gratis", value: "mes_gratis" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "medio_pago_peru", label: "¿De qué forma pagó o pagará su recibo? Perú", type: "select", showIf: { pais: "peru", satisfecho_servicio_peru: "si" }, options: [
      { label: "BCP", value: "bcp" },
      { label: "BBVA", value: "bbva" },
      { label: "Banco Nacional", value: "banco_nacional" },
      { label: "Agente Cash", value: "agente_cash" },
      { label: "Pago en efectivo", value: "efectivo" },
      { label: "Debito automático", value: "debito_automatico" },
      { label: "No aplica", value: "no_aplica" },
      { label: "Yape", value: "yape" },
      { label: "InterBank", value: "interbank" }
    ] },
    { name: "fecha_pago_peru", label: "Si el cliente NO ha realizado el pago, confirmar ¿Qué día va a pagar? (fecha)", type: "date", showIf: { pais: "peru", satisfecho_servicio_peru: "si", cuando_pago_peru: "hoy" } },
    { name: "acepta_debito_peru", label: "¿Acepta débito automático?", type: "select", showIf: { pais: "peru", satisfecho_servicio_peru: "si" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "Ya está inscrito al débito automático", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "como_debito_peru_si", label: "Si el cliente aceptó el débito, seleccione de que manera se realizó o realizará el proceso", type: "select", showIf: { pais: "peru", satisfecho_servicio_peru: "si", acepta_debito_peru: "si" }, options: [
      { label: "En línea (a través de la app o portal)", value: "en_linea" },
      { label: "Se transfiere al IVR", value: "ivr" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "No aceptó", value: "no_acepto" },
      { label: "Ya está inscrito al debito automático", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "como_debito_peru_inscrito", label: "Si el cliente aceptó el débito, seleccione de que manera se realizó o realizará el proceso", type: "select", showIf: { pais: "peru", satisfecho_servicio_peru: "si", acepta_debito_peru: "inscrito" }, options: [
      { label: "En línea (a través de la app o portal)", value: "en_linea" },
      { label: "Se transfiere al IVR", value: "ivr" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "No aceptó", value: "no_acepto" },
      { label: "Ya está inscrito al debito automático", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "motivo_no_debito_peru", label: "Si la respuesta es NO indague el motivo por el cuál no está interesado", type: "select", showIf: { pais: "peru", satisfecho_servicio_peru: "si", acepta_debito_peru: "no" }, options: [
      { label: "Si aceptó", value: "si_acepto" },
      { label: "No tiene tarjeta", value: "no_tarjeta" },
      { label: "No tiene tarjeta", value: "no_tarjeta2" },
      { label: "No tiene tarjeta crédito sino debito", value: "solo_debito" },
      { label: "No tiene cupo en la tarjeta", value: "sin_cupo" },
      { label: "Prefiere pagar por otro medio", value: "otro_medio" },
      { label: "No cree en los beneficios (desconfía)", value: "desconfia" },
      { label: "El proceso es complejo", value: "complejo" },
      { label: "Tienen la tarjeta bloqueada", value: "bloqueada" },
      { label: "No sabe manejar la tarjeta", value: "no_sabe" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "numero_contacto_peru", label: "Número por el cual se logró contacto, Perú", type: "text", showIf: { pais: "peru", satisfecho_servicio_peru: "si" } },
    { name: "avis_ecuador_inicio", label: "Ecuador inicio de gestión", type: "info", showIf: { pais: "ecuador" } },
    
    { name: "tipo_servicio_ecuador", label: "Tipo de servicio Ecuador", type: "select", showIf: { pais: "ecuador" }, options: [
      { label: "Persona natural", value: "natural" },
      { label: "PYME", value: "pyme" }
    ] },
    { name: "medio_contacto_ecuador", label: "Medio de contacto Ecuador", type: "select", showIf: { pais: "ecuador" }, options: [
      { label: "Estaqueue", value: "estaqueue" },
      { label: "WhatsApp", value: "whatsapp" },
      { label: "No se realiza llamada", value: "no_llamada" }
    ] },
    { name: "md_ecuador", label: "MD Ecuador", type: "select", showIf: { pais: "ecuador" }, options: [
      { label: "TP CALL ECUADOR", value: "tp_call_ecuador" },
      { label: "S&M ECUADOR", value: "sm_ecuador" },
      { label: "MAKROCEL", value: "makrocel" },
      { label: "AGENDA 1", value: "agenda_1" },
      { label: "Fortel", value: "fortel" }
    ] },
    { name: "san_seguimiento_ecuador", label: "SAN de seguimiento?", type: "select", showIf: { pais: "ecuador" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" }
    ] },
    { name: "pago_primera_factura_ecuador", label: "¿Pagó la primera factura? Ecuador", type: "select", showIf: { pais: "ecuador" }, options: [
      { label: "Sí", value: "si" },
      { label: "No", value: "no" },
      { label: "Mes gratis", value: "mes_gratis" }
    ] },
    { name: "satisfecho_servicio_ecuador", label: "¿Se encuentra satisfecho con el servicio? Ecuador", type: "select", showIf: { pais: "ecuador" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "Aún no ha usado el servicio", value: "no_usado" },
      { label: "No se logra contacto", value: "no_contacto" },
      { label: "No se realiza llamada", value: "no_llamada" },
      { label: "Seguimiento", value: "seguimiento" },
      { label: "Mensaje con tercero", value: "mensaje_tercero" }
    ] },
      { name: "info_satisfecho_ecuador", label: "Si está satisfecho con el servicio", type: "info", showIf: { pais: "ecuador", satisfecho_servicio_ecuador: "si" } },
      { name: "info_no_satisfecho_ecuador", label: "No está satisfecho con el servicio", type: "info", showIf: { pais: "ecuador", satisfecho_servicio_ecuador: "no" } },
      { name: "motivo_no_satisfecho_ecuador", label: "¿Por qué no se encuentra satisfecho con el servicio? Ecuador", type: "select", showIf: { pais: "ecuador", satisfecho_servicio_ecuador: "no" }, options: [
      { label: "Es muy intermitente", value: "intermitente" },
      { label: "Actualmente no tiene internet", value: "sin_internet" },
      { label: "Su plan se consumió muy rápido", value: "plan_rapido" },
      { label: "Tiene mala cobertura", value: "mala_cobertura" },
      { label: "No le funciona para videoconferencias", value: "no_videoconferencias" },
      { label: "No le funciona para juegos en linea", value: "no_juegos" },
      { label: "Solo contrató para plataformas de Streaming y no le funciona", value: "no_streaming" },
      { label: "No le funciona para VPN", value: "no_vpn" },
      { label: "No le funciona para cámaras IPV4", value: "no_camaras_ipv4" },
      { label: "No le ha funcionado desde la instalación", value: "no_funciona_desde_instalacion" },
      { label: "No tenía conocimiento del plan (valores, pago anticipado, entre otras)", value: "no_conocimiento_plan" },
      { label: "Le brindaron mal servicio al cliente", value: "mal_servicio_cliente" },
      { label: "No tuvo servicio y solicita descuento por días sin consumo", value: "descuento_sin_consumo" },
      { label: "Novedad/caso especial", value: "novedad" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "escala_soporte_ecuador", label: "¿Se escala a soporte técnico?", type: "select", showIf: { pais: "ecuador", satisfecho_servicio_ecuador: "no" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "continuar_servicio_ecuador", label: "¿Desea continuar con el servicio?", type: "select", showIf: { pais: "ecuador", satisfecho_servicio_ecuador: "no" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "No aplica", value: "no_aplica" }
    ] },
      { name: "info_continuar_ecuador", label: "Si está satisfecho y desea continuar con el servicio", type: "info", showIf: { pais: "ecuador", continuar_servicio_ecuador: "si" } },

      { name: "uso_servicio_ecuador_continua", label: "¿Qué uso le da al servicio? Ecuador", type: "select", showIf: { pais: "ecuador", continuar_servicio_ecuador: "si" }, options: [
      { label: "Estudiar", value: "estudiar" },
      { label: "Trabajar", value: "trabajar" },
      { label: "Redes sociales", value: "redes" },
      { label: "Cámaras de seguridad", value: "camaras" },
      { label: "Comunicación", value: "comunicacion" },
      { label: "Diversión (Netflix, videos, juegos)", value: "diversion" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "cuando_pago_ecuador_continua", label: "¿Cuénteme para cuando va a realizar el pago?", type: "select", showIf: { pais: "ecuador", continuar_servicio_ecuador: "si" }, options: [
      { label: "Hoy realizo el pago", value: "hoy" },
      { label: "Lo realizaré en el próximo corte", value: "proximo_corte" },
      { label: "Lo realizare en la próxima semana", value: "proxima_semana" },
      { label: "Ya realizo el pago", value: "ya_pago" },
      { label: "Mes gratis", value: "mes_gratis" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "medio_pago_ecuador_continua", label: "¿De qué forma pagó o pagará su factura? Ecuador", type: "select", showIf: { pais: "ecuador", continuar_servicio_ecuador: "si" }, options: [
      { label: "Servipagos", value: "servipagos" },
      { label: "Banco pichincha", value: "pichincha" },
      { label: "Banco Guayaquil", value: "guayaquil" },
      { label: "Red Ponle", value: "ponle" },
      { label: "Red Facilito", value: "facilito" },
      { label: "Pago Ágil", value: "pago_agil" },
      { label: "Mi vecino (con código 67597)", value: "mi_vecino" },
      { label: "Tarjeta crédito", value: "credito" },
      { label: "Tarjeta débito", value: "debito" },
      { label: "Débito automático", value: "debito_automatico" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "como_debito_ecuador_si_continua", label: "Si el cliente aceptó el débito, seleccione de qué manera se realizó o realizará el proceso", type: "select", showIf: { pais: "ecuador", continuar_servicio_ecuador: "si", medio_pago_ecuador_continua: "debito_automatico" }, options: [
      { label: "En línea (a través de la app o portal)", value: "en_linea" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "No aceptó", value: "no_acepto" },
      { label: "Ya está inscrito al débito automático", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "motivo_no_debito_ecuador_continua", label: "Si la respuesta es NO indague el motivo por el cual no está interesado", type: "select", showIf: { pais: "ecuador", continuar_servicio_ecuador: "si", como_debito_ecuador_si_continua: "no_acepto" }, options: [
      { label: "Si aceptó", value: "si_acepto" },
      { label: "No tiene tarjeta", value: "no_tarjeta" },
      { label: "No tiene tarjeta crédito sino debito", value: "solo_debito" },
      { label: "No tiene cupo en la tarjeta", value: "sin_cupo" },
      { label: "Prefiere pagar por otro medio", value: "otro_medio" },
      { label: "No cree en los beneficios (desconfía)", value: "desconfia" },
      { label: "El proceso es complejo", value: "complejo" },
      { label: "Tiene la tarjeta bloqueada", value: "bloqueada" },
      { label: "No sabe manejar la tarjeta", value: "no_sabe" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "uso_servicio_ecuador", label: "¿Qué uso le da al servicio? Ecuador", type: "select", showIf: { pais: "ecuador", satisfecho_servicio_ecuador: "si" }, options: [
      { label: "Estudiar", value: "estudiar" },
      { label: "Trabajar", value: "trabajar" },
      { label: "Redes sociales", value: "redes" },
      { label: "Cámaras de seguridad", value: "camaras" },
      { label: "Comunicación", value: "comunicacion" },
      { label: "Diversión (Netflix, videos, juegos)", value: "diversion" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "cuando_pago_ecuador", label: "¿Cuénteme para cuando va a realizar el pago?", type: "select", showIf: { pais: "ecuador", satisfecho_servicio_ecuador: "si" }, options: [
      { label: "Hoy realizo el pago", value: "hoy" },
      { label: "Lo realizaré en el próximo corte", value: "proximo_corte" },
      { label: "Lo realizare en la próxima semana", value: "proxima_semana" },
      { label: "Ya realizo el pago", value: "ya_pago" },
      { label: "Mes gratis", value: "mes_gratis" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "medio_pago_ecuador", label: "¿De qué forma pagó o pagará su factura? Ecuador", type: "select", showIf: { pais: "ecuador", satisfecho_servicio_ecuador: "si" }, options: [
      { label: "Servipagos", value: "servipagos" },
      { label: "Banco pichincha", value: "pichincha" },
      { label: "Banco Guayaquil", value: "guayaquil" },
      { label: "Red Ponle", value: "ponle" },
      { label: "Red Facilito", value: "facilito" },
      { label: "Pago Ágil", value: "pago_agil" },
      { label: "Mi vecino (con código 67597)", value: "mi_vecino" },
      { label: "Tarjeta crédito", value: "credito" },
      { label: "Tarjeta débito", value: "debito" },
      { label: "Débito automático", value: "debito_automatico" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "como_debito_ecuador_si", label: "Si el cliente aceptó el débito, seleccione de qué manera se realizó o realizará el proceso", type: "select", showIf: { pais: "ecuador", satisfecho_servicio_ecuador: "si", medio_pago_ecuador: "debito_automatico" }, options: [
      { label: "En línea (a través de la app o portal)", value: "en_linea" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "No aceptó", value: "no_acepto" },
      { label: "Ya está inscrito al débito automático", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },

    { name: "numero_contacto_ecuador", label: "Número por el cual se logró contacto, Ecuador", type: "text", showIf: { pais: "ecuador" } },
    { name: "motivo_no_debito_ecuador", label: "Si la respuesta es NO indague el motivo por el cual no está interesado", type: "select", showIf: { pais: "ecuador", satisfecho_servicio_ecuador: "si", como_debito_ecuador_si: "no_acepto" }, options: [
      { label: "Si aceptó", value: "si_acepto" },
      { label: "No tiene tarjeta", value: "no_tarjeta" },
      { label: "No tiene tarjeta crédito sino debito", value: "solo_debito" },
      { label: "No tiene cupo en la tarjeta", value: "sin_cupo" },
      { label: "Prefiere pagar por otro medio", value: "otro_medio" },
      { label: "No cree en los beneficios (desconfía)", value: "desconfia" },
      { label: "El proceso es complejo", value: "complejo" },
      { label: "Tiene la tarjeta bloqueada", value: "bloqueada" },
      { label: "No sabe manejar la tarjeta", value: "no_sabe" },
      { label: "No aplica", value: "no_aplica" }
    ] },

    { name: "avis_chile_inicio", label: "Chile inicio de gestión", type: "info", showIf: { pais: "chile" } },
   
    
    { name: "tipo_servicio_chile", label: "Tipo de servicio Chile", type: "select", showIf: { pais: "chile" }, options: [
      { label: "Persona natural", value: "natural" },
      { label: "PYME", value: "pyme" }
    ] },
    { name: "medio_contacto_chile", label: "Medio de contacto Chile", type: "select", showIf: { pais: "chile" }, options: [
      { label: "Estaqueue", value: "estaqueue" },
      { label: "WhatsApp", value: "whatsapp" },
      { label: "Email", value: "email" },
      { label: "Respuesta encuesta", value: "encuesta" },
      { label: "No se realiza llamada", value: "no_llamada" }
    ] },
    { name: "md_chile", label: "MD Chile", type: "select", showIf: { pais: "chile" }, options: [
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
      { label: "ÁLEX NAVARRETE CÁCERES", value: "alex_navarrete_caceres" },
      { label: "JONATHAN MARABOLI VILLA", value: "jonathan_maraboli_villa" },
      { label: "CARMEN GLORIA SEPÚLVEDA SEGUEL", value: "carmen_gloria_sepulveda_seguel" },
      { label: "ALEJANDRO CURIHUAL", value: "alejandro_curihual" },
      { label: "JUAN RIQUELME TORRES", value: "juan_riquelme_torres" },
      { label: "MAURICIO JARA SOTO", value: "mauricio_jara_soto" },
      { label: "MG TELECOM CL", value: "mg_telecom_cl" },
      ] },
   
    { name: "satisfecho_servicio_chile", label: "¿Se encuentra satisfecho con el servicio? Chile", type: "select", showIf: { pais: "chile" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "Aún no ha usado el servicio", value: "no_usado" },
      { label: "No se logra contacto", value: "no_contacto" },
      { label: "No se realiza llamada", value: "no_llamada" },
      { label: "Seguimiento", value: "seguimiento" }
    ] },
          { name: "info_no_satisfecho_chile", label: "No está satisfecho con el servicio", type: "info", showIf: { pais: "chile", satisfecho_servicio_chile: "no" } },
 { name: "info_satisfecho_chile", label: "Si está satisfecho con el servicio", type: "info", showIf: { pais: "chile", satisfecho_servicio_chile: "si" } },
  { name: "motivo_no_satisfecho_chile", label: "Indique el/los motivos por los cuales no se encuentra satisfecho con los servicios, Chile", type: "select", showIf: { pais: "chile", satisfecho_servicio_chile: "no" }, options: [
      { label: "Es muy intermitente", value: "intermitente" },
      { label: "Actualmente no tiene internet", value: "sin_internet" },
      { label: "Su plan se consumió muy rápido", value: "plan_rapido" },
      { label: "Tiene mala cobertura", value: "mala_cobertura" },
      { label: "No le funciona para videoconferencias", value: "no_videoconferencias" },
      { label: "No le funciona para juegos en linea", value: "no_juegos" },
      { label: "Solo contrató para plataformas de Streaming y no le funciona", value: "no_streaming" },
      { label: "No le funciona para VPN", value: "no_vpn" },
      { label: "No le funciona para cámaras IPV4", value: "no_camaras_ipv4" },
      { label: "No le ha funcionado desde la instalación", value: "no_funciona_desde_instalacion" },
      { label: "Novedad/caso especial", value: "novedad" },
      { label: "No aplica", value: "no_aplica" }
    ] },
  { name: "escala_soporte_chile", label: "¿Se escala a soporte técnico?", type: "select", showIf: { pais: "chile", satisfecho_servicio_chile: "no" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "No aplica", value: "no_aplica" }
    ] },
  { name: "escala_contacto_chile", label: "¿Se escala a contacto HughesNet?", type: "select", showIf: { pais: "chile", satisfecho_servicio_chile: "no" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "No aplica", value: "no_aplica" }
    ] },
  { name: "continuar_servicio_chile", label: "¿Desea continuar con el servicio?", type: "select", showIf: { pais: "chile", satisfecho_servicio_chile: "no" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "info_continuar_chile", label: "Si está satisfecho y desea continuar con el servicio", type: "info", showIf: { pais: "chile", continuar_servicio_chile: "si" } },
      { name: "uso_servicio_chile_continua", label: "¿Qué uso le da al servicio? Chile", type: "select", showIf: { pais: "chile", continuar_servicio_chile: "si" }, options: [
      { label: "Estudiar", value: "estudiar" },
      { label: "Trabajar", value: "trabajar" },
      { label: "Redes sociales", value: "redes" },
      { label: "Cámaras de seguridad", value: "camaras" },
      { label: "Comunicación", value: "comunicacion" },
      { label: "Diversión (Netflix, videos, juegos)", value: "diversion" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "medio_pago_chile_continua", label: "¿De qué manera pagó o pagará su boleta? Chile", type: "select", showIf: { pais: "chile", continuar_servicio_chile: "si" }, options: [
      { label: "Mes gratis", value: "mes_gratis" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "fecha_pago_chile_continua", label: "Si el cliente no ha realizado el pago, confirmar ¿qué día va a pagar? (fecha)", type: "date", showIf: { pais: "chile", continuar_servicio_chile: "si", cuando_pago_chile_continua: "hoy" } },
    { name: "acepta_pat_chile_continua", label: "¿Acepta PAT?", type: "select", showIf: { pais: "chile", continuar_servicio_chile: "si" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "Ya se encuentra inscrito al PAT", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "como_pat_chile_si_continua", label: "Si el cliente aceptó el PAT, seleccione de que manera se realizó o realizará el proceso", type: "select", showIf: { pais: "chile", continuar_servicio_chile: "si", acepta_pat_chile_continua: "si" }, options: [
      { label: "No aceptó", value: "no_acepto" },
      { label: "En linea(a travez de la app o portal)", value: "en_linea" },
      { label: "Se transfiere al IVR", value: "ivr" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "Ya se encuentra inscrito al PAT", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "como_pat_chile_inscrito_continua", label: "Si el cliente aceptó el PAT, seleccione de que manera se realizó o realizará el proceso", type: "select", showIf: { pais: "chile", continuar_servicio_chile: "si", acepta_pat_chile_continua: "inscrito" }, options: [
      { label: "No aceptó", value: "no_acepto" },
      { label: "En linea(a travez de la app o portal)", value: "en_linea" },
      { label: "Se transfiere al IVR", value: "ivr" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "Ya se encuentra inscrito al PAT", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "motivo_no_pat_chile_continua", label: "Si la respuesta es NO, indague el motivo por el cual no está interesado", type: "select", showIf: { pais: "chile", continuar_servicio_chile: "si", acepta_pat_chile_continua: "no" }, options: [
      { label: "Si aceptó", value: "si_acepto" },
      { label: "No tiene tarjeta de crédito", value: "no_credito" },
      { label: "No tiene tarjeta crédito sino debito", value: "solo_debito" },
      { label: "No tiene cupo en la tarjeta", value: "sin_cupo" },
      { label: "Prefiere pagar de manera manual", value: "manual" },
      { label: "Ha tenido malas experiencias con este tipo de sistema", value: "malas_experiencias" },
      { label: "No cree en los beneficios (desconfía)", value: "desconfia" },
      { label: "Tiene la tarjeta bloqueada", value: "bloqueada" },
      { label: "No sabe manejar la tarjeta", value: "no_sabe" },
      { label: "Es PYME, paga por otro medio", value: "pyme_otro_medio" },
      { label: "Le preguntará a otra persona", value: "preguntara_otro" },
      { label: "No aplica", value: "no_aplica" }
    ] },
   
  { name: "uso_servicio_chile", label: "¿Qué uso le da al servicio? Chile", type: "select", showIf: { pais: "chile", satisfecho_servicio_chile: "si" }, options: [
      { label: "Estudiar", value: "estudiar" },
      { label: "Trabajar", value: "trabajar" },
      { label: "Hogar", value: "hogar" },
      { label: "Redes sociales", value: "redes" },
      { label: "Cámaras de seguridad", value: "camaras" },
      { label: "Comunicación", value: "comunicacion" },
      { label: "Diversión (Netflix, videos, juegos)", value: "diversion" },
      { label: "No aplica", value: "no_aplica" }
    ] },
  { name: "cuando_pago_chile", label: "¿Cuénteme para cuando va a realizar el pago?", type: "select", showIf: { pais: "chile", satisfecho_servicio_chile: "si" }, options: [
      { label: "Hoy realizo el pago", value: "hoy" },
      { label: "Lo realizare en el próximo corte", value: "proximo_corte" },
      { label: "Lo realizare la próxima semana", value: "proxima_semana" },
      { label: "Ya realizo el pago", value: "ya_pago" },
      { label: "No aplica", value: "no_aplica" }
    ] },
  { name: "medio_pago_chile", label: "¿De qué manera pagó o pagará su boleta? Chile", type: "select", showIf: { pais: "chile", satisfecho_servicio_chile: "si" }, options: [
      { label: "En línea", value: "en_linea" },
      { label: "Presencial", value: "presencial" },
      { label: "Transferencia al banco Santander", value: "santander" },
      { label: "Cliente se encuentra inscrito al PAT", value: "pat" },
      { label: "Mes gratis", value: "mes_gratis" },
      { label: "No aplica", value: "no_aplica" }
    ] },
  { name: "fecha_pago_chile", label: "Si el cliente no ha realizado el pago, confirmar ¿qué día va a pagar? (fecha)", type: "date", showIf: { pais: "chile", satisfecho_servicio_chile: "si", cuando_pago_chile: "hoy" } },
  { name: "acepta_pat_chile", label: "¿Acepta PAT?", type: "select", showIf: { pais: "chile", satisfecho_servicio_chile: "si" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "Ya se encuentra inscrito al PAT", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },

  { name: "motivo_no_pat_chile", label: "Si la respuesta es NO, indague el motivo por el cual no está interesado", type: "select", showIf: { pais: "chile", satisfecho_servicio_chile: "si", acepta_pat_chile: "no" }, options: [
    { label: "Si aceptó", value: "si_acepto" },
    { label: "No tiene tarjeta de crédito", value: "no_credito" },
    { label: "No tiene tarjeta crédito sino debito", value: "solo_debito" },
    { label: "No tiene cupo en la tarjeta", value: "sin_cupo" },
    { label: "Prefiere pagar de manera manual", value: "manual" },
    { label: "Ha tenido malas experiencias con este tipo de sistema", value: "malas_experiencias" },
    { label: "No cree en los beneficios (desconfía)", value: "desconfia" },
    { label: "Tiene la tarjeta bloqueada", value: "bloqueada" },
    { label: "No sabe manejar la tarjeta", value: "no_sabe" },
    { label: "Es PYME, paga por otro medio", value: "pyme_otro_medio" },
    { label: "Le preguntará a otra persona", value: "preguntara_otro" },
    { label: "No aplica", value: "no_aplica" }
  ] },

  { name: "numero_contacto_chile", label: "Número por el cual se logró contacto, Chile", type: "text", showIf: { pais: "chile" } },

 
  { name: "como_pat_chile_si", label: "Si el cliente aceptó el PAT, seleccione de que manera se realizó o realizará el proceso", type: "select", showIf: { pais: "chile", satisfecho_servicio_chile: "si", acepta_pat_chile: "si" }, options: [
   { label: "No aceptó", value: "no_acepto" },
      { label: "En linea(a travez de la app o portal)", value: "en_linea" },
      { label: "Se transfiere al IVR", value: "ivr" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "Ya se encuentra inscrito al PAT", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
  ]
},


    
    
    { name: "avis_colombia_inicio", label: "Colombia inicio de gestión", type: "info", showIf: { pais: "colombia" } },
    { name: "tipo_servicio_colombia", label: "Tipo de servicio Colombia", type: "select", showIf: { pais: "colombia" }, options: [
      { label: "Persona natural", value: "natural" },
      { label: "PYME", value: "pyme" }
    ] },
    { name: "medio_contacto_colombia", label: "Medio de contacto Colombia", type: "select", showIf: { pais: "colombia" }, options: [
      { label: "Estaqueue", value: "estaqueue" },
      { label: "WhatsApp", value: "whatsapp" },
      { label: "Email", value: "email" },
      { label: "Respuesta encuesta", value: "encuesta" },
      { label: "No se realiza llamada", value: "no_llamada" }
    ] },
    { name: "md_colombia", label: "MD Colombia", type: "select", showIf: { pais: "colombia" }, options: [
      { label: "S&M COLOMBIA", value: "sm_colombia" },
      { label: "COSERING", value: "cosering" },
      { label: "TP CALL COLOMBIA", value: "tp_call_colombia" },
      { label: "SPEED MOVIL", value: "speed_movil" },
      { label: "A1 GAVIOTA", value: "a1_gaviota" },
      { label: "FORTEL", value: "fortel" }
    ] },
    { name: "proceso_liberada_colombia", label: "Proceso por el cual fue liberada, Colombia", type: "select", showIf: { pais: "colombia" }, options: [
      { label: "HughesPro", value: "hughespro" },
      { label: "PreWelcome", value: "prewelcome" },
      { label: "Auditoria – Gerencia", value: "auditoria_gerencia" }
    ] },
    { name: "san_seguimiento_colombia", label: "SAN de seguimiento?", type: "select", showIf: { pais: "colombia" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" }
    ] },
    { name: "pago_primera_factura_colombia", label: "¿Pagó la primera factura? Colombia", type: "select", showIf: { pais: "colombia" }, options: [
      { label: "Sí", value: "si" },
      { label: "No", value: "no" },
      { label: "Mes gratis", value: "mes_gratis" }
    ] },
    { name: "satisfecho_servicio_colombia", label: "¿Se encuentra satisfecho con el servicio? Colombia", type: "select", showIf: { pais: "colombia" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "Aún no ha usado el servicio", value: "no_usado" },
      { label: "No se logra contacto", value: "no_contacto" },
      { label: "No se realiza llamada", value: "no_llamada" },
      { label: "Seguimiento", value: "seguimiento" },
      { label: "Mensaje con tercero", value: "mensaje_tercero" }
    ] },
      { name: "info_satisfecho_colombia", label: "Si está satisfecho con el servicio", type: "info", showIf: { pais: "colombia", satisfecho_servicio_colombia: "si" } },
      { name: "info_no_satisfecho_colombia", label: "No está satisfecho con el servicio", type: "info", showIf: { pais: "colombia", satisfecho_servicio_colombia: "no" } },

      { name: "motivo_no_satisfecho_colombia", label: "¿Por qué no se encuentra satisfecho con el servicio? Colombia", type: "select", showIf: { pais: "colombia", satisfecho_servicio_colombia: "no" }, options: [
      { label: "Es muy intermitente", value: "intermitente" },
      { label: "Actualmente no tiene internet", value: "sin_internet" },
      { label: "Su plan se consumió muy rápido", value: "plan_rapido" },
      { label: "Tiene mala cobertura", value: "mala_cobertura" },
      { label: "No le funciona para videoconferencias", value: "no_videoconferencias" },
      { label: "No le funciona para juegos en linea", value: "no_juegos" },
      { label: "Solo contrató para plataformas de Streaming y no le funciona", value: "no_streaming" },
      { label: "No le funciona para VPN", value: "no_vpn" },
      { label: "No le funciona para cámaras IPV4", value: "no_camaras_ipv4" },
      { label: "No le ha funcionado desde la instalación", value: "no_funciona_desde_instalacion" },
      { label: "No tenía conocimiento del plan (valores, pago anticipado, entre otras)", value: "no_conocimiento_plan" },
      { label: "Le brindaron mal servicio al cliente", value: "mal_servicio_cliente" },
      { label: "No tuvo servicio y solicita descuento por días sin consumo", value: "descuento_sin_consumo" },
      { label: "Novedad/caso especial", value: "novedad" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "escala_soporte_colombia", label: "¿Se escala a soporte técnico?", type: "select", showIf: { pais: "colombia", satisfecho_servicio_colombia: "no" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "continuar_servicio_colombia", label: "¿Desea continuar con el servicio?", type: "select", showIf: { pais: "colombia", satisfecho_servicio_colombia: "no" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "No aplica", value: "no_aplica" }
    ] },
      { name: "info_continuar_colombia", label: "Si está satisfecho y desea continuar con el servicio", type: "info", showIf: { pais: "colombia", continuar_servicio_colombia: "si" } },

      { name: "uso_servicio_colombia_continua", label: "¿Qué uso le da al servicio? Colombia", type: "select", showIf: { pais: "colombia", continuar_servicio_colombia: "si" }, options: [
      { label: "Estudiar", value: "estudiar" },
      { label: "Trabajar", value: "trabajar" },
      { label: "Redes sociales", value: "redes" },
      { label: "Cámaras de seguridad", value: "camaras" },
      { label: "Comunicación", value: "comunicacion" },
      { label: "Diversión (Netflix, videos, juegos)", value: "diversion" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "cuando_pago_colombia_continua", label: "¿Cuénteme para cuando va a realizar el pago?", type: "select", showIf: { pais: "colombia", continuar_servicio_colombia: "si" }, options: [
      { label: "Hoy realizo el pago", value: "hoy" },
      { label: "Lo realizare en el próximo corte", value: "proximo_corte" },
      { label: "Lo realizare la próxima semana", value: "proxima_semana" },
      { label: "Ya realizo el pago", value: "ya_pago" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "medio_pago_colombia_continua", label: "¿De qué manera pagó o pagará su factura? Colombia", type: "select", showIf: { pais: "colombia", continuar_servicio_colombia: "si" }, options: [
      { label: "Efecty", value: "efecty" },
      { label: "SuRed", value: "sured" },
      { label: "Corresponsal bancario", value: "corresponsal" },
      { label: "PSE", value: "pse" },
      { label: "Tarjeta de crédito", value: "credito" },
      { label: "Débito automatico", value: "debito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "fecha_pago_colombia_continua", label: "Si el cliente NO ha realizado el pago, confirmar ¿qué día va a pagar? (fecha)", type: "date", showIf: { pais: "colombia", continuar_servicio_colombia: "si", cuando_pago_colombia_continua: "hoy" } },
    { name: "fecha_pago_colombia_proximo_corte_continua", label: "Si el cliente NO ha realizado el pago, confirmar ¿qué día va a pagar? (fecha)", type: "date", showIf: { pais: "colombia", continuar_servicio_colombia: "si", cuando_pago_colombia_continua: "proximo_corte" } },
    { name: "fecha_pago_colombia_proxima_semana_continua", label: "Si el cliente NO ha realizado el pago, confirmar ¿qué día va a pagar? (fecha)", type: "date", showIf: { pais: "colombia", continuar_servicio_colombia: "si", cuando_pago_colombia_continua: "proxima_semana" } },
    { name: "acepta_debito_colombia_continua", label: "¿Acepta débito automático?", type: "select", showIf: { pais: "colombia", continuar_servicio_colombia: "si" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "Ya se encuentra inscrito al débito automático", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "como_debito_colombia_si_continua", label: "Si el cliente aceptó el débito, seleccione de que manera se realizó o realizará el proceso", type: "select", showIf: { pais: "colombia", continuar_servicio_colombia: "si", acepta_debito_colombia_continua: "si" }, options: [
      { label: "No aceptó", value: "no_acepto" },
      { label: "En linea(a travez de la app o portal)", value: "en_linea" },
      { label: "Se transfiere al IVR", value: "ivr" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "Ya se encuentra inscrito al débito automatico", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "como_debito_colombia_inscrito_continua", label: "Si el cliente aceptó el débito, seleccione de que manera se realizó o realizará el proceso", type: "select", showIf: { pais: "colombia", continuar_servicio_colombia: "si", acepta_debito_colombia_continua: "inscrito" }, options: [
      { label: "No aceptó", value: "no_acepto" },
      { label: "En linea(a travez de la app o portal)", value: "en_linea" },
      { label: "Se transfiere al IVR", value: "ivr" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "Ya se encuentra inscrito al débito automatico", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "motivo_no_debito_colombia_continua", label: "Si la respuesta es NO, indague el motivo por el cual no está interesado", type: "select", showIf: { pais: "colombia", continuar_servicio_colombia: "si", acepta_debito_colombia_continua: "no" }, options: [
      { label: "Si aceptó", value: "si_acepto" },
      { label: "No tiene tarjeta de crédito", value: "no_credito" },
      { label: "No tiene tarjeta crédito sino debito", value: "solo_debito" },
      { label: "No tiene cupo en la tarjeta", value: "sin_cupo" },
      { label: "Prefiere pagar de manera manual o por otro medio", value: "manual" },
      { label: "Ha tenido malas experiencias con este tipo de sistema", value: "malas_experiencias" },
      { label: "No cree en los beneficios (desconfía)", value: "desconfia" },
      { label: "Tiene la tarjeta bloqueada", value: "bloqueada" },
      { label: "No sabe manejar la tarjeta", value: "no_sabe" },
      { label: "El proceso es complejo", value: "complejo" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "numero_contacto_colombia_continua", label: "Número por el cual se logró contacto, Colombia", type: "text", showIf: { pais: "colombia", continuar_servicio_colombia: "si" } },
    
    { name: "uso_servicio_colombia", label: "¿Qué uso le da al servicio? Colombia", type: "select", showIf: { pais: "colombia", satisfecho_servicio_colombia: "si" }, options: [
      { label: "Estudiar", value: "estudiar" },
      { label: "Trabajar", value: "trabajar" },
      { label: "Redes sociales", value: "redes" },
      { label: "Cámaras de seguridad", value: "camaras" },
      { label: "Comunicación", value: "comunicacion" },
      { label: "Diversión (Netflix, videos, juegos)", value: "diversion" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "cuando_pago_colombia", label: "¿Cuénteme para cuando va a realizar el pago?", type: "select", showIf: { pais: "colombia", satisfecho_servicio_colombia: "si" }, options: [
      { label: "Hoy realizo el pago", value: "hoy" },
      { label: "Lo realizare en el próximo corte", value: "proximo_corte" },
      { label: "Lo realizare la próxima semana", value: "proxima_semana" },
      { label: "Ya realizo el pago", value: "ya_pago" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "medio_pago_colombia", label: "¿De qué manera pagó o pagará su factura? Colombia", type: "select", showIf: { pais: "colombia", satisfecho_servicio_colombia: "si" }, options: [
      { label: "Efecty", value: "efecty" },
      { label: "SuRed", value: "sured" },
      { label: "Corresponsal bancario", value: "corresponsal" },
      { label: "PSE", value: "pse" },
      { label: "Tarjeta de crédito", value: "credito" },
      { label: "Débito automatico", value: "debito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "fecha_pago_colombia", label: "Si el cliente NO ha realizado el pago, confirmar ¿qué día va a pagar? (fecha)", type: "date", showIf: { pais: "colombia", satisfecho_servicio_colombia: "si"} },
    { name: "acepta_debito_colombia", label: "¿Acepta débito automático?", type: "select", showIf: { pais: "colombia", satisfecho_servicio_colombia: "si" }, options: [
      { label: "Si", value: "si" },
      { label: "No", value: "no" },
      { label: "Ya se encuentra inscrito al débito automático", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "como_debito_colombia_si", label: "Si el cliente aceptó el débito, seleccione de que manera se realizó o realizará el proceso", type: "select", showIf: { pais: "colombia", satisfecho_servicio_colombia: "si", acepta_debito_colombia: "si" }, options: [
      { label: "No aceptó", value: "no_acepto" },
      { label: "En linea(a travez de la app o portal)", value: "en_linea" },
      { label: "Se transfiere al IVR", value: "ivr" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "Ya se encuentra inscrito al débito automatico", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "como_debito_colombia_inscrito", label: "Si el cliente aceptó el débito, seleccione de que manera se realizó o realizará el proceso", type: "select", showIf: { pais: "colombia", satisfecho_servicio_colombia: "si", acepta_debito_colombia: "inscrito" }, options: [
      { label: "No aceptó", value: "no_acepto" },
      { label: "En linea(a travez de la app o portal)", value: "en_linea" },
      { label: "Se transfiere al IVR", value: "ivr" },
      { label: "Cliente indica que lo hace después y solicita el instructivo por correo", value: "instructivo" },
      { label: "Ya se encuentra inscrito al débito automatico", value: "inscrito" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "motivo_no_debito_colombia", label: "Si la respuesta es NO, indague el motivo por el cual no está interesado", type: "select", showIf: { pais: "colombia", satisfecho_servicio_colombia: "si", acepta_debito_colombia: "no" }, options: [
      { label: "Si aceptó", value: "si_acepto" },
      { label: "No tiene tarjeta de crédito", value: "no_credito" },
      { label: "No tiene tarjeta crédito sino debito", value: "solo_debito" },
      { label: "No tiene cupo en la tarjeta", value: "sin_cupo" },
      { label: "Prefiere pagar de manera manual o por otro medio", value: "manual" },
      { label: "Ha tenido malas experiencias con este tipo de sistema", value: "malas_experiencias" },
      { label: "No cree en los beneficios (desconfía)", value: "desconfia" },
      { label: "Tiene la tarjeta bloqueada", value: "bloqueada" },
      { label: "No sabe manejar la tarjeta", value: "no_sabe" },
      { label: "El proceso es complejo", value: "complejo" },
      { label: "No aplica", value: "no_aplica" }
    ] },
    { name: "numero_contacto_colombia", label: "Número por el cual se logró contacto, Colombia", type: "text", showIf: { pais: "colombia", satisfecho_servicio_colombia: "si" } },

    { name: "se_escala_chile", label: "Se escala", type: "checkbox", options: [
      { label: "Soporte técnico", value: "soporte_tecnico" },
      { label: "Contacto Hughesnet", value: "contacto_hughesnet" },
      { label: "No aplica", value: "no_aplica" }
    ], showIf: { pais: "chile" } },
    { name: "codigo_gestion", label: "Código de gestión", type: "select", options: [
      { label: "Se realiza encuesta", value: "encuesta" },
      { label: "No recibe información", value: "no_info" },
      { label: "Solicita información por correo", value: "correo" },
      { label: "Volver a llamar", value: "volver_llamar" },
      { label: "No contesta", value: "no_contesta" },
      { label: "Buzón de mensaje", value: "buzon" },
      { label: "Fuera de servicio (número fuera de servicio)", value: "fuera_servicio" },
      { label: "Mensaje con tercero", value: "mensaje_tercero" },
      { label: "Colgó", value: "colgo" },
      { label: "Numero equivocado", value: "numero_equivocado" },
      { label: "Solicita retiro del servicio", value: "retiro" },
      { label: "Presenta novedad (se escala a Loreto)", value: "novedad_loreto" },
      { label: "Cliente con TRM activa", value: "trm_activa" },
      { label: "SAN inactiva", value: "san_inactiva" },
      { label: "Cliente fallecido", value: "fallecido" },
      { label: "Suspensión temporal", value: "suspension" },
      { label: "Se cancela SAN BRM", value: "cancela_san_brm" },
      { label: "Welcome no completado", value: "welcome_no_completado" },
    ] },
    { name: "observacion", label: "Observación", type: "text", multiline: true },
    { name: "sugerencia", label: "¿Qué sugerencia u observación le dejaría a HughesNet?", type: "text", multiline: true },
  ]}