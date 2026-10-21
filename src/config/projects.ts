/**
 * PROJECTS — add, remove, or edit entries here. The gallery, filters and
 * "linked projects" in the Expertise section all read from this file.
 *
 * The entries below are PLACEHOLDERS (placeholder: true). They show a visible
 * "Placeholder" badge and have no links. Replace them with your real work and
 * remove `placeholder: true`.
 *
 * Screenshots: drop images in /public/projects/ and set `image: "/projects/name.jpg"`
 * (recommended 1600×1000, ~16:10). Without an image a generated mockup is shown.
 */

export type ProjectCategory = "WordPress" | "Shopify" | "Wix" | "WPBakery" | "Custom Development";

export const projectCategories: ProjectCategory[] = [
  "WordPress",
  "Shopify",
  "Wix",
  "WPBakery",
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
    slug: "placeholder-wordpress",
    name: "Project Name One",
    category: "WordPress",
    stack: ["WordPress", "Custom Theme", "PHP"],
    description:
      "Placeholder: describe the business, the problem, and what you built in two or three sentences.",
    role: "Your role (e.g. Developer)",
    skills: ["wordpress", "backend"],
    mockup: "wordpress",
    placeholder: true,
  },
  {
    slug: "placeholder-shopify",
    name: "Project Name Two",
    category: "Shopify",
    stack: ["Shopify", "Liquid", "Theme Customization"],
    description:
      "Placeholder: describe the store, the customizations you made, and the experience you improved.",
    role: "Your role",
    skills: ["shopify", "frontend"],
    mockup: "shop",
    placeholder: true,
  },
  {
    slug: "placeholder-wix",
    name: "Project Name Three",
    category: "Wix",
    stack: ["Wix", "Responsive Layout"],
    description:
      "Placeholder: describe the Wix website you designed or customized and for whom.",
    role: "Your role",
    skills: ["wix"],
    mockup: "wix",
    placeholder: true,
  },
  {
    slug: "placeholder-wpbakery",
    name: "Project Name Four",
    category: "WPBakery",
    stack: ["WordPress", "WPBakery", "Custom CSS"],
    description:
      "Placeholder: describe the page-builder work, reusable layouts, or existing site you customized.",
    role: "Your role",
    skills: ["wpbakery", "wordpress"],
    mockup: "bakery",
    placeholder: true,
  },
  {
    slug: "placeholder-custom",
    name: "Project Name Five",
    category: "Custom Development",
    stack: ["React", "Next.js", "APIs"],
    description:
      "Placeholder: describe the custom build, integration, or interactive experience.",
    role: "Your role",
    skills: ["frontend", "backend"],
    mockup: "custom",
    placeholder: true,
  },
];
