"use client";

import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { experience } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="mx-auto max-w-7xl overflow-x-clip px-5 py-14 md:px-8 md:py-20">
      <SectionHeading id="experience-title" index="03" eyebrow="Experience" lines={["Where I've", "Been Building."]} accentLine={1} />

      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="grid gap-6">
          {experience.roles.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -70 : 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              transition={{ duration: 0.85, ease }}
              className="relative overflow-hidden rounded-2xl border border-line bg-surface p-7 md:p-9"
            >
              <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-accent" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="font-display text-2xl font-semibold">{r.title}</h3>
                {r.period && <p className="font-mono text-xs uppercase tracking-widest text-accent">{r.period}</p>}
              </div>
              <p className="mt-1 text-muted">
                {r.company}
                {r.place && ` · ${r.place}`}
              </p>
              <ul className="mt-5 grid gap-3 text-ink/90">
                {r.points.map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 50, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.85, ease, delay: 0.1 }}
          className="h-fit rounded-2xl border border-line bg-surface p-7 md:p-9"
        >
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
            <GraduationCap className="size-4 text-accent" aria-hidden="true" /> Education
          </h3>
          {experience.education.map((e) => (
            <div key={e.title} className="mt-5">
              <p className="font-display text-xl font-semibold">{e.title}</p>
              <p className="mt-1 text-muted">{e.detail}</p>
            </div>
          ))}
        </motion.aside>
      </div>
    </section>
  );
}
