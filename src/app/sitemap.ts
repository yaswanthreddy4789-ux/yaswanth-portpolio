import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { projects } from "@/config/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects
      .filter((p) => !p.placeholder)
      .map((p) => ({ url: `${site.url}/projects/${p.slug}`, changeFrequency: "yearly" as const, priority: 0.7 })),
  ];
}
