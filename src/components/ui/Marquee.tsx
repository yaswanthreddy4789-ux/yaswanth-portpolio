const items = ["WordPress", "WooCommerce", "Shopify", "Wix", "WPBakery", "Elementor", "PHP", "React", "Next.js", "REST APIs", "Responsive Design", "SEO Setup"];

/** Slow looping strip of platforms. Pauses on hover, static with reduced motion. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-2xl font-semibold text-ink/80 md:text-4xl">
          {t}
          <span className="text-accent" aria-hidden="true">✦</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-y border-line py-6" role="region" aria-label="Platforms and technologies">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
