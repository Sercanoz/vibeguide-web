"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/components/LanguageProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { homeTranslations } from "@/lib/home-i18n";
import { useInView } from "@/hooks/useInView";

export default function HomePage() {
  const { locale } = useT();
  const t = homeTranslations[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const secHow = useInView();
  const secEnergy = useInView();
  const secModes = useInView();
  const secManifesto = useInView();
  const secTurkey = useInView();
  const secTrust = useInView();
  const secDownload = useInView();

  const navLinks = [
    { href: "#how", label: t.nav2.howItWorks },
    { href: "#modes", label: t.nav.vibenow },
    { href: "#destinations", label: t.nav.destinations },
    { href: "#guides", label: t.nav.guides },
  ];

  return (
    <main className="min-h-screen bg-white text-[#0A0A0F] antialiased overflow-x-hidden">

      {/* ── STICKY NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-xl border-b border-black/[0.06] shadow-sm shadow-black/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          <a href="/" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-[#0A0A0F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32} style={{ mixBlendMode: "multiply" }} />
            VibeGuide
          </a>

          {/* Desktop links */}
          <div className="hidden gap-8 text-sm font-medium md:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-neutral-500 hover:text-black transition-colors">{l.label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <a href="#download" className="hidden md:block rounded-full bg-[#6C4CF1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a3dd4] transition-colors shadow-sm">
              {t.nav.cta}
            </a>
            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <span className={`block h-0.5 w-5 bg-[#0A0A0F] rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#0A0A0F] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-[#0A0A0F] rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div ref={menuRef} className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-96" : "max-h-0"}`}>
          <div className="px-6 pb-5 pt-2 border-t border-black/5 space-y-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center py-3 text-sm font-semibold text-neutral-600 hover:text-black border-b border-black/5 last:border-0 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#download"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex items-center justify-center rounded-full bg-[#6C4CF1] px-5 py-3 text-sm font-bold text-white"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO — full-screen cinematic ── */}
      <section className="relative min-h-screen flex items-center pt-16 bg-[#0A0A0F] overflow-hidden">
        {/* BG foto */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=90&w=1800"
            alt="Istanbul"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
        </div>

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#6C4CF1]/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 py-28 grid md:grid-cols-2 gap-16 items-center w-full">
          {/* Copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs font-semibold text-white/70 backdrop-blur-sm mb-8 animate-[fadeSlideUp_0.7s_ease_both]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              {t.hero.badge}
            </div>

            <h1 className="text-5xl md:text-[72px] font-black leading-[0.98] tracking-tight text-white">
              {t.hero.titleA}
              <br />
              <span className="bg-gradient-to-r from-[#6C4CF1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                {t.hero.titleAccent}
              </span>
            </h1>

            <p className="mt-6 text-[15px] leading-7 text-white/50 max-w-md">
              {t.hero.sub}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#download" className="group relative rounded-full bg-[#6C4CF1] px-7 py-3.5 text-sm font-bold text-white overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(108,76,241,0.5)]">
                <span className="relative z-10">{t.hero.ctaPrimary} →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#6C4CF1] to-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="#modes" className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-white/80 hover:bg-white/10 transition-all backdrop-blur-sm">
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 pt-6 border-t border-white/10">
              {[
                { icon: "🛡️", label: t.hero.b1 },
                { icon: "⚡", label: t.hero.b2 },
                { icon: "❤️", label: t.hero.b3 },
              ].map((b) => (
                <span key={b.label} className="flex items-center gap-2 text-sm text-white/50">
                  <span>{b.icon}</span> {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile mini hero — visible only on small screens */}
          <div className="md:hidden mt-4 flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm">
            <div className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-[#6C4CF1] to-[#8B5CF6] flex items-center justify-center text-2xl">🧭</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">Live in Istanbul</p>
              <p className="text-sm font-black text-white leading-tight">24 guides online near you</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/20 px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400">LIVE</span>
            </div>
          </div>

          {/* Phone */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative">
              <div className="absolute -inset-8 bg-[#6C4CF1]/20 blur-3xl rounded-full" />
              <Phone>
                <div className="px-4 pt-4 pb-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] text-neutral-400 font-medium">{t.phone.greet}</p>
                      <h2 className="text-lg font-black leading-tight">Istanbul 🇹🇷</h2>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[9px] font-bold text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {t.phone.live}
                    </span>
                  </div>

                  {/* Map placeholder */}
                  <div className="relative h-28 rounded-2xl overflow-hidden mb-3">
                    <Image
                      src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=60&w=600"
                      alt="map"
                      fill
                      className="object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    {/* Guide pins */}
                    {[
                      { top: "30%", left: "25%", color: "bg-[#6C4CF1]" },
                      { top: "55%", left: "60%", color: "bg-[#10B981]" },
                      { top: "20%", left: "65%", color: "bg-[#F59E0B]" },
                    ].map((pin, i) => (
                      <div key={i} className="absolute" style={{ top: pin.top, left: pin.left }}>
                        <div className={`h-5 w-5 rounded-full ${pin.color} border-2 border-white shadow-lg flex items-center justify-center`}>
                          <span className="text-[8px]">👤</span>
                        </div>
                      </div>
                    ))}
                    <div className="absolute bottom-2 left-3 text-[9px] font-bold text-white/90">{t.phoneMock.guidesNearby}</div>
                  </div>

                  {/* Mode cards */}
                  <div className="space-y-2">
                    {[
                      { grad: "from-[#6C4CF1] to-[#8B5CF6]", icon: "⚡", title: "VibeNow", sub: t.phoneMock.vibenowSub },
                      { grad: "from-[#059669] to-[#10B981]", icon: "👥", title: "VibeSquad", sub: t.phoneMock.vibesquadSub },
                      { grad: "from-[#D97706] to-[#F59E0B]", icon: "📅", title: t.nav.private, sub: t.phoneMock.privateSub },
                    ].map((c) => (
                      <div key={c.title} className={`flex items-center gap-3 rounded-xl bg-gradient-to-r ${c.grad} px-3 py-2.5`}>
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/20 text-sm">
                          {c.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-[11px] font-black text-white leading-none">{c.title}</p>
                          <p className="text-[9px] text-white/60 mt-0.5">{c.sub}</p>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-white/15 flex items-center justify-center">
                          <span className="text-white text-[10px]">›</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Notification pill */}
                  <div className="mt-3 flex items-center gap-2.5 rounded-2xl bg-[#0A0A0F] px-3 py-2.5">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#6C4CF1] to-[#10B981] flex items-center justify-center text-sm shrink-0">
                      👤
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-white leading-none">{t.phoneMock.guideOnWay}</p>
                      <p className="text-[9px] text-white/40 mt-0.5">{t.phoneMock.arrivingIn}</p>
                    </div>
                    <div className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse shrink-0" />
                  </div>
                </div>
              </Phone>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20 animate-bounce">
          <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M7 12L3 8M7 12l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <section className="bg-[#0A0A0F] border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-white/30 text-xs font-semibold uppercase tracking-widest">
            <span className="text-white/60">{t.phoneMock.proofRating}</span>
            <span>|</span>
            <span>{t.energy.eyebrow}</span>
            <span>|</span>
            <span>{t.phoneMock.proofCities}</span>
            <span>|</span>
            <span className="text-white/60">{t.phoneMock.proofGuides}</span>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section ref={secHow.ref as React.RefObject<HTMLElement>} id="how" className={`py-28 bg-white reveal ${secHow.inView ? "in-view" : ""}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1]">{t.howItWorks.eyebrow}</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">
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
                <div className="text-5xl mb-7">{["📱","🤝","🚶"][i]}</div>
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-neutral-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE CITY ENERGY ── */}
      <section ref={secEnergy.ref as React.RefObject<HTMLElement>} className={`py-8 bg-white reveal ${secEnergy.inView ? "in-view" : ""}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-[2.5rem] bg-[#0A0A0F] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#6C4CF1]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1]">{t.energy.eyebrow}</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-black text-white leading-tight">
                  {t.energy.titleA}<br /><span className="text-white/40">{t.energy.titleB}</span>
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/40 max-w-md">{t.energy.sub}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                {[
                  { num: "8", label: "Cities coming" },
                  { num: "60s", label: "Avg match time" },
                  { num: "100%", label: "Verified guides" },
                ].map((s) => (
                  <div key={s.label} className="text-center md:text-left">
                    <p className="text-3xl font-black text-white">{s.num}</p>
                    <p className="mt-1 text-xs text-white/40 font-medium">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 MODES ── */}
      <section ref={secModes.ref as React.RefObject<HTMLElement>} id="modes" className={`py-28 bg-white reveal ${secModes.inView ? "in-view" : ""}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">{t.modesIntro.eyebrow}</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tight max-w-3xl leading-tight">{t.modesIntro.title}</h2>
            <p className="mt-4 text-base leading-7 text-neutral-400 max-w-lg">{t.modesIntro.sub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                id: "vibenow",
                bg: "bg-[#0A0A0F]",
                border: "border-[#6C4CF1]/30",
                tagCol: "text-[#6C4CF1]",
                titleCol: "text-white",
                textCol: "text-white/40",
                pointCol: "text-white/50",
                btnBg: "bg-[#6C4CF1] text-white",
                data: t.modes.vibenow,
              },
              {
                id: "vibesquad",
                bg: "bg-[#ECFDF5]",
                border: "border-[#10B981]/20",
                tagCol: "text-[#059669]",
                titleCol: "text-[#0A0A0F]",
                textCol: "text-neutral-500",
                pointCol: "text-neutral-500",
                btnBg: "bg-[#059669] text-white",
                data: t.modes.vibesquad,
              },
              {
                id: "private",
                bg: "bg-[#F5F3FF]",
                border: "border-[#6C4CF1]/20",
                tagCol: "text-[#6C4CF1]",
                titleCol: "text-[#0A0A0F]",
                textCol: "text-neutral-500",
                pointCol: "text-neutral-500",
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
                <button className={`mt-7 self-start rounded-full ${card.btnBg} px-5 py-2.5 text-xs font-bold flex items-center gap-2`}>
                  {card.data.cta} →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section ref={secManifesto.ref as React.RefObject<HTMLElement>} className={`py-28 bg-[#0A0A0F] text-white relative overflow-hidden reveal ${secManifesto.inView ? "in-view" : ""}`}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFYwaDQydjQySDE4QzI3Ljk0IDQyIDM2IDMzLjk0IDM2IDI0VjE4eiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=')]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1]">{t.manifesto.eyebrow}</p>
          <h2 className="mt-6 text-4xl md:text-6xl font-black tracking-tight leading-tight">
            {t.manifesto.titleA}
            <br />
            <span className="text-white/20">{t.manifesto.titleB}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/40">
            {t.manifesto.sub}
          </p>
        </div>
      </section>


      {/* ── TURKEY ONLY BANNER ── */}
      <section ref={secTurkey.ref as React.RefObject<HTMLElement>} className={`py-16 bg-[#F7F7FB] reveal ${secTurkey.inView ? "in-view" : ""}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-3xl bg-white border border-black/5 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#FEF3C7] border border-amber-100 px-3 py-1 text-xs font-bold text-amber-700 self-start mb-6">
                  {t.turkey.badge}
                </span>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                  {t.turkey.titleA}<br />
                  <span className="text-neutral-300">{t.turkey.titleB}</span>
                </h2>
                <p className="mt-4 text-sm leading-7 text-neutral-400 max-w-sm">
                  {t.turkey.body}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    { label: t.turkey.cities[0], href: "/istanbul-tour-guide" },
                    { label: t.turkey.cities[1], href: "/cappadocia-tour-guide" },
                    { label: t.turkey.cities[2], href: "/ephesus-tour-guide" },
                  ].map((city) => (
                    <a key={city.label} href={city.href} className="rounded-full bg-[#F7F7FB] border border-black/8 px-4 py-2 text-xs font-semibold text-neutral-600 hover:border-[#6C4CF1]/40 hover:text-[#6C4CF1] transition-colors">
                      {city.label}
                    </a>
                  ))}
                  <span className="rounded-full bg-[#6C4CF1]/8 border border-[#6C4CF1]/20 px-4 py-2 text-xs font-semibold text-[#6C4CF1]">
                    {t.turkey.more}
                  </span>
                </div>
              </div>
              <div className="relative min-h-[280px] md:min-h-0 bg-[#0A0A0F] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                  <Image
                    src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=900"
                    alt="Turkey"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0A0A0F]/60" />
                </div>
                <div className="relative text-center p-8">
                  <p className="text-6xl font-black text-white">🇹🇷</p>
                  <p className="mt-3 text-lg font-black text-white">Turkey</p>
                  <p className="mt-1 text-sm text-white/50">{t.turkey.liveNow}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST + TESTIMONIALS ── */}
      <section ref={secTrust.ref as React.RefObject<HTMLElement>} id="guides" className={`py-28 bg-white reveal ${secTrust.inView ? "in-view" : ""}`}>
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Trust */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400">Every guide is verified</p>
              <h2 className="mt-4 text-4xl md:text-5xl font-black tracking-tight leading-tight">{t.trust.title}</h2>
              <div className="mt-12 space-y-8">
                {t.trust.items.map((item, i) => (
                  <div key={item.title} className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7F7FB] text-xl border border-black/5">
                      {["🪪", "✅", "📋", "🚫"][i]}
                    </div>
                    <div>
                      <p className="font-black text-[15px]">{item.title}</p>
                      <p className="mt-1.5 text-sm leading-6 text-neutral-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              <div className="rounded-3xl bg-[#0A0A0F] p-6 text-white">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6C4CF1]">{t.testimonials.eyebrow}</p>
                <h3 className="mt-3 text-xl font-black leading-tight">{t.testimonials.title}</h3>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[
                      { g: "from-[#6C4CF1] to-[#8B5CF6]", i: "S" },
                      { g: "from-[#059669] to-[#10B981]", i: "M" },
                      { g: "from-[#D97706] to-[#F59E0B]", i: "A" },
                      { g: "from-[#EC4899] to-[#F43F5E]", i: "L" },
                      { g: "from-[#0EA5E9] to-[#6C4CF1]", i: "J" },
                    ].map((av, idx) => (
                      <div key={idx} className={`h-8 w-8 rounded-full bg-gradient-to-br ${av.g} border-2 border-[#0A0A0F] flex items-center justify-center text-[10px] font-black text-white`}>{av.i}</div>
                    ))}
                  </div>
                  <p className="text-xs text-white/40">{t.testimonials.sub}</p>
                </div>
              </div>
              {t.testimonials.quotes.map((q) => (
                <div key={q.name} className="rounded-3xl bg-[#F7F7FB] border border-black/5 p-6">
                  <p className="text-amber-400 text-sm tracking-tight">★★★★★</p>
                  <p className="mt-3 text-sm leading-6 text-neutral-600">"{q.quote}"</p>
                  <p className="mt-3 text-xs font-bold text-neutral-400">— {q.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD — full-width dark ── */}
      <section ref={secDownload.ref as React.RefObject<HTMLElement>} id="download" className={`relative py-32 bg-[#0A0A0F] text-white overflow-hidden reveal ${secDownload.inView ? "in-view" : ""}`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#6C4CF1]/15 rounded-full blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1]">Available now</p>
          <h2 className="mt-5 text-5xl md:text-7xl font-black tracking-tight leading-tight">
            {t.download.title}
          </h2>
          <p className="mt-6 text-base text-white/40 max-w-md mx-auto leading-7">{t.download.sub}</p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a href="#" className="group flex items-center gap-4 rounded-2xl bg-white px-7 py-4 text-black hover:bg-white/90 transition-all shadow-xl shadow-white/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <p className="text-[11px] leading-none text-black/40 font-medium">Download on the</p>
                <p className="text-base font-black mt-0.5">App Store</p>
              </div>
            </a>
            <a href="#" className="group flex items-center gap-4 rounded-2xl bg-white px-7 py-4 text-black hover:bg-white/90 transition-all shadow-xl shadow-white/10">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.19.96.08l13.12-7.57-2.8-2.8-11.28 10.29zM20.9 10.42L17.96 8.7 14.84 11.8l3.13 3.12 2.95-1.7c.84-.48.84-2.32-.02-2.8zM2.14.75C2.05 1 2 1.26 2 1.56v20.89c0 .3.04.57.14.81L13.61 11.8 2.14.75zM3.18.24L14.84 11.8l-2.8 2.8L.22.32C.56.21.9.23 1.22.4l1.96 1.13V.24z"/>
              </svg>
              <div className="text-left">
                <p className="text-[11px] leading-none text-black/40 font-medium">GET IT ON</p>
                <p className="text-base font-black mt-0.5">Google Play</p>
              </div>
            </a>
          </div>

          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="p-3 bg-white rounded-2xl shadow-lg inline-block">
              {/* QR code SVG — links to vibeguideapp.com */}
              <svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Finder top-left */}
                <rect x="4" y="4" width="28" height="28" rx="3" fill="#0A0A0F"/>
                <rect x="8" y="8" width="20" height="20" rx="2" fill="white"/>
                <rect x="12" y="12" width="12" height="12" rx="1" fill="#0A0A0F"/>
                {/* Finder top-right */}
                <rect x="64" y="4" width="28" height="28" rx="3" fill="#0A0A0F"/>
                <rect x="68" y="8" width="20" height="20" rx="2" fill="white"/>
                <rect x="72" y="12" width="12" height="12" rx="1" fill="#0A0A0F"/>
                {/* Finder bottom-left */}
                <rect x="4" y="64" width="28" height="28" rx="3" fill="#0A0A0F"/>
                <rect x="8" y="68" width="20" height="20" rx="2" fill="white"/>
                <rect x="12" y="72" width="12" height="12" rx="1" fill="#0A0A0F"/>
                {/* Data modules — simplified pattern */}
                <rect x="40" y="4" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="50" y="4" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="40" y="14" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="50" y="14" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="4" y="40" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="14" y="40" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="4" y="50" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="14" y="50" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="40" y="40" width="6" height="6" rx="1" fill="#6C4CF1"/>
                <rect x="50" y="40" width="6" height="6" rx="1" fill="#6C4CF1"/>
                <rect x="60" y="40" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="40" y="50" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="50" y="50" width="6" height="6" rx="1" fill="#6C4CF1"/>
                <rect x="60" y="50" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="40" y="60" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="50" y="60" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="60" y="60" width="6" height="6" rx="1" fill="#6C4CF1"/>
                <rect x="70" y="40" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="80" y="40" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="70" y="50" width="6" height="6" rx="1" fill="#6C4CF1"/>
                <rect x="80" y="50" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="70" y="60" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="80" y="60" width="6" height="6" rx="1" fill="#6C4CF1"/>
                <rect x="40" y="70" width="6" height="6" rx="1" fill="#6C4CF1"/>
                <rect x="50" y="70" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="60" y="70" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="70" y="70" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="80" y="70" width="6" height="6" rx="1" fill="#6C4CF1"/>
                <rect x="40" y="80" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="50" y="80" width="6" height="6" rx="1" fill="#6C4CF1"/>
                <rect x="60" y="80" width="6" height="6" rx="1" fill="#6C4CF1"/>
                <rect x="70" y="80" width="6" height="6" rx="1" fill="#0A0A0F"/>
                <rect x="80" y="80" width="6" height="6" rx="1" fill="#0A0A0F"/>
              </svg>
            </div>
            <p className="text-xs text-white/30">Scan to download</p>
          </div>

          <p className="mt-6 text-xs text-white/20">Free to download · Istanbul available now</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#F7F7FB] border-t border-black/[0.06] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[2.5fr_1fr_1fr_1fr]">
            <div>
              <h3 className="flex items-center gap-2.5 text-xl font-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/vibeguide-icon.png" alt="VibeGuide" width={28} height={28} style={{ mixBlendMode: "multiply" }} />
                VibeGuide
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-400">{t.footer.tagline}</p>
              <div className="mt-6 flex gap-2">
                {["Instagram", "TikTok", "YouTube"].map((s) => (
                  <a key={s} href="#" className="h-9 w-9 flex items-center justify-center rounded-xl bg-white border border-black/8 text-xs font-bold text-neutral-400 hover:text-black hover:border-black/20 transition-colors">
                    {s[0]}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black">{t.footer.product}</h4>
              <ul className="mt-4 space-y-3 text-sm text-neutral-400">
                <li><a href="#vibenow" className="hover:text-black transition-colors">VibeNow</a></li>
                <li><a href="#vibesquad" className="hover:text-black transition-colors">VibeSquad</a></li>
                <li><a href="#private" className="hover:text-black transition-colors">{t.nav.private}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black">{t.footer.destinations}</h4>
              <ul className="mt-4 space-y-3 text-sm text-neutral-400">
                <li><a href="/istanbul-tour-guide" className="hover:text-black transition-colors">Istanbul Tour Guide</a></li>
                <li><a href="/cappadocia-tour-guide" className="hover:text-black transition-colors">Cappadocia Tour Guide</a></li>
                <li><a href="/ephesus-tour-guide" className="hover:text-black transition-colors">Ephesus Tour Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black">{t.footer.support}</h4>
              <ul className="mt-4 space-y-3 text-sm text-neutral-400">
                <li><a href="/help" className="hover:text-black transition-colors">{t.footerLinks.helpCenter}</a></li>
                <li><a href="/terms" className="hover:text-black transition-colors">{t.footerLinks.terms}</a></li>
                <li><a href="/privacy" className="hover:text-black transition-colors">{t.footerLinks.privacy}</a></li>
                <li><a href="/account-deletion" className="hover:text-black transition-colors">{t.footerLinks.accountDeletion}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-black/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-300">{t.footer.copyright}</p>
            <p className="text-xs text-neutral-200">#istanbultours · #guideinistanbul · #turkeytour · #localguide</p>
          </div>
        </div>
      </footer>
    </main>
  );
}


function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[280px] rounded-[3rem] bg-gradient-to-b from-[#2a2a2a] to-[#000] p-[5px] shadow-[0_40px_80px_-10px_rgba(108,76,241,0.5)]">
      <div className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l-md bg-[#2a2a2a]" />
      <div className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l-md bg-[#2a2a2a]" />
      <div className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r-md bg-[#2a2a2a]" />
      <div className="relative overflow-hidden rounded-[2.6rem] bg-white">
        <div className="relative flex items-center justify-between px-7 pt-3 pb-2">
          <span className="text-[13px] font-semibold text-black">9:41</span>
          <div className="absolute left-1/2 top-2.5 h-7 w-24 -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center gap-1.5 text-black">
            <svg width="16" height="10" viewBox="0 0 18 11" fill="currentColor">
              <rect x="0" y="7" width="3.5" height="4" rx="0.6" />
              <rect x="5" y="5" width="3.5" height="6" rx="0.6" />
              <rect x="10" y="2.5" width="3.5" height="8.5" rx="0.6" />
              <rect x="15" y="0" width="3.5" height="11" rx="0.6" />
            </svg>
            <svg width="24" height="10" viewBox="0 0 27 11" fill="none">
              <rect x="0.5" y="0.5" width="22" height="10" rx="2.5" stroke="currentColor" />
              <rect x="2" y="2" width="19" height="7" rx="1" fill="currentColor" />
            </svg>
          </div>
        </div>
        {children}
        <div className="flex justify-center pb-2">
          <div className="h-1 w-24 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}
