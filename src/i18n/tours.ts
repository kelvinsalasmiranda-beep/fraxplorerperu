import type { TourPage } from '@/data/tours';
import type { Locale } from './types';
import { en } from './en';
import { translateText, translateLines } from './translate-text';

/** English overrides for tour pages (by slug) */
export const TOUR_EN: Record<
  string,
  Partial<
    Pick<
      TourPage,
      | 'title'
      | 'subtitle'
      | 'description'
      | 'category'
      | 'duration'
      | 'difficulty'
      | 'tourType'
      | 'includes'
      | 'excludes'
      | 'recommendations'
      | 'intro'
      | 'highlights'
      | 'priceNote'
    >
  >
> = {
  'lago-titicaca-salar-de-uyuni-4-dias': {
    title: 'Lake Titicaca / Uyuni Salt Flat 4 Days',
    subtitle: 'From Titicaca to Uyuni: Andean Adventure',
    description:
      'Explore the grandeur of Lake Titicaca and the surreal Uyuni Salt Flat on a 4-day journey through the high Andes.',
    category: 'EXPLORE',
    duration: '4 Days / 3 Nights',
    difficulty: 'Moderate',
    tourType: 'Adventure, Cultural, Nature',
  },
  'tour-machu-picchu-full-day': {
    title: 'Machu Picchu Full Day',
    subtitle: 'Explore one of the most impressive jewels on the planet',
    description:
      'Full day from Cusco with tourist train, bus to the citadel, professional guide, Machu Picchu entrance and lunch in Aguas Calientes.',
    category: 'MACHU PICCHU',
  },
  'laguna-humantay-full-day': {
    title: 'Humantay Lagoon Full Day',
    subtitle: 'Discover the magic of Humantay Lagoon, a paradise among the mountains',
    category: 'CUSCO IN A DAY',
    description:
      'Guided hike to Humantay Lagoon with buffet breakfast and lunch in Mollepata, trekking poles, oxygen and views of Salkantay snow-capped peak.',
    includes: [
      'Pick-up from your hotel in Cusco.',
      'Round-trip tourist transport.',
      'Buffet breakfast and lunch in Mollepata.',
      'Professional guide (Spanish / English).',
      'Trekking poles and oxygen.',
    ],
    excludes: ['Soraypampa / Humantay entrance (approx. 20 soles).', 'Optional horse rental.'],
    recommendations: [
      'Warm layered clothing, hat, gloves and rain poncho.',
      'Trekking shoes and water bottle.',
      'Altitude sickness pills if sensitive to elevation.',
    ],
  },
  'montana-de-colores-full-day': {
    title: 'Rainbow Mountain Full Day',
    subtitle: 'An Andean challenge with a view worth every step',
    category: 'CUSCO IN A DAY',
    description:
      'Ascend Rainbow Mountain (Vinicunca) from Cusco with buffet breakfast and lunch, bilingual guide and unforgettable high-Andean landscapes.',
  },
  'maras-y-moray-con-picnic-andino-full-day': {
    title: 'Maras & Moray + Andean Picnic Full Day',
    subtitle: 'Inca history, unique landscapes and an outdoor Andean picnic',
    category: 'CUSCO IN A DAY',
    description:
      'Visit Chinchero, Maras Salt Mines, Moray and enjoy an Andean picnic at Mountain View with llamas, vicuñas and Sacred Valley views.',
  },
  'montana-palcoyo-full-day': {
    title: 'Palcoyo Mountain Full Day',
    subtitle: 'Unique Andean landscapes, rainbow mountains and a gentle hike',
    category: 'CUSCO IN A DAY',
    description:
      'A more accessible alternative to Vinicunca: three rainbow mountains, a gentle 40–50 minute hike, buffet breakfast and lunch included.',
  },
  'valle-sagrado-full-day': {
    title: 'Sacred Valley of the Incas Full Day',
    subtitle: 'History, tradition and stunning landscapes in one day',
    category: 'CUSCO IN A DAY',
    description:
      'Taray viewpoint, Pisac, buffet lunch in Urubamba, Ollantaytambo and Chinchero with textile workshops on a complete Sacred Valley tour.',
  },
  'valle-sagrado-con-maras-y-moray-full-day': {
    title: 'Sacred Valley with Maras & Moray Full Day',
    subtitle: 'A perfect day among Inca terraces and ancient salt mines',
    category: 'CUSCO IN A DAY',
    description:
      'Chinchero, Moray, Maras Salt Mines, buffet lunch in Urubamba, Ollantaytambo and Pisac on a complete Sacred Valley tour.',
  },
  'cuatrimotos-maras-moray-medio-dia': {
    title: 'Maras & Moray by ATV Full Day',
    subtitle: 'Adventure, culture and unique landscapes in the Sacred Valley',
    category: 'CUSCO IN A DAY',
    description:
      'Ride ATVs to Moray and Maras Salt Mines with safety briefing, bilingual guide and transport from Cusco.',
  },
  'lago-titicaca-desde-cusco-full-day': {
    title: 'Lake Titicaca from Cusco Full Day',
    subtitle: 'Uros floating islands and ancestral culture on Taquile',
    category: 'EXPLORE',
    description:
      'From Cusco by overnight bus: Uros floating islands, Taquile Island with typical lunch and return to Cusco.',
  },
  'city-tour-medio-dia': {
    title: 'Cusco City Tour Full Day',
    subtitle: 'A journey to the heart of the Inca Empire, full of history and beauty',
    category: 'CUSCO IN A DAY',
    description:
      'Qorikancha, Historic Center, Cathedral and the archaeological complex of Sacsayhuamán, Qenqo, Puca Pucara and Tambomachay.',
  },
  'pallay-punchu-full-day': {
    title: 'Pallay Punchu Full Day',
    subtitle: 'Unique rock formations and spectacular Andean landscapes',
    category: 'CUSCO IN A DAY',
    description:
      'Moderate hike to Pallay Punchu mountain with filament-like rock formations, views of Lake Langui, breakfast and lunch included.',
  },
  'glaciar-qelccaya-full-day': {
    title: 'Quelccaya Glacier Full Day',
    subtitle: 'Discover the white giant of the Andes',
    category: 'CUSCO IN A DAY',
    description:
      'Visit the world\'s largest tropical glacier with breakfast and lunch, hike through the Andean puna and professional guide from Cusco.',
  },
  'waqrapukara-full-day': {
    title: 'Waqrapukara Full Day',
    subtitle: 'Adventure among clouds and Andes',
    category: 'CUSCO IN A DAY',
    description:
      'Unique experience to the impressive Waqrapukara fortress, a mystical destination surrounded by Andean landscapes, deep canyons and ancestral Inca energy.',
  },
  'machu-picchu-en-carro-desde-cusco': {
    title: 'Machu Picchu by Car from Cusco Full Day',
    subtitle: 'Visit Machu Picchu in one day with ground transport from Cusco',
    category: 'CUSCO IN A DAY',
    description:
      'Travel through the Sacred Valley by private transport to Ollantaytambo and continue to Aguas Calientes to visit Machu Picchu citadel with professional guide, entrance and lunch included.',
  },
  'huacachina-islas-ballestas-full-day': {
    title: 'Ballestas Islands & Huacachina Full Day',
    subtitle: 'Sea and desert in one day',
    category: 'EXPLORE',
    description:
      'From Lima: Ballestas Islands, vineyard with pisco tasting, lunch, dune buggies and sandboarding in Huacachina. Return ~10:00 p.m.',
  },
  'city-tour-lima-full-day': {
    title: 'Lima City Tour Full Day',
    subtitle: 'Unforgettable Lima: from the Historic Center to the Pacific',
    category: 'EXPLORE',
    description:
      'Tour through Miraflores, the Malecón, Love Park, Lima Historic Center and San Francisco Convent with catacombs.',
  },
  'islas-ballestas-nazca-2d-1n': {
    title: 'Ballestas Islands – Huacachina / Nazca Overflight 2D / 1N',
    subtitle: 'Sea, desert and Nazca Lines from Lima',
    category: 'EXPLORE',
    description:
      'Day 1: Ballestas Islands, vineyard, Huacachina and night in Ica. Day 2: 35-minute overflight over the Nazca Lines and return to Lima.',
  },
  'machupicchu-laguna-humantay-6d-5n': {
    title: 'Machu Picchu / Humantay Lagoon 6D / 5N',
    subtitle: 'Machu Picchu and Humantay Lagoon in 6 Days of Adventure',
    category: 'CUSCO PACKAGES',
    description:
      'Discover Machu Picchu, Maras, Moray, Humantay Lagoon and Rainbow Mountain in 6 days through the heart of the Inca Empire.',
    duration: '6 Days / 5 Nights',
  },
  'cusco-laguna-humantay-6d-5n': {
    title: 'Cusco / Sacred Valley 6D / 5N',
    subtitle: 'Exploring the Sacred Valley in Cusco — 6 Days 5 Nights',
    category: 'CUSCO PACKAGES',
    description:
      'City Tour, Sacred Valley, Machu Picchu, Rainbow Mountain and Humantay Lagoon in a complete 6-day Cusco package.',
    duration: '6 Days / 5 Nights',
  },
  'cusco-inolvidable-4d-3n': {
    title: 'Unforgettable Cusco 4D / 3N',
    subtitle: 'City Tour, Machu Picchu Full Day and Humantay Lagoon',
    category: 'CUSCO PACKAGES',
    description:
      '4-day package: City Tour, full-day Machu Picchu from Cusco and Humantay Lagoon trek.',
  },
  'cusco-inolvidable-5d-4n': {
    title: 'Unforgettable Cusco 5D / 4N',
    subtitle: 'City Tour, Sacred Valley, Machu Picchu and Humantay Lagoon',
    category: 'CUSCO PACKAGES',
    description:
      '5-day package with the essentials of Cusco: City Tour, Sacred Valley, Machu Picchu and Humantay Lagoon.',
    duration: '5 Days / 4 Nights',
  },
  'valle-sagrado-machu-picchu': {
    title: 'Sacred Valley / Machu Picchu 2D / 1N',
    subtitle: 'From the Sacred Valley to the Inca citadel in two days',
    category: 'MACHU PICCHU',
    description:
      '2-day tour: Sacred Valley (Pisac, Urubamba, Ollantaytambo), overnight in Aguas Calientes and guided Machu Picchu visit.',
  },
  'cusco-valle-sagrado-6d-5n': {
    title: 'Unforgettable Cusco 6D / 5N',
    subtitle: 'Sacred Valley, Machu Picchu, Maras/Moray quads and Rainbow Mountain',
    category: 'CUSCO PACKAGES',
    description:
      '6-day package: City Tour, Sacred Valley, Machu Picchu, Maras and Moray by ATV and Rainbow Mountain.',
    duration: '6 Days / 5 Nights',
  },
  'huaynapicchu-machupicchu': {
    title: 'Huayna Picchu / Machu Picchu',
    subtitle: 'Machu Picchu and Waynapicchu: The Summit of Your Inca Adventure',
    category: 'MACHU PICCHU',
    description:
      'Full day from Cusco: guided Machu Picchu visit and ascent of Huayna Picchu with train, bus, lunch and bilingual guide included.',
    duration: '12 Hours – Full Day',
    difficulty: 'Moderate to demanding',
  },
  'picnic-andino-medio-dia': {
    title: 'Andean Picnic – Half Day',
    subtitle: 'Andean Picnic: Tradition and Nature',
    category: 'EXPLORE',
    description:
      'Sacred Valley tour: Chinchero, Maras Salt Mines, Moray and an Andean picnic at Mountain View with llamas and vicuñas.',
    duration: 'Half Day',
    difficulty: 'Easy',
  },
  'ausangate-7-lagunas-downhill-1-dia': {
    title: 'Ausangate 7 Lagoons Downhill',
    subtitle: 'Downhill: Adrenaline among 7 Lagoons',
    category: 'EXPLORE',
    description:
      'Mountain bike downhill adventure visiting seven crystal-clear lagoons near Ausangate with safety gear and lunch included.',
    duration: '1 Day',
    difficulty: 'Medium – High',
  },
  'tour-maras-moray-downhill-medio-dia': {
    title: 'Maras & Moray Downhill Tour',
    subtitle: 'Mountain bike adventure in the Sacred Valley',
    category: 'EXPLORE',
    description:
      'Half-day downhill bike tour through Moray and Maras Salt Mines with professional guide and safety equipment.',
    duration: 'Half Day',
  },
  'cusco-retiro-ayahuasca-1-dia': {
    title: 'Cusco Ayahuasca Retreat – 1 Day',
    subtitle: 'Healing Ceremony and Ancestral Wisdom',
    category: 'EXPLORE',
    description:
      'Ayahuasca ceremony with shaman, individual consultations and round-trip transport from Cusco.',
    duration: '1 Day',
  },
  'salar-de-uyuni-5-dias-4-noches-desde-puno': {
    title: 'Uyuni Salt Flat 5D / 4N from Puno',
    subtitle: 'Uyuni Salt Flat: 5 Days and 4 Nights between Skies and Mirrors',
    category: 'EXPLORE',
    description:
      'Complete 5-day adventure across the Uyuni Salt Flat: colored lagoons, geysers, hot springs and starry nights.',
    duration: '5 Days / 4 Nights',
  },
  'taller-de-cocina-en-lima-1-dia': {
    title: 'Lima Cooking Workshop – 1 Day',
    subtitle: 'Flavors of Peru in a hands-on class',
    category: 'EXPLORE',
    description:
      'Market visit and hands-on Peruvian cooking class: ceviche, causa limeña and pisco sour with a local chef in Lima.',
    duration: '1 Day',
  },
  'cusco-inolvidable-7d-6n': {
    title: 'Unforgettable Cusco 7D / 6N',
    subtitle: 'The complete package: Machu Picchu, Humantay, Maras/Moray and Rainbow Mountain',
    category: 'CUSCO PACKAGES',
    description:
      '7-day package with City Tour, Sacred Valley, Machu Picchu, Humantay Lagoon, Maras/Moray and Rainbow Mountain.',
  },
  'inca-trip-7d-6n': {
    title: 'Peru Adventure Total 7D / 6N',
    subtitle: 'Peru Wonders 7D/6N: An unforgettable journey',
    category: 'SUPER PACKAGES',
    description:
      'An incredible trip combining the best of Peru: history, culture and unique landscapes across Lima, Cusco, Machu Picchu and Rainbow Mountain.',
  },
  'inca-trip-8d-7n': {
    title: 'Peru Adventure Total 8D / 7N',
    subtitle: 'Total Adventure 8D/7N: living traditions and unforgettable landscapes',
    category: 'SUPER PACKAGES',
    description:
      'An unforgettable 8-day, 7-night experience exploring Peru’s cultural, historical and natural richness in one journey.',
  },
  'inca-trip-9d-8n': {
    title: 'Peru Adventure Total 9D / 8N',
    subtitle: 'Total Adventure 9D/8N: the essence of the Inca Empire',
    category: 'SUPER PACKAGES',
    description:
      'Nine days and eight nights discovering the best of Peru: culture, history and unforgettable landscapes in the heart of the Inca Empire.',
  },
  'inca-trip-10d-9n': {
    title: 'Peru Adventure Total 10D / 9N',
    subtitle: 'Total Adventure 10 Days 9 Nights: a complete journey through the heart of the Empire',
    category: 'SUPER PACKAGES',
    description:
      'Discover the best of Peru in 10 days and 9 nights — unique landscapes, archaeological sites, living culture and unforgettable experiences.',
    priceNote:
      'Without lodging: USD 650 per person. With basic lodging: USD 759 per person. Book with 30% deposit; balance due on arrival in Cusco.',
  },
  'peru-aventura-total-7d-6n': {
    title: 'Peru Adventure Total 7D / 6N',
    subtitle: 'Peru Wonders 7D/6N: An unforgettable journey',
    category: 'SUPER PACKAGES',
  },
  'peru-aventura-total-8d-7n': {
    title: 'Peru Adventure Total 8D / 7N',
    subtitle: 'Total Adventure 8D/7N: living traditions and unforgettable landscapes',
    category: 'SUPER PACKAGES',
  },
  'peru-aventura-total-9d-8n': {
    title: 'Peru Adventure Total 9D / 8N',
    subtitle: 'Total Adventure 9D/8N: the essence of the Inca Empire',
    category: 'SUPER PACKAGES',
  },
  'peru-aventura-total-10d-9n': {
    title: 'Peru Adventure Total 10D / 9N',
    subtitle: 'Total Adventure 10 Days 9 Nights: a complete journey through the heart of the Empire',
    category: 'SUPER PACKAGES',
    priceNote:
      'Without lodging: USD 650 per person. With basic lodging: USD 759 per person. Book with 30% deposit; balance due on arrival in Cusco.',
  },
  'peru-aventura-total-13d-12n': {
    title: 'Peru Adventure Total 13D / 12N',
    subtitle: 'The most complete adventure across Peru',
    category: 'SUPER PACKAGES',
    description:
      'The most extensive package: Lima, coast, Cusco, Machu Picchu, Sacred Valley, Rainbow Mountain, Maras, Moray, Titicaca and more in 13 unforgettable days.',
  },
  'camino-inca-machupicchu-2d-1n': {
    title: 'Inca Trail / Machu Picchu 2D / 1N',
    subtitle: 'Inca Trail: The Route to Machu Picchu',
    category: 'INCA TRAIL',
    description:
      'Embark on Peru’s most iconic journey on the Inca Trail to Machu Picchu — nature, history and mysticism on ancient paths.',
  },
  'camino-inca-4d-3n': {
    title: 'Inca Trail 4D / 3N',
    subtitle: 'Four days discovering history and nature on the Inca Trail',
    category: 'INCA TRAIL',
    description:
      'An unforgettable hike on ancestral trails through stunning landscapes, archaeological sites and Machu Picchu.',
  },
  'salkantay-trek-machupicchu-5d-4n': {
    title: 'Salkantay Trek / Machu Picchu 5D / 4N',
    subtitle: 'Andean adventure to Machu Picchu via Salkantay',
    category: 'INCA TRAIL',
    description:
      'Five days crossing mountains, glaciers and valleys on the spectacular Salkantay route to Machu Picchu.',
  },
  'inca-jungle-trek-machupicchu-4d-3n': {
    title: 'Inca Jungle Trek / Machu Picchu 4D / 3N',
    subtitle: 'Total adventure: biking, rafting, jungle and Machu Picchu',
    category: 'INCA TRAIL',
    description:
      'The most dynamic alternative to the classic Inca Trail: mountain biking, rafting, jungle hiking and Machu Picchu in 4 days.',
  },
};

