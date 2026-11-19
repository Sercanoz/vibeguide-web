"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import PhoneFrame from "@/components/PhoneFrame";
import MatchTimeStat from "@/components/MatchTimeStat";
import { useT } from "@/components/LanguageProvider";
import { jsonLdScript } from "@/lib/jsonld";
import { MODES, localizeMode, ctaSub, type Mode } from "@/lib/modes";
import { MODE_UI } from "@/lib/modes-i18n";
import type { Locale } from "@/lib/i18n";

const SITE = "https://www.vibeguideapp.com";

// Sade/pro stil (ana sayfa ile aynı dil): serif başlıklar, tek vurgu rengi (#5B3FD9),
// emoji/renkli parlama/gölge yok. mode.color artık yalnız veri; görünümde kullanılmıyor.
const H2 = "font-display text-3xl md:text-[40px] font-normal leading-tight tracking-[-0.01em] text-neutral-900";
const PRIMARY = "inline-flex h-12 items-center rounded-full bg-[#5B3FD9] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#4A32B8]";

/** Telefon mockup içeriği — mini uygulama ekranı (marka moru, emoji yok). */
function ModeMock({ mode, locale }: { mode: Mode; locale: string }) {
  const u = MODE_UI[locale as Locale] ?? MODE_UI.en;
  return (
    <div className="px-4 pb-5">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium text-neutral-500">{u.nowLabel}</p>
          <h3 className="text-base font-semibold leading-tight text-neutral-900">{mode.name}</h3>
        </div>
        <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {u.liveLabel}
        </span>
      </div>
      <div className="space-y-2">
        {mode.steps.slice(0, 3).map((s, i) => (
          <div key={s.title} className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-3 py-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-neutral-900 text-[11px] font-semibold text-neutral-900">
              {i + 1}
            </span>
            <span className="text-[11px] font-medium leading-tight text-neutral-900">{s.title}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 w-full rounded-xl bg-[#5B3FD9] py-3 text-center text-[13px] font-semibold text-white">
        {mode.tagline}
      </div>
    </div>
  );
}

export default function ModePageView({ mode: rawMode, nonce }: { mode: Mode; nonce?: string }) {
  const { locale } = useT();
  const mode = localizeMode(rawMode, locale);
  const others = MODES.filter((m) => m.slug !== rawMode.slug).map((m) => localizeMode(m, locale));
  const ui = MODE_UI[locale as Locale] ?? MODE_UI.en;
  const exploreLabel = ui.exploreTours.replace(/s*→s*$/, "");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: `${mode.name} — VibeGuide`,
        serviceType: "Local tour guide",
        description: mode.metaDescription,
        provider: { "@type": "Organization", name: "VibeGuide", url: SITE },
        areaServed: "Türkiye",
        url: `${SITE}/${mode.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: mode.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      <Navbar />

      {/* Hero */}
      <section className="pt-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
          <div>
            <p className="text-sm font-medium text-neutral-500">{mode.tagline}</p>
            <h1 className="mt-3 font-display text-5xl font-normal leading-[1.02] tracking-[-0.02em] md:text-7xl">
              {mode.name}
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-neutral-600">{mode.heroSub}</p>
            {rawMode.slug === "vibenow" && <MatchTimeStat locale={locale} />}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/tours" className={PRIMARY}>{exploreLabel}</Link>
              <a href="#how" className="inline-flex h-12 items-center rounded-full border border-neutral-300 px-7 text-[15px] font-semibold text-neutral-900 hover:border-neutral-900">
                {ui.howItWorks}
              </a>
            </div>
          </div>
          <div className="flex justify-center rounded-3xl bg-neutral-50 py-10">
            <PhoneFrame>
              <ModeMock mode={mode} locale={locale} />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* Nasıl çalışır */}
      <section id="how" className="scroll-mt-20 border-t border-neutral-200 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className={H2}>{ui.howItWorks}</h2>
          <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {mode.steps.map((s, i) => (
              <li key={s.title} className="border-t border-neutral-900 pt-5">
                <span className="font-display text-lg tabular-nums text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 leading-7 text-neutral-600">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Faydalar */}
      <section className="bg-neutral-50 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 sm:grid-cols-3 md:px-6">
          {mode.benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-neutral-200 bg-white p-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
              <h3 className="mt-3 font-semibold">{b.title}</h3>
              <p className="mt-1.5 leading-7 text-neutral-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gerçek ekran görüntüleri — yalnız varsa */}
      {mode.screenshots.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className={H2}>{ui.seeInApp}</h2>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              {mode.screenshots.map((src) => (
                <div key={src} className="relative aspect-[9/19] w-[230px] overflow-hidden rounded-[2rem] border border-neutral-200 bg-white">
                  <Image src={`/screens/${src}`} alt={`${mode.name} screen`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SSS */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className={H2}>{ui.questions}</h2>
          <div className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
            {mode.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-neutral-500 transition-transform group-open:rotate-45" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                </summary>
                <p className="mt-3 leading-7 text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Diğer yollar */}
      <section className="border-t border-neutral-200 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className={H2}>{ui.otherWays}</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {others.map((o) => (
              <Link key={o.slug} href={`/${o.slug}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-200 px-5 py-4 transition-colors hover:border-neutral-900">
                <span className="min-w-0">
                  <span className="block font-semibold">{o.name}</span>
                  <span className="mt-0.5 block text-sm text-neutral-600">{o.tagline}</span>
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-900" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Kapanış CTA */}
      <section className="bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <h2 className={H2}>{mode.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-neutral-600">{ctaSub(locale)}</p>
          <Link href="/tours" className={`${PRIMARY} mt-8`}>{exploreLabel}</Link>
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
