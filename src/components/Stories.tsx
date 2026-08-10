'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Reveal from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';
import MagneticButton from '@/components/ui/MagneticButton';
import { CONTACT } from '@/data/site';

export default function Stories() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section ref={ref} className="py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal direction="left">
            <SectionBadge>Historias que abrazan</SectionBadge>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-dark mt-4 mb-6 leading-tight">
              Explora Más Que Lugares,{' '}
              <span className="text-brand-accent">Vive Historias</span>
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4 text-lg">
              Explora más que lugares… <strong className="text-brand-dark">encuéntrate en cada destino.</strong>{' '}
              Déjate llevar por la calma de los paisajes, la calidez de las personas y la magia del Perú profundo.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Viaja a tu ritmo, con el corazón abierto y los sentidos despiertos.{' '}
              <strong className="text-brand-dark">FraXplorer Perú, donde cada viaje es una historia que te abraza.</strong>
            </p>
            <MagneticButton href={`https://wa.me/${CONTACT.whatsapp1}`} className="btn-primary">
              Empieza tu aventura →
            </MagneticButton>
          </Reveal>

          <Reveal direction="right" delay={0.2}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand-accent/20 to-brand-gold/20 blur-2xl" />
              <div className="relative h-[450px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-2xl">
                <motion.div className="absolute inset-0" style={{ y: imageY }}>
                  <Image
                    src="/images/pexels-joanavittoria-2193392-scaled.jpg"
                    alt="Paisaje del Perú"
                    fill
                    className="object-cover scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-4">
                  <p className="text-white text-sm font-medium">Perú profundo · Cusco · Andes</p>
                  <p className="text-white/60 text-xs mt-1">Experiencias auténticas todo el año</p>
                </div>
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 glass rounded-2xl p-5 shadow-xl"
              >
                <p className="text-3xl font-black text-brand-accent">500+</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Viajeros felices</p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
