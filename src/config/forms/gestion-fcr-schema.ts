import { z } from "zod"

export type GestionFcrFormData = {
  correo: string;
  san: string;
  fso?: string;
  pais: string;
  codigo_error_inicial?: string;
  codigo_error_final?: string;
  codigo_gestion?: string;
  accion_realizada?: string;
  observaciones?: string;
}

export const gestionFcrSchema = z.object({
  correo: z.string().email("Correo inválido"),
  san: z.string().min(3, "SAN obligatorio"),
  fso: z.string().optional(),
  pais: z.string().min(1, "País obligatorio"),
  codigo_error_inicial: z.string().optional(),
  codigo_error_final: z.string().optional(),
  codigo_gestion: z.string().optional(),
  accion_realizada: z.string().optional(),
  observaciones: z.string().optional(),
});
