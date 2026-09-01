"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center font-sans bg-zinc-950 text-white">
        <h2 className="text-xl font-bold">Algo salió mal en la aplicación.</h2>
        <p className="text-sm text-zinc-400">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-[#004F54] hover:bg-[#006B70] text-white rounded-xl font-bold cursor-pointer transition-colors"
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}
