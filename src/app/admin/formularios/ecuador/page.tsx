"use client";

import FormGenerator from "@/components/formgenerator";
import { retencionesForm } from "@/config/forms/retenciones";

export default function RetencionesEcuadorPage() {
  return (
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
    />
  );
}
