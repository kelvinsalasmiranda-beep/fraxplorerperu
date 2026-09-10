import { getTourHero } from './tour-hero-images';

/** No usar capturas de WhatsApp/TripAdvisor en el carrusel — solo fotos del destino */
const SKIP_WHY_IMAGE = /Imagen-de-WhatsApp|TripAdvisor|pagos|logo|cropped/i;

const GENERIC_WHY_IMAGES = [
  '/images/33098cd0a441c619cc416a8f67180f21.jpg',
  '/images/pexels-joanavittoria-2193392-scaled.jpg',
  '/images/portada.jpg',
];

/** Carrusel «¿Por qué reservar?» — fotos específicas del sitio live por tour */
const TOUR_WHY_BOOK_OVERRIDES: Record<string, string[]> = {
  'city-tour-medio-dia': [
    '/images/6b0e3434bbe01745289f4491408b1eab-819x1024.jpg',
    '/images/9b05f0fdf89824318a168dfff5be7798.jpg',
    '/images/c71ae50025b786242292dbd09e83e1f9.jpg',
    '/images/c0147acaeadf2532c8d2de8f70888baf-1.jpg',
    '/images/322ea6b83c34a8a85a8202d8d04a3b7b.jpg',
  ],
  'laguna-humantay-full-day': [
    '/images/lagunaab.jpg',
    '/images/e53f4f0c17099254dc58c70b1309e3df.jpg',
    '/images/278f302b5a5ee0d82c1deb8e29a6a266.jpg',
    '/images/83f0b9ebcd3eccc5bbacab5bcfb69e67.jpg',
  ],
  'montana-de-colores-full-day': [
    '/images/1-1.jpg',
    '/images/2-1.jpg',
    '/images/3-1.jpg',
    '/images/4-1.jpg',
  ],
  'tour-machu-picchu-full-day': [
    '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
    '/images/712069dd3e031f7431963927bded8f28.jpg',
    '/images/machu.jpg',
    '/images/6c73b7833b1179017bcf5ff4e07977f3.jpg',
    '/images/a98b63616963b41d43fac1cfe1344998.jpg',
  ],
  'machu-picchu-full-day': [
    '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
    '/images/712069dd3e031f7431963927bded8f28.jpg',
    '/images/machu.jpg',
    '/images/6c73b7833b1179017bcf5ff4e07977f3.jpg',
    '/images/a98b63616963b41d43fac1cfe1344998.jpg',
  ],
  'montana-palcoyo-full-day': [
    '/images/Sin-titu3.jpg',
    '/images/Sin-titulo-3-1.jpg',
    '/images/Sin-titulo-7.jpg',
    '/images/Sin-titulo-8.jpg',
    '/images/b16192c7deddc180574d48ede9ebc06c.jpg',
  ],
  'valle-sagrado-full-day': [
    '/images/Sin-titul1-768x1024.jpg',
    '/images/Sin-titulo-1-3-768x1024.jpg',
    '/images/Sin-titulo-2-3-768x1024.jpg',
    '/images/Sin-titulo-3-5-768x1024.jpg',
    '/images/Sin-titulo-4-2-768x1024.jpg',
  ],
  'machu-picchu-en-carro-desde-cusco': [
    '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
    '/images/712069dd3e031f7431963927bded8f28.jpg',
    '/images/27e3963669cc07eefe489d2933c16115.jpg',
    '/images/975aa7ef2e3b9f53387df687342b1e48.jpg',
  ],
  'glaciar-qelccaya-full-day': [
    '/images/Sin-titulo--768x1024.jpg',
    '/images/Sin-titulo-2-768x1024.jpg',
    '/images/Sin-titulo-3-2-768x1024.jpg',
    '/images/Sin-titulo-4-768x1024.jpg',
  ],
  'waqrapukara-full-day': [
    '/images/Sin-titulo-1-1-838x1024.jpg',
    '/images/Sin-titulo-2-1-838x1024.jpg',
    '/images/Sin-titulo-3-3-838x1024.jpg',
    '/images/Sin-titulo-5-838x1024.jpg',
    '/images/Sin-titulo-6-838x1024.jpg',
  ],
  'maras-y-moray-con-picnic-andino-full-day': [
    '/images/Sin-titulo-1-2-838x1024.jpg',
    '/images/Sin-titulo-2-2-838x1024.jpg',
    '/images/Sin-titulo-3-4-838x1024.jpg',
    '/images/Sin-titulo-4-1-838x1024.jpg',
    '/images/Sin-titulo-5-1-838x1024.jpg',
  ],
  'pallay-punchu-full-day': [
    '/images/778218d7d4252d82475ec90875f51531-819x1024.jpg',
    '/images/778218d7d4252d82475ec90875f51531-1-819x1024.jpg',
    '/images/pexels-marcio-arias-811024542-19988408-819x1024.jpg',
  ],
  'cuatrimotos-maras-moray-medio-dia': [
    '/images/tours/cuatrimotos-maras-moray.jpg',
    '/images/tours/maras-moray-downhill.jpg',
    '/images/pexels-susan-flores-232226967-33423804-681x1024.jpg',
    '/images/Sin-titulo-1-2-838x1024.jpg',
  ],
  'valle-sagrado-con-maras-y-moray-full-day': [
    '/images/pexels-susan-flores-232226967-33423804-681x1024.jpg',
    '/images/tours/valle-sagrado-incas.jpg',
    '/images/Sin-titulo-1-2-838x1024.jpg',
    '/images/Sin-titul1-768x1024.jpg',
  ],
  'inca-trip-10d-9n': [
    '/images/Sin-titulo-1-6-866x1024.jpg',
    '/images/Sin-titulo-2-11-866x1024.jpg',
    '/images/Sin-titulo-3-5-866x1024.jpg',
    '/images/Sin-titulo-4-6-866x1024.jpg',
    '/images/hucachina6-819x1024.jpg',
  ],
  'peru-aventura-total-10d-9n': [
    '/images/Sin-titulo-1-6-866x1024.jpg',
    '/images/Sin-titulo-2-11-866x1024.jpg',
    '/images/Sin-titulo-3-5-866x1024.jpg',
    '/images/Sin-titulo-4-6-866x1024.jpg',
    '/images/hucachina6-819x1024.jpg',
  ],
  'inca-trip-8d-7n': [
    '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
    '/images/Sin-titulo-3-6-768x908.jpg',
    '/images/Sin-titulo-4-7-768x908.jpg',
    '/images/Sin-titulo-6-1-768x908.jpg',
  ],
  'peru-aventura-total-8d-7n': [
    '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
    '/images/Sin-titulo-3-6-768x908.jpg',
    '/images/Sin-titulo-4-7-768x908.jpg',
    '/images/Sin-titulo-6-1-768x908.jpg',
  ],
  'inca-trip-7d-6n': [
    '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
    '/images/Sin-titulo-4-6-768x908.jpg',
    '/images/Sin-titulo-7-1-768x908.jpg',
    '/images/Sin-titulo-6-2-768x908.jpg',
  ],
  'peru-aventura-total-7d-6n': [
    '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
    '/images/Sin-titulo-4-6-768x908.jpg',
    '/images/Sin-titulo-7-1-768x908.jpg',
    '/images/Sin-titulo-6-2-768x908.jpg',
  ],
  'inca-trip-9d-8n': [
    '/images/Sin-titulo-6-1-768x908.jpg',
    '/images/Sin-titulo-7-768x908.jpg',
    '/images/Sin-titulo-2-11-768x908.jpg',
    '/images/Sin-titulo-3-5-768x908.jpg',
  ],
  'peru-aventura-total-9d-8n': [
    '/images/Sin-titulo-6-1-768x908.jpg',
    '/images/Sin-titulo-7-768x908.jpg',
    '/images/Sin-titulo-2-11-768x908.jpg',
    '/images/Sin-titulo-3-5-768x908.jpg',
  ],
  'peru-aventura-total-13d-12n': [
    '/images/Sin-titulo-1-6-866x1024.jpg',
    '/images/Sin-titulo-2-11-866x1024.jpg',
    '/images/frax3-768x1024.jpg',
    '/images/hucachina6-819x1024.jpg',
  ],
  'camino-inca-machupicchu-2d-1n': [
    '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
    '/images/Sin-titulo-1-2-866x1024.jpg',
    '/images/Sin-titulo-2-7-866x1024.jpg',
    '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
  ],
  'camino-inca-4d-3n': [
    '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
    '/images/Sin-titulo-4-2-768x908.jpg',
    '/images/Sin-titulo-2-7-768x908.jpg',
    '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
  ],
  'salkantay-trek-machupicchu-5d-4n': [
    '/images/pexels-gilmar-santos-1157205006-22717159-scaled.jpg',
    '/images/pexels-janonovoa-16756521-scaled.jpg',
    '/images/Sin-titulo-1-5-768x908.jpg',
    '/images/lagunaab-768x1024.jpg',
  ],
  'inca-jungle-trek-machupicchu-4d-3n': [
    '/images/712069dd3e031f7431963927bded8f28.jpg',
    '/images/frax3-768x1024.jpg',
    '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
  ],
};

/** Fotos del carrusel «¿Por qué reservar?» — galería real de cada tour */
export function getTourWhyBookImages(slug: string): string[] {
  const override = TOUR_WHY_BOOK_OVERRIDES[slug];
  if (override?.length) return override;

  const mapped = getTourHero(slug);
  const pool = [
    ...(mapped?.gallery ?? []),
    ...(mapped?.hero ? [mapped.hero] : []),
  ].filter((img, i, arr) => !SKIP_WHY_IMAGE.test(img) && arr.indexOf(img) === i);

  if (pool.length >= 1) return pool.slice(0, 6);
  return GENERIC_WHY_IMAGES;
}
