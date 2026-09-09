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
          spaceBetween={24}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 4000 }}
          breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          className="!pb-4"
        >
          {TESTIMONIALS.map((img, i) => (
            <SwiperSlide key={i}>
              <motion.div
                whileHover={{ y: -8, rotate: i % 2 === 0 ? 1 : -1 }}
                className="relative mx-auto aspect-[9/16] max-h-[480px] overflow-hidden rounded-3xl shadow-xl border border-gray-100 bg-white"
              >
                <Image
                  src={img}
                  alt={`${ui.altPrefix} ${i + 1}`}
                  fill
                  className="object-contain p-2"
                  sizes="33vw"
                />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
