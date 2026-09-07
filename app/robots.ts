import type { MetadataRoute } from "next";
import { company } from "@/lib/config";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: process.env.NEXT_PUBLIC_SITE_URL
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: new URL("/sitemap.xml", company.siteUrl).href,
  };
}
