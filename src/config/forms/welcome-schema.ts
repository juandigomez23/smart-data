import { z } from "zod"

export type WelcomeFormData = {
  correo: string;
  san: string;
  pais: string;
  tipo_servicio_peru?: string;
  medio_contacto_peru?: string;
  md_peru?: string;
  san_seguimiento_peru?: string;
  pago_primer_recibo_peru?: string;
  satisfecho_servicio_peru?: string;
  motivo_no_satisfecho_peru?: string;
  // Agrega aquí más campos opcionales según el config si lo necesitas
}

export const welcomeSchema = z.object({
  correo: z.string().email("Correo inválido"),
  san: z.string().min(3, "SAN obligatorio"),
  pais: z.string().min(1, "País obligatorio"),
  tipo_servicio_peru: z.string().optional(),
  medio_contacto_peru: z.string().optional(),
  md_peru: z.string().optional(),
  san_seguimiento_peru: z.string().optional(),
  pago_primer_recibo_peru: z.string().optional(),
  satisfecho_servicio_peru: z.string().optional(),
  motivo_no_satisfecho_peru: z.string().optional(),
  // Agrega aquí más validaciones opcionales si lo necesitas
});
