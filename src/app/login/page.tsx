"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    })

    if (res?.ok) {
      const response = await fetch("/api/auth/session")
      const session = await response.json()

      if (session?.user?.role) {
        router.push(`/${session.user.role}`)
      } else {
        router.push("/")
      }
    } else {
      alert("Usuario o contraseña incorrectos ❌")
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md space-y-4 w-80"
      >
        <h1 className="text-xl font-bold text-center">Iniciar Sesión</h1>
        <Input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full" type="submit">
          Entrar
        </Button>
      </form>
    </main>
  )
}
