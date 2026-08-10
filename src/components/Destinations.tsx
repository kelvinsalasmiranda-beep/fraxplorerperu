'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { DESTINATIONS } from '@/data/site';
import Reveal, { StaggerContainer, StaggerItem } from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';

export default function Destinations() {
  return (
    <section className="py-24 md:py-32 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="relative mx-auto max-w-7xl px-4">
        <Reveal className="text-center mb-16">
          <SectionBadge>Destinos</SectionBadge>
          <h2 className="section-title !text-white mt-4">Destinos Sugeridos en Perú</h2>
          <p className="section-subtitle !text-white/60">
            Desde montañas arcoíris hasta valles sagrados — el Perú te espera con los brazos abiertos.
          </p>
        </Reveal>

        <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DESTINATIONS.map((dest, i) => (
            <StaggerItem key={dest.title}>
              <motion.a
                href={dest.href}
                whileHover={{ scale: 1.02 }}
                className={`group relative block overflow-hidden rounded-3xl shadow-2xl ${
                  i === 0 ? 'sm:col-span-2 sm:row-span-2 h-80 sm:h-[420px]' : 'h-64'
                }`}
              >
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  sizes={i === 0 ? '50vw' : '25vw'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent opacity-80 group-hover:opacity-90 transition" />
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-gold/30 rounded-3xl transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.div
                    initial={false}
                    className="transform transition-transform duration-300 group-hover:-translate-y-1"
                  >
                    <h3 className="font-heading text-xl font-bold text-white">{dest.title}</h3>
                    <p className="text-sm text-brand-gold mt-1">{dest.location}</p>
                    <span className="inline-flex items-center gap-1 mt-3 text-xs text-white/70 opacity-0 group-hover:opacity-100 transition-opacity">
                      Explorar →
                    </span>
                  </motion.div>
                </div>
              </motion.a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
