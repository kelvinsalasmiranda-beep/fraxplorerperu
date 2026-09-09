'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CONTACT, HERO_VIDEO } from '@/data/site';
import { useLanguage } from '@/context/LanguageContext';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Hero() {
  const { t } = useLanguage();
  const words = [t.hero.line1, t.hero.line2];
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden">
      {/* Parallax video */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster="/images/portada.jpg"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 gradient-mesh opacity-60" />
      <div className="absolute inset-0 noise-bg" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 hidden h-64 w-64 rounded-full bg-brand-accent/10 blur-3xl animate-float sm:block" />
      <div className="absolute bottom-1/4 right-1/4 hidden h-96 w-96 rounded-full bg-brand-gold/10 blur-3xl animate-float sm:block" style={{ animationDelay: '2s' }} />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-5xl px-4 pt-28 pb-16 text-center sm:pt-32 sm:pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 sm:mb-8 sm:px-5 sm:py-2 sm:text-xs sm:tracking-[0.25em]"
        >
          <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
          {t.hero.badge}
        </motion.div>

        {/* Animated headline */}
        <div className="overflow-hidden">
          {words.map((word, i) => (
            <div key={word} className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-heading text-[clamp(1.85rem,9.5vw,6rem)] sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-[0.95] break-words [overflow-wrap:anywhere]"
              >
                {word}
              </motion.h1>
            </div>
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-heading text-[clamp(1.5rem,8vw,3.75rem)] sm:text-5xl md:text-6xl font-black tracking-tight mt-2 break-words [overflow-wrap:anywhere]"
        >
          <span className="text-gradient">{t.hero.line3}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-white/80 font-light max-w-xl mx-auto px-1"
        >
          {t.hero.subtitleLong}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-8 sm:mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <MagneticButton href={`https://wa.me/${CONTACT.whatsapp1}`} className="btn-gold animate-glow w-full justify-center sm:w-auto">
            {t.hero.cta}
          </MagneticButton>
          <MagneticButton href="#tours" className="btn-outline w-full justify-center !border-white/30 !text-white hover:!bg-white/10 hover:!text-white sm:w-auto" strength={0.2}>
            {t.hero.viewTours}
          </MagneticButton>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:mt-16 sm:gap-8"
        >
          <div className="glass-dark rounded-2xl p-3 animate-float">
            <Image
              src="/images/utopia-beach-hotels_1523_TC_BOTB_mustard_winner-gif_LL_2024.gif"
              alt="TripAdvisor Best of the Best"
              width={90}
              height={90}
              unoptimized
            />
          </div>
          <div className="glass-dark rounded-2xl p-3">
            <Image
              src="/images/03-worlds-leading-cultural-destination-2021-peru.png"
              alt="World Leading Cultural Destination"
              width={80}
              height={70}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center gap-2 text-white/50 text-xs uppercase tracking-widest"
        >
          <span>{t.hero.scroll}</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
