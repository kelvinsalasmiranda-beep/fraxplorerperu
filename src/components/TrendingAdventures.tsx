'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Reveal, { StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';
import { useLanguage } from '@/context/LanguageContext';

export default function TrendingAdventures() {
  const { t } = useLanguage();
  const ui = t.trendingUi;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal className="text-center mb-16">
          <SectionBadge>{ui.badge}</SectionBadge>
          <h2 className="section-title mt-4">{t.sections.trending}</h2>
          <p className="section-subtitle">{t.sections.trendingSub}</p>
        </Reveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.trending.map((item, i) => (
            <StaggerItem key={item.href}>
              <motion.a
                href={item.href}
                whileHover={{ y: -10 }}
                className="group block overflow-hidden rounded-3xl bg-white shadow-lg shadow-brand-dark/5 border border-gray-100 card-hover"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
                  <div className="absolute top-4 left-4 rounded-full bg-brand-gold/90 px-3 py-1 text-[10px] font-bold uppercase text-brand-dark">
                    #{i + 1} {ui.trendingLabel}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-heading text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-xs text-brand-gold font-medium">{ui.idealPrefix} {item.ideal}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{item.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-bold text-brand-accent group-hover:gap-2 transition-all">
                    {t.common.readMore} <span>→</span>
                  </span>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
