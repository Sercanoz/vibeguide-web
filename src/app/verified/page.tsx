"use client";

export default function VerifiedPage() {
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
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black text-[#0A0A0F]">Email verified! 🎉</h1>
          <p className="mt-2 text-sm text-neutral-400 leading-6">
            Your email address has been confirmed. You can now sign in and start exploring.
          </p>
          <a
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#6C4CF1] text-white font-bold px-7 py-3 text-sm hover:bg-[#5a3dd4] transition-colors"
            style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}
          >
            Continue to VibeGuide →
          </a>
        </div>
      </div>
    </main>
  );
}
