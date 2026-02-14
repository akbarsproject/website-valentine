"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useTypingText } from "@/lib/animations";
import { Button } from "@/components/ui/button";

type CinematicIntroProps = {
  name: string;
  onStart: () => void;
  theme: "light" | "dark";
};

export default function CinematicIntro({ name, onStart, theme }: CinematicIntroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const text = useTypingText(`Hai ${name} 💖\nAku ada sesuatu buat kamu...`, 45, true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const gsap = (await import("gsap")).default;
    const tl = gsap.timeline({
      onComplete: () => {
        onStart();
      },
    });
    tl.to(containerRef.current, {
      scale: 1.04,
      duration: 1.2,
      ease: "power2.out",
    })
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .set(containerRef.current, { opacity: 1, scale: 1 });
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-20 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className={`absolute inset-0 ${theme === "light" ? "bg-ambient-light" : "bg-ambient"}`} />
      <div className="absolute inset-0 grain" />
      <motion.div
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-8"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        <h1
          className={`text-balance font-serif text-3xl font-semibold tracking-tight sm:text-5xl ${
            theme === "light" ? "text-[#2b1d22]" : "text-white"
          }`}
        >
          <span className="typing-caret whitespace-pre-line">{text}</span>
        </h1>
        <p
          className={`text-base sm:text-lg ${
            theme === "light" ? "text-[#3d2b33]/70" : "text-white/70"
          }`}
        >
          Klik kalau kamu siap.
        </p>
        <Button
          size="lg"
          className="pulse-glow"
          onClick={handleStart}
        >
          Klik kalau kamu siap
        </Button>
      </motion.div>
    </motion.section>
  );
}
