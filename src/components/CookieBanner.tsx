"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/components/LanguageProvider";

type Consent = "accepted" | "declined" | null;

export default function CookieBanner() {
  const { locale } = useT();
  const tr = locale === "tr";
  const cc = {
    title: tr ? "Çerez kullanıyoruz 🍪" : "We use cookies 🍪",
    body: tr
      ? "Dil tercihini hatırlamak ve deneyimini geliştirmek için çerezler kullanıyoruz. Analitik çerezler ziyaretçilerin sitemizi nasıl kullandığını anlamamıza yardımcı olur."
      : "We use cookies to remember your language preference and improve your experience. Analytics cookies help us understand how visitors use our site.",
    essential: tr ? "Zorunlu" : "Essential",
    essentialDesc: tr ? "Dil tercihi, oturum. Her zaman aktif." : "Language preference, session. Always active.",
    analytics: tr ? "Analitik" : "Analytics",
    analyticsDesc: tr ? "Google Analytics — anonim sayfa görüntüleme istatistikleri." : "Google Analytics — anonymous page view statistics.",
    alwaysOn: tr ? "Her zaman açık" : "Always on",
    optional: tr ? "İsteğe bağlı" : "Optional",
    hideDetails: tr ? "Detayları gizle ▲" : "Hide details ▲",
    showDetails: tr ? "Çerez detayları ▼" : "Cookie details ▼",
    decline: tr ? "Reddet" : "Decline",
    acceptAll: tr ? "Tümünü kabul et" : "Accept all",
  };
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("vg_cookie_consent") as Consent;
    if (!stored) {
      // slight delay so page loads first
      setTimeout(() => setVisible(true), 800);
    } else {
      setConsent(stored);
      if (stored === "accepted") enableAnalytics();
    }
  }, []);

  function enableAnalytics() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "denied" });
    }
  }

  function accept() {
    localStorage.setItem("vg_cookie_consent", "accepted");
    setConsent("accepted");
    setVisible(false);
    enableAnalytics();
  }

  function decline() {
    localStorage.setItem("vg_cookie_consent", "declined");
    setConsent("declined");
    setVisible(false);
  }

  if (!visible || consent !== null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div
        className="pointer-events-auto mx-auto max-w-2xl bg-white rounded-3xl border border-black/[0.08] shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)" }}
      >
        {/* Top accent */}
        <div className="h-0.5 w-full bg-gradient-to-r from-[#6C4CF1] via-[#8B5CF6] to-[#EC4899]" />

        <div className="px-6 py-5">
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="w-10 h-10 rounded-2xl bg-[#6C4CF1]/8 flex items-center justify-center shrink-0 mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6C4CF1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10"/>
                <path d="M14.5 9.5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0z"/>
                <path d="M16 14a6 6 0 0 1-4 2 6 6 0 0 1-4-2"/>
                <circle cx="19" cy="19" r="3"/>
                <path d="M22 22l-1.5-1.5"/>
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-[#0A0A0F]">{cc.title}</p>
              <p className="mt-1 text-xs text-neutral-800 leading-5">
                {cc.body}
                {" "}
                <Link href="/privacy" className="text-[#6C4CF1] font-semibold hover:underline">Privacy Policy</Link>
                {" · "}
                <Link href="/kvkk" className="text-[#6C4CF1] font-semibold hover:underline">KVKK</Link>
              </p>

              {/* Details toggle */}
              {showDetails && (
                <div className="mt-3 space-y-2">
                  {[
                    { name: cc.essential, desc: cc.essentialDesc, always: true },
                    { name: cc.analytics, desc: cc.analyticsDesc, always: false },
                  ].map((c) => (
                    <div key={c.name} className="flex items-center justify-between bg-neutral-50 rounded-xl px-3 py-2">
                      <div>
                        <p className="text-xs font-bold text-[#0A0A0F]">{c.name}</p>
                        <p className="text-[10px] text-neutral-800">{c.desc}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.always ? "bg-emerald-100 text-emerald-700" : "bg-[#6C4CF1]/10 text-[#6C4CF1]"}`}>
                        {c.always ? cc.alwaysOn : cc.optional}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => setShowDetails(v => !v)}
                className="mt-2 text-[10px] font-semibold text-neutral-800 hover:text-[#0A0A0F] transition-colors"
              >
                {showDetails ? cc.hideDetails : cc.showDetails}
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={decline}
              className="flex-1 py-2.5 rounded-2xl border border-black/10 text-sm font-bold text-neutral-700 hover:bg-neutral-50 hover:border-black/20 transition-all"
            >
              {cc.decline}
            </button>
            <button
              onClick={accept}
              className="flex-1 py-2.5 rounded-2xl bg-[#6C4CF1] text-white text-sm font-bold hover:bg-[#5a3dd4] transition-colors"
              style={{ boxShadow: "0 2px 12px rgba(108,76,241,0.25)" }}
            >
              {cc.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
