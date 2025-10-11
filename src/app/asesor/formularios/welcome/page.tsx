"use client"

import FormGenerator from "@/components/formgenerator"
import VolverAtras from "@/components/volverAtras"
import { welcomeForm } from "@/config/forms/welcome"
import { welcomeSchema } from "@/config/forms/welcome-schema"

export default function WelcomePage() {
  return (
    <>
      <VolverAtras />
      <FormGenerator config={welcomeForm} schema={welcomeSchema} />
    </>
  )
}
