import { z } from "zod";
import { correoSchema, sanSchema } from "@/lib/validation-schemas";

export type RetencionesFormData = {
  correo: string;
  san: string;
  medio_comunicacion: string;
  tipo_asignacion: string;
  motivo_cancelacion: string;
  codigo_gestion: string;
  matriz_retencion: string;
  descuento_otorgado: string;
  meses_descuento: string;
  beneficio_plan: string;
  motivo_no_acepta: string;
  sustituye_servicio: string;
  linea_principal: string;
  actualiza_datos: string;
  recomienda_hughesnet: string;
  mejor_horario: string;
  medio_contacto_futuro: string;
  linea_principal_no_acepta: string;
  actualiza_datos_no_acepta: string;
  recomienda_hughesnet_no_acepta: string;
  mejor_horario_no_acepta: string;
  medio_contacto_futuro_no_acepta: string;
  debito_automatico: string;
  resumen_gestion: string;
  fecha_proxima_gestion: string;
  descuentos_escalonados_info: string;
  cambio_plan_info: string;
  no_acepta_info: string;
  cierre_llamada_info: string;
  cierre_llamada_info_no_acepta: string;
  resultado_gestion_info: string;
  debito_automatico_info: string;
};

export const retencionesSchema = z.object({
  correo: correoSchema,
  san: sanSchema,
  medio_comunicacion: z.string().min(1, "Campo obligatorio"),
  tipo_asignacion: z.string().min(1, "Campo obligatorio"),
  motivo_cancelacion: z.string().min(1, "Campo obligatorio"),
  codigo_gestion: z.string().min(1, "Campo obligatorio"),
  matriz_retencion: z.string().min(1, "Campo obligatorio"),
  descuento_otorgado: z.string().min(1, "Campo obligatorio"),
  meses_descuento: z.string().min(1, "Campo obligatorio"),
  beneficio_plan: z.string().min(1, "Campo obligatorio"),
  motivo_no_acepta: z.string().min(1, "Campo obligatorio"),
  sustituye_servicio: z.string().min(1, "Campo obligatorio"),
  linea_principal: z.string().min(1, "Campo obligatorio"),
  actualiza_datos: z.string().min(1, "Campo obligatorio"),
  recomienda_hughesnet: z.string().min(1, "Campo obligatorio"),
  mejor_horario: z.string().min(1, "Campo obligatorio"),
  medio_contacto_futuro: z.string().min(1, "Campo obligatorio"),
  linea_principal_no_acepta: z.string().min(1, "Campo obligatorio"),
  actualiza_datos_no_acepta: z.string().min(1, "Campo obligatorio"),
  recomienda_hughesnet_no_acepta: z.string().min(1, "Campo obligatorio"),
  mejor_horario_no_acepta: z.string().min(1, "Campo obligatorio"),
  medio_contacto_futuro_no_acepta: z.string().min(1, "Campo obligatorio"),
  debito_automatico: z.string().min(1, "Campo obligatorio"),
  resumen_gestion: z.string().min(1, "Campo obligatorio"),
  fecha_proxima_gestion: z.string().min(1, "Campo obligatorio"),
  descuentos_escalonados_info: z.string().optional(),
  cambio_plan_info: z.string().optional(),
  no_acepta_info: z.string().optional(),
  cierre_llamada_info: z.string().optional(),
  cierre_llamada_info_no_acepta: z.string().optional(),
  resultado_gestion_info: z.string().optional(),
  debito_automatico_info: z.string().optional(),
});
