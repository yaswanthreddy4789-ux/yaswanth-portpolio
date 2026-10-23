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
    "slug": "dhe-parts",
    "name": "DHE Parts",
    "category": "WooCommerce",
    "stack": [
      "WordPress",
      "WooCommerce",
      "Custom plugin",
      "Yoast SEO Premium",
      "LiteSpeed Cache",
      "Elementor"
    ],
    "description": "B2B tractor and heavy-equipment parts store with roughly 150,000 products. Built a custom plugin and cron-based sync that keeps prices and product data in step with a supplier API within daily call limits, with a verify mode that re-checks product classification. Also scoped a B2B quote-to-order workflow.",
    "role": "Developer",
    "image": "/projects/dhe-parts.jpg",
    "imageAlt": "Homepage of the DHE Parts WooCommerce store",
    "url": "https://dheparts.com/",
    "results": [
      "Roughly 150,000 products managed with automated sync",
      "About 22,000 mis-tagged products cleaned using backup tables"
    ],
    "skills": [
      "wordpress",
      "backend"
    ],
    "mockup": "shop"
  },
  {
    "slug": "health-connect-group",
    "name": "Health Connect Group",
    "category": "WordPress",
    "stack": [
      "WordPress",
      "Elementor Pro",
      "Gravity Forms",
      "WebP media",
      "WCAG 2.1 AA"
    ],
    "description": "Australian call-centre services website. Built loop grids, trust bars and hero sections, a custom FAQ system (PHP meta box, shortcode and accessible details/summary output), Gravity Forms notifications and optimized WebP media with full alt text, targeting WCAG 2.1 AA with minimal third-party plugins.",
    "role": "Developer",
    "image": "/projects/health-connect.jpg",
    "imageAlt": "Homepage of the Health Connect Group website",
    "url": "https://www.healthconnectgroup.com.au/",
    "skills": [
      "wordpress",
      "backend"
    ],
    "mockup": "wordpress"
  },
  {
    "slug": "biomiq-skincare",
    "name": "Biomiq Skincare",
    "category": "Shopify",
    "stack": [
      "Shopify",
      "Klaviyo",
      "Metaobjects",
      "Yotpo"
    ],
    "description": "Gated Inner Circle and Retailer portals on Shopify driven by Klaviyo customer data and metaobjects, with Yotpo reviews.",
    "role": "Developer",
    "image": "/projects/biomiq.jpg",
    "imageAlt": "Homepage of the Biomiq Skincare Shopify store",
    "url": "https://biomiqskincare.com/",
    "skills": [
      "shopify",
      "backend"
    ],
    "mockup": "shop"
  },
  {
    "slug": "enwolt-bikes",
    "name": "Enwolt Bikes",
    "category": "Shopify",
    "stack": [
      "Shopify",
      "Liquid",
      "JSON-LD schema"
    ],
    "description": "EU electric-bike and moped store (ENGWE and VARUN brands). Shopify theme development plus JSON-LD structured data (Product, FAQPage, HowTo, BreadcrumbList) rolled out across the catalog for rich results.",
    "role": "Developer",
    "image": "/projects/enwolt-bikes.jpg",
    "imageAlt": "Homepage of the Enwolt Bikes Shopify store",
    "url": "https://enwoltbikes.com/",
    "skills": [
      "shopify",
      "frontend"
    ],
    "mockup": "shop"
  },
  {
    "slug": "halcon-marketing",
    "name": "HALCON Marketing",
    "category": "Wix",
    "stack": [
      "Wix",
      "Velo",
      "CMS collections",
      "Schema"
    ],
    "description": "Wix website for a St. Louis brand strategy and marketing agency. Ran bulk SEO fixes across hundreds of pages using Velo code and CMS collections.",
    "role": "Developer (team project)",
    "image": "/projects/halcon-marketing.jpg",
    "imageAlt": "Homepage of the HALCON Marketing website",
    "url": "https://halconmarketing.com/",
    "results": [
      "Meta titles and descriptions for 181 pages",
      "About 324 image alt texts",
      "Canonical and breadcrumb schema for 236 pages"
    ],
    "skills": [
      "wix",
      "frontend"
    ],
    "mockup": "wix"
  },
  {
    "slug": "thankful-greetings",
    "name": "Thankful Greetings",
    "category": "Shopify",
    "stack": [
      "Shopify",
      "SEO",
      "AEO / GEO",
      "Schema"
    ],
    "description": "SEO, AEO and GEO optimization across a 279-page Shopify store: meta data, image alt text, schema and a full site audit.",
    "role": "Developer",
    "image": "/projects/thankful-greetings.jpg",
    "imageAlt": "Homepage of the Thankful Greetings Shopify store",
    "url": "https://thankfulgreetings.com/",
    "skills": [
      "shopify"
    ],
    "mockup": "shop"
  },
  {
    "slug": "dirtyboy",
    "name": "DirtyBoy",
    "category": "Shopify",
    "stack": [
      "Shopify",
      "Liquid",
      "Viral Loops",
      "Klaviyo",
      "Google Apps Script"
    ],
    "description": "Shopify pre-launch teaser with a custom Liquid section, a Viral Loops referral system, Klaviyo welcome and referral flows, and a Google Apps Script backend serving a live signup counter.",
    "role": "Developer",
    "image": "/projects/dirtyboy.jpg",
    "imageAlt": "Homepage of the DirtyBoy Shopify teaser site",
    "url": "https://whosadirtyboy.com/",
    "skills": [
      "shopify",
      "backend"
    ],
    "mockup": "shop"
  },
  {
    "slug": "london-tea-merchant",
    "name": "The London Tea Merchant",
    "category": "Shopify",
    "stack": [
      "Shopify",
      "WCAG 2.1 AA",
      "Accessibility audit"
    ],
    "description": "WCAG 2.1 AA accessibility audit and remediation of the Shopify storefront.",
    "role": "Developer",
    "image": "/projects/london-tea-merchant.jpg",
    "imageAlt": "Homepage of The London Tea Merchant Shopify store",
    "url": "https://londonteamerchant.com/",
    "skills": [
      "shopify",
      "frontend"
    ],
    "mockup": "shop"
  },
  {
    "slug": "mylk-and-hummus",
    "name": "Mylk and Hummus",
    "category": "Other CMS",
    "stack": [
      "Squarespace 7.1",
      "WCAG 2.1 AA",
      "Accessibility audit"
    ],
    "description": "ADA and WCAG 2.1 AA accessibility audit and remediation of a Squarespace 7.1 website for a plant-based food brand.",
    "role": "Developer",
    "image": "/projects/mylk-and-hummus.jpg",
    "imageAlt": "Homepage of the Mylk and Hummus Squarespace website",
    "url": "https://mylkandhummus.com/",
    "skills": [
      "frontend"
    ],
    "mockup": "custom"
  },
  {
    "slug": "zoundslike",
    "name": "Zoundslike",
    "category": "WordPress",
    "stack": [
      "WordPress",
      "Slider Revolution",
      "Blog & FAQ"
    ],
    "description": "Marketing website for an English-speaking practice app with 100K+ Play Store downloads, with App Store and Google Play download links, FAQ and blog sections and Slider Revolution animations.",
    "role": "Developer",
    "image": "/projects/zoundslike.jpg",
    "imageAlt": "Homepage of the Zoundslike website",
    "url": "https://zoundslike.com/",
    "skills": [
      "wordpress",
      "frontend"
    ],
    "mockup": "wordpress"
  },
  {
    "slug": "mind-and-body-wellness",
    "name": "Mind and Body Wellness",
    "category": "WordPress",
    "stack": [
      "WordPress",
      "ADA / WCAG",
      "SEO"
    ],
    "description": "Multi-state telehealth practice website, covering ADA and WCAG accessibility fixes alongside SEO work.",
    "role": "Developer",
    "image": "/projects/mind-body-wellness.jpg",
    "imageAlt": "Homepage of the Mind and Body Wellness website",
    "url": "https://mindandbodywellnesspllc.com/",
    "skills": [
      "wordpress"
    ],
    "mockup": "wordpress"
  },
  {
    "slug": "enlace-ganadero",
    "name": "Enlace Ganadero",
    "category": "WordPress",
    "stack": [
      "WordPress",
      "Elementor",
      "Twilio SendGrid",
      "Spanish content"
    ],
    "description": "Spanish-language pre-launch site for a Venezuelan digital livestock marketplace, with Twilio SendGrid sign-up forms integrated to capture launch-notification leads.",
    "role": "Developer",
    "image": "/projects/enlace.jpg",
    "imageAlt": "Homepage of the Enlace Ganadero website",
    "url": "https://enlaceganadero.com/",
    "skills": [
      "wordpress",
      "backend"
    ],
    "mockup": "wordpress"
  },
  {
    "slug": "2pi-mind-math",
    "name": "2PI Mind Math",
    "category": "WordPress",
    "stack": [
      "WordPress",
      "The7 theme",
      "SEO setup",
      "Responsive"
    ],
    "description": "Redesign of the website for a math tutoring center in McKinney, TX, built on WordPress with on-page SEO checks (heading hierarchy, meta details, alt text, schema) and responsive and form testing.",
    "role": "Developer (team project)",
    "image": "/projects/2pi-mind-math.jpg",
    "imageAlt": "Homepage of the 2PI Mind Math website",
    "url": "https://2pimindmath.com/",
    "skills": [
      "wordpress",
      "frontend"
    ],
    "mockup": "wordpress"
  },
  {
    "slug": "cardoso-law-firm",
    "name": "Cardoso Law Firm",
    "category": "WordPress",
    "stack": [
      "WordPress",
      "Beyond theme",
      "SEO setup",
      "Responsive"
    ],
    "description": "WordPress website for a Florida estate planning law firm, with a clean heading structure, image alt text, caching and backups configured, and responsive testing.",
    "role": "Developer",
    "image": "/projects/cardoso-law-firm.jpg",
    "imageAlt": "Homepage of the Cardoso Law Firm website",
    "url": "https://cardosoestateplanningfirm.com/",
    "skills": [
      "wordpress",
      "backend"
    ],
    "mockup": "wordpress"
  },
  {
    "slug": "guardpro-restoration",
    "name": "GuardPro Restoration",
    "category": "WordPress",
    "stack": [
      "WordPress",
      "Hello Elementor",
      "Elementor",
      "SEO setup",
      "Schema"
    ],
    "description": "WordPress website for a South Florida water, fire and mold restoration company, with heading structure, meta details, alt text and schema markup configured.",
    "role": "Developer (team project)",
    "image": "/projects/guardpro.jpg",
    "imageAlt": "Homepage of the GuardPro Restoration website",
    "url": "https://guardprorestoration.com/",
    "skills": [
      "wordpress",
      "frontend"
    ],
    "mockup": "wordpress"
  },
  {
    "slug": "syndell-technologies",
    "name": "Syndell Technologies",
    "category": "WordPress",
    "stack": [
      "WordPress",
      "Hello Elementor",
      "Caching",
      "SEO setup"
    ],
    "description": "Ongoing development and maintenance of the WordPress company website for a software and AI engineering firm.",
    "role": "Developer (company website)",
    "image": "/projects/syndell.jpg",
    "imageAlt": "Homepage of the Syndell Technologies website",
    "url": "https://syndelltech.com/",
    "skills": [
      "wordpress",
      "backend"
    ],
    "mockup": "wordpress"
  },
];
