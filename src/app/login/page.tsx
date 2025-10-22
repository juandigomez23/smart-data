"use client"

import { z } from "zod"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  username: z.string().min(3, "El usuario es obligatorio"),
  password: z.string().min(3, "La contraseña debe tener al menos 3 caracteres"),
})

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const { status } = useSession()
  const router = useRouter()

  // ✅ Si ya está logueado, lo manda al dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/session")
    }
  }, [status, router])

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError("");
    try {
      const res = await signIn("credentials", { ...data, redirect: false });
      if (res?.error) throw new Error("Credenciales incorrectas");

      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const role = session?.user?.role;

      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/asesor");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message || "Error al iniciar sesión");
      } else {
        setError("Error al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-gray-700 text-lg">Verificando sesión...</p>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'url(/Fondo.jpg)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'top left',
      }}
    >
      <div className="mb-10 mt-8 flex justify-center">
        <Image
          src="/bambubpo.png"
          alt="Logo Smart Data"
          width={224}
          height={80}
          style={{ height: 'auto', width: '14rem' }}
          priority
        />
      </div>

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-blue-100 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-blue-900 text-center mb-6 tracking-tight font-sans">
          Iniciar Sesión
        </h1>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Accede con tu cuenta corporativa o con tus credenciales
        </p>

        {/* 🔹 Botón de login con Google */}
        <div className="w-full">
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/session' })}

            className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-200 hover:shadow-md transition mb-4 bg-white"
            aria-label="Iniciar sesión con Google"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 488 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M488 261.8c0-17.4-1.6-34.1-4.6-50.2H249v95.1h134.6c-5.8 31.6-23.6 58.4-50.2 76.4v63.6h81.1c47.4-43.6 74.5-108 74.5-184.9z"
                fill="#4285F4"
              />
              <path
                d="M249 512c67.6 0 124.5-22.4 166-60.7l-81.1-63.6c-22.6 15.2-51.7 24.2-84.9 24.2-65.3 0-120.6-44.1-140.4-103.3H24.8v64.9C66.6 451.8 151.6 512 249 512z"
                fill="#34A853"
              />
              <path
                d="M108.6 311.6c-4.8-14.4-7.6-29.7-7.6-45.6s2.8-31.2 7.6-45.6V155.5H24.8C9.6 187.1 0 223.3 0 256s9.6 68.9 24.8 100.4l83.8-44.8z"
                fill="#FBBC05"
              />
              <path
                d="M249 100.3c35.8 0 68 12.3 93.4 36.4l70.2-70.2C373.5 24.8 316.6 0 249 0 151.6 0 66.6 60.2 24.8 155.5l83.8 64.9C128.4 144.4 183.7 100.3 249 100.3z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-sm font-medium text-gray-700">
              Iniciar con Google
            </span>
          </button>
        </div>

        <div className="w-full flex items-center gap-3 mb-4">
          <hr className="flex-1 border-t border-gray-200" />
          <span className="text-xs text-gray-400">o</span>
          <hr className="flex-1 border-t border-gray-200" />
        </div>

        {/* 🔹 Formulario manual (opcional) */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 w-full">
          <div>
            <label className="block mb-2 font-semibold text-blue-800 text-lg">
              Usuario
            </label>
            <input
              type="text"
              {...register("username")}
              className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg w-full p-3 text-gray-900 bg-white placeholder-gray-400 font-medium text-base transition"
              placeholder="Usuario"
              autoComplete="username"
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-2">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-semibold text-blue-800 text-lg">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password")}
              className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg w-full p-3 text-gray-900 bg-white placeholder-gray-400 font-medium text-base transition"
              placeholder="Contraseña"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-2">{errors.password.message}</p>
            )}
          </div>

          {error && (
            <p className="text-red-600 text-center text-base font-semibold mt-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>
    </div>
  );
}
