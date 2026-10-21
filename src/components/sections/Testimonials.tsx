import { achievements, testimonials } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";

/** Renders only when real entries exist in src/config/content.ts. */
export function Testimonials() {
  if (!testimonials.length && !achievements.length) return null;
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionHeading id="testimonials-title" index="08" eyebrow="Client Feedback" lines={["Words From", "Clients."]} accentLine={1} />

      {testimonials.length > 0 && (
        <Stagger className="grid gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <StaggerItem key={t.name + t.quote.slice(0, 12)}>
              <figure className="h-full rounded-2xl border border-line bg-surface p-7">
                <blockquote className="text-lg leading-relaxed">“{t.quote}”</blockquote>
                <figcaption className="mt-5 text-sm text-muted">
                  <span className="text-ink">{t.name}</span>
                  {(t.role || t.company) && ` — ${[t.role, t.company].filter(Boolean).join(", ")}`}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      {achievements.length > 0 && (
        <Stagger as="ul" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a) => (
            <StaggerItem as="li" key={a.title} className="rounded-xl border border-line px-5 py-4">
              <p className="font-medium">{a.title}</p>
              <p className="text-sm text-muted">{[a.issuer, a.year].filter(Boolean).join(" · ")}</p>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </section>
  );
}
