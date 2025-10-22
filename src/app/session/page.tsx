"use client"

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SessionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") return router.push('/login');
    if (status === "authenticated") {
      const role = session?.user?.role as string | undefined;
      if (role === 'admin' || role === 'owner') return router.push('/admin');
      return router.push('/asesor');
    }
  }, [status, session, router]);

  if (status === 'loading') return <p className="p-6">Cargando sesión...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mi sesión</h1>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(session, null, 2)}</pre>
      <div className="mt-4">
        <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => signOut({ callbackUrl: '/login' })}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
