'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { CONTACT } from '@/data/site';
import Reveal from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';
import MagneticButton from '@/components/ui/MagneticButton';
import { useLanguage } from '@/context/LanguageContext';
import 'swiper/css';
import 'swiper/css/effect-fade';

export default function Experiences() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const experiences = t.experiences;

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="text-center mb-16">
          <SectionBadge>{t.experiencesUi.badge}</SectionBadge>
          <h2 className="section-title mt-4">{t.sections.experiences}</h2>
          <p className="section-subtitle">{t.sections.experiencesSub}</p>
        </Reveal>

        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {experiences.map((exp, i) => (
            <motion.button
              key={exp.title}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                active === i
                  ? 'text-white shadow-lg shadow-brand-accent/30'
                  : 'text-gray-600 hover:text-brand-accent bg-white border border-gray-200'
              }`}
            >
              {active === i && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-accent to-brand-teal"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{exp.title}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid items-center gap-10 lg:grid-cols-2"
          >
            <div>
              <h3 className="font-heading text-3xl font-bold text-brand-dark mb-4">
                {experiences[active].title}
              </h3>
              <p className="text-gray-500 mb-6 text-lg leading-relaxed">{experiences[active].description}</p>
              <ul className="mb-8 space-y-3">
                {experiences[active].bullets.map((b) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-3 text-gray-600"
                  >
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent text-xs">✓</span>
                    {b}
                  </motion.li>
                ))}
              </ul>
              <MagneticButton href={`https://wa.me/${CONTACT.whatsapp1}`} className="btn-primary">
                {t.experiencesUi.discoverNow}
              </MagneticButton>
            </div>

            <div className="relative">
              <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                autoplay={{ delay: 3500 }}
                loop
                className="rounded-3xl overflow-hidden shadow-2xl"
              >
                {experiences[active].images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative h-80 md:h-96">
                      <Image src={img} alt="" fill className="object-cover" sizes="50vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {experiences[active].images.slice(0, 4).map((img, i) => (
                  <div key={i} className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden opacity-70 hover:opacity-100 transition">
                    <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
