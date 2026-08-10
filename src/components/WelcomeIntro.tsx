'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO = '/images/cropped-FRAXPLORER-scaled-1-1024x620.png';
const STORAGE_KEY = 'fraxplorer-intro-seen';

type Phase = 'logo' | 'plane' | 'welcome' | 'exit';

function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
      <path d="M62 32c0 1.1-.9 2-2 2H44.5l-8.2 14.2c-.4.7-1.2 1.1-2 1.1-.3 0-.6-.1-.9-.2l-4.4-2.2c-.9-.5-1.3-1.6-.9-2.6L32 38 18.8 44.3c-1 .5-2.2.1-2.7-.9l-2.2-4.4c-.5-1-.1-2.2.9-2.7L27.5 32 14.8 25.7c-1-.5-1.4-1.7-.9-2.7l2.2-4.4c.5-1 1.7-1.4 2.7-.9L32 26l3.5-6.1c.4-.9 1.4-1.4 2.4-1.1l4.4 1.5c1.1.4 1.6 1.6 1.2 2.7L34 28.5 44.5 30H60c1.1 0 2 .9 2 2z" />
    </svg>
  );
}

export default function WelcomeIntro({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<Phase>('logo');
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timers = [
      setTimeout(() => setPhase('plane'), 900),
      setTimeout(() => setPhase('welcome'), 2400),
      setTimeout(() => setVisible(false), 4200),
      setTimeout(() => {
        document.body.style.overflow = '';
        sessionStorage.setItem(STORAGE_KEY, '1');
        onComplete();
      }, 5000),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-brand-dark via-brand-teal to-brand-accent"
        >
          <div className="absolute inset-0 noise-bg opacity-30" />
          <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-float" style={{ animationDelay: '1s' }} />

          {/* Logo pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: phase === 'logo' ? [1, 1.08, 1] : 1,
            }}
            transition={{
              opacity: { duration: 0.6 },
              scale: phase === 'logo' ? { repeat: Infinity, duration: 1.2 } : { duration: 0.3 },
            }}
            className="relative z-10 mb-8"
          >
            <div className="relative w-56 md:w-72 h-auto">
              <Image
                src={LOGO}
                alt="FraXplorer Perú"
                width={400}
                height={243}
                className="w-full h-auto drop-shadow-2xl"
                priority
              />
              {phase === 'logo' && (
                <motion.div
                  className="absolute inset-0 rounded-3xl border-2 border-brand-gold/50"
                  animate={{ scale: [1, 1.15, 1.3], opacity: [0.6, 0.3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                />
              )}
            </div>
          </motion.div>

          {/* Flying plane */}
          <motion.div
            initial={{ x: '-120vw', y: 20, opacity: 0, rotate: -8 }}
            animate={
              phase !== 'logo'
                ? { x: '120vw', y: -30, opacity: phase === 'welcome' ? 0.3 : 1, rotate: -12 }
                : { x: '-120vw', opacity: 0 }
            }
            transition={
              phase !== 'logo'
                ? { duration: 1.4, ease: [0.22, 0.5, 0.2, 1] }
                : { duration: 0 }
            }
            className="absolute top-1/3 left-0 z-20 pointer-events-none"
          >
            <div className="flex items-center gap-1 text-brand-gold drop-shadow-lg">
              <PlaneIcon className="w-12 h-12 md:w-16 md:h-16 -rotate-12" />
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={phase === 'plane' ? { opacity: 1, width: 'auto' } : {}}
                className="hidden md:block text-xs font-bold uppercase tracking-[0.3em] text-white/80 whitespace-nowrap"
              >
                FraXplorer
              </motion.span>
            </div>
            {/* Contrail */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={phase === 'plane' ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2 }}
              className="absolute top-1/2 -left-32 w-32 h-0.5 bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent origin-right"
            />
          </motion.div>

          {/* Welcome text */}
          <AnimatePresence>
            {(phase === 'welcome') && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 text-center px-6 mt-4"
              >
                <p className="text-brand-gold text-sm md:text-base uppercase tracking-[0.35em] mb-3 font-semibold">
                  Bienvenido a
                </p>
                <h1 className="font-heading text-4xl md:text-6xl font-black text-white leading-tight">
                  Fra<span className="text-brand-gold">X</span>plorer
                  <span className="block text-2xl md:text-3xl font-bold text-white/80 mt-2">Perú</span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-4 text-white/60 text-sm md:text-base"
                >
                  Cruza fronteras · Rompe rutinas
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading bar */}
          <motion.div
            className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 h-1 rounded-full bg-white/10 overflow-hidden"
          >
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 4.8, ease: 'linear' }}
              className="h-full rounded-full bg-gradient-to-r from-brand-gold to-brand-accent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function useWelcomeIntro() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      if (seen) setShowIntro(false);
    } catch {
      setShowIntro(false);
    }
  }, []);

  return { showIntro, dismissIntro: () => setShowIntro(false) };
}
