import { CONTACT } from '@/data/site';
import type { SocialVideoItem } from '@/data/social-videos';

export type PlayerKind = { type: 'iframe'; src: string; originalUrl: string };

export function extractInstagramCode(url: string): string | null {
  return url.match(/\/(?:p|reel|reels)\/([A-Za-z0-9_-]+)/)?.[1] ?? null;
}

export function buildInstagramEmbed(code: string): string {
  return `https://www.instagram.com/p/${code}/embed/`;
}

export function getExternalUrl(video: SocialVideoItem): string {
  if (video.originalUrl) return video.originalUrl;
  if (video.platform === 'instagram') return CONTACT.instagram;
  if (video.platform === 'youtube') return CONTACT.youtube;
  if (video.platform === 'tiktok') return CONTACT.tiktok;
  return CONTACT.facebook;
}

export function resolveSocialPlayer(video: SocialVideoItem): PlayerKind {
  const source = video.embedUrl ?? video.originalUrl ?? '';
  const code = extractInstagramCode(source);
  const originalUrl = getExternalUrl(video);
  if (code) {
    return { type: 'iframe', src: buildInstagramEmbed(code), originalUrl };
  }
  return { type: 'iframe', src: originalUrl, originalUrl };
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
