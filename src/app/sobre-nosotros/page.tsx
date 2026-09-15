import AboutHero, { AboutCTA } from '@/components/AboutHero';

export const metadata = {
  title: 'Sobre Nosotros | Fraxplorer Peru',
  description:
    'Agencia de turismo en Cusco. Operamos Machu Picchu, Humantay, Montaña de Colores y Valle Sagrado. Empresa formal MINCETUR, reserva por WhatsApp.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutCTA />
    </>
  );
}
