/** Imagen hero + galería por tour — una foto por destino, sin mezclar */
export type TourHeroEntry = {
  hero: string;
  gallery: string[];
};

const MP_PHOTOS = [
  '/images/web/machupicchu-hq-1.jpg',
  '/images/web/machupicchu-hq-3.jpg',
  '/images/web/machupicchu-hq-6.jpg',
  '/images/web/machupicchu-hq-5.jpg',
  '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
  '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
  '/images/27e3963669cc07eefe489d2933c16115.jpg',
  '/images/975aa7ef2e3b9f53387df687342b1e48.jpg',
  '/images/712069dd3e031f7431963927bded8f28.jpg',
  '/images/a98b63616963b41d43fac1cfe1344998.jpg',
  '/images/web/machupicchu-1.jpg',
  '/images/web/machupicchu-2.jpg',
];

const VALLE_PHOTOS = [
  '/images/tours/valle-sagrado-incas.jpg',
  '/images/Sin-titul1-768x1024.jpg',
  '/images/Sin-titulo-1-3-768x1024.jpg',
  '/images/Sin-titulo-2-3-768x1024.jpg',
  '/images/Sin-titulo-3-5-768x1024.jpg',
  '/images/Sin-titulo-4-2-768x1024.jpg',
  '/images/web/valle-1.jpg',
  '/images/web/valle-3.jpg',
  '/images/web/valle-4.jpg',
  '/images/web/valle-7.jpg',
  '/images/web/valle-8.jpg',
];

const HUMANTAY_PHOTOS = [
  '/images/web/humantay-hq-1.jpg',
  '/images/web/humantay-hq-3.jpg',
  '/images/web/humantay-hq-4.jpg',
  '/images/web/humantay-hq-5.jpg',
  '/images/web/humantay-hq-6.jpg',
  '/images/web/humantay-hq-7.jpg',
  '/images/lagunaab.jpg',
  '/images/83f0b9ebcd3eccc5bbacab5bcfb69e67.jpg',
  '/images/278f302b5a5ee0d82c1deb8e29a6a266.jpg',
  '/images/e53f4f0c17099254dc58c70b1309e3df.jpg',
];

const CUSCO_PHOTOS = [
  '/images/web/cusco-hq-3.jpg',
  '/images/pexels-angel-valladares-242487480-17060841-scaled.jpg',
  '/images/tours/city-tour-cusco.jpg',
  '/images/web/cusco-2.jpg',
  '/images/web/cusco-3.jpg',
  '/images/web/cusco-5.jpg',
  '/images/web/cusco-6.jpg',
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
];

const COLORES_PHOTOS = [
  '/images/web/colores-hq-1.jpg',
  '/images/web/colores-hq-2.jpg',
  '/images/web/colores-hq-3.jpg',
  '/images/web/colores-hq-6.jpg',
  '/images/1-1.jpg',
  '/images/2-1.jpg',
  '/images/3-1.jpg',
  '/images/4-1.jpg',
  '/images/web/colores-1.jpg',
  '/images/web/colores-5.jpg',
];

const MARAS_PHOTOS = [
  '/images/web/maras-hq-9.jpg',
  '/images/web/maras-hq-10.jpg',
  '/images/web/moray-hq-3.jpg',
  '/images/web/moray-hq-4.jpg',
  '/images/web/moray-hq-5.jpg',
  '/images/web/moray-hq-8.jpg',
  '/images/pexels-susan-flores-232226967-33423804-681x1024.jpg',
  '/images/Sin-titulo-1-2-838x1024.jpg',
  '/images/Sin-titulo-2-2-838x1024.jpg',
  '/images/web/maras-1.jpg',
  '/images/web/maras-2.jpg',
];

const PALCOYO_PHOTOS = [
  '/images/Sin-titu3.jpg',
  '/images/Sin-titulo-3-1.jpg',
  '/images/Sin-titulo-7.jpg',
  '/images/Sin-titulo-8.jpg',
  '/images/b16192c7deddc180574d48ede9ebc06c.jpg',
];

