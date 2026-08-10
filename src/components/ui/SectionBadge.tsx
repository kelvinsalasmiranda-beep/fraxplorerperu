'use client';

import { motion } from 'framer-motion';

export default function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-brand-accent/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent backdrop-blur-sm"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
      {children}
    </motion.span>
  );
}
