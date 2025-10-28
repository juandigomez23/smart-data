"use client"

import FormGenerator from "@/components/formgenerator"
import { comercialForm } from "@/config/forms/comercial"
import { comercialSchema } from "@/config/forms/comercial-schema"

export default function ComercialPage() {
  return (
  <div className="min-h-screen flex items-center justify-center bg-transparent p-4">
      <div className="w-full max-w-2xl">
        <FormGenerator
          config={comercialForm}
          schema={comercialSchema}
        />
      </div>
    </div>
  );
}
