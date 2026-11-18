"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from "@/components/LanguageProvider";
import { homeTranslations } from "@/lib/home-i18n";
import { uiExtra } from "@/lib/ui-extra-i18n";
import { navbarI18n } from "@/lib/navbar-i18n";
import { homeSections } from "@/lib/home-sections-i18n";
import Navbar from "@/components/Navbar";
import HeroCitySearch from "@/components/HeroCitySearch";
import MainFooter from "@/components/MainFooter";
import TourCard, { TourCardSkeleton } from "@/components/TourCard";
import { clientFetch } from "@/lib/api";
import { HERO_BLUR } from "@/lib/hero-blur";
import { DESTINATIONS, cityGuideHref } from "@/lib/destinations";
import { ATTRACTION_LANGS, ATTR_HUB } from "@/lib/attractions";

// Sade/"pro" ana sayfa (GYG tarzı): az bölüm, sakin tipografi (bold, black değil),
// tek vurgu rengi (#5B3FD9 yalnız CTA + link), gradient/emoji/pulse yok.
// Bölümler: hero+arama → güven şeridi → popüler turlar → 3 yol → destinasyonlar → yorumlar.
// Eski "How it works" ve büyük "Trust & Safety" bölümleri kaldırıldı (güven şeridi ve
// /how-it-works sayfası aynı bilgiyi taşıyor).

const INK = "text-[#0A0A0F]";

export interface PopularTour {
  id: number;
  title: string;
  city: string;
  category: string;
  durationMinutes: number;
  basePrice: number;
  compareAtPrice?: number;
  currency: string;
  coverPhotoUrl?: string;
  rating?: number;
  reviewCount?: number;
}

export interface Testimonial {
  id: number;
  fullName: string;
  nationality: string | null;
  rating: number;
  comment: string;
  tourTitle: string | null;
}

export interface HomeStats {
  tourCount: number;
  reviewCount: number;
  avgRating: number;
}

// Güven satırı metni. Yalnız doğrulanabilir bilgi: TÜRSAB belge no footer'daki
// yasal bilgiyle aynı (Helliantus Anadolu Tours, A Grubu, 5058). Diğer diller EN'e düşer.
const CRED: Record<string, { tursab: string; founders: string; destinations: string; tours: string; reviews: string }> = {
  en: { tursab: "TÜRSAB A Group licensed · No. 5058", founders: "Founded by professional tour guides", destinations: "destinations", tours: "tours", reviews: "reviews" },
  tr: { tursab: "TÜRSAB A Grubu belgeli · No. 5058", founders: "Profesyonel turist rehberleri tarafından kuruldu", destinations: "destinasyon", tours: "tur", reviews: "değerlendirme" },
};

