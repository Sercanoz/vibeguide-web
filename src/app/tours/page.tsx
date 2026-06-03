"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import TourFilters from "./TourFilters";

interface Tour {
  id: number;
  title: string;
  summary: string;
  city: string;
  category: string;
  durationMinutes: number;
  basePrice: number;
  compareAtPrice?: number;
  currency: string;
  coverPhotoUrl?: string;
  languagesOffered?: string;
}

export default function ToursPage() {
  const { locale } = useT();
  const tt = getToursT(locale);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/tours?locale=${locale}`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => { setTours(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [locale]);

  return (
    <main className="min-h-screen bg-white text-[#0A0A0F] antialiased">
      <Navbar activePage="tours" />

      {/* Hero */}
      <section className="bg-white pt-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#6C4CF1]/6 via-[#8B5CF6]/3 to-transparent rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#6C4CF1]/4 to-transparent rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #6C4CF1 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">
            {tt.heroBadge}
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#0A0A0F] leading-tight">
            {tt.heroTitle1}
            <br />
            <span className="bg-gradient-to-r from-[#6C4CF1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              {tt.heroTitle2}
            </span>
          </h1>
          <p className="mt-6 text-base text-neutral-800 max-w-xl mx-auto leading-7">
            {tt.heroSub}
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-neutral-800">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />{tt.heroLive}</span>
            <span className="text-black/20">·</span>
            <span>{tt.heroVerified}</span>
            <span className="text-black/20">·</span>
            <span>{tt.heroBook}</span>
          </div>
        </div>
        <div className="h-px bg-black/[0.06] mx-6" />
      </section>

      {/* Tour grid with filters */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-3xl bg-neutral-100 animate-pulse h-80" />
            ))}
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-24 text-neutral-800">
            <p className="text-6xl mb-4">🗺️</p>
            <p className="text-xl font-bold text-[#0A0A0F]">Tours coming soon</p>
            <p className="text-sm mt-2">
              We&apos;re adding new tours regularly. Download the app to get notified.
            </p>
            <a
              href="/#download"
              className="mt-8 inline-block rounded-full bg-[#6C4CF1] text-white px-7 py-3 text-sm font-bold hover:bg-[#5a3dd4] transition-colors"
            >
              Download App →
            </a>
          </div>
        ) : (
          <TourFilters tours={tours} />
        )}
      </section>

      <MainFooter />
    </main>
  );
}
