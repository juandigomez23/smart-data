import { z } from "zod"

export type RechazoDebitoFormData = {
  correo: string;
  pais: string;
  san_chile: string;
  san_colombia: string;
  san_ecuador: string;
  san_peru: string;
  numero_telefonico_peru: string;
  medio_contacto_peru: string;
  ciclo_factura_peru: string;
  motivo_rechazo_peru: string;
  acepta_debito_peru: string;
  fecha_acuerdo_pago_peru: string;
  codigo_gestion_peru: string;
  observaciones_peru: string;
  numero_telefonico_ecuador: string;
  medio_contacto_ecuador: string;
  ciclo_factura_ecuador: string;
  motivo_rechazo_ecuador: string;
  acepta_debito_ecuador: string;
  fecha_acuerdo_pago_ecuador: string;
  codigo_gestion_ecuador: string;
  observaciones_ecuador: string;
  numero_telefonico_colombia: string;
  medio_contacto_colombia: string;
  ciclo_factura_colombia: string;
  motivo_rechazo_colombia: string;
  acepta_debito_colombia: string;
  fecha_acuerdo_pago_colombia: string;
  codigo_gestion_colombia: string;
  observaciones_colombia: string;
  numero_telefonico: string;
  medio_contacto: string;
  ciclo_factura: string;
  motivo_rechazo: string;
  acepta_debito: string;
  fecha_acuerdo_pago: string;
  codigo_gestion: string;
  observaciones: string;
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
  acepta_debito_ecuador: z.string().optional(),
  fecha_acuerdo_pago_ecuador: z.string().optional(),
  codigo_gestion_ecuador: z.string().optional(),
  observaciones_ecuador: z.string().optional(),
  numero_telefonico_colombia: z.string().optional(),
  medio_contacto_colombia: z.string().optional(),
  ciclo_factura_colombia: z.string().optional(),
  motivo_rechazo_colombia: z.string().optional(),
  acepta_debito_colombia: z.string().optional(),
  fecha_acuerdo_pago_colombia: z.string().optional(),
  codigo_gestion_colombia: z.string().optional(),
  observaciones_colombia: z.string().optional(),
  numero_telefonico: z.string().optional(),
  medio_contacto: z.string().optional(),
  ciclo_factura: z.string().optional(),
  motivo_rechazo: z.string().optional(),
  acepta_debito: z.string().optional(),
  fecha_acuerdo_pago: z.string().optional(),
  codigo_gestion: z.string().optional(),
  observaciones: z.string().optional(),
});
