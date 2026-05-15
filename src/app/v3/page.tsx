import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VibeGuide — Real Local Guides. Real City Moments.",
  description:
    "Connect with verified local guides for instant tours, group experiences, and private city walks. Launching in Istanbul.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fffdf8] text-[#111]">

      {/* ── NAV ── */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <span className="text-xl font-black tracking-tight">VibeGuide</span>

        <div className="hidden items-center gap-8 text-sm font-medium text-neutral-500 md:flex">
          <a className="hover:text-[#111] transition-colors">VibeNow</a>
          <a className="hover:text-[#111] transition-colors">VibeSquad</a>
          <a className="hover:text-[#111] transition-colors">For Guides</a>
        </div>

        <button className="rounded-full bg-[#111] px-5 py-2.5 text-sm font-semibold text-white">
          Get the app
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="mx-auto max-w-7xl px-6 pb-10 pt-20 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FFC400]/40 bg-[#FFF9E0] px-4 py-1.5 text-sm font-semibold text-[#9A7000]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />
            Launching first in Istanbul
          </div>

          <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Travel like you<br />
            <span className="relative inline-block">
              <span className="relative z-10">belong here.</span>
              <span className="absolute inset-x-0 bottom-1 z-0 h-4 bg-[#FFC400]/30 md:h-5" />
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-neutral-500">
            Verified local guides, on demand. Go now, join a group, or book
            ahead — however you want to explore.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button className="rounded-2xl bg-[#FFC400] px-7 py-3.5 text-sm font-bold text-[#111] shadow-sm hover:bg-[#f5bc00] transition-colors">
              Explore Experiences
            </button>
            <button className="rounded-2xl border border-neutral-200 bg-white px-7 py-3.5 text-sm font-semibold text-neutral-600 hover:border-neutral-300 transition-colors">
              See how it works
            </button>
          </div>
        </div>

        {/* Hero mock card */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-[2rem] bg-white p-1.5 shadow-2xl shadow-black/8 ring-1 ring-black/5">
            <div className="rounded-[1.6rem] bg-gradient-to-b from-[#fffbe8] to-[#f9f9f6] p-7">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold ring-1 ring-black/5">
                  📍 Istanbul
                </span>
                <span className="rounded-full bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
                  ● Live soon
                </span>
              </div>

              <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-neutral-400">
                Available now
              </p>
              <h3 className="mt-1 text-2xl font-black">
                Your guide is one tap away.
              </h3>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    label: "VibeNow",
                    color: "text-amber-500",
                    title: "Tap. Match. Go.",
                    desc: "Connect with an available local guide right now.",
                  },
                  {
                    label: "VibeSquad",
                    color: "text-emerald-600",
                    title: "Travel together.",
                    desc: "Join other travelers, split the cost, share the moment.",
                  },
                ].map((c) => (
                  <div key={c.label} className="rounded-2xl bg-white p-5 ring-1 ring-black/5">
                    <p className={`text-xs font-bold ${c.color}`}>{c.label}</p>
                    <p className="mt-2 font-black">{c.title}</p>
                    <p className="mt-1 text-xs leading-5 text-neutral-500">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { icon: "✓", title: "Verified Guides", text: "Licensed, identity-checked local professionals." },
            { icon: "⚡", title: "Instant Matching", text: "Connect in minutes, not days." },
            { icon: "🔒", title: "Secure Payments", text: "Clear pricing. Protected transactions." },
            { icon: "🌍", title: "Your Language", text: "Find guides who speak yours." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl bg-white px-6 py-5 ring-1 ring-black/5">
              <div className="mb-3 text-lg">{item.icon}</div>
              <p className="font-black text-sm">{item.title}</p>
              <p className="mt-1 text-xs leading-5 text-neutral-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFC400]">
            How it works
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            Three ways to feel the city.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              tag: "VibeNow",
              tagBg: "bg-amber-50 text-amber-700",
              num: "01",
              title: "Explore right now",
              text: "Open the app, pick your destination, and get matched with an available local guide — in minutes.",
            },
            {
              tag: "VibeSquad",
              tagBg: "bg-emerald-50 text-emerald-700",
              num: "02",
              title: "Join the vibe",
              text: "Share the experience with other travelers. Split the guide fee. The more you are, the less you pay.",
            },
            {
              tag: "Reservation",
              tagBg: "bg-violet-50 text-violet-700",
              num: "03",
              title: "Plan ahead",
              text: "Book a private guide before your trip. Arrive knowing exactly who'll be waiting for you.",
            },
          ].map((item) => (
            <div key={item.num} className="group rounded-[2rem] bg-white p-8 ring-1 ring-black/5 transition hover:shadow-lg">
              <div className="flex items-start justify-between">
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.tagBg}`}>
                  {item.tag}
                </span>
                <span className="text-4xl font-black text-neutral-100">{item.num}</span>
              </div>
              <h3 className="mt-6 text-2xl font-black leading-tight">{item.title}</h3>
              <p className="mt-3 leading-7 text-neutral-500">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#FFC400]">
                Why VibeGuide
              </p>
              <h2 className="mt-4 text-5xl font-black leading-[1.1] tracking-tight">
                Tourism should<br />feel human.
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-neutral-500">
              <p>No crowded buses. No copy-paste scripts. No feeling like a booking number.</p>
              <p>
                VibeGuide connects you with verified local guides who know the
                streets, the food, the hidden corners — and actually want to show you.
              </p>
              <p className="text-xl font-black text-[#111]">
                Don&apos;t just visit. Belong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2.5rem] bg-[#111] px-10 py-16 text-white md:px-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-black leading-tight md:text-5xl">
              Your next city is calling.
            </h2>
            <p className="mt-5 text-lg leading-8 text-white/60">
              Download VibeGuide and explore with people who know the streets,
              the stories, the food, and the soul.
            </p>
            <button className="mt-9 rounded-2xl bg-[#FFC400] px-8 py-4 text-sm font-black text-[#111] hover:bg-[#f5bc00] transition-colors">
              Get the app — it&apos;s free
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-neutral-100 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-neutral-400 md:flex-row">
          <span className="font-black text-[#111]">VibeGuide</span>
          <span>© 2025 VibeGuide. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="/terms" className="hover:text-[#111] transition-colors">Terms</a>
            <a href="/privacy" className="hover:text-[#111] transition-colors">Privacy</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
