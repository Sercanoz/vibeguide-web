import type { MetadataRoute } from "next";
import { API_BASE_URL } from "@/lib/api";
import { ATTRACTIONS, ATTRACTION_LANGS } from "@/lib/attractions";

const SITE = "https://www.vibeguideapp.com";

type Tour = { id: number; updatedAt?: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE}/tours`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE}/vibenow`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/vibesquad`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/private`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${SITE}/istanbul-tour-guide`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/cappadocia-tour-guide`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/ephesus-tour-guide`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/guide-verification`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/register`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE}/kvkk`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/cerez-politikasi`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/mesafeli-satis`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/on-bilgilendirme`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE}/cancellation-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
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

  // Atraksiyon sayfaları — her landmark × her dil ayrı URL + hreflang alternates.
  const attractionRoutes: MetadataRoute.Sitemap = ATTRACTIONS.flatMap((a) => {
    const languages: Record<string, string> = {};
    for (const l of ATTRACTION_LANGS) {
      languages[l] = `${SITE}/attractions/${l}/${a.slug}`;
    }
    languages["x-default"] = `${SITE}/attractions/en/${a.slug}`;
    return ATTRACTION_LANGS.map((l) => ({
      url: `${SITE}/attractions/${l}/${a.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      alternates: { languages },
    }));
  });

  return [...staticRoutes, ...tourRoutes, ...attractionRoutes];
}
