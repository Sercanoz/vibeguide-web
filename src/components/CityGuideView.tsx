import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import CityTours from "@/components/CityTours";
import type { CityGuide, CityGuideLang } from "@/lib/cityGuides";
import { RTL_CITY_LANGS, CITY_GUIDES } from "@/lib/cityGuides";
import { blogPostsForCity, BLOG_LANGS } from "@/lib/blog";
import type { BlogLang } from "@/lib/blog";
import JsonLdScript from "@/components/JsonLdScript";
import CityLangNotice from "@/components/CityLangNotice";
import ImageCredit from "@/components/ImageCredit";

const SITE = "https://www.vibeguideapp.com";

// "İlgili yazılar" başlığı — eskiden sabit İngilizce "Travel guides" idi.
const TRAVEL_GUIDES: Record<string, string> = {
  en: "Travel guides", de: "Reiseratgeber", es: "Guías de viaje", fr: "Guides de voyage", it: "Guide di viaggio",
  ar: "أدلة السفر", ru: "Путеводители", tr: "Gezi rehberleri", pl: "Przewodniki", nl: "Reisgidsen",
  pt: "Guias de viagem", ja: "旅行ガイド", ko: "여행 가이드", el: "Ταξιδιωτικοί οδηγοί", uk: "Путівники",
  ro: "Ghiduri de călătorie", bg: "Пътеводители", sr: "Туристички водичи", hr: "Putni vodiči", zh: "旅行指南", id: "Panduan perjalanan",
};

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

  // SEO iç-link: bazı diller (el/uk/ro/bg/sr/hr/zh/id) landmarks taşımıyor →
  // o dillerde attraction'lara iç link kopuyor. EN landmarks'ı fallback ver,
  // href'lerin locale'ini bu dile çevir (attraction sayfaları her dilde var).
  const enC = guide.i18n.en;
  const landmarks =
    c.landmarks && c.landmarks.length > 0
      ? c.landmarks
      : (enC?.landmarks ?? []).map((l) => ({
          ...l,
          href: l.href?.replace(/^\/attractions\/en\//, `/attractions/${lang}/`),
        }));
  const landmarksHeading = c.landmarksHeading ?? enC?.landmarksHeading;
  const landmarksSub = c.landmarksSub ?? enC?.landmarksSub;

  // SEO geri-link: bu şehre ilgili blog yazıları (blog eskiden tek yönlü besleniyordu).
  const blogLang: BlogLang = (BLOG_LANGS as readonly string[]).includes(lang)
    ? (lang as BlogLang)
    : "en";
  const relatedBlog = blogPostsForCity(guide.slug, 3).map((p) => ({
    slug: p.slug,
    title: (p.i18n[blogLang] ?? p.i18n.en).title,
    href: `/blog/${blogLang}/${p.slug}`,
  }));

  const graph: object[] = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "VibeGuide", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: c.h1, item: url },
      ],
    },
    {
      // Şehri bir turistik destinasyon varlığı olarak tanımla (mekanlar zaten
      // TouristAttraction veriyor; şehir guide'ları geride kalıyordu).
      // aggregateRating EKLENMEZ — sayfada görünür review yok (Google politikası).
      "@type": "TouristDestination",
      name: c.h1,
      description: c.metaDescription,
      image: guide.heroImage,
      url,
      address: {
        "@type": "PostalAddress",
        addressLocality: guide.cityName,
        addressCountry: "TR",
      },
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

  // Veri metinlerindeki emoji ve ok işaretlerini temizle (sade görünüm).
  const clean = (s: string) => s.replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, "").replace(/\s*[→←]\s*$/, "").trim();
  // Güven rozetleri: puan iddiası içerenleri ("⭐ 4.9 avg rating") GÖSTERME — sayfada
  // doğrulanabilir yorum verisi yok; sabit puan yanıltıcı (tüketici mevzuatı).
  const trustBadges = c.trustBadges.filter((t) => !/\d[.,]\d/.test(t)).map(clean);
  const toursHref = `/tours?city=${encodeURIComponent(guide.citySlug)}`;
  const H2 = "font-display text-3xl md:text-[40px] font-normal leading-tight tracking-[-0.01em] text-neutral-900";
  const KICKER = "text-sm font-medium text-neutral-500";
  const arrow = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-900 rtl:rotate-180" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
  );

  return (
    <main
      dir={rtl ? "rtl" : "ltr"}
      // lang: içerik dili sayfanın URL dilidir (UI dili değil). CSS `uppercase`
      // TR kurallarıyla "I"→"İ" yapmasın diye bu öğede doğru lang şart.
      lang={lang}
      className="min-h-screen bg-white text-neutral-900 antialiased"
    >
      <Navbar />
      <CityLangNotice pageLang={lang} available={Object.keys(guide.i18n)} slug={guide.slug} />

      {/* Hero — tam genişlik foto, ana sayfa ile aynı dil */}
      <section className="relative overflow-hidden text-white">
        <Image src={guide.heroImage} alt={c.h1} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <ImageCredit src={guide.heroImage} onDark className="absolute bottom-2 right-3 z-[1]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-28 md:px-6 md:pb-28 md:pt-40">
          {/* Görünür breadcrumb — JSON-LD BreadcrumbList ile eşleşir. */}
          <nav aria-label="Breadcrumb" className="mb-5 text-sm text-white/70">
            <Link href="/" className="hover:text-white">VibeGuide</Link>
            <span className="mx-1.5" aria-hidden="true">/</span>
            <span className="text-white">{c.h1}</span>
          </nav>
          <p className="text-sm font-medium text-white/80">{c.region}</p>
          <h1 className="mt-3 max-w-3xl font-display text-[40px] font-normal leading-[1.05] tracking-[-0.02em] md:text-[68px]">
            {c.h1}
            <span className="block italic text-white/90">{c.h1Accent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-white/85 md:text-lg">{c.heroLead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={toursHref} className="inline-flex h-12 items-center rounded-full bg-[#5B3FD9] px-7 text-[15px] font-semibold text-white hover:bg-[#4A32B8]">
              {clean(c.ctaPrimary)}
            </Link>
            <a href="#modes" className="inline-flex h-12 items-center rounded-full border border-white/40 px-7 text-[15px] font-semibold text-white hover:bg-white/10">
              {clean(c.ctaSecondary)}
            </a>
          </div>
        </div>
      </section>

      {/* Öne çıkanlar */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className={KICKER}>{c.highlightsKicker}</p>
          <h2 className={`${H2} mt-2`}>{c.highlightsHeading}</h2>
          <ol className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.highlights.map((h, i) => (
              <li key={h.name} className="border-t border-neutral-200 pt-5">
                <span className="font-display text-lg text-neutral-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-lg font-semibold">{h.name}</h3>
                <p className="mt-1.5 leading-7 text-neutral-600">{h.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gerçek turlar */}
      <CityTours citySlug={guide.citySlug} cityName={guide.cityName} locale={lang} />

      {/* SEO içerik */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className={H2}>{c.seoHeading}</h2>
          <div className="mt-6 space-y-5 text-[17px] leading-8 text-neutral-700 [&_strong]:font-semibold [&_strong]:text-neutral-900 [&_a]:underline [&_a]:underline-offset-4">
            {c.seoParagraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>
        </div>
      </section>

      {/* 3 yol */}
      <section id="modes" className="scroll-mt-20 bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className={KICKER}>{c.modesKicker}</p>
          <h2 className={`${H2} mt-2`}>{c.modesHeading}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {c.modes.map((m) => (
              <div key={m.tag} className="rounded-2xl border border-neutral-200 bg-white p-7">
                <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{m.tag}</p>
                <h3 className="mt-3 text-xl font-semibold">{m.title}</h3>
                <p className="mt-2 leading-7 text-neutral-600">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Güven */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_1fr] md:items-center md:px-6">
          <div>
            <h2 className={H2}>{c.trustHeading}</h2>
            <p className="mt-4 max-w-lg leading-7 text-neutral-600">{c.trustText}</p>
          </div>
          {trustBadges.length > 0 && (
            <ul className="grid gap-3 sm:grid-cols-2">
              {trustBadges.map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3.5 text-[15px] font-medium">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-neutral-900" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* SSS */}
      {c.faqs && c.faqs.length > 0 && (
        <section className="border-t border-neutral-200 py-16 md:py-24">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            {c.faqHeading && <h2 className={H2}>{c.faqHeading}</h2>}
            <div className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
              {c.faqs.map((f) => (
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
      )}

      {/* Gezilecek yerler — attraction iç linkleri (eksik dilde EN fallback) */}
      {landmarks.length > 0 && (
        <section className="bg-neutral-50 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className={H2}>{landmarksHeading}</h2>
            {landmarksSub && <p className="mt-2 text-neutral-600">{landmarksSub}</p>}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {landmarks.map((l) =>
                l.href ? (
                  <Link key={l.name} href={l.href}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-200 bg-white px-5 py-4 transition-colors hover:border-neutral-900">
                    <div className="min-w-0">
                      <p className="font-semibold">{l.name}</p>
                      <p className="mt-0.5 text-sm text-neutral-600">{l.desc}</p>
                    </div>
                    {arrow}
                  </Link>
                ) : (
                  <div key={l.name} className="rounded-xl border border-neutral-200 bg-white px-5 py-4">
                    <p className="font-semibold">{l.name}</p>
                    <p className="mt-0.5 text-sm text-neutral-600">{l.desc}</p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* İlgili yazılar — blog geri-link (SEO iç link) */}
      {relatedBlog.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <h2 className={H2}>{`${guide.cityName} — ${TRAVEL_GUIDES[lang] ?? TRAVEL_GUIDES.en}`}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {relatedBlog.map((b) => (
                <Link key={b.slug} href={b.href} className="group rounded-xl border border-neutral-200 p-5 transition-colors hover:border-neutral-900">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">Blog</p>
                  <p className="mt-2 font-semibold leading-snug group-hover:underline">{b.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Diğer destinasyonlar */}
      <section className="border-t border-neutral-200 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className={H2}>{c.otherHeading}</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {c.otherCities.map((l) => (
              <Link key={l.name} href={l.href ?? "/tours"}
                className="group flex items-center justify-between gap-4 rounded-xl border border-neutral-200 px-5 py-4 transition-colors hover:border-neutral-900">
                <div className="min-w-0">
                  <p className="font-semibold">{l.name}</p>
                  <p className="mt-0.5 text-sm text-neutral-600">{l.desc}</p>
                </div>
                {arrow}
              </Link>
            ))}
          </div>

          {/* Tüm diğer şehir rehberlerine otomatik iç link — editoryal otherCities'i
             (2 link) tamamlar, tarihi üçgeni sahile ve Fethiye/Side'ye bağlar.
             İsimler her guide'ın kendi lokalize h1'inden gelir (çeviri gerektirmez). */}
          <div className="mt-6 flex flex-wrap gap-2">
            {CITY_GUIDES.filter((g) => g.slug !== guide.slug).map((g) => {
              const gc = g.i18n[lang] ?? g.i18n.en;
              return (
                <Link key={g.slug} href={`${langPrefix(lang)}/${g.slug}`}
                  className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900">
                  {gc.h1}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Kapanış CTA */}
      <section id="download" className="bg-neutral-50 py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-4 text-center md:px-6">
          <h2 className={H2}>{c.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-neutral-600">{c.ctaSub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={toursHref} className="inline-flex h-12 items-center rounded-full bg-[#5B3FD9] px-7 text-[15px] font-semibold text-white hover:bg-[#4A32B8]">
              {clean(c.ctaPrimary)}
            </Link>
          </div>
          {/* Store listeleri yayına girince gerçek URL'lerle değiştir. */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 opacity-80">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/app-store-badge.svg" alt="Coming soon on the App Store" className="h-11 w-auto" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/google-play-badge.svg" alt="Coming soon on Google Play" className="h-11 w-auto" />
          </div>
          <p className="mt-4 text-sm text-neutral-500">{c.ctaAvailability}</p>
        </div>
      </section>

      <JsonLdScript data={jsonLd} />

      <MainFooter />
    </main>
  );
}
