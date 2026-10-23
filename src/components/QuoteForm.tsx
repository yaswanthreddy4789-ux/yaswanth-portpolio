"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { emailHref, site } from "@/config/site";
import { services } from "@/config/content";
import { validateContact, type ContactInput, type FieldErrors } from "@/lib/contact";

const serviceOptions = [...services.map((s) => s.title), "Something else"];
const contactMethods = ["Email", "WhatsApp", "Phone call"];

type Status = "idle" | "sending" | "success" | "error";

/** Quote-request form. `defaultService` preselects a service (used on service pages). */
export function QuoteForm({ defaultService = "" }: { defaultService?: string }) {
  const empty: ContactInput = { name: "", email: "", businessName: "", service: defaultService, budget: "", contactMethod: "", message: "" };
  const [values, setValues] = useState<ContactInput>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [honey, setHoney] = useState("");
  // Time the form first rendered on the client; the server rejects instant (bot) submissions.
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
        data.error === "rate_limited"
          ? "Too many attempts. Please wait a few minutes or email me directly."
          : "Your message could not be delivered right now. Please email me directly instead.",
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
  const star = <span className="text-accent" aria-hidden="true"> *</span>;
  const opt = <span className="text-muted"> (optional)</span>;

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 md:p-9">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="py-12 text-center" role="status">
            <CheckCircle2 className="mx-auto size-12 text-accent" aria-hidden="true" />
            <h3 className="mt-5 font-display text-2xl font-semibold">Request sent</h3>
            <p className="mt-2 text-muted">Thanks for reaching out. I&apos;ll reply as soon as I can.</p>
            <button type="button" onClick={() => setStatus("idle")} className="mt-6 rounded-full border border-line px-5 py-2 text-sm hover:border-accent">
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="f-name" className="mb-2 block text-sm font-medium">Name{star}</label>
                <input id="f-name" name="name" autoComplete="name" required value={values.name} onChange={set("name")} className={cls("name")} {...aria("name")} />
                {err("name")}
              </div>
              <div>
                <label htmlFor="f-email" className="mb-2 block text-sm font-medium">Email address{star}</label>
                <input id="f-email" name="email" type="email" autoComplete="email" required value={values.email} onChange={set("email")} className={cls("email")} {...aria("email")} />
                {err("email")}
              </div>
            </div>

            <div>
              <label htmlFor="f-businessName" className="mb-2 block text-sm font-medium">Business name{opt}</label>
              <input id="f-businessName" name="businessName" autoComplete="organization" value={values.businessName} onChange={set("businessName")} className={cls("businessName")} {...aria("businessName")} />
              {err("businessName")}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="f-service" className="mb-2 block text-sm font-medium">Service needed{star}</label>
                <select id="f-service" name="service" required value={values.service} onChange={set("service")} className={cls("service")} {...aria("service")}>
                  <option value="">Select…</option>
                  {serviceOptions.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {err("service")}
              </div>
              {site.contact.budgets.length > 0 && (
                <div>
                  <label htmlFor="f-budget" className="mb-2 block text-sm font-medium">Budget range{opt}</label>
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
              <label htmlFor="f-contactMethod" className="mb-2 block text-sm font-medium">Preferred contact method{opt}</label>
              <select id="f-contactMethod" name="contactMethod" value={values.contactMethod} onChange={set("contactMethod")} className={cls("contactMethod")}>
                <option value="">No preference</option>
                {contactMethods.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="f-message" className="mb-2 block text-sm font-medium">Project description{star}</label>
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
                  Request a quote <ArrowUpRight className="size-4" aria-hidden="true" />
                </>
              )}
            </button>
            <p className="text-xs leading-relaxed text-muted">
              Your details are used only to reply to this enquiry and are sent by email to {site.name}. They are not added to any mailing list.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
