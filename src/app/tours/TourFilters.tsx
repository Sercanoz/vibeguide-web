"use client";

import { useState } from "react";
import Link from "next/link";

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
  return map[cat.toLowerCase()] ?? "bg-neutral-100 text-neutral-600";
}

export default function TourFilters({ tours }: Props) {
  const cities = ["All", ...Array.from(new Set(tours.map((t) => t.city))).sort()];
  const [activeCity, setActiveCity] = useState("All");

  const filtered = activeCity === "All" ? tours : tours.filter((t) => t.city === activeCity);

  return (
    <>
      {/* City filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
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
          <p className="text-6xl mb-4">🗺️</p>
          <p className="text-lg font-semibold">No tours available yet</p>
          <p className="text-sm mt-2">Check back soon — new tours are added regularly.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((tour) => {
            const langs = tour.languagesOffered
              ? tour.languagesOffered.split(",").map((l) => l.trim().toUpperCase())
              : [];
            const hasDiscount =
              tour.compareAtPrice != null && tour.compareAtPrice > tour.basePrice;

            return (
              <article
                key={tour.id}
                className="rounded-3xl bg-white border border-black/[0.06] shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                {/* Cover photo */}
                <div className="relative h-48 bg-gradient-to-br from-[#6C4CF1]/20 to-[#8B5CF6]/20 overflow-hidden">
                  {tour.coverPhotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={tour.coverPhotoUrl}
                      alt={tour.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-5xl">🗺️</div>
                  )}
                  {/* Category badge */}
                  <span
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${categoryColor(tour.category)}`}
                  >
                    {tour.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-black text-[#0A0A0F] text-base leading-tight">{tour.title}</h2>
                  <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                    <span>📍</span> {tour.city} · <span>🕐</span> {formatDuration(tour.durationMinutes)}
                  </p>
                  {tour.summary && (
                    <p className="text-sm text-neutral-500 mt-2 leading-5 line-clamp-2 flex-1">{tour.summary}</p>
                  )}

                  {/* Price */}
                  <div className="mt-4 flex items-center gap-2">
                    {hasDiscount && (
                      <span className="text-sm text-neutral-400 line-through">
                        {tour.compareAtPrice} {tour.currency}
                      </span>
                    )}
                    <span className="text-lg font-black text-[#6C4CF1]">
                      {tour.basePrice} {tour.currency}
                    </span>
                    <span className="text-xs text-neutral-400">/guide</span>
                  </div>

                  {/* Languages */}
                  {langs.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {langs.map((lang) => (
                        <span
                          key={lang}
                          className="px-2 py-0.5 rounded-md bg-[#F7F7FB] border border-black/5 text-[10px] font-bold text-neutral-500"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/tours/${tour.id}`}
                    className="mt-5 block text-center rounded-full bg-[#6C4CF1] text-white text-sm font-bold py-2.5 hover:bg-[#5a3dd4] transition-colors"
                  >
                    View Tour →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}
