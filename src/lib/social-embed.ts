import { CONTACT } from '@/data/site';
import type { SocialVideoItem } from '@/data/social-videos';

export type PlayerKind =
  | { type: 'local'; src: string }
  | { type: 'iframe'; src: string; originalUrl: string };

const FB_PAGE = CONTACT.facebook;
const TIKTOK_HANDLE = CONTACT.tiktokHandle;

export function extractTikTokPostId(url: string): string | null {
  const match = url.match(/\/(?:video|photo)\/(\d+)/);
  return match?.[1] ?? null;
}

export function extractYouTubeId(url: string): string | null {
  return url.match(/(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/)?.[1] ?? null;
}

export function extractInstagramCode(url: string): string | null {
  return url.match(/\/(?:p|reel|reels)\/([A-Za-z0-9_-]+)/)?.[1] ?? null;
}

export function buildTikTokVideoEmbed(postId: string): string {
  return `https://www.tiktok.com/embed/v2/${postId}?lang=es`;
}

export function buildYouTubeEmbed(videoId: string, autoplay = false): string {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  if (autoplay) params.set('autoplay', '1');
  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export function buildInstagramEmbed(code: string): string {
  return `https://www.instagram.com/p/${code}/embed/`;
}

export function buildFacebookPageEmbed(pageUrl = FB_PAGE, width = 340, height = 560): string {
  const params = new URLSearchParams({
    href: pageUrl,
    tabs: 'videos',
    width: String(width),
    height: String(height),
    small_header: 'false',
    adapt_container_width: 'true',
    hide_cover: 'false',
    show_facepile: 'true',
  });
  return `https://www.facebook.com/plugins/page.php?${params.toString()}`;
}

export function getExternalUrl(video: SocialVideoItem): string {
  if (video.originalUrl) return video.originalUrl;
  if (video.platform === 'facebook') return FB_PAGE;
  if (video.platform === 'tiktok') {
    return `https://www.tiktok.com/@${video.tiktokProfile ?? TIKTOK_HANDLE}`;
  }
  if (video.platform === 'youtube') return CONTACT.youtube;
  if (video.platform === 'instagram') return CONTACT.instagram;
  return FB_PAGE;
}

export function resolveSocialPlayer(
  video: SocialVideoItem,
  opts: { autoplay?: boolean } = {}
): PlayerKind {
  if (video.platform === 'local') {
    return { type: 'local', src: video.localSrc ?? '/videos/hero.mp4' };
  }

  if (video.embedUrl?.includes('/embed') || video.embedUrl?.includes('plugins/page.php')) {
    return { type: 'iframe', src: video.embedUrl, originalUrl: getExternalUrl(video) };
  }

  if (video.platform === 'youtube') {
    const id = video.embedUrl ? extractYouTubeId(video.embedUrl) : null;
    if (id) {
      return {
        type: 'iframe',
        src: buildYouTubeEmbed(id, opts.autoplay),
        originalUrl: getExternalUrl(video),
      };
    }
  }

  if (video.platform === 'instagram') {
    const code = video.embedUrl ? extractInstagramCode(video.embedUrl) : null;
    if (code) {
      return { type: 'iframe', src: buildInstagramEmbed(code), originalUrl: getExternalUrl(video) };
    }
  }

  if (video.platform === 'tiktok') {
    const source = video.embedUrl ?? video.originalUrl ?? '';
    const postId = source ? extractTikTokPostId(source) : null;
    if (postId) {
      return { type: 'iframe', src: buildTikTokVideoEmbed(postId), originalUrl: getExternalUrl(video) };
    }
  }

  if (video.platform === 'facebook') {
    return { type: 'iframe', src: buildFacebookPageEmbed(), originalUrl: FB_PAGE };
  }

  return { type: 'iframe', src: getExternalUrl(video), originalUrl: getExternalUrl(video) };
}

export function getPlatformLabel(platform: SocialVideoItem['platform']): string {
  const labels = {
    facebook: 'Facebook',
    tiktok: 'TikTok',
    local: 'Video',
    youtube: 'YouTube',
    instagram: 'Instagram',
  };
  return labels[platform];
}
