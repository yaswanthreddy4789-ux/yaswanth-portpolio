import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { emailHref, site, visibleSocials } from "@/config/site";
import { MaskLines, Reveal } from "@/components/ui/Reveal";

/** Contact details only. The quote form lives on the services pages. */
export function Contact() {
  const whatsapp = site.socials.find((s) => s.label === "WhatsApp" && s.href);
  const hireHref = site.servicesUrl ? `${site.servicesUrl}/services` : "/services";
  const hireExternal = Boolean(site.servicesUrl);

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
      <Reveal>
        <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <span className="text-accent">10</span>
          <span className="h-px w-10 bg-line" aria-hidden="true" />
          Contact
        </p>
      </Reveal>
      <h2 id="contact-title" className="font-display text-[clamp(2.4rem,6.5vw,5rem)] font-semibold leading-[0.98] tracking-tight">
        <MaskLines lines={["Have a", "Project in Mind?"]} accentLine={1} />
      </h2>

      <Reveal delay={0.15}>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{site.contact.text}</p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <a href={emailHref} className="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent">
            <Mail className="size-6 text-accent" aria-hidden="true" />
            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted">Email</p>
            <p className="mt-1 break-all text-lg font-medium group-hover:text-accent">{site.contact.email}</p>
          </a>
          <a href={site.contact.phoneHref} className="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent">
            <Phone className="size-6 text-accent" aria-hidden="true" />
            <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted">Phone</p>
            <p className="mt-1 text-lg font-medium group-hover:text-accent">{site.contact.phone}</p>
          </a>
          {whatsapp && (
            <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent">
              <MessageCircle className="size-6 text-accent" aria-hidden="true" />
              <p className="mt-6 font-mono text-[11px] uppercase tracking-widest text-muted">WhatsApp</p>
              <p className="mt-1 text-lg font-medium group-hover:text-accent">
                Message me<span className="sr-only"> (opens in a new tab)</span>
              </p>
            </a>
          )}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {hireExternal ? (
            <a href={hireHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.04]">
              Request a quote <ArrowUpRight className="size-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : (
            <Link href="/services#quote" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.04]">
              Request a quote <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          )}
          {visibleSocials
            .filter((s) => s.label !== "WhatsApp")
            .map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-accent">
                {s.label} <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ))}
        </div>
      </Reveal>
    </section>
  );
}
