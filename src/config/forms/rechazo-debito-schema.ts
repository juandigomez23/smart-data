import { z } from "zod"

export type RechazoDebitoFormData = {
  correo: string;
  pais: string;
  san_chile?: string;
  san_colombia?: string;
  san_ecuador?: string;
  san_peru?: string;
  numero_telefonico_peru?: string;
  medio_contacto_peru?: string;
  ciclo_factura_peru?: string;
  motivo_rechazo_peru?: string;
  acepta_debito_peru?: string;
  fecha_acuerdo_pago_peru?: string;
  codigo_gestion_peru?: string;
  observaciones_peru?: string;
  numero_telefonico_ecuador?: string;
  medio_contacto_ecuador?: string;
  ciclo_factura_ecuador?: string;
  motivo_rechazo_ecuador?: string;
  // Agrega aquí más campos opcionales según el config si lo necesitas
}

export const rechazoDebitoSchema = z.object({
  correo: z.string().email("Correo inválido"),
  pais: z.string().min(1, "País obligatorio"),
  san_chile: z.string().optional(),
  san_colombia: z.string().optional(),
  san_ecuador: z.string().optional(),
  san_peru: z.string().optional(),
  numero_telefonico_peru: z.string().optional(),
  medio_contacto_peru: z.string().optional(),
  ciclo_factura_peru: z.string().optional(),
  motivo_rechazo_peru: z.string().optional(),
  acepta_debito_peru: z.string().optional(),
  fecha_acuerdo_pago_peru: z.string().optional(),
  codigo_gestion_peru: z.string().optional(),
  observaciones_peru: z.string().optional(),
  numero_telefonico_ecuador: z.string().optional(),
  medio_contacto_ecuador: z.string().optional(),
  ciclo_factura_ecuador: z.string().optional(),
  motivo_rechazo_ecuador: z.string().optional(),
  // Agrega aquí más validaciones opcionales si lo necesitas
});
