"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

interface Place {
  id: number;
  name: string;
  description?: string;
  lat: number;
  lng: number;
  ord: number;
  photoUrl?: string;
}

interface PricingTier {
  participantCount: number;
  guideAmount: number;
}

interface LanguagePrice {
  code: string;
  displayName: string;
  multiplier: number;
  isRare: boolean;
  price: number;
}

interface TourPhoto {
  id: number;
  url: string;
  caption: string | null;
  ord: number;
}

interface TourInclude {
  id: number;
  label: string;
  isIncluded: boolean;
  ord: number;
}

interface TourImportantInfo {
  id: number;
  label: string;
  ord: number;
}

interface TourDetail {
  id: number;
  title: string;
  summary?: string;
  city: string;
  category: string;
  durationMinutes: number;
  basePrice: number;
  compareAtPrice?: number;
  currency: string;
  coverPhotoUrl?: string;
  languagesOffered?: string;
  description?: string;
  highlights?: string;
  isMachineTranslated?: boolean;
  meetingPointText?: string;
  meetingPointLat?: number;
  meetingPointLng?: number;
  places?: Place[];
  pricingTiers?: PricingTier[];
  languagePrices?: LanguagePrice[];
  photos?: TourPhoto[];
  includes?: TourInclude[];
  importantInfo?: TourImportantInfo[];
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h} hour${h > 1 ? "s" : ""}`;
}

function categoryColor(cat: string): string {
  const map: Record<string, string> = {
    history: "bg-amber-100 text-amber-700",
    food: "bg-orange-100 text-orange-700",
    nature: "bg-emerald-100 text-emerald-700",
    culture: "bg-purple-100 text-purple-700",
    adventure: "bg-red-100 text-red-700",
    art: "bg-pink-100 text-pink-700",
  };
  return map[cat?.toLowerCase()] ?? "bg-neutral-100 text-neutral-600";
}

export default function TourDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { locale } = useT();
  const tt = getToursT(locale);
  const [tour, setTour] = useState<TourDetail | null | "loading" | "error">("loading");
  const [activePhoto, setActivePhoto] = useState(0);

  const prevPhoto = useCallback((total: number) =>
    setActivePhoto((i) => (i - 1 + total) % total), []);
  const nextPhoto = useCallback((total: number) =>
    setActivePhoto((i) => (i + 1) % total), []);

  useEffect(() => {
    if (!id) return;
    setTour("loading");
    fetch(`${API_BASE_URL}/api/tours/${id}?locale=${locale}`, { cache: "no-store" })
      .then((r) => {
        if (r.status === 404) return null;
        if (!r.ok) return "error" as const;
        return r.json();
      })
      .then((data) => setTour(data as TourDetail | null | "error"))
      .catch(() => setTour("error"));
  }, [id, locale]);

  if (tour === "loading") {
    return (
      <main className="min-h-screen bg-white antialiased">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/[0.06] shadow-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
            <a href="/" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-[#0A0A0F]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32} style={{ mixBlendMode: "multiply" }} />
              VibeGuide
            </a>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <a href="/#download" className="rounded-full bg-[#6C4CF1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a3dd4] transition-colors shadow-sm">Get the App</a>
            </div>
          </div>
        </nav>
        <div className="pt-16 animate-pulse">
          <div className="h-[60vh] bg-neutral-100" />
          <div className="max-w-7xl mx-auto px-6 py-12 space-y-4">
            <div className="h-8 w-2/3 bg-neutral-100 rounded-xl" />
            <div className="h-4 w-1/3 bg-neutral-100 rounded-xl" />
            <div className="h-32 bg-neutral-100 rounded-xl" />
          </div>
        </div>
      </main>
    );
  }

  if (tour === "error") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-6xl mb-4">⚠️</p>
          <h1 className="text-2xl font-black text-[#0A0A0F] mb-2">Something went wrong</h1>
          <p className="text-neutral-400 mb-6">Could not load this tour. Please try again.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => window.location.reload()} className="rounded-full bg-[#6C4CF1] text-white text-sm font-bold px-6 py-2.5 hover:bg-[#5a3dd4] transition-colors">
              Try again
            </button>
            <a href="/tours" className="rounded-full border border-black/10 text-neutral-600 text-sm font-bold px-6 py-2.5 hover:bg-neutral-50 transition-colors">
              Browse all tours
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (!tour) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-6xl mb-4">🗺️</p>
          <h1 className="text-2xl font-black text-[#0A0A0F] mb-2">Tour not found</h1>
          <p className="text-neutral-400 mb-6">This tour may have been removed or is no longer active.</p>
          <a href="/tours" className="rounded-full bg-[#6C4CF1] text-white text-sm font-bold px-6 py-2.5 hover:bg-[#5a3dd4] transition-colors">
            Browse all tours
          </a>
        </div>
      </main>
    );
  }

  const highlights = tour.highlights
    ? tour.highlights.split("\n").filter((l) => l.trim())
    : [];

  const hasDiscount =
    tour.compareAtPrice != null && tour.compareAtPrice > tour.basePrice;

  return (
    <main className="min-h-screen bg-white text-[#0A0A0F] antialiased">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-xl border-b border-black/[0.06] shadow-sm shadow-black/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          <a href="/" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-[#0A0A0F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32} style={{ mixBlendMode: "multiply" }} />
            VibeGuide
          </a>
          <div className="hidden gap-8 text-sm font-medium md:flex">
            <a href="/#how" className="text-neutral-500 hover:text-black transition-colors">{tt.navHow}</a>
            <a href="/tours" className="text-[#6C4CF1] font-semibold">{tt.navTours}</a>
            <a href="/#destinations" className="text-neutral-500 hover:text-black transition-colors">{tt.navDestinations}</a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="/#download"
              className="rounded-full bg-[#6C4CF1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a3dd4] transition-colors shadow-sm"
            >
              Get the App
            </a>
          </div>
        </div>
      </nav>

      {/* Hero — full-width cover photo */}
      {(() => {
        const allPhotos = tour.photos && tour.photos.length > 0
          ? tour.photos
          : tour.coverPhotoUrl
            ? [{ id: 0, url: tour.coverPhotoUrl, caption: null, ord: 0 }]
            : [];
        const current = allPhotos[activePhoto];
        return (
          <div className="relative h-[60vh] min-h-[400px] pt-16 bg-[#0A0A0F] overflow-hidden">
            {current ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={current.url}
                src={current.url}
                alt={current.caption ?? tour.title}
                className="absolute inset-0 w-full h-full object-cover opacity-50 transition-opacity duration-300"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#6C4CF1]/30 to-[#0A0A0F]" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/60 via-transparent to-transparent" />

            {/* Prev / Next arrows */}
            {allPhotos.length > 1 && (
              <>
                <button
                  onClick={() => prevPhoto(allPhotos.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center text-lg transition-colors z-10"
                >‹</button>
                <button
                  onClick={() => nextPhoto(allPhotos.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center text-lg transition-colors z-10"
                >›</button>
                {/* Dots */}
                <div className="absolute bottom-24 right-6 flex gap-1.5 z-10">
                  {allPhotos.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePhoto(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${i === activePhoto ? "bg-white w-4" : "bg-white/50"}`}
                    />
                  ))}
                </div>
              </>
            )}

            <div className="absolute bottom-0 left-0 right-0 px-6 py-10 max-w-7xl mx-auto">
              <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide mb-4 ${categoryColor(tour.category)}`}>
                {tour.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-3xl">
                {tour.title}
              </h1>
              <p className="mt-3 text-white/60 flex items-center gap-3 text-sm">
                <span>📍 {tour.city}</span>
                <span>·</span>
                <span>🕐 {formatDuration(tour.durationMinutes)}</span>
              </p>
            </div>
          </div>
        );
      })()}

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-[1fr_340px] gap-10 items-start">
        <div className="space-y-10">

          {tour.summary && (
            <p className="text-lg leading-8 text-neutral-600 font-medium">{tour.summary}</p>
          )}

          {tour.description && (
            <div>
              <h2 className="text-2xl font-black mb-4">About This Tour</h2>
              <p className="text-neutral-600 leading-8 whitespace-pre-line">{tour.description}</p>
            </div>
          )}

          {highlights.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-5">Highlights</h2>
              <ul className="space-y-3">
                {highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-700">
                    <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-[#6C4CF1]/10 text-[#6C4CF1] flex items-center justify-center text-xs font-black">✓</span>
                    <span className="leading-6">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tour.places && tour.places.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-5">What You&apos;ll See</h2>
              <ol className="space-y-4">
                {[...tour.places]
                  .sort((a, b) => a.ord - b.ord)
                  .map((place, i) => (
                    <li key={place.id} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6C4CF1] text-white flex items-center justify-center text-sm font-black shadow-sm">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0 pb-4 border-b border-black/5 last:border-0">
                        <p className="font-black text-[#0A0A0F]">{place.name}</p>
                        {place.description && (
                          <p className="text-sm text-neutral-500 mt-1 leading-6">{place.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
              </ol>
            </div>
          )}

          {tour.includes && tour.includes.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-5">What&apos;s Included</h2>
              <div className="grid sm:grid-cols-2 gap-2">
                {[...tour.includes]
                  .sort((a, b) => a.ord - b.ord)
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 border text-sm font-medium ${
                        item.isIncluded
                          ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                          : "bg-red-50 border-red-100 text-red-700"
                      }`}
                    >
                      <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${
                        item.isIncluded ? "bg-emerald-500 text-white" : "bg-red-400 text-white"
                      }`}>
                        {item.isIncluded ? "✓" : "✗"}
                      </span>
                      {item.label}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {tour.importantInfo && tour.importantInfo.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-5">Important Information</h2>
              <div className="space-y-2">
                {[...tour.importantInfo]
                  .sort((a, b) => a.ord - b.ord)
                  .map((item) => (
                    <div key={item.id} className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-900">
                      <span className="mt-0.5 flex-shrink-0">⚠️</span>
                      <span className="leading-6">{item.label}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {tour.meetingPointText && (
            <div>
              <h2 className="text-2xl font-black mb-3">Meeting Point</h2>
              <div className="flex items-start gap-3 rounded-2xl bg-[#F7F7FB] border border-black/5 px-5 py-4">
                <span className="text-2xl flex-shrink-0">📍</span>
                <div>
                  <p className="text-neutral-700 leading-6">{tour.meetingPointText}</p>
                  {tour.meetingPointLat && tour.meetingPointLng && (
                    <a
                      href={`https://www.google.com/maps?q=${tour.meetingPointLat},${tour.meetingPointLng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#6C4CF1] hover:underline"
                    >
                      Open in Google Maps ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}

          {tour.languagePrices && tour.languagePrices.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-4">Languages Available</h2>
              <div className="flex flex-wrap gap-2">
                {tour.languagePrices.map((lp) => (
                  <span
                    key={lp.code}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border ${
                      lp.isRare
                        ? "bg-amber-50 border-amber-200 text-amber-700"
                        : "bg-[#F7F7FB] border-black/10 text-neutral-600"
                    }`}
                  >
                    {lp.displayName}
                    {lp.isRare && <span className="ml-1 text-[10px]">★</span>}
                  </span>
                ))}
              </div>
            </div>
          )}

          {tour.pricingTiers && tour.pricingTiers.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-4">Pricing</h2>
              <div className="rounded-2xl border border-black/[0.06] overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-[#F7F7FB] border-b border-black/5">
                    <tr>
                      <th className="text-left px-5 py-3 font-black text-[#0A0A0F]">Group Size</th>
                      <th className="text-right px-5 py-3 font-black text-[#0A0A0F]">Guide Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tour.pricingTiers.map((tier, i) => (
                      <tr key={i} className="border-b border-black/5 last:border-0 hover:bg-[#F7F7FB]/60 transition-colors">
                        <td className="px-5 py-3.5 text-neutral-600">
                          {tier.participantCount === 1
                            ? "1 person"
                            : `${tier.participantCount}+ people`}
                        </td>
                        <td className="px-5 py-3.5 text-right font-black text-[#6C4CF1]">
                          {tier.guideAmount} {tour.currency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-neutral-400 mt-2">Prices are per guide, not per person.</p>
            </div>
          )}
        </div>

        {/* Sticky booking sidebar */}
        <aside className="sticky top-24 rounded-3xl bg-white border border-black/[0.08] shadow-lg p-6 space-y-5">
          <div>
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide">{tt.startingFrom}</p>
            <div className="flex items-baseline gap-2 mt-1">
              {hasDiscount && (
                <span className="text-base text-neutral-400 line-through">
                  {tour.compareAtPrice} {tour.currency}
                </span>
              )}
              <span className="text-3xl font-black text-[#6C4CF1]">
                {tour.basePrice} {tour.currency}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">{tt.perGuide}</p>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#F7F7FB] px-4 py-3">
            <span className="text-xl">🕐</span>
            <div>
              <p className="text-xs text-neutral-400 font-medium">Duration</p>
              <p className="font-black text-sm">{formatDuration(tour.durationMinutes)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#F7F7FB] px-4 py-3">
            <span className="text-xl">📍</span>
            <div>
              <p className="text-xs text-neutral-400 font-medium">City</p>
              <p className="font-black text-sm">{tour.city}</p>
            </div>
          </div>

          <a
            href="/#download"
            className="block w-full text-center rounded-full bg-[#6C4CF1] text-white font-bold py-3.5 hover:bg-[#5a3dd4] transition-colors shadow-sm hover:shadow-[0_0_20px_rgba(108,76,241,0.35)]"
          >
            Book via App →
          </a>

          <p className="text-xs text-neutral-400 text-center leading-5">
            Download the VibeGuide app to book this tour and connect with a verified local guide.
          </p>

          <div className="flex gap-2 pt-1">
            <a
              href="/#download"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-black/10 py-2 text-xs font-semibold text-neutral-600 hover:border-[#6C4CF1]/40 hover:text-[#6C4CF1] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
            </a>
            <a
              href="/#download"
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-black/10 py-2 text-xs font-semibold text-neutral-600 hover:border-[#6C4CF1]/40 hover:text-[#6C4CF1] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.19.96.08l13.12-7.57-2.8-2.8-11.28 10.29zM20.9 10.42L17.96 8.7 14.84 11.8l3.13 3.12 2.95-1.7c.84-.48.84-2.32-.02-2.8zM2.14.75C2.05 1 2 1.26 2 1.56v20.89c0 .3.04.57.14.81L13.61 11.8 2.14.75zM3.18.24L14.84 11.8l-2.8 2.8L.22.32C.56.21.9.23 1.22.4l1.96 1.13V.24z"/>
              </svg>
              Google Play
            </a>
          </div>
        </aside>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-black/[0.08] px-4 py-3 flex items-center gap-3 shadow-lg">
        <div className="flex-1">
          <p className="text-xs text-neutral-400">{tt.startingFrom}</p>
          <p className="font-black text-lg text-[#6C4CF1]">
            {tour.basePrice} {tour.currency}
          </p>
        </div>
        <a
          href="/#download"
          className="rounded-full bg-[#6C4CF1] text-white font-bold px-6 py-3 text-sm hover:bg-[#5a3dd4] transition-colors"
        >
          Book via App →
        </a>
      </div>

      <div className="md:hidden h-20" />

      {/* Footer */}
      <footer className="bg-[#F7F7FB] border-t border-black/[0.06] px-6 py-12 mt-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <a href="/" className="flex items-center gap-2 font-black text-[#0A0A0F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vibeguide-icon.png" alt="VibeGuide" width={24} height={24} style={{ mixBlendMode: "multiply" }} />
            VibeGuide
          </a>
          <p>© {new Date().getFullYear()} VibeCore Turizm Ltd. Şti. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/tours" className="hover:text-black transition-colors">All Tours</a>
            <a href="/privacy" className="hover:text-black transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-black transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
