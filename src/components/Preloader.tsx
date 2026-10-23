"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/config/site";
import { useReady } from "./Providers";

const DURATION = 1100;

export function Preloader() {
  const { setReady } = useReady();
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    if (reduce) {
      const id = requestAnimationFrame(() => {
        setVisible(false);
        setReady(true);
      });
      return () => cancelAnimationFrame(id);
    }

    root.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else timeout = setTimeout(() => { setReady(true); setVisible(false); }, 150);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
      root.style.overflow = "";
    };
  }, [setReady]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
      }}
    >
      {visible && (
        <motion.div
          key="preloader"
          className="preloader fixed inset-0 z-[90] flex flex-col items-center justify-center bg-bg"
          role="status"
          aria-label="Loading"
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
        >
          {site.photo && (
            <motion.div
              initial={{ scale: 0.4, rotate: -25, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <div className="size-24 overflow-hidden rounded-full border-2 border-accent">
                <Image src={site.photo} alt="" width={256} height={320} sizes="256px" priority className="size-full origin-[50%_17%] scale-[2.3] object-cover object-top" />
              </div>
            </motion.div>
          )}
          <div className="font-display text-7xl font-semibold tracking-tighter md:text-8xl">
            {site.initials}
            <span className="text-accent">.</span>
          </div>
          <div className="mt-10 h-px w-56 overflow-hidden bg-line md:w-72">
            <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${pct / 100})` }} />
          </div>
          <div className="mt-4 font-mono text-xs tabular-nums tracking-widest text-muted">{String(pct).padStart(3, "0")}%</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

