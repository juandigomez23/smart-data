"use client";

import FormGenerator from "@/components/formgenerator";
import VolverAtras from "@/components/volverAtras";
import { retencionesForm } from "@/config/forms/retenciones";
import { retencionesSchema } from "@/config/forms/retenciones-schema";

export default function RetencionesEcuadorPage() {
  return (
    <>
      <VolverAtras />
      <FormGenerator
        config={{
          ...retencionesForm,
          title: "Retenciones – Ecuador",
          image: "/flags/ec.png",
          fields: retencionesForm.fields.map((field) =>
            field.name === "pais"
              ? { ...field, options: [{ label: "Ecuador", value: "Ecuador" }] }
              : field
          ),
        }}
        schema={retencionesSchema}
      />
    </>
  );
}
