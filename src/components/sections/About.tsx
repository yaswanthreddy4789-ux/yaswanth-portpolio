"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { MapPin } from "lucide-react";
import { about } from "@/config/content";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tilt } from "@/components/ui/Interactions";

export function About() {
  const [active, setActive] = useState(about.blocks[0].id);
  const uid = useId();
  const current = about.blocks.find((b) => b.id === active) ?? about.blocks[0];

  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionHeading id="about-title" index="01" eyebrow="About" lines={about.heading} accentLine={1} intro={about.intro} />

      <div className={`grid gap-10 ${site.photo ? "lg:grid-cols-[0.62fr_1.38fr] lg:gap-14" : ""}`}>
        {site.photo && (
          <Reveal className="min-w-0">
            <Tilt max={4} className="mx-auto max-w-sm lg:max-w-none">
              <figure className="relative">
                <div aria-hidden="true" className="absolute -inset-3 -z-10 rounded-[1.75rem] border border-accent/30" />
                <div aria-hidden="true" className="absolute -bottom-6 -right-3 -z-10 size-40 rounded-full bg-accent/20 blur-[70px]" />
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface">
                  <Image
                    src={site.photo}
                    alt={site.photoAlt}
                    fill
                    sizes="(min-width: 1024px) 28vw, 80vw"
                    className="object-cover object-[50%_20%]"
                  />
                  <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5">
                    <p className="font-display text-xl font-semibold">{site.name}</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/80">
                      <MapPin className="size-3.5 text-accent" aria-hidden="true" /> {site.location}
                    </p>
                  </figcaption>
                </div>
              </figure>
            </Tilt>
          </Reveal>
        )}

        <div className="min-w-0">
          <Reveal>
            <dl className="mb-8 grid grid-cols-3 gap-3">
              {about.stats.map((s) => (
                <div key={s.label} className="flex flex-col rounded-2xl border border-line bg-surface p-4 md:p-5">
                  <dt className="order-2 mt-1 text-[11px] leading-snug text-muted md:text-xs">{s.label}</dt>
                  <dd className="font-display text-3xl font-semibold text-accent md:text-4xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.05}>
            <div role="tablist" aria-label="About me" className="flex flex-wrap gap-2">
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
                      const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                      if (!d) return;
                      e.preventDefault();
                      const next = about.blocks[(i + d + about.blocks.length) % about.blocks.length];
                      setActive(next.id);
                      document.getElementById(`${uid}-tab-${next.id}`)?.focus();
                    }}
                    className={`flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm transition-colors ${
                      on ? "border-accent bg-accent text-black" : "border-line text-muted hover:border-white/30 hover:text-ink"
                    }`}
                  >
                    <span className={`font-mono text-[11px] ${on ? "text-black/70" : "text-accent"}`}>{String(i + 1).padStart(2, "0")}</span>
                    {b.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative mt-4 min-h-[16rem] overflow-hidden rounded-2xl border border-line bg-surface p-7 md:p-9">
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

              <div className="mt-8 border-t border-line pt-5">
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">Platforms I work across</p>
                <ul className="flex flex-wrap gap-2">
                  {["WordPress", "WooCommerce", "Shopify", "Wix", "Squarespace", "Unbounce", "Custom development"].map((p) => (
                    <li key={p} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