const BALLESTAS_PHOTOS = [
  '/images/web/ballestas-hq-3.jpg',
  '/images/web/ballestas-hq-4.jpg',
  '/images/web/ballestas-hq-5.jpg',
  '/images/web/ballestas-hq-6.jpg',
  '/images/web/ballestas-hq-7.jpg',
  '/images/web/ballestas-1.jpg',
  '/images/web/ballestas-2.jpg',
  '/images/web/ballestas-6.jpg',
];

const HUACACHINA_PHOTOS = [
  '/images/web/huacachina-hq-1.jpg',
  '/images/web/huacachina-hq-2.jpg',
  '/images/web/huacachina-hq-3.jpg',
  '/images/web/huacachina-hq-4.jpg',
  '/images/web/huacachina-hq-8.jpg',
  '/images/hucachina6-819x1024.jpg',
  '/images/web/huacachina-2.jpg',
  '/images/web/huacachina-5.jpg',
];

const TITICACA_PHOTOS = [
  '/images/web/titicaca-hq-1.jpg',
  '/images/web/titicaca-hq-2.jpg',
  '/images/web/titicaca-hq-3.jpg',
  '/images/web/titicaca-hq-6.jpg',
  '/images/web/titicaca-hq-7.jpg',
  '/images/tours/lago-titicaca-cusco.jpg',
  '/images/web/titicaca-8.jpg',
];

const UYUNI_PHOTOS = [
  '/images/web/uyuni-hq-10.jpg',
  '/images/web/uyuni-hq-7.jpg',
  '/images/web/uyuni-hq-8.jpg',
  '/images/web/uyuni-hq-4.jpg',
  '/images/web/uyuni-hq-5.jpg',
  '/images/pexels-willianjusten-30929499-scaled.jpg',
  '/images/pexels-efrem-efre-2786187-33850121-1536x1024.jpg',
];

const LIMA_PHOTOS = [
  '/images/web/lima-hq-1.jpg',
  '/images/web/lima-hq-9.jpg',
  '/images/web/lima-hq-10.jpg',
  '/images/tours/city-tour-lima.jpg',
  '/images/tours/city-tour-lima-parque-amor.jpg',
  '/images/tours/city-tour-lima-costa-verde.jpg',
  '/images/tours/city-tour-lima-plaza-noche.jpg',
  '/images/web/lima-2.jpg',
];

const AUSANGATE_PHOTOS = [
  '/images/web/ausangate-hq-5.jpg',
  '/images/web/ausangate-hq-3.jpg',
  '/images/d3d030bd37c8d7dddf9c37a12baa6d5f.jpg',
];

const WAQRAPUKARA_PHOTOS = [
  '/images/web/waqrapukara-hq-4.jpg',
  '/images/web/waqrapukara-hq-1.jpg',
  '/images/Sin-titulo-1-1-838x1024.jpg',
  '/images/Sin-titulo-2-1-838x1024.jpg',
  '/images/Sin-titulo-3-3-838x1024.jpg',
  '/images/Sin-titulo-5-838x1024.jpg',
  '/images/Sin-titulo-6-838x1024.jpg',
];

const QELCCAYA_PHOTOS = [
  '/images/web/qelccaya-hq-6.jpg',
  '/images/web/qelccaya-hq-9.jpg',
  '/images/web/qelccaya-hq-2.jpg',
  '/images/web/qelccaya-hq-3.jpg',
  '/images/Sin-titulo--768x1024.jpg',
  '/images/tours/glaciar-qelccaya.jpg',
];

function padGallery(hero: string, extras: string[], pads: string[][]): TourHeroEntry {
  const gallery: string[] = [];
  const seen = new Set<string>();
  for (const img of [hero, ...extras, ...pads.flat()]) {
    if (!img || seen.has(img)) continue;
    seen.add(img);
    gallery.push(img);
    if (gallery.length >= 12) break;
  }
  return { hero, gallery };
}

