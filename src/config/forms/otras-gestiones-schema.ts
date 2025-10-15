import { z } from "zod"

export type OtrasGestionesFormData = {
  correo: string;
  hora_inicio_gestion: string;
  pais: string;
  san_cedula_nit: string;
  medio_contacto: string;
  tipo_gestion: string;
  observacion: string;
  
}

export const otrasGestionesSchema = z.object({
  correo: z.string().email("Correo inválido"),
  hora_inicio_gestion: z.string().min(1, "Campo obligatorio"),
  pais: z.string().min(1, "País obligatorio"),
  san_cedula_nit: z.string().min(1, "Campo obligatorio"),
  medio_contacto: z.string().min(1, "Campo obligatorio"),
  tipo_gestion: z.string().min(1, "Campo obligatorio"),
  observacion: z.string().min(1, "Campo obligatorio"),
  
});
