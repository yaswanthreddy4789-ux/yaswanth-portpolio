"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { about } from "@/config/content";
import { platforms } from "@/config/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const [active, setActive] = useState(about.blocks[0].id);
  const uid = useId();
  const current = about.blocks.find((b) => b.id === active) ?? about.blocks[0];

  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionHeading id="about-title" index="01" eyebrow="About" lines={about.heading} accentLine={1} intro={about.intro} />

      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <Reveal className="min-w-0">
          <div role="tablist" aria-label="About me" className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {about.blocks.map((b, i) => {
              const on = b.id === active;
              return (
                <button
                  key={b.id}
                  role="tab"
                  id={`${uid}-tab-${b.id}`}
                  aria-selected={on}
                  aria-controls={`${uid}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(b.id)}
                  onKeyDown={(e) => {
                    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
                    if (!d) return;
                    e.preventDefault();
                    const next = about.blocks[(i + d + about.blocks.length) % about.blocks.length];
                    setActive(next.id);
                    document.getElementById(`${uid}-tab-${next.id}`)?.focus();
                  }}
                  className={`group relative flex shrink-0 items-center gap-4 rounded-xl border px-5 py-4 text-left transition-colors lg:shrink ${
                    on ? "border-accent/60 bg-white/[0.04]" : "border-line hover:border-white/25"
                  }`}
                >
                  <span className={`font-mono text-xs ${on ? "text-accent" : "text-muted"}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="whitespace-nowrap font-display text-lg font-medium lg:whitespace-normal">{b.label}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <div className="relative min-h-[22rem] overflow-hidden rounded-2xl border border-line bg-surface p-7 md:p-10">
            <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-accent/10 blur-[90px]" />
            <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${current.id}`} tabIndex={0}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-semibold md:text-3xl">{current.title}</h3>
                    {current.placeholder && (
                      <span className="rounded-full border border-accent/40 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                        Edit me
                      </span>
                    )}
                  </div>
                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{current.body}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-10 border-t border-line pt-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Platforms I work across</p>
              <ul className="flex flex-wrap gap-2">
                {["WordPress", "Shopify", "Wix", "WPBakery", "Custom development"].map((p) => (
                  <li key={p} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                    {p}
                  </li>
                ))}
              </ul>
              <p className="sr-only">{platforms.length} skill areas are detailed in the next section.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
