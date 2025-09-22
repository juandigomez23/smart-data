"use client";

import FormGenerator from "@/components/formgenerator";
import { retencionesEcuador } from "@/config/forms/retenciones-ecuador";

export default function RetencionesEcuadorPage() {
  return (
    <FormGenerator
      config={{
        ...retencionesEcuador,
        title: "Retenciones – Ecuador",
        image: "/flags/ec.png", // 👈 bandera Ecuador
        fields: retencionesEcuador.fields.map((field) =>
          field.name === "pais"
            ? { ...field, options: [{ label: "Ecuador", value: "Ecuador" }] }
            : field
        ),
      }}
    />
  );
}
