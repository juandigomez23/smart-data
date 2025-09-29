"use client";

import FormGenerator from "@/components/formgenerator";
import { retencionesPeru } from "@/config/forms/retenciones-peru";

export default function RetencionesPeruPage() {
  return (
    <FormGenerator
      config={{
        ...retencionesPeru,
        title: "Retenciones – Perú",
        image: "/flags/pe.png",
        fields: retencionesPeru.fields.map((field) =>
          field.name === "pais"
            ? { ...field, options: [{ label: "Perú", value: "Perú" }] }
            : field
        ),
      }}
    />
  );
}
