"use client";

import { useEffect, useState } from "react";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";

type State = "working" | "done" | "error";

export default function VerifiedPage() {
  const [state, setState] = useState<State>("working");

  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged(async (user) => {
      // No signed-in user → just show success (they verified, can sign in later)
      if (!user) { setState("done"); return; }

      try {
        // Refresh so emailVerified=true is reflected in the ID token
        await user.reload();
        const headers = await buildAuthHeaders({
          forceRefresh: true,
          extra: { "Content-Type": "application/json" },
        });

        // Already registered?
        const meRes = await fetch(`${API_BASE_URL}/api/auth/me`, { headers });
        if (meRes.ok) { setState("done"); return; }

        // Not in DB yet → complete the pending registration
        const pendingRaw = localStorage.getItem("vg_pending_register");
        const pending = pendingRaw ? JSON.parse(pendingRaw) : null;
        const fullName = pending?.fullName || user.displayName || (user.email?.split("@")[0] ?? "Traveller");

        const regRes = await fetch(`${API_BASE_URL}/api/auth/register-tourist`, {
          method: "POST",
          headers,
          body: JSON.stringify({ fullName }),
        });

        if (regRes.ok || regRes.status === 409) {
          localStorage.removeItem("vg_pending_register");
          setState("done");
        } else {
          setState("error");
        }
      } catch {
        setState("error");
      }
    });
    return () => unsub();
  }, []);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-500/6 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-md text-center">
        <a href="/" className="inline-flex items-center gap-2.5 text-xl font-black text-[#0A0A0F] mb-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32} style={{ mixBlendMode: "multiply" }} />
          VibeGuide
        </a>

        <div className="bg-white border border-black/[0.06] rounded-3xl p-10 shadow-sm">
          {state === "working" ? (
            <>
              <div className="w-10 h-10 rounded-full border-2 border-[#6C4CF1] border-t-transparent animate-spin mx-auto mb-6" />
              <h1 className="text-xl font-black text-[#0A0A0F]">Setting up your account…</h1>
              <p className="mt-2 text-sm text-neutral-800">Just a moment.</p>
            </>
          ) : state === "error" ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h1 className="text-2xl font-black text-[#0A0A0F]">Email verified ✓</h1>
              <p className="mt-2 text-sm text-neutral-800 leading-6">
                Your email is confirmed, but we couldn&apos;t finish account setup automatically. Please sign in to continue.
              </p>
              <a href="/" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#6C4CF1] text-white font-bold px-7 py-3 text-sm hover:bg-[#5a3dd4] transition-colors">
                Continue to VibeGuide →
              </a>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h1 className="text-2xl font-black text-[#0A0A0F]">You&apos;re all set! 🎉</h1>
              <p className="mt-2 text-sm text-neutral-800 leading-6">
                Your email is confirmed and your account is ready. Start exploring with local guides.
              </p>
              <a href="/" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#6C4CF1] text-white font-bold px-7 py-3 text-sm hover:bg-[#5a3dd4] transition-colors"
                style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
                Continue to VibeGuide →
              </a>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
