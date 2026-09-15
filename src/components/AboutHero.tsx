'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CONTACT } from '@/data/site';
import { ABOUT_HERO, ABOUT_GALLERY } from '@/data/about';
import { useLanguage } from '@/context/LanguageContext';
import MagneticButton from '@/components/ui/MagneticButton';
import Reveal from '@/components/ui/Reveal';

export default function AboutHero() {
  const { t, locale } = useLanguage();
  const lang = locale === 'en' ? 'en' : 'es';
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <>
      <section ref={ref} className="relative h-[42vh] min-h-[280px] overflow-hidden bg-brand-dark md:h-[52vh]">
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image
            src={ABOUT_HERO}
            alt={t.about.heroAlt}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-4 pb-10 md:pb-14">
          <div className="mx-auto max-w-7xl">
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">{t.about.badge}</p>
            <h1 className="font-heading text-3xl font-black text-white md:text-5xl">
              {t.about.title1} {t.about.title2}
            </h1>
            <p className="mt-3 max-w-2xl text-white/85 md:text-lg">{t.about.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left">
              <h2 className="font-heading text-3xl font-bold text-brand-dark md:text-4xl">{t.about.heading}</h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                <strong className="text-brand-dark">{CONTACT.company}</strong> {t.about.p1}
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">{t.about.p2}</p>
              <p className="mt-4 leading-relaxed text-gray-600">{t.about.p3}</p>

              <div className="mt-8 space-y-4">
                {t.about.sections.map((block) => (
                  <div key={block.title} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                    <h3 className="font-heading text-lg font-bold text-brand-dark">{block.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">{block.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {ABOUT_GALLERY.map((img, i) => (
                  <div
                    key={img.src}
                    className={`relative overflow-hidden rounded-2xl bg-gray-100 shadow-md ring-1 ring-black/5 ${
                      i === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-[4/5]'
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt[lang]}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                      sizes={i === 0 ? '720px' : '360px'}
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-3 pb-3 pt-8 text-sm font-semibold text-white">
                      {img.label[lang]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-gray-400">
                {t.about.galleryNote}{' '}
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-brand-accent hover:underline"
                >
                  {t.about.followFb}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

export function AboutCTA() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden bg-brand-dark py-20">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <Reveal className="relative px-4 text-center">
        <h2 className="mb-6 font-heading text-3xl font-bold text-white md:text-4xl">{t.about.ctaTitle}</h2>
        <MagneticButton href={`https://wa.me/${CONTACT.whatsapp1}`} className="btn-gold">
          {t.about.ctaBtn}
        </MagneticButton>
        <p className="mt-6">
          <Link href="/" className="text-sm text-brand-gold hover:underline">
            {t.about.backHome}
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
