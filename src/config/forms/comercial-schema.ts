import { z } from "zod"
import { correoSchema, sanSchema } from "@/lib/validation-schemas"
export type ComercialFormData = {
  correo: string;
  san: string;
  pais: string;
  tipo_servicio: string;
  medio_contacto: string;
  campana: string;
  logra_contacto: string;
  numero_contacto: string;
  motivo_reincidencia: string;
  solucion_recibida: string;
  escala_a: string;
  acepta_pat: string;
  codigo_gestion: string;
  observaciones: string;
  sugerencias: string;
}

export const comercialSchema = z.object({
  correo: correoSchema,
  san: sanSchema,
  pais: z.string().min(1, "País obligatorio"),
  tipo_servicio: z.string().min(1, "Campo obligatorio"),
  medio_contacto: z.string().min(1, "Campo obligatorio"),
  campana: z.string().min(1, "Campo obligatorio"),
  logra_contacto: z.string().min(1, "Campo obligatorio"),
  numero_contacto: z.string().min(1, "Campo obligatorio"),
  motivo_reincidencia: z.string().min(1, "Campo obligatorio"),
  
  escala_a: z.string().min(1, "Campo obligatorio"),
  acepta_pat: z.string().min(1, "Campo obligatorio"),
  codigo_gestion: z.string().min(1, "Campo obligatorio"),
  observaciones: z.string().min(1, "Campo obligatorio"),
  sugerencias: z.string().min(1, "Campo obligatorio"),
});
