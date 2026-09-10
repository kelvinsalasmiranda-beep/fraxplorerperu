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
const TIKTOK_POST = `${TIKTOK_PROFILE}/photo/7681896276551634194`;

/** Primer video publicado en el canal @fraxplorerperu */
const YOUTUBE_SANTA_ANA = 'https://www.youtube.com/watch?v=aOELJP19MWY';

/**
 * Publicaciones reales de cada cuenta oficial.
 * El reproductor usa el embed de esa red, no un mp4 local.
 */
export const SOCIAL_VIDEOS: SocialVideoItem[] = [
  {
    id: 'youtube-santa-ana',
    platform: 'youtube',
    brand: 'FraXplorer Perú',
    caption: 'Santa Ana, el mirador más bonito de Cusco — toma aérea 4K.',
    thumbnail: '/images/pexels-joanavittoria-2193392-scaled.jpg',
    embedUrl: YOUTUBE_SANTA_ANA,
    originalUrl: YOUTUBE_SANTA_ANA,
  },
  {
    id: 'instagram-reel-1',
    platform: 'instagram',
    brand: 'FraXplorer Perú',
    caption: 'Reel real en Instagram @fraxplorer_peru.',
    thumbnail: '/images/pexels-erike-fusiki-58866350-8150307-scaled.jpg',
    embedUrl: 'https://www.instagram.com/reel/DboISwLgH3_/',
    originalUrl: 'https://www.instagram.com/reel/DboISwLgH3_/',
  },
  {
    id: 'tiktok-featured',
    platform: 'tiktok',
    brand: 'FraXplorer Perú',
    caption: 'Publicación real en TikTok @agency_fraxplorer_peru.',
    thumbnail: '/images/lagunaab-768x1024.jpg',
    embedUrl: TIKTOK_POST,
    originalUrl: TIKTOK_POST,
    tiktokProfile: CONTACT.tiktokHandle,
  },
  {
    id: 'facebook-live',
    platform: 'facebook',
    brand: 'FraXplorer Perú',
    caption: 'Videos de la página de Facebook FraXplorer Perú.',
    thumbnail: '/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg',
    originalUrl: CONTACT.facebook,
  },
  {
    id: 'instagram-reel-2',
    platform: 'instagram',
    brand: 'FraXplorer Perú',
    caption: 'Otro reel real de @fraxplorer_peru.',
    thumbnail: '/images/33098cd0a441c619cc416a8f67180f21.jpg',
    embedUrl: 'https://www.instagram.com/reel/DbmjPLCg8KZ/',
    originalUrl: 'https://www.instagram.com/reel/DbmjPLCg8KZ/',
  },
  {
    id: 'instagram-reel-3',
    platform: 'instagram',
    brand: 'FraXplorer Perú',
    caption: 'Más videos reales de nuestros viajeros en Instagram.',
    thumbnail: '/images/portada.jpg',
    embedUrl: 'https://www.instagram.com/reel/DbcK_cegUj-/',
    originalUrl: 'https://www.instagram.com/reel/DbcK_cegUj-/',
  },
];

export const SOCIAL_LINKS = {
  facebook: CONTACT.facebook,
  instagram: CONTACT.instagram,
  youtube: CONTACT.youtube,
  tiktok: CONTACT.tiktok,
};
