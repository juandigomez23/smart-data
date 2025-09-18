"use client"

import FormGenerator from "@/components/formgenerator"
import { comercialForm } from "@/config/forms/comercial"

export default function ComercialPage() {
  return <FormGenerator config={comercialForm} />
}
