"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type MemorySceneProps = {
  onNext: () => void;
  photoSrc: string;
  theme: "light" | "dark";
};

export default function MemoryScene({ onNext, photoSrc, theme }: MemorySceneProps) {
  const [showButton, setShowButton] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center px-6 py-20 text-center">
      <div className={`absolute inset-0 ${theme === "light" ? "bg-ambient-light" : "bg-ambient"}`} />
      <motion.div
        ref={containerRef}
        className="relative z-10 w-full max-w-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div
          className={`tilt soft-shadow overflow-hidden rounded-[32px] p-6 sm:p-10 ${
            theme === "light"
              ? "bg-white/80 border border-[#f8d9e7]"
              : "glass"
          }`}
          onMouseMove={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            setTilt({ x: x * 10, y: -y * 10 });
          }}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          style={{
            transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          }}
        >
          <motion.div
            className="relative overflow-hidden rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
          >
            <Image
              src={photoSrc}
              alt="Memory"
              width={1200}
              height={800}
              className="h-[280px] w-full rounded-3xl object-cover sm:h-[420px]"
              priority={false}
            />
            <div
              className={`absolute inset-0 ${
                theme === "light"
                  ? "bg-gradient-to-t from-white/60 via-transparent to-transparent"
                  : "bg-gradient-to-t from-black/50 via-transparent to-transparent"
              }`}
            />
            <motion.div
              className={`absolute bottom-6 left-6 right-6 text-left text-lg font-medium ${
                theme === "light" ? "text-[#2b1d22]" : "text-white"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Sebelum kamu lanjut…
              Aku cuma mau kamu tau sesuatu.
              Aku nggak sempurna.
              Tapi aku selalu serius kalau soal kamu.
            </motion.div>
          </motion.div>
        </div>
        {showButton && (
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Button
              size="lg"
              onClick={async () => {
                const gsap = (await import("gsap")).default;
                const tl = gsap.timeline({
                  onComplete: () => onNext(),
                });
                tl.to(containerRef.current, {
                  filter: "blur(6px)",
                  duration: 0.6,
                  ease: "power2.out",
                }).to(
                  overlayRef.current,
                  {
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                  },
                  "-=0.4"
                );
              }}
            >
              Lanjut…
            </Button>
          </motion.div>
        )}
      </motion.div>
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-20 bg-black opacity-0 transition-opacity"
      />
    </section>
  );
}
