import { z } from "zod"
import { correoSchema, sanSchema } from "@/lib/validation-schemas"

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
  documento_id_natural?: string;
  validacion_id_natural?: string;
  factura_carta_natural?: string;
  historial_crediticio_natural?: string;
  confirmacion_contrato_natural?: string;
  nit_rut_pyme?: string;
  documento_id_representante_pyme?: string;
  validacion_id_representante_pyme?: string;
  factura_carta_pyme?: string;
  autorizacion_tercero_pyme?: string;
  historial_crediticio_pyme?: string;
  confirmacion_contrato_pyme?: string;
  hughespro_estado_pyme?: string;
  hughespro_validacion_id_pyme?: string;
  autorizacion_gerencia_historial_pyme?: string;
  autorizado_gerencia_sin_hughespro_pyme?: string;
  autorizado_gerencia_mas_servicios_pyme?: string;
  estado_servicio_pyme?: string;
  fecha_liberacion_pyme?: string;
  codigo_gestion_pyme?: string;
  hughespro_estado?: string;
  hughespro_validacion_id?: string;
  autorizacion_gerencia_historial?: string;
  autorizado_gerencia_sin_hughespro?: string;
  autorizado_gerencia_mas_servicios?: string;
  estado_servicio?: string;
  fecha_liberacion?: string;
  codigo_gestion?: string;
  observacion?: string;
  observacion_pyme?: string;
}

export const auditoriaPrewelcomeSchema = z.object({
  correo: correoSchema,
  pais: z.string().optional(),
  san: sanSchema,
  fecha_creacion_san: z.string().min(1, "Campo obligatorio"),
  master_dealer: z.string().min(1, "Campo obligatorio"),
  documento_id: z.string().min(1, "Campo obligatorio"),
  correo_electronico: z.string().min(1, "Campo obligatorio"),
  telefono: z.string().min(1, "Campo obligatorio"),
  direccion: z.string().min(1, "Campo obligatorio"),
  total_datos_correctos: z.string().min(1, "Campo obligatorio"),
  documento_cliente: z.string().min(1, "Campo obligatorio"),
  linea_contacto_principal: z.string().min(1, "Campo obligatorio"),
  email: z.string().min(1, "Campo obligatorio"),
  tipo_venta: z.string().min(1, "Campo obligatorio"),
  documento_id_natural: z.string().min(1, "Campo obligatorio"),
  validacion_id_natural: z.string().min(1, "Campo obligatorio"),
  factura_carta_natural: z.string().min(1, "Campo obligatorio"),
  historial_crediticio_natural: z.string().min(1, "Campo obligatorio"),
  confirmacion_contrato_natural: z.string().min(1, "Campo obligatorio"),
  nit_rut_pyme: z.string().min(1, "Campo obligatorio"),
  documento_id_representante_pyme: z.string().min(1, "Campo obligatorio"),
  validacion_id_representante_pyme: z.string().min(1, "Campo obligatorio"),
  factura_carta_pyme: z.string().min(1, "Campo obligatorio"),
  autorizacion_tercero_pyme: z.string().min(1, "Campo obligatorio"),
  historial_crediticio_pyme: z.string().min(1, "Campo obligatorio"),
  confirmacion_contrato_pyme: z.string().min(1, "Campo obligatorio"),
  hughespro_estado_pyme: z.string().min(1, "Campo obligatorio"),
  hughespro_validacion_id_pyme: z.string().min(1, "Campo obligatorio"),
  autorizacion_gerencia_historial_pyme: z.string().min(1, "Campo obligatorio"),
  autorizado_gerencia_sin_hughespro_pyme: z.string().min(1, "Campo obligatorio"),
  autorizado_gerencia_mas_servicios_pyme: z.string().min(1, "Campo obligatorio"),
  estado_servicio_pyme: z.string().min(1, "Campo obligatorio"),
  
  codigo_gestion_pyme: z.string().min(1, "Campo obligatorio"),
  hughespro_estado: z.string().min(1, "Campo obligatorio"),
  hughespro_validacion_id: z.string().min(1, "Campo obligatorio"),
  autorizacion_gerencia_historial: z.string().min(1, "Campo obligatorio"),
  autorizado_gerencia_sin_hughespro: z.string().min(1, "Campo obligatorio"),
  autorizado_gerencia_mas_servicios: z.string().min(1, "Campo obligatorio"),
  estado_servicio: z.string().min(1, "Campo obligatorio"),
  
  codigo_gestion: z.string().min(1, "Campo obligatorio"),
  observacion: z.string().optional(),
  observacion_pyme: z.string().optional(),
});
