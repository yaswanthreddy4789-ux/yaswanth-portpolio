/**
 * CONTENT — About, services, process, principles, testimonials, achievements.
 */

export type AboutBlock = { id: string; label: string; title: string; body: string; placeholder?: boolean };

export const about = {
  heading: ["More Than", "Just a Developer."],
  intro:
    "I'm a versatile web developer who combines technical implementation, design awareness, and business-focused thinking, working across WordPress, Shopify, Wix, WPBakery, and custom website development.",
  blocks: [
    {
      id: "background",
      label: "Background",
      title: "Professional background",
      body: "Placeholder: add a short, true summary of your experience, how you got into web development, and the kinds of projects you have worked on.",
      placeholder: true,
    },
    {
      id: "philosophy",
      label: "Philosophy",
      title: "Development philosophy",
      body: "A website should do a job: earn trust, explain clearly, and make the next step obvious. I aim for solutions that are tailored to the project, easy to maintain, and kind to performance.",
    },
    {
      id: "businesses",
      label: "Who I help",
      title: "The businesses I help",
      body: "Placeholder: describe your typical clients, such as small businesses, online stores, agencies, or startups, in your own words.",
      placeholder: true,
    },
    {
      id: "strengths",
      label: "Strengths",
      title: "Technical strengths",
      body: "Hands-on delivery across several platforms, from CMS customization and ecommerce to hand-coded frontend and backend work, so the platform can fit the project instead of the other way around.",
    },
    {
      id: "approach",
      label: "Approach",
      title: "Approach to problem-solving",
      body: "Understand the goal first, then choose the simplest approach that solves it well. I test as I build, communicate what I find, and fix root causes rather than patching symptoms.",
    },
  ] as AboutBlock[],
};

export type Service = { id: string; title: string; text: string; icon: string };

export const services: Service[] = [
  { id: "business-websites", title: "Business Websites", icon: "globe", text: "Clear, credible websites that explain what you do and make it easy to get in touch." },
  { id: "wordpress", title: "WordPress Development", icon: "layout", text: "Custom WordPress builds, theme work and plugin setup tailored to how you work." },
  { id: "woocommerce", title: "WooCommerce Stores", icon: "cart", text: "Online stores on WooCommerce with product, checkout and catalogue setup." },
  { id: "shopify", title: "Shopify Stores", icon: "shopping", text: "Shopify store builds and theme customization focused on a smooth buying experience." },
  { id: "wix", title: "Wix Websites", icon: "panel", text: "Responsive, polished Wix sites you can confidently manage yourself." },
  { id: "landing", title: "Landing Pages", icon: "rocket", text: "Focused single-purpose pages designed to turn visitors into enquiries." },
  { id: "redesign", title: "Website Redesigns", icon: "refresh", text: "Give an outdated site a modern look and better structure without starting from zero." },
  { id: "customization", title: "Theme & Page-Builder Customization", icon: "blocks", text: "Tailored changes to existing themes and WPBakery layouts, done cleanly." },
  { id: "integrations", title: "Third-Party Integrations", icon: "plug", text: "Connect your site to the tools and APIs your business already relies on." },
  { id: "maintenance", title: "Maintenance & Optimization", icon: "wrench", text: "Troubleshooting, technical improvements and performance work to keep things healthy." },
];

export const processSteps = [
  { n: "01", title: "Discover", icon: "search", text: "Understand the client's business, target audience, goals, and requirements." },
  { n: "02", title: "Plan", icon: "map", text: "Define the structure, user journey, functionality, and technical approach." },
  { n: "03", title: "Design", icon: "pen", text: "Develop the visual direction, layouts, responsive structure, and interaction concepts." },
  { n: "04", title: "Develop", icon: "code", text: "Build the website using the appropriate CMS, ecommerce platform, or custom code." },
  { n: "05", title: "Test", icon: "check", text: "Check navigation, responsive behavior, forms, browser compatibility, performance, and key functionality." },
  { n: "06", title: "Launch", icon: "rocket", text: "Deploy the website, verify its functionality, and provide handover instructions when applicable." },
  { n: "07", title: "Improve", icon: "trend", text: "Support maintenance, technical improvements, and future enhancements." },
];

export const principles = [
  { title: "Project-specific solutions", text: "Every build starts from your goals, not a template." },
  { title: "Responsive, user-friendly experiences", text: "Comfortable on every screen and easy to use." },
  { title: "Attention to detail", text: "Spacing, states, copy and edge cases get proper care." },
  { title: "Maintainable implementation", text: "Clean, organised work that is simple to extend later." },
  { title: "Clear communication", text: "You know what is happening and what comes next." },
  { title: "Performance awareness", text: "Sensible assets and code, so pages stay light." },
  { title: "Business-focused decisions", text: "Choices are weighed against what helps your business." },
  { title: "Ongoing improvements", text: "A launch is a start; sites are refined over time." },
];

/**
 * TESTIMONIALS — add ONLY real, permitted quotes. While this list is empty the
 * section is hidden. Never add invented reviews, ratings or client logos.
 */
export type Testimonial = { quote: string; name: string; role?: string; company?: string };
export const testimonials: Testimonial[] = [];

/** ACHIEVEMENTS / CERTIFICATIONS — real ones only. Empty = section hidden. */
export type Achievement = { title: string; issuer?: string; year?: string };
export const achievements: Achievement[] = [];
