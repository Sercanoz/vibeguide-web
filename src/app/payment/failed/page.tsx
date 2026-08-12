"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import { paymentErrorText } from "@/lib/paymentErrors";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";

function FailedInner() {
  const search = useSearchParams();
  const reason = search.get("reason") ?? "";
  // Banka ret kodu — "son kullanma tarihi hatalı" gibi kullanıcının kendi
  // düzeltebileceği sebepleri açıkça söyleyebilmek için.
  const code = search.get("code") ?? "";
  const { locale } = useT();
  const tt = getToursT(locale);
  const msg = paymentErrorText(reason, code, tt.coRejectedSub);

  // 3DS dönüşü banka çerçevesi içinde gelirse sonuç ekranını üst pencereye taşı.
  useEffect(() => {
    if (window.top && window.top !== window.self) {
      window.top.location.href = window.location.href;
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAFB] text-[#0A0A0F]">
      <Navbar />
      <div className="mx-auto max-w-lg px-6 pt-32 pb-24 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <h1 className="text-3xl font-black">{tt.payFailTitle}</h1>
        <p className="mt-3 text-neutral-700">{msg}</p>
        <p className="mt-2 text-sm text-neutral-500">
          Your reservation is still held — you can retry the payment from your reservations.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          {/* Birincil aksiyon rezervasyonlar: booking hâlâ Confirmed, oradan
              tekrar ödenebilir. (Eskiden "try again" /tours'a gidiyordu —
              kullanıcı akışa en baştan başlamak zorunda kalıyordu.) */}
          <Link href="/profile" className="rounded-full bg-[#6C4CF1] text-white font-bold px-6 py-3 text-sm hover:bg-[#5a3dd4] transition-colors">
            {tt.payTryAgain}
          </Link>
          <Link href="/tours" className="rounded-full border border-black/10 font-bold px-6 py-3 text-sm hover:bg-neutral-50 transition-colors">
            {tt.payExplore}
          </Link>
        </div>
      </div>
      <MainFooter />
    </main>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFB]" />}>
      <FailedInner />
    </Suspense>
  );
}
