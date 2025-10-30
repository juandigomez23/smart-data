import { z } from "zod"

export type otrasGestionesFormData = {
  correo: string;
  hora_inicio_gestion_info: string;
  hora_inicio_gestion: string;
  pais: string;
  san_cedula_nit: string;
  medio_contacto: string;
  tipo_gestion: string;
  observacion: string;
  
}

export const otrasGestionesFormSchema = z.object({
  correo: z.string().min(1, "Campo obligatorio"),
  hora_inicio_gestion_info: z.string().optional(),
  hora_inicio_gestion: z.string().min(1, "Campo obligatorio"),
  pais: z.string().min(1, "Campo obligatorio"),
  san_cedula_nit: z.string().min(1, "Campo obligatorio"),
  medio_contacto: z.string().min(1, "Campo obligatorio"),
  tipo_gestion: z.string().min(1, "Campo obligatorio"),
  observacion: z.string().min(1, "Campo obligatorio"),




})
export const otrasGestionesSchema = otrasGestionesFormSchema