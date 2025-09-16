import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          🚀 SmartData con Tailwind + shadcn/ui
        </h1>
        <Button>Botón normal</Button>
        <Button variant="destructive">Botón rojo</Button>
      </div>
    </main>
  )
}
