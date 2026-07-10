import { serverFetch } from "@/lib/api";
import ToursPageClient, { type Tour } from "./ToursPageClient";

// Katalog sunucuda çekilir (1 saat ISR) — tur kartları ve linkleri ilk
// HTML'de var olur. Önceden sayfa "use client"tı: Google /tours'ta hiçbir
// /tours/N linki göremiyordu (para sayfalarına iç link akışı JS-only idi).
export const revalidate = 3600;

async function getTours(): Promise<Tour[]> {
  try {
    const res = await serverFetch(`/api/tours?locale=en`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return (await res.json()) as Tour[];
  } catch {
    return [];
  }
}

export default async function ToursPage() {
  const initialTours = await getTours();
  return <ToursPageClient initialTours={initialTours} />;
}
