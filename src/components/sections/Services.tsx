"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/config/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";



export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <SectionHeading id="services-title" index="05" eyebrow="Services" lines={["What I Can", "Build for You."]} accentLine={1} />

      <Stagger as="ul" className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <StaggerItem as="li" key={s.id} className="bg-bg">
            <Link
              href={`/services/${s.id}`}
              className="group relative flex h-full flex-col p-7 transition-colors duration-300 hover:bg-surface2"
            >
              <Icon name={s.icon} className="size-6 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
              <h3 className="mt-8 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.text}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
                Learn more <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                <span className="sr-only">— {s.title}</span>
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-10">
        <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent">
          View all service pages <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
