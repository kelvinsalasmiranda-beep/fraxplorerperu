import { CONTACT } from './site';

export type SocialVideoItem = {
  id: string;
  platform: 'facebook' | 'tiktok' | 'local' | 'youtube';
  brand: string;
  caption: string;
  thumbnail: string;
  /** mp4 local — fallback o videos propios */
  localSrc?: string;
  /** URL del reel/video en Facebook o TikTok */
  embedUrl?: string;
  /** Enlace externo para botón "Abrir Facebook/TikTok" */
  originalUrl?: string;
  /** Perfil TikTok (@sin arroba) */
  tiktokProfile?: string;
};

/**
 * Agrega embedUrl con URL de reel de Facebook cuando la tengas:
 * embedUrl: 'https://www.facebook.com/reel/XXXXXXXX'
 * originalUrl: 'https://www.facebook.com/reel/XXXXXXXX'
 */
export const SOCIAL_VIDEOS: SocialVideoItem[] = [
  {
    id: 'peru-hero',
    platform: 'local',
    brand: 'FraXplorer Perú',
    caption: 'Descubre el Perú con FraXplorer — Machu Picchu, Cusco y aventuras inolvidables.',
    thumbnail: '/images/portada.jpg',
    localSrc: '/videos/hero.mp4',
  },
  {
    id: 'fb-machupicchu',
    platform: 'facebook',
    brand: 'FraXplorer Perú',
    caption: 'Machu Picchu te espera. Conoce nuestros paquetes y vive la maravilla del mundo.',
    thumbnail: '/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg',
    localSrc: '/videos/hero.mp4',
    originalUrl: `${CONTACT.facebook}/videos`,
  },
  {
    id: 'fb-valle',
    platform: 'facebook',
    brand: 'FraXplorer Perú',
    caption: 'Valle Sagrado, Maras, Moray y Salineras — experiencias únicas en Cusco.',
    thumbnail: '/images/pexels-erike-fusiki-58866350-8150307-scaled.jpg',
    localSrc: '/videos/hero.mp4',
    originalUrl: `${CONTACT.facebook}/videos`,
  },
  {
    id: 'fb-colores',
    platform: 'facebook',
    brand: 'FraXplorer Perú',
    caption: 'Montaña de 7 Colores — una maravilla natural que debes vivir al menos una vez.',
    thumbnail: '/images/33098cd0a441c619cc416a8f67180f21.jpg',
    localSrc: '/videos/hero.mp4',
    originalUrl: `${CONTACT.facebook}/videos`,
  },
  {
    id: 'local-cusco',
    platform: 'local',
    brand: 'FraXplorer Perú',
    caption: 'Cusco imperial — la puerta de entrada a Machu Picchu y los Andes.',
    thumbnail: '/images/pexels-joanavittoria-2193392-scaled.jpg',
    localSrc: '/videos/hero.mp4',
  },
  {
    id: 'fb-huacachina',
    platform: 'facebook',
    brand: 'FraXplorer Perú',
    caption: 'Huacachina, Islas Ballestas y más — Perú tiene de todo para tu próxima aventura.',
    thumbnail: '/images/hucachina6-819x1024.jpg',
    localSrc: '/videos/hero.mp4',
    originalUrl: `${CONTACT.facebook}/videos`,
  },
  {
    id: 'tiktok-1',
    platform: 'tiktok',
    brand: 'FraXplorer Perú',
    caption: 'Tips de viaje, reels de Cusco y aventuras en Perú — síguenos en TikTok.',
    thumbnail: '/images/lagunaab-768x1024.jpg',
    tiktokProfile: 'agency_fraxplorer_peru',
    originalUrl: 'https://www.tiktok.com/@agency_fraxplorer_peru',
  },
  {
    id: 'tiktok-2',
    platform: 'tiktok',
    brand: 'FraXplorer Perú',
    caption: 'Aventuras reales en Perú — mira nuestros reels en TikTok.',
    thumbnail: '/images/pexels-joanavittoria-2193392-scaled.jpg',
    tiktokProfile: 'fraxplorer_peru',
    originalUrl: CONTACT.tiktok,
  },
  {
    id: 'local-laguna',
    platform: 'local',
    brand: 'FraXplorer Perú',
    caption: 'Laguna Humantay — naturaleza andina en su máxima expresión.',
    thumbnail: '/images/lagunaab-768x1024.jpg',
    localSrc: '/videos/hero.mp4',
  },
];

export const SOCIAL_LINKS = {
  facebook: `${CONTACT.facebook}/videos`,
  tiktok: CONTACT.tiktok,
};
