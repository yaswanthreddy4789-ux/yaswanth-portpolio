import { principles } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

export function Principles() {
  return (
    <section id="principles" aria-labelledby="principles-title" className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionHeading id="principles-title" index="08" eyebrow="Why Work With Me" lines={["How I", "Work."]} accentLine={1} intro="Working principles I hold myself to on every project." />

      <Stagger as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((p, i) => (
          <StaggerItem as="li" key={p.title}>
            <div className="group h-full rounded-2xl border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/50">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 font-display text-lg font-semibold leading-snug">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              <span aria-hidden="true" className="mt-5 block h-px w-8 bg-accent transition-all duration-500 group-hover:w-full" />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
