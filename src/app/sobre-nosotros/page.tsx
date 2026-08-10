import AboutHero, { AboutCTA } from '@/components/AboutHero';

export const metadata = {
  title: 'Sobre Nosotros | Fraxplorer Peru',
  description: 'Conoce la historia de FraXplorer Perú. Agencia de turismo formal con licencia MINCETUR.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutCTA />
    </>
  );
}
