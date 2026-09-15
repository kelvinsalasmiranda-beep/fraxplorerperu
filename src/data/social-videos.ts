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

/**
 * Videos reales de @agency_fraxplorer_peru y reels de @fraxplorer_peru.
 * Solo posts que se pueden reproducir (no fotos ni enlaces de perfil).
 */
export const SOCIAL_VIDEOS: SocialVideoItem[] = [
  {
    id: 'tiktok-video-2',
    platform: 'tiktok',
    brand: 'FraXplorer Perú',
    caption: 'La caminata vale cada metro',
    thumbnail: '/images/social/tiktok-7574117631586880785.jpg',
    embedUrl: 'https://www.tiktok.com/@agency_fraxplorer_peru/video/7574117631586880785',
    originalUrl: 'https://www.tiktok.com/@agency_fraxplorer_peru/video/7574117631586880785',
  },
  {
    id: 'instagram-reel-1',
    platform: 'instagram',
    brand: 'FraXplorer Perú',
    caption: 'Reel de @fraxplorer_peru',
    thumbnail: '/images/pexels-erike-fusiki-58866350-8150307-scaled.jpg',
    embedUrl: 'https://www.instagram.com/reel/DboISwLgH3_/',
    originalUrl: 'https://www.instagram.com/reel/DboISwLgH3_/',
  },
  {
    id: 'instagram-reel-2',
    platform: 'instagram',
    brand: 'FraXplorer Perú',
    caption: 'Reel de @fraxplorer_peru',
    thumbnail: '/images/33098cd0a441c619cc416a8f67180f21.jpg',
    embedUrl: 'https://www.instagram.com/reel/DbmjPLCg8KZ/',
    originalUrl: 'https://www.instagram.com/reel/DbmjPLCg8KZ/',
  },
  {
    id: 'instagram-reel-3',
    platform: 'instagram',
    brand: 'FraXplorer Perú',
    caption: 'Reel de @fraxplorer_peru',
    thumbnail: '/images/portada.jpg',
    embedUrl: 'https://www.instagram.com/reel/DbcK_cegUj-/',
    originalUrl: 'https://www.instagram.com/reel/DbcK_cegUj-/',
  },
  {
    id: 'instagram-reel-4',
    platform: 'instagram',
    brand: 'FraXplorer Perú',
    caption: 'Reel de @fraxplorer_peru',
    thumbnail: '/images/lagunaab-768x1024.jpg',
    embedUrl: 'https://www.instagram.com/reel/DamalbQgIPr/',
    originalUrl: 'https://www.instagram.com/reel/DamalbQgIPr/',
  },
  {
    id: 'instagram-reel-5',
    platform: 'instagram',
    brand: 'FraXplorer Perú',
    caption: 'Reel de @fraxplorer_peru',
    thumbnail: '/images/d5c317e89f5b1e24573d6410a9a7ec8f.jpg',
    embedUrl: 'https://www.instagram.com/reel/DaPGf81g6f5/',
    originalUrl: 'https://www.instagram.com/reel/DaPGf81g6f5/',
  },
  {
    id: 'instagram-reel-6',
    platform: 'instagram',
    brand: 'FraXplorer Perú',
    caption: 'Reel de @fraxplorer_peru',
    thumbnail: '/images/pexels-joanavittoria-2193392-scaled.jpg',
    embedUrl: 'https://www.instagram.com/reel/DZtnkCBglxI/',
    originalUrl: 'https://www.instagram.com/reel/DZtnkCBglxI/',
  },
];

export const SOCIAL_LINKS = {
  facebook: CONTACT.facebook,
  instagram: CONTACT.instagram,
  youtube: CONTACT.youtube,
  tiktok: CONTACT.tiktok,
};
