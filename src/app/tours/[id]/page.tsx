"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import ShareButton from "@/components/ShareButton";
import Price from "@/components/Price";
import { languageByCode } from "@/lib/languages";

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
  provinceName?: string | null;
  districtName?: string | null;
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
  badges?: string;
  photos?: TourPhoto[];
  includes?: TourInclude[];
  importantInfo?: TourImportantInfo[];
}

// Kişi sayısına göre kişi-başı fiyat: tam eşleşen tier varsa onu (guideAmount/count),
// yoksa basePrice. Toplam = perPerson * kişi.
function perPersonForCount(tour: TourDetail, count: number): number {
  const tiers = (tour.pricingTiers ?? []).filter(
    (t) => t.participantCount > 0 && t.guideAmount > 0
  );
  const exact = tiers.find((t) => t.participantCount === count);
  if (exact) return Math.round((exact.guideAmount / exact.participantCount) * 100) / 100;
  return tour.basePrice;
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
  return map[cat?.toLowerCase()] ?? "bg-neutral-100 text-neutral-800";
}

export default function TourDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const { locale } = useT();
  const router = useRouter();
  const tt = getToursT(locale);
  const [tour, setTour] = useState<TourDetail | null | "loading" | "error">("loading");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // Tur detay sekmeleri — uzun sayfayı bölümlere ayırır (GetYourGuide tarzı).
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "included" | "info">("overview");
  // Rezervasyon widget'ı: tarih + kişi sayısı (checkout'a taşınır).
  const [bkDate, setBkDate] = useState("");
  const [bkPeople, setBkPeople] = useState(1);

  const openLightbox = useCallback((i: number) => { setLightboxIndex(i); setLightboxOpen(true); }, []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const lbPrev = useCallback((total: number) => setLightboxIndex((i) => (i - 1 + total) % total), []);
  const lbNext = useCallback((total: number) => setLightboxIndex((i) => (i + 1) % total), []);

  useEffect(() => {
    if (!id) return;
    setTour("loading");
    clientFetch(`/api/tours/${id}?locale=${locale}`, { cache: "no-store" })
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
        <Navbar activePage="tours" />
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
          <h1 className="text-2xl font-black text-[#0A0A0F] mb-2">{tt.errTitle}</h1>
          <p className="text-neutral-800 mb-6">{tt.errMsg}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => window.location.reload()} className="rounded-full bg-[#6C4CF1] text-white text-sm font-bold px-6 py-2.5 hover:bg-[#5a3dd4] transition-colors">
              {tt.tryAgain}
            </button>
            <a href="/tours" className="rounded-full border border-black/10 text-neutral-800 text-sm font-bold px-6 py-2.5 hover:bg-neutral-50 transition-colors">
              {tt.browseAllTours}
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
          <h1 className="text-2xl font-black text-[#0A0A0F] mb-2">{tt.notFoundTitle}</h1>
          <p className="text-neutral-800 mb-6">{tt.notFoundMsg}</p>
          <a href="/tours" className="rounded-full bg-[#6C4CF1] text-white text-sm font-bold px-6 py-2.5 hover:bg-[#5a3dd4] transition-colors">
            {tt.browseAllTours}
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
      <Navbar activePage="tours" />

      {/* Photo gallery hero */}
      {(() => {
        const allPhotos = tour.photos && tour.photos.length > 0
          ? tour.photos
          : tour.coverPhotoUrl
            ? [{ id: 0, url: tour.coverPhotoUrl, caption: null, ord: 0 }]
            : [];
        const main = allPhotos[0];
        const thumbs = allPhotos.slice(1, 5);
        const remaining = allPhotos.length - 5;

        return (
          <>
            {/* Title bar — above gallery */}
            <div className="pt-20 pb-4 px-6 max-w-7xl mx-auto">
              <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide mb-3 ${categoryColor(tour.category)}`}>
                {tour.category}
              </span>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-2xl md:text-4xl font-black text-[#0A0A0F] leading-tight">
                  {tour.title}
                </h1>
                <div className="shrink-0 mt-1">
                  <ShareButton title={tour.title} variant="icon" />
                </div>
              </div>
              <p className="mt-2 text-neutral-800 flex items-center gap-3 text-sm">
                <span>📍 {tour.districtName && tour.provinceName ? `${tour.districtName}, ${tour.provinceName}` : (tour.provinceName || tour.city)}</span>
                <span>·</span>
                <span>🕐 {formatDuration(tour.durationMinutes)}</span>
              </p>
            </div>

            {/* Gallery grid */}
            {allPhotos.length > 0 && (
              <div className="px-6 max-w-7xl mx-auto">
                {/* Mobile: single photo + "See all X photos" button */}
                <div className="md:hidden relative rounded-2xl overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={main!.url} alt={main!.caption ?? tour.title} className="w-full h-64 object-cover" />
                  {allPhotos.length > 1 && (
                    <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#0A0A0F] text-xs font-black px-3 py-1.5 rounded-xl shadow-sm">
                      🖼️ {tt.seeAllPhotos.replace("{n}", String(allPhotos.length))}
                    </button>
                  )}
                </div>

                {/* Desktop: GYG-style big left + grid right */}
                <div className="hidden md:grid grid-cols-[2fr_1fr] gap-2 rounded-2xl overflow-hidden h-[420px]">
                  {/* Main large photo */}
                  <div className="relative cursor-pointer group" onClick={() => openLightbox(0)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={main!.url} alt={main!.caption ?? tour.title} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-200" />
                  </div>

                  {/* Right thumbnails 2x2 */}
                  {thumbs.length > 0 && (
                    <div className="grid grid-cols-2 grid-rows-2 gap-2">
                      {thumbs.map((photo, i) => {
                        const isLast = i === 3 && remaining > 0;
                        return (
                          <div
                            key={photo.id}
                            className="relative cursor-pointer group overflow-hidden"
                            onClick={() => openLightbox(i + 1)}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={photo.url} alt={photo.caption ?? ""} className="w-full h-full object-cover group-hover:brightness-90 transition-all duration-200" />
                            {isLast && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white font-black text-sm">+{remaining + 1} photos</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {/* Fill empty slots if fewer than 4 thumbs */}
                      {Array.from({ length: Math.max(0, 4 - thumbs.length) }).map((_, i) => (
                        <div key={`empty-${i}`} className="bg-neutral-100" />
                      ))}
                    </div>
                  )}
                </div>

                {/* "See all photos" button */}
                {allPhotos.length > 1 && (
                  <div className="hidden md:flex justify-end mt-2">
                    <button
                      onClick={() => openLightbox(0)}
                      className="flex items-center gap-1.5 text-xs font-black text-[#0A0A0F] border border-black/15 bg-white px-4 py-2 rounded-xl hover:bg-neutral-50 transition-colors shadow-sm"
                    >
                      🖼️ {tt.seeAllPhotos.replace("{n}", String(allPhotos.length))}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Lightbox */}
            {lightboxOpen && (
              <Lightbox
                photos={allPhotos}
                index={lightboxIndex}
                onClose={closeLightbox}
                onPrev={() => lbPrev(allPhotos.length)}
                onNext={() => lbNext(allPhotos.length)}
                onSelect={setLightboxIndex}
              />
            )}
          </>
        );
      })()}

      {/* Body */}
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-[1fr_340px] gap-10 items-start">
        <div className="space-y-10">

          {/* Badges */}
          {tour.badges && tour.badges.trim() && (() => {
            const BADGE_META: Record<string, { label: string; color: string }> = {
              skip_the_line:        { label: "⚡ Skip the line",        color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
              bestseller:           { label: "🏆 Bestseller",           color: "bg-orange-100 text-orange-700 border-orange-200" },
              free_cancellation:    { label: "✓ Free cancellation",     color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
              small_group:          { label: "👥 Small group",          color: "bg-blue-100 text-blue-700 border-blue-200" },
              private_tour:         { label: "🔒 Private tour",         color: "bg-purple-100 text-purple-700 border-purple-200" },
              instant_confirmation: { label: "✅ Instant confirmation", color: "bg-teal-100 text-teal-700 border-teal-200" },
              live_guide:           { label: "🎤 Live guide",           color: "bg-rose-100 text-rose-700 border-rose-200" },
              pickup_included:      { label: "🚌 Pickup included",      color: "bg-indigo-100 text-indigo-700 border-indigo-200" },
            };
            const keys = tour.badges!.split(",").map(s => s.trim()).filter(Boolean);
            return (
              <div className="flex flex-wrap gap-2">
                {keys.map((key) => {
                  const m = BADGE_META[key];
                  return m ? (
                    <span key={key} className={`px-3 py-1.5 rounded-full text-xs font-bold border ${m.color}`}>
                      {m.label}
                    </span>
                  ) : null;
                })}
              </div>
            );
          })()}

          {tour.summary && (
            <p className="text-lg leading-8 text-neutral-800 font-medium">{tour.summary}</p>
          )}

          {/* Hangi sekmelerin içeriği var? Boş olanları gizle. (VibeSquad sekme dışı.) */}
          {(() => {
            const hasOverview = !!tour.description || highlights.length > 0;
            const hasItinerary = !!(tour.places && tour.places.length > 0);
            const hasIncluded = !!(tour.includes && tour.includes.length > 0);
            const hasInfo = !!(
              (tour.importantInfo && tour.importantInfo.length > 0) ||
              tour.meetingPointText ||
              (tour.languagePrices && tour.languagePrices.length > 0)
            );
            const tabs = [
              hasOverview && { key: "overview" as const, label: tt.tabOverview },
              hasItinerary && { key: "itinerary" as const, label: tt.tabItinerary },
              hasIncluded && { key: "included" as const, label: tt.tabIncluded },
              hasInfo && { key: "info" as const, label: tt.tabInfo },
            ].filter(Boolean) as { key: typeof activeTab; label: string }[];
            // Aktif sekme boşsa ilk dolu sekmeye geç.
            if (tabs.length > 0 && !tabs.some((t) => t.key === activeTab)) {
              setTimeout(() => setActiveTab(tabs[0].key), 0);
            }
            if (tabs.length <= 1) return null; // tek/boş sekme → bar gösterme
            return (
              <div className="sticky top-16 z-10 -mx-1 flex gap-1 overflow-x-auto border-b border-black/[0.08] bg-white/95 backdrop-blur-sm py-1">
                {tabs.map((tb) => (
                  <button
                    key={tb.key}
                    onClick={() => setActiveTab(tb.key)}
                    className={`shrink-0 cursor-pointer rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                      activeTab === tb.key
                        ? "bg-[#6C4CF1] text-white"
                        : "text-neutral-700 hover:text-[#6C4CF1] hover:bg-[#6C4CF1]/[0.06]"
                    }`}
                  >
                    {tb.label}
                  </button>
                ))}
              </div>
            );
          })()}

          {/* ── OVERVIEW: About + Highlights ── */}
          {activeTab === "overview" && tour.description && (
            <div>
              <h2 className="text-2xl font-black mb-4">{tt.aboutTour}</h2>
              <p className="text-neutral-800 leading-8 whitespace-pre-line">{tour.description}</p>
            </div>
          )}

          {activeTab === "overview" && highlights.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-5">{tt.highlights}</h2>
              <ul className="space-y-3">
                {highlights.map((hl, i) => (
                  <li key={i} className="flex items-start gap-3 text-neutral-800">
                    <span className="mt-1 flex-shrink-0 h-5 w-5 rounded-full bg-[#6C4CF1]/10 text-[#6C4CF1] flex items-center justify-center text-xs font-black">✓</span>
                    <span className="leading-6">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ── ITINERARY: What You'll See ── */}
          {activeTab === "itinerary" && tour.places && tour.places.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-5">{tt.whatYoullSee}</h2>
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
                          <p className="text-sm text-neutral-700 mt-1 leading-6">{place.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
              </ol>
            </div>
          )}

          {activeTab === "included" && tour.includes && tour.includes.length > 0 && (() => {
            const sorted = [...tour.includes].sort((a, b) => a.ord - b.ord);
            const included = sorted.filter((i) => i.isIncluded);
            const notIncluded = sorted.filter((i) => !i.isIncluded);
            return (
              <div className="space-y-8">
                {included.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-black mb-5">{tt.whatsIncluded}</h2>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {included.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 border text-sm font-medium bg-emerald-50 border-emerald-100 text-emerald-800"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black bg-emerald-500 text-white">
                            ✓
                          </span>
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {notIncluded.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-black mb-5">{tt.notIncluded}</h2>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {notIncluded.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 border text-sm font-medium bg-red-50 border-red-100 text-red-700"
                        >
                          <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black bg-red-400 text-white">
                            ✗
                          </span>
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {activeTab === "info" && tour.importantInfo && tour.importantInfo.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-5">{tt.importantInfo}</h2>
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

          {activeTab === "info" && tour.meetingPointText && (
            <div>
              <h2 className="text-2xl font-black mb-3">{tt.meetingPoint}</h2>
              <div className="flex items-start gap-3 rounded-2xl bg-[#F7F7FB] border border-black/5 px-5 py-4">
                <span className="text-2xl flex-shrink-0">📍</span>
                <div>
                  <p className="text-neutral-800 leading-6">{tour.meetingPointText}</p>
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

          {activeTab === "info" && tour.languagePrices && tour.languagePrices.length > 0 && (
            <div>
              <h2 className="text-2xl font-black mb-4">{tt.availableIn}</h2>
              <div className="flex flex-wrap gap-2">
                {tour.languagePrices.map((lp) => {
                  const lang = languageByCode(lp.code);
                  return (
                    <span
                      key={lp.code}
                      title={lang.name}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-[#F7F7FB] border border-black/[0.06] text-neutral-800"
                    >
                      {lang.fi && (
                        <span
                          className={`fi fi-${lang.fi} rounded-sm`}
                          style={{ width: 20, height: 15, display: "inline-block" }}
                        />
                      )}
                      <span>{lang.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* VibeSquad — sekme dışı, her zaman görünür ayrı bölüm.
              Kişi başı fiyat = guideAmount(toplam) ÷ kişi; grup büyüdükçe düşer. */}
          {tour.pricingTiers && tour.pricingTiers.length > 0 && (() => {
            const tiers = [...tour.pricingTiers]
              .filter((t) => t.participantCount > 0 && t.guideAmount > 0)
              .sort((a, b) => a.participantCount - b.participantCount);
            if (tiers.length === 0) return null;
            const perPerson = (t: PricingTier) =>
              Math.round((t.guideAmount / t.participantCount) * 100) / 100;
            const cheapest = Math.min(...tiers.map(perPerson));
            return (
              <div className="pt-8 border-t border-black/[0.08]">
                <h2 className="text-2xl font-black mb-1">{tt.squadTitle}</h2>
                <p className="text-sm text-neutral-700 mb-4">
                  {tt.squadSub}
                </p>
                <div className="rounded-2xl border border-black/[0.06] overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-[#F7F7FB] border-b border-black/5">
                      <tr>
                        <th className="text-left px-5 py-3 font-black text-[#0A0A0F]">{tt.groupSize}</th>
                        <th className="text-right px-5 py-3 font-black text-[#0A0A0F]">{tt.pricePerPerson}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tiers.map((t, i) => {
                        const pp = perPerson(t);
                        const isBest = pp === cheapest;
                        return (
                          <tr key={i} className="border-b border-black/5 last:border-0 hover:bg-[#F7F7FB]/60 transition-colors">
                            <td className="px-5 py-3.5 text-neutral-800">
                              {t.participantCount} {tt.peopleSuffix}
                              {isBest && (
                                <span className="ml-2 inline-block rounded-full bg-[#6C4CF1]/10 px-2 py-0.5 text-[10px] font-black text-[#6C4CF1] align-middle">
                                  {tt.bestPrice}
                                </span>
                              )}
                            </td>
                            <td className="px-5 py-3.5 text-right font-black text-[#6C4CF1]">
                              <Price amount={pp} currency={tour.currency} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-neutral-800 mt-2">
                  {tt.squadNote}
                </p>
              </div>
            );
          })()}

          <ReviewsSection tourId={tour.id} />
        </div>

        {/* Sticky booking sidebar */}
        <aside className="sticky top-24 rounded-3xl bg-white border border-black/[0.08] shadow-lg p-6 space-y-5">
          <div>
            <p className="text-xs font-semibold text-neutral-800 uppercase tracking-wide">{tt.startingFrom}</p>
            <div className="flex items-baseline gap-2 mt-1">
              {hasDiscount && (
                <span className="text-base text-neutral-800 line-through">
                  <Price amount={tour.compareAtPrice!} currency={tour.currency} />
                </span>
              )}
              <span className="text-3xl font-black text-[#6C4CF1]">
                <Price amount={tour.basePrice} currency={tour.currency} />
              </span>
            </div>
            <p className="text-xs text-neutral-800 mt-0.5">{tt.perPerson}</p>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#F7F7FB] px-4 py-3">
            <span className="text-xl">🕐</span>
            <div>
              <p className="text-xs text-neutral-800 font-medium">{tt.duration}</p>
              <p className="font-black text-sm">{formatDuration(tour.durationMinutes)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-[#F7F7FB] px-4 py-3">
            <span className="text-xl">📍</span>
            <div>
              <p className="text-xs text-neutral-800 font-medium">{tt.location}</p>
              <p className="font-black text-sm">{tour.districtName && tour.provinceName ? `${tour.districtName}, ${tour.provinceName}` : (tour.provinceName || tour.city)}</p>
            </div>
          </div>

          {/* ── Rezervasyon: tarih + kişi sayısı + canlı toplam ── */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">{tt.bkDate}</label>
              <input
                type="date"
                value={bkDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setBkDate(e.target.value)}
                className="w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#6C4CF1] focus:ring-2 focus:ring-[#6C4CF1]/10 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-neutral-800 mb-1">{tt.bkTravelers}</label>
              <div className="flex items-center justify-between rounded-xl border border-black/10 px-3 py-1.5">
                <button
                  type="button"
                  onClick={() => setBkPeople((p) => Math.max(1, p - 1))}
                  className="w-8 h-8 rounded-lg bg-[#F7F7FB] text-[#6C4CF1] font-black text-lg hover:bg-[#6C4CF1]/10 transition-colors"
                  aria-label="−"
                >−</button>
                <span className="font-black text-base">{bkPeople}</span>
                <button
                  type="button"
                  onClick={() => setBkPeople((p) => Math.min(20, p + 1))}
                  className="w-8 h-8 rounded-lg bg-[#F7F7FB] text-[#6C4CF1] font-black text-lg hover:bg-[#6C4CF1]/10 transition-colors"
                  aria-label="+"
                >+</button>
              </div>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-semibold text-neutral-800">{tt.bkTotal}</span>
              <span className="text-2xl font-black text-[#6C4CF1]">
                <Price amount={perPersonForCount(tour, bkPeople) * bkPeople} currency={tour.currency} />
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              if (!bkDate) { alert(tt.bkSelectDate); return; }
              router.push(`/tours/${tour.id}/checkout?date=${bkDate}&people=${bkPeople}`);
            }}
            className="block w-full text-center rounded-full bg-[#6C4CF1] text-white font-bold py-3.5 hover:bg-[#5a3dd4] transition-colors shadow-sm hover:shadow-[0_0_20px_rgba(108,76,241,0.35)]"
          >
            {tt.bkContinue}
          </button>

          {/* iyzico güven rozeti */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo_band_colored@2x.png" alt="iyzico ile Öde · Visa · Mastercard · Amex · Troy" className="h-6 w-auto mx-auto opacity-90" />

          <p className="text-xs text-neutral-800 text-center leading-5">
            {tt.bookNote}
          </p>
        </aside>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-black/[0.08] px-4 py-3 flex items-center gap-3 shadow-lg">
        <div className="flex-1">
          <p className="text-xs text-neutral-800">{tt.startingFrom}</p>
          <p className="font-black text-lg text-[#6C4CF1]">
            <Price amount={tour.basePrice} currency={tour.currency} />
          </p>
        </div>
        <button
          onClick={() => {
            const d = bkDate || new Date().toISOString().split("T")[0];
            router.push(`/tours/${tour.id}/checkout?date=${d}&people=${bkPeople}`);
          }}
          className="rounded-full bg-[#6C4CF1] text-white font-bold px-6 py-3 text-sm hover:bg-[#5a3dd4] transition-colors"
        >
          {tt.bkContinue}
        </button>
      </div>

      <div className="md:hidden h-20" />

      <MainFooter />
    </main>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: {
  photos: TourPhoto[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
}) {
  const thumbsRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onPrev, onNext]);

  // Scroll active thumb into view
  useEffect(() => {
    const el = thumbsRef.current?.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const current = photos[index];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col" onClick={onClose}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
        <span className="text-white/60 text-sm font-semibold">{index + 1} / {photos.length}</span>
        <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-lg transition-colors">✕</button>
      </div>

      {/* Main image */}
      <div className="flex-1 flex items-center justify-center relative px-4 min-h-0" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onPrev}
          className="absolute left-2 md:left-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-2xl transition-colors z-10"
        >‹</button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.url}
          src={current.url}
          alt={current.caption ?? ""}
          className="max-h-full max-w-full object-contain rounded-xl select-none"
          style={{ maxHeight: "calc(100vh - 180px)" }}
        />

        <button
          onClick={onNext}
          className="absolute right-2 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-2xl transition-colors z-10"
        >›</button>
      </div>

      {/* Caption */}
      {current.caption && (
        <p className="text-center text-white/60 text-sm px-6 py-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          {current.caption}
        </p>
      )}

      {/* Thumbnail strip */}
      <div
        ref={thumbsRef}
        className="flex gap-2 overflow-x-auto px-4 py-3 flex-shrink-0 scrollbar-hide"
        onClick={(e) => e.stopPropagation()}
      >
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            onClick={() => onSelect(i)}
            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
              i === index ? "border-white scale-105" : "border-transparent opacity-50 hover:opacity-80"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

interface PublicReview {
  id: number;
  fullName: string;
  nationality: string | null;
  rating: number;
  comment: string | null;
  createdAt: string;
}

function ReviewStars({ n, size = 14 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(n) ? "#F59E0B" : "#E5E7EB"} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}

function ReviewsSection({ tourId }: { tourId: number }) {
  const { locale } = useT();
  const tt = getToursT(locale);
  const [data, setData] = useState<{ count: number; avgRating: number; reviews: PublicReview[] } | null>(null);

  useEffect(() => {
    clientFetch(`/api/tours/${tourId}/public-reviews`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
  }, [tourId]);

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <h2 className="text-2xl font-black">
          {tt.reviews}
          {data && data.count > 0 && (
            <span className="ml-3 inline-flex items-center gap-2 text-lg align-middle">
              <ReviewStars n={data.avgRating} size={18} />
              <span className="text-[#0A0A0F]">{data.avgRating.toFixed(1)}</span>
              <span className="text-neutral-800 text-sm font-semibold">({data.count})</span>
            </span>
          )}
        </h2>
        <a href={`/tours/${tourId}/review`}
          className="rounded-full border border-[#6C4CF1]/30 text-[#6C4CF1] font-bold text-sm px-5 py-2 hover:bg-[#6C4CF1]/5 transition-colors">
          ✍️ {tt.writeReview}
        </a>
      </div>

      {!data || data.reviews.length === 0 ? (
        <div className="rounded-2xl bg-[#F7F7FB] border border-black/5 p-8 text-center">
          <p className="text-sm font-semibold text-neutral-700">{tt.noReviews}</p>
          <p className="text-xs text-neutral-800 mt-1">{tt.beTheFirst}</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {data.reviews.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white border border-black/[0.06] p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6C4CF1] to-[#8B5CF6] flex items-center justify-center text-sm font-black text-white shrink-0">
                  {r.fullName[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[#0A0A0F] text-sm truncate">{r.fullName}</p>
                  {r.nationality && <p className="text-xs text-neutral-800">{r.nationality}</p>}
                </div>
              </div>
              <ReviewStars n={r.rating} />
              {r.comment && <p className="mt-2 text-sm text-neutral-800 leading-6">{r.comment}</p>}
              <p className="mt-3 text-[11px] text-neutral-800">{new Date(r.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
