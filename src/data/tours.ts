import rawTours from './tours-scraped.json';
import tourImagesData from './tour-images.generated.json';

const TOUR_IMAGES = tourImagesData as Record<string, { hero: string; gallery: string[] }>;

export type ItineraryDay = {
  day: string;
  title: string;
  content: string;
};

export type TourPage = {
  slug: string;
  title: string;
  subtitle: string | null;
  description: string;
  intro: string[];
  detailParagraphs: string[];
  highlights: string[];
  tourType: string | null;
  difficulty: string | null;
  duration: string | null;
  price: string | null;
  priceNote: string | null;
  itinerary: ItineraryDay[];
  includes: string[];
  excludes: string[];
  recommendations: string[];
  images: string[];
  heroImage: string;
  category: string;
};

const IMAGE_EXT = /\.(jpe?g|png|gif|webp|avif)$/i;
const SKIP_IMAGES =
  /logo|cropped-FRAX|cropped-LOGO|favicon|pagos|payment|paypal|mastercard|visa|amex|american|icon-|whatsapp|badge|scaled-1-113x|32x32|192x192|180x180|270x270|\.css$/i;

function isWideBanner(img: string): boolean {
  const match = img.match(/-(\d+)x(\d+)\.(jpe?g|png|webp)$/i);
  if (!match) return false;
  const w = Number(match[1]);
  const h = Number(match[2]);
  return w / h > 1.6;
}

function isValidTourImage(img: string): boolean {
  return IMAGE_EXT.test(img) && !SKIP_IMAGES.test(img) && !isWideBanner(img);
}

const FALLBACK_HERO: Record<string, string> = {
  'inca-trip-8d-7n': '/images/Siitulo-2-922x1024.jpg',
  'laguna-humantay-full-day': '/images/lagunaab-768x1024.jpg',
  'montana-de-colores-full-day': '/images/33098cd0a441c619cc416a8f67180f21.jpg',
  'montana-palcoyo-full-day': '/images/palcoyoo-1.jpg',
  'tour-machu-picchu-full-day': '/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg',
  'huacachina-islas-ballestas-full-day': '/images/hucachina6-819x1024.jpg',
  'valle-sagrado-full-day': '/images/pexels-sergei-a-1322276-2539417-1536x1022.jpg',
  'maras-moray-valle-sagrado-5d-4n': '/images/pexels-susan-flores-232226967-33423804-681x1024.jpg',
  'peru-aventura-total-10d-9n': '/images/Siitulo-2-922x1024.jpg',
  'peru-aventura-total-9d-8n': '/images/maaaaaaaaaaae-810x1024.jpg',
  'peru-aventura-total-8d-7n': '/images/pexels-marcio-arias-811024542-19988408-819x1024.jpg',
  'peru-aventura-total-7d-6n': '/images/e53f4f0c17099254dc58c70b1309e3df-819x1024.jpg',
  'peru-aventura-total-13d-12n': '/images/frax3-768x1024.jpg',
  'cusco-valle-sagrado-6d-5n': '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
  'machupicchu-laguna-humantay-6d-5n': '/images/Sin-titu-2-922x1024.jpg',
  'cusco-montana-de-colores-4d-3n': '/images/frax3-768x1024.jpg',
};

function cleanMetaValue(value: string | null, maxLen = 60): string | null {
  if (!value) return null;
  const cleaned = value.replace(/\s+/g, ' ').trim();
  if (cleaned.length > maxLen || /detalle|paquete|itinerario|incluye/i.test(cleaned)) {
    return cleaned.split(/[\.]|DETALLES|ITINERARIO/i)[0]?.trim() || null;
  }
  return cleaned;
}

const META: Record<string, Partial<TourPage>> = {
  'inca-trip-8d-7n': {
    title: 'Inca Trip 8D / 7N',
    subtitle: 'Aventura Total 8D/7N: Tradiciones vivas y paisajes inolvidables',
    price: 'USD589',
    duration: '8 Días / 7 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Súper Paquetes',
    description: 'Vive una experiencia inolvidable recorriendo el Perú en 8 días y 7 noches. Descubre su riqueza cultural, histórica y natural en un solo viaje.',
  },
  'maras-moray-valle-sagrado-5d-4n': {
    title: 'Maras Moray / Valle Sagrado 5D / 4N',
    price: '$390.00',
    duration: '5 Días / 4 Noches',
    difficulty: 'Moderada',
    tourType: 'Naturaleza / Aventura',
    description: 'Valle Sagrado, Salineras de Maras, Moray, Machu Picchu y Montaña de Colores en 5 días.',
  },
  'peru-aventura-total-10d-9n': {
    price: '$650.00',
    duration: '10 Días / 9 Noches',
    difficulty: 'Moderada',
    description:
      'La aventura más completa por el Perú: Cusco, Machu Picchu, Valle Sagrado, Montaña de Colores y más en 10 días inolvidables.',
  },
  'peru-aventura-total-9d-8n': { price: '$609.00', duration: '9 Días / 8 Noches', difficulty: 'Moderada' },
  'peru-aventura-total-8d-7n': { price: '$580.00', duration: '8 Días / 7 Noches', difficulty: 'Moderada' },
  'peru-aventura-total-7d-6n': { price: '$559.00', duration: '7 Días / 6 Noches', difficulty: 'Moderada' },
  'peru-aventura-total-13d-12n': { price: '$890.00', duration: '13 Días / 12 Noches', difficulty: 'Moderada' },
  'cusco-valle-sagrado-6d-5n': { price: '$459.00', duration: '6 Días / 5 Noches', difficulty: 'Moderada' },
  'machupicchu-laguna-humantay-6d-5n': { price: '$409.00', duration: '5 Días / 4 Noches', difficulty: 'Fácil' },
  'cusco-montana-de-colores-4d-3n': { price: '$340.00', duration: '3 Días / 2 Noches', difficulty: 'Fácil' },
};

