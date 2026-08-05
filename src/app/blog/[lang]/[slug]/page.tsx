import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import JsonLdScript from "@/components/JsonLdScript";
import {
  BLOG_POSTS,
  BLOG_LANGS,
  BLOG_HUB,
  BLOG_CATEGORY_LABELS,
  BLOG_OG_LOCALE,
  BLOG_RTL_LANGS,
  isBlogLang,
  type BlogLang,
} from "@/lib/blog";
import { getCityGuide, isCityGuideLang } from "@/lib/cityGuides";
import { ATTRACTIONS, isAttractionLang } from "@/lib/attractions";

const SITE = "https://www.vibeguideapp.com";
const DEFAULT_LANG: BlogLang = "en";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return BLOG_LANGS.flatMap((lang) => BLOG_POSTS.map((p) => ({ lang, slug: p.slug })));
}
export const dynamicParams = false;

function postUrl(slug: string, lang: BlogLang): string {
  return `${SITE}/blog/${lang}/${slug}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isBlogLang(lang)) return {};
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const c = post.i18n[lang];
  const languages: Record<string, string> = {};
  for (const l of BLOG_LANGS) languages[l] = postUrl(slug, l);
  languages["x-default"] = postUrl(slug, DEFAULT_LANG);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: postUrl(slug, lang), languages },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      url: postUrl(slug, lang),
      siteName: "VibeGuide",
      type: "article",
      locale: BLOG_OG_LOCALE[lang] ?? "en_US",
      images: [{ url: post.heroImage }],
    },
  };
}

// Localize a city-guide link. slug is language-independent ("istanbul-tour-guide").
function cityGuideLink(slug: string, lang: BlogLang): { href: string; label: string } | null {
  const g = getCityGuide(slug);
  if (!g) return null;
  const cgLang = isCityGuideLang(lang) ? lang : "en";
  const href = cgLang === "en" ? `/${slug}` : `/${cgLang}/${slug}`;
  return { href, label: g.i18n[cgLang].h1 };
}

// Localize an attraction link. slug is language-independent ("hagia-sophia").
function attractionLink(slug: string, lang: BlogLang): { href: string; label: string } | null {
  const a = ATTRACTIONS.find((x) => x.slug === slug);
  if (!a) return null;
  const aLang = isAttractionLang(lang) ? lang : "en";
  return { href: `/attractions/${aLang}/${slug}`, label: a.i18n[aLang].name };
}

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isBlogLang(lang)) notFound();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  const c = post.i18n[lang];
  const hub = BLOG_HUB[lang];
  const cat = BLOG_CATEGORY_LABELS[lang];
  const rtl = BLOG_RTL_LANGS.has(lang);

  const related = [
    ...post.relatedCityGuides.map((s) => cityGuideLink(s, lang)),
    ...post.relatedAttractions.map((s) => attractionLink(s, lang)),
  ].filter((x): x is { href: string; label: string } => x !== null);

  // Blog-to-blog (silo) links — each related post's own localized title.
  const relatedReads = (post.relatedPosts ?? [])
    .map((s) => {
      const rp = BLOG_POSTS.find((p) => p.slug === s);
      return rp ? { href: `/blog/${lang}/${rp.slug}`, label: rp.i18n[lang].title } : null;
    })
    .filter((x): x is { href: string; label: string } => x !== null);

  const blogHubHref = `/blog/${lang}`;

  const graph: object[] = [
    {
      "@type": "BlogPosting",
      headline: c.title,
      description: c.metaDescription,
      image: post.heroImage,
      datePublished: post.publishDate,
      dateModified: post.publishDate,
      inLanguage: lang,
      // Global #org node (JsonLd.tsx, her sayfada render) logo taşır — publisher'ı
      // ona bağla ki BlogPosting Article rich-result için "logo" alanını sağlasın.
      author: { "@id": `${SITE}/#org` },
      publisher: { "@id": `${SITE}/#org` },
      mainEntityOfPage: postUrl(slug, lang),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "VibeGuide", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: hub.h1, item: `${SITE}/blog/${lang}` },
        { "@type": "ListItem", position: 3, name: c.title, item: postUrl(slug, lang) },
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
    <main dir={rtl ? "rtl" : "ltr"} className="min-h-screen bg-white text-[#0A0A0F] antialiased">
      <JsonLdScript data={jsonLd} />
      <Navbar />

      <article className="pt-28 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-neutral-500">
            <Link href="/" className="hover:text-black transition-colors">VibeGuide</Link>
            <span className="mx-1.5" aria-hidden="true">›</span>
            <Link href={blogHubHref} className="hover:text-black transition-colors">{hub.h1}</Link>
            <span className="mx-1.5" aria-hidden="true">›</span>
            <span className="text-neutral-800">{cat[post.category]}</span>
          </nav>

          <span className="inline-block rounded-full bg-[#6C4CF1]/[0.08] px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#6C4CF1]">
            {cat[post.category]}
          </span>
          <h1 className="mt-4 text-3xl md:text-5xl font-black leading-[1.05] tracking-tight">{c.title}</h1>

          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl bg-neutral-100">
            <Image src={post.heroImage} alt={c.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
          </div>

          <div className="mt-10 space-y-5 text-[17px] leading-8 text-neutral-800">
            {c.intro.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}
          </div>

          {c.sections.map((s, i) => (
            <section key={i} className="mt-12">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">{s.heading}</h2>
              <div className="mt-4 space-y-5 text-[17px] leading-8 text-neutral-800">
                {s.paragraphs.map((p, j) => (
                  <p key={j} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </section>
          ))}

          {c.faqs && c.faqs.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl md:text-3xl font-black tracking-tight">{c.faqHeading ?? "FAQ"}</h2>
              <div className="mt-6 divide-y divide-black/[0.06] border-y border-black/[0.06]">
                {c.faqs.map((f, i) => (
                  <details key={i} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                      {f.q}
                      <span className="text-[#6C4CF1] transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                    </summary>
                    <p className="mt-3 text-[16px] leading-7 text-neutral-700">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-black tracking-tight">{c.relatedHeading}</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold text-[#0A0A0F] hover:border-[#6C4CF1] hover:text-[#6C4CF1] transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Related reads — blog-to-blog silo links (clarifies intent between
             overlapping posts, keeps link equity flowing horizontally). */}
          {relatedReads.length > 0 && (
            <section className="mt-14">
              <h2 className="text-xl font-black tracking-tight">{hub.h1}</h2>
              <div className="mt-5 grid sm:grid-cols-3 gap-4">
                {relatedReads.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="rounded-2xl border border-black/[0.08] bg-white p-5 text-sm font-semibold leading-6 text-[#0A0A0F] hover:border-[#6C4CF1]/40 hover:text-[#6C4CF1] transition-colors"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="mt-16 rounded-3xl bg-[#F7F7FB] border border-black/[0.05] p-8 text-center">
            <h2 className="text-2xl font-black tracking-tight">{c.ctaTitle}</h2>
            <p className="mt-2 text-neutral-700">{c.ctaSub}</p>
          </section>
        </div>
      </article>

      <MainFooter />
    </main>
  );
}
