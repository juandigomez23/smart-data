"use client"
import { useSession } from "next-auth/react";
import VolverAtras from "@/components/volverAtras";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function FormulariosLlenadosPage() {
  const { data: session } = useSession();
  const { data, isLoading } = useSWR(
    session?.user?.id ? `/api/formularios` : null,
    fetcher
  );

  if (isLoading) return <div>Cargando...</div>;
  if (!data?.success) return <div>No se pudieron cargar los formularios.</div>;

  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const formulariosHoy = data.data.filter(
    (f: { created_at: string }) => new Date(f.created_at) >= hoy
  );

  return (
    <div
      className="p-8 min-h-screen"
      style={{
        backgroundImage: 'url(/Fondo.jpg)',
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundPosition: 'top left',
      }}
    >
      <div className="max-w-5xl mx-auto">
        <VolverAtras />

        
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100 text-center">
          Formularios llenados hoy
        </h1>

        
        <p className="text-center text-lg mb-6 text-blue-600 dark:text-blue-400 font-semibold">
          {formulariosHoy.length > 0
            ? `Has llenado ${formulariosHoy.length} formulario${formulariosHoy.length !== 1 ? "s" : ""} hoy.`
            : "Aún no has llenado ningún formulario hoy."}
        </p>

        {formulariosHoy.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No has llenado ningún formulario hoy.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 p-4">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                  <th className="px-4 py-3 border-b">ID</th>
                  <th className="px-4 py-3 border-b">Tipo</th>
                  <th className="px-4 py-3 border-b">Fecha</th>
                  <th className="px-4 py-3 border-b">Datos</th>
                </tr>
              </thead>
              <tbody>
                {formulariosHoy.map(
                  (
                    f: {
                      id: number;
                      tipo: string;
                      created_at: string;
                      datos: Record<string, unknown>;
                    },
                    idx: number
                  ) => (
                    <tr
                      key={f.id}
                      className={
                        idx % 2 === 0
                          ? "bg-gray-50 dark:bg-gray-900"
                          : "bg-white dark:bg-gray-800"
                      }
                    >
                      <td className="px-4 py-2 border-b text-center font-mono text-xs text-gray-700 dark:text-gray-200">
                        {f.id}
                      </td>
                      <td className="px-4 py-2 border-b text-center text-gray-800 dark:text-gray-100 font-semibold">
                        {f.tipo}
                      </td>
                      <td className="px-4 py-2 border-b text-center text-gray-600 dark:text-gray-300">
                        {new Date(f.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-2 border-b">
                        <pre className="text-xs whitespace-pre-wrap break-words bg-gray-100 dark:bg-gray-900 rounded p-2 text-gray-800 dark:text-gray-100">
                          {JSON.stringify(f.datos, null, 2)}
                        </pre>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
