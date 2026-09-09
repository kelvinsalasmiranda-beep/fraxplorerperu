'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import Reveal, { StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';

export default function Features() {
  const { t } = useLanguage();
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-32">
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal className="text-center mb-16">
          <SectionBadge>{t.featuresUi.badge}</SectionBadge>
          <h2 className="section-title mt-4">{t.featuresUi.title}</h2>
          <p className="section-subtitle">{t.featuresUi.subtitle}</p>
        </Reveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.features.map((feature, i) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ y: -8, rotateX: 2 }}
                className="group relative h-full rounded-3xl bg-white p-8 shadow-lg shadow-brand-dark/5 border border-gray-100 overflow-hidden card-hover"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-accent/10 to-transparent rounded-bl-full transition-all group-hover:w-40 group-hover:h-40" />
                <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-teal/10 to-brand-accent/5 group-hover:scale-110 transition-transform duration-500">
                  <Image src={feature.icon} alt={feature.title} width={64} height={64} className="object-contain" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent/60">
                  0{i + 1}
                </span>
                <h3 className="mt-2 mb-3 font-heading text-xl font-bold text-brand-dark group-hover:text-brand-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
