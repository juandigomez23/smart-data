import { z } from "zod";

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
  correo: z.string().email("Correo inválido"),
  san: z
    .string()
    .min(3, "SAN obligatorio")
    .refine(
      (val: string) => {
        return ["HCO", "HCL", "HEC", "HPE"].some((pref) =>
          val.startsWith(pref)
        );
      },
      {
        message: "El SAN debe iniciar con HCO, HCL, HEC o HPE según el país",
      }
    ),
  medio_comunicacion: z.string().min(1, "Campo obligatorio"),
  tipo_asignacion: z.string().min(1, "Campo obligatorio"),
  motivo_cancelacion: z.string().min(1, "Campo obligatorio"),
  codigo_gestion: z.string().min(1, "Campo obligatorio"),
  matriz_retencion: z.string().optional(),
  descuento_otorgado: z.string().optional(),
  meses_descuento: z.string().optional(),
  beneficio_plan: z.string().optional(),
  motivo_no_acepta: z.string().optional(),
  sustituye_servicio: z.string().optional(),
  linea_principal: z.string().optional(),
  actualiza_datos: z.string().optional(),
  recomienda_hughesnet: z.string().optional(),
  mejor_horario: z.string().optional(),
  medio_contacto_futuro: z.string().optional(),
  linea_principal_no_acepta: z.string().optional(),
  actualiza_datos_no_acepta: z.string().optional(),
  recomienda_hughesnet_no_acepta: z.string().optional(),
  mejor_horario_no_acepta: z.string().optional(),
  medio_contacto_futuro_no_acepta: z.string().optional(),
  debito_automatico: z.string().optional(),
  resumen_gestion: z.string().optional(),
  fecha_proxima_gestion: z.string().optional(),
  descuentos_escalonados_info: z.string().optional(),
  cambio_plan_info: z.string().optional(),
  no_acepta_info: z.string().optional(),
  cierre_llamada_info: z.string().optional(),
  cierre_llamada_info_no_acepta: z.string().optional(),
  resultado_gestion_info: z.string().optional(),
  debito_automatico_info: z.string().optional(),
});
