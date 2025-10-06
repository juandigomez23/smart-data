import { FormConfig } from "@/components/formgenerator"

export const welcomeForm: FormConfig = {
  title: "Welcome",
  fields: [
    { name: "correo", label: "Correo electrónico", type: "text", required: true, auto: true },
    { name: "pais", label: "País", type: "select", required: true, options: [
      { label: "Colombia", value: "colombia" },
      { label: "Chile", value: "chile" },
      { label: "Ecuador", value: "ecuador" },
      { label: "Perú", value: "peru" }
    ] },
    { name: "san", label: "SAN", type: "text", required: true },
    // Campos condicionales para Colombia
    { name: "info_colombia_inicio", label: "Colombia inicio de gestión", type: "info", showIf: { pais: "colombia" } },
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
    { name: "observaciones", label: "Observaciones", type: "text", description: "Agrega cualquier comentario relevante." }
  ]
}
