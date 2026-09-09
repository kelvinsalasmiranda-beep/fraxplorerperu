'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function MarqueeBanner() {
  const { t } = useLanguage();
  const doubled = [...t.marquee, ...t.marquee];

  return (
    <div className="relative overflow-hidden bg-brand-teal py-4 border-y border-brand-accent/20">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
            {item}
            <span className="mx-8 text-brand-gold">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
