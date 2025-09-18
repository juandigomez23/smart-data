"use client"

import FormGenerator from "@/components/formgenerator"
import { fcrForm } from "@/config/forms/gestion-fcr"

export default function FcrPage() {
  return <FormGenerator config={fcrForm} />
}
