"use client";

import FormGenerator from "@/components/formgenerator";
import { retencionesForm } from "@/config/forms/retenciones";

export default function RetencionesChilePage() {
  return (
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
    />
  );
}
