/**
 * SKILLS & TOOLKIT — only list what you genuinely use. No percentages are
 * shown anywhere because none are supplied; add a `level` text field only if
 * you want to display something real.
 */

export type Platform = {
  id: string;
  name: string;
  /** Key from components/ui/icons.ts */
  icon: string;
  summary: string;
  capabilities: string[];
};

export const platforms: Platform[] = [
  {
    id: "wordpress",
    name: "WordPress",
    icon: "layout",
    summary: "Custom websites, themes, and plugin-driven functionality.",
    capabilities: [
      "Custom website development",
      "Theme customization",
      "Plugin configuration and integration",
      "WooCommerce",
      "Custom page layouts",
      "Responsive development",
      "WordPress hooks and PHP",
    ],
  },
  {
    id: "shopify",
    name: "Shopify",
    icon: "shopping",
    summary: "Online stores that are easy to manage and pleasant to buy from.",
    capabilities: [
      "Online store development",
      "Theme customization",
      "Product page design",
      "Collection pages",
      "Storefront improvements",
      "Ecommerce user experience",
    ],
  },
  {
    id: "wix",
    name: "Wix",
    icon: "panel",
    summary: "Fast, good-looking business sites on Wix.",
    capabilities: [
      "Business websites",
      "Landing pages",
      "Responsive layouts",
      "Website customization",
      "Visual design improvements",
    ],
  },
  {
    id: "wpbakery",
    name: "WPBakery",
    icon: "blocks",
    summary: "Page building and customization on existing WPBakery sites.",
    capabilities: [
      "Page building",
      "Reusable layouts",
      "Custom styling",
      "Responsive page design",
      "Existing website customization",
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    icon: "code",
    summary: "Clean, responsive interfaces with considered motion.",
    capabilities: ["HTML5", "CSS3", "JavaScript", "React", "Responsive interfaces", "UI animations"],
  },
  {
    id: "backend",
    name: "Backend & Integrations",
    icon: "server",
    summary: "The logic, data, and connections behind the interface.",
    capabilities: [
      "PHP",
      "WordPress backend development",
      "APIs and third-party integrations",
      "Forms and data handling",
      "Database integration",
      "Troubleshooting and maintenance",
    ],
  },
];

export type ToolGroup = { group: string; items: { name: string; logo?: string }[] };

/**
 * Toolkit entries. Optional `logo`: path to an SVG/PNG you have the right to use,
 * stored in /public/logos/. Without it a neutral monogram tile is shown
 * (trademarked logos are not bundled).
 */
export const toolkit: ToolGroup[] = [
  {
    group: "CMS & Commerce",
    items: [{ name: "WordPress" }, { name: "WooCommerce" }, { name: "Shopify" }, { name: "Wix" }, { name: "WPBakery" }],
  },
  {
    group: "Frontend",
    items: [{ name: "HTML" }, { name: "CSS" }, { name: "JavaScript" }, { name: "React" }, { name: "Next.js" }, { name: "Tailwind CSS" }],
  },
  {
    group: "Backend & Data",
    items: [{ name: "PHP" }, { name: "REST APIs" }],
  },
  {
    group: "Workflow",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Responsive Web Design" },
      { name: "Website Optimization" },
    ],
  },
];
