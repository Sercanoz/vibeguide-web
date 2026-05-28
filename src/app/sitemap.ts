import type { MetadataRoute } from "next";
import { API_BASE_URL } from "@/lib/api";

const SITE = "https://www.vibeguideapp.com";

type Tour = { id: number; updatedAt?: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/tours`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/istanbul-tour-guide`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/cappadocia-tour-guide`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/ephesus-tour-guide`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/register`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/account-deletion`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Dynamic tour pages
  let tourRoutes: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(`${API_BASE_URL}/api/tours?locale=en`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const tours: Tour[] = await res.json();
      tourRoutes = tours.map((t) => ({
        url: `${SITE}/tours/${t.id}`,
        lastModified: t.updatedAt ? new Date(t.updatedAt) : now,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    }
  } catch { /* fallback to static only */ }

  return [...staticRoutes, ...tourRoutes];
}
