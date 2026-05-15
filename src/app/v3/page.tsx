import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VibeGuide — Book Verified Local Guides in Istanbul, Cappadocia & Ephesus",
  description:
    "Discover cities through licensed local guides. Instant private tours, group experiences, and reservations in Istanbul, Cappadocia, Ephesus and beyond. Verified guides. Secure payments. Real stories.",
  keywords: [
    "local guide app",
    "private tour guide",
    "licensed tourist guide",
    "Istanbul tour guide",
    "Cappadocia tour",
    "Ephesus guide",
    "walking tour Istanbul",
    "instant tour booking",
    "group tour Turkey",
    "verified tour guide",
  ],
  openGraph: {
    title: "VibeGuide — Real Local Guides, On Demand",
    description:
      "Book verified local guides for private tours, group experiences and instant city walks. Launching in Istanbul.",
    type: "website",
  },
};

const destinations = [
  {
    city: "Istanbul",
    tag: "Available now",
    desc: "Hagia Sophia, Grand Bazaar, Bosphorus sunsets — with a local who knows the back streets.",
    gradient: "from-[#FFE08A] to-[#E8923C]",
  },
  {
    city: "Cappadocia",
    tag: "Coming soon",
    desc: "Fairy chimneys, cave churches, valley walks at golden hour. Real stories from real locals.",
    gradient: "from-[#F4B99E] to-[#C66B4A]",
  },
  {
    city: "Ephesus",
    tag: "Coming soon",
    desc: "Walk through 2,000 years of ancient streets, temples and Roman history with an expert guide.",
    gradient: "from-[#C8D5A8] to-[#7A9A5B]",
  },
];

