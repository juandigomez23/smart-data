import { z } from "zod"

export type WelcomeFormData = {
  correo: string;
  san: string;
  pais: string;
  tipo_servicio_peru: string;
  medio_contacto_peru: string;
  md_peru: string;
  san_seguimiento_peru: string;
  pago_primer_recibo_peru: string;
  satisfecho_servicio_peru: string;
  motivo_no_satisfecho_peru: string;
  escala_soporte_peru: string;
  continuar_servicio_peru: string;
  uso_servicio_peru_continuar: string;
  cuando_pago_peru_continuar: string;
  medio_pago_peru_continuar: string;
  fecha_pago_peru_continuar: string;
  acepta_debito_peru_continuar: string;
  como_debito_peru_continuar_si: string;
  como_debito_peru_continuar_inscrito: string;
  motivo_no_debito_peru_continuar: string;
  uso_servicio_peru: string;
  cuando_pago_peru: string;
  medio_pago_peru: string;
  fecha_pago_peru: string;
  acepta_debito_peru: string;
  como_debito_peru_si: string;
  como_debito_peru_inscrito: string;
  motivo_no_debito_peru: string;
  numero_contacto_peru: string;
  // ECUADOR
  tipo_servicio_ecuador: string;
  medio_contacto_ecuador: string;
  md_ecuador: string;
  san_seguimiento_ecuador: string;
  pago_primer_recibo_ecuador: string;
  satisfecho_servicio_ecuador: string;
  motivo_no_satisfecho_ecuador: string;
  escala_soporte_ecuador: string;
  continuar_servicio_ecuador: string;
  uso_servicio_ecuador_continuar: string;
  cuando_pago_ecuador_continuar: string;
  medio_pago_ecuador_continua: string;
  fecha_pago_ecuador_continuar: string;
  acepta_debito_ecuador_continua: string;
  como_debito_ecuador_si_continua: string;
  como_debito_ecuador_inscrito_continua: string;
  motivo_no_debito_ecuador_continua: string;
  uso_servicio_ecuador: string;
  cuando_pago_ecuador: string;
  medio_pago_ecuador: string;
  como_debito_ecuador_si: string;
  motivo_no_debito_ecuador: string;
  numero_contacto_ecuador: string;
  // CHILE
  tipo_servicio_chile: string;
  medio_contacto_chile: string;
  md_chile: string;
  pago_primera_boleta_chile: string;
  satisfecho_servicio_chile: string;
  motivo_no_satisfecho_chile: string;
  escala_soporte_chile: string;
  escala_contacto_chile: string;
  continuar_servicio_chile: string;
  uso_servicio_chile_continua: string;
  cuando_pago_chile_continua: string;
  medio_pago_chile_continua: string;
  fecha_pago_chile_continua: string;
  acepta_pat_chile_continua: string;
  como_pat_chile_si_continua: string;
  como_pat_chile_inscrito_continua: string;
  motivo_no_pat_chile_continua: string;
  uso_servicio_chile: string;
  cuando_pago_chile: string;
  medio_pago_chile: string;
  fecha_pago_chile: string;
  acepta_pat_chile: string;
  como_pat_chile_si: string;
  como_pat_chile_inscrito: string;
  motivo_no_pat_chile: string;
  numero_contacto_chile: string;
  // COLOMBIA
  tipo_servicio_colombia: string;
  medio_contacto_colombia: string;
  md_colombia: string;
  proceso_liberada_colombia: string;
  san_seguimiento_colombia: string;
  pago_primera_factura_colombia: string;
  satisfecho_servicio_colombia: string;
  motivo_no_satisfecho_colombia: string;
  escala_soporte_colombia: string;
  continuar_servicio_colombia: string;
  uso_servicio_colombia_continua: string;
  cuando_pago_colombia_continua: string;
  medio_pago_colombia_continua: string;
  fecha_pago_colombia_continua: string;
  fecha_pago_colombia_proximo_corte_continua: string;
  fecha_pago_colombia_proxima_semana_continua: string;
  acepta_debito_colombia_continua: string;
  como_debito_colombia_si_continua: string;
  como_debito_colombia_inscrito_continua: string;
  motivo_no_debito_colombia_continua: string;
  numero_contacto_colombia_continua: string;
  uso_servicio_colombia: string;
  cuando_pago_colombia: string;
  medio_pago_colombia: string;
  fecha_pago_colombia: string;
  acepta_debito_colombia: string;
  como_debito_colombia_si: string;
  como_debito_colombia_inscrito: string;
  motivo_no_debito_colombia: string;
  numero_contacto_colombia: string;
  // GENERALES
  codigo_gestion: string;
  observacion: string;
  sugerencia: string;
}

