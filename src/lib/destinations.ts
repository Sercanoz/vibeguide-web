import { CITY_GUIDE_LANGS } from "@/lib/cityGuides";

// Tüm şehir rehberi sayfaları — Navbar + Footer iç linkleme için tek kaynak
// (lightweight liste; ağır CITY_GUIDES içeriğini client bundle'a sokmaz).
export const DESTINATIONS: { slug: string; name: string; emoji: string }[] = [
  { slug: "istanbul-tour-guide", name: "Istanbul", emoji: "🕌" },
  { slug: "cappadocia-tour-guide", name: "Cappadocia", emoji: "🎈" },
  { slug: "ephesus-tour-guide", name: "Ephesus", emoji: "🏛️" },
  { slug: "antalya-tour-guide", name: "Antalya", emoji: "🏖️" },
  { slug: "izmir-tour-guide", name: "İzmir", emoji: "🌊" },
  { slug: "bodrum-tour-guide", name: "Bodrum", emoji: "⛵" },
  { slug: "kusadasi-tour-guide", name: "Kuşadası", emoji: "⚓" },
  { slug: "marmaris-tour-guide", name: "Marmaris", emoji: "🐢" },
  { slug: "fethiye-tour-guide", name: "Fethiye", emoji: "🪂" },
  { slug: "side-tour-guide", name: "Side", emoji: "🏺" },
];

// Şehir rehberi sayfası sadece CITY_GUIDE_LANGS dillerinde var; başka dilde
// kullanıcı için EN köke düş (yoksa 404). en → /slug, diğer → /<lang>/slug.
export function cityGuideHref(slug: string, locale: string): string {
  const lang = (CITY_GUIDE_LANGS as readonly string[]).includes(locale) ? locale : "en";
  return lang === "en" ? `/${slug}` : `/${lang}/${slug}`;
}
