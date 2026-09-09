import { CONTACT } from './site';

export type SocialVideoItem = {
  id: string;
  platform: 'facebook' | 'tiktok' | 'local' | 'youtube' | 'instagram';
  brand: string;
  caption: string;
  thumbnail: string;
  localSrc?: string;
  embedUrl?: string;
  originalUrl?: string;
  tiktokProfile?: string;
};

const TIKTOK_PROFILE = `https://www.tiktok.com/@${CONTACT.tiktokHandle}`;
const TIKTOK_FEATURED = `${TIKTOK_PROFILE}/photo/7681896276551634194`;

/**
 * Videos y perfiles reales. El ítem tiktok-live usa el embed oficial del creador:
 * TikTok muestra las publicaciones nuevas sin volver a editar la web.
 */
export const SOCIAL_VIDEOS: SocialVideoItem[] = [
  {
    id: 'tiktok-live',
    platform: 'tiktok',
    brand: 'FraXplorer Perú',
    caption: 'TikTok en vivo — cada publicación nueva de @agency_fraxplorer_peru aparece aquí.',
    thumbnail: '/images/lagunaab-768x1024.jpg',
    tiktokProfile: CONTACT.tiktokHandle,
    originalUrl: TIKTOK_PROFILE,
  },
  {
    id: 'tiktok-featured',
    platform: 'tiktok',
    brand: 'FraXplorer Perú',
    caption: 'Publicación reciente en TikTok — fotos y videos reales de nuestros viajeros.',
    thumbnail: '/images/33098cd0a441c619cc416a8f67180f21.jpg',
    embedUrl: TIKTOK_FEATURED,
    originalUrl: TIKTOK_FEATURED,
    tiktokProfile: CONTACT.tiktokHandle,
  },
  {
    id: 'facebook-live',
    platform: 'facebook',
    brand: 'FraXplorer Perú',
    caption: 'Facebook en vivo — mira el muro y los videos de FraXplorer Perú.',
    thumbnail: '/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg',
    originalUrl: CONTACT.facebook,
  },
  {
    id: 'instagram-feed',
    platform: 'instagram',
    brand: 'FraXplorer Perú',
    caption: 'Fotos y reels en Instagram @fraxplorer_peru.',
    thumbnail: '/images/pexels-erike-fusiki-58866350-8150307-scaled.jpg',
    originalUrl: CONTACT.instagram,
  },
  {
    id: 'youtube-channel',
    platform: 'youtube',
    brand: 'FraXplorer Perú',
    caption: 'YouTube — Santa Ana y tomas aéreas de Cusco en el canal FraXplorer Perú.',
    thumbnail: '/images/pexels-joanavittoria-2193392-scaled.jpg',
    originalUrl: CONTACT.youtube,
  },
  {
    id: 'peru-hero',
    platform: 'local',
    brand: 'FraXplorer Perú',
    caption: 'Descubre el Perú con FraXplorer — Machu Picchu, Cusco y aventuras inolvidables.',
    thumbnail: '/images/portada.jpg',
    localSrc: '/videos/hero.mp4',
  },
];

export const SOCIAL_LINKS = {
  facebook: CONTACT.facebook,
  instagram: CONTACT.instagram,
  youtube: CONTACT.youtube,
  tiktok: CONTACT.tiktok,
};
