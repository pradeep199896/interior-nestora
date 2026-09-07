import type { MetadataRoute } from "next";
import { company, navigation } from "@/lib/config";
import { projects } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...navigation.map(([, url]) => url),
    "/privacy-policy",
    "/terms",
    ...projects.map((p) => `/projects/${p.slug}`),
  ].map((path) => ({
    url: new URL(path, company.siteUrl).href,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
