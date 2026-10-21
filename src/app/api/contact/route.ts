import { NextResponse } from "next/server";
import { validateContact, type ContactInput } from "@/lib/contact";

/**
 * Delivers contact-form submissions by email through Resend (https://resend.com).
 * Secrets stay on the server: set RESEND_API_KEY and CONTACT_TO_EMAIL in the
 * Vercel project settings (never in client code). Until they are set this
 * endpoint answers 503 so the UI never claims a message was delivered.
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
    projectType: str("projectType").trim(),
    budget: str("budget").trim(),
    message: str("message").trim(),
  };
  const errors = validateContact(input);
  if (Object.keys(errors).length) return NextResponse.json({ error: "validation", fields: errors }, { status: 422 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";
  const subject = `New enquiry: ${input.projectType} — ${input.name}`.replace(/[\r\n]+/g, " ");
  const text = `Name: ${input.name}\nEmail: ${input.email}\nProject type: ${input.projectType}\nBudget: ${input.budget || "—"}\n\n${input.message}`;
  const html = `<p><b>Name:</b> ${esc(input.name)}<br><b>Email:</b> ${esc(input.email)}<br><b>Project type:</b> ${esc(input.projectType)}<br><b>Budget:</b> ${esc(input.budget || "—")}</p><p style="white-space:pre-wrap">${esc(input.message)}</p>`;

  try {
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
  } catch (err) {
    console.error("Contact delivery exception", err);
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }
}
