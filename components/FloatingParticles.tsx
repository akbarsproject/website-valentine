"use client";

import { useEffect, useRef } from "react";

type FloatingParticlesProps = {
  density?: number;
  tint?: string;
};

export default function FloatingParticles({
  density = 32,
  tint = "rgba(255, 77, 141, 0.5)",
}: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      alpha: number;
      drift: number;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      canvas.width = innerWidth * devicePixelRatio;
      canvas.height = innerHeight * devicePixelRatio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const init = () => {
      particlesRef.current = Array.from({ length: density }).map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 8 + Math.random() * 12,
        speed: 0.2 + Math.random() * 0.6,
        alpha: 0.2 + Math.random() * 0.45,
        drift: Math.random() * 0.6 - 0.3,
      }));
    };

    const drawHeart = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size / 12, size / 12);
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(-6, -4, -12, 1, 0, 12);
      ctx.bezierCurveTo(12, 1, 6, -4, 0, 3);
      ctx.closePath();
      ctx.fillStyle = tint.replace("0.5", alpha.toFixed(2));
      ctx.shadowColor = tint.replace("0.5", "0.6");
      ctx.shadowBlur = 16;
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -20) {
          p.y = window.innerHeight + 20;
          p.x = Math.random() * window.innerWidth;
        }
        drawHeart(p.x, p.y, p.size, p.alpha);
      });
      frameRef.current = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [density, tint]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}
