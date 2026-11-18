"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { clientFetch, API_BASE_URL } from "@/lib/api";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import { paymentErrorText } from "@/lib/paymentErrors";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import Price from "@/components/Price";
import CheckoutSteps from "@/components/CheckoutSteps";

interface PricingTier {
  participantCount: number;
  guideAmount: number;
}

interface CheckoutTour {
  id: number;
  title: string;
  city: string;
  provinceName?: string | null;
  currency: string;
  basePrice: number;
  coverPhotoUrl?: string;
  pricingTiers?: PricingTier[];
}

// Booking durumları — backend BookingStatus ile aynı.
type BookingStatus =
  | "pending"      // rehber onayı bekleniyor
  | "confirmed"    // rehber kabul etti → ödeme aşaması
  | "paid"
  | "rejected"
  | "cancelled";

// Grup toplam fiyatı — backend TourTest.ResolveGuideAmount ile AYNI mantık:
// guideAmount tier'da grup TOPLAMI; count'a ≤ olan en yüksek tier kazanır,
// count en küçük tier'dan da küçükse en küçük tier. Tier yoksa basePrice.
// (Eski per-person×count yaklaşımı non-exact count'ta backend'le uyuşmuyordu.)
function groupPriceForCount(tour: CheckoutTour, count: number): number {
  const n = Math.max(1, count);
  const tiers = (tour.pricingTiers ?? [])
    .filter((t) => t.participantCount > 0 && t.guideAmount > 0)
    .sort((a, b) => a.participantCount - b.participantCount);
  if (tiers.length === 0) return tour.basePrice * n;
  const atOrBelow = tiers.filter((t) => t.participantCount <= n);
  // Tier kapsamı dışındaki küçük gruplarda (tier'lar 2 kişiden başlıyor)
  // tier toplamı uygulanamaz → basePrice × kişi. Eskiden en küçük tier'ın
  // GRUP toplamı 1 kişiye uygulanıyordu (1000 TL tur 700 TL'ye düşüyordu).
  if (atOrBelow.length === 0) return tour.basePrice * n;
  // Monotonluk: toplam tek kişilik fiyatın altına inemez (backend ile aynı).
  return Math.max(atOrBelow[atOrBelow.length - 1].guideAmount, tour.basePrice);
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white" />}>
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutInner() {
  const params = useParams();
  const search = useSearchParams();
  const router = useRouter();
  const id = params?.id as string;
  const { locale } = useT();
  const tt = getToursT(locale);

  const date = search.get("date") ?? "";
  const people = Math.max(1, parseInt(search.get("people") ?? "1", 10) || 1);
  const guideId = parseInt(search.get("guideId") ?? "0", 10) || 0;
  // Mevcut rezervasyona devam (profil → "Öde"): yeni talep oluşturulmaz, durum ve
  // kesin fiyat backend'den okunur. Kişi sayısı DTO'da yok → bilinmiyorsa gizlenir.
  const resumeId = parseInt(search.get("bookingId") ?? "0", 10) || 0;
  const peopleKnown = search.has("people");

  const [tour, setTour] = useState<CheckoutTour | null | "loading" | "error">("loading");
  const [agreed, setAgreed] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Booking durumu: guideId yoksa rehber seçimine geri gönder.
  const [bookingId, setBookingId] = useState<number | null>(resumeId || null);
  const [status, setStatus] = useState<BookingStatus | null>(null);
  const [bookingPrice, setBookingPrice] = useState<number | null>(null);
  const [authReady, setAuthReady] = useState(false);
  // Kart formu (3DS Direct) — değerler SAKLANMAZ, yalnız ödeme isteğinde iletilir.
  const inputCls =
    "h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-400 transition-[border-color,box-shadow] focus:border-[#5B3FD9] focus:outline-none focus:ring-[3px] focus:ring-[#5B3FD9]/15";
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  // TAMİ alıcı bilgisinde telefon zorunlu. Kayıtta zorunlu olmadığı için
  // profilde varsa oradan doldurulur (alan gizlenir), yoksa burada istenir
  // ve ödeme sırasında profile de kaydedilir.
  const [phone, setPhone] = useState("");
  const [phoneOnProfile, setPhoneOnProfile] = useState<boolean | null>(null);

  // Tur verisi
  useEffect(() => {
    if (!id) return;
    clientFetch(`/api/tours/${id}?locale=${locale}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : "error"))
      .then((d) => setTour(d ?? "error"))
      .catch(() => setTour("error"));
  }, [id, locale]);

  // Auth guard — login değilse rehber seçimi/login akışına dön.
  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged((user) => {
      if (!user) {
        const back = encodeURIComponent(
          `/tours/${id}/checkout?date=${date}&people=${people}&guideId=${guideId}${resumeId ? `&bookingId=${resumeId}` : ""}`
        );
        router.replace(`/login?next=${back}`);
        return;
      }
      setAuthReady(true);
    });
    return () => unsub();
  }, [id, date, people, guideId, resumeId, router]);

  // Profil telefonu — varsa kart formunda telefon sorulmaz.
  useEffect(() => {
    if (!authReady) return;
    let alive = true;
    (async () => {
      try {
        const headers = await buildAuthHeaders();
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, { headers });
        if (!alive) return;
        if (!res.ok) { setPhoneOnProfile(false); return; }
        const me = await res.json();
        const digits = String(me?.phoneNumber ?? "").replace(/\D/g, "");
        setPhoneOnProfile(digits.length >= 10);
      } catch {
        if (alive) setPhoneOnProfile(false);
      }
    })();
    return () => { alive = false; };
  }, [authReady]);

  // guideId yoksa rehber seçimine geri gönder (bu sayfaya doğrudan gelinemez).
  useEffect(() => {
    if (!guideId && !resumeId) {
      router.replace(`/tours/${id}/guides?date=${date}&people=${people}`);
    }
  }, [guideId, resumeId, id, date, people, router]);

  // Booking durumunu tazele (rehber kabul etti mi diye bakmak için).
  const refreshBooking = useCallback(async (bId: number) => {
    try {
      const headers = await buildAuthHeaders();
      const res = await fetch(`${API_BASE_URL}/api/bookings/${bId}`, { headers });
      if (res.ok) {
        const b = await res.json();
        setStatus(b.status as BookingStatus);
        if (typeof b.price === "number") setBookingPrice(b.price);
      }
    } catch { /* sessizce geç — kullanıcı elle yenileyebilir */ }
  }, []);

  // Booking Pending'ken rehber kabulünü yakalamak için hafif polling (20sn).
  useEffect(() => {
    if (bookingId && status === "pending") {
      const t = setInterval(() => refreshBooking(bookingId), 20000);
      return () => clearInterval(t);
    }
  }, [bookingId, status, refreshBooking]);

  // Devam modunda rezervasyonun güncel durumunu ve fiyatını çek.
  useEffect(() => {
    if (!authReady || !resumeId) return;
    let alive = true;
    buildAuthHeaders()
      .then((headers) => fetch(`${API_BASE_URL}/api/bookings/${resumeId}`, { headers }))
      .then((res) => (res.ok ? res.json() : null))
      .then((b) => {
        if (!alive || !b) return;
        setStatus(b.status as BookingStatus);
        if (typeof b.price === "number") setBookingPrice(b.price);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, [authReady, resumeId]);

  if (tour === "loading" || tour === "error" || tour == null || !authReady) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        {tour === "error" ? (
          <div role="alert" className="mx-auto max-w-xl px-6 pb-20 pt-36 text-center text-neutral-700">{tt.errMsg}</div>
        ) : (
          <div className="mx-auto max-w-5xl animate-pulse px-4 pb-20 pt-28 md:px-6" aria-busy="true">
            <div className="h-6 w-64 rounded bg-neutral-100" />
            <div className="mt-6 h-10 w-1/2 rounded bg-neutral-100" />
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
              <div className="h-80 rounded-2xl bg-neutral-100" />
              <div className="h-64 rounded-2xl bg-neutral-100" />
            </div>
          </div>
        )}
        <MainFooter />
      </main>
    );
  }

  // Grup toplam fiyat (backend'le aynı mantık). Booking oluşunca backend'in döndürdüğü
  // authoritative fiyat kullanılır (bookingPrice); öncesinde tahmin gösterilir.
  const estimatedTotal = groupPriceForCount(tour, people);
  const total = bookingPrice ?? estimatedTotal;
  const perPerson = Math.round((total / people) * 100) / 100;

  // 1) Rezervasyon talebi oluştur (booking Pending → rehbere gider).
  async function createBooking() {
    if (!agreed) { setNotice(tt.coAgreeErr); return; }
    if (!date) { setNotice(tt.bkSelectDate); return; }
    setBusy(true);
    setNotice(null);
    try {
      const headers = await buildAuthHeaders({ extra: { "Content-Type": "application/json" } });
      const res = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          tourId: Number(id),
          guideId,
          scheduledAt: new Date(date).toISOString(),
          guestCount: people,
          meetingType: "live",
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setNotice(d.message ?? d.error ?? tt.errMsg);
        return;
      }
      const b = await res.json();
      setBookingId(b.id);
      setStatus((b.status as BookingStatus) ?? "pending");
      // Backend authoritative fiyat — turist tam olarak bunu öder.
      if (typeof b.price === "number") setBookingPrice(b.price);
    } catch {
      setNotice(tt.errMsg);
    } finally {
      setBusy(false);
    }
  }

  // 2) Rehber kabul etti (Confirmed) → TAMİ 3DS ödemesi.
  // Kart bilgisi backend'e → TAMİ payment/auth → bankanın 3DS sayfası (base64 HTML)
  // döner → aynı sekmede yazılır, kullanıcı SMS onayı yapar → banka callback'e POST atar.
  // Kart bilgisi bizde SAKLANMAZ (sadece iletilir).
  async function payNow() {
    if (!bookingId) return;
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 15) { setNotice(tt.payErrCardNumber); return; }
    if (!/^\d{2}$/.test(expMonth) || Number(expMonth) < 1 || Number(expMonth) > 12) {
      setNotice(tt.payErrExpMonth); return;
    }
    if (!/^\d{2,4}$/.test(expYear)) { setNotice(tt.payErrExpYear); return; }
    if (!/^\d{3,4}$/.test(cvv)) { setNotice(tt.payErrCvv); return; }

    // Telefon: profilde yoksa formdan zorunlu (TAMİ alıcı bilgisinde şart).
    // Uluslararası numara kabul (backend NormalizePhone ile aynı): TR cep
    // (5XXXXXXXXX) ya da ülke kodlu 8-15 hane (E.164). Eskiden yalnız TR cep
    // kabul ediliyordu → yabancı turist ödeme ekranını geçemiyordu.
    const phoneDigits = phone.replace(/\D/g, "").replace(/^00/, "");
    if (phoneOnProfile === false && !/^(5\d{9}|\d{8,15})$/.test(phoneDigits)) {
      setNotice(tt.payErrPhone); return;
    }

    setBusy(true);
    setNotice(null);
    try {
      const headers = await buildAuthHeaders({ extra: { "Content-Type": "application/json" } });
      const res = await fetch(`${API_BASE_URL}/api/payments/tami/pay-3ds`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          bookingId,
          cardNumber: digits,
          holderName: holderName.trim(),
          cvv,
          expireMonth: expMonth,
          expireYear: expYear.length === 2 ? `20${expYear}` : expYear,
          phone: phoneDigits || undefined,
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.threeDsHtml) {
        // Bankanın 3DS sayfasını /payment/3ds üzerinden aç.
        // document.write ile buraya yazmak bu sayfanın CSP'sini miras alıyor ve
        // form-action bankaya POST'u blokluyordu; /payment/3ds için middleware
        // ayrı bir CSP gönderiyor. HTML uzun olduğu için sessionStorage ile taşınır.
        try {
          sessionStorage.setItem("vg_3ds_html", d.threeDsHtml);
        } catch {
          setNotice(tt.errMsg);
          return;
        }
        window.location.href = "/payment/3ds";
        return;
      }
      if (res.ok && d.alreadyPaid) { setStatus("paid"); return; }
      if (res.status === 503) { setNotice(tt.coComingSoon); return; }
      // Banka ret kodunu okunur bir açıklamaya çevir ("expiry date looks
      // incorrect", "security code is incorrect" ...) — kullanıcı neyi
      // düzelteceğini bilsin. Kod yoksa backend'in mesajına düşer.
      setNotice(
        paymentErrorText(d.error, d.code, d.message ?? tt.errMsg)
      );
    } catch {
      setNotice(tt.errMsg);
    } finally {
      setBusy(false);
    }
  }

  const cc = CC[locale] ?? CC.en;
  const step: 2 | 3 | 4 = status === "paid" ? 4 : status === "confirmed" ? 3 : 2;
  const fmtDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" })
    : "";
  const label = "mb-1.5 block text-sm font-medium text-neutral-900";
  const primary = "flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#5B3FD9] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#4A32B8] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B3FD9] focus-visible:ring-offset-2";
  const h2 = "font-display text-2xl font-normal tracking-[-0.01em] text-neutral-900";

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Navbar />

      <div className="mx-auto max-w-5xl px-4 pb-20 pt-24 md:px-6 md:pt-28">
        <CheckoutSteps current={step} locale={locale} />
        {!bookingId && (
          <Link href={`/tours/${tour.id}/guides?date=${date}&people=${people}`}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
            {tt.coBack}
          </Link>
        )}
        <h1 className="mt-3 font-display text-3xl font-normal tracking-[-0.01em] md:text-[40px]">{tt.coTitle}</h1>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          {/* Sipariş özeti — mobilde üstte, masaüstünde sağda yapışkan */}
          <aside className="rounded-2xl border border-neutral-200 p-5 lg:sticky lg:top-24 lg:order-2 lg:p-6">
            <div className="flex gap-4">
              {tour.coverPhotoUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tour.coverPhotoUrl} alt="" className="h-20 w-20 shrink-0 rounded-lg object-cover lg:h-24 lg:w-24" />
              )}
              <div className="min-w-0">
                <p className="line-clamp-3 font-semibold leading-snug">{tour.title}</p>
                <p className="mt-1 text-sm text-neutral-600">{tour.provinceName || tour.city}</p>
              </div>
            </div>
            <dl className="mt-5 space-y-2.5 border-t border-neutral-200 pt-5 text-sm">
              {date && (
                <div className="flex justify-between gap-4"><dt className="text-neutral-600">{tt.bkDate}</dt><dd className="text-right font-medium">{fmtDate}</dd></div>
              )}
              {peopleKnown && (
                <>
                  <div className="flex justify-between gap-4"><dt className="text-neutral-600">{tt.bkTravelers}</dt><dd className="font-medium">{people}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-neutral-600">{tt.perPerson}</dt><dd className="font-medium"><Price amount={perPerson} currency={tour.currency} /></dd></div>
                </>
              )}
            </dl>
            <div className="mt-5 flex items-baseline justify-between border-t border-neutral-200 pt-5">
              <span className="font-semibold">{tt.bkTotal}</span>
              <span className="text-2xl font-semibold tracking-tight"><Price amount={total} currency={tour.currency} /></span>
            </div>
            {!bookingPrice && <p className="mt-1 text-right text-xs text-neutral-500">{cc.estimate}</p>}
            <ul className="mt-5 space-y-2 border-t border-neutral-200 pt-5 text-sm text-neutral-700">
              <li className="flex gap-2.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mt-px shrink-0 text-neutral-900" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                {cc.noCharge}
              </li>
              <li className="flex gap-2.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mt-px shrink-0 text-neutral-900" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                {cc.secure}
              </li>
            </ul>
          </aside>

          <section className="rounded-2xl border border-neutral-200 p-5 md:p-7 lg:order-1">
            {notice && (
              <div role="alert" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{notice}</div>
            )}

            {/* Aşama A — henüz talep yok: sözleşme + rezervasyon talebi */}
            {!bookingId && (
              <>
                <h2 className={h2}>{tt.coConfirmTitle}</h2>
                <p className="mt-2 leading-7 text-neutral-600">{tt.coConfirmSub}</p>
                <ol className="mt-6 space-y-4">
                  {cc.how.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm text-neutral-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-900">{i + 1}</span>
                      <span className="pt-0.5 leading-6">{s}</span>
                    </li>
                  ))}
                </ol>
                <label className="mt-6 flex cursor-pointer select-none items-start gap-3 rounded-xl border border-neutral-200 p-4">
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#5B3FD9]" />
                  <span className="text-sm leading-6 text-neutral-700">
                    {tt.coAgreeText}{" "}
                    <Link href="/mesafeli-satis" target="_blank" className="font-medium text-neutral-900 underline underline-offset-2">{tt.coDistanceContract}</Link>{" "}
                    <Link href="/on-bilgilendirme" target="_blank" className="font-medium text-neutral-900 underline underline-offset-2">{tt.coAndPreInfo}</Link>.
                  </span>
                </label>
                <button onClick={createBooking} disabled={busy || !agreed} className={`${primary} mt-5`}>
                  {busy ? <Spinner /> : tt.coSendRequest}
                </button>
              </>
            )}

            {/* Aşama B — Pending: rehber onayı bekleniyor */}
            {bookingId && status === "pending" && (
              <div className="py-6 text-center" aria-live="polite">
                <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent" aria-hidden="true" />
                <h2 className={h2}>{tt.coWaitTitle}</h2>
                <p className="mx-auto mt-2 max-w-md leading-7 text-neutral-600">{tt.coWaitSub}</p>
                <button onClick={() => bookingId && refreshBooking(bookingId)}
                  className="mt-5 inline-flex h-10 items-center rounded-full border border-neutral-300 px-5 text-sm font-semibold hover:border-neutral-900">
                  {tt.coCheckNow}
                </button>
                <p className="mt-5 text-sm text-neutral-500">
                  {cc.trackIn}{" "}
                  <Link href="/profile" className="font-medium text-neutral-900 underline underline-offset-2">{tt.coMyReservations}</Link>.
                </p>
              </div>
            )}

            {/* Aşama C — Confirmed: ödeme */}
            {bookingId && status === "confirmed" && (
              <>
                <div className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-px shrink-0" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {tt.coGuideAccepted}
                </div>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <h2 className={h2}>{tt.coPayWith}</h2>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/visamastercard.jpg" alt="Visa · Mastercard · Amex · Troy" className="h-5 w-auto opacity-80" />
                </div>

                {/* Kart formu — 3D Secure. Kart bilgisi saklanmaz, bankaya iletilir. */}
                <form onSubmit={(e) => { e.preventDefault(); payNow(); }} className="space-y-4" autoComplete="on">
                  <div>
                    <label htmlFor="cc-number" className={label}>{tt.payCardNumber}</label>
                    <input id="cc-number" inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000"
                      value={cardNumber}
                      onChange={(e) => {
                        const d = e.target.value.replace(/\D/g, "").slice(0, 19);
                        setCardNumber(d.replace(/(.{4})/g, "$1 ").trim());
                      }}
                      className={`${inputCls} tracking-wide tabular-nums`} />
                  </div>
                  <div>
                    <label htmlFor="cc-name" className={label}>{tt.payCardHolder}</label>
                    <input id="cc-name" autoComplete="cc-name" placeholder={tt.payCardHolderPh}
                      value={holderName}
                      onChange={(e) => setHolderName(e.target.value.toUpperCase())}
                      className={inputCls} />
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="cc-exp-m" className={label}>{tt.payExpMonth}</label>
                      <input id="cc-exp-m" inputMode="numeric" autoComplete="cc-exp-month" placeholder="MM" maxLength={2}
                        value={expMonth} onChange={(e) => setExpMonth(e.target.value.replace(/\D/g, "").slice(0, 2))}
                        className={`${inputCls} tabular-nums`} />
                    </div>
                    <div>
                      <label htmlFor="cc-exp-y" className={label}>{tt.payExpYear}</label>
                      <input id="cc-exp-y" inputMode="numeric" autoComplete="cc-exp-year" placeholder="YYYY" maxLength={4}
                        value={expYear} onChange={(e) => setExpYear(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className={`${inputCls} tabular-nums`} />
                    </div>
                    <div>
                      <label htmlFor="cc-csc" className={label}>{tt.payCvv}</label>
                      <input id="cc-csc" inputMode="numeric" autoComplete="cc-csc" placeholder="123" maxLength={4}
                        value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className={`${inputCls} tabular-nums`} />
                    </div>
                  </div>
                  {/* Telefon: profilde kayıtlıysa sorulmaz. Banka/ödeme kaydı için
                      zorunlu; girilen numara profile de kaydedilir. */}
                  {phoneOnProfile === false && (
                    <div>
                      <label htmlFor="cc-phone" className={label}>{tt.payPhone}</label>
                      <input id="cc-phone" inputMode="tel" autoComplete="tel" placeholder={tt.payPhonePh} maxLength={20}
                        value={phone}
                        // Serbest biçim: yalnız rakam, boşluk, +, -, parantez (ülke kodu yazılabilsin).
                        onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s()-]/g, ""))}
                        className={inputCls} />
                      <p className="mt-1.5 text-xs text-neutral-500">{tt.payPhoneHint}</p>
                    </div>
                  )}
                  <p className="flex gap-2 text-xs leading-5 text-neutral-500">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    <span>{tt.paySecureNote.replace(/^🔒\s*/, "")} {cc.notStored}</span>
                  </p>
                  <button type="submit" disabled={busy} className={primary}>
                    {busy ? <Spinner /> : <>{tt.coPayNow} · <Price amount={total} currency={tour.currency} /></>}
                  </button>
                </form>
                <p className="mt-5 text-xs leading-5 text-neutral-500">{tt.coProvider}</p>
              </>
            )}

            {/* Aşama D — Paid */}
            {bookingId && status === "paid" && (
              <div className="py-6 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                </div>
                <h2 className={h2}>{tt.coPaidTitle}</h2>
                <p className="mx-auto mt-2 max-w-md leading-7 text-neutral-600">{tt.coPaidSub}</p>
                <Link href="/profile" className="mt-6 inline-flex h-12 items-center rounded-xl bg-[#5B3FD9] px-6 text-[15px] font-semibold text-white hover:bg-[#4A32B8]">
                  {tt.coMyReservations}
                </Link>
              </div>
            )}

            {/* Aşama E — Reddedildi / iptal */}
            {bookingId && (status === "rejected" || status === "cancelled") && (
              <div className="py-6 text-center">
                <h2 className={h2}>{status === "rejected" ? tt.coRejected : tt.coCancelled}</h2>
                <p className="mx-auto mt-2 max-w-md leading-7 text-neutral-600">{tt.coRejectedSub}</p>
                <Link href={`/tours/${id}/guides?date=${date}&people=${people}`}
                  className="mt-6 inline-flex h-12 items-center rounded-xl bg-[#5B3FD9] px-6 text-[15px] font-semibold text-white hover:bg-[#4A32B8]">
                  {tt.coChooseAnother}
                </Link>
              </div>
            )}
          </section>
        </div>
      </div>

      <MainFooter />
    </main>
  );
}

function Spinner() {
  return <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-label="Loading" />;
}

const CC: Record<string, { estimate: string; noCharge: string; secure: string; how: string[]; trackIn: string; notStored: string }> = {
  en: {
    estimate: "Final price confirmed with your request",
    noCharge: "No charge until your guide accepts",
    secure: "3D Secure payment · card details are never stored",
    how: ["We send your request to the guide you chose.", "The guide confirms availability — this page updates automatically.", "You pay securely here and get your confirmation."],
    trackIn: "You can also track it in",
    notStored: "Your card details are not stored.",
  },
  tr: {
    estimate: "Kesin fiyat talep oluşunca netleşir",
    noCharge: "Rehber kabul edene kadar ücret alınmaz",
    secure: "3D Secure ödeme · kart bilgisi saklanmaz",
    how: ["Talebini seçtiğin rehbere iletiriz.", "Rehber müsaitliğini onaylar — bu sayfa kendiliğinden güncellenir.", "Burada güvenle ödersin, onayın gelir."],
    trackIn: "Durumu şuradan da takip edebilirsin:",
    notStored: "Kart bilgileriniz saklanmaz.",
  },
};
