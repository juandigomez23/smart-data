import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Diccionarios de nombres amigables por formulario y país
export type WelcomeForm = Record<string, string | number | boolean | null | undefined>;
export type AuditoriaPrewelcomeForm = Record<string, string | number | boolean | null | undefined>;
export type ComercialForm = Record<string, string | number | boolean | null | undefined>;
export type GestionFCRForm = Record<string, string | number | boolean | null | undefined>;
export type OtrasGestionesForm = Record<string, string | number | boolean | null | undefined>;
export type RetencionesForm = Record<string, string | number | boolean | null | undefined>;

export type FormularioTipo =
  | "welcome"
  | "auditoria_prewelcome"
  | "comercial"
  | "gestion_fcr"
  | "otras_gestiones"
  | "retenciones";

export type FormularioDatos =
  | WelcomeForm
  | AuditoriaPrewelcomeForm
  | ComercialForm
  | GestionFCRForm
  | OtrasGestionesForm
  | RetencionesForm;

type DiccionarioCampos = {
  [key: string]: { [campo: string]: string };
};

const nombresCampos: DiccionarioCampos = {
  welcome: {
    // Generales
    correo: "Correo",
    san: "SAN",
    pais: "País",
    codigo_gestion: "Código de gestión",
    observacion: "Observación",
    sugerencia: "Sugerencia",
    // Perú
    tipo_servicio_peru: "Tipo de servicio",
    medio_contacto_peru: "Medio de contacto",
    md_peru: "Master Dealer",
    san_seguimiento_peru: "SAN Seguimiento",
    pago_primer_recibo_peru: "¿Pagó primer recibo?",
    satisfecho_servicio_peru: "¿Satisfecho con el servicio?",
    motivo_no_satisfecho_peru: "Motivo de no satisfacción",
    escala_soporte_peru: "Escala de soporte",
    continuar_servicio_peru: "¿Continúa con el servicio?",
    uso_servicio_peru_continuar: "Uso del servicio (si continúa)",
    cuando_pago_peru_continuar: "¿Cuándo paga? (si continúa)",
    medio_pago_peru_continuar: "Medio de pago (si continúa)",
    fecha_pago_peru_continuar: "Fecha de pago (si continúa)",
    acepta_debito_peru_continuar: "¿Acepta débito automático? (si continúa)",
    como_debito_peru_continuar_si: "¿Cómo se realiza el débito? (si continúa)",
    como_debito_peru_continuar_inscrito: "¿Está inscrito en débito? (si continúa)",
    motivo_no_debito_peru_continuar: "Motivo de no aceptar débito (si continúa)",
    uso_servicio_peru: "Uso del servicio",
    cuando_pago_peru: "¿Cuándo paga?",
    medio_pago_peru: "Medio de pago",
    fecha_pago_peru: "Fecha de pago",
    acepta_debito_peru: "¿Acepta débito automático?",
    como_debito_peru_si: "¿Cómo se realiza el débito?",
    como_debito_peru_inscrito: "¿Está inscrito en débito?",
    motivo_no_debito_peru: "Motivo de no aceptar débito",
    numero_contacto_peru: "Número de contacto",
    // Ecuador
    tipo_servicio_ecuador: "Tipo de servicio",
    medio_contacto_ecuador: "Medio de contacto",
    md_ecuador: "Master Dealer",
    san_seguimiento_ecuador: "SAN Seguimiento",
    pago_primer_recibo_ecuador: "¿Pagó primer recibo?",
    satisfecho_servicio_ecuador: "¿Satisfecho con el servicio?",
    motivo_no_satisfecho_ecuador: "Motivo de no satisfacción",
    escala_soporte_ecuador: "Escala de soporte",
    continuar_servicio_ecuador: "¿Continúa con el servicio?",
    uso_servicio_ecuador_continuar: "Uso del servicio (si continúa)",
    cuando_pago_ecuador_continuar: "¿Cuándo paga? (si continúa)",
    medio_pago_ecuador_continua: "Medio de pago (si continúa)",
    fecha_pago_ecuador_continuar: "Fecha de pago (si continúa)",
    acepta_debito_ecuador_continua: "¿Acepta débito automático? (si continúa)",
    como_debito_ecuador_si_continua: "¿Cómo se realiza el débito? (si continúa)",
    como_debito_ecuador_inscrito_continua: "¿Está inscrito en débito? (si continúa)",
    motivo_no_debito_ecuador_continua: "Motivo de no aceptar débito (si continúa)",
    uso_servicio_ecuador: "Uso del servicio",
    cuando_pago_ecuador: "¿Cuándo paga?",
    medio_pago_ecuador: "Medio de pago",
    como_debito_ecuador_si: "¿Cómo se realiza el débito?",
    motivo_no_debito_ecuador: "Motivo de no aceptar débito",
    numero_contacto_ecuador: "Número de contacto",
    // Chile
    tipo_servicio_chile: "Tipo de servicio",
    medio_contacto_chile: "Medio de contacto",
    md_chile: "Master Dealer",
    pago_primera_boleta_chile: "¿Pagó primera boleta?",
    satisfecho_servicio_chile: "¿Satisfecho con el servicio?",
    motivo_no_satisfecho_chile: "Motivo de no satisfacción",
    escala_soporte_chile: "Escala de soporte",
    escala_contacto_chile: "Escala de contacto",
    continuar_servicio_chile: "¿Continúa con el servicio?",
    uso_servicio_chile_continua: "Uso del servicio (si continúa)",
    cuando_pago_chile_continua: "¿Cuándo paga? (si continúa)",
    medio_pago_chile_continua: "Medio de pago (si continúa)",
    fecha_pago_chile_continua: "Fecha de pago (si continúa)",
    acepta_pat_chile_continua: "¿Acepta PAT? (si continúa)",
    como_pat_chile_si_continua: "¿Cómo se realiza el PAT? (si continúa)",
    como_pat_chile_inscrito_continua: "¿Está inscrito en PAT? (si continúa)",
    motivo_no_pat_chile_continua: "Motivo de no aceptar PAT (si continúa)",
    uso_servicio_chile: "Uso del servicio",
    cuando_pago_chile: "¿Cuándo paga?",
    medio_pago_chile: "Medio de pago",
    fecha_pago_chile: "Fecha de pago",
    acepta_pat_chile: "¿Acepta PAT?",
    como_pat_chile_si: "¿Cómo se realiza el PAT?",
    como_pat_chile_inscrito: "¿Está inscrito en PAT?",
    motivo_no_pat_chile: "Motivo de no aceptar PAT",
    numero_contacto_chile: "Número de contacto",
    // Colombia
    tipo_servicio_colombia: "Tipo de servicio",
    medio_contacto_colombia: "Medio de contacto",
    md_colombia: "Master Dealer",
    proceso_liberada_colombia: "Proceso liberada",
    san_seguimiento_colombia: "SAN Seguimiento",
    pago_primera_factura_colombia: "¿Pagó primera factura?",
    satisfecho_servicio_colombia: "¿Satisfecho con el servicio?",
    motivo_no_satisfecho_colombia: "Motivo de no satisfacción",
    escala_soporte_colombia: "Escala de soporte",
    continuar_servicio_colombia: "¿Continúa con el servicio?",
    uso_servicio_colombia_continua: "Uso del servicio (si continúa)",
    cuando_pago_colombia_continua: "¿Cuándo paga? (si continúa)",
    medio_pago_colombia_continua: "Medio de pago (si continúa)",
    fecha_pago_colombia_continua: "Fecha de pago (si continúa)",
    fecha_pago_colombia_proximo_corte_continua: "Fecha próximo corte (si continúa)",
    fecha_pago_colombia_proxima_semana_continua: "Fecha próxima semana (si continúa)",
    acepta_debito_colombia_continua: "¿Acepta débito automático? (si continúa)",
    como_debito_colombia_si_continua: "¿Cómo se realiza el débito? (si continúa)",
    como_debito_colombia_inscrito_continua: "¿Está inscrito en débito? (si continúa)",
    motivo_no_debito_colombia_continua: "Motivo de no aceptar débito (si continúa)",
    numero_contacto_colombia_continua: "Número de contacto (si continúa)",
    uso_servicio_colombia: "Uso del servicio",
    cuando_pago_colombia: "¿Cuándo paga?",
    medio_pago_colombia: "Medio de pago",
    fecha_pago_colombia: "Fecha de pago",
    acepta_debito_colombia: "¿Acepta débito automático?",
    como_debito_colombia_si: "¿Cómo se realiza el débito?",
    como_debito_colombia_inscrito: "¿Está inscrito en débito?",
    motivo_no_debito_colombia: "Motivo de no aceptar débito",
    numero_contacto_colombia: "Número de contacto",
  },
  auditoria_prewelcome: {
    correo: "Correo",
    pais: "País",
    san: "SAN",
    fecha_creacion_san: "Fecha creación SAN",
    master_dealer: "Master Dealer",
    documento_id: "Documento ID",
    correo_electronico: "Correo electrónico",
    telefono: "Teléfono",
    direccion: "Dirección",
    total_datos_correctos: "Total datos correctos",
    documento_cliente: "Documento cliente",
    linea_contacto_principal: "Línea contacto principal",
    linea_contacto_secundaria: "Línea contacto secundaria",
    email: "Email",
    tipo_venta: "Tipo de venta",
    documento_id_natural: "Documento ID Natural",
    validacion_id_natural: "Validación ID Natural",
    factura_carta_natural: "Factura carta natural",
    historial_crediticio_natural: "Historial crediticio natural",
    confirmacion_contrato_natural: "Confirmación contrato natural",
    nit_rut_pyme: "NIT/RUT Pyme",
    documento_id_representante_pyme: "Documento ID representante Pyme",
    validacion_id_representante_pyme: "Validación ID representante Pyme",
    factura_carta_pyme: "Factura carta Pyme",
    autorizacion_tercero_pyme: "Autorización tercero Pyme",
    historial_crediticio_pyme: "Historial crediticio Pyme",
    confirmacion_contrato_pyme: "Confirmación contrato Pyme",
    hughespro_estado_pyme: "Estado HughesPro Pyme",
    hughespro_validacion_id_pyme: "Validación ID HughesPro Pyme",
    autorizacion_gerencia_historial_pyme: "Autorización gerencia historial Pyme",
    autorizado_gerencia_sin_hughespro_pyme: "Autorizado gerencia sin HughesPro Pyme",
    autorizado_gerencia_mas_servicios_pyme: "Autorizado gerencia más servicios Pyme",
    estado_servicio_pyme: "Estado servicio Pyme",
    fecha_liberacion_pyme: "Fecha liberación Pyme",
    codigo_gestion_pyme: "Código gestión Pyme",
    hughespro_estado: "Estado HughesPro",
    hughespro_validacion_id: "Validación ID HughesPro",
    autorizacion_gerencia_historial: "Autorización gerencia historial",
    autorizado_gerencia_sin_hughespro: "Autorizado gerencia sin HughesPro",
    autorizado_gerencia_mas_servicios: "Autorizado gerencia más servicios",
    estado_servicio: "Estado servicio",
    fecha_liberacion: "Fecha liberación",
    codigo_gestion: "Código gestión",
    observacion: "Observación",
    observacion_pyme: "Observación Pyme",
  },
  comercial: {
    correo: "Correo",
    san: "SAN",
    pais: "País",
    tipo_servicio: "Tipo de servicio",
    medio_contacto: "Medio de contacto",
    campana: "Campaña",
    logra_contacto: "¿Logra contacto?",
    numero_contacto: "Número de contacto",
    motivo_reincidencia: "Motivo de reincidencia",
    solucion_recibida: "Solución recibida",
    escala_a: "Escala A",
    acepta_pat: "¿Acepta PAT?",
    codigo_gestion: "Código de gestión",
    observaciones: "Observaciones",
    sugerencias: "Sugerencias",
  },
  gestion_fcr: {
    correo: "Correo",
    san: "SAN",
    fso: "FSO",
    pais: "País",
    codigo_error_inicial: "Código error inicial",
    codigo_error_final: "Código error final",
    codigo_gestion: "Código de gestión",
    accion_realizada: "Acción realizada",
    observaciones: "Observaciones",
  },
  otras_gestiones: {
    correo: "Correo",
    hora_inicio_gestion: "Hora inicio gestión",
    pais: "País",
    san_cedula_nit: "SAN/Cédula/NIT",
    medio_contacto: "Medio de contacto",
    tipo_gestion: "Tipo de gestión",
    observacion: "Observación",
  },
  retenciones: {
    correo: "Correo",
    san: "SAN",
    medio_comunicacion: "Medio de comunicación",
    tipo_asignacion: "Tipo de asignación",
    motivo_cancelacion: "Motivo de cancelación",
    codigo_gestion: "Código de gestión",
    matriz_retencion: "Matriz de retención",
    descuento_otorgado: "Descuento otorgado",
    meses_descuento: "Meses de descuento",
    beneficio_plan: "Beneficio del plan",
    motivo_no_acepta: "Motivo no acepta",
    sustituye_servicio: "Sustituye servicio",
    linea_principal: "Línea principal",
    actualiza_datos: "Actualiza datos",
    recomienda_hughesnet: "¿Recomienda HughesNet?",
    mejor_horario: "Mejor horario",
    medio_contacto_futuro: "Medio contacto futuro",
    linea_principal_no_acepta: "Línea principal no acepta",
    actualiza_datos_no_acepta: "Actualiza datos no acepta",
    recomienda_hughesnet_no_acepta: "¿Recomienda HughesNet? (no acepta)",
    mejor_horario_no_acepta: "Mejor horario (no acepta)",
    medio_contacto_futuro_no_acepta: "Medio contacto futuro (no acepta)",
    debito_automatico: "Débito automático",
    resumen_gestion: "Resumen gestión",
    fecha_proxima_gestion: "Fecha próxima gestión",
    descuentos_escalonados_info: "Descuentos escalonados info",
    cambio_plan_info: "Cambio de plan info",
    no_acepta_info: "No acepta info",
    cierre_llamada_info: "Cierre llamada info",
    cierre_llamada_info_no_acepta: "Cierre llamada info (no acepta)",
    resultado_gestion_info: "Resultado gestión info",
    debito_automatico_info: "Débito automático info",
  },
};



