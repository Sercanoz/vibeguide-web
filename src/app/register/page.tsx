"use client";

import { useRedirectIfAuthed } from "@/hooks/useRedirectIfAuthed";

export default function RegisterChoicePage() {
  const checking = useRedirectIfAuthed();
  if (checking) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#6C4CF1] border-t-transparent animate-spin" />
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#6C4CF1]/6 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="relative w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="inline-flex items-center gap-2.5 text-xl font-black text-[#0A0A0F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32} style={{ mixBlendMode: "multiply" }} />
            VibeGuide
          </a>
          <p className="mt-6 text-3xl font-black text-[#0A0A0F]">Create your account</p>
          <p className="mt-1 text-sm text-neutral-800">How would you like to use VibeGuide?</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Tourist */}
          <a
            href="/register/tourist"
            className="group flex flex-col items-start gap-4 p-7 rounded-3xl border-2 border-black/[0.06] bg-white hover:border-[#6C4CF1]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="h-14 w-14 rounded-2xl bg-[#6C4CF1]/8 border border-[#6C4CF1]/12 flex items-center justify-center text-[#6C4CF1]">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#6C4CF1] mb-1">Traveller</p>
              <h2 className="text-lg font-black text-[#0A0A0F] leading-tight">I&apos;m a tourist</h2>
              <p className="mt-2 text-sm text-neutral-800 leading-6">Discover cities with verified local guides. Book instant tours or plan ahead.</p>
            </div>
            <span className="mt-auto flex items-center gap-1.5 text-sm font-bold text-[#6C4CF1] group-hover:gap-2.5 transition-all">
              Get started
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </a>

          {/* Guide */}
          <a
            href="/register/guide"
            className="group flex flex-col items-start gap-4 p-7 rounded-3xl border-2 border-black/[0.06] bg-white hover:border-[#10B981]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          >
            <div className="h-14 w-14 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="1"/>
                <path d="M9 20l1-5 2 2 1-5"/>
                <path d="M6 11l2-4h8l1 4"/>
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-1">Professional</p>
              <h2 className="text-lg font-black text-[#0A0A0F] leading-tight">I&apos;m a guide</h2>
              <p className="mt-2 text-sm text-neutral-800 leading-6">Share your city&apos;s stories. Earn income doing what you love with verified tourists.</p>
            </div>
            <span className="mt-auto flex items-center gap-1.5 text-sm font-bold text-emerald-600 group-hover:gap-2.5 transition-all">
              Apply now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </span>
          </a>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-800">
          Already have an account?{" "}
          <a href="/login" className="text-[#6C4CF1] font-bold hover:underline">Sign in</a>
        </p>
      </div>
    </main>
  );
}
