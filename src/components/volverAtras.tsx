import { useRouter } from "next/navigation";

export default function VolverAtras() {
  const router = useRouter();
  return (
    <button
      className="mt-4 ml-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow flex items-center gap-2 font-semibold text-base transition"
      style={{ alignSelf: 'flex-start' }}
      onClick={() => router.back()}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      Volver atrás
    </button>
  );
}
