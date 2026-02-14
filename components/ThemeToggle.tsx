"use client";

import { motion } from "framer-motion";
import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";

type ThemeToggleProps = {
  theme: "light" | "dark";
  onToggle: () => void;
};

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <Button
      variant={theme === "light" ? "light" : "ghost"}
      size="md"
      onClick={onToggle}
      className="rounded-full px-4"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -20, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 text-sm"
      >
        {theme === "light" ? (
          <>
            <SunMedium className="h-4 w-4" />
            Light
          </>
        ) : (
          <>
            <MoonStar className="h-4 w-4" />
            Dark
          </>
        )}
      </motion.span>
    </Button>
  );
}
