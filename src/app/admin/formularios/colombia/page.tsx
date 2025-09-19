"use client";

import FormGenerator from "@/components/formgenerator";
import { retencionesForm } from "@/config/forms/retenciones";

export default function RetencionesColombiaPage() {
  return (
    <FormGenerator
      config={{
        ...retencionesForm,
        title: "Retenciones – Colombia",
        image: "/flags/co.png", // 👈 bandera Colombia
        fields: retencionesForm.fields.map((field) =>
          field.name === "pais"
            ? { ...field, options: [{ label: "Colombia", value: "Colombia" }] }
            : field
        ),
      }}
    />
  );
}
