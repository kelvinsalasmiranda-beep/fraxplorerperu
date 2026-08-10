'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-32 text-center">
      <h1 className="font-heading text-4xl font-black text-brand-dark">Algo salió mal</h1>
      <p className="mt-4 text-gray-500">Hubo un error al cargar la página.</p>
      <button type="button" onClick={reset} className="mt-8 btn-primary">
        Intentar de nuevo
      </button>
    </div>
  );
}
