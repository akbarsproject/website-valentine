"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useTypingText } from "@/lib/animations";

type LoveLetterProps = {
  text: string;
  theme: "light" | "dark";
};

export default function LoveLetter({ text, theme }: LoveLetterProps) {
  const typed = useTypingText(text, 28, true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sparkles = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, index) => {
        const left = 10 + ((index * 37) % 80);
        const top = 10 + ((index * 53) % 80);
        return { left: `${left}%`, top: `${top}%` };
      }),
    []
  );

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center px-6 py-20">
      <div className={theme === "light" ? "absolute inset-0 bg-ambient-light" : "absolute inset-0 bg-ambient"} />
      <motion.div
        className="relative z-10 mx-auto w-full max-w-3xl"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div
          className={`tilt soft-shadow rounded-[32px] border px-8 py-10 sm:px-12 sm:py-14 ${
            theme === "light"
              ? "bg-white/80 text-[#2b1d22] border-[#f8d9e7]"
              : "glass border-white/15 text-white"
          }`}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            setTilt({ x: x * 8, y: -y * 8 });
          }}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          style={{
            transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          }}
        >
          <h2 className="font-serif text-3xl font-semibold sm:text-4xl">
            Love Letter
          </h2>
          <p
            className={`mt-6 whitespace-pre-line text-base leading-relaxed sm:text-lg ${
              theme === "light" ? "text-[#3d2b33]" : "text-white/80"
            }`}
          >
            <span className="typing-caret">{typed}</span>
          </p>
          <p
            className={`mt-10 text-sm font-semibold uppercase tracking-[0.3em] ${
              theme === "light" ? "text-[#c45b86]" : "text-pink-200/70"
            }`}
          >
            Thank you for choosing me.
          </p>
        </div>
      </motion.div>
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        {sparkles.map((sparkle, index) => (
          <motion.span
            key={index}
            className="absolute h-2 w-2 rounded-full bg-pink-200/60"
            style={{
              left: sparkle.left,
              top: sparkle.top,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [0.7, 1.2, 0.7] }}
            transition={{ duration: 5, repeat: Infinity, delay: index * 0.2 }}
          />
        ))}
      </motion.div>
    </section>
  );
}
