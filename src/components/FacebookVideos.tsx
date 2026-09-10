'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { SOCIAL_LINKS, SOCIAL_VIDEOS, SocialVideoItem } from '@/data/social-videos';
import { getPlatformLabel, resolveSocialPlayer } from '@/lib/social-embed';
import { useLanguage } from '@/context/LanguageContext';
import { openPlatformLabel, socialVideoCaption } from '@/i18n/tours';
import Reveal from '@/components/ui/Reveal';
import 'swiper/css';
import 'swiper/css/navigation';

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="currentColor" d="M8 5v14l11-7z" />
    </svg>
  );
}

function VideoLightbox({ video, onClose }: { video: SocialVideoItem; onClose: () => void }) {
  const { t, locale } = useLanguage();
  const ui = t.videosUi;
  const player = resolveSocialPlayer(video);
  const caption = socialVideoCaption(video.id, locale, video.caption);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={ui.videoPlayerLabel}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:justify-end sm:p-6 lg:p-10"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, x: 24, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 24, scale: 0.98 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        className="relative w-full max-w-[380px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-black/5">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-semibold tracking-wide text-gray-800">
              {getPlatformLabel(video.platform)}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              aria-label={ui.close}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="px-3 pb-3">
            <div className="relative h-[560px] overflow-hidden rounded-2xl bg-black">
              <iframe
                src={player.src}
                title={caption}
                className="h-full w-full border-0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-end">
          <a
            href={player.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-md ring-1 ring-black/5 hover:text-brand-accent"
          >
            {openPlatformLabel(video.platform, locale)}
          </a>
        </div>
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
      aria-label={`${ui.playVideoPrefix} ${getPlatformLabel(video.platform)}`}
      className="group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded-2xl"
    >
      <div className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-xl">
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <Image
            src={video.thumbnail}
            alt={caption}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="220px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />
          <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {getPlatformLabel(video.platform)}
          </span>
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-brand-dark shadow-lg transition-transform duration-300 group-hover:scale-110">
              <PlayIcon />
            </span>
          </span>
        </div>
        <div className="px-3 py-2.5 text-center">
          <span className="text-sm font-semibold text-brand-accent group-hover:text-brand-teal">
            {ui.playWithSound}
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
          <p className="mt-2 ml-4 text-sm text-gray-500">{ui.subtitle}</p>
          <div className="mt-4 ml-4 flex flex-wrap gap-2">
            <span className="self-center text-xs font-semibold uppercase tracking-wide text-gray-400">
              {ui.followUs}
            </span>
            {(
              [
                ['TikTok', SOCIAL_LINKS.tiktok],
                ['Facebook', SOCIAL_LINKS.facebook],
                ['Instagram', SOCIAL_LINKS.instagram],
                ['YouTube', SOCIAL_LINKS.youtube],
              ] as const
            ).map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-dark shadow-sm ring-1 ring-black/5 hover:text-brand-accent"
              >
                {label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative video-carousel px-8 sm:px-10">
            <Swiper
              modules={[Navigation]}
              onSwiper={setSwiper}
              spaceBetween={16}
              slidesPerView={1.2}
              breakpoints={{
                480: { slidesPerView: 1.8, spaceBetween: 16 },
                768: { slidesPerView: 2.6, spaceBetween: 18 },
                1024: { slidesPerView: 3.2, spaceBetween: 18 },
                1280: { slidesPerView: 3.4, spaceBetween: 18 },
              }}
              className="overflow-hidden"
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
              className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all hover:scale-110 hover:text-brand-accent"
              onClick={() => swiper?.slidePrev()}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label={ui.next}
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-gray-600 shadow-lg transition-all hover:scale-110 hover:text-brand-accent"
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
