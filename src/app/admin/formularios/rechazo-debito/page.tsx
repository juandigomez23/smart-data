"use client"

import FormGenerator from "@/components/formgenerator"
import { rechazoDebitoForm } from "@/config/forms/rechazo-debito"
import { rechazoDebitoSchema } from "@/config/forms/rechazo-debito-schema"

export default function RechazoDebitoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <FormGenerator
          config={rechazoDebitoForm}
          schema={rechazoDebitoSchema}
        />
      </div>
    </div>
  );
}
