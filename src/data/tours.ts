import rawTours from './tours-scraped.json';
import tourImagesData from './tour-images.generated.json';
import {
  applyPdfContent,
  buildCustomTourFromPdf,
  PDF_CUSTOM_TOUR_SLUGS,
} from './tours-pdf-content';
import { getTourHeroPath } from './tour-hero-images';

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
  'inca-trip-8d-7n': '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
  'inca-trip-7d-6n': '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
  'inca-trip-9d-8n': '/images/Sin-titulo-6-1-768x908.jpg',
  'inca-trip-10d-9n': '/images/Sin-titulo-1-6-866x1024.jpg',
  'laguna-humantay-full-day': '/images/5e9a0ffd519bd6c06a66afce7742183f.jpg',
  'montana-de-colores-full-day': '/images/1-1.jpg',
  'montana-palcoyo-full-day': '/images/Sin-titu3.jpg',
  'pallay-punchu-full-day': '/images/778218d7d4252d82475ec90875f51531-819x1024.jpg',
  'tour-machu-picchu-full-day': '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
  'machu-picchu-en-carro-desde-cusco': '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
  'waqrapukara-full-day': '/images/Sin-titulo-1-1-838x1024.jpg',
  'maras-y-moray-con-picnic-andino-full-day': '/images/Sin-titulo-1-2-838x1024.jpg',
  'huacachina-islas-ballestas-full-day': '/images/hucachina6-819x1024.jpg',
  'cuatrimotos-maras-moray-medio-dia': '/images/tours/cuatrimotos-maras-moray.jpg',
  'lago-titicaca-desde-cusco-full-day': '/images/tours/lago-titicaca-cusco.jpg',
  'valle-sagrado-full-day': '/images/Sin-titul1-768x1024.jpg',
  'valle-sagrado-con-maras-y-moray-full-day': '/images/pexels-susan-flores-232226967-33423804-681x1024.jpg',
  'city-tour-medio-dia': '/images/pexels-angel-valladares-242487480-17060841-scaled.jpg',
  'city-tour-lima-full-day': '/images/tours/city-tour-lima.jpg',
  'glaciar-qelccaya-full-day': '/images/Sin-titulo--768x1024.jpg',
  'islas-ballestas-nazca-2d-1n': '/images/frax3-768x1024.jpg',
  'camino-inca-machupicchu-2d-1n': '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
  'camino-inca-4d-3n': '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
  'salkantay-trek-machupicchu-5d-4n': '/images/pexels-gilmar-santos-1157205006-22717159-scaled.jpg',
  'inca-jungle-trek-machupicchu-4d-3n': '/images/712069dd3e031f7431963927bded8f28.jpg',
  'maras-moray-valle-sagrado-5d-4n': '/images/pexels-susan-flores-232226967-33423804-681x1024.jpg',
  'peru-aventura-total-10d-9n': '/images/Sin-titulo-1-6-866x1024.jpg',
  'peru-aventura-total-9d-8n': '/images/Sin-titulo-6-1-768x908.jpg',
  'peru-aventura-total-8d-7n': '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
  'peru-aventura-total-7d-6n': '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
  'peru-aventura-total-13d-12n': '/images/Sin-titulo-1-6-866x1024.jpg',
  'cusco-valle-sagrado-6d-5n': '/images/lagunaab-768x1024.jpg',
  'cusco-laguna-humantay-6d-5n': '/images/lagunaab-768x1024.jpg',
  'huaynapicchu-machupicchu': '/images/pexels-d-a-28-2148748679-33539819-scaled.jpg',
  'picnic-andino-medio-dia': '/images/Sin-titulo-1-2-768x1024.jpg',
  'ausangate-7-lagunas-donhill-1-dia': '/images/d3d030bd37c8d7dddf9c37a12baa6d5f.jpg',
  'ausangate-7-lagunas-downhill-1-dia': '/images/d3d030bd37c8d7dddf9c37a12baa6d5f.jpg',
  'tour-maras-moray-downhill-medio-dia': '/images/tours/maras-moray-downhill.jpg',
  'taller-de-cocina-en-lima-1-dia': '/images/tours/taller-cocina-lima.jpg',
  'lago-titicaca-salar-de-uyuni-4-dias': '/images/pexels-willianjusten-30929499-scaled.jpg',
  'salar-de-uyuni-5-dias-4-noches-desde-puno': '/images/pexels-efrem-efre-2786187-33850121-1536x1024.jpg',
  'machupicchu-laguna-humantay-6d-5n': '/images/Sin-titu-2-922x1024.jpg',
  'cusco-inolvidable-4d-3n': '/images/Siitulo-2-922x1024.jpg',
  'cusco-inolvidable-5d-4n': '/images/Sin-titu-2-922x1024.jpg',
  'cusco-inolvidable-7d-6n': '/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg',
  'valle-sagrado-machu-picchu': '/images/Siitulo-2-922x1024.jpg',
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

