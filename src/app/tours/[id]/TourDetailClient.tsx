"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clientFetch } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import ShareButton from "@/components/ShareButton";
import WishlistButton from "@/components/WishlistButton";
import AskQuestionButton from "@/components/AskQuestionButton";
import Price from "@/components/Price";
import { languageByCode } from "@/lib/languages";
import { STAR_PATH } from "@/components/TourCard";
import AvailabilityCalendar, { ymd } from "@/components/AvailabilityCalendar";
import TourGuidesSection from "@/components/TourGuidesSection";
import { track, tourItem } from "@/lib/analytics";

interface Place {
  id: number;
  name: string;
  description?: string;
  lat: number;
  lng: number;
  ord: number;
  photoUrl?: string;
}

interface PricingTier {
  participantCount: number;
  guideAmount: number;
}

interface LanguagePrice {
  code: string;
  displayName: string;
  multiplier: number;
  isRare: boolean;
  price: number;
}

interface TourPhoto {
  id: number;
  url: string;
  caption: string | null;
  ord: number;
}

interface TourInclude {
  id: number;
  label: string;
  isIncluded: boolean;
  ord: number;
}

interface TourImportantInfo {
  id: number;
  label: string;
  ord: number;
}

export interface TourDetail {
  id: number;
  title: string;
  summary?: string;
  city: string;
  provinceName?: string | null;
  districtName?: string | null;
  category: string;
  durationMinutes: number;
  basePrice: number;
  compareAtPrice?: number;
  currency: string;
  coverPhotoUrl?: string;
  languagesOffered?: string;
  description?: string;
  highlights?: string;
  isMachineTranslated?: boolean;
  meetingPointText?: string;
  meetingPointLat?: number;
  meetingPointLng?: number;
  places?: Place[];
  pricingTiers?: PricingTier[];
  languagePrices?: LanguagePrice[];
  badges?: string;
  photos?: TourPhoto[];
  includes?: TourInclude[];
  importantInfo?: TourImportantInfo[];
}

// Grup TOPLAM fiyatı — backend TourTest.ResolveGuideAmount ile BİREBİR aynı:
// guideAmount tier'da grup toplamıdır; count'a ≤ olan en yüksek tier kazanır,
// count en küçük tier'dan da küçükse en küçük tier. Geçerli tier yoksa basePrice.
//
// Bu fonksiyon checkout'taki groupPriceForCount ile aynı olmak ZORUNDA: tur
// detayında basePrice (ör. 1000), checkout'ta tier (ör. 700) gösterilince
// kullanıcı iki farklı fiyat görüyordu.
function groupPriceForCount(tour: TourDetail, count: number): number {
  const n = Math.max(1, count);
  const tiers = (tour.pricingTiers ?? [])
    .filter((t) => t.participantCount > 0 && t.guideAmount > 0)
    .sort((a, b) => a.participantCount - b.participantCount);
  if (tiers.length === 0) return tour.basePrice * n;
  const atOrBelow = tiers.filter((t) => t.participantCount <= n);
  // Tier kapsamı dışındaki küçük gruplarda (tier'lar 2 kişiden başlıyor)
  // tier toplamı uygulanamaz → basePrice × kişi.
  if (atOrBelow.length === 0) return tour.basePrice * n;
  // Monotonluk: toplam tek kişilik fiyatın altına inemez (backend ile aynı).
  return Math.max(atOrBelow[atOrBelow.length - 1].guideAmount, tour.basePrice);
}

// Kişi-başı gösterim için: grup toplamı / kişi sayısı.
function perPersonForCount(tour: TourDetail, count: number): number {
  const total = groupPriceForCount(tour, count);
  const n = Math.max(1, count);
  return Math.round((total / n) * 100) / 100;
}

