"use client";

import { useEffect, useState } from "react";
import { useT } from "@/components/LanguageProvider";
import { API_BASE_URL } from "@/lib/api";
import Navbar from "@/components/Navbar";

interface GuideRow {
  id: number;
  fullName: string;
  photoUrl: string | null;
  city: string | null;
  languages: string | null;
  yearsOfExperience: number;
  rating: number;
  bio: string | null;
}

const LANG_LABEL: Record<string, string> = {
  en: "EN", tr: "TR", de: "DE", fr: "FR", ru: "RU", es: "ES", it: "IT",
  ar: "AR", zh: "ZH", ja: "JA", ko: "KO", nl: "NL", pl: "PL", pt: "PT",
};

export default function GuidesDirectoryPage() {
  const { locale } = useT();
  const [guides, setGuides] = useState<GuideRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCity, setActiveCity] = useState("All");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/guides/directory?limit=100`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : []))
      .then((d: GuideRow[]) => { setGuides(d); setLoading(false); })
      .catch(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const cities = ["All", ...Array.from(new Set(guides.map((g) => g.city).filter(Boolean) as string[])).sort()];
  const filtered = activeCity === "All" ? guides : guides.filter((g) => g.city === activeCity);

  return (
    <main className="min-h-screen bg-white text-[#0A0A0F] antialiased">
      <Navbar />

      {/* Hero */}
      <section className="bg-white pt-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#6C4CF1]/6 to-transparent rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #6C4CF1 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">Meet the locals</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#0A0A0F] leading-tight">
            Our verified guides
          </h1>
          <p className="mt-5 text-base text-neutral-400 max-w-xl mx-auto leading-7">
            Every VibeGuide is licensed, identity-verified and reviewed after each tour. Meet the real locals who&apos;ll show you their city.
          </p>
        </div>
        <div className="h-px bg-black/[0.06] mx-6" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        {/* City filter */}
        {cities.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {cities.map((c) => (
              <button key={c} onClick={() => setActiveCity(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all ${activeCity === c ? "bg-[#6C4CF1] text-white border-[#6C4CF1]" : "bg-white border-black/10 text-neutral-500 hover:border-[#6C4CF1]/40"}`}>
                {c}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="h-44 rounded-3xl bg-neutral-100 animate-pulse" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            <p className="text-5xl mb-4">🧭</p>
            <p className="text-base font-semibold text-[#0A0A0F]">No guides yet</p>
            <p className="text-sm mt-1">Verified guides are joining soon. Check back shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((g) => {
              const langs = (g.languages ?? "").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4);
              const initials = g.fullName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
              return (
                <a key={g.id} href={`/guides/${g.id}`}
                  className="group rounded-3xl bg-white border border-black/[0.06] shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all flex gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-[#6C4CF1] to-[#8B5CF6] flex items-center justify-center text-lg font-black text-white shrink-0">
                    {g.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={g.photoUrl} alt={g.fullName} className="w-full h-full object-cover" />
                    ) : initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-black text-[#0A0A0F] leading-tight group-hover:text-[#6C4CF1] transition-colors">{g.fullName}</h2>
                    <div className="flex items-center gap-2 mt-1 text-xs text-neutral-400">
                      {g.city && <span>📍 {g.city}</span>}
                      {g.rating > 0 && (
                        <span className="flex items-center gap-0.5 font-bold text-[#0A0A0F]">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="#F59E0B" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                          {g.rating.toFixed(1)}
                        </span>
                      )}
                    </div>
                    {g.bio && <p className="mt-2 text-xs text-neutral-500 leading-5 line-clamp-2">{g.bio}</p>}
                    {langs.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {langs.map((l) => (
                          <span key={l} className="px-1.5 py-0.5 rounded-full bg-[#F7F7FB] border border-black/[0.05] text-[9px] font-bold text-neutral-500">
                            {LANG_LABEL[l.toLowerCase()] ?? l.toUpperCase()}
                          </span>
                        ))}
                        {g.yearsOfExperience > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full bg-[#6C4CF1]/8 text-[9px] font-bold text-[#6C4CF1]">{g.yearsOfExperience}+ yrs</span>
                        )}
                      </div>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </section>

      {/* Become a guide CTA */}
      <section className="py-16 bg-[#F7F7FB]">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-3xl bg-gradient-to-r from-[#6C4CF1] to-[#8B5CF6] p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-black text-white">Are you a licensed local guide?</h2>
            <p className="mt-2 text-white/70 text-sm leading-6 max-w-md mx-auto">
              Join VibeGuide, share your city&apos;s stories, and earn doing what you love. Verification takes 1–2 days.
            </p>
            <a href="/register/guide" className="mt-6 inline-block bg-white text-[#6C4CF1] font-black text-sm px-7 py-3 rounded-2xl hover:bg-white/90 transition-colors">
              Apply to become a guide →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
