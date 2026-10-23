"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { useReady } from "@/components/Providers";
import { Magnetic } from "@/components/ui/Interactions";
import { BrowserMockup } from "@/components/ui/BrowserMockup";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { ready } = useReady();
  const show = ready ? "show" : "hide";
  const h = site.hero;

  // Subtle pointer parallax for the project previews (desktop pointers only; no effect on touch).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const rotY = useTransform(sx, [-1, 1], [-5, 5]);
  const rotX = useTransform(sy, [-1, 1], [4, -4]);
  const x2 = useTransform(sx, [-1, 1], [-14, 14]);
  const y2 = useTransform(sy, [-1, 1], [-10, 10]);

  const container = { hide: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } } };
  const fadeUp = { hide: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

  return (
    <section
      id="home"
      aria-label="Introduction"
      className="noise relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32 lg:pt-28"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        my.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
    >
      {/* ambient lighting + grid */}
      <motion.div aria-hidden="true" className="absolute inset-0 -z-10" initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 1.4 }}>
        <div className="bg-grid absolute inset-0" />
        <div className="absolute -left-40 top-10 size-[34rem] rounded-full bg-accent/[0.13] blur-[130px]" />
        <div className="absolute -right-32 bottom-0 size-[28rem] rounded-full bg-white/[0.05] blur-[120px]" />
      </motion.div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div variants={container} initial="hide" animate={show}>
          <motion.div variants={fadeUp} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{h.label}</span>
            {site.availability.enabled && (
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-ink">
                <span className="relative flex size-2">
                  <span className="pulse-ring absolute inline-flex size-full rounded-full bg-accent" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                {site.availability.label}
              </span>
            )}
          </motion.div>

          <h1 className="font-display text-[clamp(2.6rem,6.2vw,5.4rem)] font-semibold leading-[0.95] tracking-tight">
            <span className="sr-only">{h.lines.join(" ")}</span>
            <span aria-hidden="true">
              {h.lines.map((l, i) => (
                <span key={l} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={`block ${i === h.accentLine ? "text-accent" : ""}`}
                    variants={{ hide: { y: "110%" }, show: { y: 0, transition: { duration: 0.95, ease } } }}
                  >
                    {l}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p variants={fadeUp} className="mt-7 font-mono text-[13px] leading-relaxed text-ink/90">
            {site.name} <span className="text-accent">/</span> {h.supporting}
          </motion.p>
          <motion.p variants={fadeUp} className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {h.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <a
                href={h.primaryCta.href}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.04] active:scale-95"
              >
                {h.primaryCta.label}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={h.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                {h.secondaryCta.label}
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* project previews */}
        <motion.div
          className="relative mx-auto w-full max-w-xl [perspective:1400px] lg:max-w-none"
          initial={{ opacity: 0, y: 50 }}
          animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1.1, ease, delay: 0.55 }}
        >
          <motion.div style={{ rotateY: rotY, rotateX: rotX }} className="relative [transform-style:preserve-3d]">
            <div className="float-y">
              <BrowserMockup variant="wordpress" image="/projects/health-connect.jpg" alt="Health Connect Group website, built with WordPress and Elementor Pro" label="healthconnectgroup.com.au" priority sizes="(min-width:1024px) 45vw, 90vw" className="relative z-10" />
            </div>
            <motion.div style={{ x: x2, y: y2 }} className="absolute -bottom-10 -left-6 z-20 hidden w-[46%] sm:block">
              <div className="float-y [animation-delay:-3s]">
                <BrowserMockup variant="shop" image="/projects/enwolt-bikes.jpg" alt="Enwolt Bikes Shopify store" label="enwoltbikes.com" sizes="22vw" />
              </div>
            </motion.div>
            <motion.div style={{ x: x2, y: y2 }} className="absolute -right-4 -top-8 z-0 hidden w-[40%] sm:block">
              <div className="float-y [animation-delay:-5s]">
                <BrowserMockup variant="custom" image="/projects/dhe-parts.jpg" alt="DHE Parts WooCommerce store" label="dheparts.com" sizes="18vw" className="opacity-90" />
              </div>
            </motion.div>
          </motion.div>
          <p className="mt-14 text-center font-mono text-[11px] uppercase tracking-widest text-muted sm:mt-16">Selected client work</p>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-muted transition-colors hover:text-accent md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.6 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-line">
          <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-accent" />
        </span>
        <ArrowDown className="size-3.5" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
