'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';
import { useLanguage } from '@/context/LanguageContext';
import { bookingWhatsAppText, buildWhatsAppUrl } from '@/lib/whatsapp';

export default function Experiences() {
  const { t } = useLanguage();
  const experiences = t.experiences;
  const [active, setActive] = useState(0);
  const [photo, setPhoto] = useState(0);
  const [touchX, setTouchX] = useState<number | null>(null);

  const current = experiences[active];
  const images = current.images.filter(Boolean);
  const safePhoto = images.length ? photo % images.length : 0;

  useEffect(() => {
    setPhoto(0);
  }, [active]);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = setInterval(() => {
      setPhoto((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [active, images.length]);

  function nextPhoto() {
    if (!images.length) return;
    setPhoto((i) => (i + 1) % images.length);
  }

  function prevPhoto() {
    if (!images.length) return;
    setPhoto((i) => (i - 1 + images.length) % images.length);
  }

  const reserveHref = buildWhatsAppUrl(
    bookingWhatsAppText(t.hero.search.whatsappIntro, t.hero.search.whatsappAsk, [
      { label: t.hero.search.typeLabel, value: current.title },
    ])
  );

  return (
    <section className="overflow-x-hidden py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <Reveal className="mb-8 text-center sm:mb-12">
          <SectionBadge>{t.experiencesUi.badge}</SectionBadge>
          <h2 className="section-title mt-4">{t.sections.experiences}</h2>
          <p className="section-subtitle">{t.sections.experiencesSub}</p>
        </Reveal>

        <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0">
          {experiences.map((exp, i) => (
            <button
              key={exp.title}
              type="button"
              onClick={() => setActive(i)}
              className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                active === i
                  ? 'bg-gradient-to-r from-brand-accent to-brand-teal text-white shadow-lg shadow-brand-accent/30'
                  : 'border border-gray-200 bg-white text-gray-600'
              }`}
            >
              {exp.title}
            </button>
          ))}
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="order-2 min-w-0 lg:order-1">
            <h3 className="mb-3 font-heading text-2xl font-bold text-brand-dark sm:text-3xl">
              {current.title}
            </h3>
            <p className="mb-5 text-base leading-relaxed text-gray-500 sm:text-lg">{current.description}</p>
            <ul className="mb-7 space-y-3">
              {current.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600 sm:text-base">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-xs text-brand-accent">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a href={reserveHref} target="_blank" rel="noopener noreferrer" className="btn-primary">
              {t.experiencesUi.discoverNow}
            </a>
          </div>

          <div className="order-1 min-w-0 w-full lg:order-2">
            <div
              className="relative overflow-hidden rounded-3xl shadow-2xl"
              onTouchStart={(e) => setTouchX(e.changedTouches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX == null) return;
                const dx = e.changedTouches[0].clientX - touchX;
                if (dx < -40) nextPhoto();
                if (dx > 40) prevPhoto();
                setTouchX(null);
              }}
            >
              <div className="relative h-64 w-full sm:h-80 md:h-96">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active}-${images[safePhoto]}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="absolute inset-0"
                  >
                    {images[safePhoto] && (
                      <Image
                        src={images[safePhoto]}
                        alt={current.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority={active === 0 && safePhoto === 0}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/35 to-transparent" />
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevPhoto}
                      className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-brand-dark shadow"
                      aria-label={t.videosUi.prev}
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={nextPhoto}
                      className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-lg text-brand-dark shadow"
                      aria-label={t.videosUi.next}
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={`${img}-${i}`}
                  type="button"
                  onClick={() => setPhoto(i)}
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-16 ${
                    i === safePhoto ? 'ring-2 ring-brand-accent' : 'opacity-70'
                  }`}
                  aria-label={`${current.title} ${i + 1}`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
