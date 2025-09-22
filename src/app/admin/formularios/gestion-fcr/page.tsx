"use client"

import FormGenerator from "@/components/formgenerator"
import { gestionFcrForm } from "@/config/forms/gestion-fcr"

export default function FcrPage() {
  return <FormGenerator config={gestionFcrForm} />
}
