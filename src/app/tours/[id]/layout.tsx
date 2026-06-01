import type { Metadata } from "next";
import { API_BASE_URL } from "@/lib/api";

const SITE = "https://www.vibeguideapp.com";
type Props = { params: Promise<{ id: string }> };

// Tek fetch — generateMetadata + JSON-LD aynı veriyi paylaşır (Next dedupe eder).
async function getTour(id: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/tours/${id}?locale=en`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return await res.json();
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
    ? `${tour.summary.slice(0, 155)}…`
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
  const tour = await getTour(id);

  // Tour/Product JSON-LD — SERP'te fiyat + (varsa) yıldız zengin sonucu.
  let jsonLd: object | null = null;
  if (tour) {
    const image = tour.photos?.[0]?.url ?? tour.coverPhotoUrl;
    const hasRating =
      typeof tour.rating === "number" &&
      tour.rating > 0 &&
      typeof tour.reviewCount === "number" &&
      tour.reviewCount > 0;
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
              ratingValue: tour.rating,
              reviewCount: tour.reviewCount,
            },
          }
        : {}),
    };
  }

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
