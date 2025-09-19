"use client"

import FormGenerator from "@/components/formgenerator"
import { otrasGestionesForm } from "@/config/forms/otras-gestiones"

export default function OtrasGestionesPage() {
  return <FormGenerator config={otrasGestionesForm} />
}
