"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { withBasePath } from "@/lib/utils";

type OurFutureProps = {
  onNext: () => void;
  theme: "light" | "dark";
};

const lines = [
  "Kalau kamu izinin…",
  "Aku pengen bikin lebih banyak kenangan lagi.",
  "Lebih banyak foto.",
  "Lebih banyak cerita.",
  "Lebih banyak ‘kita’.",
];

const polaroids = [
  { left: "8%", top: "18%", rotate: -8, src: "/future/1.jpg" },
  { left: "72%", top: "14%", rotate: 6, src: "/future/2.jpg" },
  { left: "14%", top: "62%", rotate: 4, src: "/future/3.jpg" },
  { left: "68%", top: "66%", rotate: -6, src: "/future/4.jpg" },
];

export default function OurFuture({ onNext, theme }: OurFutureProps) {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div
        className={`absolute inset-0 ${
          theme === "light" ? "bg-ambient-light" : "bg-ambient"
        }`}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </motion.div>
      {polaroids.map((card, index) => (
        <motion.div
          key={index}
          className={`absolute hidden h-40 w-28 rounded-2xl border p-2 shadow-xl sm:block ${
            theme === "light"
              ? "border-[#f8d9e7] bg-white/80"
              : "border-white/20 bg-white/10"
          }`}
          style={{ left: card.left, top: card.top, rotate: `${card.rotate}deg` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.2 }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            <Image
              src={withBasePath(card.src)}
              alt="Future memory"
              fill
              sizes="112px"
              className="object-cover"
            />
          </div>
        </motion.div>
      ))}
      <motion.div
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {lines.map((line, index) => (
          <motion.p
            key={line}
            className={`text-balance text-xl font-medium sm:text-2xl ${
              theme === "light" ? "text-[#2b1d22]" : "text-white"
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {line}
          </motion.p>
        ))}
        <Button size="lg" className="mt-8" onClick={onNext}>
          Lanjut…
        </Button>
      </motion.div>
    </section>
  );
}
