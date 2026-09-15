'use client';

import { motion } from 'framer-motion';

export default function LlamaMascot({ speaking, alt }: { speaking: boolean; alt: string }) {
  return (
    <motion.div
      className="relative mx-auto w-[220px] sm:w-[260px] md:w-[300px]"
      animate={{ y: speaking ? [0, -10, 0, -6, 0] : [0, -8, 0] }}
      transition={{ duration: speaking ? 0.65 : 2.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="absolute -inset-8 rounded-full bg-brand-accent/20 blur-3xl" aria-hidden="true" />
      <svg viewBox="0 0 240 280" className="relative z-10 w-full drop-shadow-2xl" role="img" aria-label={alt}>
        <defs>
          <linearGradient id="llama-wool" x1="40" y1="20" x2="180" y2="240">
            <stop offset="0%" stopColor="#fffdf8" />
            <stop offset="55%" stopColor="#f3e4cf" />
            <stop offset="100%" stopColor="#e2c8a6" />
          </linearGradient>
          <linearGradient id="llama-scarf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#14b8c9" />
            <stop offset="100%" stopColor="#006372" />
          </linearGradient>
        </defs>

        <ellipse cx="120" cy="268" rx="62" ry="9" fill="#006372" opacity="0.18" />

        <motion.path
          d="M178 186c22 8 34 28 26 42-12 6-26-4-34-20-6-12-4-20 8-22z"
          fill="url(#llama-wool)"
          stroke="#3b2d20"
          strokeWidth="2.4"
          animate={{ rotate: speaking ? [10, -12, 10] : [5, -7, 5] }}
          transition={{ duration: speaking ? 0.4 : 1.7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '178px 186px' }}
        />

        <ellipse cx="120" cy="196" rx="54" ry="58" fill="url(#llama-wool)" stroke="#3b2d20" strokeWidth="2.6" />
        <path d="M78 236c-4 14 2 24 14 26h16c-6-10-8-20-6-28z" fill="#d7b892" stroke="#3b2d20" strokeWidth="2.2" />
        <path d="M132 234c4 14-2 24-14 26h-12c6-10 8-20 6-28z" fill="#d7b892" stroke="#3b2d20" strokeWidth="2.2" />

        <motion.g
          animate={{ rotate: speaking ? [-5, 6, -5] : [-2, 2, -2] }}
          transition={{ duration: speaking ? 0.38 : 2.1, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '120px 128px' }}
        >
          <path d="M88 128c-4 16 0 28 10 34h44c10-6 14-18 10-34z" fill="url(#llama-scarf)" />
          <path d="M142 154c14 10 16 26 4 32-12 2-20-10-22-22" fill="#fcd420" />
          <path d="M92 156c-12 12-8 26 6 28 8-6 10-16 8-24" fill="#fcd420" />
        </motion.g>

        <motion.g
          animate={{ rotate: speaking ? [-4, 5, -4] : [-1.2, 1.2, -1.2] }}
          transition={{ duration: speaking ? 0.32 : 2.3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '120px 96px' }}
        >
          <motion.g
            animate={{ rotate: [10, -8, 10] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '82px 42px' }}
          >
            <path d="M94 82c-16-34-6-52 14-54 6 10 8 28 2 48z" fill="url(#llama-wool)" stroke="#3b2d20" strokeWidth="2.4" />
            <circle cx="102" cy="40" r="5" fill="#fcd420" />
          </motion.g>
          <motion.g
            animate={{ rotate: [-10, 8, -10] }}
            transition={{ duration: 1.55, repeat: Infinity, ease: 'easeInOut', delay: 0.12 }}
            style={{ transformOrigin: '158px 42px' }}
          >
            <path d="M146 82c16-34 6-52-14-54-6 10-8 28-2 48z" fill="url(#llama-wool)" stroke="#3b2d20" strokeWidth="2.4" />
            <circle cx="138" cy="40" r="5" fill="#fcd420" />
          </motion.g>

          <ellipse cx="120" cy="92" rx="46" ry="42" fill="url(#llama-wool)" stroke="#3b2d20" strokeWidth="2.6" />
          <path d="M92 62c12-14 44-14 56 0" fill="none" stroke="#e8d2b4" strokeWidth="8" strokeLinecap="round" />

          <motion.g
            animate={{ scaleY: [1, 1, 1, 0.1, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.7, 0.84, 0.89, 1] }}
            style={{ transformOrigin: '100px 88px' }}
          >
            <ellipse cx="100" cy="88" rx="8" ry="10" fill="#1b1410" />
            <circle cx="103" cy="85" r="2.4" fill="#fff" />
          </motion.g>
          <motion.g
            animate={{ scaleY: [1, 1, 1, 0.1, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.7, 0.84, 0.89, 1], delay: 0.05 }}
            style={{ transformOrigin: '140px 88px' }}
          >
            <ellipse cx="140" cy="88" rx="8" ry="10" fill="#1b1410" />
            <circle cx="143" cy="85" r="2.4" fill="#fff" />
          </motion.g>

          <ellipse cx="96" cy="104" rx="9" ry="5" fill="#f5b7ac" opacity="0.9" />
          <ellipse cx="144" cy="104" rx="9" ry="5" fill="#f5b7ac" opacity="0.9" />

          <ellipse cx="120" cy="110" rx="18" ry="13" fill="#f6ead8" stroke="#3b2d20" strokeWidth="1.8" />
          <ellipse cx="113" cy="108" rx="2.6" ry="3.1" fill="#3b2d20" />
          <ellipse cx="127" cy="108" rx="2.6" ry="3.1" fill="#3b2d20" />

          <motion.ellipse
            cx="120"
            cy="118"
            rx={speaking ? 8 : 6}
            fill="#3b2d20"
            animate={speaking ? { ry: [1.8, 6, 2.2, 6, 1.8] } : { ry: 1.8 }}
            transition={{ duration: 0.38, repeat: speaking ? Infinity : 0 }}
          />
        </motion.g>

        {speaking &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              cx="186"
              cy="74"
              r="4"
              fill="#008ca1"
              animate={{ x: [0, 20], y: [-4 - i * 8, -14 - i * 10], opacity: [1, 0], scale: [0.5, 1.3] }}
              transition={{ duration: 0.65, repeat: Infinity, delay: i * 0.11 }}
            />
          ))}
      </svg>
    </motion.div>
  );
}
