"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useT } from "@/components/LanguageProvider";
import { homeTranslations } from "@/lib/home-i18n";
import { uiExtra } from "@/lib/ui-extra-i18n";
import { navbarI18n } from "@/lib/navbar-i18n";
import { homeSections } from "@/lib/home-sections-i18n";
import { useInView } from "@/hooks/useInView";
import Navbar from "@/components/Navbar";
import HeroCitySearch from "@/components/HeroCitySearch";
import HeroModeCards from "@/components/HeroModeCards";
import MainFooter from "@/components/MainFooter";
import Price from "@/components/Price";
import { clientFetch } from "@/lib/api";
import { HERO_BLUR } from "@/lib/hero-blur";
import { DESTINATIONS, cityGuideHref } from "@/lib/destinations";
import { ATTRACTION_LANGS, ATTR_HUB } from "@/lib/attractions";

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

export default function HomeClient({
  initialTours,
  initialReviews,
}: {
  initialTours: PopularTour[];
  initialReviews: Testimonial[];
}) {
  const { locale } = useT();
  const t = homeTranslations[locale];
  const ux = uiExtra[locale] ?? uiExtra.en;
  const hs = homeSections[locale] ?? homeSections.en;
  const nb = navbarI18n[locale] ?? navbarI18n.en;
  const hubLang = ((ATTRACTION_LANGS as readonly string[]).includes(locale)
    ? locale
    : "en") as (typeof ATTRACTION_LANGS)[number];

  const secHow = useInView();
  const secModes = useInView();
  const secTrust = useInView();

  return (
    <main className="min-h-screen bg-white text-[#0A0A0F] antialiased overflow-x-hidden">

      <Navbar />

      {/* ── HERO — full-bleed Istanbul photo + centered search (Viator-style) ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background photo */}
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
        {/* Readability overlays: darken + bottom gradient so white text + search pop */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/45" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 w-full">
          {/* Centered destination search — sits above headline */}
          <HeroCitySearch onDark />

          <div className="mt-14">
          {/* Copy — centered headline + badge */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 backdrop-blur-sm px-4 py-2 text-sm font-semibold text-white mb-8 animate-[fadeSlideUp_0.7s_ease_both]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] animate-pulse shrink-0" />
              {t.hero.badge}
            </div>

            <h1 className="text-5xl md:text-[72px] font-black leading-[0.98] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)]">
              {t.hero.titleA}
              <br />
              <span className="bg-gradient-to-r from-[#C4B5FD] via-[#DDD6FE] to-[#FBCFE8] bg-clip-text text-transparent">
                {t.hero.titleAccent}
              </span>
            </h1>

            {/* SEO keyword line — rendered as an H2 so the crawlable, keyword-rich
               description (licensed local guides + tours in Turkey, key cities) carries
               heading weight without touching the brand H1 above. Styled like body text. */}
            <h2 className="mt-6 text-base md:text-lg font-medium text-white/90 max-w-2xl mx-auto drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
              {t.hero.seoLine}
            </h2>
          </div>

          {/* Mode cards — quick links to /vibenow /vibesquad /vibeask */}
          <div className="mt-10 flex justify-center">
            <HeroModeCards locale={locale} />
          </div>

          </div>
        </div>

      </section>

      {/* ── TRUST BAR ── */}
      <section className="border-y border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-6 pt-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[#0A0A0F]">{ux.trustHeading}</h2>
          <p className="mt-2 text-sm text-neutral-700 max-w-2xl mx-auto">{ux.trustHeadingSub}</p>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            {
              // Licensed local guides — shield
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>,
              title: ux.trustVerifiedTitle, sub: ux.trustVerifiedSub,
            },
            {
              // Verified & ID-checked — badge check
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C4CF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>,
              title: ux.trustIdTitle, sub: ux.trustIdSub,
            },
            {
              // Secure in-app payment — lock
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
              title: ux.trustPayTitle, sub: ux.trustPaySub,
            },
            {
              // Instant matching — zap
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
              title: ux.trustInstantTitle, sub: ux.trustInstantSub,
            },
            {
              // Money-back protection — wallet/refund
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/></svg>,
              title: ux.trustCancelTitle, sub: ux.trustCancelSub,
            },
            {
              // 24/7 customer support — headset
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>,
              title: ux.trustSupportTitle, sub: ux.trustSupportSub,
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F7F7FB] border border-black/[0.05] flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black text-[#0A0A0F] leading-tight">{item.title}</p>
                <p className="text-xs text-neutral-800 truncate">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── POPULAR TOURS (GYG-style rail) ── */}
      <PopularTours initialTours={initialTours} />


      {/* ── HOW IT WORKS ── */}
      <section ref={secHow.ref as React.RefObject<HTMLElement>} id="how" className={`py-28 bg-white reveal ${secHow.inView ? "in-view" : ""}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1]">{t.howItWorks.eyebrow}</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tight text-[#0A0A0F]">
              {t.howItWorks.titleA}
              <br />
              <span className="text-neutral-200">{t.howItWorks.titleB}</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-black/5 rounded-3xl overflow-hidden border border-black/5">
            {t.howItWorks.steps.map((item, i) => (
              <div key={item.title} className="relative bg-white p-10 group hover:bg-[#F7F7FB] transition-colors">
                <span className="text-8xl font-black text-black/[0.04] absolute top-6 right-8 select-none leading-none">{String(i + 1).padStart(2, "0")}</span>
                {i < 2 && (
                  <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-8 h-8 rounded-full bg-[#6C4CF1] text-white items-center justify-center text-sm font-black shadow-lg">
                    →
                  </div>
                )}
                <div className="mb-7 h-14 w-14 rounded-2xl bg-[#6C4CF1]/8 border border-[#6C4CF1]/12 flex items-center justify-center text-[#6C4CF1]">
                  {i === 0 && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  )}
                  {i === 1 && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  )}
                  {i === 2 && (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="5" r="1"/>
                      <path d="M9 20l1-5 2 2 1-5"/>
                      <path d="M6 11l2-4h8l1 4"/>
                      <path d="M8 7l-2 4h10"/>
                    </svg>
                  )}
                </div>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 MODES ── */}
      <section ref={secModes.ref as React.RefObject<HTMLElement>} id="modes" className={`py-28 bg-white reveal ${secModes.inView ? "in-view" : ""}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-800">{t.modesIntro.eyebrow}</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tight leading-tight">{t.modesIntro.title}</h2>
            <div className="mt-4 text-base leading-7 text-neutral-800 max-w-lg mx-auto space-y-3">
              {t.modesIntro.sub.split("\n\n").map((para, i) => (
                <p key={i} style={{ whiteSpace: "pre-line" }}>{para}</p>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                id: "vibenow",
                bg: "bg-white",
                border: "border-[#6C4CF1]/20",
                tagCol: "text-[#6C4CF1]",
                titleCol: "text-[#0A0A0F]",
                textCol: "text-neutral-800",
                pointCol: "text-neutral-800",
                btnBg: "bg-[#6C4CF1] text-white",
                data: t.modes.vibenow,
              },
              {
                id: "vibesquad",
                bg: "bg-white",
                border: "border-[#10B981]/20",
                tagCol: "text-[#059669]",
                titleCol: "text-[#0A0A0F]",
                textCol: "text-neutral-800",
                pointCol: "text-neutral-800",
                btnBg: "bg-[#059669] text-white",
                data: t.modes.vibesquad,
              },
              {
                id: "private",
                bg: "bg-white",
                border: "border-[#6C4CF1]/20",
                tagCol: "text-[#6C4CF1]",
                titleCol: "text-[#0A0A0F]",
                textCol: "text-neutral-800",
                pointCol: "text-neutral-800",
                btnBg: "bg-[#6C4CF1] text-white",
                data: t.modes.private,
              },
            ].map((card) => (
              <article key={card.id} id={card.id} className={`rounded-3xl border ${card.border} ${card.bg} p-8 flex flex-col`}>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${card.tagCol}`}>{card.data.tag}</p>
                <h2 className={`mt-3 text-2xl font-black leading-tight ${card.titleCol}`}>{card.data.title}</h2>
                <p className={`mt-3 text-sm leading-6 ${card.textCol} flex-1`}>{card.data.text}</p>
                <ul className={`mt-5 space-y-2 text-xs font-medium ${card.pointCol}`}>
                  {card.data.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <span className="mt-0.5 shrink-0">›</span>{p.replace(/^[^ ]+ /, "")}
                    </li>
                  ))}
                </ul>
                <a href={`/${card.id}`} className={`mt-7 self-start rounded-full ${card.btnBg} px-5 py-2.5 text-xs font-bold flex items-center gap-2`}>
                  {card.data.cta} →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>



      {/* ── POPULAR DESTINATIONS (SSR internal links → city guides + attractions hub) ── */}
      <section className="py-16 bg-white border-t border-black/[0.04]">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center">{nb.destinations}</h2>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {DESTINATIONS.map((d) => (
              <a
                key={d.slug}
                href={cityGuideHref(d.slug, locale)}
                className="group flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-[#F7F7FB] p-4 hover:border-[#6C4CF1]/30 transition-colors"
              >
                <span className="text-2xl" aria-hidden="true">{d.emoji}</span>
                <span className="font-black leading-tight group-hover:text-[#6C4CF1] transition-colors">{d.name}</span>
              </a>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href={`/attractions/${hubLang}`} className="text-sm font-bold text-[#6C4CF1] hover:underline">
              {ATTR_HUB[hubLang].h1} →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (real reviews) ── */}
      <Testimonials initialReviews={initialReviews} />

      {/* ── TRUST + TESTIMONIALS ── */}
      <section ref={secTrust.ref as React.RefObject<HTMLElement>} id="guides" className={`py-28 bg-white reveal ${secTrust.inView ? "in-view" : ""}`}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-800">{hs.everyGuideVerified}</p>
            <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight leading-tight">{t.trust.title}</h2>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {t.trust.items.map((item, i) => (
              <div key={item.title} className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7F7FB] border border-black/5 text-[#6C4CF1]">
                  {i === 0 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>}
                  {i === 1 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                  {i === 2 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>}
                  {i === 3 && <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>}
                </div>
                <div>
                  <p className="font-black text-[15px]">{item.title}</p>
                  <p className="mt-1.5 text-sm leading-6 text-neutral-800">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <MainFooter />
    </main>
  );
}


function fmtDuration(m: number): string {
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return mm > 0 ? `${h}h ${mm}m` : `${h}h`;
}

function PopularTours({ initialTours }: { initialTours: PopularTour[] }) {
  const { locale } = useT();
  const hs = homeSections[locale] ?? homeSections.en;
  const nb = navbarI18n[locale] ?? navbarI18n.en;
  const railRef = useRef<HTMLDivElement>(null);
  // SSR: server pre-fetched tours arrive as props → rendered in initial HTML (crawlable).
  const [tours, setTours] = useState<PopularTour[]>(initialTours);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only client-fetch when the server didn't provide tours (e.g. backend hiccup at build/SSR).
    if (initialTours.length > 0) return;
    setLoading(true);
    clientFetch(`/api/tours?locale=en`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: PopularTour[]) => { setTours(data.slice(0, 10)); setLoading(false); })
      .catch(() => setLoading(false));
  }, [initialTours.length]);

  function scroll(dir: -1 | 1) {
    railRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  }

  // Hiç tur yoksa bölümü gizle
  if (!loading && tours.length === 0) return null;

  return (
    <section className="pt-16 pb-12 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 mb-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1]">{hs.handpicked}</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-[#0A0A0F]">{hs.popularExperiences}</h2>
            <p className="mt-2 text-sm text-neutral-800 max-w-md">{hs.popularExpSub}</p>
          </div>
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <button onClick={() => scroll(-1)} aria-label="Previous"
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-neutral-700 hover:border-[#6C4CF1] hover:text-[#6C4CF1] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={() => scroll(1)} aria-label="Next"
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-neutral-700 hover:border-[#6C4CF1] hover:text-[#6C4CF1] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        {/* Rail */}
        <div ref={railRef} className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 snap-x scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {loading
            ? [...Array(4)].map((_, i) => (
                <div key={i} className="shrink-0 w-[300px] snap-start">
                  <div className="aspect-[4/3] rounded-2xl bg-neutral-100 animate-pulse" />
                  <div className="mt-3 h-4 w-2/3 bg-neutral-100 rounded animate-pulse" />
                  <div className="mt-2 h-4 w-1/3 bg-neutral-100 rounded animate-pulse" />
                </div>
              ))
            : tours.map((tour) => {
                const rating = tour.rating ?? 4.8;
                const count = tour.reviewCount ?? 0;
                const hasDiscount = tour.compareAtPrice != null && tour.compareAtPrice > tour.basePrice;
                return (
                  <a key={tour.id} href={`/tours/${tour.id}`}
                    className="group shrink-0 w-[300px] snap-start">
                    {/* Photo */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                      {tour.coverPhotoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={tour.coverPhotoUrl} alt={tour.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#6C4CF1]/15 to-[#8B5CF6]/15 flex items-center justify-center text-4xl">🗺️</div>
                      )}
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-white/90 backdrop-blur text-[#0A0A0F]">
                        {tour.category}
                      </span>
                    </div>
                    {/* Info */}
                    <div className="mt-3">
                      <p className="text-xs text-neutral-800 flex items-center gap-1.5">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        {tour.city}
                        <span className="text-black/20">·</span>
                        {fmtDuration(tour.durationMinutes)}
                      </p>
                      <h3 className="mt-1 font-black text-[#0A0A0F] text-[15px] leading-snug line-clamp-2 group-hover:text-[#6C4CF1] transition-colors">{tour.title}</h3>
                      <div className="mt-1.5 flex items-center gap-1 text-xs">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <span className="font-bold text-[#0A0A0F]">{rating.toFixed(1)}</span>
                        {count > 0 && <span className="text-neutral-800">({count})</span>}
                      </div>
                      <div className="mt-2 flex items-baseline gap-1.5">
                        {hasDiscount && <span className="text-xs text-neutral-800 line-through"><Price amount={tour.compareAtPrice!} currency={tour.currency} /></span>}
                        <span className="text-base font-black text-[#6C4CF1]"><Price amount={tour.basePrice} currency={tour.currency} /></span>
                        <span className="text-xs text-neutral-800">/ person</span>
                      </div>
                    </div>
                  </a>
                );
              })}
        </div>

        {/* See all */}
        <div className="mt-6 text-center">
          <a href="/tours" className="inline-flex items-center gap-2 rounded-full border border-black/10 px-7 py-3 text-sm font-bold text-[#0A0A0F] hover:border-[#6C4CF1] hover:text-[#6C4CF1] transition-colors">
            {nb.seeAllTours}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
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
    <section className="py-24 bg-[#F7F7FB]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1]">{locale === "tr" ? "Gezginler bayıldı" : "Loved by travellers"}</p>
          <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight text-[#0A0A0F]">{locale === "tr" ? "Ne diyorlar" : "What people say"}</h2>
        </div>

        <div className="columns-1 md:columns-3 gap-5 [&>*]:mb-5">
          {reviews.map((r) => (
            <div key={r.id} className="break-inside-avoid rounded-3xl bg-white border border-black/[0.06] p-6 shadow-sm">
              <div className="flex gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill={i <= r.rating ? "#F59E0B" : "#E5E7EB"} stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <p className="text-sm text-neutral-800 leading-7">&ldquo;{r.comment}&rdquo;</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6C4CF1] to-[#8B5CF6] flex items-center justify-center text-xs font-black text-white shrink-0">
                  {r.fullName[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#0A0A0F] truncate">{r.fullName}{r.nationality ? `, ${r.nationality}` : ""}</p>
                  {r.tourTitle && <p className="text-xs text-neutral-800 truncate">{r.tourTitle}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
