"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, BookOpen, X } from "lucide-react";
import { projectCategories, projects, type Project, type ProjectCategory } from "@/config/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { Tilt } from "@/components/ui/Interactions";

type Filter = "All" | ProjectCategory;
const filters: Filter[] = ["All", ...projectCategories.filter((c) => projects.some((p) => p.category === c))];
const INITIAL = 6;

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const [study, setStudy] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const list = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const visible = filter === "All" && !showAll ? list.slice(0, INITIAL) : list;

  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionHeading id="projects-title" index="03" eyebrow="Featured Projects" lines={["Selected Work.", "Real Solutions."]} accentLine={1} />

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
            <ProjectCard key={p.slug} project={p} index={i} onStudy={() => setStudy(p)} />
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

      <CaseStudy project={study} onClose={() => setStudy(null)} />
    </section>
  );
}

function ProjectCard({ project: p, index, onStudy }: { project: Project; index: number; onStudy: () => void }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group ${index % 2 === 1 ? "md:mt-14" : ""}`}
    >
      {/* clip-path mask reveal */}
      <motion.div
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        whileInView={{ clipPath: "inset(0 0 0% 0)" }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="overflow-hidden rounded-xl"
      >
        <Tilt className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <BrowserMockup
            variant={p.mockup}
            image={p.image}
            alt={p.imageAlt ?? `${p.name} website screenshot`}
            label={p.url ? p.url.replace(/^https?:\/\//, "") : "yourproject.com"}
          />
        </Tilt>
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

        {(p.url || p.caseStudy) && (
          <div className="mt-5 flex flex-wrap gap-3">
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.04]"
              >
                Visit site <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
            {p.caseStudy && (
              <button
                type="button"
                onClick={onStudy}
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-5 py-2.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                <BookOpen className="size-4" aria-hidden="true" /> Case study
              </button>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

function CaseStudy({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) d.showModal();
    if (!project && d.open) d.close();
  }, [project]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="case-title"
      className="m-auto w-[min(92vw,42rem)] rounded-2xl border border-line bg-surface p-0 text-ink backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      {project?.caseStudy && (
        <div className="p-7 md:p-10">
          <div className="flex items-start justify-between gap-4">
            <h3 id="case-title" className="font-display text-3xl font-semibold">
              {project.name}
            </h3>
            <button type="button" onClick={onClose} aria-label="Close case study" className="grid size-10 shrink-0 place-items-center rounded-full border border-line">
              <X className="size-4" />
            </button>
          </div>
          <p className="mt-5 leading-relaxed text-muted">{project.caseStudy.summary}</p>
          {project.caseStudy.points && (
            <ul className="mt-5 grid gap-2 text-sm">
              {project.caseStudy.points.map((pt) => (
                <li key={pt}>— {pt}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </dialog>
  );
}
