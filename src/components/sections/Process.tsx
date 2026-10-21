"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="process" aria-labelledby="process-title" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <SectionHeading id="process-title" index="05" eyebrow="Development Process" lines={["From Idea", "to Launch."]} accentLine={1} />

      <ol ref={ref} className="relative mx-auto max-w-5xl">
        {/* track + animated progress */}
        <span aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px bg-line md:left-1/2 md:-translate-x-1/2" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: progress }}
          className="absolute bottom-0 left-5 top-0 w-px origin-top bg-accent md:left-1/2 md:-translate-x-1/2"
        />

        {processSteps.map((s, i) => {
          const left = i % 2 === 0;
          return (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`relative pb-12 pl-16 last:pb-0 md:w-1/2 md:pl-0 ${left ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"}`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0 grid size-10 place-items-center rounded-full border border-accent/60 bg-bg text-accent ${
                  left ? "md:left-auto md:-right-5" : "md:-left-5"
                }`}
              >
                <Icon name={s.icon} className="size-4" />
              </span>
              <p className="font-mono text-xs tracking-widest text-accent">{s.n}</p>
              <h3 className="mt-1 font-display text-3xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-muted">{s.text}</p>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
