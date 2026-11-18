"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clientFetch } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";
import { languageByCode, parseLanguageCodes } from "@/lib/languages";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import { STAR_PATH } from "@/components/TourCard";

export interface GuideProfile {
  id: number;
  fullName: string;
  photoUrl?: string | null;
  coverPhotoUrl?: string | null;
  bio?: string | null;
  bioIsMachineTranslated?: boolean;
  languages?: string | null;
  city?: string | null;
  yearsOfExperience: number;
  responseTimeMinutes: number;
  isOnline: boolean;
  badges: string[];
  showRating: boolean;
  rating: number;
  reviewCount: number;
  ratingDistribution: number[];
  recentReviews: {
    id: number;
    rating: number;
    comment?: string | null;
    createdAt: string;
    guideResponse?: string | null;
    touristName: string;
  }[];
}

const C: Record<string, {
  licensed: string; founding: string; multilingual: string; senior: string; experienced: string; top_rated: string; new: string; editors_choice: string;
  online: string; years: (n: number) => string; responds: (m: number) => string; about: string; languages: string; reviews: string;
  noReviews: string; noReviewsSub: string; guideReply: string; browse: (city?: string | null) => string; book: string; bookSub: string;
  basedIn: string; machine: string; reviewsWord: string; notEnough: string;
}> = {
  en: {
    licensed: "Licensed guide", founding: "Founding guide", multilingual: "Multilingual", senior: "10+ years", experienced: "5+ years",
    top_rated: "Top rated", new: "New on VibeGuide", editors_choice: "Editor's choice", online: "Online now",
    years: (n) => `${n} ${n === 1 ? "year" : "years"} guiding`, responds: (m) => `Usually responds within ${m < 60 ? `${m} min` : `${Math.round(m / 60)} h`}`,
    about: "About", languages: "Languages", reviews: "Reviews", noReviews: "No reviews yet",
    noReviewsSub: "Reviews appear here after completed tours.", guideReply: "Response from the guide",
    browse: (city) => (city ? `See tours in ${city}` : "Browse tours"), book: "Book a tour with a licensed guide",
    bookSub: "Pick a tour and date, then choose your guide on the next step.", basedIn: "Based in",
    machine: "Machine-translated", reviewsWord: "reviews", notEnough: "Rating shown after a few more reviews",
  },
  tr: {
    licensed: "Lisanslı rehber", founding: "Kurucu rehber", multilingual: "Çok dilli", senior: "10+ yıl", experienced: "5+ yıl",
    top_rated: "En yüksek puan", new: "VibeGuide'da yeni", editors_choice: "Editörün seçimi", online: "Şu an çevrimiçi",
    years: (n) => `${n} yıllık rehber`, responds: (m) => `Genelde ${m < 60 ? `${m} dk` : `${Math.round(m / 60)} sa`} içinde yanıt verir`,
    about: "Hakkında", languages: "Diller", reviews: "Değerlendirmeler", noReviews: "Henüz değerlendirme yok",
    noReviewsSub: "Tamamlanan turlardan sonra değerlendirmeler burada görünür.", guideReply: "Rehberin yanıtı",
    browse: (city) => (city ? `${city} turlarını gör` : "Turlara göz at"), book: "Lisanslı rehberle tur rezerve et",
    bookSub: "Tur ve tarihi seç, sonraki adımda rehberini seç.", basedIn: "Bulunduğu yer",
    machine: "Otomatik çeviri", reviewsWord: "değerlendirme", notEnough: "Puan birkaç değerlendirme sonra görünür",
  },
};

const BADGE_KEYS = ["licensed", "founding", "multilingual", "top_rated", "editors_choice", "new"] as const;
type BadgeKey = (typeof BADGE_KEYS)[number];

