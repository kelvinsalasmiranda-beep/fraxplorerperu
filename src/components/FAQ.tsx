'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQ as FAQ_ITEMS } from '@/data/site';
import Reveal from '@/components/ui/Reveal';
import SectionBadge from '@/components/ui/SectionBadge';

function LlamaMascot({ speaking }: { speaking: boolean }) {
  return (
    <motion.div
      className="relative mx-auto w-[200px] sm:w-[240px] md:w-[280px]"
      animate={{
        y: speaking ? [0, -6, 0] : [0, -10, 0],
        rotate: speaking ? [-1, 1, -1] : [0, 0.5, 0],
      }}
      transition={{
        duration: speaking ? 0.6 : 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="absolute -inset-4 rounded-full bg-brand-accent/10 blur-2xl" aria-hidden="true" />
      <Image
        src="/images/llama-mascot.png"
        alt="Llamita guía de FraXplorer"
        width={280}
        height={320}
        className="relative z-10 w-full h-auto drop-shadow-lg"
        priority={false}
      />
      {speaking && (
        <motion.span
          className="absolute -right-1 top-8 flex gap-1"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-brand-accent"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
            />
          ))}
        </motion.span>
      )}
    </motion.div>
  );
}

function SpeechBubble({
  question,
  answer,
  isOpen,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  index: number;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${index}-${isOpen ? 'open' : 'closed'}`}
        initial={{ opacity: 0, y: 12, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-2xl bg-white px-5 py-4 shadow-lg ring-1 ring-brand-accent/15"
      >
        <div
          className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-white ring-1 ring-brand-accent/15 md:left-8 md:translate-x-0"
          aria-hidden="true"
        />
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent mb-2">
          {isOpen ? 'Te cuento…' : '¿Te preguntas…?'}
        </p>
        <p className="font-semibold text-brand-dark text-sm md:text-base leading-snug">
          {isOpen ? answer : question}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);
  const [speaking, setSpeaking] = useState(false);

  const pulseSpeak = useCallback(() => {
    setSpeaking(true);
    setTimeout(() => setSpeaking(false), 900);
  }, []);

  const selectQuestion = useCallback(
    (i: number) => {
      setOpenIndex(i);
      pulseSpeak();
    },
    [pulseSpeak]
  );

  const toggleQuestion = useCallback(
    (i: number) => {
      setOpenIndex((prev) => {
        const next = prev === i ? prev : i;
        return next;
      });
      pulseSpeak();
    },
    [pulseSpeak]
  );

  // Intro automática al entrar en vista
  useEffect(() => {
    const t = setTimeout(() => {
      setSpeaking(true);
      setTimeout(() => setSpeaking(false), 1200);
    }, 600);
    return () => clearTimeout(t);
  }, []);

  const active = FAQ_ITEMS[openIndex];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white via-[#f4fafb] to-white overflow-hidden">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="text-center mb-12 md:mb-16">
          <SectionBadge>FAQ</SectionBadge>
          <h2 className="section-title mt-4">Preguntas Frecuentes</h2>
          <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">
            Nuestra llamita te guía — toca una pregunta y te responde al instante
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[minmax(260px,320px)_1fr] lg:gap-14 items-start">
          {/* Llamita + burbuja */}
          <Reveal className="lg:sticky lg:top-28 flex flex-col items-center gap-5">
            <LlamaMascot speaking={speaking} />
            <div className="w-full max-w-sm">
              <SpeechBubble
                question={active.question}
                answer={active.answer}
                isOpen={true}
                index={openIndex}
              />
            </div>

            {/* Chips rápidos */}
            <div className="flex flex-wrap justify-center gap-2 w-full max-w-sm">
              {FAQ_ITEMS.slice(0, 4).map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => selectQuestion(i)}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-medium transition-all ${
                    openIndex === i
                      ? 'bg-brand-accent text-white shadow-md'
                      : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-brand-accent/40'
                  }`}
                >
                  {item.question.replace('¿', '').replace('?', '').slice(0, 28)}
                  {item.question.length > 30 ? '…' : ''}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Acordeón */}
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                  openIndex === i
                    ? 'border-brand-accent/40 bg-white shadow-lg shadow-brand-accent/10'
                    : 'border-gray-200 bg-white/70 hover:border-brand-accent/25'
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left"
                  onClick={() => toggleQuestion(i)}
                  aria-expanded={openIndex === i}
                >
                  <span
                    className={`font-semibold transition-colors ${
                      openIndex === i ? 'text-brand-accent' : 'text-brand-dark'
                    }`}
                  >
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl font-light transition-colors ${
                      openIndex === i
                        ? 'bg-brand-accent text-white'
                        : 'bg-brand-accent/10 text-brand-accent'
                    }`}
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="border-t border-gray-100 px-5 py-4 md:px-6 md:py-5 text-gray-500 leading-relaxed text-sm md:text-base">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
