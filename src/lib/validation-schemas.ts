import { z } from "zod"

export const loginFormSchema = z.object({
  email: z.string().email("El usuario no es válido"),
  password: z.string().min(6, "La contraseña no es válida"),
})