/** "Ahmet Yılmaz" → "Ahmet Y." — tam ad gösterilmez (gizlilik). */
function shortName(n: string) {
  const parts = n.trim().split(/\s+/);
  if (parts.length < 2) return parts[0] ?? "";
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

export default function GuideProfileClient({ id, initial }: { id: string; initial: GuideProfile }) {
  const { locale } = useT();
  const c = C[locale] ?? C.en;

  // Bio çevirisi için locale'e göre yeniden çek (EN sunucudan geldi).
  const [localized, setLocalized] = useState<{ locale: string; g: GuideProfile } | null>(null);
  const g = locale === "en" ? initial : localized?.locale === locale ? localized.g : initial;
  useEffect(() => {
    if (locale === "en") return;
    let alive = true;
    clientFetch(`/api/guides/${id}/profile?locale=${locale}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d) setLocalized({ locale, g: d }); })
      .catch(() => {});
    return () => { alive = false; };
  }, [id, locale]);

  const langs = parseLanguageCodes(g.languages).map(languageByCode);
  const badges = (g.badges ?? []).filter((b): b is BadgeKey => (BADGE_KEYS as readonly string[]).includes(b));
  const totalDist = g.ratingDistribution.reduce((a, b) => a + b, 0);

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 pt-20 md:px-6 md:pt-24">
        {g.coverPhotoUrl && (
          <div className="relative mb-[-48px] h-44 overflow-hidden rounded-2xl bg-neutral-100 md:h-64">
            <Image src={g.coverPhotoUrl} alt="" fill priority sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" />
          </div>
        )}

        {/* Kimlik */}
        <header className={`relative flex flex-col gap-5 sm:flex-row sm:items-end ${g.coverPhotoUrl ? "px-4 md:px-8" : "pt-4"}`}>
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white bg-neutral-200 shadow-sm md:h-32 md:w-32">
            {g.photoUrl ? (
              <Image src={g.photoUrl} alt={g.fullName} fill sizes="128px" className="object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center font-display text-4xl text-neutral-500">{g.fullName.charAt(0)}</span>
            )}
          </div>
          <div className="min-w-0 pb-1">
            <h1 className="font-display text-[32px] font-normal leading-tight tracking-[-0.01em] md:text-[44px]">{g.fullName}</h1>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-600">
              {g.showRating && g.reviewCount > 0 && (
                <a href="#reviews" className="inline-flex items-center gap-1 hover:underline">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A0A0F" aria-hidden="true"><polygon points={STAR_PATH} /></svg>
                  <span className="font-semibold text-neutral-900">{g.rating.toFixed(1)}</span>
                  <span>({g.reviewCount} {c.reviewsWord})</span>
                </a>
              )}
              {g.city && <span>{g.city}</span>}
              {g.yearsOfExperience > 0 && <span>{c.years(g.yearsOfExperience)}</span>}
              {g.isOnline && (
                <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />{c.online}
                </span>
              )}
            </p>
          </div>
        </header>

        {badges.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {badges.map((b) => (
              <li key={b} className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 px-3 py-1 text-sm font-medium text-neutral-800">
                {b === "licensed" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                )}
                {c[b]}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 grid items-start gap-12 pb-20 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0 space-y-10">
            {g.bio && (
              <section>
                <h2 className="font-display text-2xl font-normal md:text-[28px]">{c.about}</h2>
                <p className="mt-4 whitespace-pre-line leading-8 text-neutral-800">{g.bio}</p>
                {g.bioIsMachineTranslated && <p className="mt-2 text-xs text-neutral-500">{c.machine}</p>}
              </section>
            )}

            {/* Değerlendirmeler */}
            <section id="reviews" className="scroll-mt-24 border-t border-neutral-200 pt-10">
              <h2 className="font-display text-2xl font-normal md:text-[28px]">{c.reviews}</h2>
              {g.reviewCount === 0 ? (
                <div className="mt-6 rounded-xl border border-dashed border-neutral-300 px-6 py-10 text-center">
                  <p className="font-semibold">{c.noReviews}</p>
                  <p className="mt-1 text-sm text-neutral-600">{c.noReviewsSub}</p>
                </div>
              ) : (
                <>
                  {g.showRating ? (
                    <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-5xl font-semibold tracking-tight">{g.rating.toFixed(1)}</p>
                        <p className="mt-1 text-sm text-neutral-600">{g.reviewCount} {c.reviewsWord}</p>
                      </div>
                      <ul className="flex-1 space-y-1.5" aria-label="Rating distribution">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const n = g.ratingDistribution[star - 1] ?? 0;
                          const pct = totalDist ? (n / totalDist) * 100 : 0;
                          return (
                            <li key={star} className="flex items-center gap-3 text-sm text-neutral-600">
                              <span className="w-3 tabular-nums">{star}</span>
                              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200">
                                <span className="block h-full rounded-full bg-neutral-900" style={{ width: `${pct}%` }} />
                              </span>
                              <span className="w-6 text-right tabular-nums">{n}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-neutral-600">{c.notEnough}</p>
                  )}
                  <div className="mt-8 space-y-8">
                    {g.recentReviews.map((r) => (
                      <article key={r.id} className="border-b border-neutral-200 pb-8 last:border-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-sm font-semibold text-neutral-700">
                            {r.touristName.charAt(0).toUpperCase()}
                          </span>
                          <div>
                            <p className="text-sm font-semibold">{shortName(r.touristName)}</p>
                            <p className="text-xs text-neutral-500">
                              {new Date(r.createdAt).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-GB", { month: "long", year: "numeric" })}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 inline-flex gap-0.5" aria-label={`${r.rating} / 5`}>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= r.rating ? "#0A0A0F" : "#D4D4D4"} aria-hidden="true"><polygon points={STAR_PATH} /></svg>
                          ))}
                        </p>
                        {r.comment && <p className="mt-2 leading-7 text-neutral-800">{r.comment}</p>}
                        {r.guideResponse && (
                          <div className="mt-4 border-l-2 border-neutral-300 pl-4">
                            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{c.guideReply}</p>
                            <p className="mt-1 text-sm leading-6 text-neutral-700">{r.guideResponse}</p>
                          </div>
                        )}
                      </article>
                    ))}
                  </div>
                </>
              )}
            </section>
          </div>

          {/* Yan kart */}
          <aside className="space-y-6 rounded-2xl border border-neutral-200 p-6 lg:sticky lg:top-24">
            {langs.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{c.languages}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {langs.map((l) => (
                    <li key={l.code} className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-800">
                      {l.fi && <span className={`fi fi-${l.fi} rounded-sm`} style={{ width: 16, height: 12, display: "inline-block" }} />}
                      {l.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {g.responseTimeMinutes > 0 && <p className="text-sm text-neutral-700">{c.responds(g.responseTimeMinutes)}</p>}
            <div className="border-t border-neutral-200 pt-6">
              <p className="font-semibold">{c.book}</p>
              <p className="mt-1 text-sm text-neutral-600">{c.bookSub}</p>
              <Link href={g.city ? `/tours?city=${encodeURIComponent(g.city)}` : "/tours"}
                className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-[#5B3FD9] px-5 text-[15px] font-semibold text-white hover:bg-[#4A32B8]">
                {c.browse(g.city)}
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <MainFooter />
    </main>
  );
}
