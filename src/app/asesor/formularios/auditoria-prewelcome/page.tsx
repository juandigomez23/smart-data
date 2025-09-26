"use client";

import FormGenerator from "@/components/formgenerator";
import { auditoriaPrewelcomeForm } from "@/config/forms/auditoria-prewelcome";

export default function AuditoriaPrewelcomePage() {
  return <FormGenerator config={auditoriaPrewelcomeForm} />;
}
