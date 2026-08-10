'use client';

import { motion } from 'framer-motion';
import Reveal from '@/components/ui/Reveal';

export default function QuoteBanner() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-brand-dark" />
      <div className="absolute inset-0 gradient-mesh opacity-40" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      <Reveal className="relative mx-auto max-w-4xl px-4 text-center">
        <motion.blockquote
          initial={{ scale: 0.95 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-3xl md:text-4xl lg:text-5xl italic text-white leading-snug">
            &ldquo;El mundo es demasiado grande para quedarse en un solo lugar, y la vida demasiado corta para no explorarlo.&rdquo;
          </p>
          <footer className="mt-8 text-brand-gold text-sm uppercase tracking-[0.3em] font-semibold">
            — FraXplorer Perú
          </footer>
        </motion.blockquote>
      </Reveal>
    </section>
  );
}
