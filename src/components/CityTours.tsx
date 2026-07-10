import Image from "next/image";
import { serverFetch } from "@/lib/api";
import { homeSections } from "@/lib/home-sections-i18n";
import Price from "@/components/Price";
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
  return (
    <section className="py-20 bg-[#F7F7FB]">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">{hs.availableNow}</p>
        <h2 className="text-3xl md:text-4xl font-black mb-10 tracking-tight">{heading ?? (locale === "tr" ? `Popüler ${cityName} turları` : `Popular ${cityName} tours`)}</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tours.map((t) => (
            <a key={t.id} href={`/tours/${t.id}`}
              className="group rounded-2xl bg-white border border-black/[0.06] shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                {t.coverPhotoUrl ? (
                  <Image
                    src={t.coverPhotoUrl}
                    alt={t.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#6C4CF1]/15 to-[#8B5CF6]/15 flex items-center justify-center text-4xl">🗺️</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-black text-[#0A0A0F] text-[15px] leading-snug line-clamp-2 group-hover:text-[#6C4CF1] transition-colors">{t.title}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-neutral-800 capitalize">{t.category}</span>
                  <span className="text-base font-black text-[#6C4CF1]"><Price amount={t.basePrice} currency={t.currency} /></span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a href={`/tours?city=${encodeURIComponent(citySlug)}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#6C4CF1] text-white font-bold px-7 py-3 text-sm hover:bg-[#5a3dd4] transition-colors">
            {locale === "tr" ? `Tüm ${cityName} turlarını gör →` : `See all ${cityName} tours →`}
          </a>
        </div>
      </div>
    </section>
  );
}
