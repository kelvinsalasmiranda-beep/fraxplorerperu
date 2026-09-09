'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import {
  ACCEPT_ALL,
  OPEN_SETTINGS_EVENT,
  OPTIONAL_CATEGORIES,
  REJECT_ALL,
  readConsent,
  saveConsent,
  type CookiePreferences,
  type OptionalCategory,
} from '@/lib/cookie-consent';

function CookieIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="15" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  locked = false,
}: {
  checked: boolean;
  onChange?: (next: boolean) => void;
  label: string;
  locked?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={locked}
      onClick={() => onChange?.(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 ${
        checked ? 'bg-brand-teal' : 'bg-gray-300'
      } ${locked ? 'cursor-not-allowed opacity-60' : ''}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? 'left-[1.375rem]' : 'left-0.5'
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const { t } = useLanguage();
  const c = t.cookies;
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [decided, setDecided] = useState(true);
  const [preferences, setPreferences] = useState<CookiePreferences>(REJECT_ALL);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setPreferences(stored.preferences);
      return;
    }
    setDecided(false);
    // Pequeño retraso para no competir con la carga de la portada.
    const timer = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onOpenSettings = () => {
      setPreferences(readConsent()?.preferences ?? REJECT_ALL);
      setShowDetails(true);
      setOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
  }, []);

  const commit = useCallback((next: CookiePreferences) => {
    saveConsent(next);
    setPreferences(next);
    setDecided(true);
    setOpen(false);
    setShowDetails(false);
  }, []);

  const categories: { id: OptionalCategory | 'necessary'; locked: boolean }[] = [
    { id: 'necessary', locked: true },
    ...OPTIONAL_CATEGORIES.map((id) => ({ id, locked: false })),
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          className="fixed inset-x-3 bottom-[6.5rem] z-[60] sm:inset-x-0 sm:bottom-6 sm:mx-auto sm:max-w-2xl"
        >
          <div className="overflow-hidden rounded-3xl glass shadow-2xl shadow-brand-dark/25">
            <div className="h-1 bg-gradient-to-r from-brand-teal via-brand-accent to-brand-gold" />

            <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-teal/10 text-brand-teal sm:flex">
                  <CookieIcon />
                </span>
                <div className="min-w-0 flex-1">
                  <h2
                    id="cookie-consent-title"
                    className="font-heading text-base font-bold uppercase tracking-wide text-brand-dark sm:text-lg"
                  >
                    {c.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{c.description}</p>
                  <Link
                    href="/politicas-privacidad/"
                    className="mt-2 inline-block text-sm font-medium text-brand-accent underline underline-offset-4 hover:text-brand-teal"
                  >
                    {c.policyLink}
                  </Link>
                </div>
                {decided && (
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={c.close}
                    className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-gray-400 transition hover:bg-black/5 hover:text-brand-dark"
                  >
                    ✕
                  </button>
                )}
              </div>

              <AnimatePresence initial={false}>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-5 space-y-2.5">
                      {categories.map(({ id, locked }) => (
                        <li
                          key={id}
                          className="flex items-start gap-4 rounded-2xl border border-brand-teal/10 bg-white/70 px-4 py-3"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <strong className="text-sm font-bold text-brand-dark">{c[id].title}</strong>
                              {locked && (
                                <span className="rounded-full bg-brand-teal/10 px-2 py-0.5 text-[11px] font-medium text-brand-teal">
                                  {c.alwaysOn}
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-gray-600">{c[id].description}</p>
                          </div>
                          <Toggle
                            label={c[id].title}
                            locked={locked}
                            checked={locked || preferences[id as OptionalCategory]}
                            onChange={
                              locked
                                ? undefined
                                : (next) =>
                                    setPreferences((prev) => ({ ...prev, [id as OptionalCategory]: next }))
                            }
                          />
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
                <button
                  type="button"
                  onClick={() => commit(ACCEPT_ALL)}
                  className="rounded-xl bg-brand-teal px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-brand-teal/25 transition hover:bg-brand-accent"
                >
                  {c.acceptAll}
                </button>
                <button
                  type="button"
                  onClick={() => commit(REJECT_ALL)}
                  className="rounded-xl border-2 border-brand-teal/25 px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-teal transition hover:border-brand-teal hover:bg-brand-teal/5"
                >
                  {c.rejectAll}
                </button>
                {showDetails ? (
                  <button
                    type="button"
                    onClick={() => commit(preferences)}
                    className="rounded-xl border-2 border-brand-teal/25 px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-teal transition hover:border-brand-teal hover:bg-brand-teal/5"
                  >
                    {c.save}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowDetails(true)}
                    className="text-sm font-medium text-gray-500 underline underline-offset-4 transition hover:text-brand-teal sm:ml-auto"
                  >
                    {c.customize}
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
