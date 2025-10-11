"use client";

import FormGenerator from "@/components/formgenerator";
import VolverAtras from "@/components/volverAtras";
import { retencionesForm } from "@/config/forms/retenciones";
import { retencionesSchema } from "@/config/forms/retenciones-schema";

export default function RetencionesPeruPage() {
  return (
    <>
      <VolverAtras />
      <FormGenerator
        config={{
          ...retencionesForm,
          title: "Retenciones – Perú",
          image: "/flags/pe.png",
          fields: retencionesForm.fields.map((field) =>
            field.name === "pais"
              ? { ...field, options: [{ label: "Perú", value: "Perú" }] }
              : field
          ),
        }}
        schema={retencionesSchema}
      />
    </>
  );
}
