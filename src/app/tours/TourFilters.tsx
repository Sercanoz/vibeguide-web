"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import { languageByCode, parseLanguageCodes } from "@/lib/languages";
import TourCard, { type TourCardData } from "@/components/TourCard";
import { useCurrency } from "@/components/CurrencyProvider";

// /tours katalog filtreleri — tamamen client-side (katalog küçük, tek istekte geliyor).
// Arama + şehir + süre + fiyat + dil + sıralama. ?city= ve ?category= query'si
// ana sayfa/şehir sayfalarından ön seçim için okunur.
//
// NOT: Eskiden yorumu olmayan turlara id'den türetilmiş sahte puan basılıyordu
// ("4.9 (211)"). Kaldırıldı — tüketici mevzuatı açısından yanıltıcı; kart artık
// yalnız gerçek puanı gösterir, yoksa "Yeni deneyim".

interface Tour extends TourCardData {
  summary: string;
  category: string;
  languagesOffered?: string;
  badges?: string;
  provinceSlug?: string | null;
}

type DurationKey = "all" | "short" | "half" | "full";
type PriceKey = "all" | "p1" | "p2" | "p3";
type SortKey = "recommended" | "priceAsc" | "priceDesc" | "rating" | "duration";

const COPY: Record<string, {
  search: string; allCities: string; anyDuration: string; short: string; half: string; full: string;
  anyPrice: string; anyLanguage: string; sort: string; recommended: string; priceAsc: string; priceDesc: string;
  rating: string; durationSort: string; results: (n: number) => string; clear: string; noMatch: string; noMatchSub: string;
  city: string; duration: string; price: string; language: string;
}> = {
  en: {
    search: "Search tours", allCities: "All destinations", anyDuration: "Any duration", short: "Up to 3 hours",
    half: "3–6 hours", full: "Full day (6h+)", anyPrice: "Any price", anyLanguage: "Any language",
    sort: "Sort by", recommended: "Recommended", priceAsc: "Price: low to high", priceDesc: "Price: high to low",
    rating: "Top rated", durationSort: "Shortest first", results: (n) => `${n} ${n === 1 ? "experience" : "experiences"}`,
    clear: "Clear filters", noMatch: "No tours match these filters", noMatchSub: "Try another destination or remove a filter.",
    city: "Destination", duration: "Duration", price: "Price", language: "Language",
  },
  tr: {
    search: "Tur ara", allCities: "Tüm destinasyonlar", anyDuration: "Tüm süreler", short: "3 saate kadar",
    half: "3–6 saat", full: "Tam gün (6s+)", anyPrice: "Tüm fiyatlar", anyLanguage: "Tüm diller",
    sort: "Sırala", recommended: "Önerilen", priceAsc: "Fiyat: düşükten yükseğe", priceDesc: "Fiyat: yüksekten düşüğe",
    rating: "En yüksek puan", durationSort: "En kısa önce", results: (n) => `${n} deneyim`,
    clear: "Filtreleri temizle", noMatch: "Bu filtrelere uyan tur yok", noMatchSub: "Başka bir destinasyon dene ya da bir filtreyi kaldır.",
    city: "Destinasyon", duration: "Süre", price: "Fiyat", language: "Dil",
  },
};

function matchesDuration(min: number, k: DurationKey) {
  if (k === "short") return min <= 180;
  if (k === "half") return min > 180 && min < 360;
  if (k === "full") return min >= 360;
  return true;
}

/** Fiyat kovaları katalogdaki fiyatlardan üretilir (para birimi karışık olabilir → tercile böl). */
function priceBuckets(prices: number[]): [number, number] {
  const s = [...prices].sort((a, b) => a - b);
  if (s.length < 3) return [Infinity, Infinity];
  return [s[Math.floor(s.length / 3)], s[Math.floor((2 * s.length) / 3)]];
}

