"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { platforms } from "@/config/skills";
import { projects } from "@/config/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";

export function Expertise() {
  const [selected, setSelected] = useState<string | null>(platforms[0].id);
  const sel = platforms.find((p) => p.id === selected);
  const SHOWN = 5;
  const linked = sel ? projects.filter((p) => p.skills.includes(sel.id)) : [];

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionHeading
        id="expertise-title"
        index="02"
        eyebrow="Skills & Platforms"
        lines={["Different Platforms.", "One Developer."]}
        accentLine={1}
        intro="Select a platform to see what I do with it and which featured projects use it."
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p) => {
          const on = p.id === selected;
          return (
            <StaggerItem key={p.id}>
              <button
                type="button"
                aria-pressed={on}
                aria-controls="expertise-detail"
                onClick={() => setSelected(on ? null : p.id)}
                className={`group relative h-full w-full overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 hover:-translate-y-1 ${
                  on ? "border-accent/70 bg-surface2" : "border-line bg-surface hover:border-white/25"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/20"
                />
                <motion.span
                  className="mb-8 grid size-12 place-items-center rounded-xl border border-line bg-bg text-accent"
                  whileHover={{ rotate: -8, scale: 1.08 }}
                >
                  <Icon name={p.icon} className="size-5" />
                </motion.span>
                <span className="block font-display text-2xl font-semibold">{p.name}</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted">{p.summary}</span>
                <span className="mt-5 block font-mono text-[11px] uppercase tracking-widest text-muted">
                  {on ? "Selected" : "View details"}
                </span>
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>

      <div id="expertise-detail" aria-live="polite" className="mt-6">
        <AnimatePresence mode="wait">
          {sel && (
            <motion.div
              key={sel.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="grid gap-8 rounded-2xl border border-line bg-surface p-7 md:grid-cols-2 md:p-10">
                <div>
                  <h3 className="font-display text-2xl font-semibold">{sel.name} capabilities</h3>
                  <ul className="mt-5 grid gap-2.5">
                    {sel.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-sm text-ink/90 md:text-base">
                        <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Featured projects</h3>
                  {linked.length ? (
                    <>
                    <ul className="mt-5 grid gap-2">
                      {linked.slice(0, SHOWN).map((p) => (
                        <li key={p.slug}>
                          <a
                            href="#projects"
                            className="flex items-center justify-between rounded-xl border border-line px-4 py-3 transition-colors hover:border-accent"
                          >
                            <span>
                              {p.name}
                              {p.placeholder && <span className="ml-2 font-mono text-[10px] uppercase text-accent">placeholder</span>}
                            </span>
                            <span className="text-xs text-muted">{p.category}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                    {linked.length > SHOWN && (
                      <a href="#projects" className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">
                        + {linked.length - SHOWN} more in Projects
                      </a>
                    )}
                    </>
                  ) : (
                    <p className="mt-5 text-sm text-muted">No featured project is linked to this skill yet.</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
