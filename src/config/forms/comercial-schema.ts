import { z } from "zod"

export type ComercialFormData = {
  correo: string;
  san: string;
  pais: string;
  tipo_servicio?: string;
  medio_contacto?: string;
  campana?: string;
  logra_contacto?: string;
  numero_contacto?: string;
  motivo_reincidencia?: string;
  solucion_recibida?: string;
  // Agrega aquí más campos opcionales según el config si lo necesitas
}

export const comercialSchema = z.object({
  correo: z.string().email("Correo inválido"),
  san: z.string().min(3, "SAN obligatorio"),
  pais: z.string().min(1, "País obligatorio"),
  tipo_servicio: z.string().optional(),
  medio_contacto: z.string().optional(),
  campana: z.string().optional(),
  logra_contacto: z.string().optional(),
  numero_contacto: z.string().optional(),
  motivo_reincidencia: z.string().optional(),
  solucion_recibida: z.string().optional(),
  // Agrega aquí más validaciones opcionales si lo necesitas
});
