import type { MetadataRoute } from "next";

const SITE = "https://www.vibeguideapp.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/#vibenow`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/#vibesquad`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/#private`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/#destinations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/#guides`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/account-deletion`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
  ];
}
