import { z } from "zod"
import { correoSchema } from "@/lib/validation-schemas"
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
  correo: correoSchema,
  pais: z.string().min(1, "País obligatorio"),
  san_chile: z.string().min(1, "SAN Chile obligatorio"),
  san_colombia: z.string().min(1, "SAN Colombia obligatorio"),
  san_ecuador: z.string().min(1, "SAN Ecuador obligatorio"),
  san_peru: z.string().min(1, "SAN Perú obligatorio"),
  medio_contacto_peru: z.string().min(1, "Medio de contacto (Perú) obligatorio"),
  ciclo_factura_peru: z.string().min(1, "Ciclo factura (Perú) obligatorio"),
  motivo_rechazo_peru: z.string().min(1, "Motivo rechazo (Perú) obligatorio"),
  acepta_debito_peru: z.string().min(1, "Acepta débito (Perú) obligatorio"),
  codigo_gestion_peru: z.string().min(1, "Código gestión (Perú) obligatorio"),
  observaciones_peru: z.string().min(1, "Observaciones (Perú) obligatorias"),
  medio_contacto_ecuador: z.string().min(1, "Medio de contacto (Ecuador) obligatorio"),
  ciclo_factura_ecuador: z.string().min(1, "Ciclo factura (Ecuador) obligatorio"),
  motivo_rechazo_ecuador: z.string().min(1, "Motivo rechazo (Ecuador) obligatorio"),
  acepta_debito_ecuador: z.string().min(1, "Acepta débito (Ecuador) obligatorio"),
  codigo_gestion_ecuador: z.string().min(1, "Código gestión (Ecuador) obligatorio"),
  observaciones_ecuador: z.string().min(1, "Observaciones (Ecuador) obligatorias"),
  medio_contacto_colombia: z.string().min(1, "Medio de contacto (Colombia) obligatorio"),
  ciclo_factura_colombia: z.string().min(1, "Ciclo factura (Colombia) obligatorio"),
  motivo_rechazo_colombia: z.string().min(1, "Motivo rechazo (Colombia) obligatorio"),
  acepta_debito_colombia: z.string().min(1, "Acepta débito (Colombia) obligatorio"),
  codigo_gestion_colombia: z.string().min(1, "Código gestión (Colombia) obligatorio"),
  observaciones_colombia: z.string().min(1, "Observaciones (Colombia) obligatorias"),
  medio_contacto: z.string().min(1, "Medio de contacto obligatorio"),
  ciclo_factura: z.string().min(1, "Ciclo factura obligatorio"),
  motivo_rechazo: z.string().min(1, "Motivo rechazo obligatorio"),
  acepta_debito: z.string().min(1, "Acepta débito obligatorio"),
  codigo_gestion: z.string().min(1, "Código gestión obligatorio"),
  observaciones: z.string().min(1, "Observaciones obligatorias"),
});
