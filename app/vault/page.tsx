"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const jokes = [
  "Kamu bilang cuma 5 menit, ternyata 2 jam.",
  "Kalau Wi‑Fi kita putus, aku tetep nyambung ke kamu.",
  "Isi chat kita 80% stiker, 20% salah paham lucu.",
  "Kopi dingin favoritmu, tapi senyummu tetap hangat.",
  "Aku inget tanggal pertama kita nonton film sampai ketiduran.",
];

export default function VaultPage() {
  const [unlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("vaultUnlocked") === "1";
  });

  if (!unlocked) {
    return (
      <section className="relative flex min-h-screen w-full items-center justify-center px-6 py-20 text-center">
        <div className="absolute inset-0 bg-[#0b0b12]" />
        <motion.div
          className="relative z-10 mx-auto flex max-w-xl flex-col items-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-serif text-3xl font-semibold text-white">Vault Terkunci</h1>
          <p className="text-white/70">
            Temukan easter egg di halaman utama untuk membuka vault ini.
          </p>
          <Link className="text-pink-200" href="/">
            Kembali
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center px-6 py-20 text-center">
      <div className="absolute inset-0 bg-[#0b0b12]" />
      <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-transparent to-transparent" />
      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-3xl flex-col gap-8 text-left"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-serif text-3xl font-semibold text-white">Inside Jokes Vault</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          {jokes.map((joke) => (
            <div key={joke} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/80">
              {joke}
            </div>
          ))}
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">Chat Snapshot</p>
          <div className="mt-4 h-40 w-full rounded-2xl bg-gradient-to-r from-white/10 via-white/5 to-white/10 blur-[1px]" />
          <p className="mt-3 text-sm text-white/60">Blur aesthetic supaya tetep private.</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
          “Kamu itu rumah paling tenang di tengah hari yang paling ribut.”
        </div>
        <Link className="text-pink-200" href="/">
          Kembali ke awal
        </Link>
      </motion.div>
    </section>
  );
}
