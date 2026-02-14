import { useEffect, useMemo, useState } from "react";

export function useTypingText(text: string, speed = 40, start = true) {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!start) return;
    let index = 0;
    const resetTimeout = window.setTimeout(() => {
      setValue("");
    }, 0);
    const timer = setInterval(() => {
      index += 1;
      setValue(text.slice(0, index));
      if (index >= text.length) {
        clearInterval(timer);
      }
    }, speed);
    return () => {
      clearInterval(timer);
      clearTimeout(resetTimeout);
    };
  }, [text, speed, start]);

  return start ? value : "";
}

export function getNextValentineDate(now: Date) {
  const target = new Date(now.getFullYear(), 1, 14, 0, 0, 0, 0);
  if (now > target) {
    return new Date(now.getFullYear() + 1, 1, 14, 0, 0, 0, 0);
  }
  return target;
}

export function useCountdown(targetDate: Date | null) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!targetDate) return;
    const tick = () => {
      setRemaining(targetDate.getTime() - Date.now());
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return useMemo(() => {
    const total = Math.max(0, remaining);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / (1000 * 60)) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    return { days, hours, minutes, seconds };
  }, [remaining]);
}
