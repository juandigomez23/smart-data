"use client"

import FormGenerator from "@/components/formgenerator"
import { otrasGestionesForm } from "@/config/forms/otras-gestiones"
import { otrasGestionesSchema } from "@/config/forms/otras-gestiones-schema"

export default function OtrasGestionesPage() {
  return (
  <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <div className="w-full max-w-2xl">
        <FormGenerator
          config={otrasGestionesForm}
          schema={otrasGestionesSchema}
        />
      </div>
    </div>
  );
}