export interface ExportFormulario {
  tipo: FormularioTipo;
  datos: FormularioDatos[];
  pais?: string;
}


export function exportToExcelFormularios(formularios: ExportFormulario[], fileName = "formularios.xlsx") {

  const workbook = XLSX.utils.book_new();

  const fieldsOrderMap: { [key: string]: string[] } = {
    welcome: [
      "correo", "san", "pais", "codigo_gestion", "observacion", "sugerencia", "tipo_servicio_peru", "medio_contacto_peru", "md_peru", "san_seguimiento_peru", "pago_primer_recibo_peru", "satisfecho_servicio_peru", "motivo_no_satisfecho_peru", "escala_soporte_peru", "continuar_servicio_peru", "uso_servicio_peru_continuar", "cuando_pago_peru_continuar", "medio_pago_peru_continuar", "fecha_pago_peru_continuar", "acepta_debito_peru_continuar", "como_debito_peru_continuar_si", "como_debito_peru_continuar_inscrito", "motivo_no_debito_peru_continuar", "uso_servicio_peru", "cuando_pago_peru", "medio_pago_peru", "fecha_pago_peru", "acepta_debito_peru", "como_debito_peru_si", "como_debito_peru_inscrito", "motivo_no_debito_peru", "numero_contacto_peru"
    ],
    auditoria_prewelcome: [
      "correo", "pais", "san", "fecha_creacion_san", "master_dealer", "documento_id", "correo_electronico", "telefono", "direccion", "total_datos_correctos", "documento_cliente", "linea_contacto_principal", "linea_contacto_secundaria", "email", "tipo_venta", "documento_id_natural", "validacion_id_natural", "factura_carta_natural", "historial_crediticio_natural", "confirmacion_contrato_natural", "nit_rut_pyme", "documento_id_representante_pyme", "validacion_id_representante_pyme", "factura_carta_pyme", "autorizacion_tercero_pyme", "historial_crediticio_pyme", "confirmacion_contrato_pyme", "hughespro_estado_pyme", "hughespro_validacion_id_pyme", "autorizacion_gerencia_historial_pyme", "autorizado_gerencia_sin_hughespro_pyme", "autorizado_gerencia_mas_servicios_pyme", "estado_servicio_pyme", "fecha_liberacion_pyme", "codigo_gestion_pyme", "hughespro_estado", "hughespro_validacion_id", "autorizacion_gerencia_historial", "autorizado_gerencia_sin_hughespro", "autorizado_gerencia_mas_servicios", "estado_servicio", "fecha_liberacion", "codigo_gestion", "observacion", "observacion_pyme"
    ],
    comercial: [
      "correo", "san", "pais", "tipo_servicio", "medio_contacto", "campana", "logra_contacto", "numero_contacto", "motivo_reincidencia", "solucion_recibida", "escala_a", "acepta_pat", "codigo_gestion", "observaciones", "sugerencias"
    ],
    gestion_fcr: [
      "correo", "san", "fso", "pais", "codigo_error_inicial", "codigo_error_final", "codigo_gestion", "accion_realizada", "observaciones"
    ],
    otras_gestiones: [
      "correo", "hora_inicio_gestion", "pais", "san_cedula_nit", "medio_contacto", "tipo_gestion", "observacion"
    ],
    retenciones: [
      "correo", "san", "medio_comunicacion", "tipo_asignacion", "motivo_cancelacion", "codigo_gestion", "matriz_retencion", "descuento_otorgado", "meses_descuento", "beneficio_plan", "motivo_no_acepta", "sustituye_servicio", "linea_principal", "actualiza_datos", "recomienda_hughesnet", "mejor_horario", "medio_contacto_futuro", "linea_principal_no_acepta", "actualiza_datos_no_acepta", "recomienda_hughesnet_no_acepta", "mejor_horario_no_acepta", "medio_contacto_futuro_no_acepta", "debito_automatico", "resumen_gestion", "fecha_proxima_gestion", "descuentos_escalonados_info", "cambio_plan_info", "no_acepta_info", "cierre_llamada_info", "cierre_llamada_info_no_acepta", "resultado_gestion_info", "debito_automatico_info"
    ]
  };
  formularios.forEach(({ tipo, datos }) => {
    const diccionario = nombresCampos[tipo] || {};
    const extraFields = ["ID", "Tipo", "Asesor", "Fecha"];
    const fieldsOrder = fieldsOrderMap[tipo] || Object.keys(diccionario);

    const transformados: Record<string, string | number | boolean | null | undefined>[] = [];

    datos.forEach((registro) => {
      const fila: Record<string, string | number | boolean | null | undefined> = {};

      extraFields.forEach((campo) => {
        if (registro[campo] !== undefined) fila[campo] = registro[campo];
      });

      let datosParseados = false;
      if (typeof registro["Datos"] === "string") {
        try {
          const datosObj = JSON.parse(registro["Datos"]);
          // Ordena según fieldsOrder
          fieldsOrder.forEach((key) => {
            if (datosObj[key] !== undefined) {
              const nombreAmigable = diccionario[key] || key;
              fila[nombreAmigable] = datosObj[key] !== undefined && datosObj[key] !== null ? String(datosObj[key]) : datosObj[key];
            }
          });
          // Agrega cualquier campo extra no listado
          Object.entries(datosObj).forEach(([key, value]) => {
            if (!fieldsOrder.includes(key)) {
              const nombreAmigable = diccionario[key] || key;
              fila[nombreAmigable] = value !== undefined && value !== null ? String(value) : value;
            }
          });
          datosParseados = true;
        } catch {
          fila["ErrorDatos"] = "JSON inválido en 'Datos'";
        }
      }

      if (!datosParseados) {
        fieldsOrder.forEach((campo) => {
          const nombreAmigable = diccionario[campo] || campo;
          if (registro[campo] !== undefined) fila[nombreAmigable] = registro[campo];
        });
        // Agrega cualquier campo extra no listado
        Object.entries(registro).forEach(([key, value]) => {
          if (!fieldsOrder.includes(key) && !extraFields.includes(key)) {
            const nombreAmigable = diccionario[key] || key;
            fila[nombreAmigable] = value;
          }
        });
      }

      if (Object.keys(fila).length > 0) {
        transformados.push(fila);
      }
    });

    // El header será: extraFields + fieldsOrder (en orden amigable)
    const headers = [
      ...extraFields.filter((f) => transformados.some((fila) => f in fila)),
      ...fieldsOrder.map((campo) => diccionario[campo] || campo).filter((h) => transformados.some((fila) => h in fila)),
    ];
    // Agrega cualquier columna extra no listada
    const allKeys = new Set<string>();
    transformados.forEach(fila => {
      Object.keys(fila).forEach(key => allKeys.add(key));
    });
    allKeys.forEach((key) => {
      if (!headers.includes(key)) headers.push(key);
    });

    const worksheet = XLSX.utils.json_to_sheet(transformados, { header: headers });
    XLSX.utils.book_append_sheet(workbook, worksheet, tipo.charAt(0).toUpperCase() + tipo.slice(1));
  });
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
}
