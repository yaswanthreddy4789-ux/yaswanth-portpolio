/**
 * SITE CONFIG — the single place for your personal details.
 * Replace every value marked "PLACEHOLDER". Nothing else in the codebase
 * hardcodes your name, links, or contact details.
 */

const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const site = {
  /** PLACEHOLDER: your full name */
  name: "Your Name",
  /** PLACEHOLDER: shown in the preloader and logo (2 letters) */
  initials: "YN",
  /** PLACEHOLDER: your professional title */
  title: "Full-Stack WordPress Developer",
  /** Optional: path to a profile photo in /public (e.g. "/me.jpg"). Leave "" to hide. */
  photo: "",

  /** Canonical site URL. Set NEXT_PUBLIC_SITE_URL in Vercel once you have a domain. */
  url: rawUrl.replace(/\/$/, ""),
  locale: "en_US",

  seo: {
    title: "Full-Stack WordPress, Shopify & Wix Developer Portfolio",
    description:
      "Portfolio of a full-stack WordPress developer who also builds Shopify and Wix websites, WooCommerce stores, and custom web experiences.",
  },

  /** Hero availability badge. Set enabled:false to hide it. */
  availability: {
    enabled: true,
    label: "Available for new projects",
  },

  hero: {
    label: "Portfolio — 2026",
    lines: ["Building Digital", "Experiences", "That Perform."],
    /** Which line (0-based) gets the accent colour */
    accentLine: 2,
    supporting:
      "Full-Stack WordPress Developer | Shopify & Wix Specialist | Creative Web Developer",
    intro:
      "I build modern, responsive, and conversion-focused websites that help businesses establish a powerful digital presence. From custom WordPress development to Shopify stores and interactive web experiences, I turn ideas into functional, engaging digital products.",
    primaryCta: { label: "Explore My Work", href: "#projects" },
    secondaryCta: { label: "Let's Work Together", href: "#contact" },
  },

  contact: {
    heading: "Have a Project in Mind?",
    text: "Let's turn your idea into a website that looks great, works smoothly, and helps your business move forward.",
    /** PLACEHOLDER: your real email. example.com is a reserved, harmless domain. */
    email: "hello@example.com",
    /** Budget options shown in the form. Edit freely; leave [] to hide the field. */
    budgets: ["Under $1,000", "$1,000 – $3,000", "$3,000 – $7,500", "$7,500+", "Not sure yet"],
  },

  /**
   * Social / profile links. Entries with an empty href are hidden automatically,
   * so fill in only the ones you really use.
   */
  socials: [
    { label: "LinkedIn", href: "" },
    { label: "GitHub", href: "" },
    { label: "WhatsApp", href: "" /* e.g. https://wa.me/15551234567 */ },
  ],

  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],

  /** Footer tagline */
  tagline: "Websites that look great, work smoothly, and grow with your business.",

  /** Theme colours — applied as CSS variables in the root layout. */
  theme: {
    accent: "#c8ff2e",
    bg: "#070707",
    surface: "#0f0f0f",
    surface2: "#161616",
    line: "rgba(255,255,255,0.09)",
    ink: "#f5f5f5",
    muted: "#9d9d9d",
  },
} as const;

export const visibleSocials = site.socials.filter((s) => s.href.trim() !== "");
export const emailHref = `mailto:${site.contact.email}`;
