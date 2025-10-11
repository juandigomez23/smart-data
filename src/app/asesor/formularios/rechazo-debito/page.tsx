"use client"


import FormGenerator from "@/components/formgenerator";
import VolverAtras from "@/components/volverAtras";
import { rechazoDebitoForm } from "@/config/forms/rechazo-debito";
import { rechazoDebitoSchema } from "@/config/forms/rechazo-debito-schema";

export default function RechazoDebitoFormPage() {
  return (
    <>
      <VolverAtras />
      <FormGenerator config={rechazoDebitoForm} schema={rechazoDebitoSchema} />
    </>
  );
}
