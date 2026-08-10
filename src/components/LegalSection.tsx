'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';

export default function LegalSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-teal/5 to-brand-accent/5" />
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <Reveal>
          <SectionBadge>Respaldo legal</SectionBadge>
          <h2 className="section-title mt-4">Nuestras Licencias y Respaldo Legal</h2>
          <p className="text-gray-500 leading-relaxed mb-12 text-lg max-w-2xl mx-auto">
            En <strong className="text-brand-dark">Fraxplorer Perú</strong> operamos con todas las licencias exigidas por el Estado
            Peruano. Registrados en <strong>MINCETUR</strong>, RUC activo, licencia municipal y protocolos avalados por el{' '}
            <strong>sello Safe Travels</strong>.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <motion.div whileHover={{ scale: 1.05, rotate: 1 }} className="glass rounded-3xl p-6 shadow-lg">
              <Image src="/images/WTTC_sello_seguro-1024x569.jpg" alt="Safe Travels WTTC" width={200} height={111} className="rounded-lg" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, rotate: -1 }} className="glass rounded-3xl p-6 shadow-lg">
              <Image src="/images/protegeme-turismo-responsable.webp" alt="Turismo Responsable" width={120} height={170} />
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
