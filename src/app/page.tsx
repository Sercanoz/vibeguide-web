"use client";

import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useT } from "@/components/LanguageProvider";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1 bg-white">
        <Hero />
        <TrustStrip />
        <Products />
        <HowItWorks />
        <FeaturesMinimal />
        <FeaturedQuote />
        <ForGuides />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

/* ──────────────────────────────────────────────────────────────
   HERO — display typography, single CTA pair, refined device
   ────────────────────────────────────────────────────────────── */
function Hero() {
  const { t } = useT();
  return (
    <section className="relative overflow-hidden">
      {/* very subtle backdrop — single soft gradient blob */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] h-[640px] w-[640px] rounded-full bg-vg-primary/[0.07] blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 md:grid-cols-[1.1fr_0.9fr] md:gap-20 md:pb-32 md:pt-28 lg:px-8">
        {/* LEFT — copy */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vg-muted">
            {t.hero.badge}
          </p>
          <h1 className="mt-6 max-w-2xl text-[44px] font-semibold leading-[1.04] tracking-[-0.025em] text-vg-ink md:text-6xl lg:text-[72px]">
            {t.hero.titleA}{" "}
            <span className="text-vg-primary">{t.hero.titleB}</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-[1.65] text-vg-muted md:text-[19px]">
            <CleanText text={t.hero.sub} />
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#download"
              className="inline-flex h-12 items-center rounded-full bg-vg-ink px-7 text-sm font-semibold text-white transition hover:bg-vg-ink/85"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#how"
              className="inline-flex h-12 items-center rounded-full border border-vg-border bg-white px-7 text-sm font-semibold text-vg-ink transition hover:border-vg-ink/30"
            >
              {t.hero.ctaSecondary}
            </a>
          </div>

          {/* trust micro-row — very subdued */}
          <div className="mt-12 flex items-center gap-5">
            <div className="flex -space-x-2">
              {["bg-vg-primary", "bg-vg-flame", "bg-vg-amber", "bg-vg-mint"].map((c, i) => (
                <div
                  key={i}
                  className={`h-8 w-8 rounded-full ${c} border-2 border-white`}
                />
              ))}
            </div>
            <div className="text-sm text-vg-muted">
              <span className="font-semibold text-vg-ink">4.9</span>{" "}
              <span className="text-vg-amber">★★★★★</span>
              <span className="ml-2">· {t.hero.ratingNote}</span>
            </div>
          </div>
        </div>

        {/* RIGHT — refined device */}
        <Device t={t} />
      </div>
    </section>
  );
}

/* Phone mockup — single column of monochrome cards w/ one purple accent */
function Device({ t }: { t: ReturnType<typeof useT>["t"] }) {
  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="absolute -inset-10 -z-10 rounded-[80px] bg-vg-primary/10 blur-3xl" />
      <div className="relative aspect-[9/19.2] rounded-[44px] bg-vg-ink p-[3px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]">
        <div className="flex h-full flex-col overflow-hidden rounded-[41px] bg-white">
          {/* status bar */}
          <div className="flex items-center justify-center pt-2">
            <div className="h-5 w-20 rounded-full bg-vg-ink" />
          </div>

          {/* header */}
          <div className="flex items-center justify-between px-5 pt-5">
            <div>
              <p className="text-[10px] text-vg-muted">{t.hero.phoneGreet}</p>
              <p className="text-lg font-semibold tracking-tight text-vg-ink">
                {t.hero.phoneCity}
              </p>
            </div>
            <Image
              src="/app-icon.png"
              alt=""
              width={36}
              height={36}
              className="rounded-xl"
            />
          </div>

          {/* primary card — single accent, no gradient riot */}
          <div className="mx-5 mt-5 rounded-2xl border border-vg-border bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-vg-flame" />
              <span className="text-[10px] font-semibold uppercase tracking-widest text-vg-flame">
                Live
              </span>
            </div>
            <p className="mt-2 text-base font-semibold text-vg-ink">VibeNow</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-vg-muted">
              {t.hero.phoneVibeNowSub}
            </p>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-xl font-semibold text-vg-ink">$25</span>
              <span className="text-[10px] text-vg-muted">/ person</span>
            </div>
          </div>

          {/* secondary card */}
          <div className="mx-5 mt-3 rounded-2xl border border-vg-border bg-vg-bg-soft p-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-vg-primary">
                Squad
              </span>
            </div>
            <p className="mt-2 text-base font-semibold text-vg-ink">
              {t.hero.phoneSquadTitle}
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-vg-muted">
              {t.hero.phoneSquadSub}
            </p>
            <div className="mt-3 flex items-center gap-3 text-[10px] font-medium text-vg-muted">
              <span>{t.hero.phoneSquadPerk}</span>
              <span className="h-1 w-1 rounded-full bg-vg-border" />
              <span>{t.hero.phoneSquadCrew}</span>
            </div>
          </div>

          {/* tour preview */}
          <div className="mx-5 mt-3 flex-1 rounded-2xl bg-gradient-to-br from-vg-primary to-vg-violet p-4">
            <p className="text-[11px] font-semibold text-white">
              {t.hero.phoneTourTitle}
            </p>
            <p className="mt-0.5 text-[10px] text-white/80">
              {t.hero.phoneTourSub}
            </p>
          </div>

          {/* home indicator */}
          <div className="flex items-center justify-center pb-2 pt-3">
            <div className="h-1 w-24 rounded-full bg-vg-ink/40" />
          </div>
        </div>
      </div>

      {/* floating chips — refined, no shadow shouting */}
      <div className="absolute -left-4 top-[28%] rounded-2xl border border-vg-border bg-white px-3.5 py-2.5 shadow-lg shadow-black/[0.04]">
        <p className="text-[10px] font-medium text-vg-muted">
          {t.hero.matchedIn}
        </p>
        <p className="text-base font-semibold text-vg-ink">
          42<span className="text-xs text-vg-muted">s</span>
        </p>
      </div>
      <div className="absolute -right-4 bottom-[24%] rounded-2xl border border-vg-border bg-white px-3.5 py-2.5 shadow-lg shadow-black/[0.04]">
        <p className="text-[10px] font-medium text-vg-muted">{t.hero.saved}</p>
        <p className="text-base font-semibold text-vg-flame">$48</p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TRUST STRIP — refined stat row, no neon
   ────────────────────────────────────────────────────────────── */
function TrustStrip() {
  const { t } = useT();
  const items = [
    { v: "50K+", l: t.stats.travelers },
    { v: "1.2K", l: t.stats.guides },
    { v: "12", l: t.stats.cities },
    { v: "4.9", l: t.stats.rating, suffix: "★" },
  ];
  return (
    <section className="border-y border-vg-border bg-vg-bg-soft/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-12 md:grid-cols-4 lg:px-8">
        {items.map((s, i) => (
          <div key={i} className="text-center md:text-left">
            <p className="text-3xl font-semibold tracking-tight text-vg-ink md:text-4xl">
              {s.v}
              {s.suffix && (
                <span className="ml-1 text-vg-amber text-2xl">{s.suffix}</span>
              )}
            </p>
            <p className="mt-1 text-sm text-vg-muted">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   PRODUCTS — Now/Squad side by side, monochrome with one accent
   ────────────────────────────────────────────────────────────── */
function Products() {
  const { t } = useT();
  return (
    <section
      id="how"
      className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vg-primary">
          {t.duo.eyebrow}
        </p>
        <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-vg-ink md:text-5xl">
          {t.duo.h2A} <span className="text-vg-primary">{t.duo.h2B}</span>
        </h2>
      </div>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {/* Now */}
        <article
          id="vibenow"
          className="group relative overflow-hidden rounded-2xl border border-vg-ink bg-vg-ink p-8 text-white md:p-10"
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-vg-flame" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vg-flame">
              VibeNow
            </span>
          </div>
          <h3 className="mt-5 text-3xl font-semibold tracking-tight md:text-4xl">
            {t.duo.nowTagline}
          </h3>
          <p className="mt-4 max-w-md leading-relaxed text-white/70">
            {t.duo.nowBody}
          </p>
          <ul className="mt-7 space-y-3">
            {t.duo.nowList.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-vg-flame" />
                <span className="text-white/85">{s}</span>
              </li>
            ))}
          </ul>
          <a
            href="#download"
            className="mt-8 inline-flex h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-vg-ink transition hover:bg-white/90"
          >
            {t.duo.nowCta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </article>

        {/* Squad */}
        <article
          id="vibesquad"
          className="group relative overflow-hidden rounded-2xl border border-vg-border bg-vg-bg-soft p-8 md:p-10"
        >
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vg-primary">
              VibeSquad
            </span>
          </div>
          <h3 className="mt-5 text-3xl font-semibold tracking-tight text-vg-ink md:text-4xl">
            {t.duo.squadTagline}
          </h3>
          <p className="mt-4 max-w-md leading-relaxed text-vg-muted">
            {t.duo.squadBody}
          </p>
          <ul className="mt-7 space-y-3">
            {t.duo.squadList.map((s, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-vg-primary" />
                <span className="text-vg-ink/80">{s}</span>
              </li>
            ))}
          </ul>
          <a
            href="#download"
            className="mt-8 inline-flex h-11 items-center rounded-full bg-vg-primary px-5 text-sm font-semibold text-white transition hover:bg-vg-primary/90"
          >
            {t.duo.squadCta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </article>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   HOW IT WORKS — 3 steps, big numbers, thin connector line
   ────────────────────────────────────────────────────────────── */
function HowItWorks() {
  const { t } = useT();
  return (
    <section className="border-t border-vg-border bg-vg-bg-soft/40">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vg-primary">
            {t.how.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-vg-ink md:text-5xl">
            <span className="text-vg-primary">{t.how.h2A}</span> {t.how.h2B}
          </h2>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* connector line — desktop only */}
          <div className="absolute left-0 right-0 top-[44px] -z-0 hidden h-px bg-gradient-to-r from-transparent via-vg-border to-transparent md:block" />

          {t.how.steps.map((s, i) => (
            <div key={i} className="relative">
              <div className="flex h-[88px] items-start">
                <span className="relative inline-flex h-[88px] w-[88px] items-center justify-center rounded-full border border-vg-border bg-white text-2xl font-semibold tracking-tight text-vg-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-vg-ink">{s.t}</h3>
              <p className="mt-2 leading-relaxed text-vg-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FEATURES — bare grid, monochrome SVG dot icons
   ────────────────────────────────────────────────────────────── */
function FeaturesMinimal() {
  const { t } = useT();
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vg-primary">
          {t.features.eyebrow}
        </p>
        <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-vg-ink md:text-5xl">
          {t.features.h2A}{" "}
          <span className="text-vg-primary">{t.features.h2B}</span>
        </h2>
      </div>

      <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {t.features.items.map((f, i) => (
          <div key={i} className="border-t border-vg-border pt-7">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-vg-primary/10 text-vg-primary">
              <Dot className="h-3.5 w-3.5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-vg-ink">{f.t}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-vg-muted">
              {f.d}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FEATURED QUOTE — one big quote, 2 supporting attribution tiles
   ────────────────────────────────────────────────────────────── */
function FeaturedQuote() {
  const { t } = useT();
  const flags = ["🇺🇸", "🇩🇪", "🇯🇵"];
  const [main, ...rest] = t.testimonials.quotes;
  return (
    <section className="border-y border-vg-border bg-vg-bg-soft/50">
      <div className="mx-auto max-w-5xl px-6 py-24 md:py-32 lg:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-vg-primary">
          {t.testimonials.eyebrow}
        </p>
        <blockquote className="mt-8 text-center">
          <p className="mx-auto max-w-3xl text-2xl font-medium leading-[1.4] tracking-[-0.01em] text-vg-ink md:text-3xl lg:text-[34px]">
            &ldquo;{main.q}&rdquo;
          </p>
          <footer className="mt-8 flex items-center justify-center gap-3 text-sm">
            <span className="text-xl">{flags[0]}</span>
            <span className="font-semibold text-vg-ink">{main.n}</span>
            <span className="text-vg-muted">·</span>
            <span className="text-vg-muted">{main.l}</span>
          </footer>
        </blockquote>

        {rest.length > 0 && (
          <div className="mt-16 grid gap-8 border-t border-vg-border pt-12 md:grid-cols-2">
            {rest.map((c, i) => (
              <div key={i}>
                <p className="text-[15px] leading-relaxed text-vg-ink/85">
                  &ldquo;{c.q}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <span>{flags[i + 1]}</span>
                  <span className="font-semibold text-vg-ink">{c.n}</span>
                  <span className="text-vg-muted">· {c.l}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FOR GUIDES — dark, split, simple
   ────────────────────────────────────────────────────────────── */
function ForGuides() {
  const { t } = useT();
  return (
    <section id="guides" className="relative overflow-hidden bg-vg-ink">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-vg-primary/20 blur-3xl" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-[1fr_1fr] md:gap-20 md:py-32 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vg-amber">
            {t.guides.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-white md:text-5xl lg:text-6xl">
            {t.guides.h2A}{" "}
            <span className="text-vg-amber">{t.guides.h2B}</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
            {t.guides.body}
          </p>
          <a
            href="#download"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-white px-7 text-sm font-semibold text-vg-ink transition hover:bg-white/90"
          >
            {t.guides.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 self-center">
          {t.guides.stats.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
                {s.v}
              </p>
              <p className="mt-1 text-sm text-white/60">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   FINAL CTA — confident, simple, two store buttons
   ────────────────────────────────────────────────────────────── */
function FinalCta() {
  const { t } = useT();
  return (
    <section
      id="download"
      className="relative overflow-hidden bg-white py-28 md:py-36"
    >
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-vg-primary">
          {t.finalCta.eyebrow}
        </p>
        <h2 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-[-0.025em] text-vg-ink md:text-6xl lg:text-7xl">
          {t.finalCta.h2A}{" "}
          <span className="text-vg-primary">{t.finalCta.h2B}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-vg-muted">
          {t.finalCta.sub}
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <a
            href="#"
            className="inline-flex h-14 items-center gap-3 rounded-2xl bg-vg-ink px-6 text-white transition hover:bg-vg-ink/85"
          >
            <AppleLogo className="h-6 w-6" />
            <div className="text-left leading-tight">
              <p className="text-[10px] opacity-70">
                {t.finalCta.appStoreSmall}
              </p>
              <p className="text-base font-semibold">{t.finalCta.appStore}</p>
            </div>
          </a>
          <a
            href="#"
            className="inline-flex h-14 items-center gap-3 rounded-2xl bg-vg-ink px-6 text-white transition hover:bg-vg-ink/85"
          >
            <GoogleLogo className="h-6 w-6" />
            <div className="text-left leading-tight">
              <p className="text-[10px] opacity-70">
                {t.finalCta.playStoreSmall}
              </p>
              <p className="text-base font-semibold">{t.finalCta.playStore}</p>
            </div>
          </a>
        </div>

        <p className="mt-8 text-sm text-vg-muted">{t.finalCta.note}</p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────
   Tiny helpers — RichText + inline SVG icons
   ────────────────────────────────────────────────────────────── */
function CleanText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className="font-semibold text-vg-ink">
            {p.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

function Check({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

function Dot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <circle cx="8" cy="8" r="4" />
    </svg>
  );
}

function AppleLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.05 12.04c-.02-2.13 1.74-3.15 1.82-3.2-.99-1.45-2.54-1.65-3.09-1.67-1.31-.13-2.56.77-3.23.77-.66 0-1.69-.75-2.78-.73-1.43.02-2.75.83-3.48 2.11-1.49 2.58-.38 6.39 1.06 8.49.71 1.03 1.55 2.18 2.65 2.14 1.06-.04 1.46-.69 2.74-.69s1.64.69 2.77.67c1.14-.02 1.87-1.04 2.57-2.07.81-1.19 1.15-2.34 1.17-2.4-.03-.01-2.24-.86-2.26-3.41M15.06 5.7c.58-.71.97-1.69.86-2.66-.84.03-1.85.56-2.45 1.26-.54.62-1.01 1.62-.89 2.57.94.07 1.9-.48 2.48-1.17" />
    </svg>
  );
}

function GoogleLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M3.6 2.3c-.4.3-.6.7-.6 1.3v17c0 .5.2 1 .6 1.3l9.6-9.5L3.6 2.3z" />
      <path d="M16.8 8.5L5.2 1.9l9.5 9.5 2.1-2.9z" opacity="0.85" />
      <path d="M19.9 10.4L16.8 8.5l-2.1 2.9 2.1 2.9 3.1-1.9c.9-.5.9-1.9 0-2z" />
      <path d="M5.2 22.1l11.6-6.6-2.1-2.9-9.5 9.5z" opacity="0.7" />
    </svg>
  );
}
