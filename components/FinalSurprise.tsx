"use client";

import { motion } from "framer-motion";

export default function FinalSurprise() {
  const hearts = Array.from({ length: 18 }).map((_, index) => ({
    left: `${8 + (index * 13) % 84}%`,
    top: `${10 + (index * 17) % 80}%`,
    delay: index * 0.15,
  }));

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div className="absolute inset-0 bg-[#0b0b12]" />
      <motion.div
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h2
          className="text-balance font-serif text-4xl font-semibold text-white sm:text-5xl"
          animate={{ textShadow: ["0 0 20px rgba(255,77,141,0.3)", "0 0 40px rgba(255,77,141,0.6)", "0 0 20px rgba(255,77,141,0.3)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Happy Valentine’s Day.
        </motion.h2>
        <p className="text-white/70">Semoga hari ini penuh cinta dan hangat.</p>
      </motion.div>
      {hearts.map((heart, index) => (
        <motion.span
          key={index}
          className="absolute text-2xl"
          style={{ left: heart.left, top: heart.top }}
          animate={{ y: [0, -16, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, delay: heart.delay }}
        >
          💗
        </motion.span>
      ))}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 6, duration: 2 }}
      />
    </section>
  );
}
