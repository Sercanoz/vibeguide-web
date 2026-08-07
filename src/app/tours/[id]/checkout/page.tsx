"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { clientFetch, API_BASE_URL } from "@/lib/api";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import Price from "@/components/Price";

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

function perPersonForCount(tour: CheckoutTour, count: number): number {
  const tiers = (tour.pricingTiers ?? []).filter(
    (t) => t.participantCount > 0 && t.guideAmount > 0
  );
  const exact = tiers.find((t) => t.participantCount === count);
  if (exact) return Math.round((exact.guideAmount / exact.participantCount) * 100) / 100;
  return tour.basePrice;
}

export default function CheckoutPage() {
  const params = useParams();
  const search = useSearchParams();
  const router = useRouter();
  const id = params?.id as string;
  const { locale } = useT();
  const tt = getToursT(locale);

  const date = search.get("date") ?? "";
  const people = Math.max(1, parseInt(search.get("people") ?? "1", 10) || 1);
  const guideId = parseInt(search.get("guideId") ?? "0", 10) || 0;

  const [tour, setTour] = useState<CheckoutTour | null | "loading" | "error">("loading");
  const [agreed, setAgreed] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Booking durumu: guideId yoksa rehber seçimine geri gönder.
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [status, setStatus] = useState<BookingStatus | null>(null);
  const [authReady, setAuthReady] = useState(false);

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
          `/tours/${id}/checkout?date=${date}&people=${people}&guideId=${guideId}`
        );
        router.replace(`/login?next=${back}`);
        return;
      }
      setAuthReady(true);
    });
    return () => unsub();
  }, [id, date, people, guideId, router]);

  // guideId yoksa rehber seçimine geri gönder (bu sayfaya doğrudan gelinemez).
  useEffect(() => {
    if (!guideId) {
      router.replace(`/tours/${id}/guides?date=${date}&people=${people}`);
    }
  }, [guideId, id, date, people, router]);

  // Booking durumunu tazele (rehber kabul etti mi diye bakmak için).
  const refreshBooking = useCallback(async (bId: number) => {
    try {
      const headers = await buildAuthHeaders();
      const res = await fetch(`${API_BASE_URL}/api/bookings/${bId}`, { headers });
      if (res.ok) {
        const b = await res.json();
        setStatus(b.status as BookingStatus);
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

  if (tour === "loading" || tour === "error" || tour == null || !authReady) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="mx-auto max-w-3xl px-6 pt-32 pb-20 text-center text-neutral-700">
          {tour === "error" ? tt.errMsg : "…"}
        </div>
        <MainFooter />
      </main>
    );
  }

  const perPerson = perPersonForCount(tour, people);
  const total = perPerson * people;

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
    } catch {
      setNotice(tt.errMsg);
    } finally {
      setBusy(false);
    }
  }

  // 2) Rehber kabul etti (Confirmed) → TAMİ ödemesini başlat.
  async function payNow() {
    if (!bookingId) return;
    setBusy(true);
    setNotice(null);
    try {
      const headers = await buildAuthHeaders({ extra: { "Content-Type": "application/json" } });
      const res = await fetch(`${API_BASE_URL}/api/payments/tami/initiate`, {
        method: "POST",
        headers,
        body: JSON.stringify({ bookingId }),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.redirectUrl) {
        // TAMİ Ortak Ödeme Sayfası'na yönlen (kart bilgisi orada girilir).
        window.location.href = d.redirectUrl;
        return;
      }
      if (res.status === 503) { setNotice(tt.coComingSoon); return; }
      setNotice(d.message ?? d.error ?? tt.errMsg);
    } catch {
      setNotice(tt.errMsg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAFB] text-[#0A0A0F]">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <Link
          href={`/tours/${tour.id}/guides?date=${date}&people=${people}`}
          className="text-sm font-semibold text-[#6C4CF1] hover:underline"
        >
          ← {tt.coBack}
        </Link>
        <h1 className="mt-3 text-3xl md:text-4xl font-black">{tt.coTitle}</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_360px] items-start">
          <div className="space-y-6">
            <section className="rounded-2xl bg-white border border-black/[0.06] p-6">
              {/* Durum makinesi: talep yok → onay bekleniyor → öde → red */}
              {notice && (
                <div className="mb-4 rounded-xl bg-[#6C4CF1]/[0.06] border border-[#6C4CF1]/20 px-4 py-3 text-sm text-[#4a37b8] font-medium">
                  {notice}
                </div>
              )}

              {/* Aşama A — henüz talep yok: sözleşme + rezervasyon talebi */}
              {!bookingId && (
                <>
                  <h2 className="text-lg font-black mb-3">Confirm your reservation</h2>
                  <p className="text-sm text-neutral-700 mb-4">
                    We&apos;ll send your request to the guide. Once they accept, you can pay securely.
                  </p>
                  <label className="mb-4 flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 accent-[#6C4CF1]"
                    />
                    <span className="text-xs leading-relaxed text-neutral-700">
                      {tt.coAgreeText}{" "}
                      <Link href="/mesafeli-satis" target="_blank" className="font-semibold text-[#6C4CF1] hover:underline">
                        {tt.coDistanceContract}
                      </Link>{" "}
                      <Link href="/on-bilgilendirme" target="_blank" className="font-semibold text-[#6C4CF1] hover:underline">
                        {tt.coAndPreInfo}
                      </Link>.
                    </span>
                  </label>
                  <button
                    onClick={createBooking}
                    disabled={busy || !agreed}
                    className="w-full rounded-full bg-[#6C4CF1] text-white font-bold py-3.5 hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
                  >
                    {busy ? "…" : "Send reservation request"}
                  </button>
                </>
              )}

              {/* Aşama B — Pending: rehber onayı bekleniyor */}
              {bookingId && status === "pending" && (
                <div className="text-center py-4">
                  <div className="w-12 h-12 rounded-full border-2 border-[#6C4CF1] border-t-transparent animate-spin mx-auto mb-4" />
                  <h2 className="text-lg font-black">Waiting for guide approval</h2>
                  <p className="mt-1 text-sm text-neutral-700">
                    Your request was sent. This page updates automatically when the guide accepts.
                  </p>
                  <button
                    onClick={() => bookingId && refreshBooking(bookingId)}
                    className="mt-4 text-sm font-bold text-[#6C4CF1] hover:underline"
                  >
                    Check now
                  </button>
                  <p className="mt-4 text-xs text-neutral-500">
                    You can also track it in{" "}
                    <Link href="/profile" className="font-semibold text-[#6C4CF1] hover:underline">My reservations</Link>.
                  </p>
                </div>
              )}

              {/* Aşama C — Confirmed: ödeme */}
              {bookingId && status === "confirmed" && (
                <>
                  <div className="mb-4 rounded-xl bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-700 font-medium">
                    Your guide accepted! Complete your payment to confirm the tour.
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-black">{tt.coPayWith}</h2>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/visamastercard.jpg" alt="Visa · Mastercard · Amex · Troy" className="h-6 w-auto opacity-90" />
                  </div>
                  <button
                    onClick={payNow}
                    disabled={busy}
                    className="w-full rounded-full bg-[#6C4CF1] text-white font-bold py-3.5 hover:bg-[#5a3dd4] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ boxShadow: "0 4px 20px rgba(108,76,241,0.3)" }}
                  >
                    {busy ? "…" : <>{tt.coPayNow} · <Price amount={total} currency={tour.currency} /></>}
                  </button>
                  <p className="mt-4 text-[11px] leading-relaxed text-neutral-500">{tt.coProvider}</p>
                </>
              )}

              {/* Aşama D — Paid */}
              {bookingId && status === "paid" && (
                <div className="text-center py-4">
                  <h2 className="text-lg font-black text-green-700">Payment complete 🎉</h2>
                  <p className="mt-1 text-sm text-neutral-700">Your tour is booked. See details in your reservations.</p>
                  <Link href="/profile" className="mt-4 inline-block rounded-full bg-[#6C4CF1] text-white font-bold px-6 py-2.5 text-sm">
                    My reservations
                  </Link>
                </div>
              )}

              {/* Aşama E — Reddedildi / iptal */}
              {bookingId && (status === "rejected" || status === "cancelled") && (
                <div className="text-center py-4">
                  <h2 className="text-lg font-black text-neutral-800">
                    {status === "rejected" ? "Guide couldn't accept" : "Reservation cancelled"}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-700">Try another guide or date — no charge was made.</p>
                  <Link
                    href={`/tours/${id}/guides?date=${date}&people=${people}`}
                    className="mt-4 inline-block text-sm font-bold text-[#6C4CF1] hover:underline"
                  >
                    Choose another guide
                  </Link>
                </div>
              )}
            </section>
          </div>

          {/* Sağ: sipariş özeti */}
          <aside className="rounded-2xl bg-white border border-black/[0.06] p-6 md:sticky md:top-24">
            <h2 className="text-sm font-black uppercase tracking-wide text-neutral-800 mb-4">{tt.coSummary}</h2>
            {tour.coverPhotoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={tour.coverPhotoUrl} alt={tour.title} className="w-full h-32 object-cover rounded-xl mb-4" />
            )}
            <p className="font-black leading-snug">{tour.title}</p>
            <p className="text-xs text-neutral-700 mb-4">{tour.provinceName || tour.city}</p>

            <div className="space-y-2 text-sm border-t border-black/[0.06] pt-4">
              {date && (
                <div className="flex justify-between">
                  <span className="text-neutral-700">{tt.bkDate}</span>
                  <span className="font-semibold">{date}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-700">{tt.bkTravelers}</span>
                <span className="font-semibold">{people}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-700">{tt.perPerson}</span>
                <span className="font-semibold"><Price amount={perPerson} currency={tour.currency} /></span>
              </div>
            </div>

            <div className="flex justify-between items-baseline border-t border-black/[0.06] mt-4 pt-4">
              <span className="font-black">{tt.bkTotal}</span>
              <span className="text-2xl font-black text-[#6C4CF1]"><Price amount={total} currency={tour.currency} /></span>
            </div>
          </aside>
        </div>
      </div>

      <MainFooter />
    </main>
  );
}
