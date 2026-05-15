import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VibeGuide — Real Local Guides, On Demand | Istanbul, Cappadocia, Ephesus",
  description:
    "Tap Go. Match in minutes. Walk the city with a verified local. VibeNow for instant private tours, VibeSquad for group experiences, Reservations for the days you plan ahead.",
  keywords: [
    "VibeNow",
    "VibeSquad",
    "on-demand tour guide",
    "instant local guide",
    "private tour Istanbul",
    "group tour Istanbul",
    "licensed tour guide",
    "Cappadocia private tour",
    "Ephesus guide booking",
    "Turkey travel app",
    "walking tour app",
    "split the cost group tour",
  ],
  openGraph: {
    title: "VibeGuide — Real Local Guides, On Demand",
    description:
      "Tap Go. Match with a verified local in minutes. Or join a VibeSquad and split the cost.",
    type: "website",
  },
};

const destinations = [
  {
    city: "Istanbul",
    tag: "Live now",
    line: "Where east meets west, and locals know both.",
    desc: "From the spice-warm corners of the Grand Bazaar to rooftop sunsets over the Bosphorus, your guide rewrites the itinerary you thought you wanted.",
    gradient: "from-[#FFE08A] to-[#E8923C]",
  },
  {
    city: "Cappadocia",
    tag: "Coming soon",
    line: "A landscape the camera always undersells.",
    desc: "Sunrise balloons, fairy chimneys, valley walks at golden hour, cave-cut chapels almost no guidebook will lead you to. Locals know the angles.",
    gradient: "from-[#F4B99E] to-[#C66B4A]",
  },
  {
    city: "Ephesus",
    tag: "Coming soon",
    line: "Walk the marble streets of an empire.",
    desc: "Temples, theaters, libraries that have seen 2,000 winters — told by a licensed guide who treats Roman history like family history.",
    gradient: "from-[#C8D5A8] to-[#7A9A5B]",
  },
];

