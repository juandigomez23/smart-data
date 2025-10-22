export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-3xl font-bold text-red-600">Acceso denegado</h1>
      <p className="mt-4">No tienes permisos para ver esta página.</p>
    </div>
  );
}
