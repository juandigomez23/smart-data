"use client"

import FormGenerator from "@/components/formgenerator"
import { equipoComercialForm } from "@/config/forms/comercial"

export default function ComercialPage() {
  return <FormGenerator config={equipoComercialForm}
   />
}
