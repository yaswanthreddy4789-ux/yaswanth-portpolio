"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/config/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { Tilt } from "@/components/ui/Interactions";

type Filter = "All" | ProjectCategory;
const filters: Filter[] = ["All", ...projectCategories.filter((c) => projects.some((p) => p.category === c))];
const INITIAL = 6;

/** Different entrance for neighbouring cards so the grid feels choreographed, not repeated. */
const entrances = [
  { x: -90, opacity: 0 }, // slide in from the left
  { x: 90, opacity: 0 }, // slide in from the right
  { x: -60, rotate: -7, opacity: 0 }, // gentle roll in
  { scale: 0.86, opacity: 0 }, // zoom in
  { y: 70, opacity: 0 }, // rise
  { x: 60, rotate: 6, opacity: 0 }, // gentle roll from the right
] as const;

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [showAll, setShowAll] = useState(false);
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const visible = filter === "All" && !showAll ? list.slice(0, INITIAL) : list;

  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-7xl overflow-x-clip px-5 py-14 md:px-8 md:py-20">
      <SectionHeading id="projects-title" index="04" eyebrow="Featured Projects" lines={["Selected Work.", "Real Solutions."]} accentLine={1} />

      <Reveal>
        <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                filter === f ? "border-accent bg-accent text-black" : "border-line text-muted hover:border-white/30 hover:text-ink"
              }`}
            >
              {f === "All" ? "All Projects" : f}
            </button>
          ))}
        </div>
      </Reveal>

      <p className="sr-only" aria-live="polite">
        {visible.length} of {list.length} {list.length === 1 ? "project" : "projects"} shown
      </p>

      <motion.div layout className="grid gap-x-8 gap-y-12 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filter === "All" && !showAll && list.length > INITIAL && (
        <div className="mt-14 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-full border border-line px-7 py-3.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Show all {list.length} projects
          </button>
        </div>
      )}

      {list.length === 0 && <p className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">No projects in this category yet.</p>}
    </section>
  );
}

function ProjectCard({ project: p, index }: { project: Project; index: number }) {
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const enter = entrances[index % entrances.length];

  return (
    <motion.article
      layout
      initial="hidden"
      whileInView="show"
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.5 } } }}
      className={`group ${index % 2 === 1 ? "md:mt-14" : ""}`}
    >
      {/* directional entrance + mask reveal on the screenshot */}
      <motion.div
        variants={{
          hidden: { ...enter, clipPath: "inset(0 0 100% 0)" },
          show: { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
        }}
        className="overflow-hidden rounded-xl motion-reduce:!transform-none motion-reduce:![clip-path:none] motion-reduce:!opacity-100"
      >
        <div ref={frame} className="overflow-hidden rounded-xl">
          {/* parallax drifts the screenshot slightly against the scroll */}
          <motion.div style={{ y: parallax, scale: 1.05 }} className="motion-reduce:!transform-none">
            <Tilt className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
              <BrowserMockup
                variant={p.mockup}
                image={p.image}
                alt={p.imageAlt ?? `${p.name} website screenshot`}
                label={p.url ? p.url.replace(/^https?:\/\//, "") : "yourproject.com"}
              />
            </Tilt>
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-6">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-accent">{p.category}</span>
          <span aria-hidden="true">·</span>
          <span>{p.role}</span>
          {p.placeholder && <span className="rounded-full border border-accent/40 px-2 py-0.5 text-[10px] text-accent">Placeholder</span>}
        </div>
        <h3 className="mt-3 font-display text-3xl font-semibold transition-transform duration-500 group-hover:translate-x-1.5">{p.name}</h3>
        <p className="mt-3 max-w-xl text-muted">{p.description}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
          {p.stack.map((s) => (
            <li key={s} className="rounded-full border border-line px-3 py-1 text-xs">
              {s}
            </li>
          ))}
        </ul>

        {p.results && p.results.length > 0 && (
          <ul className="mt-4 grid gap-1 text-sm text-ink/90">
            {p.results.map((r) => (
              <li key={r}>— {r}</li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/projects/${p.slug}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            <BookOpen className="size-4" aria-hidden="true" /> Case study
            <span className="sr-only"> — {p.name}</span>
          </Link>
          {p.url && (
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.04]"
            >
              Visit site <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
