import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Ticker />
        <SocialProof />
        <ProductDuo />
        <HowItWorks />
        <Features />
        <Testimonials />
        <ForGuides />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

/* ════════ HERO ════════ */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-vg-primary/30 blur-3xl" />
        <div className="absolute top-40 -right-40 w-[520px] h-[520px] rounded-full bg-vg-flame/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-vg-amber/20 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-vg-primary/10 border border-vg-primary/20">
            <span className="w-2 h-2 rounded-full bg-vg-mint animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-vg-primary">
              Live in 12+ cities
            </span>
          </div>
          <h1 className="mt-5 text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
            Skip the tour bus.{" "}
            <span className="text-vibe-gradient">Catch a vibe instead.</span>
          </h1>
          <p className="mt-5 text-lg md:text-xl text-vg-muted leading-relaxed max-w-xl">
            One tap matches you with a real local in under 60 seconds.{" "}
            <strong className="text-vg-ink">VibeNow ⚡</strong> for solo
            adventures right now.{" "}
            <strong className="text-vg-ink">VibeSquad ✨</strong> for rolling
            deep with the crew at half the price. No scripts. No queues. No
            cringe.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#download"
              className="bg-vibe-gradient text-white px-7 py-4 rounded-2xl font-black text-base shadow-xl shadow-purple-500/30 hover:scale-105 transition-transform"
            >
              📱 Get the app — Free
            </a>
            <a
              href="#how"
              className="bg-white border-2 border-vg-border text-vg-ink px-7 py-4 rounded-2xl font-black text-base hover:border-vg-primary transition-colors"
            >
              See how it works →
            </a>
          </div>
          <div className="mt-8 flex items-center gap-6">
            <div className="flex -space-x-3">
              {["bg-vg-primary", "bg-vg-flame", "bg-vg-amber", "bg-vg-mint"].map(
                (c, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-full ${c} border-2 border-white shadow-md`}
                  />
                )
              )}
            </div>
            <div>
              <div className="flex gap-1 text-vg-amber">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <p className="text-sm text-vg-muted font-semibold">
                Loved by 50,000+ travelers
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="relative animate-float">
            <div className="absolute -inset-8 bg-vibe-gradient blur-3xl opacity-30 rounded-[60px]" />
            <div className="relative w-[280px] md:w-[340px] aspect-[9/19] rounded-[44px] bg-gradient-to-br from-vg-primary via-vg-violet to-vg-lavender p-1 shadow-2xl">
              <div className="w-full h-full rounded-[40px] bg-white overflow-hidden flex flex-col">
                <div className="h-7 bg-black/5 flex items-center justify-center">
                  <div className="w-20 h-5 bg-black rounded-full" />
                </div>
                <div className="flex-1 p-4 space-y-3 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-vg-muted">Good evening 👋</p>
                      <p className="font-black text-lg">Istanbul</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-vibe-gradient" />
                  </div>
                  <div className="bg-flash-gradient rounded-2xl p-3 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-white text-vg-flame text-[8px] font-black px-2 py-0.5 rounded-full">
                        ⚡ LIVE NOW
                      </span>
                    </div>
                    <p className="font-black text-lg leading-tight">
                      VibeNow ⚡
                    </p>
                    <p className="text-[10px] opacity-90">Tap. Match. Go.</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-black text-xl">$25</span>
                      <span className="text-[10px] opacity-80">/ person</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-vg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full">
                        ✨ SQUAD
                      </span>
                    </div>
                    <p className="font-black text-base text-vg-ink">
                      Start a VibeSquad ✨
                    </p>
                    <p className="text-[10px] text-vg-muted">
                      Roll deep, pay less
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-vg-primary">
                      <span>🎁 15% host perk</span>
                      <span>👥 Bring crew</span>
                    </div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-vg-primary to-vg-violet h-24 relative overflow-hidden">
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-black">
                        Hagia Sophia
                      </p>
                      <p className="text-white/80 text-[9px]">
                        Editor&apos;s Pick · 12 guides online
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -left-6 top-32 bg-white shadow-xl rounded-2xl px-3 py-2 border border-vg-border">
              <p className="text-[10px] text-vg-muted font-semibold">
                Matched in
              </p>
              <p className="text-lg font-black text-vg-primary">
                42<span className="text-xs">sec</span>
              </p>
            </div>
            <div className="absolute -right-6 top-72 bg-white shadow-xl rounded-2xl px-3 py-2 border border-vg-border">
              <p className="text-[10px] text-vg-muted font-semibold">Saved</p>
              <p className="text-lg font-black text-vg-flame">$48</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════ TICKER — value-prop band ════════ */
function Ticker() {
  const items = [
    "⚡ 60-second match",
    "💸 Up to 50% off with a squad",
    "🌍 23 languages, native speakers",
    "🛡️ 100% refund if your squad doesn't form",
    "📍 Live in 12 cities, 4 more next month",
    "❤️ 4.9★ from 50K+ travelers",
  ];
  return (
    <div className="bg-vibe-gradient overflow-hidden">
      <div className="py-3 flex gap-10 animate-[scroll_40s_linear_infinite] whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="text-white text-sm md:text-base font-bold tracking-wide"
          >
            {t}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}

/* ════════ SOCIAL PROOF STRIP ════════ */
function SocialProof() {
  const items = [
    { n: "50K+", l: "Happy travelers" },
    { n: "1.2K", l: "Verified guides" },
    { n: "12", l: "Cities live" },
    { n: "4.9★", l: "Average rating" },
  ];
  return (
    <section className="border-y border-vg-border bg-vg-bg-soft">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {items.map((s, i) => (
          <div key={i}>
            <p className="text-3xl md:text-4xl font-black text-vibe-gradient">
              {s.n}
            </p>
            <p className="text-xs md:text-sm text-vg-muted font-semibold mt-1">
              {s.l}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ════════ TWO PRODUCTS ════════ */
function ProductDuo() {
  return (
    <section id="how" className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
      <div className="text-center mb-14">
        <p className="text-xs font-black uppercase tracking-widest text-vg-primary">
          Two ways to vibe
        </p>
        <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
          Solo? Or squad?{" "}
          <span className="text-vibe-gradient">Same app. Different vibe.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div
          id="vibenow"
          className="relative overflow-hidden rounded-3xl bg-flash-gradient p-8 md:p-10 text-white shadow-2xl shadow-orange-500/30"
        >
          <div className="absolute -top-10 -right-10 text-9xl opacity-10">⚡</div>
          <span className="inline-block bg-white text-vg-flame px-3 py-1 rounded-full text-xs font-black tracking-widest">
            ⚡ LIVE NOW
          </span>
          <h3 className="mt-5 text-4xl md:text-5xl font-black tracking-tight">
            VibeNow ⚡
          </h3>
          <p className="mt-2 text-xl font-bold">Tap. Match. Go.</p>
          <p className="mt-4 text-white/90 leading-relaxed">
            Just landed. Hotel checked. Nothing planned. Open the app, tap once
            — a real local is heading your way before you finish your coffee.
            That&apos;s the move.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "60-second match guarantee",
              "Personal, private, fully you",
              "Pay only when matched",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <span className="bg-white text-vg-flame rounded-full w-5 h-5 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="font-semibold">{t}</span>
              </li>
            ))}
          </ul>
          <a
            href="#download"
            className="mt-8 inline-flex items-center gap-2 bg-white text-vg-flame px-6 py-3 rounded-2xl font-black text-sm shadow-lg hover:scale-105 transition-transform"
          >
            Tour in a Flash ⚡ →
          </a>
        </div>

        <div
          id="vibesquad"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 border-2 border-purple-200 p-8 md:p-10 shadow-2xl shadow-purple-500/20"
        >
          <div className="absolute -top-10 -right-10 text-9xl opacity-15 text-vg-primary">
            ✨
          </div>
          <span className="inline-block bg-vg-primary text-white px-3 py-1 rounded-full text-xs font-black tracking-widest">
            ✨ SQUAD
          </span>
          <h3 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-vg-ink">
            VibeSquad ✨
          </h3>
          <p className="mt-2 text-xl font-bold text-vg-ink">
            Roll deep. Pay less. Live the vibe.
          </p>
          <p className="mt-4 text-vg-muted leading-relaxed">
            Open a squad. Drop the link in your group chat. The crew rolls in,
            the price drops, the host pockets a 15% perk. It&apos;s like splitting
            an Uber, except the Uber is a sunset on the Bosphorus.
          </p>
          <ul className="mt-6 space-y-2.5">
            {[
              "Up to 50% cheaper as group fills",
              "15% host discount, every time",
              "Cancel-free if squad doesn't form",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm">
                <span className="bg-vg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                  ✓
                </span>
                <span className="font-semibold text-vg-ink">{t}</span>
              </li>
            ))}
          </ul>
          <a
            href="#download"
            className="mt-8 inline-flex items-center gap-2 bg-vibe-gradient text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg hover:scale-105 transition-transform"
          >
            Start a VibeSquad ✨ →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ════════ HOW IT WORKS ════════ */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      t: "Pick your vibe",
      d: "Solo right now? VibeNow ⚡. Got plans next week? VibeSquad ✨. Either way, two taps.",
      e: "🎯",
    },
    {
      n: "02",
      t: "Match a local",
      d: "Real guides. Verified. Rated. Speaking your language — even the rare ones.",
      e: "🤝",
    },
    {
      n: "03",
      t: "Live the city",
      d: "Walk. Eat. Laugh. See the side of town that doesn't make the brochures.",
      e: "🌆",
    },
  ];
  return (
    <section className="bg-vg-bg-soft py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-widest text-vg-primary">
            How it works
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
            <span className="text-vibe-gradient">Three taps.</span> One real
            day. Zero tour-bus regret.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <div
              key={i}
              className="relative bg-white rounded-3xl p-7 border border-vg-border hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-5xl">{s.e}</span>
                <span className="text-5xl font-black text-vg-primary/15">
                  {s.n}
                </span>
              </div>
              <h3 className="text-2xl font-black mb-2">{s.t}</h3>
              <p className="text-vg-muted leading-relaxed text-[15px]">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════ FEATURES ════════ */
function Features() {
  const features = [
    {
      e: "🌐",
      t: "Speaks your language",
      d: "From English to Japanese to Arabic — match a guide who actually gets you. Rare languages? We've got premium specialists.",
    },
    {
      e: "💸",
      t: "Anchor pricing",
      d: "See the real price next to the squad price. No bait. No surprise fees. The number you see is the number you pay.",
    },
    {
      e: "🔒",
      t: "Verified guides only",
      d: "Every guide is KYC-checked, ID-verified, and rated by real travelers. No randoms. No catfish.",
    },
    {
      e: "❤️",
      t: "Save your favorites",
      d: "Spotted a tour you love? Heart it. Build a wishlist. Sync across all your devices.",
    },
    {
      e: "🌟",
      t: "Curated collections",
      d: "Editor-picked bundles like \"Sultanahmet in 3 hours\" — the route a local would actually take.",
    },
    {
      e: "🛡️",
      t: "Safe & refundable",
      d: "Squad doesn't form? Full refund. Match doesn't show? Full refund. Your money is safer than the airport ATM.",
    },
  ];
  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28">
      <div className="text-center mb-14">
        <p className="text-xs font-black uppercase tracking-widest text-vg-primary">
          Why VibeGuide
        </p>
        <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
          Built different. <span className="text-vibe-gradient">For travelers who know better.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 border border-vg-border hover:border-vg-primary/40 hover:shadow-lg transition-all"
          >
            <div className="text-4xl mb-3">{f.e}</div>
            <h3 className="text-lg font-black mb-2">{f.t}</h3>
            <p className="text-sm text-vg-muted leading-relaxed">{f.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ════════ TESTIMONIALS ════════ */
function Testimonials() {
  const quotes = [
    {
      q: "Walked into Istanbul knowing nothing. Walked out with a story I keep telling. My guide knew the spots TikTok hasn't ruined yet.",
      n: "Mia",
      l: "Brooklyn → Istanbul",
      e: "🇺🇸",
      g:
        "linear-gradient(135deg,#fbbf24,#f59e0b)",
    },
    {
      q: "Opened a squad with two friends, woke up to four strangers in the chat. We didn't know each other before sunrise. We didn't shut up by sunset.",
      n: "Lukas",
      l: "Berlin → Lisbon",
      e: "🇩🇪",
      g:
        "linear-gradient(135deg,#6c4cf1,#8b5cf6)",
    },
    {
      q: "I'm Japanese and I always get the worst guides who just speak English. Found one who actually grew up in Kanagawa. Felt like home, in another country.",
      n: "Yui",
      l: "Tokyo → Cappadocia",
      e: "🇯🇵",
      g:
        "linear-gradient(135deg,#ef4444,#f97316)",
    },
  ];
  return (
    <section className="bg-vg-bg-soft py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-black uppercase tracking-widest text-vg-primary">
            Real travelers. Real cities. Real receipts.
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight">
            The kind of trip you{" "}
            <span className="text-vibe-gradient">brag about.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-7 border border-vg-border shadow-md hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="text-vg-primary text-5xl leading-none">&ldquo;</div>
              <p className="mt-2 text-[15px] text-vg-ink leading-relaxed font-medium flex-1">
                {c.q}
              </p>
              <div className="mt-6 pt-5 border-t border-vg-border flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-xl"
                  style={{ background: c.g }}
                >
                  {c.e}
                </div>
                <div>
                  <p className="font-black text-sm">{c.n}</p>
                  <p className="text-xs text-vg-muted font-semibold">{c.l}</p>
                </div>
                <div className="ml-auto flex gap-0.5 text-vg-amber text-xs">
                  ★★★★★
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════ FOR GUIDES ════════ */
function ForGuides() {
  const benefits = [
    { e: "💰", t: "Keep up to 90% — lowest commission in the game" },
    { e: "🌍", t: "Premium pay for rare languages, automatic uplift" },
    { e: "📅", t: "Pick your days off, set your zones, done" },
    { e: "⭐", t: "Build a rep that follows you, not your boss" },
  ];
  const stats = [
    { v: "$3.2K", l: "Avg monthly earnings" },
    { v: "8 min", l: "Avg match time" },
    { v: "90%", l: "Guide payout" },
    { v: "4.9★", l: "Guide satisfaction" },
  ];
  return (
    <section
      id="guides"
      className="relative overflow-hidden bg-vg-ink text-white"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-vg-primary/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-vg-flame/20 blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-vg-amber">
            For guides
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
            Your city.{" "}
            <span className="text-vibe-gradient">Your hours. Your rate.</span>
          </h2>
          <p className="mt-5 text-lg text-white/80 leading-relaxed max-w-xl">
            No agency cut. No middleman ghosting. No 9-to-5 with a clipboard.
            Just you, your city, your rate. Travelers pick YOU — not a brand,
            not a desk, not a script. Show up, walk &apos;em around, get paid
            Friday.
          </p>
          <ul className="mt-8 space-y-3">
            {benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-2xl">{b.e}</span>
                <span className="text-white/90 font-semibold pt-1">{b.t}</span>
              </li>
            ))}
          </ul>
          <a
            href="#download"
            className="mt-8 inline-flex items-center gap-2 bg-vibe-gradient text-white px-7 py-4 rounded-2xl font-black text-base shadow-xl shadow-purple-500/30 hover:scale-105 transition-transform"
          >
            Become a Guide →
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6"
            >
              <p className="text-4xl font-black text-vibe-gradient">{s.v}</p>
              <p className="text-sm text-white/70 font-semibold mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════ FINAL CTA ════════ */
function FinalCta() {
  return (
    <section
      id="download"
      className="relative overflow-hidden bg-vibe-gradient"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/30" />
      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 py-24 md:py-32 text-center text-white">
        <p className="text-xs font-black uppercase tracking-widest text-white/70">
          One app. Whole world.
        </p>
        <h2 className="mt-4 text-5xl md:text-7xl font-black tracking-tight leading-[1.05]">
          Your next city is{" "}
          <span className="underline decoration-wavy decoration-amber-300">
            calling.
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-xl text-white/85 max-w-2xl mx-auto">
          The next 60 seconds decide the next 6 hours. Download. Tap. Live the
          city like you live somewhere.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <a
            href="#"
            className="bg-black text-white px-7 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl"
          >
            <span className="text-2xl">📱</span>
            <span className="text-left">
              <span className="block text-[10px] opacity-70">
                Download on the
              </span>
              <span className="block text-base">App Store</span>
            </span>
          </a>
          <a
            href="#"
            className="bg-black text-white px-7 py-4 rounded-2xl font-black flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl"
          >
            <span className="text-2xl">▶</span>
            <span className="text-left">
              <span className="block text-[10px] opacity-70">Get it on</span>
              <span className="block text-base">Google Play</span>
            </span>
          </a>
        </div>
        <p className="mt-8 text-sm text-white/70">
          Free to download. No subscription. Pay only for what you tour.
        </p>
      </div>
    </section>
  );
}
