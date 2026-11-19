import type { Metadata } from "next";
import { serverFetch } from "@/lib/api";
import JsonLdScript from "@/components/JsonLdScript";

const SITE = "https://www.vibeguideapp.com";
type Props = { params: Promise<{ id: string }> };

// Tek fetch — generateMetadata + JSON-LD aynı veriyi paylaşır (Next dedupe eder).
async function getTour(id: string) {
  try {
    const res = await serverFetch(`/api/tours/${id}?locale=en`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Sayfada görünen onaylı yorumlar (ReviewsSection ile aynı kaynak). Google kuralı:
// yapılandırılmış puan sayfada görünen yorumlarla birebir eşleşmeli.
type PublicReviews = {
  count: number;
  avgRating: number;
  reviews: { fullName: string; rating: number; comment: string | null; createdAt: string }[];
};
async function getReviews(id: string): Promise<PublicReviews | null> {
  try {
    const res = await serverFetch(`/api/tours/${id}/public-reviews`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as PublicReviews;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const tour = await getTour(id);
  if (!tour) return {};

  const title = `${tour.title} · VibeGuide`;
  const description = tour.summary
    ? (tour.summary.length > 155 ? `${tour.summary.slice(0, 155)}…` : tour.summary)
    : `Book ${tour.title} in ${tour.city} with verified local guides. ${tour.durationMinutes} min tour starting from ${tour.basePrice} ${tour.currency}.`;
  const image = tour.photos?.[0]?.url ?? tour.coverPhotoUrl ?? "/opengraph-image";

  return {
    title,
    description,
    alternates: { canonical: `${SITE}/tours/${id}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/tours/${id}`,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: tour.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function TourLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [tour, reviews] = await Promise.all([getTour(id), getReviews(id)]);

  // Tour/Product JSON-LD — SERP'te fiyat + (varsa) yıldız zengin sonucu.
  let jsonLd: object | null = null;
  if (tour) {
    const image = tour.photos?.[0]?.url ?? tour.coverPhotoUrl;
    const hasRating = !!reviews && reviews.count > 0 && reviews.avgRating > 0;
    jsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: tour.title,
      description: tour.summary || `Guided ${tour.title} in ${tour.city}.`,
      ...(image ? { image: [image] } : {}),
      brand: { "@type": "Brand", name: "VibeGuide" },
      category: tour.category || "Tour",
      offers: {
        "@type": "Offer",
        price: String(tour.basePrice ?? 0),
        priceCurrency: tour.currency || "TRY",
        availability: "https://schema.org/InStock",
        url: `${SITE}/tours/${id}`,
      },
      ...(hasRating
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: reviews!.avgRating,
              reviewCount: reviews!.count,
              bestRating: 5,
              worstRating: 1,
            },
            review: reviews!.reviews.slice(0, 5).map((r) => ({
              "@type": "Review",
              author: { "@type": "Person", name: r.fullName },
              datePublished: r.createdAt?.slice(0, 10),
              reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
              ...(r.comment ? { reviewBody: r.comment } : {}),
            })),
          }
        : {}),
    };
  }

  return (
    <>
      {jsonLd && <JsonLdScript data={jsonLd} />}
      {children}
    </>
  );
}
