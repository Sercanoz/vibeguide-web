"use client";

import Image from "next/image";
import Link from "next/link";
import Price from "@/components/Price";

// Ortak tur kartı — ana sayfa rail'i ve /tours ızgarası aynı görünümü kullanır.
// Sade/GYG tarzı: kenarlıksız foto, kategori·şehir üst satırı, başlık, süre,
// puan (yalnız gerçek yorum varsa), fiyat. Sahte/varsayılan puan GÖSTERİLMEZ.

export interface TourCardData {
  id: number;
  title: string;
  city: string;
  category?: string;
  durationMinutes: number;
  basePrice: number;
  compareAtPrice?: number;
  currency: string;
  coverPhotoUrl?: string;
  rating?: number;
  reviewCount?: number;
  provinceName?: string | null;
  districtName?: string | null;
}

const COPY: Record<string, { perPerson: string; isNew: string; from: string }> = {
  en: { perPerson: "/ person", isNew: "New experience", from: "From" },
  tr: { perPerson: "/ kişi", isNew: "Yeni deneyim", from: "Başlangıç" },
};

export function fmtDuration(m: number): string {
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return mm > 0 ? `${h}h ${mm}m` : `${h}h`;
}

export function tourLocation(t: { city: string; provinceName?: string | null; districtName?: string | null }): string {
  if (t.districtName && t.provinceName) return `${t.districtName}, ${t.provinceName}`;
  return t.provinceName || t.city;
}

export const STAR_PATH = "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2";

export default function TourCard({
  tour, locale = "en", sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw", priority = false,
}: {
  tour: TourCardData; locale?: string; sizes?: string; priority?: boolean;
}) {
  const c = COPY[locale] ?? COPY.en;
  const count = tour.reviewCount ?? 0;
  const hasDiscount = tour.compareAtPrice != null && tour.compareAtPrice > tour.basePrice;

  return (
    <Link href={`/tours/${tour.id}`} className="group block focus-visible:outline-none">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-neutral-100 ring-offset-2 group-focus-visible:ring-2 group-focus-visible:ring-neutral-900">
        {tour.coverPhotoUrl ? (
          <Image src={tour.coverPhotoUrl} alt={tour.title} fill sizes={sizes} priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-neutral-300">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="truncate text-xs font-medium uppercase tracking-wide text-neutral-500">
          {tour.category ? `${tour.category} · ` : ""}{tourLocation(tour)}
        </p>
        <h3 className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-neutral-900 group-hover:underline">{tour.title}</h3>
        <p className="mt-1 text-sm text-neutral-600">{fmtDuration(tour.durationMinutes)}</p>
        <div className="mt-1 flex items-center gap-1 text-sm">
          {count > 0 && tour.rating ? (
            <>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A0A0F" aria-hidden="true"><polygon points={STAR_PATH}/></svg>
              <span className="font-semibold text-neutral-900">{tour.rating.toFixed(1)}</span>
              <span className="text-neutral-500">({count})</span>
            </>
          ) : (
            <span className="text-xs font-medium text-neutral-600">{c.isNew}</span>
          )}
        </div>
        <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-sm text-neutral-600">{c.from}</span>
          {hasDiscount && <span className="text-sm text-neutral-500 line-through"><Price amount={tour.compareAtPrice!} currency={tour.currency} /></span>}
          <span className="text-base font-bold text-neutral-900"><Price amount={tour.basePrice} currency={tour.currency} /></span>
          <span className="text-sm text-neutral-600">{c.perPerson}</span>
        </div>
      </div>
    </Link>
  );
}

/** Yükleniyor iskeleti — kartla aynı ölçüler, layout zıplaması olmasın. */
export function TourCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="aspect-[4/3] animate-pulse rounded-xl bg-neutral-100" />
      <div className="mt-3 h-3 w-1/3 animate-pulse rounded bg-neutral-100" />
      <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-neutral-100" />
      <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-neutral-100" />
      <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-neutral-100" />
    </div>
  );
}
