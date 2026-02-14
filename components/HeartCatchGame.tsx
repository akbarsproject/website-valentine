"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type HeartCatchGameProps = {
  onComplete: () => void;
  theme: "light" | "dark";
};

export default function HeartCatchGame({ onComplete, theme }: HeartCatchGameProps) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 8 }).map((_, index) => ({
        id: index,
        left: `${10 + (index * 12) % 80}%`,
        top: `${18 + (index * 19) % 64}%`,
        delay: index * 0.2,
      })),
    []
  );
  const [caught, setCaught] = useState<number[]>([]);

  const handleCatch = (id: number) => {
    if (caught.includes(id)) return;
    const next = [...caught, id];
    setCaught(next);
    if (next.length >= 5) {
      setTimeout(() => {
        onComplete();
      }, 400);
    }
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div
        className={`absolute inset-0 ${
          theme === "light" ? "bg-ambient-light" : "bg-ambient"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      {hearts.map((heart) => (
        <motion.button
          key={heart.id}
          className={`absolute text-3xl ${
            caught.includes(heart.id) ? "opacity-0" : "opacity-100"
          }`}
          style={{ left: heart.left, top: heart.top }}
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: heart.delay }}
          onClick={() => handleCatch(heart.id)}
        >
          💖
        </motion.button>
      ))}
      <motion.div
        className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-6"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2
          className={`text-balance font-serif text-3xl font-semibold sm:text-4xl ${
            theme === "light" ? "text-[#2b1d22]" : "text-white"
          }`}
        >
          Catch 5 hearts to unlock the answer.
        </h2>
        <p className={theme === "light" ? "text-[#3d2b33]/70" : "text-white/70"}>
          {caught.length}/5 hearts
        </p>
        <Button size="lg" disabled={caught.length < 5} onClick={onComplete}>
          Buka pertanyaan
        </Button>
      </motion.div>
    </section>
  );
}
