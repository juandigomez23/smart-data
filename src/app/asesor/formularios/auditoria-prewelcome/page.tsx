"use client";


import FormGenerator from "@/components/formgenerator";
import VolverAtras from "@/components/volverAtras";
import { auditoriaPrewelcomeForm } from "@/config/forms/auditoria-prewelcome";
import { auditoriaPrewelcomeSchema } from "@/config/forms/auditoria-prewelcome-schema";

export default function AuditoriaPrewelcomePage() {
  return (
    <>
      <VolverAtras />
      <FormGenerator config={auditoriaPrewelcomeForm} schema={auditoriaPrewelcomeSchema} />
    </>
  );
}
