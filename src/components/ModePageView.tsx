import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import PhoneFrame from "@/components/PhoneFrame";
import { MODES, MODE_CTA_SUB, type Mode } from "@/lib/modes";

const SITE = "https://www.vibeguideapp.com";

/** Telefon mockup içeriği — moda göre renklenen mini uygulama ekranı. */
function ModeMock({ mode }: { mode: Mode }) {
  return (
    <div className="px-4 pb-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-[10px] text-neutral-800 font-medium">Istanbul · now</p>
          <h3 className="text-base font-black leading-tight flex items-center gap-1">
            <span>{mode.emoji}</span> {mode.name}
          </h3>
        </div>
        <span
          className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
          style={{ backgroundColor: mode.color }}
        >
          LIVE
        </span>
      </div>

      {/* Step rows */}
      <div className="space-y-2">
        {mode.steps.slice(0, 3).map((s, i) => (
          <div
            key={s.title}
            className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-[#F9FAFB] px-3 py-2.5"
          >
            <span
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
              style={{ backgroundColor: mode.color }}
            >
              {i + 1}
            </span>
            <span className="text-[11px] font-bold text-[#0A0A0F] leading-tight">
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <button
        className="mt-3 w-full rounded-2xl py-3 text-[13px] font-black text-white"
        style={{ backgroundColor: mode.color }}
      >
        {mode.tagline}
      </button>
    </div>
  );
}

export default function ModePageView({ mode }: { mode: Mode }) {
  const others = MODES.filter((m) => m.slug !== mode.slug);

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
    <main className="min-h-screen bg-white text-[#0A0A0F] antialiased">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[90px] pointer-events-none opacity-20"
          style={{ background: `radial-gradient(circle, ${mode.color}, transparent)` }}
        />
        <div className="relative mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-black"
              style={{ backgroundColor: `${mode.color}14`, color: mode.color }}
            >
              {mode.emoji} {mode.tagline}
            </span>
            <h1 className="mt-5 text-5xl md:text-6xl font-black tracking-tight leading-[1.02]">
              {mode.name}
            </h1>
            <p className="mt-5 text-lg leading-8 text-neutral-700 max-w-md">
              {mode.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tours"
                className="rounded-full px-7 py-3.5 text-sm font-bold text-white transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: mode.color, boxShadow: `0 4px 20px ${mode.color}55` }}
              >
                Explore tours →
              </Link>
              <a
                href="#how"
                className="rounded-full border border-black/10 px-7 py-3.5 text-sm font-bold text-[#0A0A0F] hover:border-black/30 transition-colors"
              >
                How it works
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <PhoneFrame>
              <ModeMock mode={mode} />
            </PhoneFrame>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-16 bg-[#F7F7FB]">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-10">How it works</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mode.steps.map((s, i) => (
              <div key={s.title} className="rounded-2xl bg-white border border-black/[0.06] p-6">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-white"
                  style={{ backgroundColor: mode.color }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 font-black text-[#0A0A0F]">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-neutral-700">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 grid sm:grid-cols-3 gap-5">
          {mode.benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-black/[0.06] p-6">
              <h3 className="font-black text-[#0A0A0F] mb-1.5">{b.title}</h3>
              <p className="text-sm leading-6 text-neutral-700">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Real screenshots — only when provided */}
      {mode.screenshots.length > 0 && (
        <section className="py-12 bg-[#F7F7FB]">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-3xl font-black tracking-tight mb-8">See it in the app</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {mode.screenshots.map((src) => (
                <div
                  key={src}
                  className="relative w-[230px] aspect-[9/19] overflow-hidden rounded-[2rem] border border-black/[0.08] shadow-lg bg-white"
                >
                  <Image src={`/screens/${src}`} alt={`${mode.name} screen`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-black tracking-tight mb-8">Questions</h2>
          <div className="space-y-3">
            {mode.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-black/[0.06] px-5 py-4">
                <summary className="cursor-pointer list-none font-black flex items-center justify-between gap-3">
                  {f.q}
                  <span style={{ color: mode.color }} className="transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-[15px] leading-7 text-neutral-800">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other modes */}
      <section className="pb-4">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-black tracking-tight mb-6">The other ways to explore</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/${o.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-black/[0.06] p-5 hover:border-black/20 transition-colors"
              >
                <span className="text-3xl">{o.emoji}</span>
                <span>
                  <span className="block font-black text-[#0A0A0F] group-hover:text-[#6C4CF1] transition-colors">{o.name}</span>
                  <span className="block text-sm text-neutral-800">{o.tagline}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F7F7FB]">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">{mode.ctaTitle}</h2>
          <p className="text-neutral-700 mb-8 leading-7">{MODE_CTA_SUB}</p>
          <Link
            href="/tours"
            className="inline-block rounded-full px-8 py-3.5 text-sm font-bold text-white"
            style={{ backgroundColor: mode.color, boxShadow: `0 4px 20px ${mode.color}55` }}
          >
            Explore tours →
          </Link>
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