function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h} hour${h > 1 ? "s" : ""}`;
}

// ─── Sayfaya özel metinler (tt'de olmayanlar). Diğer diller EN'e düşer. ───
const DC: Record<string, {
  tours: string; photos: string; reviewsWord: string; newTour: string; languages: string; duration: string;
  fromPerPerson: string; selectDateErr: string; travelers: (n: number) => string; total: string;
  trustNoCharge: string; trustLicensed: string; trustSecure: string; freeCancel: string; seeOnMap: string;
  selectDate: string; itineraryStop: string; perPersonShort: string; groupPricing: string; showAll: string; showLess: string;
}> = {
  en: {
    tours: "Tours", photos: "photos", reviewsWord: "reviews", newTour: "New experience", languages: "Languages", duration: "Duration",
    fromPerPerson: "/ person", selectDateErr: "Choose a date to see available guides.", travelers: (n) => `${n} ${n === 1 ? "traveler" : "travelers"}`,
    total: "Total", trustNoCharge: "Full refund if your guide has to cancel",
    trustLicensed: "Licensed professional guides, verified by our team", trustSecure: "Secure 3D Secure card payment",
    freeCancel: "Free cancellation", seeOnMap: "Open in Google Maps", selectDate: "Select date", itineraryStop: "Stop",
    perPersonShort: "per person", groupPricing: "Group pricing", showAll: "Read more", showLess: "Show less",
  },
  tr: {
    tours: "Turlar", photos: "fotoğraf", reviewsWord: "değerlendirme", newTour: "Yeni deneyim", languages: "Diller", duration: "Süre",
    fromPerPerson: "/ kişi", selectDateErr: "Müsait rehberleri görmek için bir tarih seç.", travelers: (n) => `${n} kişi`,
    total: "Toplam", trustNoCharge: "Rehber iptal ederse ücretin tamamı iade edilir",
    trustLicensed: "Ekibimizce doğrulanmış lisanslı profesyonel rehberler", trustSecure: "3D Secure ile güvenli kart ödemesi",
    freeCancel: "Ücretsiz iptal", seeOnMap: "Google Haritalar'da aç", selectDate: "Tarih seç", itineraryStop: "Durak",
    perPersonShort: "kişi başı", groupPricing: "Grup fiyatları", showAll: "Devamını oku", showLess: "Daha az göster",
  },
};

// Rozetler — tek renk ikon + metin (renkli hap/emoji yok).
const FEATURE_META: Record<string, { en: string; tr: string; icon: React.ReactNode }> = {
  free_cancellation:    { en: "Free cancellation", tr: "Ücretsiz iptal", icon: <path d="M20 6 9 17l-5-5" /> },
  instant_confirmation: { en: "Instant confirmation", tr: "Anında onay", icon: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /> },
  skip_the_line:        { en: "Skip the line", tr: "Sıra beklemeden", icon: <path d="M5 12h14M12 5l7 7-7 7" /> },
  small_group:          { en: "Small group", tr: "Küçük grup", icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></> },
  private_tour:         { en: "Private tour", tr: "Özel tur", icon: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></> },
  live_guide:           { en: "Live guide", tr: "Canlı rehber", icon: <><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4" /></> },
  pickup_included:      { en: "Pickup included", tr: "Otelden alış dahil", icon: <><rect x="1" y="3" width="15" height="13" rx="2" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></> },
};

function Icon({ children, size = 20, className = "" }: { children: React.ReactNode; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${className}`} aria-hidden="true">{children}</svg>
  );
}

const H2 = "font-display text-2xl md:text-[28px] font-normal leading-tight tracking-[-0.01em] text-neutral-900";
const PRIMARY_BTN = "flex h-12 w-full items-center justify-center rounded-xl bg-[#5B3FD9] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#4A32B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B3FD9] focus-visible:ring-offset-2";

interface ReviewsData { count: number; avgRating: number; reviews: PublicReview[] }

