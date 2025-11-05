"use client";

import { useState, useEffect } from "react";
import { Users } from "lucide-react";

interface Asesor {
  id: number;
  nombre: string;
  email: string;
  formularios_permitidos?: string[];
}

const codigosFormularios = [
  "co", // Retenciones – Colombia
  "pe", // Retenciones – Perú
  "cl", // Retenciones – Chile
  "ec", // Retenciones – Ecuador
  "apw", // Auditoría Prewelcome
  "wel", // Welcome
  "com", // Comercial
  "rd", // Rechazo Débito
  "fcr", // Gestión FCR
  "otr", // Otras Gestiones
];


export default function PermisosAsesorPage() {
  const [asesores, setAsesores] = useState<Asesor[]>([]);
  const [asesorSeleccionado, setAsesorSeleccionado] = useState<Asesor | null>(null);
  const [formularios, setFormularios] = useState<string[]>([]);
  const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

  useEffect(() => {
    fetch("/api/asesores")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAsesores(data.data);
      });
  }, []);

  useEffect(() => {
    if (asesorSeleccionado) {
      const raw = asesorSeleccionado.formularios_permitidos;
      // Normalize stored value: could be already an array, a JSON string, or null
      const normalized: string[] = (() => {
        if (Array.isArray(raw)) return raw;
        if (!raw) return [];
        if (typeof raw === "string") {
          try {
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        }
        // Fallback: if it's an object but not an array, return empty
        return [];
      })();

      setFormularios(normalized);
    }
  }, [asesorSeleccionado]);


  // Guardar cambios solo cuando el usuario lo decida
  const handleGuardar = async () => {
    if (!asesorSeleccionado) return;
    const res = await fetch(`/api/asesores/${asesorSeleccionado.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...asesorSeleccionado, formularios_permitidos: formularios }),
    });
    if (res.ok) {
      setAsesores((prev) =>
        prev.map((a) =>
          a.id === asesorSeleccionado.id ? { ...a, formularios_permitidos: [...formularios] } : a
        )
      );
      setMensaje({ tipo: 'exito', texto: 'Permisos guardados correctamente.' });
    } else {
      setMensaje({ tipo: 'error', texto: 'Error al guardar los permisos. Intenta de nuevo.' });
    }
    setTimeout(() => setMensaje(null), 3000);
  };



  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-extrabold text-center text-[#000000] dark:text-[#38bdf8] mb-10">Permisos de Asesor</h1>
      <div className="max-w-5xl mx-auto">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[...asesores].sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' })).map((a,) => (
            <li key={a.id}>
              <button
                className={`w-full px-0 py-0 rounded-2xl shadow-xl border-2 border-blue-200 dark:border-blue-700 transition hover:scale-[1.03] duration-150 flex flex-col items-center justify-center bg-white dark:bg-gray-800 ${asesorSeleccionado?.id === a.id ? "ring-4 ring-blue-400" : ""}`}
                onClick={() => setAsesorSeleccionado(a)}
              >
                <div className="w-full flex flex-col items-center justify-center py-8 rounded-t-2xl bg-blue-50 dark:bg-blue-900">
                  <Users className="w-12 h-12 mb-2 text-blue-500" />
                  <span className="font-bold text-lg text-blue-700 dark:text-blue-200">{a.nombre}</span>
                  <span className="text-xs text-gray-500 mt-1">{a.email}</span>
                </div>
                <div className="w-full py-3 px-4 text-center text-sm text-gray-600 dark:text-gray-300">Permisos: {a.formularios_permitidos?.length ?? 0}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
      {asesorSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 border-2 border-blue-200 dark:border-blue-700 w-full max-w-md flex flex-col items-center animate-fade-in">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-3xl font-bold focus:outline-none"
              aria-label="Cerrar"
              onClick={() => setAsesorSeleccionado(null)}
            >
              &times;
            </button>
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-blue-500" />
              <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-200">{asesorSeleccionado.nombre}</h3>
            </div>
            <div className="mb-4 w-full">
              <label className="block text-base font-semibold text-gray-800 dark:text-blue-200 mb-2 text-center">Formularios permitidos</label>
              <div className="grid grid-cols-2 gap-3">
                {codigosFormularios.map((codigo) => (
                  <label key={codigo} className="flex items-center gap-2 text-base font-semibold text-gray-800 dark:text-blue-100 bg-blue-50 dark:bg-blue-900 rounded px-2 py-1 justify-center shadow-sm">
                        <input
                          type="checkbox"
                          checked={Array.isArray(formularios) && formularios.includes(codigo)}
                          onChange={(e) => {
                            setFormularios((prev) =>
                              e.target.checked
                                ? [...(Array.isArray(prev) ? prev : []), codigo]
                                : (Array.isArray(prev) ? prev.filter((v) => v !== codigo) : [])
                            );
                          }}
                          className="accent-blue-600 w-4 h-4"
                        />
                    <span className="font-mono">{codigo}</span>
                  </label>
                ))}
              </div>
              <div className="mt-6 text-center">
                <span className="text-base font-bold text-gray-700 dark:text-blue-200">Seleccionados:</span>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {formularios.map((codigo) => (
                    <span key={codigo} className="px-2 py-1 rounded bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 text-base font-mono border border-blue-300 dark:border-blue-700 shadow-sm">{codigo}</span>
                  ))}
                </div>
              </div>
              <button
                className="mt-8 w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow transition"
                onClick={handleGuardar}
              >
                Guardar cambios
              </button>
              {mensaje && (
                <div
                  className={`mt-4 w-full text-center py-2 rounded-lg font-semibold text-lg ${
                    mensaje.tipo === 'exito'
                      ? 'bg-green-100 text-green-800 border border-green-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                  role="alert"
                >
                  {mensaje.texto}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
