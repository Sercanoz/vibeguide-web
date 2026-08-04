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

const SITE = "https://www.vibeguideapp.com";
const DEFAULT_LANG: BlogLang = "en";

type Props = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return BLOG_LANGS.map((lang) => ({ lang }));
}
export const dynamicParams = false;

function hubUrl(lang: BlogLang): string {
  return `${SITE}/blog/${lang}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isBlogLang(lang)) return {};
  const t = BLOG_HUB[lang];
  const languages: Record<string, string> = {};
  for (const l of BLOG_LANGS) languages[l] = hubUrl(l);
  languages["x-default"] = hubUrl(DEFAULT_LANG);
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: { canonical: hubUrl(lang), languages },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      url: hubUrl(lang),
      siteName: "VibeGuide",
      type: "website",
      locale: BLOG_OG_LOCALE[lang] ?? "en_US",
    },
  };
}

export default async function BlogHubPage({ params }: Props) {
  const { lang } = await params;
  if (!isBlogLang(lang)) notFound();
  const t = BLOG_HUB[lang];
  const cat = BLOG_CATEGORY_LABELS[lang];
  const rtl = BLOG_RTL_LANGS.has(lang);

  const posts = BLOG_POSTS.map((p) => ({ post: p, c: p.i18n[lang] }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        name: t.h1,
        description: t.metaDescription,
        url: hubUrl(lang),
        blogPost: posts.map(({ post, c }) => ({
          "@type": "BlogPosting",
          headline: c.title,
          url: `${SITE}/blog/${lang}/${post.slug}`,
          datePublished: post.publishDate,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "VibeGuide", item: SITE },
          { "@type": "ListItem", position: 2, name: t.h1, item: hubUrl(lang) },
        ],
      },
    ],
  };

  const postHref = (slug: string) => `/blog/${lang}/${slug}`;

  return (
    <main dir={rtl ? "rtl" : "ltr"} className="min-h-screen bg-white text-[#0A0A0F] antialiased">
      <JsonLdScript data={jsonLd} />
      <Navbar />

      <section className="pt-28 pb-8">
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

      <section className="pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map(({ post, c }) => (
              <Link
                key={post.slug}
                href={postHref(post.slug)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white hover:border-[#6C4CF1]/30 transition-colors"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <Image
                    src={post.heroImage}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#6C4CF1]">
                    {cat[post.category]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h2 className="text-lg font-black leading-snug group-hover:text-[#6C4CF1] transition-colors">{c.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-neutral-700">{c.excerpt}</p>
                  <span className="mt-4 text-sm font-bold text-[#6C4CF1]">{t.readMore} →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
