"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/components/LanguageProvider";

type Consent = "accepted" | "declined" | null;

function enableAnalytics() {
  const w = window as unknown as { gtag?: (...a: unknown[]) => void };
  if (typeof window !== "undefined" && w.gtag) {
    w.gtag("consent", "update", { analytics_storage: "granted", ad_storage: "denied" });
  }
}

export default function CookieBanner() {
  const { locale } = useT();
  const tr = locale === "tr";
  const cc = {
    title: tr ? "Çerez kullanıyoruz." : "We use cookies.",
    body: tr
      ? "Dil tercihini hatırlamak ve deneyimini geliştirmek için çerezler kullanıyoruz. Analitik çerezler ziyaretçilerin sitemizi nasıl kullandığını anlamamıza yardımcı olur."
      : "We use cookies to remember your language preference and improve your experience. Analytics cookies help us understand how visitors use our site.",
    essential: tr ? "Zorunlu" : "Essential",
    essentialDesc: tr ? "Dil tercihi, oturum. Her zaman aktif." : "Language preference, session. Always active.",
    analytics: tr ? "Analitik" : "Analytics",
    analyticsDesc: tr ? "Google Analytics — anonim sayfa görüntüleme istatistikleri." : "Google Analytics — anonymous page view statistics.",
    alwaysOn: tr ? "Her zaman açık" : "Always on",
    optional: tr ? "İsteğe bağlı" : "Optional",
    hideDetails: tr ? "Detayları gizle" : "Hide details",
    showDetails: tr ? "Detaylar" : "Details",
    privacy: tr ? "Gizlilik" : "Privacy Policy",
    decline: tr ? "Reddet" : "Decline",
    acceptAll: tr ? "Tümünü kabul et" : "Accept all",
  };
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("vg_cookie_consent") as Consent;
    // Kayıtlı tercih varsa banner zaten görünmez (visible false kalır) → state'e
    // yazmaya gerek yok; yalnız analytics onayını gtag'e yeniden bildir.
    let t: ReturnType<typeof setTimeout> | undefined;
    if (!stored) {
      // slight delay so page loads first
      t = setTimeout(() => setVisible(true), 800);
    } else if (stored === "accepted") {
      enableAnalytics();
    }
    // Footer'daki "Cookie settings" kontrolü bu event'i fırlatır → banner'ı
    // yeniden aç, kullanıcı tercihini değiştirebilsin (KVKK: geri alınabilirlik).
    const reopen = () => { setConsent(null); setVisible(true); };
    window.addEventListener("vg:open-cookie-settings", reopen);
    return () => {
      window.removeEventListener("vg:open-cookie-settings", reopen);
      if (t) clearTimeout(t);
    };
  }, []);

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
    // Reddedince analytics'i açıkça kapat (önceden accept edilmiş olabilir).
    const w = window as unknown as { gtag?: (...a: unknown[]) => void };
    if (typeof window !== "undefined" && w.gtag) {
      w.gtag("consent", "update", { analytics_storage: "denied", ad_storage: "denied" });
    }
  }

  if (!visible || consent !== null) return null;

  // Sade alt şerit: masaüstünde tek satır, mobilde kompakt kart. Emoji/gradient/mor
  // gölge yok. Reddet ve Kabul eşit boyutta (KVKK/GDPR: ret, kabul kadar kolay olmalı).
  return (
    <div role="region" aria-label={cc.title} className="fixed inset-x-0 bottom-0 z-50 p-3 md:p-4">
      <div className="mx-auto max-w-5xl rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.10)] md:px-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <div className="min-w-0 flex-1 text-sm leading-6 text-neutral-700">
            <span className="font-semibold text-neutral-900">{cc.title}</span>{" "}
            {cc.body}{" "}
            <Link href="/privacy" className="font-medium text-neutral-900 underline underline-offset-2">{cc.privacy}</Link>
            {" · "}
            <Link href="/kvkk" className="font-medium text-neutral-900 underline underline-offset-2">KVKK</Link>
            {" · "}
            <button type="button" onClick={() => setShowDetails((v) => !v)} aria-expanded={showDetails}
              className="font-medium text-neutral-900 underline underline-offset-2">
              {showDetails ? cc.hideDetails : cc.showDetails}
            </button>
          </div>
          <div className="flex shrink-0 gap-2">
            <button type="button" onClick={decline}
              className="h-10 flex-1 rounded-full border border-neutral-300 px-5 text-sm font-semibold text-neutral-900 hover:border-neutral-900 md:flex-none">
              {cc.decline}
            </button>
            <button type="button" onClick={accept}
              className="h-10 flex-1 rounded-full bg-neutral-900 px-5 text-sm font-semibold text-white hover:bg-neutral-700 md:flex-none">
              {cc.acceptAll}
            </button>
          </div>
        </div>

        {showDetails && (
          <ul className="mt-4 grid gap-2 border-t border-neutral-200 pt-4 sm:grid-cols-2">
            {[
              { name: cc.essential, desc: cc.essentialDesc, always: true },
              { name: cc.analytics, desc: cc.analyticsDesc, always: false },
            ].map((c) => (
              <li key={c.name} className="flex items-start justify-between gap-3 rounded-xl bg-neutral-50 px-3.5 py-2.5">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{c.name}</p>
                  <p className="text-xs leading-5 text-neutral-600">{c.desc}</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-neutral-500">{c.always ? cc.alwaysOn : cc.optional}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
