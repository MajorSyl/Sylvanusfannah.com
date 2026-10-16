import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { en: `${siteUrl}/`, es: `${siteUrl}/es` };
  return [
    { url: `${siteUrl}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${siteUrl}/es`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
