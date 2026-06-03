"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "@/components/LanguageProvider";
import { homeTranslations } from "@/lib/home-i18n";
import { uiExtra } from "@/lib/ui-extra-i18n";
import { navbarI18n } from "@/lib/navbar-i18n";
import { homeSections } from "@/lib/home-sections-i18n";
import { useInView } from "@/hooks/useInView";
import Navbar from "@/components/Navbar";
import HeroCitySearch from "@/components/HeroCitySearch";
import MainFooter from "@/components/MainFooter";
import Price from "@/components/Price";
import { API_BASE_URL } from "@/lib/api";

export default function HomePage() {
  const { locale } = useT();
  const t = homeTranslations[locale];
  const ux = uiExtra[locale] ?? uiExtra.en;
  const hs = homeSections[locale] ?? homeSections.en;
  const nb = navbarI18n[locale] ?? navbarI18n.en;

  // "VibeGuide Neden Var" manifestosu — şimdilik TR + EN, diğerleri EN fallback.
  const whyExistsTr = {
    eyebrow: "VibeGuide Neden Var",
    titleA: "Turizm fazla robotlaştı.",
    titleB: "Biz tekrar insanlaştırıyoruz.",
    body: "Otobüs turları her şehirde aynı senaryoyu okuyor. QR kodlar gerçek sohbetin yerini aldı. Gezginler keşfetmekten çok sıra bekliyor. VibeGuide bunu tersine çevirir. Bir dokunuş, bir yerel, bir gerçek gün. VibeNow ile yalnız, VibeSquad ile grupla ya da Özel Turlar ile planlı — diğer tarafta hep gerçek bir insan var.",
    closing: "Senaryo yok. Tuzak yok. Sadece şehir, onu yaşayan birinin ağzından.",
  };
  const whyExistsEn = {
    eyebrow: "Why VibeGuide Exists",
    titleA: "Tourism got too robotic.",
    titleB: "We're making it human again.",
    body: "Bus tours read the same script in every city. QR codes replaced real conversation. Travellers spend more time queuing than discovering. VibeGuide flips that. One tap, one local, one real day. Solo with VibeNow, in a group with VibeSquad, or planned with Private Tours — there's always a real human on the other side.",
    closing: "No script. No trap. Just the city, in the words of someone who lives it.",
  };
  const whyExists = locale === "tr" ? whyExistsTr : whyExistsEn;

  const secHow = useInView();
  const secModes = useInView();
  const secTrust = useInView();

  return (
    <main className="min-h-screen bg-white text-[#0A0A0F] antialiased overflow-x-hidden">

      <Navbar />

      {/* ── HERO — full-screen light ── */}
      <section className="relative min-h-screen flex items-center pt-16 bg-white overflow-hidden">
        {/* Subtle ambient — top right */}
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-bl from-[#6C4CF1]/6 via-[#8B5CF6]/3 to-transparent rounded-full blur-[80px] pointer-events-none" />
        {/* Bottom left accent */}
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#6C4CF1]/4 to-transparent rounded-full blur-[80px] pointer-events-none" />
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #6C4CF1 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative mx-auto max-w-7xl px-6 py-20 w-full">
          {/* Centered destination search — sits above headline + phone */}
          <HeroCitySearch />

          <div className="mt-14 max-w-3xl mx-auto text-center">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#6C4CF1]/15 bg-[#6C4CF1]/5 px-4 py-2 text-sm font-semibold text-[#6C4CF1] mb-8 animate-[fadeSlideUp_0.7s_ease_both]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse shrink-0" />
              {t.hero.badge}
            </div>

            <h1 className="text-5xl md:text-[72px] font-black leading-[0.98] tracking-tight text-[#0A0A0F]">
              {t.hero.titleA}
              <br />
              <span className="bg-gradient-to-r from-[#6C4CF1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                {t.hero.titleAccent}
              </span>
            </h1>

            <div className="mt-6 text-[15px] leading-7 text-neutral-800 max-w-xl mx-auto space-y-3">
              {t.hero.sub.split("\n\n").map((para, i) => (
                <p key={i} style={{ whiteSpace: "pre-line" }}>{para}</p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-6 pt-6 border-t border-black/[0.06]">
              {[
                { svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: t.hero.b1 },
                { svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, label: t.hero.b2 },
                { svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, label: t.hero.b3 },
              ].map((b) => (
                <span key={b.label} className="flex items-center gap-2 text-sm text-neutral-800">
                  <span className="text-[#6C4CF1]">{b.svg}</span> {b.label}
                </span>
              ))}
            </div>
          </div>

          </div>
        </div>

      </section>

      {/* ── TRUST BAR ── */}
      <section className="border-y border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
              title: ux.trustVerifiedTitle, sub: ux.trustVerifiedSub,
            },
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6C4CF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
              title: ux.trustCancelTitle, sub: ux.trustCancelSub,
            },
            {
              icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              title: ux.trustInstantTitle, sub: ux.trustInstantSub,
            },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3">
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
      <PopularTours />

      {/* ── WHY VIBEGUIDE EXISTS ── */}
      <section className="py-28 bg-[#F7F7FB] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6C4CF1]/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1]">{whyExists.eyebrow}</p>
          <h2 className="mt-6 text-4xl md:text-6xl font-black tracking-tight leading-tight text-[#0A0A0F]">
            {whyExists.titleA}
            <br />
            <span className="text-neutral-700">{whyExists.titleB}</span>
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-base md:text-lg leading-8 text-neutral-800">
            {whyExists.body}
          </p>
          <p className="mt-10 text-xl md:text-2xl font-black tracking-tight text-[#0A0A0F] border-t border-black/[0.06] pt-10">
            {whyExists.closing}
          </p>
        </div>
      </section>


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



      {/* ── TESTIMONIALS (real reviews) ── */}
      <Testimonials />

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


interface PopularTour {
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

function fmtDuration(m: number): string {
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return mm > 0 ? `${h}h ${mm}m` : `${h}h`;
}

function PopularTours() {
  const { locale } = useT();
  const hs = homeSections[locale] ?? homeSections.en;
  const nb = navbarI18n[locale] ?? navbarI18n.en;
  const railRef = useRef<HTMLDivElement>(null);
  const [tours, setTours] = useState<PopularTour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tours?locale=en`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((data: PopularTour[]) => { setTours(data.slice(0, 10)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

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

/* Province slug → cover photo (Unsplash, verified working). Falls back to a gradient. */
const CITY_PHOTOS: Record<string, string> = {
  istanbul: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=900",
  nevsehir: "https://images.unsplash.com/photo-1641128324972-af3212f0f6bd?q=80&w=900",
  izmir: "https://images.unsplash.com/photo-1589561253898-768105ca91a8?q=80&w=900",
  aydin: "https://images.unsplash.com/photo-1589561253898-768105ca91a8?q=80&w=900",
  denizli: "https://images.unsplash.com/photo-1591291621164-2c6367723315?q=80&w=900",
  antalya: "https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?q=80&w=900",
  mugla: "https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?q=80&w=900",
};

interface Testimonial {
  id: number;
  fullName: string;
  nationality: string | null;
  rating: number;
  comment: string;
  tourTitle: string | null;
}

function Testimonials() {
  const { locale } = useT();
  const [reviews, setReviews] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/tours/reviews/featured?limit=9`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((d: Testimonial[]) => setReviews(d))
      .catch(() => {});
  }, []);

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
