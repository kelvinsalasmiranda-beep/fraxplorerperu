'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { TESTIMONIALS } from '@/data/site';
import Reveal from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';
import { useLanguage } from '@/context/LanguageContext';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Testimonials() {
  const { t } = useLanguage();
  const ui = t.testimonialsUi;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal className="text-center mb-16">
          <SectionBadge>{ui.badge}</SectionBadge>
          <h2 className="section-title mt-4">{t.sections.testimonials}</h2>
          <p className="section-subtitle">{ui.subtitle}</p>
        </Reveal>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1.15}
          navigation
          autoplay={{ delay: 5500, disableOnInteraction: true }}
          breakpoints={{ 640: { slidesPerView: 2.1 }, 1024: { slidesPerView: 3.15 } }}
          className="!pb-2"
        >
          {TESTIMONIALS.map((img, i) => (
            <SwiperSlide key={i}>
              <motion.div
                whileHover={{ y: -4 }}
                className="mx-auto max-w-[280px]"
              >
                <div className="rounded-[1.75rem] bg-[#f7f4ee] p-2.5 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
                  <div className="relative aspect-[9/16] overflow-hidden rounded-[1.35rem] bg-white">
                    <Image
                      src={img}
                      alt={`${ui.altPrefix} ${i + 1}`}
                      fill
                      className="object-contain object-top"
                      sizes="280px"
                    />
                  </div>
                </div>
                <p className="mt-3 text-center text-xs text-gray-400">{ui.viaLabel}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