/// Sunucudan gelen initialTour (EN) ile ilk HTML dolu render edilir —
/// h1, açıklama, itinerary ve fiyat JS beklemeden crawl edilir. Kullanıcı
/// UI dilini değiştirirse ilgili locale client'ta yeniden çekilir.
export default function TourDetailClient({
  id,
  initialTour,
}: {
  id: string;
  initialTour: TourDetail | null;
}) {
  const { locale } = useT();
  const router = useRouter();
  const tt = getToursT(locale);
  const dc = DC[locale] ?? DC.en;
  const isTr = locale === "tr";

  // EN içerik sunucudan geldi; başka dilde o locale için client'ta çekilir.
  // Türetilmiş durum: aktif locale'in verisi yoksa "yükleniyor".
  const [localized, setLocalized] = useState<{ locale: string; tour: TourDetail | null | "error" } | null>(null);
  const tour: TourDetail | null | "loading" | "error" =
    locale === "en" ? initialTour : localized?.locale === locale ? localized.tour : "loading";

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  // Rezervasyon: tarih + kişi sayısı (rehber seçimine → checkout'a taşınır).
  const [bkDate, setBkDate] = useState("");
  const [bkPeople, setBkPeople] = useState(1);
  const [bkError, setBkError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<ReviewsData | null>(null);
  // Müsaitlik takvimi: ay ay çekilir, sonuçlar birleşir. Yükleniyor durumu türetilir
  // (effect içinde senkron setState yok): ay "loaded"da değilse ve hata yoksa yükleniyor.
  const [calMonth, setCalMonth] = useState(() => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), 1); });
  const [avail, setAvail] = useState<Record<string, boolean>>({});
  const [loadedMonths, setLoadedMonths] = useState<Record<string, true>>({});
  const [availFailed, setAvailFailed] = useState(false);

  const openLightbox = useCallback((i: number) => { setLightboxIndex(i); setLightboxOpen(true); }, []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const lbPrev = useCallback((total: number) => setLightboxIndex((i) => (i - 1 + total) % total), []);
  const lbNext = useCallback((total: number) => setLightboxIndex((i) => (i + 1) % total), []);

  useEffect(() => {
    if (!id || locale === "en") return;
    let alive = true;
    clientFetch(`/api/tours/${id}?locale=${locale}`, { cache: "no-store" })
      .then((r) => {
        if (r.status === 404) return null;
        if (!r.ok) return "error" as const;
        return r.json();
      })
      .then((data) => { if (alive) setLocalized({ locale, tour: data as TourDetail | null | "error" }); })
      .catch(() => { if (alive) setLocalized({ locale, tour: "error" }); });
    return () => { alive = false; };
  }, [id, locale]);

  // Yorumlar başlıkta (puan özeti) ve alttaki bölümde kullanılır → tek istek.
  const tourId = typeof tour === "object" && tour ? tour.id : null;
  useEffect(() => {
    if (!tourId) return;
    let alive = true;
    clientFetch(`/api/tours/${tourId}/public-reviews`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (alive && d) setReviews(d); })
      .catch(() => {});
    return () => { alive = false; };
  }, [tourId]);

  // Takvim verisi: görünen ay (bugünden itibaren) için gün bazında müsaitlik.
  const monthKey = ymd(calMonth).slice(0, 7);
  useEffect(() => {
    if (!tourId || availFailed || loadedMonths[monthKey]) return;
    const n = new Date();
    const first = calMonth.getFullYear() === n.getFullYear() && calMonth.getMonth() === n.getMonth() ? n : calMonth;
    const last = new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 0);
    const days = Math.max(1, last.getDate() - first.getDate() + 1);
    let alive = true;
    clientFetch(`/api/tours/${tourId}/availability?from=${ymd(first)}&days=${days}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: { days: { date: string; available: boolean }[] }) => {
        if (!alive) return;
        setAvail((prev) => { const next = { ...prev }; for (const x of d.days) next[x.date] = x.available; return next; });
        setLoadedMonths((prev) => ({ ...prev, [monthKey]: true }));
      })
      // Uç yoksa/erişilemezse takvim tüm gelecek günleri açık gösterir (akış kilitlenmez).
      .catch(() => { if (alive) setAvailFailed(true); });
    return () => { alive = false; };
  }, [tourId, monthKey, calMonth, availFailed, loadedMonths]);
  const availLoading = !availFailed && !loadedMonths[monthKey];

  // GA4: ürün görüntüleme (huninin ilk adımı).
  const ga = typeof tour === "object" && tour ? { id: tour.id, title: tour.title, category: tour.category, basePrice: tour.basePrice, city: tour.city, currency: tour.currency } : null;
  const gaKey = ga ? `${ga.id}|${ga.title}` : "";
  useEffect(() => {
    if (!ga) return;
    track("view_item", { currency: ga.currency, value: ga.basePrice, items: [tourItem(ga)] });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tur başına bir kez (gaKey)
  }, [gaKey]);

  if (tour === "loading") {
    return (
      <main className="min-h-screen bg-white antialiased">
        <Navbar activePage="tours" />
        <div className="mx-auto max-w-7xl animate-pulse px-4 pt-24 md:px-6" aria-hidden="true">
          <div className="h-3 w-40 rounded bg-neutral-100" />
          <div className="mt-4 h-9 w-2/3 rounded bg-neutral-100" />
          <div className="mt-3 h-4 w-1/3 rounded bg-neutral-100" />
          <div className="mt-6 h-64 rounded-2xl bg-neutral-100 md:h-[440px]" />
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="space-y-3">
              <div className="h-4 rounded bg-neutral-100" /><div className="h-4 rounded bg-neutral-100" /><div className="h-4 w-4/5 rounded bg-neutral-100" />
            </div>
            <div className="hidden h-80 rounded-2xl bg-neutral-100 lg:block" />
          </div>
        </div>
      </main>
    );
  }

  if (tour === "error" || !tour) {
    const notFound = !tour;
    return (
      <main className="min-h-screen bg-white antialiased">
        <Navbar activePage="tours" />
        <div className="mx-auto flex max-w-xl flex-col items-center px-6 pb-24 pt-40 text-center">
          <h1 className="font-display text-3xl font-normal text-neutral-900">{notFound ? tt.notFoundTitle : tt.errTitle}</h1>
          <p className="mt-3 text-neutral-600">{notFound ? tt.notFoundMsg : tt.errMsg}</p>
          <div className="mt-8 flex gap-3">
            {!notFound && (
              <button onClick={() => window.location.reload()} className="h-11 rounded-full bg-[#5B3FD9] px-6 text-sm font-semibold text-white hover:bg-[#4A32B8]">
                {tt.tryAgain}
              </button>
            )}
            <Link href="/tours" className={`inline-flex h-11 items-center rounded-full px-6 text-sm font-semibold ${notFound ? "bg-[#5B3FD9] text-white hover:bg-[#4A32B8]" : "border border-neutral-300 text-neutral-900 hover:bg-neutral-50"}`}>
              {tt.browseAllTours}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const t = tour;
  const highlights = t.highlights ? t.highlights.split("\n").map((l) => l.trim()).filter(Boolean) : [];
  const hasDiscount = t.compareAtPrice != null && t.compareAtPrice > t.basePrice;
  const location = t.districtName && t.provinceName ? `${t.districtName}, ${t.provinceName}` : (t.provinceName || t.city);
  const badgeKeys = (t.badges ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const features = badgeKeys.filter((k) => FEATURE_META[k]);
  const isBestseller = badgeKeys.includes("bestseller");
  const langList = (t.languagePrices ?? []).map((lp) => languageByCode(lp.code));
  const allPhotos: TourPhoto[] = t.photos && t.photos.length > 0
    ? [...t.photos].sort((a, b) => a.ord - b.ord)
    : t.coverPhotoUrl ? [{ id: 0, url: t.coverPhotoUrl, caption: null, ord: 0 }] : [];
  const places = [...(t.places ?? [])].sort((a, b) => a.ord - b.ord);
  const includes = [...(t.includes ?? [])].sort((a, b) => a.ord - b.ord);
  const included = includes.filter((i) => i.isIncluded);
  const notIncluded = includes.filter((i) => !i.isIncluded);
  const info = [...(t.importantInfo ?? [])].sort((a, b) => a.ord - b.ord);

  function proceed() {
    if (!bkDate) {
      setBkError(dc.selectDateErr);
      // Mobilde rezervasyon kartı içerikte; takvime kaydır ve odakla.
      const el = document.querySelector<HTMLElement>(window.matchMedia("(min-width: 1024px)").matches ? "#bk-cal-desktop" : "#bk-cal-mobile");
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }
    const total = groupPriceForCount(t, bkPeople);
    track("begin_checkout", { currency: t.currency, value: total, travelers: bkPeople, booking_date: bkDate, items: [tourItem(t, total)] });
    router.push(`/tours/${t.id}/guides?date=${bkDate}&people=${bkPeople}`);
  }

  const bookingCard = (variant: "desktop" | "mobile") => (
    <div className={`rounded-2xl border border-neutral-200 bg-white p-6 ${variant === "desktop" ? "shadow-[0_8px_30px_rgba(0,0,0,0.06)]" : ""}`}>
      <div className="flex flex-wrap items-baseline gap-x-2">
        <span className="text-sm text-neutral-600">{tt.startingFrom}</span>
        {hasDiscount && (
          <span className="text-sm text-neutral-500 line-through"><Price amount={t.compareAtPrice!} currency={t.currency} /></span>
        )}
      </div>
      <p className="mt-0.5 flex items-baseline gap-1.5">
        {/* Seçili kişi sayısının gerçek kişi-başı fiyatı — checkout'la aynı rakam. */}
        <span className="text-[28px] font-semibold leading-none tracking-tight text-neutral-900">
          <Price amount={perPersonForCount(t, bkPeople)} currency={t.currency} />
        </span>
        <span className="text-sm text-neutral-600">{dc.fromPerPerson}</span>
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-neutral-300">
        <div id={`bk-cal-${variant}`} tabIndex={-1} className="border-b border-neutral-300 px-3 pb-2 pt-2 outline-none" aria-invalid={!!bkError}>
          <div className="mb-1 flex items-baseline justify-between px-1">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-neutral-600">{tt.bkDate}</span>
            <span className="text-sm font-medium text-neutral-900">
              {bkDate ? new Date(`${bkDate}T00:00:00`).toLocaleDateString(isTr ? "tr-TR" : "en-GB", { weekday: "short", day: "numeric", month: "short" }) : dc.selectDate}
            </span>
          </div>
          <AvailabilityCalendar
            month={calMonth}
            onMonth={setCalMonth}
            avail={avail}
            loading={availLoading}
            failed={availFailed}
            value={bkDate}
            onChange={(v) => { setBkDate(v); setBkError(null); }}
            locale={locale}
            idPrefix={`bk-day-${variant}`}
          />
        </div>
        <div className="flex items-center justify-between px-4 py-2">
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-neutral-600">{tt.bkTravelers}</span>
            <span className="text-base text-neutral-900">{dc.travelers(bkPeople)}</span>
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setBkPeople((p) => Math.max(1, p - 1))} disabled={bkPeople <= 1}
              aria-label={isTr ? "Kişi azalt" : "Remove traveler"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 hover:border-neutral-900 disabled:opacity-30">
              <Icon size={16}><path d="M5 12h14" /></Icon>
            </button>
            <span className="w-6 text-center text-base font-semibold tabular-nums" aria-live="polite">{bkPeople}</span>
            <button type="button" onClick={() => setBkPeople((p) => Math.min(20, p + 1))} disabled={bkPeople >= 20}
              aria-label={isTr ? "Kişi ekle" : "Add traveler"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 text-neutral-900 hover:border-neutral-900 disabled:opacity-30">
              <Icon size={16}><path d="M12 5v14M5 12h14" /></Icon>
            </button>
          </div>
        </div>
      </div>

      {bkError && <p role="alert" className="mt-2 text-sm text-red-700">{bkError}</p>}

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-sm text-neutral-600">{dc.total}</span>
        <span className="text-lg font-semibold text-neutral-900">
          {/* Grup toplamı doğrudan — kişi-başı × kişi yuvarlama sapması üretiyordu. */}
          <Price amount={groupPriceForCount(t, bkPeople)} currency={t.currency} />
        </span>
      </div>

      <button type="button" onClick={proceed} className={`${PRIMARY_BTN} mt-4`}>{tt.bkContinue}</button>

      <ul className="mt-5 space-y-2.5 text-sm text-neutral-700">
        <li className="flex gap-2.5"><Icon size={18} className="mt-px text-neutral-900"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Icon>{dc.trustNoCharge}</li>
        {features.includes("free_cancellation") && (
          <li className="flex gap-2.5"><Icon size={18} className="mt-px text-neutral-900"><path d="M20 6 9 17l-5-5" /></Icon>
            <Link href="/cancellation-policy" className="underline-offset-4 hover:underline">{dc.freeCancel}</Link>
          </li>
        )}
        <li className="flex gap-2.5"><Icon size={18} className="mt-px text-neutral-900"><circle cx="12" cy="8" r="6" /><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11" /></Icon>{dc.trustLicensed}</li>
        <li className="flex gap-2.5"><Icon size={18} className="mt-px text-neutral-900"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Icon>{dc.trustSecure}</li>
      </ul>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/visamastercard.jpg" alt="Visa · Mastercard · Amex · Troy" className="mx-auto mt-5 h-5 w-auto opacity-80" />
      <div className="mt-5 border-t border-neutral-200 pt-4 text-center">
        <AskQuestionButton tourId={t.id} tourTitle={t.title} locale={locale} />
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Navbar activePage="tours" />

      {/* ── Başlık ── */}
      <div className="mx-auto max-w-7xl px-4 pt-20 md:px-6 md:pt-24">
        <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link href="/tours" className="hover:text-neutral-900 hover:underline">{dc.tours}</Link></li>
            <li aria-hidden="true">/</li>
            <li className="truncate text-neutral-700">{location}</li>
          </ol>
        </nav>
        <div className="mt-3 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {isBestseller && (
              <span className="mb-2 inline-block rounded-md bg-neutral-900 px-2 py-0.5 text-xs font-semibold text-white">
                {isTr ? "Çok satan" : "Bestseller"}
              </span>
            )}
            <h1 className="font-display text-[30px] font-normal leading-[1.1] tracking-[-0.01em] text-neutral-900 md:text-[44px]">{t.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-neutral-700">
              {reviews && reviews.count > 0 ? (
                <a href="#reviews" className="inline-flex items-center gap-1 hover:underline">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="#0A0A0F" aria-hidden="true"><polygon points={STAR_PATH} /></svg>
                  <span className="font-semibold text-neutral-900">{reviews.avgRating.toFixed(1)}</span>
                  <span className="text-neutral-500">({reviews.count} {dc.reviewsWord})</span>
                </a>
              ) : (
                <span className="font-medium">{dc.newTour}</span>
              )}
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span className="capitalize">{t.category}</span>
              <span aria-hidden="true" className="text-neutral-300">·</span>
              <span>{location}</span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2"><WishlistButton tourId={t.id} variant="inline" /><ShareButton title={t.title} variant="icon" /></div>
        </div>
      </div>

      {/* ── Galeri ── */}
      {allPhotos.length > 0 && (
        <div className="mx-auto mt-6 max-w-7xl px-4 md:px-6">
          <div className="relative">
            {/* Mobil: tek foto */}
            <button type="button" onClick={() => openLightbox(0)} className="relative block h-64 w-full overflow-hidden rounded-2xl sm:h-80 md:hidden">
              <Image src={allPhotos[0].url} alt={allPhotos[0].caption ?? t.title} fill priority sizes="100vw" className="object-cover" />
            </button>
            {/* Masaüstü: büyük sol + 2x2 sağ */}
            <div className={`hidden h-[440px] gap-2 overflow-hidden rounded-2xl md:grid ${allPhotos.length > 1 ? "grid-cols-[2fr_1fr]" : "grid-cols-1"}`}>
              <button type="button" onClick={() => openLightbox(0)} className="group relative">
                <Image src={allPhotos[0].url} alt={allPhotos[0].caption ?? t.title} fill priority sizes="(max-width: 1280px) 66vw, 850px" className="object-cover transition duration-300 group-hover:brightness-95" />
              </button>
              {allPhotos.length > 1 && (
                <div className="grid grid-cols-2 grid-rows-2 gap-2">
                  {allPhotos.slice(1, 5).map((photo, i) => (
                    <button type="button" key={photo.id} onClick={() => openLightbox(i + 1)} className="group relative overflow-hidden">
                      <Image src={photo.url} alt={photo.caption ?? ""} fill sizes="20vw" className="object-cover transition duration-300 group-hover:brightness-95" />
                    </button>
                  ))}
                  {Array.from({ length: Math.max(0, 4 - (allPhotos.length - 1)) }).map((_, i) => (
                    <div key={`e-${i}`} className="bg-neutral-100" />
                  ))}
                </div>
              )}
            </div>
            {allPhotos.length > 1 && (
              <button type="button" onClick={() => openLightbox(0)}
                className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-2 rounded-lg border border-neutral-900/10 bg-white px-3 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50">
                <Icon size={16}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></Icon>
                {tt.seeAllPhotos.replace("{n}", String(allPhotos.length))}
              </button>
            )}
          </div>
        </div>
      )}

      {lightboxOpen && (
        <Lightbox photos={allPhotos} index={lightboxIndex} onClose={closeLightbox}
          onPrev={() => lbPrev(allPhotos.length)} onNext={() => lbNext(allPhotos.length)} onSelect={setLightboxIndex} />
      )}

      {/* ── Gövde ── */}
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 py-10 md:px-6 lg:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-10">
          {t.isMachineTranslated && locale !== "en" && (
            <TranslationBadgeNote locale={locale} />
          )}

          {/* Hızlı bilgiler */}
          <ul className="grid gap-4 border-b border-neutral-200 pb-8 sm:grid-cols-2">
            <li className="flex gap-3">
              <Icon className="mt-0.5 text-neutral-900"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Icon>
              <div><p className="font-semibold text-neutral-900">{dc.duration}</p><p className="text-sm text-neutral-600">{formatDuration(t.durationMinutes)}</p></div>
            </li>
            {langList.length > 0 && (
              <li className="flex gap-3">
                <Icon className="mt-0.5 text-neutral-900"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></Icon>
                <div><p className="font-semibold text-neutral-900">{dc.languages}</p><p className="text-sm text-neutral-600">{langList.map((l) => l.name).join(", ")}</p></div>
              </li>
            )}
            {features.map((k) => (
              <li key={k} className="flex gap-3">
                <Icon className="mt-0.5 text-neutral-900">{FEATURE_META[k].icon}</Icon>
                <p className="font-semibold text-neutral-900">{isTr ? FEATURE_META[k].tr : FEATURE_META[k].en}</p>
              </li>
            ))}
          </ul>

          {/* Mobil rezervasyon kartı (masaüstünde sağ sütunda) */}
          <div id="book" className="scroll-mt-24 lg:hidden">{bookingCard("mobile")}</div>

          {t.summary && <p className="text-lg leading-8 text-neutral-800">{t.summary}</p>}

          {t.description && (
            <section>
              <h2 className={H2}>{tt.aboutTour}</h2>
              <ExpandableText text={t.description} more={dc.showAll} less={dc.showLess} />
            </section>
          )}

          {highlights.length > 0 && (
            <section>
              <h2 className={H2}>{tt.highlights}</h2>
              <ul className="mt-5 space-y-3">
                {highlights.map((hl, i) => (
                  <li key={i} className="flex gap-3 text-neutral-800">
                    <Icon size={18} className="mt-1 text-neutral-900"><path d="M20 6 9 17l-5-5" /></Icon>
                    <span className="leading-7">{hl}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {places.length > 0 && (
            <section>
              <h2 className={H2}>{tt.whatYoullSee}</h2>
              <ol className="mt-6">
                {places.map((place, i) => (
                  <li key={place.id} className="relative flex gap-4 pb-7 last:pb-0">
                    {i < places.length - 1 && <span className="absolute left-[13px] top-8 bottom-0 w-px bg-neutral-300" aria-hidden="true" />}
                    <span className="relative z-[1] flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-neutral-900 bg-white text-xs font-semibold text-neutral-900">
                      {i + 1}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      <p className="font-semibold text-neutral-900">{place.name}</p>
                      {place.description && <p className="mt-1 text-sm leading-6 text-neutral-600">{place.description}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {includes.length > 0 && (
            <section className="grid gap-8 sm:grid-cols-2">
              {included.length > 0 && (
                <div>
                  <h2 className={H2}>{tt.whatsIncluded}</h2>
                  <ul className="mt-5 space-y-3">
                    {included.map((item) => (
                      <li key={item.id} className="flex gap-3 text-neutral-800">
                        <Icon size={18} className="mt-0.5 text-emerald-700"><path d="M20 6 9 17l-5-5" /></Icon>{item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {notIncluded.length > 0 && (
                <div>
                  <h2 className={H2}>{tt.notIncluded}</h2>
                  <ul className="mt-5 space-y-3">
                    {notIncluded.map((item) => (
                      <li key={item.id} className="flex gap-3 text-neutral-800">
                        <Icon size={18} className="mt-0.5 text-neutral-500"><path d="M18 6 6 18M6 6l12 12" /></Icon>{item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {t.meetingPointText && (
            <section>
              <h2 className={H2}>{tt.meetingPoint}</h2>
              <div className="mt-5 flex gap-3">
                <Icon className="mt-0.5 text-neutral-900"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></Icon>
                <div>
                  <p className="leading-7 text-neutral-800">{t.meetingPointText}</p>
                  {t.meetingPointLat && t.meetingPointLng && (
                    <a href={`https://www.google.com/maps?q=${t.meetingPointLat},${t.meetingPointLng}`} target="_blank" rel="noreferrer"
                      className="mt-1 inline-block text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-[#5B3FD9]">
                      {dc.seeOnMap}
                    </a>
                  )}
                </div>
              </div>
            </section>
          )}

          {info.length > 0 && (
            <section>
              <h2 className={H2}>{tt.importantInfo}</h2>
              <ul className="mt-5 space-y-3">
                {info.map((item) => (
                  <li key={item.id} className="flex gap-3 text-neutral-800">
                    <Icon size={18} className="mt-1 text-neutral-900"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></Icon>
                    <span className="leading-7">{item.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* VibeSquad grup fiyatları — kişi başı = guideAmount(toplam) ÷ kişi. */}
          {(() => {
            const tiers = [...(t.pricingTiers ?? [])]
              .filter((x) => x.participantCount > 0 && x.guideAmount > 0)
              .sort((a, b) => a.participantCount - b.participantCount);
            if (tiers.length === 0) return null;
            const perPerson = (x: PricingTier) => Math.round((x.guideAmount / x.participantCount) * 100) / 100;
            const cheapest = Math.min(...tiers.map(perPerson));
            return (
              <section>
                <h2 className={H2}>{tt.squadTitle}</h2>
                <p className="mt-2 text-sm text-neutral-600">{tt.squadSub}</p>
                <div className="mt-5 overflow-hidden rounded-xl border border-neutral-200">
                  <table className="w-full text-sm">
                    <thead className="bg-neutral-50 text-left">
                      <tr>
                        <th className="px-5 py-3 font-semibold text-neutral-900">{tt.groupSize}</th>
                        <th className="px-5 py-3 text-right font-semibold text-neutral-900">{tt.pricePerPerson}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tiers.map((x, i) => (
                        <tr key={i} className="border-t border-neutral-200">
                          <td className="px-5 py-3.5 text-neutral-800">
                            {x.participantCount} {tt.peopleSuffix}
                            {perPerson(x) === cheapest && (
                              <span className="ml-2 rounded-md bg-neutral-900 px-1.5 py-0.5 text-[11px] font-semibold text-white">{tt.bestPrice}</span>
                            )}
                          </td>
                          <td className="px-5 py-3.5 text-right font-semibold text-neutral-900"><Price amount={perPerson(x)} currency={t.currency} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-xs text-neutral-500">{tt.squadNote}</p>
              </section>
            );
          })()}

          <TourGuidesSection city={t.city} headingClass={H2} />

          <ReviewsSection tourId={t.id} data={reviews} />
        </div>

        {/* Masaüstü yapışkan rezervasyon kartı */}
        <aside className="sticky top-24 hidden lg:block">{bookingCard("desktop")}</aside>
      </div>

      {/* Mobil alt çubuk — tarih yoksa karta kaydırır (eskiden sessizce bugünü seçiyordu). */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-neutral-200 bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-neutral-600">{tt.startingFrom}</p>
          <p className="truncate text-lg font-semibold leading-tight text-neutral-900">
            <Price amount={perPersonForCount(t, bkPeople)} currency={t.currency} />
            <span className="ml-1 text-sm font-normal text-neutral-600">{dc.fromPerPerson}</span>
          </p>
        </div>
        <button type="button" onClick={proceed}
          className="h-12 shrink-0 rounded-xl bg-[#5B3FD9] px-6 text-[15px] font-semibold text-white hover:bg-[#4A32B8]">
          {bkDate ? tt.bkContinue : dc.selectDate}
        </button>
      </div>
      <div className="h-24 lg:hidden" aria-hidden="true" />

      <MainFooter />
    </main>
  );
}

function ExpandableText({ text, more, less }: { text: string; more: string; less: string }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 600;
  return (
    <div className="mt-4">
      <p className={`whitespace-pre-line leading-8 text-neutral-800 ${long && !open ? "line-clamp-6" : ""}`}>{text}</p>
      {long && (
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
          className="mt-2 text-sm font-semibold text-neutral-900 underline underline-offset-4">
          {open ? less : more}
        </button>
      )}
    </div>
  );
}

function TranslationBadgeNote({ locale }: { locale: string }) {
  return (
    <p className="rounded-lg bg-neutral-50 px-4 py-2.5 text-sm text-neutral-600">
      {locale === "tr" ? "Bu içerik otomatik çevrilmiştir." : "This content was machine-translated."}
    </p>
  );
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  photos, index, onClose, onPrev, onNext, onSelect,
}: {
  photos: TourPhoto[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void; onSelect: (i: number) => void;
}) {
  const thumbsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    const el = thumbsRef.current?.children[index] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const current = photos[index];
  const navBtn = "absolute z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25";

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="flex shrink-0 items-center justify-between px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <span className="text-sm font-medium text-white/70 tabular-nums">{index + 1} / {photos.length}</span>
        <button onClick={onClose} aria-label="Close photo viewer" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20">
          <Icon size={18}><path d="M18 6 6 18M6 6l12 12" /></Icon>
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
        {photos.length > 1 && (
          <button onClick={onPrev} aria-label="Previous photo" className={`${navBtn} left-2 md:left-6`}><Icon><path d="m15 18-6-6 6-6" /></Icon></button>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img key={current.url} src={current.url} alt={current.caption ?? ""}
          className="max-h-full max-w-full select-none rounded-lg object-contain" style={{ maxHeight: "calc(100vh - 180px)" }} />
        {photos.length > 1 && (
          <button onClick={onNext} aria-label="Next photo" className={`${navBtn} right-2 md:right-6`}><Icon><path d="m9 18 6-6-6-6" /></Icon></button>
        )}
      </div>

      {current.caption && (
        <p className="shrink-0 px-6 py-2 text-center text-sm text-white/70" onClick={(e) => e.stopPropagation()}>{current.caption}</p>
      )}

      <div ref={thumbsRef} className="flex shrink-0 gap-2 overflow-x-auto px-4 py-3" style={{ scrollbarWidth: "none" }} onClick={(e) => e.stopPropagation()}>
        {photos.map((photo, i) => (
          <button key={photo.id} onClick={() => onSelect(i)} aria-label={`Photo ${i + 1}`}
            className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition ${i === index ? "border-white" : "border-transparent opacity-50 hover:opacity-80"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

interface PublicReview {
  id: number;
  fullName: string;
  nationality: string | null;
  rating: number;
  comment: string | null;
  createdAt: string;
}

function ReviewStars({ n, size = 14 }: { n: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(n) ? "#0A0A0F" : "#D4D4D4"} aria-hidden="true">
          <polygon points={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

function ReviewsSection({ tourId, data }: { tourId: number; data: ReviewsData | null }) {
  const { locale } = useT();
  const tt = getToursT(locale);

  return (
    <section id="reviews" className="scroll-mt-24 border-t border-neutral-200 pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className={H2}>{tt.reviews}</h2>
          {data && data.count > 0 && (
            <p className="mt-2 flex items-center gap-2 text-neutral-700">
              <span className="text-2xl font-semibold text-neutral-900">{data.avgRating.toFixed(1)}</span>
              <ReviewStars n={data.avgRating} size={16} />
              <span className="text-sm text-neutral-500">({data.count})</span>
            </p>
          )}
        </div>
        <Link href={`/tours/${tourId}/review`}
          className="inline-flex h-10 items-center rounded-full border border-neutral-300 px-5 text-sm font-semibold text-neutral-900 hover:border-neutral-900">
          {tt.writeReview}
        </Link>
      </div>

      {!data || data.reviews.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-neutral-300 px-6 py-10 text-center">
          <p className="font-semibold text-neutral-900">{tt.noReviews}</p>
          <p className="mt-1 text-sm text-neutral-600">{tt.beTheFirst}</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {data.reviews.map((r) => (
            <article key={r.id}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-sm font-semibold text-neutral-700">
                  {r.fullName[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-900">{r.fullName}</p>
                  <p className="text-xs text-neutral-500">
                    {r.nationality ? `${r.nationality} · ` : ""}
                    {new Date(r.createdAt).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-GB", { month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>
              <div className="mt-3"><ReviewStars n={r.rating} /></div>
              {r.comment && <p className="mt-2 leading-7 text-neutral-800">{r.comment}</p>}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
