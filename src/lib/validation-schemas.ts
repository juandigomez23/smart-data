import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().email("El usuario no es válido"),
  password: z.string().min(6, "La contraseña no es válida"),
})

// Reusable validators for form schemas
export const correoSchema = z.string().email("Correo inválido")

export const sanSchema = z
  .string()
  .min(3, "SAN obligatorio")
  .refine(
    (val: string) => {
      return ["HCO", "HCL", "HEC", "HPE"].some((pref) => val.startsWith(pref))
    },
    {
      message: "El SAN debe iniciar con HCO, HCL, HEC o HPE según el país",
    }
  )