"use client";

import FormGenerator from "@/components/formgenerator";
import { retencionesColombia } from "@/config/forms/retenciones-colombia";

export default function RetencionesColombiaPage() {
  return (
    <FormGenerator
      config={{
        ...retencionesColombia,
        title: "Retenciones – Colombia",
        image: "/flags/co.png",
        fields: retencionesColombia.fields.map((field) =>
          field.name === "pais"
            ? { ...field, options: [{ label: "Colombia", value: "Colombia" }] }
            : field
        ),
      }}
    />
  );
}
