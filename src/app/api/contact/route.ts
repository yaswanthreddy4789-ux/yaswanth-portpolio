import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";
import { site } from "@/config/site";

/**
 * Delivers quote requests by email. Secrets and the recipient stay on the server.
 *
 * Provider order:
 *  1. Resend (https://resend.com) when RESEND_API_KEY is set. Best deliverability.
 *  2. FormSubmit (https://formsubmit.co), a no-signup relay, otherwise. The first
 *     submission triggers an activation email to the recipient; click "Activate Form"
 *     once and every later message is delivered.
 *
 * Recipient: CONTACT_TO_EMAIL, falling back to the email in src/config/site.ts.
 * The API never reports success unless a provider confirmed delivery.
 */

// Best-effort per-instance rate limit. Serverless instances don't share memory,
// so treat this as a speed bump, not a guarantee.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_HITS;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const str = (k: string) => (typeof body[k] === "string" ? (body[k] as string) : "");

  // Spam protection: hidden honeypot + minimum fill time. Bots get a fake success.
  const elapsed = Number(body.elapsed);
  if (str("website") !== "" || !Number.isFinite(elapsed) || elapsed < 2500) {
    return NextResponse.json({ ok: true });
  }

  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const input: ContactInput = {
    name: str("name").trim(),
    email: str("email").trim(),
    businessName: str("businessName").trim(),
    service: str("service").trim(),
    budget: str("budget").trim(),
    contactMethod: str("contactMethod").trim(),
    message: str("message").trim(),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length) return NextResponse.json({ error: "validation", fields: errors }, { status: 422 });

  const to = process.env.CONTACT_TO_EMAIL || site.contact.email;
  const subject = `New quote request: ${input.service} — ${input.name}`.replace(/[\r\n]+/g, " ");
  const lines = [
    ["Name", input.name],
    ["Email", input.email],
    ["Business", input.businessName || "—"],
    ["Service", input.service],
    ["Budget", input.budget || "—"],
    ["Preferred contact", input.contactMethod || "—"],
  ];

  try {
    const key = process.env.RESEND_API_KEY;
    if (key) {
      const from = process.env.CONTACT_FROM_EMAIL || "Quote Requests <onboarding@resend.dev>";
      const text = lines.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\n${input.message}`;
      const html = `<p>${lines.map(([k, v]) => `<b>${k}:</b> ${esc(v)}`).join("<br>")}</p><p style="white-space:pre-wrap">${esc(input.message)}</p>`;
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [to], reply_to: input.email, subject, text, html }),
      });
      if (!res.ok) {
        console.error("Resend error", res.status, await res.text().catch(() => ""));
        return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
      }
      return NextResponse.json({ ok: true });
    }

    // Fallback: FormSubmit relay (no account or API key needed).
    const origin = process.env.NEXT_PUBLIC_SITE_URL || site.url;
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json", Origin: origin, Referer: `${origin}/services` },
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        business: input.businessName || "—",
        service: input.service,
        budget: input.budget || "—",
        preferred_contact: input.contactMethod || "—",
        message: input.message,
        _subject: subject,
        _template: "table",
        _captcha: "false",
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
    if (res.ok && (data.success === true || data.success === "true")) return NextResponse.json({ ok: true });
    console.error("FormSubmit not delivered:", res.status, data.message);
    const needsActivation = /activat/i.test(data.message ?? "");
    return NextResponse.json({ error: needsActivation ? "activation_required" : "delivery_failed" }, { status: 502 });
  } catch (err) {
    console.error("Contact delivery exception", err);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
