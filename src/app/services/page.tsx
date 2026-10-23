import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { services } from "@/config/content";
import { servicePages } from "@/config/service-pages";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuoteForm } from "@/components/QuoteForm";
import { Icon } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Web Development Services",
  description: "WordPress, WooCommerce, Shopify and Wix development, landing pages, redesigns, integrations and website maintenance.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  return (
    <div id="home">
      <Navbar base="/" />
      <main id="main" className="mx-auto max-w-6xl px-5 pb-24 pt-36 md:px-8">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">Services</p>
        <h1 className="font-display text-[clamp(2.4rem,6.5vw,5rem)] font-semibold leading-[1] tracking-tight">
          Web development services by {site.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">
          Choose a service to see what is included, who it is for and answers to common questions.
        </p>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {servicePages.map((p) => {
            const s = services.find((x) => x.id === p.id)!;
            return (
              <li key={p.id} className="bg-bg">
                <Link href={`/services/${p.id}`} className="group flex h-full flex-col p-7 transition-colors hover:bg-surface2">
                  <Icon name={s.icon} className="size-6 text-accent" />
                  <h2 className="mt-8 font-display text-xl font-semibold">{s.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.text}</p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold group-hover:text-accent">
                    Learn more <ArrowUpRight className="size-4" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <section id="quote" aria-labelledby="quote-title" className="mt-24 scroll-mt-24">
          <h2 id="quote-title" className="font-display text-3xl font-semibold md:text-4xl">Request a quote</h2>
          <p className="mb-6 mt-3 max-w-2xl text-muted">Tell me about your project and I will reply with next steps and an estimate based on scope.</p>
          <QuoteForm />
        </section>
      </main>
      <Footer base="/" />
    </div>
  );
}
