import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import { site } from "@/config/site";
import { Providers } from "@/components/Providers";
import { CursorGlow, ScrollProgress } from "@/components/ui/Interactions";
import "./globals.css";

const body = Geist({ variable: "--font-body", subsets: ["latin"], display: "swap" });
const display = Space_Grotesk({ variable: "--font-space", subsets: ["latin"], display: "swap" });
const mono = Geist_Mono({ variable: "--font-mono-next", subsets: ["latin"], display: "swap" });

const fullTitle = `${site.name} — ${site.seo.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: fullTitle, template: `%s | ${site.name}` },
  description: site.seo.description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.name} Portfolio`,
    title: fullTitle,
    description: site.seo.description,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image", title: fullTitle, description: site.seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: site.theme.bg,
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = site.theme;
  const vars = {
    "--bg": t.bg,
    "--surface": t.surface,
    "--surface2": t.surface2,
    "--line": t.line,
    "--ink": t.ink,
    "--muted": t.muted,
    "--accent": t.accent,
  } as CSSProperties;

  return (
    <html lang="en" className={`${body.variable} ${display.variable} ${mono.variable}`} style={vars}>
      <body className="min-h-screen antialiased">
        <noscript>
          <style>{`.preloader{display:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-black focus:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <ScrollProgress />
          <CursorGlow />
          {children}
        </Providers>
      </body>
    </html>
  );
}
