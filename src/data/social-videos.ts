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
 * Reels reales de @fraxplorer_peru.
 * YouTube no se puede incrustar (música con copyright).
 * Facebook no tiene video embebible. TikTok es una foto, no un video.
 */
export const SOCIAL_VIDEOS: SocialVideoItem[] = [
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
