"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";

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
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAFB] text-[#0A0A0F]">
      <Navbar />
      <div className="mx-auto max-w-lg px-6 pt-32 pb-24 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-black">{tt.paySuccessTitle}</h1>
        <p className="mt-3 text-neutral-700">
          {tt.paySuccessSub}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/profile" className="rounded-full bg-[#6C4CF1] text-white font-bold px-6 py-3 text-sm hover:bg-[#5a3dd4] transition-colors">
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
