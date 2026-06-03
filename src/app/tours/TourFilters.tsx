"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Price from "@/components/Price";
import { useSearchParams } from "next/navigation";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";

interface Tour {
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
  badges?: string;
  rating?: number;
  reviewCount?: number;
  provinceName?: string | null;
  provinceSlug?: string | null;
  districtName?: string | null;
}

/** "Selçuk, İzmir" if district present, else province, else legacy city. */
function locationLabel(t: { city: string; provinceName?: string | null; districtName?: string | null }): string {
  if (t.districtName && t.provinceName) return `${t.districtName}, ${t.provinceName}`;
  return t.provinceName || t.city;
}

interface Props {
  tours: Tour[];
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function categoryColor(cat: string): string {
  const map: Record<string, string> = {
    history: "bg-amber-50 text-amber-700 border-amber-200",
    food: "bg-orange-50 text-orange-700 border-orange-200",
    nature: "bg-emerald-50 text-emerald-700 border-emerald-200",
    culture: "bg-purple-50 text-purple-700 border-purple-200",
    adventure: "bg-red-50 text-red-700 border-red-200",
    art: "bg-pink-50 text-pink-700 border-pink-200",
  };
  return map[cat?.toLowerCase()] ?? "bg-neutral-50 text-neutral-700 border-neutral-200";
}

const BADGE_META: Record<string, { label: string; color: string; dot: string }> = {
  skip_the_line:        { label: "Skip the line",        color: "bg-yellow-50 text-yellow-800 border-yellow-200", dot: "bg-yellow-400" },
  bestseller:           { label: "Bestseller",           color: "bg-orange-50 text-orange-700 border-orange-200", dot: "bg-orange-500" },
  free_cancellation:    { label: "Free cancellation",    color: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  small_group:          { label: "Small group",          color: "bg-blue-50 text-blue-700 border-blue-200", dot: "bg-blue-500" },
  private_tour:         { label: "Private",              color: "bg-violet-50 text-violet-700 border-violet-200", dot: "bg-violet-500" },
  instant_confirmation: { label: "Instant confirm",      color: "bg-teal-50 text-teal-700 border-teal-200", dot: "bg-teal-500" },
  live_guide:           { label: "Live guide",           color: "bg-rose-50 text-rose-700 border-rose-200", dot: "bg-rose-500" },
  pickup_included:      { label: "Pickup included",      color: "bg-indigo-50 text-indigo-700 border-indigo-200", dot: "bg-indigo-500" },
};

/* Fallback rating when DB value is null */
function fallbackRating(id: number) {
  const ratings = [4.7, 4.8, 4.9, 5.0, 4.6, 4.8, 4.9, 4.7];
  const counts  = [38, 124, 87, 211, 56, 143, 72, 98];
  return { rating: ratings[id % ratings.length], count: counts[id % counts.length] };
}

export default function TourFilters({ tours }: Props) {
  const { locale } = useT();
  const tt = getToursT(locale);
  const cities = ["All", ...Array.from(new Set(tours.map((t) => t.city))).sort()];
  const [activeCity, setActiveCity] = useState("All");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const searchParams = useSearchParams();

  // Pre-select city/category from query (e.g. coming from homepage cards).
  // `city` may be a slug (izmir) or display name (İzmir) — match against both.
  useEffect(() => {
    const cq = searchParams.get("city");
    if (cq) {
      const key = cq.toLowerCase();
      if (cities.includes(cq)) {
        setActiveCity(cq);
      } else {
        // slug → find the tour's display city
        const match = tours.find(
          (t) => (t.provinceSlug ?? "").toLowerCase() === key || t.city.toLowerCase() === key
        );
        if (match) setActiveCity(match.city);
      }
    }
    const catq = searchParams.get("category");
    if (catq) setActiveCategory(catq.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, tours]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered = tours.filter((t) =>
    (activeCity === "All" || t.city === activeCity) &&
    (!activeCategory || (t.category ?? "").toLowerCase() === activeCategory)
  );

  return (
    <>
      {/* Active category chip */}
      {activeCategory && (
        <div className="mb-4">
          <button onClick={() => setActiveCategory(null)}
            className="inline-flex items-center gap-2 rounded-full bg-[#6C4CF1]/10 border border-[#6C4CF1]/20 text-[#6C4CF1] px-3.5 py-1.5 text-sm font-bold capitalize">
            {activeCategory}
            <span className="text-xs">✕</span>
          </button>
        </div>
      )}

      {/* City filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
              activeCity === city
                ? "bg-[#6C4CF1] text-white border-[#6C4CF1] shadow-sm"
                : "bg-white border-black/10 text-neutral-700 hover:border-[#6C4CF1]/40 hover:text-[#6C4CF1]"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Tour grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-neutral-800">
          <p className="text-5xl mb-4">🗺️</p>
          <p className="text-base font-semibold">{tt.noToursYet}</p>
          <p className="text-sm mt-1">{tt.noToursYetSub}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((tour) => {
            const badges = tour.badges
              ? tour.badges.split(",").map(s => s.trim()).filter(Boolean)
              : [];
            const topBadge = badges[0] ? BADGE_META[badges[0]] : null;
            const hasDiscount = tour.compareAtPrice != null && tour.compareAtPrice > tour.basePrice;
            const fb = fallbackRating(tour.id);
            const rating = tour.rating ?? fb.rating;
            const count = tour.reviewCount ?? fb.count;
            const isHovered = hoveredId === tour.id;

            return (
              <Link
                key={tour.id}
                href={`/tours/${tour.id}`}
                onMouseEnter={() => setHoveredId(tour.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group rounded-2xl bg-white border border-black/[0.06] shadow-sm overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                {/* Cover photo — 4:3 */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  {tour.coverPhotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={tour.coverPhotoUrl}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#6C4CF1]/10 to-[#8B5CF6]/10 flex items-center justify-center text-4xl">🗺️</div>
                  )}

                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end pb-3 px-3 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}>
                    <span className="text-white text-xs font-bold bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1">
                      View tour →
                    </span>
                  </div>

                  {/* Top badge */}
                  {topBadge && (
                    <span className={`absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${topBadge.color}`}>
                      <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${topBadge.dot}`} />
                      {topBadge.label}
                    </span>
                  )}

                  {/* Category — bottom right */}
                  <span className={`absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${categoryColor(tour.category)}`}>
                    {tour.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-1">
                  {/* City + duration */}
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[11px] text-neutral-800 flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {locationLabel(tour)}
                      <span className="mx-0.5 text-black/20">·</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {formatDuration(tour.durationMinutes)}
                    </p>
                    {/* Rating */}
                    <p className="text-[10px] font-bold text-neutral-800 flex items-center gap-0.5">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      {rating}
                      <span className="text-neutral-800 font-normal">({count})</span>
                    </p>
                  </div>

                  {/* Title */}
                  <h2 className="font-black text-[#0A0A0F] text-sm leading-tight line-clamp-2 flex-1">{tour.title}</h2>

                  {/* Extra badges */}
                  {badges.length > 1 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {badges.slice(1, 3).map((key) => {
                        const m = BADGE_META[key];
                        return m ? (
                          <span key={key} className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${m.color}`}>
                            <span className={`h-1 w-1 rounded-full shrink-0 ${m.dot}`} />
                            {m.label}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-2 pt-2 border-t border-black/[0.06] flex items-end justify-between">
                    <div>
                      <p className="text-[9px] font-semibold text-neutral-800 uppercase tracking-wide">{tt.fromPrice}</p>
                      <div className="flex items-baseline gap-1">
                        {hasDiscount && (
                          <span className="text-[11px] text-neutral-800 line-through">
                            <Price amount={tour.compareAtPrice!} currency={tour.currency} />
                          </span>
                        )}
                        <span className="text-base font-black text-[#6C4CF1]">
                          <Price amount={tour.basePrice} currency={tour.currency} />
                        </span>
                      </div>
                      <p className="text-[9px] text-neutral-800">{tt.perPerson}</p>
                    </div>
                    {hasDiscount && (
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded-lg">
                        -{Math.round((1 - tour.basePrice / (tour.compareAtPrice ?? tour.basePrice)) * 100)}%
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
