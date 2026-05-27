"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
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
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-xl border-b border-black/[0.06] shadow-sm shadow-black/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          <a href="/" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-[#0A0A0F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32} style={{ mixBlendMode: "multiply" }} />
            VibeGuide
          </a>
          <div className="hidden gap-8 text-sm font-medium md:flex">
            <a href="/#how" className="text-neutral-500 hover:text-black transition-colors">How It Works</a>
            <a href="/#modes" className="text-neutral-500 hover:text-black transition-colors">VibeNow</a>
            <a href="/tours" className="text-[#6C4CF1] font-semibold">Tours</a>
            <a href="/#destinations" className="text-neutral-500 hover:text-black transition-colors">Destinations</a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="/#download"
              className="rounded-full bg-[#6C4CF1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a3dd4] transition-colors shadow-sm"
            >
              Get the App
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-[#0A0A0F] pt-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6C4CF1]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">
            Curated Experiences
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight">
            Explore Our
            <br />
            <span className="bg-gradient-to-r from-[#6C4CF1] via-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
              Tours
            </span>
          </h1>
          <p className="mt-6 text-base text-white/50 max-w-xl mx-auto leading-7">
            Handcrafted itineraries led by verified local guides. From ancient ruins to
            hidden food spots — find the perfect tour for your next adventure in Turkey.
          </p>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/30">
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />Live availability</span>
            <span>·</span>
            <span>100% verified guides</span>
            <span>·</span>
            <span>Book via app</span>
          </div>
        </div>
        <div className="h-8 bg-gradient-to-b from-[#0A0A0F] to-white" />
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
          <div className="text-center py-24 text-neutral-400">
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

      {/* Footer */}
      <footer className="bg-[#F7F7FB] border-t border-black/[0.06] px-6 py-12 mt-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
          <a href="/" className="flex items-center gap-2 font-black text-[#0A0A0F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vibeguide-icon.png" alt="VibeGuide" width={24} height={24} style={{ mixBlendMode: "multiply" }} />
            VibeGuide
          </a>
          <p>© {new Date().getFullYear()} VibeCore Turizm Ltd. Şti. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="hover:text-black transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-black transition-colors">Terms</a>
            <a href="/contact" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
