"use client"

import FormGenerator from "@/components/formgenerator"
import { rechazoDebitoForm } from "@/config/forms/rechazo-debito"

export default function RechazoDebitoPage() {
  return <FormGenerator config={rechazoDebitoForm} />
}
