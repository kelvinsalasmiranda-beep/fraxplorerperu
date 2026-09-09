'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';
import MagneticButton from '@/components/ui/MagneticButton';
import { CONTACT } from '@/data/site';
import { useLanguage } from '@/context/LanguageContext';

export default function Stories() {
  const { t } = useLanguage();
  const s = t.stories;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={ref} className="py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal direction="left">
            <SectionBadge>{s.badge}</SectionBadge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-dark mt-4 mb-6 leading-tight">
              {s.title}{' '}
              <span className="text-brand-accent">{s.titleHighlight}</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4 text-lg">
              {s.p1} <strong className="text-brand-dark">{s.p1Bold}</strong>{' '}
              {s.p1Rest}
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              {s.p2}{' '}
              <strong className="text-brand-dark">{s.p2Bold}</strong>
            </p>
            <MagneticButton href={`https://wa.me/${CONTACT.whatsapp1}`} className="btn-primary">
              {s.cta}
            </MagneticButton>
          </Reveal>

          <Reveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-accent/20 to-brand-gold/20 blur-2xl" />
              <div className="relative h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl">
                <motion.div className="absolute inset-0" style={{ y: imageY }}>
                  <Image
                    src="/images/pexels-joanavittoria-2193392-scaled.jpg"
                    alt={s.imageAlt}
                    fill
                    className="object-cover scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4">
                  <p className="text-white text-sm font-medium">{s.cardLine1}</p>
                  <p className="text-white/60 text-xs mt-1">{s.cardLine2}</p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 shadow-xl"
              >
                <p className="text-3xl font-black text-brand-accent">500+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{s.statLabel}</p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
