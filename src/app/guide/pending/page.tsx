"use client";

import { useEffect, useState } from "react";
import { fbAuth } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";

export default function GuidePendingPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [status, setStatus] = useState<"pending" | "approved" | "rejected" | "loading">("loading");

  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged(async (user) => {
      if (!user) { window.location.href = "/login"; return; }
      setEmail(user.email);
      try {
        const token = await user.getIdToken(true);
        const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const me = await res.json();
          if (me.role === "Guide") { window.location.href = "/"; return; }
          if (me.role === "Tourist") { window.location.href = "/"; return; }
          if (me.role === "Admin") { window.location.href = "/admin/tours"; return; }
        }
        setStatus("pending");
      } catch {
        setStatus("pending");
      }
    });
    return () => unsub();
  }, []);

  if (status === "loading") {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#6C4CF1] border-t-transparent animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-amber-500/5 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-md text-center">
        <a href="/" className="inline-flex items-center gap-2.5 text-xl font-black text-[#0A0A0F] mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32} style={{ mixBlendMode: "multiply" }} />
          VibeGuide
        </a>

        <div className="bg-white border border-black/[0.06] rounded-3xl p-10 shadow-sm">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-3">Under Review</p>
          <h1 className="text-2xl font-black text-[#0A0A0F] leading-tight">Your application is being reviewed</h1>
          <p className="mt-3 text-sm text-neutral-400 leading-7">
            Our team is verifying your guide badge. This usually takes <strong className="text-[#0A0A0F]">1–2 business days</strong>.
          </p>
          {email && (
            <p className="mt-2 text-sm text-neutral-400">
              We&apos;ll notify you at <strong className="text-[#0A0A0F]">{email}</strong> once approved.
            </p>
          )}

          {/* Steps */}
          <div className="mt-8 space-y-3 text-left">
            {[
              { label: "Application submitted", done: true },
              { label: "Badge verification", done: false, active: true },
              { label: "Account approved", done: false },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  s.done ? "bg-emerald-500" : s.active ? "bg-amber-400" : "bg-neutral-100 border border-black/10"
                }`}>
                  {s.done && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  )}
                  {s.active && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                </div>
                <span className={`text-sm font-semibold ${s.done ? "text-emerald-600" : s.active ? "text-amber-700" : "text-neutral-400"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-black/[0.06] flex flex-col gap-3">
            <a
              href="mailto:support@vibeguideapp.com"
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-black/10 py-2.5 text-sm font-bold text-neutral-600 hover:border-[#6C4CF1]/30 hover:text-[#6C4CF1] transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Contact support
            </a>
            <a href="/" className="text-xs text-neutral-400 hover:text-black transition-colors">
              ← Back to homepage
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
