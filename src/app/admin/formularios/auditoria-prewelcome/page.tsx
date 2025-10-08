"use client";

import FormGenerator from "@/components/formgenerator";
import { auditoriaPrewelcomeForm } from "@/config/forms/auditoria-prewelcome";
import { auditoriaPrewelcomeSchema } from "@/config/forms/auditoria-prewelcome-schema";

export default function AuditoriaPrewelcomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <FormGenerator
          config={auditoriaPrewelcomeForm}
          schema={auditoriaPrewelcomeSchema}
        />
      </div>
    </div>
  );
}
