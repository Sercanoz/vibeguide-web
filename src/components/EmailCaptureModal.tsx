"use client";

import { useEffect, useRef, useState } from "react";
import { useT } from "./LanguageProvider";
import { API_BASE_URL } from "@/lib/api";

const DELAY_MS = 15000;
const STORAGE_KEY = "vg_email_capture"; // "dismissed" | "subscribed"

export default function EmailCaptureModal() {
  const { locale } = useT();
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
    if (!email.trim() || !email.includes("@")) { setError("Please enter a valid email."); return; }
    setState("loading");
    try {
      const res = await fetch(`${API_BASE_URL}/api/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "homepage_popup", locale }),
      });
      if (!res.ok) { setError("Something went wrong. Try again."); setState("form"); return; }
      const data = await res.json();
      setCode(data.promoCode ?? null);
      setState("done");
      localStorage.setItem(STORAGE_KEY, "subscribed");
    } catch {
      setError("Network error. Try again.");
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
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-neutral-600 hover:text-neutral-700 transition-colors text-sm">
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
              <h2 className="text-2xl font-black text-[#0A0A0F]">You&apos;re in! 🎉</h2>
              <p className="mt-2 text-sm text-neutral-500 leading-6">
                Here&apos;s your <strong>10% off</strong> code. We also emailed it to you.
              </p>
              <div className="mt-5 bg-[#F7F7FB] border-2 border-dashed border-[#6C4CF1] rounded-2xl py-4">
                <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Your code</p>
                <p className="text-2xl font-black text-[#6C4CF1] font-mono mt-1">{code}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={copyCode}
                  className="flex-1 rounded-2xl border border-black/10 py-2.5 text-sm font-bold text-[#0A0A0F] hover:bg-neutral-50 transition-colors">
                  {copied ? "Copied ✓" : "Copy code"}
                </button>
                <a href="/tours" onClick={dismiss}
                  className="flex-1 rounded-2xl bg-[#6C4CF1] text-white py-2.5 text-sm font-bold hover:bg-[#5a3dd4] transition-colors text-center">
                  Browse tours →
                </a>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black text-[#0A0A0F] text-center">Get 10% off your first tour</h2>
              <p className="mt-2 text-sm text-neutral-500 text-center leading-6">
                Join travelers exploring Turkey with verified local guides. Drop your email — we&apos;ll send a discount code instantly.
              </p>
              <form onSubmit={onSubmit} className="mt-5 space-y-3">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-black/10 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#6C4CF1] focus:ring-2 focus:ring-[#6C4CF1]/10 transition-all"
                  placeholder="you@example.com" autoFocus />
                {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
                <button type="submit" disabled={state === "loading"}
                  className="w-full rounded-2xl bg-[#6C4CF1] text-white font-bold py-3.5 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
                  style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
                  {state === "loading" ? "Getting your code…" : "Get my 10% off →"}
                </button>
              </form>
              <button onClick={dismiss} className="mt-3 w-full text-center text-xs text-neutral-600 hover:text-neutral-600 transition-colors">
                No thanks, maybe later
              </button>
              <p className="mt-3 text-[10px] text-neutral-500 text-center">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
