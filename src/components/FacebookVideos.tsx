'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { SOCIAL_LINKS, SOCIAL_VIDEOS } from '@/data/social-videos';
import { resolveSocialPlayer } from '@/lib/social-embed';
import { useLanguage } from '@/context/LanguageContext';
import { openPlatformLabel, socialVideoCaption } from '@/i18n/tours';
import Reveal from '@/components/ui/Reveal';
import 'swiper/css';
import 'swiper/css/navigation';

function InstagramCard({
  videoId,
  caption,
  iframeSrc,
  originalUrl,
}: {
  videoId: string;
  caption: string;
  iframeSrc: string;
  originalUrl: string;
}) {
  const { locale } = useLanguage();

  return (
    <div className="swiper-no-swiping w-full overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5">
      <div className="relative h-[560px] w-full bg-black sm:h-[600px]">
        <iframe
          src={iframeSrc}
          title={socialVideoCaption(videoId, locale, caption)}
          className="h-full w-full border-0"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="px-3 py-2.5 text-center">
        <a
          href={originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brand-accent hover:text-brand-teal transition"
        >
          {openPlatformLabel('instagram', locale)}
        </a>
      </div>
    </div>
  );
}

export default function FacebookVideos() {
  const { t } = useLanguage();
  const ui = t.videosUi;
  const [swiper, setSwiper] = useState<SwiperType | null>(null);

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
              spaceBetween={12}
              slidesPerView={1.15}
              breakpoints={{
                480: { slidesPerView: 1.6, spaceBetween: 14 },
                768: { slidesPerView: 2.4, spaceBetween: 16 },
                1024: { slidesPerView: 3.4, spaceBetween: 16 },
                1280: { slidesPerView: 4.2, spaceBetween: 16 },
              }}
              className="overflow-hidden"
            >
              {SOCIAL_VIDEOS.map((video) => {
                const player = resolveSocialPlayer(video);
                return (
                  <SwiperSlide key={video.id}>
                    <InstagramCard
                      videoId={video.id}
                      caption={video.caption}
                      iframeSrc={player.src}
                      originalUrl={player.originalUrl}
                    />
                  </SwiperSlide>
                );
              })}
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
    </section>
  );
}
