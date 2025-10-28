import { z } from "zod"
import { correoSchema, sanSchema } from "@/lib/validation-schemas";

export type GestionFcrFormData = {
  correo: string;
  san: string;
  fso: string;
  pais: string;
  codigo_error_inicial: string;
  codigo_error_final: string;
  codigo_gestion: string;
  accion_realizada: string;
  observaciones: string;
}

export const gestionFcrSchema = z.object({
  correo: correoSchema,
  san: sanSchema,
  fso: z.string().min(1, "Campo obligatorio"),
  pais: z.string().min(1, "País obligatorio"),
  codigo_error_inicial: z.string().min(1, "Campo obligatorio"),
  codigo_error_final: z.string().min(1, "Campo obligatorio"),
  codigo_gestion: z.string().min(1, "Campo obligatorio"),
  accion_realizada: z.string().min(1, "Campo obligatorio"),
  observaciones: z.string().min(1, "Campo obligatorio"),
});
