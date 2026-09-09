import { CONTACT } from '@/data/site';
import type { SocialVideoItem } from '@/data/social-videos';

export type PlayerKind = { type: 'local'; src: string };

const FB_PAGE = CONTACT.facebook;
const TIKTOK_HANDLE = CONTACT.tiktokHandle;
const LOCAL_VIDEO = '/videos/hero.mp4';

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

/** Always play a file we host. Social embeds get blocked (TikTok overload-protect, IG/FB login walls). */
export function resolveSocialPlayer(video: SocialVideoItem): PlayerKind {
  return { type: 'local', src: video.localSrc ?? LOCAL_VIDEO };
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
