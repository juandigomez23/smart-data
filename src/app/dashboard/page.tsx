"use client";

import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-2">Bienvenido al Dashboard</h1>
      <p>Nombre: {session.user?.name}</p>
      <p>Correo: {session.user?.email}</p>
      <p>Rol: {session.user?.role}</p>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
