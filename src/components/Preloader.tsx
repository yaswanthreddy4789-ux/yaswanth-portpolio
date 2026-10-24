"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/config/site";
import { useReady } from "./Providers";

const DURATION = 2600; // total progress time; the intro can be skipped at any moment
const ease = [0.22, 1, 0.36, 1] as const;

/** A wireframe block that "builds" into place: grows in from the left with a small rise. */
function Block({ className, delay, accent }: { className: string; delay: number; accent?: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ opacity: 0, scaleX: 0.2, y: 8 }}
      animate={{ opacity: 1, scaleX: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
      style={{ transformOrigin: "left center" }}
      className={`block rounded-[3px] ${accent ? "bg-accent" : "bg-white/15"} ${className}`}
    />
  );
}

/**
 * Opening entrance: a wireframe website assembles itself block by block while the name types out,
 * then the screen wipes up into the hero. Skippable (button or Escape) and skipped for reduced motion.
 */
export function Preloader() {
  const { setReady } = useReady();
  const [visible, setVisible] = useState(true);
  const [pct, setPct] = useState(0);

  const finish = useCallback(() => {
    setReady(true);
    setVisible(false);
  }, [setReady]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;
    if (reduce) {
      const id = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(id);
    }

    root.style.overflow = "hidden";
    const start = performance.now();
    let raf = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else timeout = setTimeout(finish, 300);
    };
    raf = requestAnimationFrame(tick);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && finish();
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      if (timeout) clearTimeout(timeout);
      document.removeEventListener("keydown", onKey);
      root.style.overflow = "";
    };
  }, [finish]);

  // The name types out between ~12% and ~70% of the progress.
  const typedCount = Math.min(site.name.length, Math.max(0, Math.ceil(((pct - 12) / 58) * site.name.length)));
  const typed = site.name.slice(0, typedCount);
  const done = typedCount >= site.name.length;

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.documentElement.style.overflow = "";
      }}
    >
      {visible && (
        <motion.div
          key="preloader"
          className="preloader fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-bg px-5"
          role="status"
          aria-label="Loading"
          exit={{ clipPath: "inset(0 0 100% 0)", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
        >
          <div aria-hidden="true" className="absolute left-1/2 top-[40%] size-[38rem] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.08] blur-[120px]" />

          {/* the website that builds itself */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease }}
            className="relative w-[min(88vw,30rem)] overflow-hidden rounded-xl border border-white/10 bg-surface shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-3 border-b border-white/10 bg-surface2 px-3.5 py-2.5">
              <span className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
              </span>
              <span className="mx-auto h-5 w-[58%] rounded-md bg-black/50" />
              <span className="w-10" />
            </div>

            <div className="grid gap-3 p-4 sm:p-5">
              {/* header */}
              <div className="flex items-center justify-between">
                <Block className="h-3 w-14" delay={0.35} accent />
                <div className="flex gap-2">
                  <Block className="h-2 w-8" delay={0.5} />
                  <Block className="h-2 w-8" delay={0.58} />
                  <Block className="h-2 w-8" delay={0.66} />
                </div>
              </div>
              {/* hero */}
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-3 grid content-center gap-2">
                  <Block className="h-4 w-full" delay={0.8} />
                  <Block className="h-4 w-4/5" delay={0.9} />
                  <Block className="mt-1 h-1.5 w-full" delay={1.0} />
                  <Block className="h-1.5 w-3/4" delay={1.06} />
                  <Block className="mt-1 h-5 w-20" delay={1.2} accent />
                </div>
                <motion.span
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease, delay: 1.0 }}
                  className="col-span-2 block aspect-[4/3] rounded-lg bg-gradient-to-br from-accent/70 to-white/5"
                />
              </div>
              {/* cards */}
              <div className="grid grid-cols-3 gap-3">
                {[1.45, 1.6, 1.75].map((d, i) => (
                  <motion.span
                    key={d}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease, delay: d }}
                    className="grid gap-1.5 rounded-lg bg-white/[0.06] p-2.5"
                  >
                    <span className={`block h-2 w-2/3 rounded-sm ${i === 1 ? "bg-accent" : "bg-white/20"}`} />
                    <span className="block h-1.5 w-full rounded-sm bg-white/10" />
                    <span className="block h-1.5 w-4/5 rounded-sm bg-white/10" />
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* name types out */}
          <h1 className="mt-9 min-h-[1.2em] text-center font-display text-[clamp(1.9rem,6.5vw,3.6rem)] font-semibold leading-none tracking-tight">
            <span className="sr-only">{site.name}</span>
            <span aria-hidden="true">
              {typed}
              <span className={`ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] bg-accent ${done ? "animate-pulse" : ""}`} />
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 1.9 }}
            className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted sm:text-xs"
          >
            {site.title}
          </motion.p>

          <div className="mt-8 h-px w-56 overflow-hidden bg-line md:w-72">
            <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${pct / 100})` }} />
          </div>
          <div className="mt-3 font-mono text-xs tabular-nums tracking-widest text-muted">{String(pct).padStart(3, "0")}%</div>

          <button
            type="button"
            onClick={finish}
            className="absolute bottom-6 right-5 rounded-full border border-line px-4 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-accent md:right-8"
          >
            Skip intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
