import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 pt-32 text-center">
      <h1 className="font-heading text-6xl font-black text-brand-dark">404</h1>
      <p className="mt-4 text-gray-500 text-lg">Página no encontrada</p>
      <Link href="/" className="mt-8 btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
}