export const welcomeSchema = z.object({
  correo: z.string().email("Correo inválido"),
  san: z.string().min(3, "SAN obligatorio"),
  pais: z.string().min(1, "País obligatorio"),
  tipo_servicio_peru: z.string().min(1, "Campo obligatorio"),
  medio_contacto_peru: z.string().min(1, "Campo obligatorio"),
  md_peru: z.string().min(1, "Campo obligatorio"),
  san_seguimiento_peru: z.string().min(1, "Campo obligatorio"),
  pago_primer_recibo_peru: z.string().min(1, "Campo obligatorio"),
  satisfecho_servicio_peru: z.string().min(1, "Campo obligatorio"),
  motivo_no_satisfecho_peru: z.string().min(1, "Campo obligatorio"),
  escala_soporte_peru: z.string().min(1, "Campo obligatorio"),
  continuar_servicio_peru: z.string().min(1, "Campo obligatorio"),
  uso_servicio_peru_continuar: z.string().min(1, "Campo obligatorio"),
  cuando_pago_peru_continuar: z.string().min(1, "Campo obligatorio"),
  medio_pago_peru_continuar: z.string().min(1, "Campo obligatorio"),
  fecha_pago_peru_continuar: z.string().min(1, "Campo obligatorio"),
  acepta_debito_peru_continuar: z.string().min(1, "Campo obligatorio"),
  como_debito_peru_continuar_si: z.string().min(1, "Campo obligatorio"),
  como_debito_peru_continuar_inscrito: z.string().min(1, "Campo obligatorio"),
  motivo_no_debito_peru_continuar: z.string().min(1, "Campo obligatorio"),
  uso_servicio_peru: z.string().min(1, "Campo obligatorio"),
  cuando_pago_peru: z.string().min(1, "Campo obligatorio"),
  medio_pago_peru: z.string().min(1, "Campo obligatorio"),
  fecha_pago_peru: z.string().min(1, "Campo obligatorio"),
  acepta_debito_peru: z.string().min(1, "Campo obligatorio"),
  como_debito_peru_si: z.string().min(1, "Campo obligatorio"),
  como_debito_peru_inscrito: z.string().min(1, "Campo obligatorio"),
  motivo_no_debito_peru: z.string().min(1, "Campo obligatorio"),
  numero_contacto_peru: z.string().min(1, "Campo obligatorio"),
  // Ecuador
  tipo_servicio_ecuador: z.string().min(1, "Campo obligatorio"),
  medio_contacto_ecuador: z.string().min(1, "Campo obligatorio"),
  md_ecuador: z.string().min(1, "Campo obligatorio"),
  san_seguimiento_ecuador: z.string().min(1, "Campo obligatorio"),
  pago_primer_recibo_ecuador: z.string().min(1, "Campo obligatorio"),
  satisfecho_servicio_ecuador: z.string().min(1, "Campo obligatorio"),
  motivo_no_satisfecho_ecuador: z.string().min(1, "Campo obligatorio"),
  escala_soporte_ecuador: z.string().min(1, "Campo obligatorio"),
  continuar_servicio_ecuador: z.string().min(1, "Campo obligatorio"),
  uso_servicio_ecuador_continuar: z.string().min(1, "Campo obligatorio"),
  cuando_pago_ecuador_continuar: z.string().min(1, "Campo obligatorio"),
  medio_pago_ecuador_continua: z.string().min(1, "Campo obligatorio"),
  fecha_pago_ecuador_continuar: z.string().min(1, "Campo obligatorio"),
  acepta_debito_ecuador_continua: z.string().min(1, "Campo obligatorio"),
  como_debito_ecuador_si_continua: z.string().min(1, "Campo obligatorio"),
  como_debito_ecuador_inscrito_continua: z.string().min(1, "Campo obligatorio"),
  motivo_no_debito_ecuador_continua: z.string().min(1, "Campo obligatorio"),
  uso_servicio_ecuador: z.string().min(1, "Campo obligatorio"),
  cuando_pago_ecuador: z.string().min(1, "Campo obligatorio"),
  medio_pago_ecuador: z.string().min(1, "Campo obligatorio"),
  como_debito_ecuador_si: z.string().min(1, "Campo obligatorio"),
  motivo_no_debito_ecuador: z.string().min(1, "Campo obligatorio"),
  numero_contacto_ecuador: z.string().min(1, "Campo obligatorio"),
  // Chile
  tipo_servicio_chile: z.string().min(1, "Campo obligatorio"),
  medio_contacto_chile: z.string().min(1, "Campo obligatorio"),
  md_chile: z.string().min(1, "Campo obligatorio"),
  pago_primera_boleta_chile: z.string().min(1, "Campo obligatorio"),
  satisfecho_servicio_chile: z.string().min(1, "Campo obligatorio"),
  motivo_no_satisfecho_chile: z.string().min(1, "Campo obligatorio"),
  escala_soporte_chile: z.string().min(1, "Campo obligatorio"),
  escala_contacto_chile: z.string().min(1, "Campo obligatorio"),
  continuar_servicio_chile: z.string().min(1, "Campo obligatorio"),
  uso_servicio_chile_continua: z.string().min(1, "Campo obligatorio"),
  cuando_pago_chile_continua: z.string().min(1, "Campo obligatorio"),
  medio_pago_chile_continua: z.string().min(1, "Campo obligatorio"),
  fecha_pago_chile_continua: z.string().min(1, "Campo obligatorio"),
  acepta_pat_chile_continua: z.string().min(1, "Campo obligatorio"),
  como_pat_chile_si_continua: z.string().min(1, "Campo obligatorio"),
  como_pat_chile_inscrito_continua: z.string().min(1, "Campo obligatorio"),
  motivo_no_pat_chile_continua: z.string().min(1, "Campo obligatorio"),
  uso_servicio_chile: z.string().min(1, "Campo obligatorio"),
  cuando_pago_chile: z.string().min(1, "Campo obligatorio"),
  medio_pago_chile: z.string().min(1, "Campo obligatorio"),
  fecha_pago_chile: z.string().min(1, "Campo obligatorio"),
  acepta_pat_chile: z.string().min(1, "Campo obligatorio"),
  como_pat_chile_si: z.string().min(1, "Campo obligatorio"),
  como_pat_chile_inscrito: z.string().min(1, "Campo obligatorio"),
  motivo_no_pat_chile: z.string().min(1, "Campo obligatorio"),
  numero_contacto_chile: z.string().min(1, "Campo obligatorio"),
  // Colombia
  tipo_servicio_colombia: z.string().min(1, "Campo obligatorio"),
  medio_contacto_colombia: z.string().min(1, "Campo obligatorio"),
  md_colombia: z.string().min(1, "Campo obligatorio"),
  proceso_liberada_colombia: z.string().min(1, "Campo obligatorio"),
  san_seguimiento_colombia: z.string().min(1, "Campo obligatorio"),
  pago_primera_factura_colombia: z.string().min(1, "Campo obligatorio"),
  satisfecho_servicio_colombia: z.string().min(1, "Campo obligatorio"),
  motivo_no_satisfecho_colombia: z.string().min(1, "Campo obligatorio"),
  escala_soporte_colombia: z.string().min(1, "Campo obligatorio"),
  continuar_servicio_colombia: z.string().min(1, "Campo obligatorio"),
  uso_servicio_colombia_continua: z.string().min(1, "Campo obligatorio"),
  cuando_pago_colombia_continua: z.string().min(1, "Campo obligatorio"),
  medio_pago_colombia_continua: z.string().min(1, "Campo obligatorio"),
  fecha_pago_colombia_continua: z.string().min(1, "Campo obligatorio"),
  fecha_pago_colombia_proximo_corte_continua: z.string().min(1, "Campo obligatorio"),
  fecha_pago_colombia_proxima_semana_continua: z.string().min(1, "Campo obligatorio"),
  acepta_debito_colombia_continua: z.string().min(1, "Campo obligatorio"),
  como_debito_colombia_si_continua: z.string().min(1, "Campo obligatorio"),
  como_debito_colombia_inscrito_continua: z.string().min(1, "Campo obligatorio"),
  motivo_no_debito_colombia_continua: z.string().min(1, "Campo obligatorio"),
  numero_contacto_colombia_continua: z.string().min(1, "Campo obligatorio"),
  uso_servicio_colombia: z.string().min(1, "Campo obligatorio"),
  cuando_pago_colombia: z.string().min(1, "Campo obligatorio"),
  medio_pago_colombia: z.string().min(1, "Campo obligatorio"),
  fecha_pago_colombia: z.string().min(1, "Campo obligatorio"),
  acepta_debito_colombia: z.string().min(1, "Campo obligatorio"),
  como_debito_colombia_si: z.string().min(1, "Campo obligatorio"),
  como_debito_colombia_inscrito: z.string().min(1, "Campo obligatorio"),
  motivo_no_debito_colombia: z.string().min(1, "Campo obligatorio"),
  numero_contacto_colombia: z.string().min(1, "Campo obligatorio"),
  // Generales
  codigo_gestion: z.string().min(1, "Campo obligatorio"),
  observacion: z.string().min(1, "Campo obligatorio"),
  sugerencia: z.string().min(1, "Campo obligatorio"),
});
