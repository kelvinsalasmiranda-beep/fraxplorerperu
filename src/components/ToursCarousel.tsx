'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import Reveal from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';
import { useLanguage } from '@/context/LanguageContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function ToursCarousel() {
  const { t } = useLanguage();
  const ui = t.toursCarousel;
  const details = [
    { key: 'price' as const, icon: '💵', label: t.tour.from },
    { key: 'duration' as const, icon: '🕒', label: t.tour.duration },
    { key: 'type' as const, icon: '🌍', label: t.tour.type },
    { key: 'difficulty' as const, icon: '💪', label: t.tour.difficulty },
    { key: 'availability' as const, icon: '📅', label: t.tour.availability },
  ];

  return (
    <section id="tours" className="relative overflow-hidden bg-brand-dark py-16 sm:py-24 md:py-32">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal className="text-center mb-16">
          <SectionBadge>{ui.badge}</SectionBadge>
          <h2 className="section-title !text-white mt-4">{ui.title}</h2>
          <p className="section-subtitle !text-white/60">{ui.subtitle}</p>
        </Reveal>

        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 2.5, slideShadows: false }}
          spaceBetween={24}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }}
          className="overflow-hidden pb-16"
        >
          {t.homeTours.map((tour, i) => (
            <SwiperSlide key={tour.href} className="!w-[min(18.75rem,calc(100vw-2.5rem))] md:!w-[340px]">
              <motion.article
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group h-[500px] md:h-[520px]"
              >
                <Link
                  href={tour.href}
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
                  aria-label={`${ui.viewTourAria} ${tour.title}`}
                >
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="340px"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/15" />
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/20 via-transparent to-transparent opacity-80" />

                  <div className="relative z-10 flex h-full flex-col justify-between p-5 md:p-6">
                    <div className="flex justify-end">
                      <span className="rounded-full bg-brand-gold px-3.5 py-1.5 text-xs font-bold text-brand-dark shadow-lg">
                        {tour.price}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading text-sm md:text-[15px] font-bold uppercase leading-snug text-white drop-shadow-md line-clamp-3 mb-4">
                        {tour.title}
                      </h3>

                      <ul className="mb-5 space-y-1.5 rounded-2xl bg-black/25 backdrop-blur-sm border border-white/10 px-3.5 py-3">
                        {details.map(({ key, icon, label }) => (
                          <li
                            key={key}
                            className="flex gap-2 text-[10.5px] md:text-[11px] text-white/90 leading-snug"
                          >
                            <span className="shrink-0 opacity-90">{icon}</span>
                            <span>
                              <span className="font-semibold text-white">{label}:</span>{' '}
                              {tour[key]}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <span className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-gold to-amber-400 py-3.5 text-xs font-bold uppercase tracking-wide text-brand-dark shadow-lg transition group-hover:shadow-brand-gold/40 group-hover:brightness-105">
                        {t.common.viewTour}
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
