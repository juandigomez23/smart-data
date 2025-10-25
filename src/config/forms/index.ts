// src/config/forms/index.ts

export { retencionesForm } from "./retenciones";
export { auditoriaPrewelcomeForm } from "./auditoria-prewelcome";
export { welcomeForm } from "./welcome";
export { equipoComercialForm } from "./comercial";
export { rechazoDebitoForm } from "./rechazo-debito";
export { gestionFcrForm } from "./gestion-fcr";
export { otrasGestionesForm } from "./otras-gestiones";

import { retencionesForm } from "./retenciones";
import { auditoriaPrewelcomeForm } from "./auditoria-prewelcome";
import { welcomeForm } from "./welcome";
import { equipoComercialForm } from "./comercial";
import { rechazoDebitoForm } from "./rechazo-debito";
import { gestionFcrForm } from "./gestion-fcr";
import { otrasGestionesForm } from "./otras-gestiones";

export const allForms = [
  retencionesForm,
  auditoriaPrewelcomeForm,
  welcomeForm,
  equipoComercialForm,
  rechazoDebitoForm,
  gestionFcrForm,
  otrasGestionesForm,
];
