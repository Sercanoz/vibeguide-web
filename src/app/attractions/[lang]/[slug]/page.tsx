import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import CityTours from "@/components/CityTours";
import JsonLdScript from "@/components/JsonLdScript";
import {
  ATTRACTION_LANGS,
  ATTRACTIONS,
  RTL_LANGS,
  getAttraction,
  isAttractionLang,
  allAttractionParams,
  type AttractionLang,
} from "@/lib/attractions";
import { getCityGuide, isCityGuideLang, OG_LOCALE } from "@/lib/cityGuides";

const SITE = "https://www.vibeguideapp.com";
const DEFAULT_LANG: AttractionLang = "en";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return allAttractionParams();
}

// Her dil için kanonik kendi URL'i; hreflang tüm dilleri + x-default'u bağlar.
function buildAlternates(slug: string, lang: AttractionLang) {
  const languages: Record<string, string> = {};
  for (const l of ATTRACTION_LANGS) {
    languages[l] = `${SITE}/attractions/${l}/${slug}`;
  }
  languages["x-default"] = `${SITE}/attractions/${DEFAULT_LANG}/${slug}`;
  return {
    canonical: `${SITE}/attractions/${lang}/${slug}`,
    languages,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const attraction = getAttraction(slug);
  if (!attraction || !isAttractionLang(lang)) return {};
  const c = attraction.i18n[lang];

  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: buildAlternates(slug, lang),
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: `${SITE}/attractions/${lang}/${slug}`,
      siteName: "VibeGuide",
      type: "website",
      locale: OG_LOCALE[lang] ?? "en_US",
      images: [{ url: attraction.image, width: 1200, height: 630, alt: c.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: c.metaTitle,
      description: c.metaDescription,
      images: [attraction.image],
    },
  };
}

export default async function AttractionPage({ params }: Props) {
  const { lang, slug } = await params;
  const attraction = getAttraction(slug);
  if (!attraction || !isAttractionLang(lang)) notFound();

  const c = attraction.i18n[lang];
  const rtl = RTL_LANGS.has(lang);

  // Bu landmark'ın şehrinin tur-rehberi SEO sayfasına iç link (şehir guide'ı varsa).
  // Attraction dilleri (11) ⊃ city-guide dilleri (10, el yok) → el için EN guide'a bağla.
  const cityGuideSlug = `${attraction.citySlug}-tour-guide`;
  const cgLang = isCityGuideLang(lang) ? lang : "en";
  const cityGuideHref = getCityGuide(cityGuideSlug)
    ? cgLang === "en"
      ? `/${cityGuideSlug}`
      : `/${cgLang}/${cityGuideSlug}`
    : null;

  // Yapısal veri — TouristAttraction + FAQPage + BreadcrumbList.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristAttraction",
        name: c.name,
        description: c.metaDescription,
        image: attraction.image,
        url: `${SITE}/attractions/${lang}/${slug}`,
        geo: {
          "@type": "GeoCoordinates",
          latitude: attraction.lat,
          longitude: attraction.lng,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: attraction.city,
          addressCountry: "TR",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: c.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "VibeGuide", item: SITE },
          {
            "@type": "ListItem",
            position: 2,
            name: c.name,
            item: `${SITE}/attractions/${lang}/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <main
      dir={rtl ? "rtl" : "ltr"}
      className="min-h-screen bg-white text-[#0A0A0F] antialiased"
    >
      <JsonLdScript data={jsonLd} />

      <Navbar />

      {/* Hero */}
      <section className="relative pt-16">
        <div className="relative h-[42vh] min-h-[320px] w-full overflow-hidden">
          <Image
            src={attraction.image}
            alt={c.name}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-5xl px-6 pb-8">
              <span className="text-4xl">{attraction.emoji}</span>
              <h1 className="mt-2 text-4xl md:text-6xl font-black text-white tracking-tight">
                {c.name}
              </h1>
              <p className="mt-2 text-white/80 font-semibold">{attraction.city}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-6 space-y-5">
          {c.intro.map((p, i) => (
            <p key={i} className="text-[17px] leading-8 text-neutral-800">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="pb-6">
        <div className="mx-auto max-w-5xl px-6 grid sm:grid-cols-3 gap-5">
          {c.highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border border-black/[0.06] bg-[#F7F7FB] p-6"
            >
              <h3 className="font-black text-[#0A0A0F] mb-1.5">{h.title}</h3>
              <p className="text-sm leading-6 text-neutral-700">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tours for this city */}
      <CityTours
        citySlug={attraction.citySlug}
        cityName={attraction.city}
        heading={c.toursHeading}
        locale={lang}
      />

      {/* Internal link to the city tour-guide SEO page (keyword-rich anchor) */}
      {cityGuideHref && (
        <section className="pb-2">
          <div className="mx-auto max-w-5xl px-6">
            <Link
              href={cityGuideHref}
              className="inline-flex items-center gap-2 rounded-full border border-[#6C4CF1]/30 bg-[#6C4CF1]/[0.04] px-5 py-2.5 text-sm font-bold text-[#6C4CF1] hover:bg-[#6C4CF1]/[0.08] transition-colors"
            >
              {c.toursHeading} →
            </Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
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
                <p className="mt-3 text-[15px] leading-7 text-neutral-800">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other landmarks — internal linking (same language) */}
      {(() => {
        const others = ATTRACTIONS.filter((a) => a.slug !== slug);
        if (others.length === 0) return null;
        return (
          <section className="pb-4">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-2xl font-black mb-6 tracking-tight">
                {c.toursHeading}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/attractions/${lang}/${o.slug}`}
                    className="group flex items-center gap-4 rounded-2xl bg-white border border-black/[0.06] p-5 hover:border-[#6C4CF1]/30 transition-colors"
                  >
                    <span className="text-3xl">{o.emoji}</span>
                    <span className="font-black text-[#0A0A0F] group-hover:text-[#6C4CF1] transition-colors">
                      {o.i18n[lang].name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* CTA */}
      <section id="download" className="py-20 bg-[#F7F7FB]">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">{c.ctaTitle}</h2>
          <p className="text-neutral-700 mb-8 leading-7">{c.ctaSub}</p>
          <Link
            href="/tours"
            className="inline-block rounded-full bg-gradient-to-r from-[#6C4CF1] via-[#8B5CF6] to-[#EC4899] px-8 py-3.5 text-sm font-bold text-white"
            style={{ boxShadow: "0 4px 20px rgba(108,76,241,0.35)" }}
          >
            {c.toursHeading} →
          </Link>
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
