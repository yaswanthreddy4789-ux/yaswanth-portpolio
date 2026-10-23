"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/config/site";
import { useReady } from "./Providers";

const DURATION = 2400; // total progress time; the intro can be skipped at any moment
const ease = [0.22, 1, 0.36, 1] as const;

const [first, ...rest] = site.name.split(" ");
const words = [first, rest.join(" ")].filter(Boolean);

const card =
  "relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)]";

/**
 * Opening entrance: photos fly in around the name, the name reveals letter by letter,
 * then the whole screen wipes up into the hero. Skipped for reduced-motion users.
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
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else timeout = setTimeout(finish, 250);
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
          <div aria-hidden="true" className="absolute left-1/2 top-[38%] size-[40rem] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.09] blur-[120px]" />

          {/* photos */}
          {site.photo && (
            <div aria-hidden="true" className="relative h-[min(44vh,21rem)] w-[min(94vw,44rem)]">
              {/* left: flies in from the left with a roll */}
              <div className="absolute bottom-[4%] left-[2%] z-20 w-[29%]">
                <motion.div
                  initial={{ opacity: 0, x: -320, rotate: -50 }}
                  animate={{ opacity: 1, x: 0, rotate: -8 }}
                  transition={{ duration: 1.1, ease, delay: 0.15 }}
                >
                  <div className={card}>
                    <Image src="/intro/patrika-gate.jpg" alt="" fill priority sizes="(min-width:768px) 14rem, 28vw" className="object-cover" />
                  </div>
                </motion.div>
              </div>

              {/* right: flies in from the right with a roll */}
              <div className="absolute bottom-[4%] right-[2%] z-20 w-[29%]">
                <motion.div
                  initial={{ opacity: 0, x: 320, rotate: 50 }}
                  animate={{ opacity: 1, x: 0, rotate: 8 }}
                  transition={{ duration: 1.1, ease, delay: 0.35 }}
                >
                  <div className={card}>
                    <Image src="/intro/terrace.jpg" alt="" fill priority sizes="(min-width:768px) 14rem, 28vw" className="object-cover" />
                  </div>
                </motion.div>
              </div>

              {/* centre: main portrait reveals from the bottom with a mask */}
              <div className="absolute left-1/2 top-0 z-30 w-[36%] -translate-x-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, clipPath: "inset(100% 0 0 0)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0 0 0)" }}
                  transition={{ duration: 1.1, ease, delay: 0.55 }}
                >
                  <div className={card}>
                    <Image src="/intro/riverfront.jpg" alt="" fill priority sizes="(min-width:768px) 16rem, 34vw" className="object-cover object-[50%_25%]" />
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* name: letters rise one by one */}
          <h1 className="mt-8 text-center font-display text-[clamp(2.1rem,7.5vw,4.6rem)] font-semibold leading-none tracking-tight">
            <span className="sr-only">{site.name}</span>
            <span aria-hidden="true" className="flex flex-wrap items-center justify-center gap-x-[0.28em]">
              {words.map((w, wi) => (
                <span key={w} className={`flex overflow-hidden pb-[0.1em] ${wi === words.length - 1 && words.length > 1 ? "text-accent" : ""}`}>
                  {w.split("").map((ch, ci) => (
                    <motion.span
                      key={ci}
                      initial={{ y: "115%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.7, ease, delay: 0.95 + (wi * 8 + ci) * 0.05 }}
                      className="inline-block"
                    >
                      {ch}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.7 }}
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
