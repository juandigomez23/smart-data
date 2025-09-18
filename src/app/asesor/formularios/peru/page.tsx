"use client";

import FormGenerator from "@/components/formgenerator";
import { retencionesForm } from "@/config/forms/retenciones";

export default function RetencionesPeruPage() {
  return (
    <FormGenerator
      config={{
        ...retencionesForm,
        title: "Retenciones – Perú",
        image: "/flags/pe.png", // 👈 bandera Perú
        fields: retencionesForm.fields.map((field) =>
          field.name === "pais"
            ? { ...field, options: [{ label: "Perú", value: "Perú" }] }
            : field
        ),
      }}
    />
  );
}