const SUPER_PACKAGE_CATEGORIES = new Set(['Súper Paquetes', 'SUPER PACKAGES']);

export function isSuperPackageCategory(category: string): boolean {
  return SUPER_PACKAGE_CATEGORIES.has(category);
}

export function localizeTour(tour: TourPage, locale: Locale): TourPage {
  if (locale === 'es') return tour;

  const override = TOUR_EN[tour.slug];
  const navTitle = tourLabelFromNav(`/tours/${tour.slug}/`);

  const base = {
    ...tour,
    ...(override ?? {}),
    title: navTitle ?? override?.title ?? translateText(tour.title),
    subtitle: override?.subtitle ?? (tour.subtitle ? translateText(tour.subtitle) : tour.subtitle),
    description: override?.description ?? translateText(tour.description),
    category: override?.category ?? translateCategory(tour.category),
    difficulty: override?.difficulty ?? translateDifficulty(tour.difficulty),
    duration: override?.duration ?? translateDuration(tour.duration),
    tourType: override?.tourType ?? translateTourType(tour.tourType),
    priceNote: tour.priceNote ? translateText(tour.priceNote) : tour.priceNote,
    intro: override?.intro ?? translateLines(tour.intro),
    detailParagraphs: translateLines(tour.detailParagraphs),
    highlights: override?.highlights ?? translateLines(tour.highlights),
    includes: override?.includes ?? translateLines(tour.includes),
    excludes: override?.excludes ?? translateLines(tour.excludes),
    recommendations: override?.recommendations ?? translateLines(tour.recommendations),
    itinerary: tour.itinerary.map((day) => ({
      ...day,
      day: translateText(day.day),
      title: translateText(day.title),
      content: translateText(day.content),
    })),
  };

  return base;
}

