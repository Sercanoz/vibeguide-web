"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import { track } from "@/lib/analytics";

function SuccessInner() {
  const search = useSearchParams();
  const bookingId = search.get("bookingId");
  const { locale } = useT();
  const tt = getToursT(locale);

  // Bazı bankalar 3DS dönüşünü kendi çerçeveleri içinde yapıyor; sonuç ekranı
  // o çerçevenin içinde sıkışmasın (kullanıcı navbar'sız dar bir kutu görür).
  useEffect(() => {
    if (window.top && window.top !== window.self) {
      window.top.location.href = window.location.href;
      return; // olay üst pencerede gönderilecek
    }
    // GA4 purchase — checkout'ta bırakılan tutarla, rezervasyon başına bir kez.
    try {
      const raw = sessionStorage.getItem("vg_ga_purchase");
      if (raw) {
        const p = JSON.parse(raw) as { bookingId: number; value: number; currency: string; item: object };
        if (!bookingId || String(p.bookingId) === bookingId) {
          track("purchase", { transaction_id: String(p.bookingId), value: p.value, currency: p.currency, items: [p.item] });
        }
        sessionStorage.removeItem("vg_ga_purchase");
      }
    } catch { /* yoksay */ }
  }, [bookingId]);

  return (
    <main className="min-h-screen bg-[#FAFAFB] text-[#0A0A0F]">
      <Navbar />
      <div className="mx-auto max-w-lg px-6 pt-32 pb-24 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-display font-normal">{tt.paySuccessTitle}</h1>
        <p className="mt-3 text-neutral-700">
          {tt.paySuccessSub}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/profile" className="rounded-full bg-[#5B3FD9] text-white font-bold px-6 py-3 text-sm hover:bg-[#4A32B8] transition-colors">
            {tt.coMyReservations}
          </Link>
          <Link href="/tours" className="rounded-full border border-black/10 font-bold px-6 py-3 text-sm hover:bg-neutral-50 transition-colors">
            {tt.payExplore}
          </Link>
        </div>
        {/* Destek/iletişim için referans — çıplak "#52" ne olduğu anlaşılmıyordu.
            Etiket şimdilik EN (ödeme akışı i18n'i ayrı iş olarak bekliyor). */}
        {bookingId && (
          <p className="mt-6 text-xs text-neutral-500">
            Reservation reference: <span className="font-semibold">#{bookingId}</span>
          </p>
        )}
      </div>
      <MainFooter />
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFB]" />}>
      <SuccessInner />
    </Suspense>
  );
}
