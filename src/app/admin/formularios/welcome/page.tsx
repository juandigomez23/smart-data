"use client"

import FormGenerator from "@/components/formgenerator"
import { welcomeForm } from "@/config/forms/welcome"

export default function WelcomePage() {
  return <FormGenerator config={welcomeForm} />
}
