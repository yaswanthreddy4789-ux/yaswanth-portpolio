import Image from "next/image";
import { toolkit } from "@/config/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

function monogram(name: string) {
  const w = name.replace(/\.js$/i, "").split(/[\s.]+/).filter(Boolean);
  return (w.length > 1 ? w[0][0] + w[1][0] : name.slice(0, 2)).toUpperCase();
}

export function Toolkit() {
  return (
    <section id="toolkit" aria-labelledby="toolkit-title" className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionHeading id="toolkit-title" index="06" eyebrow="Technology Toolkit" lines={["The Tools", "I Work With."]} accentLine={1} />

      <div className="grid gap-10">
        {toolkit.map((g) => (
          <Reveal key={g.group}>
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">{g.group}</h3>
            <Stagger as="ul" className="flex flex-wrap gap-3">
              {g.items.map((t) => (
                <StaggerItem as="li" key={t.name}>
                  <div className="group flex items-center gap-3 rounded-xl border border-line bg-surface py-2.5 pl-2.5 pr-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60">
                    <span className="grid size-9 place-items-center rounded-lg bg-bg font-mono text-xs font-semibold text-accent transition-colors group-hover:bg-accent group-hover:text-black">
                      {t.logo ? <Image src={t.logo} alt="" width={20} height={20} /> : monogram(t.name)}
                    </span>
                    <span className="text-sm font-medium">{t.name}</span>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
