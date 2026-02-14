"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type ValentineQuestionProps = {
  onYes: () => void;
  onNoHover?: () => void;
  theme: "light" | "dark";
};

export default function ValentineQuestion({
  onYes,
  onNoHover,
  theme,
}: ValentineQuestionProps) {
  const [attempts, setAttempts] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0, r: 0 });
  const [bounds, setBounds] = useState({
    minX: 24,
    maxX: 300,
    minY: 24,
    maxY: 400,
  });
  const lastMoveRef = useRef(0);
  const noPosRef = useRef(noPos);
  const boundsRef = useRef(bounds);
  const attemptsRef = useRef(attempts);

  useEffect(() => {
    const update = () => {
      const padding = 24;
      const buttonWidth = 140;
      const buttonHeight = 50;
      setBounds({
        minX: padding,
        maxX: window.innerWidth - buttonWidth - padding,
        minY: padding,
        maxY: window.innerHeight - buttonHeight - padding,
      });
      setNoPos({
        x: window.innerWidth / 2 + 60,
        y: window.innerHeight / 2 + 60,
        r: 0,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    noPosRef.current = noPos;
  }, [noPos]);

  useEffect(() => {
    boundsRef.current = bounds;
  }, [bounds]);

  useEffect(() => {
    attemptsRef.current = attempts;
  }, [attempts]);

  const moveNo = useCallback(() => {
    const speedBoost = Math.min(1 + attemptsRef.current * 0.12, 2.4);
    const { minX, maxX, minY, maxY } = boundsRef.current;
    const xRaw = minX + Math.random() * (maxX - minX);
    const yRaw = minY + Math.random() * (maxY - minY);
    const x = Math.min(maxX, Math.max(minX, xRaw * speedBoost));
    const y = Math.min(maxY, Math.max(minY, yRaw * speedBoost));
    const r = (Math.random() * 16 - 8) * speedBoost;
    setAttempts((prev) => prev + 1);
    setNoPos({ x, y, r });
    onNoHover?.();
  }, [onNoHover]);

  const maybeMoveAway = useCallback((x: number, y: number) => {
    const now = Date.now();
    if (now - lastMoveRef.current < 140) return;
    const current = noPosRef.current;
    const dx = x - current.x;
    const dy = y - current.y;
    if (Math.hypot(dx, dy) < 140) {
      lastMoveRef.current = now;
      moveNo();
    }
  }, [moveNo]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        maybeMoveAway(event.clientX, event.clientY);
      }
    };
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        maybeMoveAway(touch.clientX, touch.clientY);
      }
    };
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [maybeMoveAway]);

  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center px-6 py-20 text-center"
    >
      <div className={`absolute inset-0 ${theme === "light" ? "bg-ambient-light" : "bg-ambient"}`} />
      <motion.div
        className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h2
          className={`text-balance font-serif text-4xl font-semibold sm:text-5xl ${
            theme === "light" ? "text-[#2b1d22]" : "text-white"
          }`}
        >
          Will you be my Valentine?
        </h2>
        <div className="relative flex w-full justify-center gap-6">
          <Button size="lg" className="px-10" onClick={onYes}>
            💖 Yes
          </Button>
        </div>
      </motion.div>
      <motion.button
        className={`fixed z-20 rounded-full border px-6 py-3 text-base font-medium backdrop-blur ${
          theme === "light"
            ? "border-[#f8d9e7] bg-white/70 text-[#2b1d22]"
            : "border-white/20 bg-white/5 text-white"
        }`}
        animate={{
          left: noPos.x,
          top: noPos.y,
          rotate: noPos.r,
        }}
        transition={{
          type: "spring",
          stiffness: 160 + attempts * 30,
          damping: 18,
        }}
        style={{ transform: "translate(-50%, -50%)" }}
        onMouseEnter={moveNo}
        onFocus={moveNo}
        onClick={moveNo}
      >
        🙈 No
      </motion.button>
    </section>
  );
}
