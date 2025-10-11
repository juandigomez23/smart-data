"use client";

import FormGenerator from "@/components/formgenerator";
import VolverAtras from "@/components/volverAtras";
import { retencionesForm } from "@/config/forms/retenciones";
import { retencionesSchema } from "@/config/forms/retenciones-schema";

export default function RetencionesColombiaPage() {
  return (
    <>
      <VolverAtras />
      <FormGenerator
        config={{
          ...retencionesForm,
          title: "Retenciones – Colombia",
          image: "/flags/co.png",
          fields: retencionesForm.fields.map((field) =>
            field.name === "pais"
              ? { ...field, options: [{ label: "Colombia", value: "Colombia" }] }
              : field
          ),
        }}
        schema={retencionesSchema}
      />
    </>
  );
}
