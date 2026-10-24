import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { site } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Resume",
  description: `${site.name}'s resume: WordPress, WooCommerce, Shopify and Wix developer. View it online or download the PDF.`,
  alternates: { canonical: "/resume" },
};

export default function ResumePage() {
  return (
    <div id="home">
      <Navbar base="/" />
      <main id="main" className="mx-auto max-w-5xl px-5 pb-20 pt-32 md:px-8 md:pt-36">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Resume</p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,4.6rem)] font-semibold leading-[1] tracking-tight">{site.name}</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{site.title}. View the resume below or download the PDF.</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={site.resume.file}
            download
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.04]"
          >
            <Download className="size-4" aria-hidden="true" /> Download PDF
          </a>
          <a
            href={site.resume.file}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
          >
            Open in a new tab <ExternalLink className="size-4" aria-hidden="true" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
          <object data={`${site.resume.file}#view=FitH`} type="application/pdf" aria-label={`${site.name} resume (PDF)`} className="h-[80vh] min-h-[28rem] w-full">
            <div className="grid h-full place-items-center p-10 text-center">
              <p className="max-w-sm text-muted">
                Your browser can&apos;t show PDFs inline.{" "}
                <a href={site.resume.file} download className="font-semibold text-accent underline">
                  Download the resume
                </a>{" "}
                instead.
              </p>
            </div>
          </object>
        </div>
      </main>
      <Footer base="/" />
    </div>
  );
}
