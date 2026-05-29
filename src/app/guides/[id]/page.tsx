"use client";

import { use, useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";
import Navbar from "@/components/Navbar";

type Props = { params: Promise<{ id: string }> };

interface Review {
  id: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  guideResponse: string | null;
  touristName: string;
}

interface GuideProfile {
  id: number;
  fullName: string;
  photoUrl: string | null;
  coverPhotoUrl: string | null;
  introVideoUrl: string | null;
  bio: string | null;
  languages: string | null;
  city: string | null;
  yearsOfExperience: number;
  responseTimeMinutes: number;
  isOnline: boolean;
  badges: string[];
  showRating: boolean;
  rating: number;
  reviewCount: number;
  ratingDistribution: number[];
  recentReviews: Review[];
}

const LANG_LABEL: Record<string, string> = {
  en: "English", tr: "Türkçe", de: "Deutsch", fr: "Français", ru: "Русский",
  es: "Español", it: "Italiano", ar: "العربية", zh: "中文", ja: "日本語",
  ko: "한국어", nl: "Nederlands", pl: "Polski", pt: "Português",
};

function Stars({ n, size = 16 }: { n: number; size?: number }) {
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

const BADGE_META: Record<string, { label: string; cls: string }> = {
  gold: { label: "⭐ Gold Guide", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  pro: { label: "✓ Pro", cls: "bg-[#6C4CF1]/8 text-[#6C4CF1] border-[#6C4CF1]/20" },
  verified: { label: "🛡️ Verified", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  superhost: { label: "🏆 Superhost", cls: "bg-rose-50 text-rose-700 border-rose-200" },
};

export default function GuidePublicProfile(props: Props) {
  const { id } = use(props.params);
  const { locale } = useT();
  const [p, setP] = useState<GuideProfile | null | "loading" | "error">("loading");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/guides/${id}/profile?locale=${locale}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setP(d))
      .catch(() => setP("error"));
  }, [id, locale]);

  if (p === "loading") {
    return (
      <main className="min-h-screen bg-white"><Navbar />
        <div className="pt-16 flex items-center justify-center h-[70vh]">
          <div className="w-8 h-8 rounded-full border-2 border-[#6C4CF1] border-t-transparent animate-spin" />
        </div>
      </main>
    );
  }
  if (p === "error" || !p) {
    return (
      <main className="min-h-screen bg-white"><Navbar />
        <div className="pt-32 text-center px-6">
          <p className="text-6xl mb-4">🧭</p>
          <h1 className="text-2xl font-black text-[#0A0A0F]">Guide not found</h1>
          <a href="/tours" className="mt-6 inline-block rounded-full bg-[#6C4CF1] text-white text-sm font-bold px-6 py-2.5">Browse tours</a>
        </div>
      </main>
    );
  }

  const langs = (p.languages ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const initials = p.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const maxDist = Math.max(...(p.ratingDistribution ?? [0]), 1);

  return (
    <main className="min-h-screen bg-[#F9F9FB]">
      <Navbar />

      {/* Cover */}
      <div className="pt-16">
        <div className="relative h-48 md:h-64 bg-gradient-to-br from-[#6C4CF1] to-[#8B5CF6] overflow-hidden">
          {p.coverPhotoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.coverPhotoUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-90" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6">
        {/* Header card */}
        <div className="relative -mt-16 bg-white rounded-3xl border border-black/[0.06] shadow-sm p-6 md:p-8">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 rounded-3xl overflow-hidden bg-gradient-to-br from-[#6C4CF1] to-[#8B5CF6] flex items-center justify-center text-3xl font-black text-white border-4 border-white shadow-lg">
                {p.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.photoUrl} alt={p.fullName} className="w-full h-full object-cover" />
                ) : initials}
              </div>
              {p.isOnline && (
                <span className="absolute -bottom-1 -right-1 flex items-center gap-1 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full border-2 border-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />LIVE
                </span>
              )}
            </div>

            {/* Name + meta */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-black text-[#0A0A0F]">{p.fullName}</h1>
              {p.city && <p className="text-sm text-neutral-400 mt-0.5">📍 {p.city}</p>}

              <div className="flex flex-wrap items-center gap-2 mt-3">
                {p.showRating && p.reviewCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <Stars n={p.rating} size={15} />
                    <span className="font-black text-[#0A0A0F]">{p.rating.toFixed(1)}</span>
                    <span className="text-neutral-400">({p.reviewCount})</span>
                  </span>
                )}
                {p.badges?.map((b) => {
                  const m = BADGE_META[b.toLowerCase()];
                  return m ? (
                    <span key={b} className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${m.cls}`}>{m.label}</span>
                  ) : null;
                })}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-black/[0.06]">
            <div className="text-center">
              <p className="text-xl font-black text-[#6C4CF1]">{p.yearsOfExperience}+</p>
              <p className="text-xs text-neutral-400 mt-0.5">Years exp.</p>
            </div>
            <div className="text-center border-x border-black/[0.06]">
              <p className="text-xl font-black text-[#6C4CF1]">~{p.responseTimeMinutes}m</p>
              <p className="text-xs text-neutral-400 mt-0.5">Response time</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-[#6C4CF1]">{langs.length}</p>
              <p className="text-xs text-neutral-400 mt-0.5">Languages</p>
            </div>
          </div>
        </div>

        {/* Intro video */}
        {p.introVideoUrl && (
          <div className="mt-6 bg-white rounded-3xl border border-black/[0.06] shadow-sm overflow-hidden">
            <video controls className="w-full aspect-video bg-black" src={p.introVideoUrl} preload="metadata" />
          </div>
        )}

        {/* Bio */}
        {p.bio && (
          <div className="mt-6 bg-white rounded-3xl border border-black/[0.06] shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-black text-[#0A0A0F] mb-3">About</h2>
            <p className="text-sm text-neutral-600 leading-7 whitespace-pre-line">{p.bio}</p>
          </div>
        )}

        {/* Languages */}
        {langs.length > 0 && (
          <div className="mt-6 bg-white rounded-3xl border border-black/[0.06] shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-black text-[#0A0A0F] mb-3">Languages</h2>
            <div className="flex flex-wrap gap-2">
              {langs.map((l) => (
                <span key={l} className="px-3 py-1.5 rounded-full bg-[#F7F7FB] border border-black/10 text-sm font-semibold text-neutral-600">
                  {LANG_LABEL[l.toLowerCase()] ?? l.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        {p.showRating && p.reviewCount > 0 && (
          <div className="mt-6 bg-white rounded-3xl border border-black/[0.06] shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-black text-[#0A0A0F] mb-5">Reviews ({p.reviewCount})</h2>

            {/* Distribution */}
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="text-center shrink-0">
                <p className="text-5xl font-black text-[#0A0A0F]">{p.rating.toFixed(1)}</p>
                <Stars n={p.rating} size={16} />
                <p className="text-xs text-neutral-400 mt-1">{p.reviewCount} reviews</p>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const cnt = p.ratingDistribution?.[star - 1] ?? 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-3 text-neutral-400">{star}</span>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      <div className="flex-1 h-2 rounded-full bg-neutral-100 overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(cnt / maxDist) * 100}%` }} />
                      </div>
                      <span className="w-6 text-right text-neutral-400">{cnt}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent reviews */}
            <div className="space-y-4 border-t border-black/[0.06] pt-5">
              {p.recentReviews.map((r) => (
                <div key={r.id} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6C4CF1] to-[#8B5CF6] flex items-center justify-center text-xs font-black text-white shrink-0">
                    {r.touristName[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#0A0A0F]">{r.touristName}</span>
                      <Stars n={r.rating} size={12} />
                    </div>
                    {r.comment && <p className="mt-1 text-sm text-neutral-600 leading-6">{r.comment}</p>}
                    <p className="mt-1 text-[11px] text-neutral-400">{new Date(r.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</p>
                    {r.guideResponse && (
                      <div className="mt-2 rounded-xl bg-[#F7F7FB] border border-black/[0.04] px-3 py-2">
                        <p className="text-[11px] font-bold text-[#6C4CF1] mb-0.5">Guide&apos;s reply</p>
                        <p className="text-xs text-neutral-600 leading-5">{r.guideResponse}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-6 mb-16 bg-gradient-to-r from-[#6C4CF1] to-[#8B5CF6] rounded-3xl p-7 text-center">
          <p className="text-white font-black text-lg">Meet {p.fullName.split(" ")[0]} in person</p>
          <p className="text-white/70 text-sm mt-1">Book a tour and explore the city with a verified local guide.</p>
          <a href="/#download" className="mt-4 inline-block bg-white text-[#6C4CF1] font-black text-sm px-7 py-3 rounded-2xl hover:bg-white/90 transition-colors">
            Get the app to book →
          </a>
        </div>
      </div>
    </main>
  );
}