const SKIP_SLUGS = new Set([
  'tour-en-cusco', 'machupicchu', 'paquetes', 'camino-inca',
  'salkantay-y-otros', 'otros-destinos', 'machu-picchu-full-day',
]);

function formatPrice(price: string | null): string | null {
  if (!price) return null;
  return price.replace(/^USD(\d)/, 'USD $1');
}

function decodeHtml(text: string): string {
  return text
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\\"/g, '"')
    .trim();
}

function pickDescription(metaDesc: string | undefined, rawDesc: string): string {
  if (metaDesc) return metaDesc;
  const decoded = decodeHtml(rawDesc || '');
  if (!decoded || /^\+51|^\+5/i.test(decoded.trim()) || decoded.length < 20) return '';
  return decoded;
}

function cleanIntro(lines: string[]): string[] {
  return lines
    .map(decodeHtml)
    .filter(
      (p) =>
        p.length > 25 &&
        p.length < 600 &&
        !/alternar menú|políticas de privacidad|términos y condiciones/i.test(p) &&
        !/^\+51\s*\d/.test(p.trim()) &&
        !/lunes a sábado:/i.test(p)
    );
}

function cleanImages(images: string[]): string[] {
  return Array.from(new Set(images.filter(isValidTourImage)));
}

function pickHeroImage(slug: string, rawHero: unknown, images: string[]): string {
  if (TOUR_IMAGES[slug]?.hero) return TOUR_IMAGES[slug].hero;
  if (FALLBACK_HERO[slug]) return FALLBACK_HERO[slug];
  if (typeof rawHero === 'string' && isValidTourImage(rawHero)) return rawHero;
  const fromList = images.find(isValidTourImage);
  if (fromList) return fromList;
  return '/images/portada.jpg';
}

function pickGallery(slug: string, scraped: string[], heroImage: string): string[] {
  const mapped = TOUR_IMAGES[slug]?.gallery;
  if (mapped?.length) {
    return cleanImages(Array.from(new Set([heroImage, ...mapped])));
  }
  const cleaned = cleanImages(scraped);
  return cleaned.length ? cleaned : [heroImage];
}

function cleanTour(raw: Record<string, unknown>): TourPage {
  const slug = raw.slug as string;
  const meta = META[slug] || {};
  const scrapedImages = (raw.images as string[]) || [];
  const heroImage = pickHeroImage(slug, raw.heroImage, scrapedImages);
  const images = pickGallery(slug, scrapedImages, heroImage);

  let title = decodeHtml((raw.title as string) || '');
  if (/página no encontrada/i.test(title)) {
    title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return {
    slug,
    title: (meta.title as string) || title,
    subtitle: (meta.subtitle as string) || (raw.subtitle as string) || null,
    description: pickDescription(meta.description as string | undefined, raw.description as string),
    intro: cleanIntro((raw.intro as string[]) || []),
    detailParagraphs: ((raw.detailParagraphs as string[]) || []).map(decodeHtml).filter(Boolean),
    highlights: ((raw.highlights as string[]) || []).map(decodeHtml).filter((h) => h.length > 10),
    tourType: cleanMetaValue((meta.tourType as string) || (raw.tourType as string) || null),
    difficulty: cleanMetaValue((meta.difficulty as string) || (raw.difficulty as string) || null),
    duration: cleanMetaValue((meta.duration as string) || (raw.duration as string) || null, 30),
    price: formatPrice((meta.price as string) || (raw.price as string) || null),
    priceNote: (raw.priceNote as string) || null,
    itinerary: (raw.itinerary as ItineraryDay[]) || [],
    includes: ((raw.includes as string[]) || []).map(decodeHtml).filter(Boolean),
    excludes: ((raw.excludes as string[]) || []).map(decodeHtml).filter(Boolean),
    recommendations: ((raw.recommendations as string[]) || []).map(decodeHtml).filter(Boolean),
    images,
    heroImage,
    category: (meta.category as string) || (raw.category as string) || 'Tours',
  };
}

export const TOUR_PAGES: TourPage[] = (rawTours as Record<string, unknown>[])
  .filter((raw) => !SKIP_SLUGS.has(raw.slug as string))
  .map(cleanTour);

export function getTourBySlug(slug: string): TourPage | undefined {
  return TOUR_PAGES.find((t) => t.slug === slug);
}

export function tourHref(slug: string): string {
  return `/tours/${slug}/`;
}

export function getRelatedTours(current: TourPage, limit = 4): TourPage[] {
  return TOUR_PAGES.filter((t) => t.category === current.category && t.slug !== current.slug).slice(0, limit);
}