export const PDF_TOUR_HERO_IMAGES: Record<string, TourHeroEntry> = {
  'montana-de-colores-full-day': {
    hero: '/images/1-1.jpg',
    gallery: [
      '/images/1-1.jpg',
      '/images/2-1.jpg',
      '/images/3-1.jpg',
      '/images/4-1.jpg',
    ],
  },
  'montana-palcoyo-full-day': {
    hero: '/images/Sin-titu3.jpg',
    gallery: [
      '/images/Sin-titu3.jpg',
      '/images/Sin-titulo-3-1.jpg',
      '/images/Sin-titulo-7.jpg',
      '/images/Sin-titulo-8.jpg',
      '/images/b16192c7deddc180574d48ede9ebc06c.jpg',
    ],
  },
  'pallay-punchu-full-day': {
    hero: '/images/778218d7d4252d82475ec90875f51531-819x1024.jpg',
    gallery: [
      '/images/778218d7d4252d82475ec90875f51531-819x1024.jpg',
      '/images/778218d7d4252d82475ec90875f51531-1-819x1024.jpg',
      '/images/pexels-marcio-arias-811024542-19988408-819x1024.jpg',
    ],
  },
  'laguna-humantay-full-day': {
    hero: '/images/lagunaab.jpg',
    gallery: [
      '/images/lagunaab.jpg',
      '/images/83f0b9ebcd3eccc5bbacab5bcfb69e67.jpg',
      '/images/278f302b5a5ee0d82c1deb8e29a6a266.jpg',
      '/images/e53f4f0c17099254dc58c70b1309e3df.jpg',
      '/images/5e9a0ffd519bd6c06a66afce7742183f.jpg',
    ],
  },
  'valle-sagrado-full-day': {
    hero: '/images/Sin-titul1-768x1024.jpg',
    gallery: [
      '/images/Sin-titul1-768x1024.jpg',
      '/images/tours/valle-sagrado-incas.jpg',
      '/images/Sin-titulo-1-3-768x1024.jpg',
      '/images/Sin-titulo-2-3-768x1024.jpg',
      '/images/Sin-titulo-3-5-768x1024.jpg',
      '/images/Sin-titulo-4-2-768x1024.jpg',
    ],
  },
  'valle-sagrado-con-maras-y-moray-full-day': {
    hero: '/images/pexels-susan-flores-232226967-33423804-681x1024.jpg',
    gallery: [
      '/images/pexels-susan-flores-232226967-33423804-681x1024.jpg',
      '/images/tours/valle-sagrado-incas.jpg',
      '/images/Sin-titulo-1-2-838x1024.jpg',
      '/images/Sin-titulo-4-1-838x1024.jpg',
      '/images/Sin-titul1-768x1024.jpg',
      '/images/Sin-titulo-2-3-768x1024.jpg',
    ],
  },
  'maras-y-moray-con-picnic-andino-full-day': {
    hero: '/images/Sin-titulo-1-2-838x1024.jpg',
    gallery: [
      '/images/Sin-titulo-1-2-838x1024.jpg',
      '/images/Sin-titulo-2-2-838x1024.jpg',
      '/images/Sin-titulo-3-4-838x1024.jpg',
      '/images/Sin-titulo-4-1-838x1024.jpg',
      '/images/Sin-titulo-5-1-838x1024.jpg',
    ],
  },
  'tour-machu-picchu-full-day': {
    hero: '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
    gallery: [
      '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
      '/images/27e3963669cc07eefe489d2933c16115.jpg',
      '/images/975aa7ef2e3b9f53387df687342b1e48.jpg',
      '/images/712069dd3e031f7431963927bded8f28.jpg',
    ],
  },
  'machu-picchu-full-day': {
    hero: '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
    gallery: [
      '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
      '/images/27e3963669cc07eefe489d2933c16115.jpg',
      '/images/975aa7ef2e3b9f53387df687342b1e48.jpg',
      '/images/712069dd3e031f7431963927bded8f28.jpg',
    ],
  },
  'city-tour-medio-dia': {
    hero: '/images/pexels-angel-valladares-242487480-17060841-scaled.jpg',
    gallery: [
      '/images/pexels-angel-valladares-242487480-17060841-scaled.jpg',
      '/images/tours/city-tour-cusco.jpg',
      '/images/1.jpg',
      '/images/2.jpg',
      '/images/3.jpg',
      '/images/4.jpg',
      '/images/5.jpg',
      '/images/6.jpg',
      '/images/c71ae50025b786242292dbd09e83e1f9.jpg',
      '/images/c0147acaeadf2532c8d2de8f70888baf-1.jpg',
    ],
  },
  'glaciar-qelccaya-full-day': {
    hero: '/images/Sin-titulo--768x1024.jpg',
    gallery: [
      '/images/Sin-titulo--768x1024.jpg',
      '/images/tours/glaciar-qelccaya.jpg',
      '/images/Sin-titulo-2-768x1024.jpg',
      '/images/Sin-titulo-3-2-768x1024.jpg',
      '/images/Sin-titulo-4-768x1024.jpg',
    ],
  },
  'waqrapukara-full-day': {
    hero: '/images/Sin-titulo-1-1-838x1024.jpg',
    gallery: [
      '/images/Sin-titulo-1-1-838x1024.jpg',
      '/images/Sin-titulo-2-1-838x1024.jpg',
      '/images/Sin-titulo-3-3-838x1024.jpg',
      '/images/Sin-titulo-5-838x1024.jpg',
      '/images/Sin-titulo-6-838x1024.jpg',
    ],
  },
  'machu-picchu-en-carro-desde-cusco': {
    hero: '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
    gallery: [
      '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
      '/images/27e3963669cc07eefe489d2933c16115.jpg',
      '/images/975aa7ef2e3b9f53387df687342b1e48.jpg',
      '/images/712069dd3e031f7431963927bded8f28.jpg',
      '/images/a98b63616963b41d43fac1cfe1344998.jpg',
    ],
  },
  'huacachina-islas-ballestas-full-day': {
    hero: '/images/hucachina6-819x1024.jpg',
    gallery: [
      '/images/hucachina6-819x1024.jpg',
      '/images/Sin-titu-2-922x1024.jpg',
    ],
  },
  'city-tour-lima-full-day': {
    hero: '/images/tours/city-tour-lima.jpg',
    gallery: [
      '/images/tours/city-tour-lima.jpg',
      '/images/tours/city-tour-lima-parque-amor.jpg',
      '/images/tours/city-tour-lima-costa-verde.jpg',
      '/images/tours/city-tour-lima-plaza-noche.jpg',
      '/images/tours/city-tour-lima-malecon-noche.jpg',
    ],
  },
  'islas-ballestas-nazca-2d-1n': {
    hero: '/images/frax3-768x1024.jpg',
    gallery: [
      '/images/frax3-768x1024.jpg',
      '/images/hucachina6-819x1024.jpg',
    ],
  },
  'cuatrimotos-maras-moray-medio-dia': {
    hero: '/images/tours/cuatrimotos-maras-moray.jpg',
    gallery: [
      '/images/tours/cuatrimotos-maras-moray.jpg',
      '/images/tours/maras-moray-downhill.jpg',
      '/images/pexels-susan-flores-232226967-33423804-681x1024.jpg',
      '/images/Sin-titulo-1-2-838x1024.jpg',
      '/images/Sin-titulo-4-1-838x1024.jpg',
    ],
  },
  'lago-titicaca-desde-cusco-full-day': {
    hero: '/images/tours/lago-titicaca-cusco.jpg',
    gallery: [
      '/images/tours/lago-titicaca-cusco.jpg',
      '/images/web/titicaca-1.jpg',
      '/images/web/titicaca-2.jpg',
      '/images/web/titicaca-5.jpg',
      '/images/web/titicaca-8.jpg',
    ],
  },
  'machupicchu-laguna-humantay-6d-5n': {
    hero: '/images/Sin-titu-2-922x1024.jpg',
    gallery: [
      '/images/Sin-titu-2-922x1024.jpg',
      '/images/lagunaab-768x1024.jpg',
      '/images/Siitulo-2-922x1024.jpg',
      '/images/33098cd0a441c619cc416a8f67180f21.jpg',
    ],
  },
  'cusco-inolvidable-4d-3n': {
    hero: '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
    gallery: [
      '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
      '/images/lagunaab.jpg',
      '/images/tours/city-tour-cusco.jpg',
      '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
      '/images/a98b63616963b41d43fac1cfe1344998.jpg',
      '/images/1.jpg',
      '/images/1-1.jpg',
      '/images/e53f4f0c17099254dc58c70b1309e3df.jpg',
    ],
  },
  'valle-sagrado-machu-picchu': {
    hero: '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
    gallery: [
      '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
      '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
      '/images/tours/valle-sagrado-incas.jpg',
      '/images/a98b63616963b41d43fac1cfe1344998.jpg',
      '/images/27e3963669cc07eefe489d2933c16115.jpg',
      '/images/Sin-titul1-768x1024.jpg',
      '/images/712069dd3e031f7431963927bded8f28.jpg',
      '/images/Sin-titulo-2-3-768x1024.jpg',
    ],
  },
  'cusco-valle-sagrado-6d-5n': {
    hero: '/images/tours/cuatrimotos-maras-moray.jpg',
    gallery: [
      '/images/tours/cuatrimotos-maras-moray.jpg',
      '/images/lagunaab-768x1024.jpg',
      '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
      '/images/tours/valle-sagrado-incas.jpg',
    ],
  },
  'cusco-inolvidable-5d-4n': {
    hero: '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
    gallery: [
      '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
      '/images/lagunaab.jpg',
      '/images/tours/valle-sagrado-incas.jpg',
      '/images/tours/city-tour-cusco.jpg',
    ],
  },
  'cusco-laguna-humantay-6d-5n': {
    hero: '/images/lagunaab-768x1024.jpg',
    gallery: [
      '/images/lagunaab-768x1024.jpg',
      '/images/e53f4f0c17099254dc58c70b1309e3df-819x1024.jpg',
      '/images/Siitulo-2-922x1024.jpg',
      '/images/33098cd0a441c619cc416a8f67180f21.jpg',
    ],
  },
  'huaynapicchu-machupicchu': {
    hero: '/images/pexels-d-a-28-2148748679-33539819-scaled.jpg',
    gallery: [
      '/images/pexels-d-a-28-2148748679-33539819-scaled.jpg',
      '/images/pexels-gilmar-santos-1157205006-22717159-scaled.jpg',
      '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
      '/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg',
    ],
  },
  'picnic-andino-medio-dia': {
    hero: '/images/Sin-titulo-1-2-768x1024.jpg',
    gallery: [
      '/images/Sin-titulo-1-2-768x1024.jpg',
      '/images/3-768x1024.jpg',
      '/images/cb9703986a5b4a1e4b90894a390e0805-768x959.jpg',
      '/images/pexels-gilmar-santos-1157205006-22717159-1024x768.jpg',
    ],
  },
  'ausangate-7-lagunas-donhill-1-dia': {
    hero: '/images/d3d030bd37c8d7dddf9c37a12baa6d5f.jpg',
    gallery: [
      '/images/d3d030bd37c8d7dddf9c37a12baa6d5f.jpg',
      '/images/pexels-gilmar-santos-1157205006-22717159-1024x768.jpg',
      '/images/Sin-titulo-2-1-768x908.jpg',
    ],
  },
  'ausangate-7-lagunas-downhill-1-dia': {
    hero: '/images/d3d030bd37c8d7dddf9c37a12baa6d5f.jpg',
    gallery: [
      '/images/d3d030bd37c8d7dddf9c37a12baa6d5f.jpg',
      '/images/pexels-gilmar-santos-1157205006-22717159-1024x768.jpg',
      '/images/Sin-titulo-2-1-768x908.jpg',
    ],
  },
  'tour-maras-moray-downhill-medio-dia': {
    hero: '/images/tours/maras-moray-downhill.jpg',
    gallery: [
      '/images/tours/maras-moray-downhill.jpg',
      '/images/tours/cuatrimotos-maras-moray.jpg',
    ],
  },
  'taller-de-cocina-en-lima-1-dia': {
    hero: '/images/tours/taller-cocina-lima.jpg',
    gallery: ['/images/tours/taller-cocina-lima.jpg', '/images/tours/city-tour-lima.jpg'],
  },
  'lago-titicaca-salar-de-uyuni-4-dias': {
    hero: '/images/pexels-willianjusten-30929499-scaled.jpg',
    gallery: [
      '/images/pexels-willianjusten-30929499-scaled.jpg',
      '/images/Sin-titulo-5-4-768x908.jpg',
      '/images/Sin-titulo-2-8-768x908.jpg',
    ],
  },
  'salar-de-uyuni-5-dias-4-noches-desde-puno': {
    hero: '/images/pexels-efrem-efre-2786187-33850121-1536x1024.jpg',
    gallery: [
      '/images/pexels-efrem-efre-2786187-33850121-1536x1024.jpg',
      '/images/pexels-ivan-vizcarra-572790796-16931550-1536x1024.jpg',
      '/images/Sin-titulo-99-768x1024.jpg',
    ],
  },
  'cusco-inolvidable-7d-6n': {
    hero: '/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg',
    gallery: [
      '/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg',
      '/images/lagunaab-768x1024.jpg',
      '/images/Siitulo-2-922x1024.jpg',
      '/images/pexels-susan-flores-232226967-33423804-681x1024.jpg',
    ],
  },
  'inca-trip-10d-9n': {
    hero: '/images/Sin-titulo-1-6-866x1024.jpg',
    gallery: [
      '/images/Sin-titulo-1-6-866x1024.jpg',
      '/images/Sin-titulo-2-11-866x1024.jpg',
      '/images/Sin-titulo-3-5-866x1024.jpg',
      '/images/Sin-titulo-4-6-866x1024.jpg',
      '/images/Sin-titulo-5-6-866x1024.jpg',
      '/images/hucachina6-819x1024.jpg',
    ],
  },
  'inca-trip-8d-7n': {
    hero: '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
    gallery: [
      '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
      '/images/Sin-titulo-3-6-768x908.jpg',
      '/images/Sin-titulo-4-7-768x908.jpg',
      '/images/Sin-titulo-6-1-768x908.jpg',
      '/images/Sin-titulo-7-768x908.jpg',
    ],
  },
  'inca-trip-7d-6n': {
    hero: '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
    gallery: [
      '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
      '/images/Sin-titulo-4-6-768x908.jpg',
      '/images/Sin-titulo-7-1-768x908.jpg',
      '/images/Sin-titulo-6-2-768x908.jpg',
      '/images/Sin-titulo-3-768x922.jpg',
    ],
  },
  'inca-trip-9d-8n': {
    hero: '/images/Sin-titulo-6-1-768x908.jpg',
    gallery: [
      '/images/Sin-titulo-6-1-768x908.jpg',
      '/images/Sin-titulo-7-768x908.jpg',
      '/images/Sin-titulo-2-11-768x908.jpg',
      '/images/Sin-titulo-3-5-768x908.jpg',
      '/images/Sin-titulo-3-4-768x908.jpg',
    ],
  },
  'camino-inca-machupicchu-2d-1n': {
    hero: '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
    gallery: [
      '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
      '/images/Sin-titulo-1-2-866x1024.jpg',
      '/images/Sin-titulo-2-7-866x1024.jpg',
      '/images/Sin-titulo-3-2-866x1024.jpg',
      '/images/Sin-titulo-4-2-866x1024.jpg',
      '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
    ],
  },
  'camino-inca-4d-3n': {
    hero: '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
    gallery: [
      '/images/pexels-gilmar-santos-1157205006-22717159-1536x1152.jpg',
      '/images/Sin-titulo-4-2-768x908.jpg',
      '/images/Sin-titulo-2-7-768x908.jpg',
      '/images/Sin-tit1-768x908.jpg',
      '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
    ],
  },
  'salkantay-trek-machupicchu-5d-4n': {
    hero: '/images/pexels-gilmar-santos-1157205006-22717159-scaled.jpg',
    gallery: [
      '/images/pexels-gilmar-santos-1157205006-22717159-scaled.jpg',
      '/images/pexels-janonovoa-16756521-scaled.jpg',
      '/images/Sin-titulo-1-5-768x908.jpg',
      '/images/Sin-titulo-2-10-768x908.jpg',
      '/images/lagunaab-768x1024.jpg',
    ],
  },
  'inca-jungle-trek-machupicchu-4d-3n': {
    hero: '/images/712069dd3e031f7431963927bded8f28.jpg',
    gallery: [
      '/images/712069dd3e031f7431963927bded8f28.jpg',
      '/images/1fce25411825d57efe4d5163003ddd5f-819x1024.jpg',
      '/images/a98b63616963b41d43fac1cfe1344998.jpg',
      '/images/27e3963669cc07eefe489d2933c16115.jpg',
    ],
  },
  'cusco-montana-de-colores-4d-3n': {
    hero: '/images/1-1.jpg',
    gallery: ['/images/1-1.jpg', '/images/2-1.jpg', '/images/tours/city-tour-cusco.jpg'],
  },
  'maras-moray-valle-sagrado-5d-4n': {
    hero: '/images/pexels-susan-flores-232226967-33423804-681x1024.jpg',
    gallery: [
      '/images/pexels-susan-flores-232226967-33423804-681x1024.jpg',
      '/images/tours/valle-sagrado-incas.jpg',
    ],
  },
  'peru-aventura-total-7d-6n': {
    hero: '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
    gallery: ['/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg'],
  },
  'peru-aventura-total-8d-7n': {
    hero: '/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg',
    gallery: ['/images/6c2ea90176f2dd285fb8cb5d313c655c-768x934.jpg'],
  },
  'peru-aventura-total-9d-8n': {
    hero: '/images/Sin-titulo-6-1-768x908.jpg',
    gallery: ['/images/Sin-titulo-6-1-768x908.jpg'],
  },
  'peru-aventura-total-10d-9n': {
    hero: '/images/Sin-titulo-1-6-866x1024.jpg',
    gallery: ['/images/Sin-titulo-1-6-866x1024.jpg'],
  },
  'peru-aventura-total-13d-12n': {
    hero: '/images/Sin-titulo-1-6-866x1024.jpg',
    gallery: ['/images/Sin-titulo-1-6-866x1024.jpg'],
  },
};

