import { z } from "zod"

export type OtrasGestionesFormData = {
  correo: string;
  hora_inicio_gestion?: string;
  pais: string;
  san_cedula_nit?: string;
  medio_contacto?: string;
  tipo_gestion?: string;
  observacion?: string;
  // Agrega aquí más campos opcionales según el config si lo necesitas
}

export const otrasGestionesSchema = z.object({
  correo: z.string().email("Correo inválido"),
  hora_inicio_gestion: z.string().optional(),
  pais: z.string().min(1, "País obligatorio"),
  san_cedula_nit: z.string().optional(),
  medio_contacto: z.string().optional(),
  tipo_gestion: z.string().optional(),
  observacion: z.string().optional(),
  // Agrega aquí más validaciones opcionales si lo necesitas
});