const experiences = [
  {
    tag: "INSTANT",
    title: "VibeNow",
    headline: "Find a guide right now.",
    desc: "Open the app, share your location, and match with a verified local guide nearby. Perfect for spontaneous afternoons and first-day arrivals.",
  },
  {
    tag: "GROUP",
    title: "VibeSquad",
    headline: "Travel together. Pay less.",
    desc: "Join other travelers heading the same way. Split the guide fee, share the moment, and meet people from around the world.",
  },
  {
    tag: "PRIVATE",
    title: "Reservation",
    headline: "Plan ahead, your way.",
    desc: "Book a licensed tourist guide before your trip. Choose your language, your pace, your route — your trip, designed around you.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fffdf8] text-[#111]">

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fffdf8]/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-[1.35rem] font-black tracking-tight">
            VibeGuide
          </span>

          <div className="hidden items-center gap-9 text-[0.92rem] font-medium text-neutral-600 md:flex">
            <a className="hover:text-[#111] transition-colors cursor-pointer">Experiences</a>
            <a className="hover:text-[#111] transition-colors cursor-pointer">How it works</a>
            <a className="hover:text-[#111] transition-colors cursor-pointer">For guides</a>
          </div>

          <button className="rounded-full bg-[#111] px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors">
            Get the app
          </button>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-wider text-neutral-700 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />
            Launching first in Istanbul
          </div>

          <h1 className="text-5xl font-black leading-[1.02] tracking-tight md:text-[5.5rem]">
            Not a tour.
            <br />
            <span className="text-neutral-400">A real local </span>
            <span className="relative inline-block">
              <span className="relative z-10">moment</span>
              <span className="absolute inset-x-0 -bottom-1 z-0 h-3 bg-[#FFC400] md:h-4" />
            </span>
            <span className="text-neutral-400">.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-500 md:text-xl md:leading-9">
            VibeGuide connects travelers with verified local guides for instant
            private tours, group experiences and curated city walks. Real
            people. Real cities. Real stories.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button className="rounded-full bg-[#111] px-8 py-4 text-[0.95rem] font-semibold text-white hover:bg-neutral-800 transition-colors">
              Explore experiences
            </button>
            <button className="rounded-full border border-neutral-200 bg-white px-8 py-4 text-[0.95rem] font-semibold text-[#111] hover:border-neutral-400 transition-colors">
              How it works →
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-neutral-500">
            <span className="flex items-center gap-2"><span className="text-[#FFC400]">★</span> Verified guides only</span>
            <span className="flex items-center gap-2"><span className="text-[#FFC400]">★</span> Secure payments</span>
            <span className="flex items-center gap-2"><span className="text-[#FFC400]">★</span> Speaks your language</span>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
              Destinations
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Explore with people who live there.
            </h2>
          </div>
          <a className="hidden shrink-0 text-sm font-semibold text-neutral-600 hover:text-[#111] cursor-pointer md:block">
            See all destinations →
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {destinations.map((d) => (
            <article
              key={d.city}
              className="group cursor-pointer overflow-hidden rounded-3xl bg-white ring-1 ring-black/[0.06] transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
            >
              <div className={`relative h-56 bg-gradient-to-br ${d.gradient}`}>
                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-neutral-700 backdrop-blur">
                  {d.tag}
                </span>
                <div className="absolute inset-x-5 bottom-5">
                  <h3 className="text-3xl font-black text-white drop-shadow-sm">{d.city}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="leading-7 text-neutral-500">{d.desc}</p>
                <p className="mt-4 text-sm font-semibold text-[#111] transition group-hover:text-[#9A7000]">
                  Explore guides →
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="border-y border-black/[0.06] bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
              How it works
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Three ways to feel the city.
            </h2>
            <p className="mt-5 text-lg leading-8 text-neutral-500">
              Whether you&apos;re landing in an hour or planning months ahead,
              there&apos;s a guide for the way you travel.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {experiences.map((x, i) => (
              <div
                key={x.title}
                className="relative rounded-[1.75rem] bg-[#fffdf8] p-8 ring-1 ring-black/[0.06] transition hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#FFF2B8] px-3 py-1 text-[0.7rem] font-black tracking-wider text-[#7A5800]">
                    {x.tag}
                  </span>
                  <span className="text-sm font-bold text-neutral-300">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-7 text-sm font-bold uppercase tracking-wider text-neutral-400">
                  {x.title}
                </h3>
                <p className="mt-2 text-2xl font-black leading-tight tracking-tight">
                  {x.headline}
                </p>
                <p className="mt-4 leading-7 text-neutral-500">{x.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST / WHY ── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-start gap-16 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
              Why VibeGuide
            </p>
            <h2 className="mt-3 text-4xl font-black leading-[1.1] tracking-tight md:text-5xl">
              Tourism should feel human again.
            </h2>
            <p className="mt-6 text-lg leading-8 text-neutral-500">
              No crowded buses. No copy-paste scripts. No feeling like just
              another booking number. VibeGuide is built around the idea that
              the best way to experience a city is through someone who actually
              lives there.
            </p>
            <p className="mt-4 text-lg leading-8 text-neutral-500">
              Every guide is identity-verified and licensed where required.
              Payments are protected, prices are clear, and every traveler
              gets the same simple promise: <span className="font-bold text-[#111]">a real local moment.</span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "100%", label: "Verified guides" },
              { num: "1.5–3h", label: "Average tour" },
              { num: "20+", label: "Languages" },
              { num: "0", label: "Hidden fees" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white p-6 ring-1 ring-black/[0.06]"
              >
                <p className="text-4xl font-black tracking-tight">{s.num}</p>
                <p className="mt-2 text-sm font-medium text-neutral-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR GUIDES STRIP ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#FFF2B8] to-[#FFE07A] p-10 md:p-16">
          <div className="grid items-center gap-10 md:grid-cols-[2fr,1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7A5800]">
                For guides
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight md:text-4xl">
                Are you a licensed local guide? Build your own audience.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#5A4400]">
                Keep more of what you earn. Set your own hours. Tell your own
                stories. Join VibeGuide and connect with travelers who actually
                want to meet you.
              </p>
            </div>
            <div className="md:text-right">
              <button className="rounded-full bg-[#111] px-7 py-3.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors">
                Apply as a guide →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2.5rem] bg-[#111] px-8 py-20 text-center text-white md:px-20 md:py-24">
          <h2 className="mx-auto max-w-3xl text-4xl font-black leading-[1.1] tracking-tight md:text-6xl">
            Your next city is calling.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/60">
            Download VibeGuide and explore with people who know the streets,
            the stories, the food, and the soul.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button className="rounded-full bg-[#FFC400] px-8 py-4 text-[0.95rem] font-bold text-[#111] hover:bg-[#f5bc00] transition-colors">
              Get the app
            </button>
            <button className="rounded-full border border-white/20 px-8 py-4 text-[0.95rem] font-semibold text-white hover:bg-white/5 transition-colors">
              Browse destinations
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <p className="text-xl font-black tracking-tight">VibeGuide</p>
              <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-500">
                Real local guides for real city moments. Book verified guides
                in Istanbul, Cappadocia, Ephesus and beyond.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold">Explore</p>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-500">
                <li><a className="hover:text-[#111] cursor-pointer">Istanbul tours</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">Cappadocia tours</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">Ephesus tours</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">All destinations</a></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold">Product</p>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-500">
                <li><a className="hover:text-[#111] cursor-pointer">VibeNow</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">VibeSquad</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">Reservations</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">For guides</a></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold">Company</p>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-500">
                <li><a href="/terms" className="hover:text-[#111]">Terms</a></li>
                <li><a href="/privacy" className="hover:text-[#111]">Privacy</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">Contact</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-black/[0.06] pt-8 text-xs text-neutral-400 md:flex-row">
            <span>© 2025 VibeGuide. All rights reserved.</span>
            <span>Made for travelers who want to belong.</span>
          </div>
        </div>
      </footer>

    </main>
  );
}
