'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { SOCIAL_VIDEOS, SocialVideoItem } from '@/data/social-videos';
import {
  resolveSocialPlayer,
  getPlatformLabel,
  getExternalUrl,
  type PlayerKind,
} from '@/lib/social-embed';
import { useLanguage } from '@/context/LanguageContext';
import { socialVideoCaption, openPlatformLabel } from '@/i18n/tours';
import Reveal from '@/components/ui/Reveal';
import 'swiper/css';
import 'swiper/css/navigation';

const PLATFORM_BADGE = {
  facebook: 'bg-[#1877F2]',
  tiktok: 'bg-black',
  local: 'bg-brand-accent',
  youtube: 'bg-red-600',
} as const;

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        d="M14 3h7v7M10 14L21 3M21 14v7h-7M3 10V3h7"
      />
    </svg>
  );
}

function FullscreenIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"
      />
    </svg>
  );
}

function LocalPlayer({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const t = setTimeout(() => videoRef.current?.play().catch(() => {}), 300);
    return () => clearTimeout(t);
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      autoPlay
      playsInline
      poster={poster}
      className="h-full w-full object-cover bg-black"
    />
  );
}

function TikTokProfileEmbed({ handle, cite }: { handle: string; cite: string }) {
  useEffect(() => {
    if (document.querySelector('script[data-tiktok-embed]')) return;
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    script.dataset.tiktokEmbed = 'true';
    document.body.appendChild(script);
  }, []);

  return (
    <div className="h-full w-full overflow-y-auto bg-white flex justify-center py-1">
      <blockquote
        className="tiktok-embed"
        cite={cite}
        data-unique-id={handle}
        data-embed-type="creator"
        style={{ maxWidth: 340, minWidth: 325 }}
      >
        <section />
      </blockquote>
    </div>
  );
}

function VideoFrame({ video, player }: { video: SocialVideoItem; player: PlayerKind }) {
  if (player.type === 'local') {
    return <LocalPlayer src={player.src} poster={video.thumbnail} />;
  }

  if (player.type === 'tiktok-profile') {
    return <TikTokProfileEmbed handle={player.handle} cite={player.cite} />;
  }

  return (
    <iframe
      src={player.iframeSrc}
      title={`Video ${getPlatformLabel(video.platform)}`}
      className="h-full w-full border-0 bg-black"
      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
      allowFullScreen
      loading="eager"
    />
  );
}

function VideoLightbox({ video, onClose }: { video: SocialVideoItem; onClose: () => void }) {
  const { t, locale } = useLanguage();
  const ui = t.videosUi;
  const frameRef = useRef<HTMLDivElement>(null);
  const player = resolveSocialPlayer(video);
  const externalUrl = getExternalUrl(video);
  const isEmbed = player.type === 'facebook-reel' || player.type === 'tiktok-video';

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const toggleFullscreen = () => {
    const el = frameRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      el.requestFullscreen().catch(() => {});
    }
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={ui.videoPlayerLabel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" aria-hidden="true" />

      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 12 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative w-full max-w-[380px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Panel principal — estilo miproximohogar */}
        <div className="rounded-2xl overflow-hidden bg-white shadow-2xl ring-1 ring-black/5">
          {/* Barra superior */}
          <div className="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-gray-100 bg-white">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${PLATFORM_BADGE[video.platform]}`}
            >
              {getPlatformLabel(video.platform)}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
              aria-label={ui.close}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Reproductor vertical 9:16 */}
          <div
            ref={frameRef}
            className={`relative w-full bg-black ${isEmbed ? 'aspect-[9/16]' : 'aspect-[9/16]'}`}
          >
            <VideoFrame video={video} player={player} />
          </div>
        </div>

        {/* Controles inferiores */}
        <nav
          className="mt-3 flex items-center justify-between gap-3"
          aria-label={ui.controlsLabel}
        >
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/90 px-4 py-2.5 text-sm font-medium text-gray-800 shadow-lg backdrop-blur-sm transition hover:bg-white"
          >
            <ExternalIcon />
            {openPlatformLabel(video.platform, locale)}
          </a>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/90 text-gray-700 shadow-lg backdrop-blur-sm transition hover:bg-white"
            aria-label={ui.fullscreen}
          >
            <FullscreenIcon />
          </button>
        </nav>
      </motion.div>
    </motion.div>
  );
}

function VideoCard({ video, onPlay }: { video: SocialVideoItem; onPlay: () => void }) {
  const { t, locale } = useLanguage();
  const ui = t.videosUi;
  const caption = socialVideoCaption(video.id, locale, video.caption);

  return (
    <button
      type="button"
      onClick={onPlay}
      aria-label={`${ui.playVideoPrefix} ${video.platform}`}
      className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-2xl"
    >
      <div className="rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-md ring-1 ring-black/5 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-0.5">
        <div className="relative aspect-[9/14] overflow-hidden bg-gray-100">
          <Image
            src={video.thumbnail}
            alt={caption}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="220px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          <span
            className={`absolute top-3 left-3 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${PLATFORM_BADGE[video.platform]}`}
          >
            {getPlatformLabel(video.platform)}
          </span>

          <span
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-brand-dark shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path fill="currentColor" d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </div>

        <div className="px-3 py-2.5 text-center">
          <span className="text-sm font-semibold text-brand-accent group-hover:text-brand-teal transition">
            {ui.play}
          </span>
        </div>
      </div>
    </button>
  );
}

export default function FacebookVideos() {
  const { t } = useLanguage();
  const ui = t.videosUi;
  const [active, setActive] = useState<SocialVideoItem | null>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  return (
    <section id="videos" className="py-16 md:py-24 bg-[#f0f2f5]">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-dark flex items-center gap-3">
            <span className="inline-block w-1 h-8 rounded-full bg-brand-accent" aria-hidden="true" />
            {t.sections.videos}
          </h2>
          <p className="text-gray-500 text-sm mt-2 ml-4">
            {ui.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative video-carousel px-6">
            <Swiper
              modules={[Navigation]}
              onSwiper={setSwiper}
              spaceBetween={16}
              slidesPerView={1.4}
              breakpoints={{
                480: { slidesPerView: 2.2 },
                768: { slidesPerView: 3.2 },
                1024: { slidesPerView: 4.2 },
                1280: { slidesPerView: 5.2 },
              }}
              className="!overflow-visible"
            >
              {SOCIAL_VIDEOS.map((video) => (
                <SwiperSlide key={video.id}>
                  <VideoCard video={video} onPlay={() => setActive(video)} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              aria-label={ui.prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg text-gray-600 hover:text-brand-accent hover:scale-110 transition-all"
              onClick={() => swiper?.slidePrev()}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label={ui.next}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg text-gray-600 hover:text-brand-accent hover:scale-110 transition-all"
              onClick={() => swiper?.slideNext()}
            >
              ›
            </button>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {active && <VideoLightbox key={active.id} video={active} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
