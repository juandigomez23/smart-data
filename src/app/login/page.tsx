"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineUser, HiOutlineLockClosed, HiOutlineLogin } from "react-icons/hi"

const schema = z.object({
  username: z.string().min(3, "El usuario es obligatorio"),
  password: z.string().min(3, "La contraseña es obligatoria"),
})

type LoginForm = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<LoginForm>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: LoginForm) => {
    setError("")
    const res = await signIn("credentials", {
      redirect: false,
      username: data.username,
      password: data.password,
    })

    if (res?.error) {
      setError("Usuario o contraseña incorrectos")
      return
    }

    const sessionRes = await fetch("/api/auth/session")
    const session = await sessionRes.json()

    switch (session?.user?.role) {
      case "admin":
        router.push("/admin")
        break
      case "asesor":
        router.push("/asesor")
        break
      case "auditor":
        router.push("/auditor")
        break
      default:
        router.push("/")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-200 via-blue-100 to-blue-200 animate-gradient-x p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 transform transition-transform duration-500 hover:-translate-y-2">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Bienvenido
        </h1>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
<div className="relative">
  <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
  <input
    type="text"
    placeholder="Usuario"
    {...form.register("username")}
    className="w-full pl-10 pr-4 py-3 border rounded-xl border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
  />
  {form.formState.errors.username && (
    <p className="text-red-500 text-sm mt-1">
      {form.formState.errors.username.message}
    </p>
  )}
</div>

{}
<div className="relative">
  <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Contraseña"
    {...form.register("password")}
    className="w-full pl-10 pr-10 py-3 border rounded-xl border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition placeholder-gray-400"
  />
  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
  >
    {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
  </button>
  {form.formState.errors.password && (
    <p className="text-red-500 text-sm mt-1">
      {form.formState.errors.password.message}
    </p>
  )}
</div>


          {}
          {error && <p className="text-red-600 text-center">{error}</p>}

          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-600 active:scale-95 transition-all font-semibold text-lg flex items-center justify-center gap-2"
          >
            <HiOutlineLogin size={20} /> Ingresar
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-sm">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </p>
      </div>

      {}
      <style jsx>{`
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 10s ease infinite;
        }
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  )
}
