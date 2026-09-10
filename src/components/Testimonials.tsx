'use client';

import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { TESTIMONIALS } from '@/data/testimonials';
import Reveal from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';
import { useLanguage } from '@/context/LanguageContext';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Testimonials() {
  const { t, locale } = useLanguage();
  const ui = t.testimonialsUi;
  const lang = locale === 'en' ? 'en' : 'es';

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal className="text-center mb-14">
          <SectionBadge>{ui.badge}</SectionBadge>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-brand-dark leading-[1.15] tracking-normal px-2">
            {t.sections.testimonials}
          </h2>
          <p className="mt-5 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {ui.subtitle}
          </p>
        </Reveal>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 7000, disableOnInteraction: true }}
          breakpoints={{ 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
          className="!pb-4 testimonials-swiper"
        >
          {TESTIMONIALS.map((item) => (
            <SwiperSlide key={item.name} className="h-auto">
              <motion.article
                whileHover={{ y: -4 }}
                className="flex h-full flex-col rounded-3xl bg-white p-7 md:p-8 shadow-[0_16px_40px_-18px_rgba(0,45,51,0.22)] ring-1 ring-black/5"
              >
                <p className="font-display text-5xl leading-none text-brand-gold" aria-hidden>
                  “
                </p>
                <p className="mt-2 font-display text-xl md:text-2xl text-brand-dark leading-snug">
                  {item.quote[lang]}
                </p>
                <div className="mt-auto pt-8">
                  <p className="text-brand-gold text-lg tracking-wide" aria-label="5 de 5">
                    ★★★★★
                  </p>
                  <p className="mt-2 text-lg font-bold text-brand-dark">{item.name}</p>
                  <p className="text-base text-gray-500">{item.from[lang]}</p>
                  <p className="mt-1 text-base font-medium text-brand-teal">
                    {item.tour[lang]} · {ui.viaLabel}
                  </p>
                </div>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
