import type { Metadata } from "next";
import { API_BASE_URL } from "@/lib/api";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const res = await fetch(`${API_BASE_URL}/api/tours/${id}?locale=en`, { next: { revalidate: 3600 } });
    if (!res.ok) return {};
    const tour = await res.json();

    const title = `${tour.title} · VibeGuide`;
    const description = tour.summary
      ? `${tour.summary.slice(0, 155)}…`
      : `Book ${tour.title} in ${tour.city} with verified local guides. ${tour.durationMinutes} min tour starting from ${tour.basePrice} ${tour.currency}.`;

    const image = tour.photos?.[0]?.url ?? tour.coverPhotoUrl ?? "/opengraph-image";

    return {
      title,
      description,
      alternates: { canonical: `https://www.vibeguideapp.com/tours/${id}` },
      openGraph: {
        title,
        description,
        url: `https://www.vibeguideapp.com/tours/${id}`,
        type: "website",
        images: [{ url: image, width: 1200, height: 630, alt: tour.title }],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    };
  } catch {
    return {};
  }
}

export default function TourLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
