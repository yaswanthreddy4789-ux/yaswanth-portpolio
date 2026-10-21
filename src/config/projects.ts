/**
 * PROJECTS — add, remove, or edit entries here. The gallery, filters and
 * "linked projects" in the Expertise section all read from this file.
 *
 * Entries with `placeholder: true` show a visible "Placeholder" badge and have no
 * links. Replace them with real work and delete that flag.
 *
 * Screenshots: drop images in /public/projects/ and set `image: "/projects/name.jpg"`
 * (recommended 1440×900). Without an image a generated mockup is shown.
 */

export type ProjectCategory =
  | "WordPress"
  | "WooCommerce"
  | "Shopify"
  | "Wix"
  | "WPBakery"
  | "Other CMS"
  | "Custom Development";

export const projectCategories: ProjectCategory[] = [
  "WordPress",
  "WooCommerce",
  "Shopify",
  "Wix",
  "WPBakery",
  "Other CMS",
  "Custom Development",
];

export type Project = {
  slug: string;
  name: string;
  category: ProjectCategory;
  /** Platform / technology tags */
  stack: string[];
  description: string;
  /** Your role on the project */
  role: string;
  /** Screenshot path in /public, e.g. "/projects/acme.jpg" */
  image?: string;
  imageAlt?: string;
  /** Live URL. Omit if there isn't one — no button is shown. */
  url?: string;
  /** Optional case study shown in a dialog */
  caseStudy?: { summary: string; points?: string[] };
  /** ONLY verified, real results you can stand behind */
  results?: string[];
  /** Skill ids from skills.ts used to link this project to the Expertise cards */
  skills: string[];
  /** Controls the generated mockup when no image is set */
  mockup: "wordpress" | "shop" | "wix" | "bakery" | "custom";
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "2pi-mind-math",
    name: "2PI Mind Math",
    category: "WordPress",
    stack: ["WordPress", "The7 theme", "SEO setup", "Responsive"],
    description:
      "Redesign of the website for a math tutoring center in McKinney, TX, built on WordPress with on-page SEO checks (heading hierarchy, meta details, alt text, schema) and responsive and form testing.",
    role: "Developer (team project)",
    image: "/projects/2pi-mind-math.jpg",
    imageAlt: "Homepage of the 2PI Mind Math website",
    url: "https://2pimindmath.com/",
    skills: ["wordpress", "frontend"],
    mockup: "wordpress",
  },
  {
    slug: "cardoso-law-firm",
    name: "Cardoso Law Firm",
    category: "WordPress",
    stack: ["WordPress", "Beyond theme", "SEO setup", "Responsive"],
    description:
      "WordPress website for a Florida estate planning law firm, with a clean heading structure, image alt text, caching and backups configured, and responsive testing.",
    role: "Developer",
    image: "/projects/cardoso-law-firm.jpg",
    imageAlt: "Homepage of the Cardoso Law Firm website",
    url: "https://cardosoestateplanningfirm.com/",
    skills: ["wordpress", "backend"],
    mockup: "wordpress",
  },
  {
    slug: "guardpro-restoration",
    name: "GuardPro Restoration",
    category: "WordPress",
    stack: ["WordPress", "Hello Elementor", "Elementor", "SEO setup", "Schema"],
    description:
      "WordPress website for a South Florida water, fire and mold restoration company, with heading structure, meta details, alt text and schema markup configured.",
    role: "Developer (team project)",
    image: "/projects/guardpro.jpg",
    imageAlt: "Homepage of the GuardPro Restoration website",
    url: "https://guardprorestoration.com/",
    skills: ["wordpress", "frontend"],
    mockup: "wordpress",
  },
  {
    slug: "enlace-ganadero",
    name: "Enlace Ganadero",
    category: "WordPress",
    stack: ["WordPress", "Hello Elementor", "SEO setup", "Spanish content"],
    description:
      "WordPress website for a Venezuelan agricultural marketplace platform, with a Spanish-language launch page, SEO basics and responsive testing.",
    role: "Developer",
    image: "/projects/enlace.jpg",
    imageAlt: "Homepage of the Enlace Ganadero website",
    url: "https://enlaceganadero.com/",
    skills: ["wordpress"],
    mockup: "wordpress",
  },
  {
    slug: "halcon-marketing",
    name: "HALCON Marketing",
    category: "Wix",
    stack: ["Wix", "Responsive Layout", "SEO setup", "Schema"],
    description:
      "Wix website for a St. Louis brand strategy and marketing agency, with responsive layouts plus heading hierarchy, meta details, alt text and schema markup.",
    role: "Developer (team project)",
    image: "/projects/halcon-marketing.jpg",
    imageAlt: "Homepage of the HALCON Marketing website",
    url: "https://www.halconmarketing.com/",
    skills: ["wix", "frontend"],
    mockup: "wix",
  },
  {
    slug: "syndell-technologies",
    name: "Syndell Technologies",
    category: "WordPress",
    stack: ["WordPress", "Hello Elementor", "Caching", "SEO setup"],
    description:
      "Ongoing development and maintenance of the WordPress company website for a software and AI engineering firm.",
    role: "Developer (company website)",
    image: "/projects/syndell.jpg",
    imageAlt: "Homepage of the Syndell Technologies website",
    url: "https://syndelltech.com/",
    skills: ["wordpress", "backend"],
    mockup: "wordpress",
  },

  // ---- Placeholders: replace with real projects in these categories ----
  {
    slug: "placeholder-woocommerce",
    name: "WooCommerce Project",
    category: "WooCommerce",
    stack: ["WordPress", "WooCommerce"],
    description: "Placeholder: describe the online store, products, payments and customizations you built.",
    role: "Your role",
    skills: ["wordpress"],
    mockup: "shop",
    placeholder: true,
  },
  {
    slug: "placeholder-shopify",
    name: "Shopify Project",
    category: "Shopify",
    stack: ["Shopify", "Liquid", "Theme Customization"],
    description: "Placeholder: describe the store, the customizations you made, and the experience you improved.",
    role: "Your role",
    skills: ["shopify", "frontend"],
    mockup: "shop",
    placeholder: true,
  },
  {
    slug: "placeholder-wpbakery",
    name: "WPBakery Project",
    category: "WPBakery",
    stack: ["WordPress", "WPBakery", "Custom CSS"],
    description: "Placeholder: describe the page-builder work, reusable layouts, or existing site you customized.",
    role: "Your role",
    skills: ["wpbakery", "wordpress"],
    mockup: "bakery",
    placeholder: true,
  },
  {
    slug: "placeholder-other-cms",
    name: "Other CMS Project",
    category: "Other CMS",
    stack: ["Your platform"],
    description: "Placeholder: any other CMS or builder you have used (e.g. Webflow, Squarespace, Unbounce).",
    role: "Your role",
    skills: ["frontend"],
    mockup: "custom",
    placeholder: true,
  },
  {
    slug: "placeholder-custom",
    name: "Custom Development Project",
    category: "Custom Development",
    stack: ["React", "Next.js", "APIs"],
    description: "Placeholder: describe the custom build, integration, or interactive experience.",
    role: "Your role",
    skills: ["frontend", "backend"],
    mockup: "custom",
    placeholder: true,
  },
];
