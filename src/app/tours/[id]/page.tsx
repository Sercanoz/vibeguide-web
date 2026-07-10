import { serverFetch } from "@/lib/api";
import TourDetailClient, { type TourDetail } from "./TourDetailClient";

// Tur detayı sunucuda çekilir (1 saat ISR) — h1, açıklama, itinerary ve
// fiyat ilk HTML'de var olur. Önceden sayfa "use client"tı: Google sadece
// loading iskeletini görüyordu (h1'siz, içeriksiz para sayfası).
export const revalidate = 3600;

async function getTour(id: string): Promise<TourDetail | null> {
  try {
    const res = await serverFetch(`/api/tours/${id}?locale=en`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return (await res.json()) as TourDetail;
  } catch {
    return null;
  }
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const initialTour = await getTour(id);
  return <TourDetailClient id={id} initialTour={initialTour} />;
}
