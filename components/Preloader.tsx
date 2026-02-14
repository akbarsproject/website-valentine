"use client";

import { AnimatePresence, motion } from "framer-motion";

type PreloaderProps = {
  done: boolean;
};

export default function Preloader({ done }: PreloaderProps) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f12]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
          <motion.div
            className="flex flex-col items-center gap-4 text-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              className="h-14 w-14 rounded-full border border-pink-400/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <p className="text-sm uppercase tracking-[0.4em] text-pink-200/70">
              Loading the moment
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
