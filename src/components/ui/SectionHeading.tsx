import { MaskLines, Reveal } from "./Reveal";

export function SectionHeading({
  index,
  eyebrow,
  lines,
  accentLine,
  intro,
  id,
}: {
  index: string;
  eyebrow: string;
  lines: string[];
  accentLine?: number;
  intro?: string;
  id: string;
}) {
  return (
    <header className="mb-12 max-w-4xl md:mb-16">
      <Reveal>
        <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-accent">{index}</span>
          <span className="h-px w-10 bg-line" aria-hidden="true" />
          {eyebrow}
        </p>
      </Reveal>
      <h2 id={id} className="font-display text-[clamp(2.4rem,7vw,5.2rem)] font-semibold leading-[0.98] tracking-tight">
        <MaskLines lines={lines} accentLine={accentLine} />
      </h2>
      {intro && (
        <Reveal delay={0.15}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{intro}</p>
        </Reveal>
      )}
    </header>
  );
}

/** Thin animated divider between sections. */
export function Divider() {
  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8" aria-hidden="true">
      <Reveal y={0}>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-line to-transparent" />
      </Reveal>
    </div>
  );
}
