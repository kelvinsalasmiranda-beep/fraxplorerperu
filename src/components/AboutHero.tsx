'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CONTACT } from '@/data/site';
import { ABOUT_HERO, ABOUT_GALLERY, ABOUT_SECTIONS } from '@/data/about';
import MagneticButton from '@/components/ui/MagneticButton';
import Reveal from '@/components/ui/Reveal';

export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <>
      {/* Portada oficial Facebook — banner completo */}
      <section ref={ref} className="relative w-full aspect-[960/365] overflow-hidden bg-brand-dark">
        <motion.div className="absolute inset-0" style={{ y }}>
          <Image
            src={ABOUT_HERO}
            alt="Descubre la magia del Perú — FraXplorer Perú"
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </motion.div>
      </section>

      <section className="bg-brand-teal py-14 md:py-16">
        <Reveal>
          <h2 className="text-center font-heading text-3xl md:text-5xl font-black text-white px-4">
            Así nace la aventura: Sobre nosotros
          </h2>
        </Reveal>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-start gap-14 lg:grid-cols-2">
            <Reveal direction="left">
              <h3 className="font-heading text-3xl font-bold text-brand-dark mb-6">
                Compartimos la belleza del Perú
              </h3>
              <p className="text-gray-500 leading-relaxed mb-4 text-lg">
                <strong className="text-brand-dark">{CONTACT.company}</strong> se creó para compartir la belleza y
                cultura del Perú, ofreciendo experiencias auténticas que conectan a cada viajero con la esencia de
                nuestro país.
              </p>
              <p className="text-gray-500 leading-relaxed mb-4">
                Operamos con licencia MINCETUR, RUC {CONTACT.ruc}, y protocolos de bioseguridad avalados por el sello
                Safe Travels.
              </p>
              <p className="text-gray-500 leading-relaxed">
                Desde Cusco hasta Ica, desde Machu Picchu hasta la Montaña de Colores — diseñamos cada tour pensando
                en ti.
              </p>

              <div className="mt-8 space-y-5">
                {ABOUT_SECTIONS.map((block) => (
                  <div key={block.title} className="rounded-2xl border border-brand-accent/15 bg-brand-teal/5 p-5">
                    <h4 className="font-heading font-bold text-brand-dark mb-2">{block.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{block.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <div className="grid grid-cols-2 gap-3">
                {ABOUT_GALLERY.map((img, i) => (
                  <div
                    key={img.src}
                    className={`relative overflow-hidden rounded-2xl shadow-lg ${
                      i === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'
                    }`}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover hover:scale-105 transition duration-500" sizes="400px" />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-gray-400">
                Fotos reales de FraXplorer Perú ·{' '}
                <a
                  href={CONTACT.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-accent hover:underline"
                >
                  Síguenos en Facebook
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
  return (
    <section className="py-20 bg-brand-dark relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      <Reveal className="relative text-center px-4">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6">
          ¿Listo para tu próxima aventura?
        </h2>
        <MagneticButton href={`https://wa.me/${CONTACT.whatsapp1}`} className="btn-gold">
          Escríbenos por WhatsApp
        </MagneticButton>
        <p className="mt-6">
          <Link href="/" className="text-brand-gold hover:underline text-sm">
            ← Volver al inicio
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
