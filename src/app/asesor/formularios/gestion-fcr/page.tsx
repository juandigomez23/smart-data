"use client"


import FormGenerator from "@/components/formgenerator";
import VolverAtras from "@/components/volverAtras";
import { gestionFcrForm } from "@/config/forms/gestion-fcr";
import { gestionFcrSchema } from "@/config/forms/gestion-fcr-schema";

export default function GestionFcrFormPage() {
  return (
    <>
      <VolverAtras />
      <FormGenerator config={gestionFcrForm} schema={gestionFcrSchema} />
    </>
  );
}
