import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { servicePages } from "@/config/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...servicePages.map((s) => ({
      url: `${site.url}/services/${s.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
