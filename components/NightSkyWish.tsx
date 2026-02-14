"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type NightSkyWishProps = {
  onNext: () => void;
};

const wishes = [
  "Semoga semua hal baik selalu menemukan kamu.",
  "Semoga kita punya banyak waktu untuk tertawa bareng.",
  "Semoga kita selalu saling menjaga dan pulang.",
  "Semoga langkah kita selalu searah.",
  "Semoga ‘kita’ bertahan lama.",
];

export default function NightSkyWish({ onNext }: NightSkyWishProps) {
  const [wish, setWish] = useState<string | null>(null);
  const stars = useMemo(
    () =>
      Array.from({ length: 16 }).map((_, index) => ({
        left: `${8 + (index * 17) % 84}%`,
        top: `${10 + (index * 23) % 70}%`,
        size: 1.5 + (index % 3) * 0.7,
      })),
    []
  );

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div className="absolute inset-0 bg-[#05060e]" />
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(50% 50% at 60% 20%, rgba(59,130,246,0.15), transparent 60%)",
        }}
      />
      {stars.map((star, index) => (
        <motion.button
          key={index}
          className="absolute rounded-full bg-white/90"
          style={{ left: star.left, top: star.top, width: star.size, height: star.size }}
          animate={{ opacity: [0.3, 1, 0.4], scale: [1, 1.6, 1] }}
          transition={{ duration: 4, repeat: Infinity, delay: index * 0.2 }}
          onClick={() => setWish(wishes[index % wishes.length])}
        />
      ))}
      <motion.div
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-6"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-balance font-serif text-4xl font-semibold text-white sm:text-5xl">
          Make a wish before you answer.
        </h2>
        <p className="text-white/70">
          Sentuh salah satu bintang biar doa kamu muncul.
        </p>
        {wish && (
          <motion.p
            className="text-lg text-white/90"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {wish}
          </motion.p>
        )}
        <Button size="lg" className="mt-6" onClick={onNext}>
          Lanjut…
        </Button>
      </motion.div>
    </section>
  );
}
