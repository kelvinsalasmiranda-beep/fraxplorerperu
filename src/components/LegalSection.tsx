'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';
import { useLanguage } from '@/context/LanguageContext';

export default function LegalSection() {
  const { t } = useLanguage();
  const legal = t.legal;

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-brand-accent/5" />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <Reveal>
          <SectionBadge>{legal.badge}</SectionBadge>
          <h2 className="section-title mt-4">{legal.title}</h2>
          <p className="text-gray-500 leading-relaxed mb-12 text-lg max-w-2xl mx-auto">
            {legal.body}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-8">
            <motion.div whileHover={{ scale: 1.05, rotate: 1 }} className="glass flex h-36 w-[200px] items-center justify-center rounded-3xl p-5 shadow-lg">
              <Image src="/images/mincetur-comercio-exterior.png" alt={legal.minceturAlt} width={200} height={40} className="h-auto w-full object-contain" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, rotate: -1 }} className="glass flex h-36 w-[200px] items-center justify-center rounded-3xl p-5 shadow-lg">
              <Image src="/images/municipalidad-cusco-escudo.png" alt={legal.municipalityAlt} width={120} height={120} className="h-[110px] w-auto object-contain" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, rotate: 1 }} className="glass flex h-36 w-[200px] items-center justify-center rounded-3xl p-5 shadow-lg">
              <Image src="/images/WTTC_sello_seguro-1024x569.jpg" alt={legal.safeTravelsAlt} width={180} height={100} className="h-auto w-full rounded-lg object-contain" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, rotate: -1 }} className="glass flex h-36 w-[200px] items-center justify-center rounded-3xl p-5 shadow-lg">
              <Image src="/images/protegeme-turismo-responsable.webp" alt={legal.responsibleAlt} width={90} height={128} className="h-[110px] w-auto object-contain" />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
