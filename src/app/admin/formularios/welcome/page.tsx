"use client"

import FormGenerator from "@/components/formgenerator"
import { welcomeForm } from "@/config/forms/welcome"
import { welcomeSchema } from "@/config/forms/welcome-schema"

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl">
        <FormGenerator
          config={welcomeForm}
          schema={welcomeSchema}
        />
      </div>
    </div>
  );
}
