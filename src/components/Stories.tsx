'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';
import MagneticButton from '@/components/ui/MagneticButton';
import { STORIES_PHOTOS } from '@/data/stories-photos';
import { useLanguage } from '@/context/LanguageContext';
import { bookingWhatsAppText, buildWhatsAppUrl } from '@/lib/whatsapp';

export default function Stories() {
  const { t } = useLanguage();
  const s = t.stories;
  const search = t.hero.search;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % STORIES_PHOTOS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const photo = STORIES_PHOTOS[active];

  function reserveText(destination = photo.label) {
    return bookingWhatsAppText(search.whatsappIntro, search.whatsappAsk, [
      { label: search.destinationLabel, value: destination },
    ]);
  }

  return (
    <section className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal direction="left">
            <SectionBadge>{s.badge}</SectionBadge>
            <h2 className="mb-6 mt-4 font-heading text-4xl font-bold leading-tight text-brand-dark md:text-5xl">
              {s.title} <span className="text-brand-accent">{s.titleHighlight}</span>
            </h2>
            <p className="mb-4 text-lg leading-relaxed text-gray-500">
              {s.p1} <strong className="text-brand-dark">{s.p1Bold}</strong> {s.p1Rest}
            </p>
            <p className="mb-8 leading-relaxed text-gray-500">
              {s.p2} <strong className="text-brand-dark">{s.p2Bold}</strong>
            </p>
            <MagneticButton href={buildWhatsAppUrl(reserveText(STORIES_PHOTOS[0].label))} className="btn-primary">
              {s.cta}
            </MagneticButton>
          </Reveal>

          <Reveal direction="right" delay={0.15}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-accent/20 to-brand-gold/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                <div className="relative h-[380px] md:h-[520px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={photo.src}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={active === 0}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3">
                    <div className="rounded-2xl bg-white/12 px-4 py-3 backdrop-blur-md">
                      <p className="text-sm font-semibold text-white">{photo.label}</p>
                      <p className="mt-1 text-xs text-white/70">{s.cardLine2}</p>
                    </div>
                    <a
                      href={buildWhatsAppUrl(reserveText())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-white px-4 py-2 text-xs font-bold text-brand-dark shadow-lg transition hover:bg-brand-gold"
                    >
                      {t.hero.cta}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-1 bg-white p-1.5">
                  {STORIES_PHOTOS.map((item, index) => (
                    <button
                      key={item.src}
                      type="button"
                      onClick={() => setActive(index)}
                      className={`relative h-14 overflow-hidden rounded-xl sm:h-16 ${
                        index === active ? 'ring-2 ring-brand-accent' : 'opacity-80 hover:opacity-100'
                      }`}
                      aria-label={item.label}
                    >
                      <Image src={item.src} alt={item.label} fill className="object-cover" sizes="80px" />
                    </button>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -left-3 top-6 rounded-2xl bg-white px-5 py-4 shadow-xl sm:-left-6"
              >
                <p className="text-3xl font-black text-brand-accent">500+</p>
                <p className="text-xs uppercase tracking-wider text-gray-500">{s.statLabel}</p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