const testimonials = [
  {
    quote:
      "I've been to Istanbul three times. This was the first time I actually saw it. Mehmet skipped every line and walked us through the streets his grandmother grew up on.",
    name: "Lena R.",
    from: "Berlin",
    tour: "VibeNow · Sultanahmet",
  },
  {
    quote:
      "Booked at the airport while waiting for my luggage. Twenty minutes later I was eating breakfast with a guide who actually wanted to be there. Worth every cent.",
    name: "David K.",
    from: "New York",
    tour: "VibeNow · Karaköy",
  },
  {
    quote:
      "Joined a VibeSquad on a Saturday. Six strangers, one local, twenty euros each. By the end of the night we had a group chat and dinner plans for the week.",
    name: "Priya S.",
    from: "London",
    tour: "VibeSquad · Beyoğlu",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fffdf8] text-[#111]">

      {/* ── NAV ── */}
      <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fffdf8]/85 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-[1.35rem] font-black tracking-tight">VibeGuide</span>

          <div className="hidden items-center gap-9 text-[0.92rem] font-medium text-neutral-600 md:flex">
            <a className="hover:text-[#111] transition-colors cursor-pointer">VibeNow</a>
            <a className="hover:text-[#111] transition-colors cursor-pointer">VibeSquad</a>
            <a className="hover:text-[#111] transition-colors cursor-pointer">Destinations</a>
            <a className="hover:text-[#111] transition-colors cursor-pointer">For guides</a>
          </div>

          <button className="rounded-full bg-[#111] px-5 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors">
            Get the app
          </button>
        </nav>
      </header>

      {/* ── HERO (asymmetric: left copy / right activity stack) ── */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:pt-24">
        <div className="grid items-center gap-14 md:grid-cols-[1.15fr,1fr] md:gap-20">
          {/* LEFT */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-wider text-neutral-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />
              Now live in Istanbul
            </div>

            <h1 className="text-5xl font-black leading-[0.98] tracking-tight md:text-[5.5rem]">
              Meet the city
              <br />
              through someone
              <br />
              who already
              <span className="relative ml-3 inline-block">
                <span className="relative z-10">has</span>
                <span className="absolute inset-x-0 -bottom-1 z-0 h-3 bg-[#FFC400] md:h-4" />
              </span>
              <span className="text-neutral-400">.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-500 md:text-[1.15rem] md:leading-9">
              VibeGuide is the easiest way to explore a city through a verified
              local. Tap <b className="text-[#111]">VibeNow</b> for an instant
              private tour. Join a <b className="text-[#111]">VibeSquad</b> and
              split the fee with other travelers. Or reserve a private day —
              your trip, your way.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button className="rounded-full bg-[#111] px-7 py-4 text-[0.95rem] font-semibold text-white hover:bg-neutral-800 transition-colors">
                Get the app — it&apos;s free
              </button>
              <button className="rounded-full border border-neutral-200 bg-white px-7 py-4 text-[0.95rem] font-semibold text-[#111] hover:border-neutral-400 transition-colors">
                Watch how it works →
              </button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-neutral-500">
              <span className="flex items-center gap-2"><span className="text-[#FFC400]">★</span> Licensed guides only</span>
              <span className="flex items-center gap-2"><span className="text-[#FFC400]">★</span> Pay after you meet</span>
              <span className="flex items-center gap-2"><span className="text-[#FFC400]">★</span> Free cancellation</span>
            </div>
          </div>

          {/* RIGHT — Live activity stack */}
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-[#FFF2B8] via-transparent to-transparent blur-2xl opacity-70" />

            <div className="space-y-3">
              {/* Card 1 — Match */}
              <div className="rounded-2xl bg-white p-5 ring-1 ring-black/[0.06] shadow-sm">
                <div className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-wider text-neutral-400">
                  <span>VibeNow · matched</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-700">● Live</span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-gradient-to-br from-[#FFE08A] to-[#E8923C] ring-2 ring-white" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-black text-[#111]">Mehmet · Istanbul</p>
                    <p className="mt-0.5 text-xs text-neutral-500">★ 4.96 · 312 tours · 5 min away</p>
                  </div>
                  <button className="rounded-full bg-[#FFC400] px-3 py-1.5 text-xs font-bold text-[#111]">
                    Go
                  </button>
                </div>
              </div>

              {/* Card 2 — Squad joining */}
              <div className="ml-6 rounded-2xl bg-white p-5 ring-1 ring-black/[0.06] shadow-sm">
                <div className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-wider text-neutral-400">
                  <span>VibeSquad · forming</span>
                  <span className="text-[0.65rem] font-bold text-neutral-500">Sat 14:00</span>
                </div>
                <p className="mt-3 text-sm font-bold text-[#111]">Sultanahmet walking tour</p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {["#FFC400", "#F4B99E", "#C8D5A8", "#FFE08A"].map((c) => (
                      <div key={c} className="h-7 w-7 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-neutral-500">4 of 6 joined</span>
                  <span className="ml-auto text-sm font-black text-[#111]">€22 <span className="text-xs font-medium text-neutral-400">/ person</span></span>
                </div>
              </div>

              {/* Card 3 — Started */}
              <div className="ml-2 rounded-2xl bg-[#111] p-5 text-white shadow-sm">
                <div className="flex items-center justify-between text-[0.7rem] font-bold uppercase tracking-wider text-[#FFC400]">
                  <span>Tour started</span>
                  <span className="text-white/40">just now</span>
                </div>
                <p className="mt-3 font-bold">
                  &quot;Welcome to Galata. Follow me — there&apos;s a shortcut.&quot;
                </p>
                <p className="mt-3 text-xs text-white/40">Live location sharing on · 1.5h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STRIP ── */}
      <section className="border-y border-black/[0.06] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <p className="mb-6 text-center text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">
            Built for travelers who&apos;ve been everywhere — and still want more
          </p>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { num: "100%", label: "Licensed guides" },
              { num: "<5 min", label: "Average match time" },
              { num: "20+", label: "Languages spoken" },
              { num: "€0", label: "Hidden fees, ever" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-black tracking-tight md:text-4xl">{s.num}</p>
                <p className="mt-1.5 text-sm font-medium text-neutral-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIBENOW PRODUCT BLOCK ── */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-12">
        <div className="overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#FFF2B8] via-[#FFE998] to-[#FFC400] p-10 md:p-16">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111] px-3 py-1 text-[0.7rem] font-black uppercase tracking-wider text-[#FFC400]">
                ⚡ Instant
              </span>
              <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight md:text-[4.5rem]">
                VibeNow.
                <br />
                <span className="text-[#7A5800]">A local in minutes.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-[#5A4400]">
                Open the app, tap Go, and we&apos;ll match you with an
                available licensed guide nearby. No back-and-forth, no
                pre-booking gymnastics. Just the city — and someone who knows
                it by heart.
              </p>
              <div className="mt-8 grid max-w-md grid-cols-3 gap-4">
                {[
                  { num: "1", label: "Pick a place" },
                  { num: "2", label: "Tap Go" },
                  { num: "3", label: "Walk together" },
                ].map((s) => (
                  <div key={s.num} className="rounded-2xl bg-white/70 p-4 backdrop-blur-sm">
                    <p className="text-2xl font-black text-[#111]">{s.num}</p>
                    <p className="mt-1 text-xs font-semibold text-[#5A4400]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {[
                { time: "Just now", text: "Mehmet accepted your tour", sub: "5 min away · Hagia Sophia", live: true },
                { time: "12:04", text: "You: \"Meet at the entrance?\"", sub: "Read · live chat enabled" },
                { time: "12:06", text: "Tour started — let&apos;s walk", sub: "Live location sharing on" },
              ].map((m, i) => (
                <div
                  key={i}
                  className={`rounded-2xl bg-white p-5 ring-1 ring-black/[0.06] shadow-sm ${i === 0 ? "" : i === 1 ? "md:ml-8" : "md:ml-4"}`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-400">
                    <span>{m.time}</span>
                    {m.live && <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-700">● Live</span>}
                  </div>
                  <p className="mt-1.5 font-bold text-[#111]" dangerouslySetInnerHTML={{__html: m.text}} />
                  <p className="mt-1 text-xs text-neutral-500">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIBESQUAD PRODUCT BLOCK ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="overflow-hidden rounded-[2.5rem] bg-[#111] p-10 text-white md:p-16">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#FFC400]">Solo</p>
                  <p className="mt-3 text-4xl font-black">€80</p>
                  <p className="mt-1 text-xs text-white/40 line-through">private guide</p>
                </div>
                <div className="rounded-2xl bg-[#FFC400] p-5 text-[#111]">
                  <p className="text-xs font-bold uppercase tracking-wider">Squad of 4</p>
                  <p className="mt-3 text-4xl font-black">€22</p>
                  <p className="mt-1 text-xs font-semibold">per person</p>
                </div>
                <div className="col-span-2 rounded-2xl bg-white/[0.06] p-5 ring-1 ring-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {["#FFC400", "#F4B99E", "#C8D5A8", "#FFE08A"].map((c) => (
                        <div
                          key={c}
                          className="h-8 w-8 rounded-full ring-2 ring-[#111]"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold">4 travelers joined</span>
                    <span className="ml-auto text-xs text-white/40">Sat 14:00 · Sultanahmet</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC400] px-3 py-1 text-[0.7rem] font-black uppercase tracking-wider text-[#111]">
                ✨ Group
              </span>
              <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-tight md:text-[4.5rem]">
                VibeSquad.
                <br />
                <span className="text-white/50">Travel together.<br />Pay less.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-8 text-white/60">
                Join other travelers heading the same way, share the same
                licensed guide, and split the fee. The bigger the squad, the
                more everyone saves. Same city, half the cost, ten times the
                stories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
              Where to next
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-tight md:text-5xl">
              Cities aren&apos;t seen.<br />They&apos;re felt.
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
              <div className={`relative h-60 bg-gradient-to-br ${d.gradient}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-neutral-700 backdrop-blur">
                  {d.tag}
                </span>
                <div className="absolute inset-x-5 bottom-5">
                  <h3 className="text-3xl font-black text-white drop-shadow-sm">{d.city}</h3>
                  <p className="mt-1 text-sm font-medium text-white/90 drop-shadow-sm">{d.line}</p>
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

      {/* ── TESTIMONIALS ── */}
      <section className="border-y border-black/[0.06] bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
                From travelers
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-black leading-[1.1] tracking-tight md:text-5xl">
                The stories you came home with.
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-3xl bg-[#fffdf8] p-8 ring-1 ring-black/[0.06]"
              >
                <div className="mb-4 text-[#FFC400]">★ ★ ★ ★ ★</div>
                <blockquote className="flex-1 text-[1.05rem] leading-[1.7] text-neutral-700">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-black/[0.05] pt-5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#FFE08A] to-[#E8923C]" />
                  <div>
                    <p className="text-sm font-bold text-[#111]">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.from} · {t.tour}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-start gap-16 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
              Why VibeGuide
            </p>
            <h2 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight md:text-[3.5rem]">
              Tourism, finally,
              <br />
              feels human.
            </h2>
            <p className="mt-7 text-lg leading-8 text-neutral-500">
              No herding buses. No headsets crackling beside you. No copy-paste
              scripts. Just one verified local, the city around them, and a few
              hours that turn into the story you&apos;ll tell back home.
            </p>
            <p className="mt-4 text-lg leading-8 text-neutral-500">
              Every guide is licensed, identity-checked, and rated by real
              travelers. Every price is upfront. Every cancellation is free
              until you meet. Every moment is one you actually paid attention to.
            </p>
            <p className="mt-7 text-2xl font-black leading-snug text-[#111]">
              Don&apos;t just visit a place.
              <br />
              Belong to it.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Verified, every time", desc: "Every guide is licensed where required, identity-checked, and reviewed by travelers." },
              { title: "Pay only after you meet", desc: "Your card is authorized — never charged until you and your guide actually connect." },
              { title: "Your language, your pace", desc: "Filter by language, mood, walking speed. The trip should bend around you, not the other way." },
              { title: "Cancel without the guilt", desc: "Plans change. Weather changes. Moods change. Cancel free until the moment you meet." },
            ].map((s) => (
              <div
                key={s.title}
                className="rounded-2xl bg-white p-6 ring-1 ring-black/[0.06]"
              >
                <p className="font-black text-[#111]">{s.title}</p>
                <p className="mt-2 text-sm leading-6 text-neutral-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR GUIDES ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2rem] bg-gradient-to-br from-[#FFF2B8] to-[#FFE07A] p-10 md:p-16">
          <div className="grid items-center gap-10 md:grid-cols-[2fr,1fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7A5800]">
                For guides
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight md:text-5xl">
                Turn what you know
                <br className="hidden md:block" />
                {" "}into what you do.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#5A4400]">
                Set your own hours. Keep more of what you earn. Tell your own
                stories. VibeGuide brings travelers who actually want to meet
                you — straight to your phone.
              </p>
            </div>
            <div className="md:text-right">
              <button className="rounded-full bg-[#111] px-7 py-4 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors">
                Apply as a guide →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[2.5rem] bg-[#111] px-8 py-20 text-center text-white md:px-20 md:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFC400]">
            Your next city is calling
          </p>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-tight md:text-7xl">
            Pick up.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-8 text-white/60">
            Download VibeGuide and walk the streets with someone who actually
            knows them. VibeNow, VibeSquad, or a private reservation — your
            trip, your call.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button className="rounded-full bg-[#FFC400] px-8 py-4 text-[0.95rem] font-bold text-[#111] hover:bg-[#f5bc00] transition-colors">
              Get the app
            </button>
            <button className="rounded-full border border-white/20 px-8 py-4 text-[0.95rem] font-semibold text-white hover:bg-white/5 transition-colors">
              Browse destinations →
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
                Real local guides, on demand. VibeNow for instant tours.
                VibeSquad for group experiences. Live in Istanbul. Cappadocia &
                Ephesus coming soon.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold">Product</p>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-500">
                <li><a className="hover:text-[#111] cursor-pointer">VibeNow — instant tours</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">VibeSquad — group tours</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">Private reservations</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">For guides</a></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold">Destinations</p>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-500">
                <li><a className="hover:text-[#111] cursor-pointer">Istanbul tours</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">Cappadocia tours</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">Ephesus tours</a></li>
                <li><a className="hover:text-[#111] cursor-pointer">All destinations</a></li>
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
            <span>Built for travelers who want to belong.</span>
          </div>
        </div>
      </footer>

    </main>
  );
}
