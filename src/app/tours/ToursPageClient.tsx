"use client";

import { useEffect, useState, Suspense } from "react";
import { clientFetch } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import TourFilters from "./TourFilters";
import Link from "next/link";
import { TourCardSkeleton } from "@/components/TourCard";

export interface Tour {
  id: number;
  title: string;
  summary: string;
  city: string;
  category: string;
  durationMinutes: number;
  basePrice: number;
  compareAtPrice?: number;
  currency: string;
  coverPhotoUrl?: string;
  languagesOffered?: string;
}

/// Sunucudan gelen initialTours (EN) ile ilk HTML dolu render edilir — SEO
/// için kritik: tur linkleri ve içerik JS beklemeden crawl edilir. Kullanıcı
/// UI dilini değiştirirse ilgili locale client'ta yeniden çekilir.
export default function ToursPageClient({ initialTours }: { initialTours: Tour[] }) {
  const { locale } = useT();
  const tt = getToursT(locale);
  // EN içerik sunucudan geldi; başka dilde o locale için client'ta çekilir.
  // Türetilmiş durum: aktif locale'in verisi yoksa "yükleniyor" (effect'te senkron setState yok).
  const [localized, setLocalized] = useState<{ locale: string; tours: Tour[] } | null>(null);
  const tours: Tour[] | null =
    locale === "en" ? initialTours : localized?.locale === locale ? localized.tours : null;
  const loading = tours === null;

  useEffect(() => {
    if (locale === "en") return;
    let alive = true;
    clientFetch(`/api/tours?locale=${locale}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : initialTours))
      .then((data: Tour[]) => { if (alive) setLocalized({ locale, tours: data }); })
      .catch(() => { if (alive) setLocalized({ locale, tours: initialTours }); });
    return () => { alive = false; };
  }, [locale, initialTours]);

  const skeleton = (
    <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, i) => <TourCardSkeleton key={i} />)}
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Navbar activePage="tours" />

      {/* Başlık — sade: gradient/nokta deseni/pulse yok */}
      <section className="mx-auto max-w-7xl px-4 pt-24 pb-6 md:px-6 md:pt-28">
        <p className="text-sm font-medium text-neutral-500">{tt.heroBadge}</p>
        <h1 className="mt-2 font-display text-4xl font-normal leading-[1.05] tracking-[-0.01em] md:text-6xl">
          {tt.heroTitle1} <span className="italic">{tt.heroTitle2}</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">{tt.heroSub}</p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
        {loading ? (
          skeleton
        ) : !tours || tours.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-neutral-300 px-6 py-20 text-center">
            <p className="font-display text-2xl font-normal text-neutral-900">{tt.toursComingSoon}</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-neutral-600">{tt.toursComingSoonSub}</p>
            <Link href="/#download" className="mt-6 inline-flex h-11 items-center rounded-full bg-[#5B3FD9] px-6 text-sm font-semibold text-white hover:bg-[#4A32B8]">
              {tt.downloadApp}
            </Link>
          </div>
        ) : (
          <Suspense fallback={skeleton}>
            <TourFilters tours={tours} />
          </Suspense>
        )}
      </section>

      <MainFooter />
    </main>
  );
}
