'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: '4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Error inesperado</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>Por favor recarga la página.</p>
        <button
          type="button"
          onClick={reset}
          style={{
            background: '#008ca1',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '999px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Reintentar
        </button>
      </body>
    </html>
  );
}
