import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import CityTours from "@/components/CityTours";
import { cityLabel } from "@/lib/city-labels";
import ImageCredit from "@/components/ImageCredit";
import JsonLdScript from "@/components/JsonLdScript";
import {
  ATTRACTION_LANGS,
  ATTRACTIONS,
  RTL_LANGS,
  getAttraction,
  isAttractionLang,
  allAttractionParams,
  ATTR_HEADINGS,
  ATTR_HUB,
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
  const h = ATTR_HEADINGS[lang];

  // Bu landmark'ın şehrinin tur-rehberi SEO sayfasına iç link (şehir guide'ı varsa).
  // Attraction dilleri (11) ⊃ city-guide dilleri (10, el yok) → el için EN guide'a bağla.
  const cityGuideSlug = `${attraction.guideSlug ?? attraction.citySlug}-tour-guide`;
  const cgLang = isCityGuideLang(lang) ? lang : "en";
  const cityGuide = getCityGuide(cityGuideSlug);
  const cityGuideHref = cityGuide
    ? cgLang === "en"
      ? `/${cityGuideSlug}`
      : `/${cgLang}/${cityGuideSlug}`
    : null;
  // Breadcrumb'ta gösterilecek şehir adı (guide varsa onun lokalize h1'i, yoksa attraction.city).
  const cityCrumbName = cityGuide?.i18n[cgLang]?.h1 ?? attraction.city;
  // Ara breadcrumb seviyesi: şehir guide'ı varsa ona bağla; yoksa (Pamukkale,
  // Göbeklitepe, Sümela, Nemrut, Troy gibi guide'sız mekanlar) Attractions
  // hub'ına bağla — parent hep gerçek ve alakalı olsun (null bırakma).
  const parentCrumb = cityGuideHref
    ? { name: cityCrumbName, href: cityGuideHref }
    : { name: ATTR_HUB[lang].h1, href: `/attractions/${lang}` };

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
        // 3 seviye: VibeGuide › (şehir guide'ı VEYA Attractions hub'ı) › Mekan.
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "VibeGuide", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: parentCrumb.name, item: `${SITE}${parentCrumb.href}` },
          {
            "@type": "ListItem",
            position: 3,
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
      lang={lang}
      className="min-h-screen bg-white text-neutral-900 antialiased"
    >
      <JsonLdScript data={jsonLd} />

      <Navbar />

      {/* Hero */}
      <section className="relative pt-16">
        <div className="relative h-[42vh] min-h-[320px] max-h-[560px] w-full overflow-hidden">
          <Image
            src={attraction.image}
            alt={c.name}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <ImageCredit src={attraction.image} onDark className="absolute bottom-2 right-3 z-[1]" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-5xl px-6 pb-8">
              {/* Görünür breadcrumb — JSON-LD BreadcrumbList ile eşleşir. */}
              <nav aria-label="Breadcrumb" className="mb-3 text-xs text-white/70">
                <Link href="/" className="hover:text-white transition-colors">VibeGuide</Link>
                <span className="mx-1.5" aria-hidden="true">›</span>
                <Link href={parentCrumb.href} className="hover:text-white transition-colors">{parentCrumb.name}</Link>
                <span className="mx-1.5" aria-hidden="true">›</span>
                <span className="text-white/90">{c.name}</span>
              </nav>
              <h1 className="text-4xl md:text-6xl font-display font-normal text-white tracking-[-0.01em]">
                {c.name}
              </h1>
              <p className="mt-2 text-white/85 font-medium">{cityLabel(attraction.city, lang)}</p>
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

      {/* Inline CTA — bilgi trafigini tura baglayan kopru.
          GSC: attraction sayfalari 1.681 gosterim / 6 tiklama aliyor; gelen
          kullanici "nerede/nedir" ariyor ve cevabini alip cikiyor. Sayfanin
          EN ALTINDAKI CTA'ya kimse inmiyor — bu yuzden ilgi en yuksekken,
          intro'nun hemen ardina koyuyoruz. Metinler mevcut ceviri
          alanlarindan geliyor, 22 dilde hazir. */}
      <section className="pb-10">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-2xl border border-neutral-200 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4">
            <p className="flex-1 text-[15px] leading-7 font-semibold text-neutral-900">
              {c.ctaTitle}
            </p>
            <Link
              href={cityGuideHref ?? "/tours"}
              className="shrink-0 inline-flex h-11 items-center justify-center rounded-full bg-[#5B3FD9] px-6 text-sm font-semibold text-white hover:bg-[#4A32B8] transition-colors"
            >
              {c.toursHeading}
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="pb-6">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-display font-normal mb-6 tracking-[-0.01em]">{h.highlights}</h2>
        </div>
        <div className="mx-auto max-w-5xl px-6 grid sm:grid-cols-3 gap-5">
          {c.highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6"
            >
              <h3 className="font-semibold text-neutral-900 mb-1.5">{h.title}</h3>
              <p className="text-sm leading-6 text-neutral-700">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Planning your visit — how to get there / tickets / hours / best time */}
      {c.planningHeading && c.planningParagraphs && c.planningParagraphs.length > 0 && (
        <section className="pb-10">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-display font-normal mb-5 tracking-[-0.01em]">{c.planningHeading}</h2>
            <div className="space-y-4">
              {c.planningParagraphs.map((p, i) => (
                <p key={i} className="text-[16px] leading-7 text-neutral-800">{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

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
              className="inline-flex h-10 items-center gap-2 rounded-full border border-neutral-300 px-5 text-sm font-semibold text-neutral-900 hover:border-neutral-900 transition-colors"
            >
              {c.toursHeading}
            </Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-display font-normal mb-6 tracking-[-0.01em]">{h.faq}</h2>
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {c.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-semibold text-neutral-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-neutral-500 transition-transform group-open:rotate-45" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                </summary>
                <p className="mt-3 text-[16px] leading-7 text-neutral-600">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other landmarks — internal linking (same language).
          Aynı şehirdeki mekanları önceliklendir, sonra diğerleriyle ~6'ya
          tamamla — 27 linklik ayrımsız dökümü yerine alakalı, odaklı bir set. */}
      {(() => {
        const rest = ATTRACTIONS.filter((a) => a.slug !== slug);
        const sameCity = rest.filter((a) => a.citySlug === attraction.citySlug);
        const otherCity = rest.filter((a) => a.citySlug !== attraction.citySlug);
        const others = [...sameCity, ...otherCity].slice(0, 6);
        if (others.length === 0) return null;
        return (
          <section className="pb-4">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-2xl font-display font-normal mb-6 tracking-[-0.01em]">
                {h.more}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/attractions/${lang}/${o.slug}`}
                    className="group flex items-center gap-4 rounded-2xl bg-white border border-neutral-200 p-3 hover:border-neutral-900 transition-colors"
                  >
                    <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
                      <Image src={o.image} alt="" fill sizes="56px" className="object-cover" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-neutral-900 group-hover:text-[#5B3FD9] transition-colors truncate">
                        {o.i18n[lang].name}
                      </span>
                      <span className="block text-xs text-neutral-500 truncate">{cityLabel(o.city, lang)}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* CTA */}
      <section id="download" className="py-20 bg-neutral-50">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-normal mb-4">{c.ctaTitle}</h2>
          <p className="text-neutral-700 mb-8 leading-7">{c.ctaSub}</p>
          <Link
            href="/tours"
            className="inline-flex h-12 items-center rounded-full bg-[#5B3FD9] px-7 text-[15px] font-semibold text-white hover:bg-[#4A32B8] transition-colors"
          >
            {c.toursHeading}
          </Link>
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