function translateCategory(c: string): string {
  const map: Record<string, string> = {
    'Súper Paquetes': 'SUPER PACKAGES',
    'Paquetes Cusco': 'CUSCO PACKAGES',
    'Cusco en un día': 'CUSCO IN A DAY',
    Explora: 'EXPLORE',
    Tours: 'TOURS',
    'Camino Inca': 'INCA TRAIL',
    Machupicchu: 'MACHU PICCHU',
  };
  return map[c] || translateText(c);
}

function translateDifficulty(d: string | null): string | null {
  if (!d) return d;
  return translateText(d)
    .replace(/Moderada/i, 'Moderate')
    .replace(/Moderado/i, 'Moderate')
    .replace(/Fácil|Facil/i, 'Easy')
    .replace(/Difícil/i, 'Hard');
}

function translateDuration(d: string | null): string | null {
  if (!d) return d;
  return translateText(d)
    .replace(/Días/gi, 'Days')
    .replace(/Noches/gi, 'Nights')
    .replace(/Día/gi, 'Day')
    .replace(/Noche/gi, 'Night');
}

function translateTourType(t: string | null): string | null {
  if (!t) return t;
  return translateText(t)
    .replace(/Aventura/gi, 'Adventure')
    .replace(/Cultural/gi, 'Cultural')
    .replace(/Natural/gi, 'Nature')
    .replace(/Naturaleza/gi, 'Nature');
}