export default function TourFilters({ tours }: { tours: Tour[] }) {
  const { locale } = useT();
  const tt = getToursT(locale);
  const c = COPY[locale] ?? COPY.en;
  const searchParams = useSearchParams();
  const { display } = useCurrency();
  // Fiyat filtresi yalnız tek para birimli katalogda anlamlı.
  const oneCurrency = new Set(tours.map((t) => t.currency)).size === 1;

  const cities = useMemo(() => Array.from(new Set(tours.map((t) => t.city))).sort((a, b) => a.localeCompare(b)), [tours]);
  const langs = useMemo(() => {
    const set = new Set<string>();
    tours.forEach((t) => parseLanguageCodes(t.languagesOffered).forEach((l) => set.add(l)));
    return Array.from(set).sort();
  }, [tours]);
  const [p1, p2] = useMemo(() => priceBuckets(tours.map((t) => t.basePrice)), [tours]);

  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState<string | null>(null);
  const [duration, setDuration] = useState<DurationKey>("all");
  const [price, setPrice] = useState<PriceKey>("all");
  const [lang, setLang] = useState("all");
  const [sort, setSort] = useState<SortKey>("recommended");

  // Ön seçim: ?city= slug (izmir) veya görünen ad (İzmir) olabilir.
  useEffect(() => {
    const cq = searchParams.get("city");
    if (cq) {
      const key = cq.toLowerCase();
      const match = tours.find((t) => (t.provinceSlug ?? "").toLowerCase() === key || t.city.toLowerCase() === key);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- URL → filtre senkronu
      if (match) setCity(match.city);
    }
    const catq = searchParams.get("category");
    if (catq) setCategory(catq.toLowerCase());
  }, [searchParams, tours]);

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase(locale);
    const list = tours.filter((t) =>
      (city === "all" || t.city === city) &&
      (!category || (t.category ?? "").toLowerCase() === category) &&
      matchesDuration(t.durationMinutes, duration) &&
      (price === "all" || (price === "p1" ? t.basePrice <= p1 : price === "p2" ? t.basePrice > p1 && t.basePrice <= p2 : t.basePrice > p2)) &&
      (lang === "all" || parseLanguageCodes(t.languagesOffered).includes(lang)) &&
      (!q || `${t.title} ${t.summary ?? ""} ${t.city} ${t.category ?? ""}`.toLocaleLowerCase(locale).includes(q))
    );
    const sorted = [...list];
    if (sort === "priceAsc") sorted.sort((a, b) => a.basePrice - b.basePrice);
    else if (sort === "priceDesc") sorted.sort((a, b) => b.basePrice - a.basePrice);
    else if (sort === "duration") sorted.sort((a, b) => a.durationMinutes - b.durationMinutes);
    else if (sort === "rating") sorted.sort((a, b) => (b.reviewCount ? b.rating ?? 0 : 0) - (a.reviewCount ? a.rating ?? 0 : 0));
    return sorted;
  }, [tours, query, city, category, duration, price, lang, sort, p1, p2, locale]);

  const active = query !== "" || city !== "all" || category !== null || duration !== "all" || price !== "all" || lang !== "all";
  function clearAll() {
    setQuery(""); setCity("all"); setCategory(null); setDuration("all"); setPrice("all"); setLang("all");
  }

  const priceLabel = (k: PriceKey) => {
    const cur = tours[0]?.currency ?? "TRY";
    const f = (n: number) => display(Math.round(n), cur) ?? `${Math.round(n)} ${cur}`;
    if (k === "p1") return `≤ ${f(p1)}`;
    if (k === "p2") return `${f(p1)} – ${f(p2)}`;
    return `> ${f(p2)}`;
  };

  return (
    <>
      {/* Araç çubuğu */}
      <div className="sticky top-16 z-20 -mx-4 border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur md:-mx-6 md:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative block lg:w-72">
            <span className="sr-only">{c.search}</span>
            <svg className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={c.search}
              className="h-11 w-full rounded-full border border-neutral-300 bg-white pl-10 pr-4 text-base text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:outline-none md:text-sm" />
          </label>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-0.5 lg:mx-0 lg:flex-1 lg:px-0" style={{ scrollbarWidth: "none" }}>
            <PillSelect label={c.city} value={city} onChange={setCity} active={city !== "all"}
              options={[["all", c.allCities], ...cities.map((x) => [x, x] as [string, string])]} />
            <PillSelect label={c.duration} value={duration} onChange={(v) => setDuration(v as DurationKey)} active={duration !== "all"}
              options={[["all", c.anyDuration], ["short", c.short], ["half", c.half], ["full", c.full]]} />
            {oneCurrency && Number.isFinite(p1) && (
              <PillSelect label={c.price} value={price} onChange={(v) => setPrice(v as PriceKey)} active={price !== "all"}
                options={[["all", c.anyPrice], ["p1", priceLabel("p1")], ["p2", priceLabel("p2")], ["p3", priceLabel("p3")]]} />
            )}
            {langs.length > 1 && (
              <PillSelect label={c.language} value={lang} onChange={setLang} active={lang !== "all"}
                options={[["all", c.anyLanguage], ...langs.map((l) => [l, languageByCode(l).name] as [string, string])]} />
            )}
            {category && (
              <button type="button" onClick={() => setCategory(null)}
                className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-neutral-900 bg-neutral-900 px-4 text-sm font-medium capitalize text-white">
                {category}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sonuç sayısı + sıralama */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-neutral-600" aria-live="polite">
          {c.results(filtered.length)}
          {active && (
            <button type="button" onClick={clearAll} className="ml-3 font-medium text-neutral-900 underline underline-offset-4">{c.clear}</button>
          )}
        </p>
        <label className="flex items-center gap-2 text-sm text-neutral-600">
          {c.sort}
          <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-9 rounded-lg border border-neutral-300 bg-white px-2.5 text-sm font-medium text-neutral-900 focus:border-neutral-900 focus:outline-none">
            <option value="recommended">{c.recommended}</option>
            <option value="priceAsc">{c.priceAsc}</option>
            <option value="priceDesc">{c.priceDesc}</option>
            <option value="rating">{c.rating}</option>
            <option value="duration">{c.durationSort}</option>
          </select>
        </label>
      </div>

      {/* Izgara */}
      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 px-6 py-16 text-center">
          <p className="text-base font-semibold text-neutral-900">{tours.length === 0 ? tt.noToursYet : c.noMatch}</p>
          <p className="mt-1 text-sm text-neutral-600">{tours.length === 0 ? tt.noToursYetSub : c.noMatchSub}</p>
          {active && (
            <button type="button" onClick={clearAll} className="mt-5 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50">
              {c.clear}
            </button>
          )}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} locale={locale} priority={i < 4} />
          ))}
        </div>
      )}
    </>
  );
}

/** Hap görünümlü native select — mobilde işletim sisteminin seçicisini açar. */
function PillSelect({ label, value, onChange, options, active }: {
  label: string; value: string; onChange: (v: string) => void; options: [string, string][]; active: boolean;
}) {
  return (
    <label className="relative shrink-0">
      <span className="sr-only">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className={`h-10 appearance-none rounded-full border pl-4 pr-9 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-1 ${
          active ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900"
        }`}>
        {options.map(([v, l]) => <option key={v} value={v} className="text-neutral-900">{l}</option>)}
      </select>
      <svg className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${active ? "text-white" : "text-neutral-500"}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
    </label>
  );
}
