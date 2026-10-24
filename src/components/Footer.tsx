"use client";

import { useSyncExternalStore } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { emailHref, site, visibleSocials } from "@/config/site";

const subscribeNoop = () => () => {};

export function Footer({ base = "" }: { base?: string }) {
  // Server snapshot is a fixed fallback; the client swaps in the live year after hydration.
  const year = useSyncExternalStore(subscribeNoop, () => new Date().getFullYear(), () => 2026);

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl font-semibold">
              {site.name}
              <span className="text-accent">.</span>
            </p>
            <p className="mt-3 max-w-sm text-muted">{site.tagline}</p>
            <div className="mt-5 grid gap-1 text-sm"><a href={emailHref} className="hover:text-accent">{site.contact.email}</a><a href={site.contact.phoneHref} className="hover:text-accent">{site.contact.phone}</a></div>
          </div>
          <nav aria-label="Footer">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">Navigate</p>
            <ul className="grid gap-2 text-sm">
              {site.nav.map((n) => (
                <li key={n.href}><a href={n.href.startsWith("/") ? n.href : `${base}${n.href}`} className="text-ink/90 hover:text-accent">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          {visibleSocials.length > 0 && (
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">Elsewhere</p>
              <ul className="grid gap-2 text-sm">
                {visibleSocials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-ink/90 hover:text-accent">
                      {s.label}<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-muted">
          <p>© <span suppressHydrationWarning>{year}</span> {site.name}. All rights reserved.</p>
          <motion.a
            href="#home"
            whileHover={{ y: -3 }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Back to top <ArrowUp className="size-4" aria-hidden="true" />
          </motion.a>
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden whitespace-nowrap text-center font-display text-[clamp(5rem,22vw,20rem)] font-semibold leading-[0.8] tracking-tighter text-white/[0.025]">
        {site.initials}
      </div>
    </footer>
  );
}
