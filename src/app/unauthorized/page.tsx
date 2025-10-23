"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LockIcon } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <LockIcon className="text-red-500 w-10 h-10" />
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-2 text-gray-800">
          Acceso no autorizado
        </h1>

        <p className="text-gray-600 mb-6">
          No tienes permisos para acceder a esta sección del sistema.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => router.back()}
            className="w-full"
            variant="outline"
          >
            Volver atrás
          </Button>

          <Button
            onClick={() => router.push("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Ir al inicio
          </Button>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Si crees que esto es un error, contacta al administrador.
      </p>
    </main>
  );
}
