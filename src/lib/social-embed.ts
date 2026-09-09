import { CONTACT } from '@/data/site';
import type { SocialVideoItem } from '@/data/social-videos';

export type PlayerKind =
  | { type: 'local'; src: string }
  | { type: 'facebook-reel'; iframeSrc: string; originalUrl: string }
  | { type: 'facebook-page'; iframeSrc: string; originalUrl: string }
  | { type: 'tiktok-video'; iframeSrc: string; originalUrl: string }
  | { type: 'tiktok-profile'; handle: string; cite: string; originalUrl: string }
  | { type: 'youtube'; iframeSrc: string; originalUrl: string }
  | { type: 'external'; href: string };

const FB_PAGE = CONTACT.facebook;
const TIKTOK_HANDLE = CONTACT.tiktokHandle;

export function extractTikTokPostId(url: string): string | null {
  const match = url.match(/\/(?:video|photo)\/(\d+)/);
  return match?.[1] ?? null;
}

export function isFacebookReelOrVideo(url: string): boolean {
  return /\/reel\/|\/videos\/\d|fb\.watch|\/watch\/?\?v=/.test(url);
}

export function buildFacebookReelEmbed(reelUrl: string, width = 340): string {
  const params = new URLSearchParams({
    href: reelUrl,
    show_text: 'false',
    width: String(width),
  });
  return `https://www.facebook.com/plugins/video.php?${params.toString()}`;
}

export function buildFacebookPageEmbed(pageUrl = FB_PAGE, width = 340, height = 560): string {
  const params = new URLSearchParams({
    href: pageUrl,
    tabs: 'timeline',
    width: String(width),
    height: String(height),
    small_header: 'false',
    adapt_container_width: 'true',
    hide_cover: 'false',
    show_facepile: 'true',
  });
  return `https://www.facebook.com/plugins/page.php?${params.toString()}`;
}

export function buildTikTokVideoEmbed(postId: string): string {
  return `https://www.tiktok.com/embed/v2/${postId}?lang=es`;
}

export function getExternalUrl(video: SocialVideoItem): string {
  if (video.originalUrl) return video.originalUrl;
  if (video.embedUrl) return video.embedUrl;
  if (video.platform === 'facebook') return FB_PAGE;
  if (video.platform === 'tiktok') {
    return `https://www.tiktok.com/@${video.tiktokProfile ?? TIKTOK_HANDLE}`;
  }
  if (video.platform === 'youtube') return CONTACT.youtube;
  if (video.platform === 'instagram') return CONTACT.instagram;
  return FB_PAGE;
}

export function resolveSocialPlayer(video: SocialVideoItem): PlayerKind {
  if (video.platform === 'local') {
    return { type: 'local', src: video.localSrc ?? '/videos/hero.mp4' };
  }

  if (video.platform === 'instagram') {
    return { type: 'external', href: getExternalUrl(video) };
  }

  if (video.platform === 'youtube') {
    if (video.embedUrl?.includes('youtube.com/embed')) {
      return {
        type: 'youtube',
        iframeSrc: video.embedUrl,
        originalUrl: getExternalUrl(video),
      };
    }
    const watchId = video.embedUrl?.match(/(?:v=|youtu\.be\/|shorts\/)([\w-]{11})/)?.[1];
    if (watchId) {
      return {
        type: 'youtube',
        iframeSrc: `https://www.youtube.com/embed/${watchId}?rel=0`,
        originalUrl: getExternalUrl(video),
      };
    }
    return { type: 'external', href: getExternalUrl(video) };
  }

  if (video.platform === 'facebook') {
    const reelUrl = video.embedUrl ?? video.originalUrl ?? '';
    if (reelUrl && isFacebookReelOrVideo(reelUrl)) {
      return {
        type: 'facebook-reel',
        iframeSrc: buildFacebookReelEmbed(reelUrl),
        originalUrl: video.originalUrl ?? reelUrl,
      };
    }
    return {
      type: 'facebook-page',
      iframeSrc: buildFacebookPageEmbed(),
      originalUrl: FB_PAGE,
    };
  }

  if (video.platform === 'tiktok') {
    const source = video.embedUrl ?? video.originalUrl ?? '';
    const postId = source ? extractTikTokPostId(source) : null;
    if (postId) {
      return {
        type: 'tiktok-video',
        iframeSrc: buildTikTokVideoEmbed(postId),
        originalUrl: video.originalUrl ?? source,
      };
    }
    const handle = video.tiktokProfile ?? TIKTOK_HANDLE;
    return {
      type: 'tiktok-profile',
      handle,
      cite: `https://www.tiktok.com/@${handle}`,
      originalUrl: getExternalUrl(video),
    };
  }

  return { type: 'local', src: video.localSrc ?? '/videos/hero.mp4' };
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
