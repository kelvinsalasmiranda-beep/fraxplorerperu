import { CONTACT } from './site';

export type SocialVideoItem = {
  id: string;
  platform: 'facebook' | 'tiktok' | 'local' | 'youtube' | 'instagram';
  brand: string;
  caption: string;
  thumbnail: string;
  localSrc?: string;
  originalUrl?: string;
  tiktokProfile?: string;
};

const LOCAL_VIDEO = '/videos/hero.mp4';

/**
 * Videos que se reproducen en el sitio (archivo propio).
 * TikTok / Instagram / Facebook bloquean o limitan sus embeds
 * (p. ej. "overload-protect"), así que no se usan como reproductor.
 */
export const SOCIAL_VIDEOS: SocialVideoItem[] = [
  {
    id: 'tiktok-live',
    platform: 'tiktok',
    brand: 'FraXplorer Perú',
    caption: 'Cusco y aventuras — se reproduce aquí, como en nuestro TikTok.',
    thumbnail: '/images/lagunaab-768x1024.jpg',
    localSrc: LOCAL_VIDEO,
    tiktokProfile: CONTACT.tiktokHandle,
    originalUrl: CONTACT.tiktok,
  },
  {
    id: 'tiktok-featured',
    platform: 'tiktok',
    brand: 'FraXplorer Perú',
    caption: 'Viajes reales con FraXplorer — play aquí mismo.',
    thumbnail: '/images/33098cd0a441c619cc416a8f67180f21.jpg',
    localSrc: LOCAL_VIDEO,
    tiktokProfile: CONTACT.tiktokHandle,
    originalUrl: CONTACT.tiktok,
  },
  {
    id: 'facebook-live',
    platform: 'facebook',
    brand: 'FraXplorer Perú',
    caption: 'Paisajes del Perú — se reproduce en la web, no en Facebook.',
    thumbnail: '/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg',
    localSrc: LOCAL_VIDEO,
    originalUrl: CONTACT.facebook,
  },
  {
    id: 'instagram-reel-1',
    platform: 'instagram',
    brand: 'FraXplorer Perú',
    caption: 'Machu Picchu y Cusco — el video suena aquí, no en Instagram.',
    thumbnail: '/images/pexels-erike-fusiki-58866350-8150307-scaled.jpg',
    localSrc: LOCAL_VIDEO,
    originalUrl: CONTACT.instagram,
  },
  {
    id: 'instagram-reel-2',
    platform: 'instagram',
    brand: 'FraXplorer Perú',
    caption: 'Otra toma de nuestros viajes — se reproduce en el sitio.',
    thumbnail: '/images/pexels-joanavittoria-2193392-scaled.jpg',
    localSrc: LOCAL_VIDEO,
    originalUrl: CONTACT.instagram,
  },
  {
    id: 'peru-hero',
    platform: 'local',
    brand: 'FraXplorer Perú',
    caption: 'Descubre el Perú con FraXplorer — Machu Picchu, Cusco y aventuras inolvidables.',
    thumbnail: '/images/portada.jpg',
    localSrc: LOCAL_VIDEO,
  },
];

export const SOCIAL_LINKS = {
  facebook: CONTACT.facebook,
  instagram: CONTACT.instagram,
  youtube: CONTACT.youtube,
  tiktok: CONTACT.tiktok,
};
