import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ephesus Tour Guide — Private & Group Tours | VibeGuide",
  description:
    "Explore ancient Ephesus with a verified local guide. Library of Celsus, Temple of Artemis, the Roman agora — private or group tours, instantly booked with VibeGuide.",
  keywords: [
    "Ephesus tour guide",
    "Ephesus private tour",
    "Ephesus local guide",
    "Library of Celsus tour",
    "Temple of Artemis tour",
    "Ephesus walking tour",
    "ancient ruins Turkey",
    "Selcuk guide",
    "Kusadasi tour guide",
    "Ephesus group tour",
  ],
  alternates: { canonical: "https://www.vibeguideapp.com/ephesus-tour-guide" },
  openGraph: {
    title: "Ephesus Tour Guide — Private & Group Tours | VibeGuide",
    description:
      "Walk through one of the world's best-preserved ancient cities with a licensed local guide. Instant booking via VibeGuide.",
    url: "https://www.vibeguideapp.com/ephesus-tour-guide",
    siteName: "VibeGuide",
    type: "website",
  },
};

const HIGHLIGHTS = [
  { icon: "📚", name: "Library of Celsus", desc: "One of antiquity's greatest libraries — a 2nd-century Roman masterpiece still standing." },
  { icon: "🏛️", name: "Temple of Artemis", desc: "One of the Seven Wonders of the Ancient World, just minutes from the main site." },
  { icon: "🎭", name: "Great Theatre", desc: "A 25,000-seat Roman theatre where St Paul once preached. Acoustics still astonishing." },
  { icon: "🛕", name: "House of the Virgin Mary", desc: "Sacred to Christians and Muslims alike — a pilgrimage site high in the hills above Ephesus." },
  { icon: "🏺", name: "Terrace Houses", desc: "Mosaic-floored Roman villas preserved under climate-controlled shelters — astonishing detail." },
  { icon: "⛩️", name: "Temple of Hadrian", desc: "Intricate Corinthian facade carved in the 2nd century, dedicated to the emperor who visited Ephesus." },
];

const MODES = [
  {
    tag: "VibeNow",
    color: "bg-[#6C4CF1]",
    title: "Instant local guide",
    text: "Arrived at Ephesus without a guide? Match with a verified local expert in minutes and get the most out of your visit.",
  },
  {
    tag: "VibeSquad",
    color: "bg-[#059669]",
    title: "Join a small group",
    text: "Join other travellers for a guided walk through Ephesus — affordable, social, and led by a licensed archaeologist guide.",
  },
  {
    tag: "Private Tour",
    color: "bg-[#D97706]",
    title: "Your private day at Ephesus",
    text: "Full-day private experience including Ephesus, the Terrace Houses, Temple of Artemis, and the House of the Virgin Mary.",
  },
];

export default function EphesusTourGuidePage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F] antialiased">
      <nav className="sticky top-0 z-50 bg-white border-b border-black/[0.06] shadow-sm">
        <div className="mx-auto max-w-5xl px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-black text-lg tracking-tight flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vibeguide-icon.png" alt="VibeGuide" width={28} height={28} style={{ mixBlendMode: "multiply" }} />
            VibeGuide
          </Link>
          <Link href="#download" className="rounded-full bg-[#6C4CF1] px-5 py-2 text-sm font-bold text-white hover:bg-[#5a3dd4] transition-colors">
            Download Free
          </Link>
        </div>
      </nav>

      <section className="relative bg-[#0A0A0F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1600"
            alt="Ephesus ancient ruins"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/70 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">Ephesus · Turkey</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight max-w-2xl">
            Ephesus Tour Guide<br />
            <span className="bg-gradient-to-r from-[#6C4CF1] to-[#8B5CF6] bg-clip-text text-transparent">
              Walk Through History
            </span>
          </h1>
          <p className="mt-6 text-base text-white/50 max-w-lg leading-7">
            Ephesus is one of the best-preserved ancient cities on Earth. A local guide turns ruins into stories — emperors, gladiators, philosophers, and saints walked these same streets.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#download" className="rounded-full bg-[#6C4CF1] px-7 py-3.5 text-sm font-bold text-white hover:bg-[#5a3dd4] transition-colors">
              Book a Guide Now →
            </Link>
            <Link href="/#modes" className="rounded-full border border-white/15 px-7 py-3.5 text-sm font-bold text-white/80 hover:bg-white/10 transition-all">
              See Tour Options
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">Top Sites</p>
          <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">What your guide will show you</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {HIGHLIGHTS.map((h) => (
              <div key={h.name} className="rounded-2xl border border-black/[0.06] bg-[#F7F7FB] p-6 hover:border-[#6C4CF1]/30 transition-colors">
                <span className="text-3xl">{h.icon}</span>
                <h3 className="mt-3 text-base font-black">{h.name}</h3>
                <p className="mt-1.5 text-sm text-neutral-500 leading-6">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F7F7FB]">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">How it works</p>
          <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">Three ways to explore Ephesus</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {MODES.map((m) => (
              <div key={m.tag} className="rounded-2xl bg-white border border-black/[0.06] p-7 shadow-sm">
                <span className={`inline-block rounded-full ${m.color} px-3 py-1 text-[10px] font-black text-white uppercase tracking-wide mb-4`}>{m.tag}</span>
                <h3 className="text-xl font-black mb-2">{m.title}</h3>
                <p className="text-sm text-neutral-500 leading-6">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-[#0A0A0F] text-white p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Every guide is verified</h2>
            <p className="text-white/50 max-w-lg mx-auto leading-7 text-sm">
              All VibeGuide tour guides in Ephesus hold official Turkish Ministry of Culture licences, pass identity verification, and are reviewed after every tour.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/40 font-medium">
              {["🪪 Licensed by Ministry of Culture", "✅ Identity verified", "⭐ 4.9 avg rating", "🚫 Zero-tolerance policy"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="download" className="py-20 bg-[#F7F7FB]">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to explore Ephesus?</h2>
          <p className="text-neutral-500 mb-8 leading-7">Download VibeGuide free. Find a local guide in 60 seconds.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="flex items-center gap-3 rounded-2xl bg-[#0A0A0F] px-6 py-3.5 text-white font-bold text-sm hover:bg-black/80 transition-colors">
              <span>▶</span> Google Play
            </a>
            <a href="#" className="flex items-center gap-3 rounded-2xl bg-[#0A0A0F] px-6 py-3.5 text-white font-bold text-sm hover:bg-black/80 transition-colors">
              <span>📱</span> App Store
            </a>
          </div>
          <p className="mt-6 text-xs text-neutral-300">Free · No subscription · Ephesus available now</p>
        </div>
      </section>

      <footer className="border-t border-black/[0.06] py-8 px-6 text-center text-xs text-neutral-300">
        <Link href="/" className="hover:text-black transition-colors font-semibold">VibeGuide</Link> ·
        <Link href="/privacy" className="ml-2 hover:text-black transition-colors">Privacy</Link> ·
        <Link href="/terms" className="ml-2 hover:text-black transition-colors">Terms</Link>
        <p className="mt-2">© {new Date().getFullYear()} VibeGuide. All rights reserved.</p>
      </footer>
    </main>
  );
}
