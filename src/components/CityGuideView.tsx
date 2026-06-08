import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import CityTours from "@/components/CityTours";
import type { CityGuide, CityGuideLang } from "@/lib/cityGuides";
import { RTL_CITY_LANGS } from "@/lib/cityGuides";
import JsonLdScript from "@/components/JsonLdScript";

const SITE = "https://www.vibeguideapp.com";

// Localized prefix: en lives at root, others under /<lang>.
function langPrefix(lang: CityGuideLang) {
  return lang === "en" ? "" : `/${lang}`;
}

/**
 * Shared renderer for every city tour-guide landing page.
 * EN renders at the root URL; other languages at /<lang>/<slug>.
 * Pulls all copy from the CityGuide data so a new language = one data block.
 */
export default function CityGuideView({
  guide,
  lang,
}: {
  guide: CityGuide;
  lang: CityGuideLang;
}) {
  const c = guide.i18n[lang];
  const rtl = RTL_CITY_LANGS.has(lang);
  const url = `${SITE}${langPrefix(lang)}/${guide.slug}`;

  const graph: object[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "VibeGuide", item: SITE },
        { "@type": "ListItem", position: 2, name: c.h1, item: url },
      ],
    },
  ];
  if (c.faqs && c.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: c.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  const jsonLd = { "@context": "https://schema.org", "@graph": graph };

  return (
    <main
      dir={rtl ? "rtl" : "ltr"}
      className="min-h-screen bg-white text-[#0A0A0F] antialiased"
    >
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0A0A0F] text-white pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={guide.heroImage}
            alt={c.h1}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/70 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">
            {c.region}
          </p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight max-w-2xl">
            {c.h1}
            <br />
            <span className="bg-gradient-to-r from-[#6C4CF1] to-[#8B5CF6] bg-clip-text text-transparent">
              {c.h1Accent}
            </span>
          </h1>
          <p className="mt-6 text-base text-white/50 max-w-lg leading-7">{c.heroLead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#download"
              className="rounded-full bg-[#6C4CF1] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#5a3dd4] transition-colors"
            >
              {c.ctaPrimary}
            </Link>
            <Link
              href="/#modes"
              className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-white/80 hover:bg-white/10 transition-all"
            >
              {c.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">
            {c.highlightsKicker}
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">
            {c.highlightsHeading}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {c.highlights.map((h) => (
              <div
                key={h.name}
                className="rounded-2xl border border-black/[0.06] bg-[#F7F7FB] p-6 hover:border-[#6C4CF1]/30 transition-colors"
              >
                <span className="text-3xl">{h.icon}</span>
                <h3 className="mt-3 text-base font-black">{h.name}</h3>
                <p className="mt-1.5 text-sm text-neutral-700 leading-6">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real tours */}
      <CityTours citySlug={guide.citySlug} cityName={guide.cityName} locale={lang} />

      {/* Rich SEO content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
            {c.seoHeading}
          </h2>
          <div className="space-y-5 text-[15px] text-neutral-800 leading-8">
            {c.seoParagraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>
      </section>

      {/* 3 modes */}
      <section className="py-20 bg-[#F7F7FB]">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-800 mb-4">
            {c.modesKicker}
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">
            {c.modesHeading}
          </h2>
          <div className="grid md:grid-cols-3 gap-5">
            {c.modes.map((m) => (
              <div
                key={m.tag}
                className="rounded-2xl bg-white border border-black/[0.06] p-7 shadow-sm"
              >
                <span
                  className={`inline-block rounded-full ${m.color} px-3 py-1 text-[10px] font-black text-white uppercase tracking-wide mb-4`}
                >
                  {m.tag}
                </span>
                <h3 className="text-xl font-black mb-2">{m.title}</h3>
                <p className="text-sm text-neutral-700 leading-6">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-[#0A0A0F] text-white p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">{c.trustHeading}</h2>
            <p className="text-white/50 max-w-lg mx-auto leading-7 text-sm">{c.trustText}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/40 font-medium">
              {c.trustBadges.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {c.faqs && c.faqs.length > 0 && (
        <section className="py-16 bg-[#F7F7FB]">
          <div className="mx-auto max-w-3xl px-6">
            {c.faqHeading && (
              <h2 className="text-3xl md:text-4xl font-black mb-8 tracking-tight">
                {c.faqHeading}
              </h2>
            )}
            <div className="space-y-3">
              {c.faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-black/[0.06] bg-white px-5 py-4"
                >
                  <summary className="cursor-pointer list-none font-black text-[#0A0A0F] flex items-center justify-between gap-3">
                    {f.q}
                    <span className="text-[#6C4CF1] transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[15px] leading-7 text-neutral-800">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Landmark hub (optional) */}
      {c.landmarks && c.landmarks.length > 0 && (
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-black mb-2 tracking-tight">{c.landmarksHeading}</h2>
            {c.landmarksSub && (
              <p className="text-sm text-neutral-800 mb-8">{c.landmarksSub}</p>
            )}
            <div className="grid sm:grid-cols-2 gap-4">
              {c.landmarks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="group flex items-center gap-4 rounded-2xl bg-white border border-black/[0.06] p-5 hover:border-[#6C4CF1]/30 transition-colors"
                >
                  <span className="text-3xl">{l.icon}</span>
                  <div>
                    <p className="font-black text-[#0A0A0F] group-hover:text-[#6C4CF1] transition-colors">
                      {l.name}
                    </p>
                    <p className="text-sm text-neutral-800">{l.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other destinations */}
      <section className="py-16 bg-[#F7F7FB]">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-black mb-6 tracking-tight">{c.otherHeading}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {c.otherCities.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-center gap-4 rounded-2xl bg-white border border-black/[0.06] p-5 hover:border-[#6C4CF1]/30 transition-colors"
              >
                <span className="text-3xl">{l.icon}</span>
                <div>
                  <p className="font-black text-[#0A0A0F] group-hover:text-[#6C4CF1] transition-colors">
                    {l.name}
                  </p>
                  <p className="text-sm text-neutral-800">{l.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" className="py-20 bg-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">{c.ctaTitle}</h2>
          <p className="text-neutral-700 mb-8 leading-7">{c.ctaSub}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="flex items-center gap-3 rounded-2xl bg-[#0A0A0F] px-6 py-3.5 text-white font-bold text-sm hover:bg-black/80 transition-colors"
            >
              <span>▶</span> Google Play
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-2xl bg-[#0A0A0F] px-6 py-3.5 text-white font-bold text-sm hover:bg-black/80 transition-colors"
            >
              <span>📱</span> App Store
            </a>
          </div>
          <p className="mt-6 text-xs text-neutral-700">{c.ctaAvailability}</p>
        </div>
      </section>

      <JsonLdScript data={jsonLd} />

      <MainFooter />
    </main>
  );
}
