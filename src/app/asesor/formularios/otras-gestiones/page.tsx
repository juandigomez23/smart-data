"use client"


import FormGenerator from "@/components/formgenerator";
import VolverAtras from "@/components/volverAtras";
import { otrasGestionesForm } from "@/config/forms/otras-gestiones";
import { otrasGestionesSchema } from "@/config/forms/otras-gestiones-schema";

export default function OtrasGestionesFormPage() {
  return (
    <>
      <VolverAtras />
      <FormGenerator config={otrasGestionesForm} schema={otrasGestionesSchema} />
    </>
  );
}
