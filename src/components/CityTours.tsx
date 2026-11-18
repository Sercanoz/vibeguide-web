import Link from "next/link";
import { serverFetch } from "@/lib/api";
import { homeSections } from "@/lib/home-sections-i18n";
import { navbarI18n } from "@/lib/navbar-i18n";
import TourCard from "@/components/TourCard";
import type { Locale } from "@/lib/i18n";

interface Tour {
  id: number;
  title: string;
  city: string;
  category: string;
  durationMinutes: number;
  basePrice: number;
  currency: string;
  coverPhotoUrl?: string;
  rating?: number;
  reviewCount?: number;
  provinceName?: string | null;
  districtName?: string | null;
}

/** Shows real tours for a city (by slug or name) — internal links + conversion + content.
 *  `heading` ve `locale` opsiyonel: dilli landing sayfalarında yerel başlık + çeviri için.
 *
 *  Server component: turlar sunucuda çekilir (1 saat ISR) — şehir/atraksiyon
 *  landing sayfalarındaki tur kartları ve /tours/N linkleri ilk HTML'de var
 *  olur. Önceden "use client" + useEffect fetch'ti: bu linkler Google'a
 *  görünmüyordu (iç link akışı JS-only). */
export default async function CityTours({
  citySlug,
  cityName,
  heading,
  locale = "en",
}: {
  citySlug: string;
  cityName: string;
  heading?: string;
  locale?: string;
}) {
  let tours: Tour[] = [];
  try {
    const res = await serverFetch(
      `/api/tours?city=${encodeURIComponent(citySlug)}&locale=${locale}&limit=6`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) tours = ((await res.json()) as Tour[]).slice(0, 6);
  } catch {
    // API erişilemezse bölümü sessizce gizle
  }

  if (tours.length === 0) return null;

  const hs = homeSections[locale as Locale] ?? homeSections.en;
  const nb = navbarI18n[locale as Locale] ?? navbarI18n.en;
  return (
    <section id="tours" className="scroll-mt-20 border-t border-neutral-200 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-neutral-500">{hs.availableNow}</p>
            <h2 className="mt-2 font-display text-3xl font-normal leading-tight tracking-[-0.01em] text-neutral-900 md:text-[40px]">
              {/* 21 dilde var olan metinler (eskiden yalnız EN/TR → diğer dillerde İngilizce) */}
              {heading ?? `${cityName} · ${hs.popularExperiences}`}
            </h2>
          </div>
          <Link href={`/tours?city=${encodeURIComponent(citySlug)}`}
            className="inline-flex h-10 items-center rounded-full border border-neutral-300 px-5 text-sm font-semibold text-neutral-900 hover:border-neutral-900">
            {nb.seeAllTours}
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3">
          {tours.map((t) => (
            <TourCard key={t.id} tour={t} locale={locale} sizes="(max-width: 1024px) 50vw, 33vw" />
          ))}
        </div>
      </div>
    </section>
  );
}
