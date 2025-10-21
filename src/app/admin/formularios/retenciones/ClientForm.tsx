"use client"

import FormGenerator from "@/components/formgenerator"
import { retencionesForm } from "@/config/forms/retenciones"
import { retencionesSchema } from "@/config/forms/retenciones-schema"

export default function ClientForm() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-2xl">
        <FormGenerator config={retencionesForm} schema={retencionesSchema} />
      </div>
    </div>
  )
}
