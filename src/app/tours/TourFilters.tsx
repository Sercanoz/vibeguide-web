"use client";

import { useState } from "react";
import Link from "next/link";
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
    history: "bg-amber-100 text-amber-700",
    food: "bg-orange-100 text-orange-700",
    nature: "bg-emerald-100 text-emerald-700",
    culture: "bg-purple-100 text-purple-700",
    adventure: "bg-red-100 text-red-700",
    art: "bg-pink-100 text-pink-700",
  };
  return map[cat?.toLowerCase()] ?? "bg-neutral-100 text-neutral-600";
}

const BADGE_META: Record<string, { label: string; color: string }> = {
  skip_the_line:        { label: "⚡ Skip the line",        color: "bg-yellow-400 text-yellow-900" },
  bestseller:           { label: "🏆 Bestseller",           color: "bg-orange-500 text-white" },
  free_cancellation:    { label: "✓ Free cancellation",     color: "bg-emerald-500 text-white" },
  small_group:          { label: "👥 Small group",          color: "bg-blue-500 text-white" },
  private_tour:         { label: "🔒 Private",              color: "bg-[#6C4CF1] text-white" },
  instant_confirmation: { label: "✅ Instant confirmation", color: "bg-teal-500 text-white" },
  live_guide:           { label: "🎤 Live guide",           color: "bg-rose-500 text-white" },
  pickup_included:      { label: "🚌 Pickup included",      color: "bg-indigo-500 text-white" },
};

export default function TourFilters({ tours }: Props) {
  const { locale } = useT();
  const tt = getToursT(locale);
  const cities = ["All", ...Array.from(new Set(tours.map((t) => t.city))).sort()];
  const [activeCity, setActiveCity] = useState("All");

  const filtered = activeCity === "All" ? tours : tours.filter((t) => t.city === activeCity);

  return (
    <>
      {/* City filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all border ${
              activeCity === city
                ? "bg-[#6C4CF1] text-white border-[#6C4CF1] shadow-sm"
                : "bg-white border-black/10 text-neutral-500 hover:border-[#6C4CF1]/40 hover:text-[#6C4CF1]"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      {/* Tour grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">
          <p className="text-5xl mb-4">🗺️</p>
          <p className="text-base font-semibold">No tours available yet</p>
          <p className="text-sm mt-1">Check back soon — new tours are added regularly.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((tour) => {
            const badges = tour.badges
              ? tour.badges.split(",").map(s => s.trim()).filter(Boolean)
              : [];
            const topBadge = badges[0] ? BADGE_META[badges[0]] : null;
            const hasDiscount = tour.compareAtPrice != null && tour.compareAtPrice > tour.basePrice;

            return (
              <Link
                key={tour.id}
                href={`/tours/${tour.id}`}
                className="group rounded-2xl bg-white border border-black/[0.06] shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Cover photo — 4:3 */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                  {tour.coverPhotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={tour.coverPhotoUrl}
                      alt={tour.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#6C4CF1]/20 to-[#8B5CF6]/20 flex items-center justify-center text-4xl">🗺️</div>
                  )}

                  {/* Top badge — skip the line etc */}
                  {topBadge && (
                    <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-black ${topBadge.color}`}>
                      {topBadge.label}
                    </span>
                  )}

                  {/* Category badge — bottom right */}
                  <span className={`absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${categoryColor(tour.category)}`}>
                    {tour.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-1">
                  {/* City + duration */}
                  <p className="text-[11px] text-neutral-400 flex items-center gap-1 mb-1">
                    <span>📍</span>{tour.city}
                    <span className="mx-0.5">·</span>
                    <span>🕐</span>{formatDuration(tour.durationMinutes)}
                  </p>

                  {/* Title */}
                  <h2 className="font-black text-[#0A0A0F] text-sm leading-tight line-clamp-2 flex-1">{tour.title}</h2>

                  {/* Extra badges row */}
                  {badges.length > 1 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {badges.slice(1, 3).map((key) => {
                        const m = BADGE_META[key];
                        return m ? (
                          <span key={key} className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-neutral-100 text-neutral-500">
                            {m.label}
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-2 pt-2 border-t border-black/5">
                    <p className="text-[9px] font-semibold text-neutral-400 uppercase tracking-wide">{tt.fromPrice}</p>
                    <div className="flex items-baseline gap-1.5">
                      {hasDiscount && (
                        <span className="text-xs text-neutral-400 line-through">
                          {tour.compareAtPrice} {tour.currency}
                        </span>
                      )}
                      <span className="text-base font-black text-[#6C4CF1]">
                        {tour.basePrice} {tour.currency}
                      </span>
                    </div>
                    <p className="text-[9px] text-neutral-400">{tt.perPerson}</p>
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
