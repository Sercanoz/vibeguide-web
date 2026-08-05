import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import JsonLdScript from "@/components/JsonLdScript";
import {
  ATTRACTIONS,
  ATTRACTION_LANGS,
  ATTR_HUB,
  RTL_LANGS,
  isAttractionLang,
  type AttractionLang,
} from "@/lib/attractions";
import { getCityGuide, isCityGuideLang, OG_LOCALE } from "@/lib/cityGuides";

const SITE = "https://www.vibeguideapp.com";
const DEFAULT_LANG: AttractionLang = "en";

type Props = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return ATTRACTION_LANGS.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isAttractionLang(lang)) return {};
  const t = ATTR_HUB[lang];
  const languages: Record<string, string> = {};
  for (const l of ATTRACTION_LANGS) languages[l] = `${SITE}/attractions/${l}`;
  languages["x-default"] = `${SITE}/attractions/${DEFAULT_LANG}`;
  return {
    // absolute: ATTR_HUB.metaTitle zaten tam başlık — root template'in
    // "· VibeGuide" ekini ekletme (bazı dillerde 60 karakteri aşıyordu).
    title: { absolute: t.metaTitle },
    description: t.metaDescription,
    alternates: { canonical: `${SITE}/attractions/${lang}`, languages },
    openGraph: { title: t.metaTitle, description: t.metaDescription, url: `${SITE}/attractions/${lang}`, siteName: "VibeGuide", type: "website", locale: OG_LOCALE[lang] ?? "en_US" },
  };
}

// Şehir guide href (varsa) — attraction'ın guideSlug/citySlug'ından.
function guideHref(citySlug: string, lang: AttractionLang): string | null {
  const cgLang = isCityGuideLang(lang) ? lang : "en";
  const slug = `${citySlug}-tour-guide`;
  if (!getCityGuide(slug)) return null;
  return cgLang === "en" ? `/${slug}` : `/${cgLang}/${slug}`;
}

export default async function AttractionsHubPage({ params }: Props) {
  const { lang } = await params;
  if (!isAttractionLang(lang)) notFound();
  const t = ATTR_HUB[lang];
  const rtl = RTL_LANGS.has(lang);

  // Şehre göre grupla (ATTRACTIONS sırasını koru).
  const groups: { city: string; citySlug: string; items: typeof ATTRACTIONS }[] = [];
  for (const a of ATTRACTIONS) {
    let g = groups.find((x) => x.city === a.city);
    if (!g) { g = { city: a.city, citySlug: a.guideSlug ?? a.citySlug, items: [] }; groups.push(g); }
    g.items.push(a);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: t.h1,
        description: t.metaDescription,
        url: `${SITE}/attractions/${lang}`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: ATTRACTIONS.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE}/attractions/${lang}/${a.slug}`,
            name: a.i18n[lang].name,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "VibeGuide", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: t.h1, item: `${SITE}/attractions/${lang}` },
        ],
      },
    ],
  };

  return (
    <main dir={rtl ? "rtl" : "ltr"} className="min-h-screen bg-white text-[#0A0A0F] antialiased">
      <JsonLdScript data={jsonLd} />
      <Navbar />

      <section className="pt-28 pb-10">
        <div className="mx-auto max-w-5xl px-6">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors">VibeGuide</Link>
            <span className="mx-1.5" aria-hidden="true">›</span>
            <span className="text-neutral-800">{t.h1}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">{t.h1}</h1>
          <p className="mt-4 max-w-2xl text-[17px] leading-8 text-neutral-700">{t.intro}</p>
        </div>
      </section>

      {groups.map((g) => {
        const href = guideHref(g.citySlug, lang);
        return (
          <section key={g.city} className="pb-10">
            <div className="mx-auto max-w-5xl px-6">
              <h2 className="text-xl font-black mb-5 tracking-tight">
                {href ? (
                  <Link href={href} className="hover:text-[#6C4CF1] transition-colors">{g.city}</Link>
                ) : (
                  g.city
                )}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {g.items.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/attractions/${lang}/${a.slug}`}
                    className="group flex items-center gap-4 rounded-2xl bg-white border border-black/[0.06] p-4 hover:border-[#6C4CF1]/30 transition-colors"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl">
                      <Image src={a.image} alt={a.i18n[lang].name} fill sizes="56px" className="object-cover" />
                    </div>
                    <span className="font-black text-[#0A0A0F] group-hover:text-[#6C4CF1] transition-colors leading-tight">
                      {a.i18n[lang].name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <div className="pb-8" />
      <MainFooter />
    </main>
  );
}
