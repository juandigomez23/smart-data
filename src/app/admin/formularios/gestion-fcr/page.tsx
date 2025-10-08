"use client"

import FormGenerator from "@/components/formgenerator"
import { gestionFcrForm } from "@/config/forms/gestion-fcr"
import { gestionFcrSchema } from "@/config/forms/gestion-fcr-schema"

export default function GestionFcrPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <FormGenerator
          config={gestionFcrForm}
          schema={gestionFcrSchema}
        />
      </div>
    </div>
  );
}
