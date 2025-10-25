import { FormConfig } from "@/components/formgenerator"

export const otrasGestionesForm: FormConfig = {
  "title": "Otras Gestiones",
  "tipo": "otras-gestiones",
  "fields": [
    {
      "name": "correo",
      "label": "Correo electrónico",
      "type": "text",
      "required": true,
      "auto": true
    },
    {
      "name": "hora_inicio_gestion_info",
      "label": "Hora inicio de gestión",
      "type": "info"
    },
    {
      "name": "hora_inicio_gestion",
      "label": "Hora inicio de gestión",
      "type": "time",
      "required": true
    },
    {
      "name": "pais",
      "label": "País",
      "type": "select",
      "required": true,
      "options": [
        {
          "label": "Colombia",
          "value": "colombia"
        },
        {
          "label": "Chile",
          "value": "chile"
        },
        {
          "label": "Ecuador",
          "value": "ecuador"
        },
        {
          "label": "Perú",
          "value": "peru"
        }
      ]
    },
    {
      "name": "san_cedula_nit",
      "label": "SAaaaaaaaaaN, Cédula o NIT",
      "type": "text",
      "required": true
    },
    {
      "name": "medio_contacto",
      "label": "Medio de contacto",
      "type": "select",
      "options": [
        {
          "label": "Llamada Estaqueue",
          "value": "llamada_estaqueue"
        },
        {
          "label": "Llamada WhatsApp",
          "value": "llamada_whatsapp"
        },
        {
          "label": "Llamada de entrada",
          "value": "llamada_entrada"
        },
        {
          "label": "WhatsApp (Celular/web/APP)",
          "value": "whatsapp_completo"
        },
        {
          "label": "Email",
          "value": "email"
        },
        {
          "label": "Mesa operativa",
          "value": "mesa_operativa"
        },
        {
          "label": "Meet",
          "value": "meet"
        },
        {
          "label": "No aplica",
          "value": "no_aplica"
        }
      ],
      "required": true
    },
    {
      "name": "tipo_gestion",
      "label": "Tipo de gestión",
      "type": "select",
      "options": [
        {
          "label": "Actualización de datos en Salesforce",
          "value": "actualizacion_salesforce"
        },
        {
          "label": "Análisis SAN",
          "value": "analisis_san"
        },
        {
          "label": "Asignación de token",
          "value": "asignacion_token"
        },
        {
          "label": "Auditoria de llamadas",
          "value": "auditoria_llamadas"
        },
        {
          "label": "Base especial clientes en mora",
          "value": "base_mora"
        },
        {
          "label": "Base sociodemográfico",
          "value": "base_sociodemografico"
        },
        {
          "label": "Campaña comercial",
          "value": "campana_comercial"
        },
        {
          "label": "Cierre de casos",
          "value": "cierre_casos"
        },
        {
          "label": "Creación de informes",
          "value": "creacion_informes"
        },
        {
          "label": "Cupones preventa",
          "value": "cupones_preventa"
        },
        {
          "label": "Debito automático/PAT",
          "value": "debito_automatico"
        },
        {
          "label": "Fidelización clientes de zonas de inundaciones chile",
          "value": "fidelizacion_inundaciones"
        },
        {
          "label": "Interacción WhatsApp",
          "value": "interaccion_whatsapp"
        },
        {
          "label": "Llamada entrante a nivel Bambú",
          "value": "llamada_bambu"
        },
        {
          "label": "SAN cancelada",
          "value": "san_cancelada"
        },
        {
          "label": "Seguimiento al debito automático/PAT",
          "value": "seguimiento_debito"
        },
        {
          "label": "Pre Welcome-auditoria",
          "value": "prewelcome_auditoria"
        },
        {
          "label": "Pre Welcome-seguimiento ordenes",
          "value": "prewelcome_ordenes"
        },
        {
          "label": "Pre Welcome-descarga de nuevas ordenes IP/Salesforce",
          "value": "prewelcome_descarga"
        },
        {
          "label": "Pre Welcome-asignación base de seguimiento",
          "value": "prewelcome_asignacion"
        },
        {
          "label": "Pre Welcome - Colombia/Ecuador/Perú/Chile",
          "value": "prewelcome_paises"
        },
        {
          "label": "Pre Welcome - gestión documental",
          "value": "prewelcome_documental"
        },
        {
          "label": "Pre Welcome -- liberadas sin contrato",
          "value": "prewelcome_liberadas"
        },
        {
          "label": "Referencias de pago",
          "value": "referencias_pago"
        },
        {
          "label": "Reporte caso a soporte técnico",
          "value": "reporte_soporte"
        },
        {
          "label": "Reporte SAN Retención - cartera",
          "value": "reporte_retencion"
        },
        {
          "label": "Validación Equifax",
          "value": "validacion_equifax"
        },
        {
          "label": "Validación Experian",
          "value": "validacion_experian"
        },
        {
          "label": "Validación Truora",
          "value": "validacion_truora"
        },
        {
          "label": "Welcome -- Colombia/Ecuador/Perú/Chile",
          "value": "welcome_paises"
        },
        {
          "label": "Welcome -- seguimiento pago primera factura",
          "value": "welcome_pago"
        },
        {
          "label": "Welcome -- seguimiento a suspensión temporal",
          "value": "welcome_suspension"
        },
        {
          "label": "Welcome -- validación consumo -- histórico dispositivos",
          "value": "welcome_validacion"
        },
        {
          "label": "Validación PYMES",
          "value": "validacion_pymes"
        },
        {
          "label": "Casos SAC",
          "value": "casos_sac"
        },
        {
          "label": "FCR -- FCR",
          "value": "fcr"
        }
      ],
      "required": true
    },
    {
      "name": "observacion",
      "label": "Observación",
      "type": "text",
      "description": "Agrega cualquier comentario relevante.",
      "multiline": true,
      "required": true
    }
  ]
}
