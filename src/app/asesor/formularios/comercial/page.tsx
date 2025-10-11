"use client"

import FormGenerator from "@/components/formgenerator";
import VolverAtras from "@/components/volverAtras";
import { equipoComercialForm } from "@/config/forms/comercial";
import { comercialSchema } from "@/config/forms/comercial-schema";

export default function ComercialPage() {
  return (
    <>
      <VolverAtras />
      <FormGenerator config={equipoComercialForm} schema={comercialSchema} />
    </>
  );
}