/** Find English nav label for a tour href */
export function tourLabelFromNav(href: string): string | null {
  for (const item of en.nav.items) {
    for (const child of item.children || []) {
      if (child.href === href) return child.label;
    }
  }
  return null;
}

/** Localized social video caption by id */
export function socialVideoCaption(id: string, locale: Locale, fallback: string): string {
  const dict = locale === 'en' ? en : null;
  if (!dict) return fallback;
  const found = dict.socialVideos.find((v) => v.id === id);
  return found?.caption ?? fallback;
}

/** Open-on-platform label for social embeds */
export function openPlatformLabel(
  platform: 'facebook' | 'tiktok' | 'local' | 'youtube' | 'instagram',
  locale: Locale
): string {
  const ui = locale === 'en' ? en.videosUi : null;
  if (!ui) {
    const es = {
      facebook: 'Abrir Facebook',
      tiktok: 'Abrir TikTok',
      local: 'Ver más',
      youtube: 'Abrir YouTube',
      instagram: 'Abrir Instagram',
    };
    return es[platform];
  }
  const map = {
    facebook: ui.openFacebook,
    tiktok: ui.openTiktok,
    local: ui.seeMore,
    youtube: ui.openYoutube,
    instagram: ui.openInstagram,
  };
  return map[platform];
}
