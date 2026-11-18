import type { Metadata } from "next";
import { serverFetch } from "@/lib/api";
import HomeClient, { type PopularTour, type Testimonial, type HomeStats } from "./HomeClient";

const SITE = "https://www.vibeguideapp.com";

// Anasayfa self-referencing canonical + hreflang. Homepage tek dilli (EN); tüm
// derin sayfalar tam hreflang cluster taşıyor, anasayfa da en/x-default versin.
export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE}/`,
    languages: { en: `${SITE}/`, "x-default": `${SITE}/` },
  },
};

// SSR: pre-fetch popular tours + featured reviews on the server so they land in
// the initial HTML (crawlable / faster indexing). HomeClient falls back to a
// client fetch only when the server returns nothing (backend hiccup).
export const revalidate = 300; // ISR: refresh homepage data every 5 min

async function getPopularTours(): Promise<PopularTour[]> {
  try {
    const r = await serverFetch(`/api/tours?locale=en`, { next: { revalidate: 300 } });
    if (!r.ok) return [];
    const data = (await r.json()) as PopularTour[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function getFeaturedReviews(): Promise<Testimonial[]> {
  try {
    const r = await serverFetch(`/api/tours/reviews/featured?limit=9`, { next: { revalidate: 300 } });
    if (!r.ok) return [];
    const data = (await r.json()) as Testimonial[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [allTours, initialReviews] = await Promise.all([
    getPopularTours(),
    getFeaturedReviews(),
  ]);

  // Güven satırı rakamları — yalnız gerçek veriden (tur listesi). Uydurma sayı yok:
  // backend boş/kapalıysa 0 döner ve HomeClient ilgili parçayı göstermez.
  const reviewCount = allTours.reduce((n, t) => n + (t.reviewCount ?? 0), 0);
  const ratingSum = allTours.reduce((n, t) => n + (t.reviewCount ? (t.rating ?? 0) * t.reviewCount : 0), 0);
  const stats: HomeStats = {
    tourCount: allTours.length,
    reviewCount,
    avgRating: reviewCount > 0 ? ratingSum / reviewCount : 0,
  };

  return <HomeClient initialTours={allTours.slice(0, 10)} initialReviews={initialReviews} stats={stats} />;
}
