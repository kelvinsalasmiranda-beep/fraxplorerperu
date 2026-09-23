'use client';

import { FormEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CONTACT, HERO_VIDEO } from '@/data/site';
import { useLanguage } from '@/context/LanguageContext';
import { bookingWhatsAppText, openWhatsApp } from '@/lib/whatsapp';

export default function Hero() {
  const { t, locale } = useLanguage();
  const search = t.hero.search;
  const [destination, setDestination] = useState(search.destinations[0].value);
  const [tourType, setTourType] = useState(search.types[0].value);
  const [duration, setDuration] = useState(search.durations[0].value);

  useEffect(() => {
    setDestination(t.hero.search.destinations[0].value);
    setTourType(t.hero.search.types[0].value);
    setDuration(t.hero.search.durations[0].value);
  }, [locale, t.hero.search]);

  function sendToWhatsApp(nextDestination = destination) {
    const text = bookingWhatsAppText(search.whatsappIntro, search.whatsappAsk, [
      { label: search.destinationLabel, value: nextDestination },
      { label: search.typeLabel, value: tourType },
      { label: search.durationLabel, value: duration },
    ]);
    openWhatsApp(text);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    sendToWhatsApp();
  }

  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-[#007a86]">
      <Image
        src="/images/web/machupicchu-hq-6.jpg"
        alt="Machu Picchu"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/images/web/machupicchu-hq-6.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-[#14b8c9]/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#006372]/35 via-transparent to-[#006372]/45" />

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-6xl flex-col justify-center px-4 pb-16 pt-28 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90 sm:px-4 sm:text-xs"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          {t.hero.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center font-heading text-[clamp(2rem,8vw,4.6rem)] font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,45,51,0.45)]"
        >
          {t.hero.line1}
          <span className="mt-1 block text-[#f3e6c8]">{t.hero.line2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-5 max-w-2xl text-center text-sm text-white/80 sm:text-base md:text-lg"
        >
          {t.hero.subtitleLong}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-white/85 sm:text-sm"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="text-amber-300">★★★★★</span>
            {search.travelers}
          </span>
          <span>{search.rucLabel}</span>
          <span>{search.safeTravels}</span>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-auto mt-8 w-full max-w-5xl rounded-[28px] bg-white p-4 shadow-2xl sm:p-5"
        >
          <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_1fr_auto]">
            <label className="block text-left">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {search.destinationLabel}
              </span>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-brand-dark outline-none focus:border-brand-accent"
              >
                {search.destinations.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-left">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {search.typeLabel}
              </span>
              <select
                value={tourType}
                onChange={(e) => setTourType(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-brand-dark outline-none focus:border-brand-accent"
              >
                {search.types.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-left">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                {search.durationLabel}
              </span>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-brand-dark outline-none focus:border-brand-accent"
              >
                {search.durations.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#c1121f] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/20 transition hover:bg-[#a40e19] md:mt-[22px]"
            >
              {search.submit}
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              {search.suggestedLabel}
            </span>
            {search.suggested.map((route) => (
              <button
                key={route}
                type="button"
                onClick={() => {
                  setDestination(route);
                  sendToWhatsApp(route);
                }}
                className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-brand-accent hover:text-white"
              >
                {route}
              </button>
            ))}
          </div>
        </motion.form>

        <p className="mt-4 text-center text-[11px] text-white/55">
          {t.hero.cta} · WhatsApp {CONTACT.whatsapp1.replace(/^51/, '+51 ')}
        </p>
      </div>
    </section>
  );
}
