/**
 * SERVICE PAGES — one SEO landing page per service at /services/<id>.
 * Keep claims factual: no invented prices, timelines, results or client names.
 * Edit the copy freely; the page template, metadata, FAQ schema and sitemap
 * entries are generated from this file.
 */

export type ServicePage = {
  id: string; // must match an id in content.ts → services
  /** <title> (without the site name suffix) */
  seoTitle: string;
  seoDescription: string;
  /** Page <h1> */
  headline: string;
  intro: string;
  /** What the client gets */
  deliverables: string[];
  /** Who this is a good fit for */
  fit: string;
  faqs: { q: string; a: string }[];
};

const scope =
  "Cost depends on scope — the number of pages, features and integrations. Send a short description of your project and I'll reply with a clear estimate.";

export const servicePages: ServicePage[] = [
  {
    id: "business-websites",
    seoTitle: "Business Website Development",
    seoDescription:
      "Professional, responsive business websites built to explain what you do and turn visitors into enquiries. WordPress, Shopify, Wix or custom.",
    headline: "Business websites that earn trust and bring in enquiries",
    intro:
      "Your website is often the first thing a potential customer sees. I build clear, fast, mobile-friendly business websites with a structure that explains your services and makes the next step obvious.",
    deliverables: [
      "Page structure and content layout planned around your services",
      "Responsive design for phones, tablets and desktops",
      "Contact forms tested end to end",
      "On-page SEO basics: heading hierarchy, meta titles and descriptions, image alt text",
      "An easy-to-edit CMS so you can update content yourself",
    ],
    fit: "Local businesses, clinics, consultants, trades and professional-service firms that need a credible, easy-to-manage website.",
    faqs: [
      { q: "Which platform will you use?", a: "I choose the platform that fits your goals and budget — WordPress for flexibility, Shopify for stores, Wix for quick simple sites, or custom code where it is justified." },
      { q: "Can I edit the website myself afterwards?", a: "Yes. I build with an editable CMS and can provide handover instructions for the things you will change most." },
      { q: "How much does a business website cost?", a: scope },
    ],
  },
  {
    id: "wordpress",
    seoTitle: "WordPress Developer",
    seoDescription:
      "Custom WordPress websites, theme customization, plugin setup and PHP development for businesses that need a flexible, maintainable site.",
    headline: "WordPress development tailored to your business",
    intro:
      "From custom page layouts to theme changes, plugin configuration and PHP-level customization, I build WordPress sites that are flexible to grow and straightforward to maintain.",
    deliverables: [
      "Custom WordPress website build or redesign",
      "Theme customization and custom page layouts",
      "Plugin selection, configuration and integration",
      "Hooks and PHP customization where the plugin ecosystem falls short",
      "Security, caching and backup setup",
      "Responsive and form testing before launch",
    ],
    fit: "Businesses that want full control over content and design, or that already run WordPress and need it improved or extended.",
    faqs: [
      { q: "Can you work on my existing WordPress site?", a: "Yes. I can customize an existing theme, fix issues, add features or redesign sections without starting from scratch." },
      { q: "Do you build custom themes or use existing ones?", a: "Both. Many projects are best served by a well-chosen theme with careful customization; custom code is used when the design or functionality needs it." },
      { q: "What does it cost?", a: scope },
    ],
  },
  {
    id: "woocommerce",
    seoTitle: "WooCommerce Store Development",
    seoDescription:
      "WooCommerce online store setup and customization on WordPress: products, checkout, payments and a smooth buying experience.",
    headline: "WooCommerce stores built for a smooth buying experience",
    intro:
      "If you want to sell on your own WordPress site, WooCommerce gives you full ownership of your store. I set up and customize stores that are easy to manage and comfortable to buy from.",
    deliverables: [
      "Store setup: products, categories, attributes and variations",
      "Cart and checkout configuration, including payment gateways",
      "Shipping and tax settings set up with you",
      "Product and shop-page layout customization",
      "Mobile-friendly storefront and testing of the purchase flow",
    ],
    fit: "Businesses that want to sell products or services online while keeping their store on their own WordPress site.",
    faqs: [
      { q: "WooCommerce or Shopify?", a: "WooCommerce suits those who want maximum flexibility and ownership on WordPress; Shopify suits those who want a hosted, low-maintenance store. I work with both and can recommend based on your needs." },
      { q: "Can you add custom features to my store?", a: "Yes — through plugins, theme changes or custom PHP, depending on what is needed." },
      { q: "What does it cost?", a: scope },
    ],
  },
  {
    id: "shopify",
    seoTitle: "Shopify Developer",
    seoDescription:
      "Shopify store development and theme customization: product pages, collection pages and storefront improvements for a better ecommerce experience.",
    headline: "Shopify stores that are easy to manage and pleasant to buy from",
    intro:
      "I build and customize Shopify stores with attention to product pages, collections and the overall shopping experience, so customers find what they need and can check out without friction.",
    deliverables: [
      "Store setup and theme customization",
      "Product page design and layout improvements",
      "Collection and navigation structure",
      "Storefront improvements to the ecommerce experience",
      "Responsive testing across devices",
    ],
    fit: "Brands and retailers launching a new Shopify store or improving an existing one.",
    faqs: [
      { q: "Can you customize my existing Shopify theme?", a: "Yes. I can adjust layouts, sections and styling on your current theme." },
      { q: "Do you help with product setup?", a: "I can structure collections and product pages; supplying product content and photos is typically done by you." },
      { q: "What does it cost?", a: scope },
    ],
  },
  {
    id: "wix",
    seoTitle: "Wix Website Designer",
    seoDescription:
      "Wix website design and customization: responsive business sites and landing pages you can confidently manage yourself.",
    headline: "Wix websites that look polished and are simple to manage",
    intro:
      "Wix is a good fit when you want a good-looking site quickly and prefer to manage it yourself. I design and customize Wix sites with clean layouts and responsive behavior.",
    deliverables: [
      "Business website or landing page on Wix",
      "Responsive layout checks on mobile and desktop",
      "Visual design improvements to existing Wix sites",
      "Forms and basic site settings configured",
    ],
    fit: "Small businesses, freelancers and startups that want a fast, self-managed website.",
    faqs: [
      { q: "Can you improve my existing Wix site?", a: "Yes — layout, styling and responsiveness improvements are common requests." },
      { q: "When is Wix not the right choice?", a: "If you need advanced custom functionality or very large catalogs, WordPress or a custom build may serve you better; I'll tell you honestly." },
      { q: "What does it cost?", a: scope },
    ],
  },
  {
    id: "landing",
    seoTitle: "Landing Page Development",
    seoDescription:
      "Focused, fast landing pages designed to turn visitors into enquiries or sales. Responsive, tested forms and clean SEO basics.",
    headline: "Landing pages built to turn visitors into enquiries",
    intro:
      "A landing page has one job. I build focused, fast pages with a clear message, a single obvious call to action, and forms that are tested to work.",
    deliverables: [
      "Single-purpose page structure around one clear action",
      "Responsive design and fast loading",
      "Lead form with validation, tested end to end",
      "Basic SEO and tracking-ready structure",
    ],
    fit: "Campaigns, product or service launches, and any offer that needs its own focused page.",
    faqs: [
      { q: "Can you add analytics or tracking?", a: "Yes, I can set up tracking tools such as Google Tag Manager and Analytics with your accounts." },
      { q: "How is this different from a full website?", a: "It is one focused page instead of a multi-page site, which keeps it quicker to build and tighter in message." },
      { q: "What does it cost?", a: scope },
    ],
  },
  {
    id: "redesign",
    seoTitle: "Website Redesign",
    seoDescription:
      "Website redesign services: modernize an outdated site with a better look, clearer structure and improved mobile experience.",
    headline: "Redesign an outdated website without starting from zero",
    intro:
      "If your site looks dated, is hard to use on mobile or no longer reflects your business, a redesign can refresh it. I keep what works and improve structure, design and usability.",
    deliverables: [
      "Review of the current site's structure and content",
      "Modern, responsive design",
      "Cleaner navigation and page structure",
      "SEO housekeeping: heading hierarchy, meta details, image alt text",
      "Careful launch with testing",
    ],
    fit: "Businesses whose current website looks outdated, performs poorly on mobile, or is hard to update.",
    faqs: [
      { q: "Will I lose my SEO when redesigning?", a: "Redesigns should be handled carefully — keeping URLs and key content where possible and checking indexing after launch." },
      { q: "Can you keep my current platform?", a: "Often yes. I can redesign on your current platform or recommend a better fit if needed." },
      { q: "What does it cost?", a: scope },
    ],
  },
  {
    id: "customization",
    seoTitle: "Theme & WPBakery Customization",
    seoDescription:
      "Theme and page-builder customization, including WPBakery: tailored layouts and styling on your existing WordPress site.",
    headline: "Theme and page-builder customization, done cleanly",
    intro:
      "Already have a theme or a WPBakery site that is close but not right? I make tailored changes to layouts, styling and responsive behavior without breaking what already works.",
    deliverables: [
      "WPBakery page building and reusable layouts",
      "Custom styling and responsive tweaks",
      "Theme template adjustments",
      "Changes tested across screen sizes",
    ],
    fit: "Owners of existing WordPress or WPBakery sites who want specific design or layout changes.",
    faqs: [
      { q: "Will changes break my site?", a: "I work carefully and test changes; a backup before changes is strongly recommended and I can help set one up." },
      { q: "Can you build new pages in WPBakery?", a: "Yes, including reusable layouts to keep pages consistent." },
      { q: "What does it cost?", a: scope },
    ],
  },
  {
    id: "integrations",
    seoTitle: "Third-Party Integrations & API Development",
    seoDescription:
      "Connect your website to the tools you use: APIs, forms, CRMs, payment and email services. WordPress, PHP and JavaScript integrations.",
    headline: "Connect your website to the tools your business uses",
    intro:
      "Websites work best when they talk to the rest of your stack. I integrate third-party services and APIs so forms, orders and data flow where they should.",
    deliverables: [
      "Forms connected to email or other services",
      "REST API integrations",
      "WordPress backend and PHP customization",
      "Data handling and database integration where needed",
      "Testing and documentation of how it works",
    ],
    fit: "Businesses that want their website connected to CRMs, email tools, payment services or custom data sources.",
    faqs: [
      { q: "Which tools can you integrate?", a: "Any service that offers a documented API or a supported plugin. Tell me what you use and I'll confirm feasibility." },
      { q: "Is my data handled securely?", a: "Secrets are kept server-side and user input is validated; I'll explain the approach for your case." },
      { q: "What does it cost?", a: scope },
    ],
  },
  {
    id: "maintenance",
    seoTitle: "Website Maintenance & Optimization",
    seoDescription:
      "Website maintenance, troubleshooting and performance optimization: updates, backups, bug fixes and technical improvements.",
    headline: "Keep your website healthy, fast and up to date",
    intro:
      "Websites need regular care. I handle updates, troubleshooting and technical improvements so small problems are fixed before they become big ones.",
    deliverables: [
      "Platform, theme and plugin updates",
      "Backup and security checks",
      "Bug fixing and troubleshooting",
      "Performance improvements",
      "Routine form and functionality testing",
    ],
    fit: "Business owners who want a reliable developer to keep their site running smoothly.",
    faqs: [
      { q: "Can you fix a broken site?", a: "Yes — send me what is happening and I'll investigate and explain the cause and fix." },
      { q: "Do you offer ongoing maintenance?", a: "Yes, ongoing support can be arranged depending on your needs." },
      { q: "What does it cost?", a: scope },
    ],
  },
];

export const getServicePage = (id: string) => servicePages.find((s) => s.id === id);
