"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CheckCircle2, Loader2, Mail, Phone } from "lucide-react";
import { emailHref, site, visibleSocials } from "@/config/site";
import { services } from "@/config/content";
import { validateContact, type ContactInput, type FieldErrors } from "@/lib/contact";
import { MaskLines, Reveal } from "@/components/ui/Reveal";

const empty: ContactInput = { name: "", email: "", projectType: "", budget: "", message: "" };
const projectTypes = [...services.map((s) => s.title), "Something else"];

type Status = "idle" | "sending" | "success" | "error";

export function Contact() {
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [honey, setHoney] = useState("");
  const openedAt = useRef(0);

  useEffect(() => {
    openedAt.current = Date.now();
  }, []);

  const set = (k: keyof ContactInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const errs = validateContact(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = (Object.keys(errs) as (keyof ContactInput)[])[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honey, elapsed: Date.now() - openedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        setValues(empty);
        return;
      }
      if (res.status === 422 && data.fields) setErrors(data.fields);
      setErrorMsg(
        data.error === "not_configured"
          ? "The contact form isn't connected yet. Please email me directly instead."
          : data.error === "rate_limited"
            ? "Too many attempts. Please wait a few minutes or email me directly."
            : "Something went wrong sending your message. Please try again or email me directly.",
      );
      setStatus("error");
    } catch {
      setErrorMsg("Network error. Please check your connection or email me directly.");
      setStatus("error");
    }
  }

  const field = "w-full rounded-xl border bg-bg px-4 py-3.5 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-accent";
  const cls = (k: keyof ContactInput) => `${field} ${errors[k] ? "border-red-400" : "border-line"}`;
  const err = (k: keyof ContactInput) =>
    errors[k] ? (
      <p id={`e-${k}`} role="alert" className="mt-1.5 text-sm text-red-400">
        {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof ContactInput) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <span className="text-accent">09</span>
              <span className="h-px w-10 bg-line" aria-hidden="true" />
              Contact
            </p>
          </Reveal>
          <h2 id="contact-title" className="font-display text-[clamp(2.4rem,6.5vw,5rem)] font-semibold leading-[0.98] tracking-tight">
            <MaskLines lines={["Have a", "Project in Mind?"]} accentLine={1} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">{site.contact.text}</p>
            <ul className="mt-10 grid gap-3">
              <li>
                <a href={emailHref} className="group inline-flex items-center gap-3 text-lg hover:text-accent">
                  <Mail className="size-5 text-accent" aria-hidden="true" />
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a href={site.contact.phoneHref} className="inline-flex items-center gap-3 text-lg hover:text-accent">
                  <Phone className="size-5 text-accent" aria-hidden="true" />
                  {site.contact.phone}
                </a>
              </li>
              {visibleSocials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted hover:text-accent">
                    {s.label} <ArrowUpRight className="size-4" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line bg-surface p-6 md:p-9">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="py-12 text-center" role="status">
                  <CheckCircle2 className="mx-auto size-12 text-accent" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-2xl font-semibold">Message sent</h3>
                  <p className="mt-2 text-muted">Thanks for reaching out. I&apos;ll reply as soon as I can.</p>
                  <button type="button" onClick={() => setStatus("idle")} className="mt-6 rounded-full border border-line px-5 py-2 text-sm hover:border-accent">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-5">
                  <div>
                    <label htmlFor="f-name" className="mb-2 block text-sm font-medium">Name <span className="text-accent" aria-hidden="true">*</span></label>
                    <input id="f-name" name="name" autoComplete="name" required value={values.name} onChange={set("name")} className={cls("name")} {...aria("name")} />
                    {err("name")}
                  </div>
                  <div>
                    <label htmlFor="f-email" className="mb-2 block text-sm font-medium">Email address <span className="text-accent" aria-hidden="true">*</span></label>
                    <input id="f-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={set("email")} className={cls("email")} {...aria("email")} />
                    {err("email")}
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="f-projectType" className="mb-2 block text-sm font-medium">Project type <span className="text-accent" aria-hidden="true">*</span></label>
                      <select id="f-projectType" name="projectType" required value={values.projectType} onChange={set("projectType")} className={cls("projectType")} {...aria("projectType")}>
                        <option value="">Select…</option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      {err("projectType")}
                    </div>
                    {site.contact.budgets.length > 0 && (
                      <div>
                        <label htmlFor="f-budget" className="mb-2 block text-sm font-medium">Budget range <span className="text-muted">(optional)</span></label>
                        <select id="f-budget" name="budget" value={values.budget} onChange={set("budget")} className={cls("budget")}>
                          <option value="">Select…</option>
                          {site.contact.budgets.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="f-message" className="mb-2 block text-sm font-medium">Project description <span className="text-accent" aria-hidden="true">*</span></label>
                    <textarea id="f-message" name="message" rows={5} required value={values.message} onChange={set("message")} className={`${cls("message")} resize-y`} {...aria("message")} />
                    {err("message")}
                  </div>

                  {/* honeypot: hidden from people and assistive tech */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label>
                      Website
                      <input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
                    </label>
                  </div>

                  {status === "error" && (
                    <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                      {errorMsg}{" "}
                      <a href={emailHref} className="underline">{site.contact.email}</a>
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <ArrowUpRight className="size-4" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
