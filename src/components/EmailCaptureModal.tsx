"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "./LanguageProvider";
import { clientFetch } from "@/lib/api";

const DELAY_MS = 60000; // 1 dk — kullanıcı önce siteyi gezsin, sonra indirim teklifi
const STORAGE_KEY = "vg_email_capture"; // "dismissed" | "subscribed"

export default function EmailCaptureModal() {
  const { locale } = useT();
  const tr = locale === "tr";
  const ec = {
    youreIn: tr ? "Tamamdır! 🎉" : "You're in! 🎉",
    yourCode: tr ? "Kodun" : "Your code",
    copied: tr ? "Kopyalandı ✓" : "Copied ✓",
    copyCode: tr ? "Kodu kopyala" : "Copy code",
    browseTours: tr ? "Turlara göz at →" : "Browse tours →",
    title: tr ? "İlk turunda %10 indirim kazan" : "Get 10% off your first tour",
    sub: tr ? "Türkiye'yi doğrulanmış yerel rehberlerle keşfeden gezginlere katıl. E-postanı bırak — indirim kodunu anında gönderelim." : "Join travelers exploring Turkey with verified local guides. Drop your email — we'll send a discount code instantly.",
    submitLoading: tr ? "Kodun hazırlanıyor…" : "Getting your code…",
    submit: tr ? "%10 indirimimi al →" : "Get my 10% off →",
    noThanks: tr ? "Hayır, belki sonra" : "No thanks, maybe later",
    privacy: tr ? "Gizliliğine saygı duyuyoruz. İstediğin zaman çıkabilirsin." : "We respect your privacy. Unsubscribe anytime.",
    invalidEmail: tr ? "Lütfen geçerli bir e-posta gir." : "Please enter a valid email.",
    genericErr: tr ? "Bir şeyler ters gitti. Tekrar dene." : "Something went wrong. Try again.",
  };
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"form" | "loading" | "done">("form");
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Already dismissed or subscribed → never show again
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return;
    const t = setTimeout(() => setVisible(true), DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setVisible(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !email.includes("@")) { setError(ec.invalidEmail); return; }
    setState("loading");
    try {
      const res = await clientFetch(`/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "homepage_popup", locale }),
      });
      if (!res.ok) { setError(ec.genericErr); setState("form"); return; }
      const data = await res.json();
      setCode(data.promoCode ?? null);
      setState("done");
      localStorage.setItem(STORAGE_KEY, "subscribed");
    } catch {
      setError(tr ? "Ağ hatası. Tekrar dene." : "Network error. Try again.");
      setState("form");
    }
  }

  function copyCode() {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!visible) return null;

  return (
    <div ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease]"
      onClick={(e) => { if (e.target === overlayRef.current) dismiss(); }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <button onClick={dismiss}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-neutral-800 hover:text-neutral-800 transition-colors text-sm">
          ✕
        </button>

        {/* Top visual */}
        <div className="h-28 bg-gradient-to-br from-[#6C4CF1] to-[#8B5CF6] flex items-center justify-center relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -bottom-10 -left-6 w-28 h-28 bg-white/10 rounded-full" />
          <span className="text-5xl relative">🎁</span>
        </div>

        <div className="p-7">
          {state === "done" ? (
            <div className="text-center">
              <h2 className="text-2xl font-black text-[#0A0A0F]">{ec.youreIn}</h2>
              <p className="mt-2 text-sm text-neutral-700 leading-6">
                {tr ? <>İşte <strong>%10 indirim</strong> kodun. Ayrıca e-postayla da gönderdik.</> : <>Here&apos;s your <strong>10% off</strong> code. We also emailed it to you.</>}
              </p>
              <div className="mt-5 bg-[#F7F7FB] border-2 border-dashed border-[#6C4CF1] rounded-2xl py-4">
                <p className="text-[10px] font-bold text-neutral-800 uppercase tracking-widest">{ec.yourCode}</p>
                <p className="text-2xl font-black text-[#6C4CF1] font-mono mt-1">{code}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={copyCode}
                  className="flex-1 rounded-2xl border border-black/10 py-2.5 text-sm font-bold text-[#0A0A0F] hover:bg-neutral-50 transition-colors">
                  {copied ? ec.copied : ec.copyCode}
                </button>
                <a href="/tours" onClick={dismiss}
                  className="flex-1 rounded-2xl bg-[#6C4CF1] text-white py-2.5 text-sm font-bold hover:bg-[#5a3dd4] transition-colors text-center">
                  {ec.browseTours}
                </a>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black text-[#0A0A0F] text-center">{ec.title}</h2>
              <p className="mt-2 text-sm text-neutral-700 text-center leading-6">
                {ec.sub}
              </p>
              <form onSubmit={onSubmit} className="mt-5 space-y-3">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-black/10 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#6C4CF1] focus:ring-2 focus:ring-[#6C4CF1]/10 transition-all"
                  placeholder="you@example.com" autoFocus />
                {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                <button type="submit" disabled={state === "loading"}
                  className="w-full rounded-2xl bg-[#6C4CF1] text-white font-bold py-3.5 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
                  style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
                  {state === "loading" ? ec.submitLoading : ec.submit}
                </button>
              </form>
              <button onClick={dismiss} className="mt-3 w-full text-center text-xs text-neutral-800 hover:text-neutral-800 transition-colors">
                {ec.noThanks}
              </button>
              <p className="mt-3 text-[10px] text-neutral-700 text-center">
                {ec.privacy}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
