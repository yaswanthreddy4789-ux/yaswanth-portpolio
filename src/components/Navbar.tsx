"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { Magnetic } from "@/components/ui/Interactions";

/** Opens the separate services website when NEXT_PUBLIC_SERVICES_URL is set, otherwise scrolls to Contact. */
const hire = site.servicesUrl ? { href: site.servicesUrl, target: "_blank" as const, rel: "noopener noreferrer" } : null;

/** `base` is "" on the home page and "/" on sub-pages so hash links go back home. */
export function Navbar({ base = "" }: { base?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(base ? "" : "home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (base) return; // sub-pages have no home sections to track
    const ids = site.nav.filter((n) => n.href.startsWith("#")).map((n) => n.href.slice(1));
    const els = ids.map((id) => document.getElementById(id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [base]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  const link = (href: string) => (href.startsWith("/") ? href : `${base}${href}`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-line bg-bg/80 py-3 backdrop-blur-xl" : "py-5"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href={link("#home")} className="font-display text-xl font-semibold tracking-tight" aria-label={`${site.name} — home`} onClick={() => setOpen(false)}>
          {site.initials}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {site.nav.map((n) => {
            const on = active === n.href.slice(1);
            return (
              <li key={n.href}>
                <a
                  href={link(n.href)}
                  aria-current={on ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${on ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  {on && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/[0.07]" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">{n.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <Magnetic strength={0.25} className="hidden lg:inline-block">
          <a {...(hire ?? { href: link("#contact") })} className="inline-block rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.04] active:scale-95">
            Hire me
          </a>
        </Magnetic>

        <button
          type="button"
          className="grid size-11 place-items-center rounded-full border border-line lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-x-0 top-[61px] h-[calc(100dvh-61px)] overflow-y-auto bg-bg/95 px-5 pb-10 pt-6 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul className="flex flex-col">
              {site.nav.map((n, i) => (
                <motion.li key={n.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i }}>
                  <a
                    href={link(n.href)}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-line py-4 font-display text-3xl font-semibold"
                  >
                    {n.label}
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a {...(hire ?? { href: link("#contact") })} onClick={() => setOpen(false)} className="mt-8 block rounded-full bg-accent py-4 text-center font-semibold text-black">
              Hire me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
