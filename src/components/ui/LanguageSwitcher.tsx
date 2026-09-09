'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import type { Locale } from '@/i18n';

const FLAGS: Record<Locale, string> = { es: '🇵🇪', en: '🇺🇸' };

export default function LanguageSwitcher({ compact }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`relative flex items-center rounded-full p-0.5 bg-brand-dark/5 border border-brand-accent/15 ${
        compact ? 'scale-90' : ''
      }`}
      role="group"
      aria-label="Language"
    >
      {(['es', 'en'] as Locale[]).map((lang) => {
        const active = locale === lang;
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLocale(lang)}
            className={`relative z-10 flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
              active ? 'text-white' : 'text-brand-dark/60 hover:text-brand-accent'
            }`}
            aria-pressed={active}
          >
            <span className="text-sm leading-none">{FLAGS[lang]}</span>
            {lang}
          </button>
        );
      })}
      <motion.div
        layoutId="lang-pill"
        className="absolute top-0.5 bottom-0.5 rounded-full bg-gradient-to-r from-brand-teal to-brand-accent shadow-md"
        style={{
          left: locale === 'es' ? '2px' : '50%',
          width: 'calc(50% - 2px)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </div>
  );
}
