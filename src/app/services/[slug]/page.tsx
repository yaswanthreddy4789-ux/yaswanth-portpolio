import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { site } from "@/config/site";
import { services } from "@/config/content";
import { getServicePage, servicePages } from "@/config/service-pages";
import { Footer } from "@/components/Footer";
import { Icon } from "@/components/ui/icons";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getServicePage(slug);
  if (!p) return {};
  return {
    title: p.seoTitle,
    description: p.seoDescription,
    alternates: { canonical: `/services/${p.id}` },
    openGraph: { title: `${p.seoTitle} | ${site.name}`, description: p.seoDescription, url: `/services/${p.id}`, type: "website" },
  };
}

export default async function ServicePageRoute({ params }: Props) {
  const { slug } = await params;
  const p = getServicePage(slug);
  const svc = services.find((s) => s.id === slug);
  if (!p || !svc) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: svc.title,
      description: p.seoDescription,
      provider: { "@type": "Person", name: site.name, url: site.url },
      url: `${site.url}/services/${p.id}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];
  const others = servicePages.filter((s) => s.id !== p.id);

  return (
    <div id="home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="border-b border-line">
        <nav aria-label="Primary" className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 md:px-8">
          <Link href="/" className="font-display text-xl font-semibold" aria-label={`${site.name} — home`}>
            {site.initials}
            <span className="text-accent">.</span>
          </Link>
          <Link href="/#services" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent">
            <ArrowLeft className="size-4" aria-hidden="true" /> All services
          </Link>
        </nav>
      </header>

      <main id="main" className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
        <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <Icon name={svc.icon} className="size-4 text-accent" /> {svc.title}
        </p>
        <h1 className="font-display text-[clamp(2.2rem,6vw,4.4rem)] font-semibold leading-[1.02] tracking-tight">{p.headline}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{p.intro}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/#contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.04]">
            Get a free quote <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <a href={site.socials.find((s) => s.label === "WhatsApp")?.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full border border-line px-7 py-3.5 text-sm font-semibold hover:border-accent hover:text-accent">
            Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <section aria-labelledby="deliver" className="mt-20 grid gap-10 md:grid-cols-2">
          <div>
            <h2 id="deliver" className="font-display text-2xl font-semibold">What you get</h2>
            <ul className="mt-5 grid gap-3">
              {p.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-ink/90">
                  <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-7">
            <h2 className="font-display text-2xl font-semibold">Who this is for</h2>
            <p className="mt-4 leading-relaxed text-muted">{p.fit}</p>
          </div>
        </section>

        <section aria-labelledby="faq" className="mt-20">
          <h2 id="faq" className="font-display text-2xl font-semibold">Frequently asked questions</h2>
          <div className="mt-6 grid gap-3">
            {p.faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-line bg-surface p-5 open:border-accent/50">
                <summary className="cursor-pointer list-none font-medium marker:hidden">{f.q}</summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="more" className="mt-20">
          <h2 id="more" className="font-display text-2xl font-semibold">Other services</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.id}>
                <Link href={`/services/${o.id}`} className="inline-block rounded-full border border-line px-4 py-2 text-sm hover:border-accent hover:text-accent">
                  {services.find((s) => s.id === o.id)?.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer base="/" />
    </div>
  );
}
