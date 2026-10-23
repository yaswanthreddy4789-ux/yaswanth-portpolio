import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { servicePages } from "@/config/service-pages";
import { projects } from "@/config/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/services`, changeFrequency: "monthly" as const, priority: 0.9 },
    ...projects
      .filter((p) => !p.placeholder)
      .map((p) => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
    ...servicePages.map((s) => ({
      url: `${site.url}/services/${s.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
