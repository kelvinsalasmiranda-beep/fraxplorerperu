import { CONTACT } from '@/data/site';
import type { SocialVideoItem } from '@/data/social-videos';

export type PlayerKind =
  | { type: 'local'; src: string }
  | { type: 'facebook-reel'; iframeSrc: string; originalUrl: string }
  | { type: 'tiktok-video'; iframeSrc: string; originalUrl: string }
  | { type: 'tiktok-profile'; handle: string; cite: string; originalUrl: string };

const FB_PAGE = CONTACT.facebook;

export function extractTikTokVideoId(url: string): string | null {
  const match = url.match(/\/video\/(\d+)/);
  return match?.[1] ?? null;
}

export function isFacebookReelOrVideo(url: string): boolean {
  return /\/reel\/|\/videos\/\d|fb\.watch|\/watch\/?\?v=/.test(url);
}

/** Igual que miproximohogar.com.pe — plugins/video.php con reel URL */
export function buildFacebookReelEmbed(reelUrl: string, width = 340): string {
  const params = new URLSearchParams({
    href: reelUrl,
    show_text: 'false',
    width: String(width),
  });
  return `https://www.facebook.com/plugins/video.php?${params.toString()}`;
}

export function buildTikTokVideoEmbed(videoId: string): string {
  return `https://www.tiktok.com/embed/v2/${videoId}?lang=es`;
}

export function getExternalUrl(video: SocialVideoItem): string {
  if (video.originalUrl) return video.originalUrl;
  if (video.embedUrl) return video.embedUrl;
  if (video.platform === 'facebook') return `${FB_PAGE}/videos`;
  if (video.platform === 'tiktok') {
    const handle = video.tiktokProfile ?? 'agency_fraxplorer_peru';
    return `https://www.tiktok.com/@${handle}`;
  }
  return FB_PAGE;
}

export function resolveSocialPlayer(video: SocialVideoItem): PlayerKind {
  if (video.platform === 'local' || video.platform === 'youtube') {
    return { type: 'local', src: video.localSrc ?? '/videos/hero.mp4' };
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
    // Sin reel específico: mp4 local con enlace a Facebook
    return {
      type: 'local',
      src: video.localSrc ?? '/videos/hero.mp4',
    };
  }

  if (video.platform === 'tiktok') {
    if (video.embedUrl) {
      const videoId = extractTikTokVideoId(video.embedUrl);
      if (videoId) {
        return {
          type: 'tiktok-video',
          iframeSrc: buildTikTokVideoEmbed(videoId),
          originalUrl: video.originalUrl ?? video.embedUrl,
        };
      }
    }
    const handle = video.tiktokProfile ?? 'agency_fraxplorer_peru';
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
  };
  return labels[platform];
}

export function getOpenLabel(platform: SocialVideoItem['platform']): string {
  const labels = {
    facebook: 'Abrir Facebook',
    tiktok: 'Abrir TikTok',
    local: 'Ver más',
    youtube: 'Abrir YouTube',
  };
  return labels[platform];
}
