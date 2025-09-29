"use client";

import FormGenerator from "@/components/formgenerator";
import { retencionesChile } from "@/config/forms/retenciones-chile";

export default function RetencionesChilePage() {
  return (
    <FormGenerator
      config={{
        ...retencionesChile,
        title: "Retenciones – Chile",
        image: "/flags/cl.png",
        fields: retencionesChile.fields.map((field) =>
          field.name === "pais"
            ? { ...field, options: [{ label: "Chile", value: "Chile" }] }
            : field
        ),
      }}
    />
  );
}
