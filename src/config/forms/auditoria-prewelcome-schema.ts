import { z } from "zod"

export type AuditoriaPrewelcomeFormData = {
  correo: string;
  pais: string;
  san: string;
  fecha_creacion_san?: string;
  master_dealer?: string;
  documento_id?: string;
  correo_electronico?: string;
  telefono?: string;
  direccion?: string;
  total_datos_correctos?: string;
  documento_cliente?: string;
  linea_contacto_principal?: string;
  linea_contacto_secundaria?: string;
  email?: string;
  tipo_venta?: string;
  // Agrega aquí más campos opcionales según el config si lo necesitas
}

export const auditoriaPrewelcomeSchema = z.object({
  correo: z.string().email("Correo inválido"),
  pais: z.string().min(1, "País obligatorio"),
  san: z.string().min(3, "SAN obligatorio"),
  fecha_creacion_san: z.string().optional(),
  master_dealer: z.string().optional(),
  documento_id: z.string().optional(),
  correo_electronico: z.string().optional(),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  total_datos_correctos: z.string().optional(),
  documento_cliente: z.string().optional(),
  linea_contacto_principal: z.string().optional(),
  linea_contacto_secundaria: z.string().optional(),
  email: z.string().optional(),
  tipo_venta: z.string().optional(),
  // Agrega aquí más validaciones opcionales si lo necesitas
});
