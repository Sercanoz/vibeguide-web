import { DESTINATIONS, cityGuideHref } from "@/lib/destinations";

// Kullanıcı menüden dil değiştirdiğinde, içeriği URL diline bağlı sayfalarda
// (şehir rehberi, blog, gezilecek yerler) aynı sayfanın yeni dildeki sürümüne geç.
// Aksi halde menü yeni dilde, içerik eski dilde kalıyordu (karışık görünüm).
//
// NOT: blog.ts / attractions.ts / cityGuides.ts 2-3 MB — client'a import ETME.
// Üç içerik türü de aynı 21 dili destekliyor (BLOG_LANGS = ATTRACTION_LANGS = CITY_GUIDE_LANGS).
const CONTENT_LANGS = new Set([
  "en", "de", "es", "fr", "it", "ar", "ru", "tr", "pl", "nl", "pt", "ja", "ko", "el", "uk", "ro", "bg", "sr", "hr", "zh", "id",
]);
const CITY_SLUGS = new Set(DESTINATIONS.map((d) => d.slug));

/** Yeni dildeki karşılık gelen yol; sayfa dil-bağımlı değilse veya dil yoksa null. */
export function localizedContentPath(pathname: string, locale: string): string | null {
  if (!CONTENT_LANGS.has(locale)) return null;

  // /blog/<lang>[/<slug>] ve /attractions/<lang>[/<slug>]
  const m = pathname.match(/^\/(blog|attractions)\/([a-z]{2})(\/.*)?$/);
  if (m) return `/${m[1]}/${locale}${m[3] ?? ""}`;

  // /<slug> (EN) veya /<lang>/<slug>
  const parts = pathname.split("/").filter(Boolean);
  const slug = parts.length === 1 ? parts[0] : parts.length === 2 && CONTENT_LANGS.has(parts[0]) ? parts[1] : null;
  if (slug && CITY_SLUGS.has(slug)) return cityGuideHref(slug, locale);

  return null;
}
