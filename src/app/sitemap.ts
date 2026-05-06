import type { MetadataRoute } from "next";

const SITE = "https://www.vibeguideapp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/#vibenow`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/#vibesquad`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/#how`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/#guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
