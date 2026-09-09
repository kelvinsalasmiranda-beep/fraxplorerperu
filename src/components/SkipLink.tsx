'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function SkipLink() {
  const { t } = useLanguage();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white"
    >
      {t.skipLink}
    </a>
  );
}
