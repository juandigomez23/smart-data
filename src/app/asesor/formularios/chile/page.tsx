"use client";

import FormGenerator from "@/components/formgenerator";
import VolverAtras from "@/components/volverAtras";
import { retencionesForm } from "@/config/forms/retenciones";
import { retencionesSchema } from "@/config/forms/retenciones-schema";

export default function RetencionesChilePage() {
  return (
    <>
      <VolverAtras />
      <FormGenerator
        config={{
          ...retencionesForm,
          title: "Retenciones – Chile",
          image: "/flags/cl.png",
          fields: retencionesForm.fields.map((field) =>
            field.name === "pais"
              ? { ...field, options: [{ label: "Chile", value: "Chile" }] }
              : field
          ),
        }}
        schema={retencionesSchema}
      />
    </>
  );
}
