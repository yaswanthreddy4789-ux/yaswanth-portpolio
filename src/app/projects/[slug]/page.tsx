import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { site } from "@/config/site";
import { projects } from "@/config/projects";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { Reveal } from "@/components/ui/Reveal";

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.filter((p) => !p.placeholder).map((p) => ({ slug: p.slug }));
}

const real = projects.filter((p) => !p.placeholder);
const find = (slug: string) => real.find((p) => p.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = find(slug);
  if (!p) return {};
  const title = `${p.name} — ${p.category} case study`;
  const description = p.description.length > 155 ? p.description.slice(0, 152).trimEnd() + "…" : p.description;
  return {
    title,
    description,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: `/projects/${p.slug}`,
      type: "article",
      images: p.image ? [{ url: p.image, alt: p.imageAlt ?? p.name }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = find(slug);
  if (!p) notFound();

  const i = real.findIndex((x) => x.slug === slug);
  const prev = real[(i - 1 + real.length) % real.length];
  const next = real[(i + 1) % real.length];
  // Scope-of-work bullets are the project description's own sentences, nothing added.
  const scope = p.description.split(/(?<=\.)\s+(?=[A-Z])/).map((s) => s.trim()).filter(Boolean);
  const hire = site.servicesUrl ? `${site.servicesUrl}/services` : "/services#quote";
  const hireExternal = Boolean(site.servicesUrl);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: p.description,
    creator: { "@type": "Person", name: site.name, url: site.url },
    url: `${site.url}/projects/${p.slug}`,
    ...(p.image ? { image: `${site.url}${p.image}` } : {}),
    ...(p.url ? { sameAs: p.url } : {}),
  };

  return (
    <div id="home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Navbar base="/" />
      <main id="main" className="mx-auto max-w-5xl px-5 pb-20 pt-32 md:px-8 md:pt-36">
        <Reveal y={16}>
          <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent">
            <ArrowLeft className="size-4" aria-hidden="true" /> All projects
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {p.category} <span className="text-muted">· Case study</span>
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,5rem)] font-semibold leading-[1] tracking-tight">{p.name}</h1>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-8 grid gap-4 border-y border-line py-6 sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">Role</dt>
              <dd className="mt-1">{p.role}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">Platform</dt>
              <dd className="mt-1">{p.category}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-widest text-muted">Live site</dt>
              <dd className="mt-1">
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline">
                    {p.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} <ArrowUpRight className="size-4" aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  "Not public"
                )}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.1} y={40}>
          <div className="mt-10">
            <BrowserMockup
              variant={p.mockup}
              image={p.image}
              alt={p.imageAlt ?? `${p.name} website screenshot`}
              label={p.url ? p.url.replace(/^https?:\/\//, "") : "yourproject.com"}
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
            />
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">Overview</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{scope[0]}</p>
            {scope.length > 1 && (
              <>
                <h2 className="mt-10 font-display text-2xl font-semibold">Scope of work</h2>
                <ul className="mt-4 grid gap-3">
                  {scope.slice(1).map((s) => (
                    <li key={s} className="flex items-start gap-3 text-ink/90">
                      <Check className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" />
                      {s}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {p.results && p.results.length > 0 && (
              <>
                <h2 className="mt-10 font-display text-2xl font-semibold">Results</h2>
                <ul className="mt-4 grid gap-2">
                  {p.results.map((r) => (
                    <li key={r} className="rounded-xl border border-line bg-surface px-4 py-3">
                      {r}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="font-display text-2xl font-semibold">Technologies</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal>
          <div className="mt-16 rounded-2xl border border-line bg-surface p-8 md:p-10">
            <h2 className="font-display text-3xl font-semibold">Have a similar project?</h2>
            <p className="mt-3 max-w-xl text-muted">Tell me about your website or store and what you want it to achieve.</p>
            <a
              href={hire}
              {...(hireExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.04]"
            >
              Request a quote <ArrowUpRight className="size-4" aria-hidden="true" />
              {hireExternal && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </div>
        </Reveal>

        <nav aria-label="More projects" className="mt-12 grid gap-4 sm:grid-cols-2">
          <Link href={`/projects/${prev.slug}`} className="group rounded-2xl border border-line p-6 transition-colors hover:border-accent">
            <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted">
              <ArrowLeft className="size-3.5" aria-hidden="true" /> Previous
            </span>
            <span className="mt-2 block font-display text-xl font-semibold group-hover:text-accent">{prev.name}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className="group rounded-2xl border border-line p-6 text-right transition-colors hover:border-accent">
            <span className="flex items-center justify-end gap-2 font-mono text-[11px] uppercase tracking-widest text-muted">
              Next <ArrowRight className="size-3.5" aria-hidden="true" />
            </span>
            <span className="mt-2 block font-display text-xl font-semibold group-hover:text-accent">{next.name}</span>
          </Link>
        </nav>
      </main>
      <Footer base="/" />
    </div>
  );
}