function SectionHeader({ title, sub, right }: { title: string; sub?: string; right?: React.ReactNode }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div className="min-w-0">
        <h2 className={`font-display text-3xl md:text-[40px] font-normal leading-tight tracking-[-0.01em] ${INK}`}>{title}</h2>
        {sub && <p className="mt-1.5 text-[15px] text-neutral-600 max-w-2xl">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

const ICON = { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.75, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export default function HomeClient({
  initialTours,
  initialReviews,
  stats,
}: {
  initialTours: PopularTour[];
  initialReviews: Testimonial[];
  stats: HomeStats;
}) {
  const { locale } = useT();
  const t = homeTranslations[locale];
  const cr = CRED[locale] ?? CRED.en;
  const credItems = [
    cr.tursab,
    cr.founders,
    `${DESTINATIONS.length} ${cr.destinations}`,
    stats.tourCount > 0 ? `${stats.tourCount} ${cr.tours}` : null,
    stats.reviewCount > 0 ? `★ ${stats.avgRating.toFixed(1)} · ${stats.reviewCount} ${cr.reviews}` : null,
  ].filter((x): x is string => !!x);
  const ux = uiExtra[locale] ?? uiExtra.en;
  const nb = navbarI18n[locale] ?? navbarI18n.en;
  const hubLang = ((ATTRACTION_LANGS as readonly string[]).includes(locale)
    ? locale
    : "en") as (typeof ATTRACTION_LANGS)[number];

  const trustItems = [
    { icon: <svg {...ICON}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>, title: ux.trustVerifiedTitle, sub: ux.trustVerifiedSub },
    { icon: <svg {...ICON}><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, title: ux.trustPayTitle, sub: ux.trustPaySub },
    { icon: <svg {...ICON}><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>, title: ux.trustCancelTitle, sub: ux.trustCancelSub },
    { icon: <svg {...ICON}><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>, title: ux.trustSupportTitle, sub: ux.trustSupportSub },
  ];

  const modes = [
    { href: "/vibenow", data: t.modes.vibenow, icon: <svg {...ICON}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg> },
    { href: "/vibesquad", data: t.modes.vibesquad, icon: <svg {...ICON}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
    { href: "/private", data: t.modes.private, icon: <svg {...ICON}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> },
  ];

  return (
    <main className={`min-h-screen bg-white ${INK} antialiased overflow-x-hidden`}>

      <Navbar />

      {/* ── HERO — fotoğraf + başlık + arama (tek eylem: arama) ── */}
      <section className="relative flex items-center min-h-[560px] md:min-h-[640px] pt-16 overflow-hidden">
        <Image
          src="/hero-istanbul.jpg"
          alt="Istanbul at sunset — Hagia Sophia and the Bosphorus"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={HERO_BLUR}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 w-full">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-display text-[44px] md:text-[76px] font-normal leading-[1.02] tracking-[-0.02em] text-white">
              {t.hero.titleA}{" "}
              <span className="italic">{t.hero.titleAccent}</span>
            </h1>
            {/* SEO keyword line — H2 olarak kalıyor (taranabilir, anahtar kelimeli). */}
            <h2 className="mt-4 text-base md:text-lg font-normal text-white/90 max-w-2xl mx-auto">
              {t.hero.seoLine}
            </h2>
          </div>

          <div className="mt-8">
            <HeroCitySearch onDark />
          </div>

          {/* Güven satırı — gerçek veriler (bkz. CRED + page.tsx stats) */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[13px] font-medium text-white/85">
            {credItems.map((c, i) => (
              <li key={c} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="text-white/40">·</span>}
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── GÜVEN ŞERİDİ ── */}
      <section className="border-b border-black/[0.06] bg-white" aria-label={ux.trustHeading}>
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
          {trustItems.map((item) => (
            <div key={item.title} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 text-neutral-900">{item.icon}</span>
              <div className="min-w-0">
                <p className="text-sm font-semibold leading-tight">{item.title}</p>
                {/* Kesme yok: tam cümle okunmalı (eskiden "İadeler, ödeme öncesinde gö…") */}
                <p className="mt-0.5 text-xs leading-5 text-neutral-600">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── POPÜLER TURLAR ── */}
      <PopularTours initialTours={initialTours} />

      {/* ── 3 YOL (VibeNow / VibeSquad / Özel) ── */}
      <section id="modes" className="py-14 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader title={t.modesIntro.title} />
          <div className="grid md:grid-cols-3 gap-4">
            {modes.map((m) => (
              <a
                key={m.href}
                href={m.href}
                className="group flex flex-col rounded-2xl border border-black/[0.08] bg-white p-6 transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              >
                <span className="text-neutral-900">{m.icon}</span>
                <p className="mt-4 text-xs font-medium uppercase tracking-wider text-neutral-500">{m.data.tag}</p>
                <h3 className="mt-1 text-lg font-bold leading-snug">{m.data.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600 flex-1">{m.data.text}</p>
                <ul className="mt-4 space-y-1.5 text-sm text-neutral-700">
                  {m.data.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <svg className="mt-1 shrink-0 text-neutral-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                      {p.replace(/^[^ ]+ /, "")}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 text-sm font-semibold text-[#5B3FD9] group-hover:underline">
                  {m.data.cta} →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTİNASYONLAR (SSR iç linkler → şehir rehberleri + attractions hub) ── */}
      <section className="py-14 bg-white border-t border-black/[0.06]">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader title={nb.destinations} />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {DESTINATIONS.map((d) => (
              <a
                key={d.slug}
                href={cityGuideHref(d.slug, locale)}
                className="group flex items-center justify-between gap-2 rounded-xl border border-black/[0.08] bg-white px-4 py-3.5 transition-colors hover:border-black/20"
              >
                <span className="font-semibold leading-tight">{d.name}</span>
                <svg className="shrink-0 text-neutral-400 group-hover:text-neutral-900 transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            ))}
          </div>
          <div className="mt-5 flex items-center gap-6">
            <a href={`/attractions/${hubLang}`} className="text-sm font-semibold text-[#5B3FD9] hover:underline">
              {ATTR_HUB[hubLang].h1} →
            </a>
            <a href={`/blog/${hubLang}`} className="text-sm font-semibold text-[#5B3FD9] hover:underline">
              Blog →
            </a>
          </div>
        </div>
      </section>

      {/* ── YORUMLAR (gerçek değerlendirmeler) ── */}
      <Testimonials initialReviews={initialReviews} />

      <MainFooter />
    </main>
  );
}


function PopularTours({ initialTours }: { initialTours: PopularTour[] }) {
  const { locale } = useT();
  const hs = homeSections[locale] ?? homeSections.en;
  const nb = navbarI18n[locale] ?? navbarI18n.en;
  const railRef = useRef<HTMLDivElement>(null);
  // SSR: server pre-fetched tours arrive as props → rendered in initial HTML (crawlable).
  const [tours, setTours] = useState<PopularTour[]>(initialTours);
  // Sunucu tur getirmediyse ilk render'dan itibaren yükleniyor (effect içinde setState yok).
  const [loading, setLoading] = useState(initialTours.length === 0);

  useEffect(() => {
    // Only client-fetch when the server didn't provide tours (e.g. backend hiccup at build/SSR).
    if (initialTours.length > 0) return;
    clientFetch(`/api/tours?locale=en`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: PopularTour[]) => { setTours(data.slice(0, 10)); setLoading(false); })
      .catch(() => setLoading(false));
  }, [initialTours.length]);

  function scroll(dir: -1 | 1) {
    railRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  }

  // Hiç tur yoksa bölümü gizle
  if (!loading && tours.length === 0) return null;

  const arrowBtn = "w-9 h-9 rounded-full border border-black/15 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 transition-colors";

  return (
    <section className="pt-14 pb-10 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          title={hs.popularExperiences}
          sub={hs.popularExpSub}
          right={
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <button onClick={() => scroll(-1)} aria-label="Previous" className={arrowBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button onClick={() => scroll(1)} aria-label="Next" className={arrowBtn}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          }
        />

        {/* Rail */}
        <div ref={railRef} className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {loading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="shrink-0 w-[280px] snap-start"><TourCardSkeleton /></div>
              ))
            : tours.map((tour) => (
                <div key={tour.id} className="shrink-0 w-[280px] snap-start">
                  <TourCard tour={tour} locale={locale} sizes="280px" />
                </div>
              ))}
        </div>

        <div className="mt-4">
          <Link href="/tours" className="inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold hover:bg-neutral-50 transition-colors">
            {nb.seeAllTours}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials({ initialReviews }: { initialReviews: Testimonial[] }) {
  const { locale } = useT();
  // SSR: server pre-fetched reviews arrive as props → in initial HTML.
  const [reviews, setReviews] = useState<Testimonial[]>(initialReviews);

  useEffect(() => {
    if (initialReviews.length > 0) return;
    clientFetch(`/api/tours/reviews/featured?limit=9`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((d: Testimonial[]) => setReviews(d))
      .catch(() => {});
  }, [initialReviews.length]);

  if (reviews.length === 0) return null;

  return (
    <section className="py-14 bg-[#F7F7F8] border-t border-black/[0.06]">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader title={locale === "tr" ? "Gezginler ne diyor" : "What travellers say"} />

        <div className="columns-1 md:columns-3 gap-4 [&>*]:mb-4">
          {reviews.map((r) => (
            <div key={r.id} className="break-inside-avoid rounded-xl bg-white border border-black/[0.06] p-5">
              <div className="flex gap-0.5 mb-3" aria-label={`${r.rating} / 5`}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= r.rating ? "#0A0A0F" : "#E5E7EB"} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p className="text-sm text-neutral-800 leading-6">&ldquo;{r.comment}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-700 shrink-0">
                  {r.fullName[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className={`text-sm font-semibold ${INK} truncate`}>{r.fullName}{r.nationality ? `, ${r.nationality}` : ""}</p>
                  {r.tourTitle && <p className="text-xs text-neutral-500 truncate">{r.tourTitle}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