const SLUG_PADS: Record<string, string[][]> = {
  'valle-sagrado-machu-picchu': [MP_PHOTOS, VALLE_PHOTOS],
  'tour-machu-picchu-full-day': [MP_PHOTOS],
  'machu-picchu-full-day': [MP_PHOTOS],
  'machu-picchu-en-carro-desde-cusco': [MP_PHOTOS],
  'huaynapicchu-machupicchu': [MP_PHOTOS],
  'camino-inca-machupicchu-2d-1n': [MP_PHOTOS],
  'camino-inca-4d-3n': [MP_PHOTOS],
  'salkantay-trek-machupicchu-5d-4n': [MP_PHOTOS, HUMANTAY_PHOTOS],
  'inca-jungle-trek-machupicchu-4d-3n': [MP_PHOTOS],
  'cusco-inolvidable-4d-3n': [MP_PHOTOS, HUMANTAY_PHOTOS, CUSCO_PHOTOS],
  'cusco-inolvidable-5d-4n': [MP_PHOTOS, VALLE_PHOTOS, HUMANTAY_PHOTOS, CUSCO_PHOTOS],
  'cusco-inolvidable-7d-6n': [MP_PHOTOS, HUMANTAY_PHOTOS, MARAS_PHOTOS, COLORES_PHOTOS],
  'cusco-valle-sagrado-6d-5n': [MP_PHOTOS, VALLE_PHOTOS, MARAS_PHOTOS, COLORES_PHOTOS],
  'cusco-laguna-humantay-6d-5n': [MP_PHOTOS, HUMANTAY_PHOTOS, COLORES_PHOTOS, CUSCO_PHOTOS],
  'machupicchu-laguna-humantay-6d-5n': [MP_PHOTOS, HUMANTAY_PHOTOS, MARAS_PHOTOS, COLORES_PHOTOS],
  'cusco-montana-de-colores-4d-3n': [MP_PHOTOS, COLORES_PHOTOS, CUSCO_PHOTOS],
  'maras-moray-valle-sagrado-5d-4n': [MP_PHOTOS, VALLE_PHOTOS, MARAS_PHOTOS, COLORES_PHOTOS],
  'laguna-humantay-full-day': [HUMANTAY_PHOTOS],
  'montana-de-colores-full-day': [COLORES_PHOTOS],
  'valle-sagrado-full-day': [VALLE_PHOTOS],
  'valle-sagrado-con-maras-y-moray-full-day': [VALLE_PHOTOS, MARAS_PHOTOS],
  'maras-y-moray-con-picnic-andino-full-day': [MARAS_PHOTOS],
  'cuatrimotos-maras-moray-medio-dia': [MARAS_PHOTOS],
  'city-tour-medio-dia': [CUSCO_PHOTOS],
  'islas-ballestas-nazca-2d-1n': [BALLESTAS_PHOTOS, HUACACHINA_PHOTOS],
  'huacachina-islas-ballestas-full-day': [HUACACHINA_PHOTOS, BALLESTAS_PHOTOS],
  'city-tour-lima-full-day': [LIMA_PHOTOS],
  'taller-de-cocina-en-lima-1-dia': [LIMA_PHOTOS],
  'lago-titicaca-desde-cusco-full-day': [TITICACA_PHOTOS],
  'lago-titicaca-salar-de-uyuni-4-dias': [TITICACA_PHOTOS, UYUNI_PHOTOS],
  'salar-de-uyuni-5-dias-4-noches-desde-puno': [UYUNI_PHOTOS, TITICACA_PHOTOS],
  'montana-palcoyo-full-day': [PALCOYO_PHOTOS],
  'pallay-punchu-full-day': [PALCOYO_PHOTOS, COLORES_PHOTOS],
  'tour-maras-moray-downhill-medio-dia': [MARAS_PHOTOS],
  'picnic-andino-medio-dia': [MARAS_PHOTOS],
  'ausangate-7-lagunas-donhill-1-dia': [AUSANGATE_PHOTOS],
  'ausangate-7-lagunas-downhill-1-dia': [AUSANGATE_PHOTOS],
  'glaciar-qelccaya-full-day': [QELCCAYA_PHOTOS],
  'waqrapukara-full-day': [WAQRAPUKARA_PHOTOS],
  'peru-aventura-total-7d-6n': [MP_PHOTOS, CUSCO_PHOTOS, COLORES_PHOTOS, HUACACHINA_PHOTOS],
  'peru-aventura-total-8d-7n': [MP_PHOTOS, CUSCO_PHOTOS, COLORES_PHOTOS, HUACACHINA_PHOTOS],
  'peru-aventura-total-9d-8n': [MP_PHOTOS, CUSCO_PHOTOS, COLORES_PHOTOS, HUACACHINA_PHOTOS],
  'peru-aventura-total-10d-9n': [MP_PHOTOS, CUSCO_PHOTOS, COLORES_PHOTOS, HUACACHINA_PHOTOS],
  'peru-aventura-total-13d-12n': [MP_PHOTOS, CUSCO_PHOTOS, COLORES_PHOTOS, HUACACHINA_PHOTOS],
  'inca-trip-7d-6n': [MP_PHOTOS, CUSCO_PHOTOS, COLORES_PHOTOS, HUACACHINA_PHOTOS],
  'inca-trip-8d-7n': [MP_PHOTOS, CUSCO_PHOTOS, COLORES_PHOTOS, HUACACHINA_PHOTOS],
  'inca-trip-9d-8n': [MP_PHOTOS, CUSCO_PHOTOS, COLORES_PHOTOS, HUACACHINA_PHOTOS],
  'inca-trip-10d-9n': [MP_PHOTOS, CUSCO_PHOTOS, COLORES_PHOTOS, HUACACHINA_PHOTOS],
};

export function getTourHero(slug: string): TourHeroEntry | undefined {
  const raw = PDF_TOUR_HERO_IMAGES[slug];
  if (!raw) return undefined;
  const pads = SLUG_PADS[slug];
  if (!pads) return raw.gallery.length >= 6 ? raw : padGallery(raw.hero, raw.gallery, [raw.gallery]);
  return padGallery(raw.hero, raw.gallery, pads);
}

export function getTourHeroPath(slug: string): string | undefined {
  return PDF_TOUR_HERO_IMAGES[slug]?.hero;
}
