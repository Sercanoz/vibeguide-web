"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";
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
  const id = params?.id as string;
  const { locale } = useT();
  const tt = getToursT(locale);

  const date = search.get("date") ?? "";
  const people = Math.max(1, parseInt(search.get("people") ?? "1", 10) || 1);

  const [tour, setTour] = useState<CheckoutTour | null | "loading" | "error">("loading");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE_URL}/api/tours/${id}?locale=${locale}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : "error"))
      .then((d) => setTour(d ?? "error"))
      .catch(() => setTour("error"));
  }, [id, locale]);

  if (tour === "loading" || tour === "error" || tour == null) {
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

  function pay() {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setNotice(tt.coFillAll);
      return;
    }
    // iyzico API anahtarı geldiğinde burada gerçek ödeme oturumu açılacak
    // (createCheckoutForm → iyzico'ya güvenli yönlendirme).
    setNotice(tt.coRedirectNote);
  }

  const inputCls =
    "w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#6C4CF1] focus:ring-2 focus:ring-[#6C4CF1]/10 transition-all";

  return (
    <main className="min-h-screen bg-[#FAFAFB] text-[#0A0A0F]">
      <Navbar />

      <div className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <Link href={`/tours/${tour.id}`} className="text-sm font-semibold text-[#6C4CF1] hover:underline">
          ← {tt.coBack}
        </Link>
        <h1 className="mt-3 text-3xl md:text-4xl font-black">{tt.coTitle}</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-[1fr_360px] items-start">
          {/* Sol: alıcı bilgileri + ödeme */}
          <div className="space-y-6">
            <section className="rounded-2xl bg-white border border-black/[0.06] p-6">
              <h2 className="text-lg font-black mb-4">{tt.coContact}</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">{tt.coName}</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} className={inputCls} autoComplete="name" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">{tt.coEmail}</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} autoComplete="email" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">{tt.coPhone}</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} autoComplete="tel" placeholder="+90 5xx xxx xx xx" />
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-black/[0.06] p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-black">{tt.coPayWith}</h2>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/iyzico-cards.png" alt="iyzico · Visa · Mastercard · Amex · Troy" className="h-6 w-auto opacity-90" />
              </div>
              <p className="text-xs text-neutral-700 leading-5 mb-4">{tt.coSecureNote}</p>

              {notice && (
                <div className="mb-4 rounded-xl bg-[#6C4CF1]/[0.06] border border-[#6C4CF1]/20 px-4 py-3 text-sm text-[#4a37b8] font-medium">
                  {notice}
                </div>
              )}

              <button
                onClick={pay}
                className="w-full rounded-full bg-[#6C4CF1] text-white font-bold py-3.5 hover:bg-[#5a3dd4] transition-colors flex items-center justify-center gap-2"
                style={{ boxShadow: "0 4px 20px rgba(108,76,241,0.3)" }}
              >
                {tt.coPayNow} · <Price amount={total} currency={tour.currency} />
              </button>
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
              <div className="flex justify-between">
                <span className="text-neutral-700">{tt.coTour}</span>
                <span className="font-semibold text-right">{tour.title}</span>
              </div>
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
