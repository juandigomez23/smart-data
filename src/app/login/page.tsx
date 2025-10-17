
"use client"

import { z } from "zod"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { signIn } from "next-auth/react"

const loginSchema = z.object({
  username: z.string().min(3, "El usuario es obligatorio"),
  password: z.string().min(3, "La contraseña debe tener al menos 3 caracteres"),
})

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

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
        window.location.href = "/admin";
      } else if (role === "auditor") {
        window.location.href = "/auditor";
      } else {
        window.location.href = "/asesor";
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
        <Image src="/bambubpo.png" alt="Logo Smart Data" width={224} height={80} style={{height: 'auto', width: '14rem'}} priority />
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 border border-blue-100 flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-blue-900 text-center mb-8 tracking-tight font-sans">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 w-full">
          <div>
            <label className="block mb-2 font-semibold text-blue-800 text-lg">Usuario</label>
            <input
              type="text"
              {...register("username")}
              className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg w-full p-3 text-gray-900 bg-white placeholder-gray-400 font-medium text-base transition"
              placeholder="Usuario"
              autoComplete="username"
            />
            {errors.username && <p className="text-red-600 text-sm mt-2">{errors.username.message}</p>}
          </div>
          <div>
            <label className="block mb-2 font-semibold text-blue-800 text-lg">Contraseña</label>
            <input
              type="password"
              {...register("password")}
              className="border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg w-full p-3 text-gray-900 bg-white placeholder-gray-400 font-medium text-base transition"
              placeholder="Contraseña"
              autoComplete="current-password"
            />
            {errors.password && <p className="text-red-600 text-sm mt-2">{errors.password.message}</p>}
          </div>
          {error && <p className="text-red-600 text-center text-base font-semibold mt-2">{error}</p>}
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