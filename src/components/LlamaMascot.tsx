'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LlamaMascot({ speaking, alt }: { speaking: boolean; alt: string }) {
  return (
    <motion.div
      className="relative mx-auto w-[200px] sm:w-[230px] md:w-[260px]"
      animate={{ y: speaking ? [0, -12, 0, -7, 0] : [0, -8, 0] }}
      transition={{ duration: speaking ? 0.7 : 2.8, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="absolute inset-x-8 bottom-2 h-16 rounded-full bg-brand-accent/20 blur-2xl" aria-hidden="true" />

      <motion.div
        className="relative z-10"
        animate={{
          rotate: speaking ? [-2.4, 2.4, -1.6, 2.2, -2.4] : [-1.2, 1.2, -1.2],
          scale: speaking ? [1, 1.035, 1, 1.02, 1] : [1, 1.015, 1],
        }}
        transition={{ duration: speaking ? 0.7 : 3.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Image
          src="/images/llama-mascot-3d.png"
          alt={alt}
          width={640}
          height={1000}
          className="relative z-10 h-auto w-full drop-shadow-[0_18px_28px_rgba(0,99,114,0.22)]"
          priority={false}
        />

        {speaking &&
          [0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute right-[8%] top-[18%] h-2.5 w-2.5 rounded-full bg-brand-accent"
              animate={{ x: [0, 18], y: [-2 - i * 10, -16 - i * 12], opacity: [1, 0], scale: [0.5, 1.25] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12 }}
            />
          ))}
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="mx-auto -mt-3 h-3 w-28 rounded-full bg-brand-dark/15 blur-[3px]"
        animate={{ scaleX: speaking ? [1, 0.78, 1, 0.86, 1] : [1, 0.88, 1], opacity: [0.45, 0.25, 0.45] }}
        transition={{ duration: speaking ? 0.7 : 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
}
