"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { API_BASE_URL, clientFetch } from "@/lib/api";

type State = "working" | "done" | "error";

function VerifyInner() {
  const params = useSearchParams();
  const [state, setState] = useState<State>("working");

  useEffect(() => {
    const token = params.get("token");
    if (!token) { setState("error"); return; }

    (async () => {
      try {
        // 1. Backend verifies the token + flips Firebase emailVerified=true
        const res = await clientFetch(`/api/auth/verify?token=${encodeURIComponent(token)}`);
        if (!res.ok) { setState("error"); return; }

        // 2. If a Firebase session exists, refresh it and complete DB registration
        const user = fbAuth().currentUser;
        if (user) {
          await user.reload();
          // refresh so emailVerified=true is in the token
          const headers = await buildAuthHeaders({
            forceRefresh: true,
            extra: { "Content-Type": "application/json" },
          });

          const meRes = await fetch(`${API_BASE_URL}/api/auth/me`, { headers });
          if (meRes.status === 404) {
            const pendingRaw = localStorage.getItem("vg_pending_register");
            const pending = pendingRaw ? JSON.parse(pendingRaw) : null;
            const fullName = pending?.fullName || user.displayName || (user.email?.split("@")[0] ?? "Traveller");
            await fetch(`${API_BASE_URL}/api/auth/register-tourist`, {
              method: "POST",
              headers,
              body: JSON.stringify({ fullName }),
            });
            localStorage.removeItem("vg_pending_register");
          }
        }

        setState("done");
      } catch {
        setState("error");
      }
    })();
  }, [params]);

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
              <h1 className="text-xl font-black text-[#0A0A0F]">Verifying your email…</h1>
              <p className="mt-2 text-sm text-neutral-800">Just a moment.</p>
            </>
          ) : state === "error" ? (
            <>
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h1 className="text-2xl font-black text-[#0A0A0F]">Link expired or invalid</h1>
              <p className="mt-2 text-sm text-neutral-800 leading-6">
                This verification link is no longer valid. Please sign in and request a new one.
              </p>
              <a href="/" className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#6C4CF1] text-white font-bold px-7 py-3 text-sm hover:bg-[#5a3dd4] transition-colors">
                Back to VibeGuide →
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
                Your email is confirmed and your account is ready. Sign in to start exploring with local guides.
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

export default function VerifyPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white" />}>
      <VerifyInner />
    </Suspense>
  );
}