/** En live, Peru Aventura usa URLs inca-trip-* con el contenido real */
const SUPER_PACKAGE_SOURCES: Record<string, string> = {
  'peru-aventura-total-7d-6n': 'inca-trip-7d-6n',
  'peru-aventura-total-8d-7n': 'inca-trip-8d-7n',
  'peru-aventura-total-9d-8n': 'inca-trip-9d-8n',
  'peru-aventura-total-10d-9n': 'inca-trip-10d-9n',
  'peru-aventura-total-13d-12n': 'inca-trip-10d-9n',
  'ausangate-7-lagunas-downhill-1-dia': 'ausangate-7-lagunas-donhill-1-dia',
};

function resolveTourRaw(raw: Record<string, unknown>): Record<string, unknown> {
  const slug = raw.slug as string;
  const sourceSlug = SUPER_PACKAGE_SOURCES[slug];
  if (!sourceSlug) return raw;
  const source = (rawTours as Record<string, unknown>[]).find((t) => t.slug === sourceSlug);
  if (!source) return raw;
  return { ...source, slug };
}

const META: Record<string, Partial<TourPage>> = {
  'inca-trip-8d-7n': {
    title: 'Peru Aventura Total 8D / 7N',
    subtitle: 'Aventura Total 8D/7N: Tradiciones vivas y paisajes inolvidables',
    price: '$589.00',
    duration: '8 Días / 7 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Súper Paquetes',
    description:
      'Vive una experiencia inolvidable recorriendo el Perú en 8 días y 7 noches. Descubre su riqueza cultural, histórica y natural en un solo viaje.',
  },
  'inca-trip-7d-6n': {
    title: 'Peru Aventura Total 7D / 6N',
    subtitle: 'Maravillas del Perú 7D/6N: Un recorrido inolvidable',
    price: '$550.00',
    duration: '7 Días / 6 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Súper Paquetes',
    description:
      'Un viaje increíble que reúne lo mejor del Perú: historia, cultura y paisajes únicos por Lima, Cusco, Machu Picchu y Montaña de Colores.',
  },
  'inca-trip-9d-8n': {
    title: 'Peru Aventura Total 9D / 8N',
    subtitle: 'Aventura Total 9D/8N: La esencia del Imperio Inca en una experiencia única',
    price: '$610.00',
    duration: '9 Días / 8 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Súper Paquetes',
    description:
      'Vive 9 días y 8 noches recorriendo lo mejor del Perú: cultura, historia y paisajes inolvidables en el corazón del Imperio Inca.',
  },
  'inca-trip-10d-9n': {
    title: 'Peru Aventura Total 10D / 9N',
    subtitle: 'Aventura Total 10 Días 9 Noches: Una Aventura Completa por el Corazón del Imperio',
    price: '$650.00',
    duration: '10 Días / 9 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Súper Paquetes',
    description:
      'Descubre lo mejor del Perú en 10 días y 9 noches, recorriendo paisajes únicos, sitios arqueológicos, cultura viva y experiencias inolvidables.',
    priceNote:
      'Sin alojamiento: USD 650 por persona. Con alojamiento básico: USD 759 por persona. Reserva con 30% del total.',
  },
  'maras-moray-valle-sagrado-5d-4n': {
    title: 'Maras Moray / Valle Sagrado 5D / 4N',
    price: '$390.00',
    duration: '5 Días / 4 Noches',
    difficulty: 'Moderada',
    tourType: 'Naturaleza / Aventura',
    description: 'Valle Sagrado, Salineras de Maras, Moray, Machu Picchu y Montaña de Colores en 5 días.',
  },
  'machupicchu-laguna-humantay-6d-5n': {
    title: 'Machupicchu / Laguna Humantay 6D / 5N',
    price: '$419.00',
    duration: '6 Días / 5 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Paquetes Cusco',
    description:
      'Machu Picchu, Maras, Moray, Laguna Humantay y Montaña de Colores en 6 días por el corazón del Imperio Inca.',
  },
  'cusco-laguna-humantay-6d-5n': {
    title: 'Cusco / Valle Sagrado 6D / 5N',
    subtitle: 'Explorando el Valle Sagrado en Cusco 6 Días 5 Noches',
    price: '$420.00',
    duration: '6 Días / 5 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Paquetes Cusco',
  },
  'cusco-valle-sagrado-6d-5n': {
    title: 'Cusco Inolvidable 6D / 5N',
    subtitle: 'Valle Sagrado, Machu Picchu, cuatrimotos Maras/Moray y Montaña de Colores',
    price: '$449.00',
    duration: '6 Días / 5 Noches',
    difficulty: 'Moderado',
    tourType: 'Aventura, Cultural',
    category: 'Paquetes Cusco',
    description:
      'Paquete de 6 días: City Tour, Valle Sagrado, Machu Picchu, Maras y Moray en cuatrimotos, y Montaña de Colores.',
    priceNote:
      'Paquete + hotel desde USD 449. Sin hotel: apartamento USD 519, 2★ USD 549, 3★ USD 609, 4★ USD 939.',
  },
  'cusco-inolvidable-5d-4n': {
    title: 'Cusco Inolvidable 5D / 4N',
    subtitle: 'City Tour, Valle Sagrado, Machu Picchu y Laguna Humantay',
    price: '$409.00',
    duration: '5 Días / 4 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Paquetes Cusco',
    description:
      'Paquete de 5 días con lo esencial del Cusco: City Tour, Valle Sagrado, Machu Picchu y Laguna Humantay.',
    priceNote:
      'Paquete + hotel desde USD 409. Sin hotel: apartamento USD 459, 2★ USD 509, 3★ USD 559, 4★ USD 889.',
  },
  'cusco-inolvidable-4d-3n': {
    price: '$359.00',
    duration: '4 Días / 3 Noches',
    difficulty: 'Moderado',
    category: 'Paquetes Cusco',
    priceNote:
      'Paquete + hotel desde USD 359. Sin hotel: apartamento USD 399, 2★ USD 419, 3★ USD 449, 4★ USD 649.',
  },
  'cusco-inolvidable-7d-6n': {
    price: '$469.00',
    duration: '7 Días / 6 Noches',
    difficulty: 'Moderado',
    category: 'Paquetes Cusco',
    priceNote:
      'Paquete + hotel desde USD 469. Sin hotel: apartamento USD 549, 2★ USD 589, 3★ USD 649, 4★ USD 999.',
  },
  'huaynapicchu-machupicchu': {
    title: 'Huaynapicchu / Machu Picchu',
    subtitle: 'Machu Picchu y Waynapicchu: La Cima de tu Aventura Inca',
    price: '$330.00',
    duration: '12 Horas – Full Day',
    difficulty: 'Moderado a exigente',
    tourType: 'Cultural y Natural',
    category: 'Machupicchu',
  },
  'cusco-montana-de-colores-4d-3n': {
    price: '$350.00',
    duration: '4 Días / 3 Noches',
    difficulty: 'Moderado',
    category: 'Paquetes Cusco',
  },
  'valle-sagrado-machu-picchu': {
    title: 'Valle Sagrado / Machu Picchu 2D / 1N',
    price: '$359.00',
    duration: '2 Días / 1 Noche',
    difficulty: 'Moderado',
    tourType: 'Cultural, Histórico',
    category: 'Machupicchu',
    priceNote: 'Paquete + hotel desde USD 359. Sin hotel: apartamento USD 369, 2★ USD 379.',
  },
  'peru-aventura-total-10d-9n': {
    title: 'Peru Aventura Total 10D / 9N',
    subtitle: 'Aventura Total 10 Días 9 Noches: Una Aventura Completa por el Corazón del Imperio',
    price: '$650.00',
    duration: '10 Días / 9 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Súper Paquetes',
    description:
      'Descubre lo mejor del Perú en 10 días y 9 noches, recorriendo paisajes únicos, sitios arqueológicos, cultura viva y experiencias inolvidables.',
    priceNote:
      'Sin alojamiento: USD 650 por persona. Con alojamiento básico: USD 759 por persona. Reserva con 30% del total.',
  },
  'peru-aventura-total-9d-8n': {
    title: 'Peru Aventura Total 9D / 8N',
    subtitle: 'Aventura Total 9D/8N: La esencia del Imperio Inca en una experiencia única',
    price: '$610.00',
    duration: '9 Días / 8 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Súper Paquetes',
    description:
      'Vive 9 días y 8 noches recorriendo lo mejor del Perú: cultura, historia y paisajes inolvidables en el corazón del Imperio Inca.',
  },
  'peru-aventura-total-8d-7n': {
    title: 'Peru Aventura Total 8D / 7N',
    subtitle: 'Aventura Total 8D/7N: Tradiciones vivas y paisajes inolvidables',
    price: '$589.00',
    duration: '8 Días / 7 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Súper Paquetes',
    description:
      'Vive una experiencia inolvidable recorriendo el Perú en 8 días y 7 noches. Descubre su riqueza cultural, histórica y natural en un solo viaje.',
  },
  'peru-aventura-total-7d-6n': {
    title: 'Peru Aventura Total 7D / 6N',
    subtitle: 'Maravillas del Perú 7D/6N: Un recorrido inolvidable',
    price: '$550.00',
    duration: '7 Días / 6 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Súper Paquetes',
    description:
      'Un viaje increíble que reúne lo mejor del Perú: historia, cultura y paisajes únicos por Lima, Cusco, Machu Picchu y Montaña de Colores.',
  },
  'peru-aventura-total-13d-12n': {
    title: 'Peru Aventura Total 13D / 12N',
    subtitle: 'La aventura más completa por el Perú',
    price: '$890.00',
    duration: '13 Días / 12 Noches',
    difficulty: 'Moderado',
    tourType: 'Cultural – Histórico – Natural',
    category: 'Súper Paquetes',
    description:
      'El paquete más extenso: Lima, costa, Cusco, Machu Picchu, Valle Sagrado, Montaña de Colores, Maras, Moray, Titicaca y más en 13 días inolvidables.',
  },
  'picnic-andino-medio-dia': {
    price: '$90.00',
    duration: 'Medio Día',
    difficulty: 'Bajo / Fácil',
    category: 'Explora',
  },
  'ausangate-7-lagunas-donhill-1-dia': {
    price: '$99.00',
    duration: '1 Día',
    difficulty: 'Medio – Alto',
    category: 'Explora',
  },
  'ausangate-7-lagunas-downhill-1-dia': {
    price: '$99.00',
    duration: '1 Día',
    difficulty: 'Medio – Alto',
    category: 'Explora',
  },
  'tour-maras-moray-downhill-medio-dia': {
    price: '$75.00',
    duration: 'Medio Día',
    difficulty: 'Moderado',
    category: 'Explora',
  },
  'cusco-retiro-ayahuasca-1-dia': {
    price: '$220.00',
    duration: '1 Día',
    difficulty: 'Moderado',
    category: 'Explora',
  },
  'lago-titicaca-salar-de-uyuni-4-dias': {
    price: '$309.00',
    duration: '4 Días / 3 Noches',
    difficulty: 'Moderado',
    category: 'Explora',
  },
  'salar-de-uyuni-5-dias-4-noches-desde-puno': {
    price: '$369.00',
    duration: '5 Días / 4 Noches',
    difficulty: 'Moderado',
    category: 'Explora',
  },
  'taller-de-cocina-en-lima-1-dia': {
    price: '$85.00',
    duration: '1 Día',
    difficulty: 'Fácil',
    category: 'Explora',
  },
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
  const pdfHero = getTourHeroPath(slug);
  if (pdfHero) return pdfHero;
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
  const resolved = resolveTourRaw(raw);
  const slug = resolved.slug as string;
  const meta = META[slug] || {};
  const scrapedImages = (resolved.images as string[]) || [];
  const heroImage = pickHeroImage(slug, resolved.heroImage, scrapedImages);
  const images = pickGallery(slug, scrapedImages, heroImage);

  let title = decodeHtml((resolved.title as string) || '');
  if (/página no encontrada/i.test(title)) {
    title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return {
    slug,
    title: (meta.title as string) || title,
    subtitle: (meta.subtitle as string) || (resolved.subtitle as string) || null,
    description: pickDescription(meta.description as string | undefined, resolved.description as string),
    intro: cleanIntro((resolved.intro as string[]) || []),
    detailParagraphs: ((resolved.detailParagraphs as string[]) || []).map(decodeHtml).filter(Boolean),
    highlights: ((resolved.highlights as string[]) || []).map(decodeHtml).filter((h) => h.length > 10),
    tourType: cleanMetaValue((meta.tourType as string) || (resolved.tourType as string) || null),
    difficulty: cleanMetaValue((meta.difficulty as string) || (resolved.difficulty as string) || null),
    duration: cleanMetaValue((meta.duration as string) || (resolved.duration as string) || null, 30),
    price: formatPrice((meta.price as string) || (resolved.price as string) || null),
    priceNote: (meta.priceNote as string) || (resolved.priceNote as string) || null,
    itinerary: (resolved.itinerary as ItineraryDay[]) || [],
    includes: ((resolved.includes as string[]) || []).map(decodeHtml).filter(Boolean),
    excludes: ((resolved.excludes as string[]) || []).map(decodeHtml).filter(Boolean),
    recommendations: ((resolved.recommendations as string[]) || []).map(decodeHtml).filter(Boolean),
    images,
    heroImage,
    category: (meta.category as string) || (resolved.category as string) || 'Tours',
  };
}

const SCRAPED_TOURS: TourPage[] = (rawTours as Record<string, unknown>[])
  .filter((raw) => !SKIP_SLUGS.has(raw.slug as string))
  .map(cleanTour)
  .map(applyPdfContent);

const CUSTOM_PDF_TOURS: TourPage[] = PDF_CUSTOM_TOUR_SLUGS.map((slug) => buildCustomTourFromPdf(slug)).filter(
  (t): t is TourPage => t !== null
);

export const TOUR_PAGES: TourPage[] = [...SCRAPED_TOURS, ...CUSTOM_PDF_TOURS];

export function getTourBySlug(slug: string): TourPage | undefined {
  return TOUR_PAGES.find((t) => t.slug === slug);
}

export function tourHref(slug: string): string {
  return `/tours/${slug}/`;
}

export function getRelatedTours(current: TourPage, limit = 4): TourPage[] {
  return TOUR_PAGES.filter((t) => t.category === current.category && t.slug !== current.slug).slice(0, limit);
}
