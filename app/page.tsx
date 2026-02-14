"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CinematicIntro from "@/components/CinematicIntro";
import FinalSurprise from "@/components/FinalSurprise";
import FloatingParticles from "@/components/FloatingParticles";
import HeartCatchGame from "@/components/HeartCatchGame";
import LoveLetter from "@/components/LoveLetter";
import MemoryScene from "@/components/MemoryScene";
import NightSkyWish from "@/components/NightSkyWish";
import OurFuture from "@/components/OurFuture";
import Preloader from "@/components/Preloader";
import SoundControl from "@/components/SoundControl";
import ThemeToggle from "@/components/ThemeToggle";
import ValentineQuestion from "@/components/ValentineQuestion";
import { getNextValentineDate, useCountdown } from "@/lib/animations";
import { createSoundBank } from "@/lib/sounds";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

type Phase = "intro" | "memory" | "future" | "wish" | "game" | "question" | "love" | "finale";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [soundBank, setSoundBank] = useState<ReturnType<typeof createSoundBank> | null>(null);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [yesGlow, setYesGlow] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [secretVisible, setSecretVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const heartbeatRef = useRef(false);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const countdown = useCountdown(targetDate);
  const [vaultUnlocked, setVaultUnlocked] = useState(false);
  const [vaultToast, setVaultToast] = useState(false);
  const vaultClicksRef = useRef(0);

  useEffect(() => {
    setTargetDate(getNextValentineDate(new Date()));
  }, []);

  useEffect(() => {
    const stored = window.localStorage.getItem("vaultUnlocked");
    if (stored === "1") {
      setVaultUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (!vaultToast) return;
    const timer = setTimeout(() => setVaultToast(false), 2600);
    return () => clearTimeout(timer);
  }, [vaultToast]);

  useEffect(() => {
    const timer = setTimeout(() => setPreloaderDone(true), 1700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      const bank = createSoundBank();
      if (isMounted) {
        setSoundBank(bank);
      }
    };
    init();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const update = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("theme-light", "theme-dark");
    html.classList.add(theme === "light" ? "theme-light" : "theme-dark");
  }, [theme]);

  useEffect(() => {
    const color = theme === "light" ? "#fffaf5" : "#0f0f12";
    let meta = document.querySelector("meta[name='theme-color']");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", color);
  }, [theme]);

  useEffect(() => {
    const move = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    let rafId = 0;
    let lenis: { raf: (time: number) => void; destroy?: () => void } | null = null;
    const init = async () => {
      const Lenis = (await import("lenis")).default;
      const lenisInstance = new Lenis({ smoothWheel: true, duration: 1.2 });
      lenis = lenisInstance;
      const raf = (time: number) => {
        lenisInstance.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };
    init();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy?.();
    };
  }, []);

  useEffect(() => {
    if (!soundBank) return;
    if (soundEnabled) {
      soundBank.ambient.play();
    } else {
      soundBank.ambient.stop();
    }
  }, [soundEnabled, soundBank]);

  useEffect(() => {
    if (!soundBank) return;
    if (phase === "love" && soundEnabled && !heartbeatRef.current) {
      soundBank.heartbeat.play();
      heartbeatRef.current = true;
    }
    if (phase !== "love" && heartbeatRef.current) {
      soundBank.heartbeat.stop();
      heartbeatRef.current = false;
    }
  }, [phase, soundEnabled, soundBank]);

  useEffect(() => {
    if (phase !== "love") return;
    const timer = setTimeout(() => setPhase("finale"), 8500);
    return () => clearTimeout(timer);
  }, [phase]);

  const handleBackgroundClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 5) {
      setSecretVisible(true);
    }
  };

  const handleYes = () => {
    setShowConfetti(true);
    setYesGlow(true);
    if (soundEnabled && soundBank) {
      soundBank.yes.play();
      soundBank.sparkle.play();
    }
    setTimeout(() => {
      setPhase("love");
    }, 800);
    setTimeout(() => setYesGlow(false), 1400);
  };

  const handleVaultClick = () => {
    vaultClicksRef.current += 1;
    if (vaultClicksRef.current >= 5) {
      vaultClicksRef.current = 0;
      window.localStorage.setItem("vaultUnlocked", "1");
      setVaultUnlocked(true);
      setVaultToast(true);
    }
  };

  const loveLetterText =
    "Kalau hidup itu perjalanan panjang, aku bersyukur kamu ada di setiap bab yang ingin aku tulis.\nKamu bikin hariku terasa lebih tenang, lebih berani, dan lebih hidup.\nBersamamu, aku ingin menciptakan ruang yang selalu hangat untuk kita pulang.";

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      onClick={handleBackgroundClick}
    >
      <Preloader done={preloaderDone} />
      <button
        className="fixed left-2 top-2 z-40 h-10 w-10 opacity-0"
        aria-label="vault-trigger"
        onClick={handleVaultClick}
      />
      <FloatingParticles tint={theme === "light" ? "rgba(244, 114, 182, 0.45)" : "rgba(255, 77, 141, 0.5)"} />
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(40% 40% at 70% 20%, rgba(255,77,141,0.22), transparent 60%)",
        }}
      />
      <div className="cursor-glow" />
      {yesGlow && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(45% 45% at 50% 50%, rgba(255,77,141,0.6), transparent 70%)",
          }}
        />
      )}
      {showConfetti && windowSize.width > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={240}
          colors={["#ff4d8d", "#f472b6", "#ffd1e8", "#fb7185"]}
        />
      )}
      <div className="fixed left-6 top-6 z-30 flex flex-wrap gap-3">
        <ThemeToggle
          theme={theme}
          onToggle={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
        />
        <SoundControl
          enabled={soundEnabled}
          onToggle={() => setSoundEnabled((prev) => !prev)}
        />
      </div>
      <div
        className={`fixed right-6 top-6 z-30 hidden rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] backdrop-blur sm:block ${
          theme === "light"
            ? "border-[#f8d9e7] bg-white/70 text-[#3d2b33]/80"
            : "border-white/10 bg-white/5 text-white/70"
        }`}
      >
        {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
      </div>
      {secretVisible && (
        <motion.div
          className={`fixed bottom-8 left-1/2 z-30 -translate-x-1/2 rounded-full px-6 py-2 text-sm backdrop-blur ${
            theme === "light" ? "bg-white/80 text-[#3d2b33]" : "bg-white/10 text-white/80"
          }`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Kamu nemu pesan rahasia: aku selalu sayang kamu.
        </motion.div>
      )}
      {vaultToast && (
        <motion.div
          className="fixed bottom-20 left-1/2 z-30 -translate-x-1/2 rounded-full bg-white/10 px-6 py-2 text-sm text-white/80 backdrop-blur"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Vault kebuka!{" "}
          <Link className="text-pink-200" href="/vault">
            Buka sekarang
          </Link>
        </motion.div>
      )}
      {vaultUnlocked && !vaultToast && (
        <Link
          href="/vault"
          className="fixed bottom-6 right-6 z-30 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur"
        >
          Vault
        </Link>
      )}
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CinematicIntro
              name="Sayang"
              theme={theme}
              onStart={() => setPhase("memory")}
            />
          </motion.div>
        )}
        {phase === "memory" && (
          <motion.div key="memory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MemoryScene
              photoSrc="/memory-photo.svg"
              onNext={() => setPhase("future")}
              theme={theme}
            />
          </motion.div>
        )}
        {phase === "future" && (
          <motion.div key="future" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <OurFuture theme={theme} onNext={() => setPhase("wish")} />
          </motion.div>
        )}
        {phase === "wish" && (
          <motion.div key="wish" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <NightSkyWish onNext={() => setPhase("game")} />
          </motion.div>
        )}
        {phase === "game" && (
          <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HeartCatchGame theme={theme} onComplete={() => setPhase("question")} />
          </motion.div>
        )}
        {phase === "question" && (
          <motion.div key="question" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ValentineQuestion
              onYes={handleYes}
              theme={theme}
              onNoHover={() => {
                if (soundEnabled && soundBank) soundBank.whoosh.play();
              }}
            />
          </motion.div>
        )}
        {phase === "love" && (
          <motion.div key="love" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoveLetter text={loveLetterText} theme={theme} />
          </motion.div>
        )}
        {phase === "finale" && (
          <motion.div key="finale" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <FinalSurprise />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
