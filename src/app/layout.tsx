import type { Metadata } from 'next';
import { Cinzel_Decorative, Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import AppProviders from '@/components/AppProviders';
import SkipLink from '@/components/SkipLink';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ScrollToTop from '@/components/ScrollToTop';
import CookieConsent from '@/components/CookieConsent';
import ScrollProgress from '@/components/ui/ScrollProgress';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fraxplorerperu.com'),
  title: 'Fraxplorer Peru | Tours y Aventuras en el Perú',
  description:
    'Descubre el Perú con FraXplorer. Tours en Cusco, Machu Picchu, Laguna Humantay, Montaña de Colores y más. Experiencias auténticas y seguras.',
  keywords: 'tours peru, cusco, machu picchu, fraxplorer, agencia de turismo peru',
  icons: {
    icon: '/images/cropped-LOGO-WEB-192x192.png',
    apple: '/images/cropped-LOGO-WEB-192x192.png',
  },
  openGraph: {
    title: 'Fraxplorer Peru | Cruza Fronteras, Rompe Rutinas',
    description: 'Descubre el Perú con FraXplorer. Experiencias auténticas y seguras.',
    url: 'https://fraxplorerperu.com',
    siteName: 'Fraxplorer Peru',
    images: ['/images/portada.jpg'],
    locale: 'es_PE',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${poppins.variable} ${playfair.variable} ${cinzel.variable} font-sans`}>
        <AppProviders>
          <SkipLink />
          <Header />
          <ScrollProgress />
          <main id="main-content">{children}</main>
          <Footer />
          <WhatsAppButton />
          <ScrollToTop />
          <CookieConsent />
        </AppProviders>
      </body>
    </html>
  );
}
