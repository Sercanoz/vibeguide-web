import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CityTours from "@/components/CityTours";
import CityFaqSchema, { type Faq } from "@/components/CityFaqSchema";

export const metadata: Metadata = {
  title: "Istanbul Tour Guide — Book a Local Expert | VibeGuide",
  description:
    "Find a verified local tour guide in Istanbul. Explore Hagia Sophia, Topkapi Palace, Grand Bazaar, Balat and the Bosphorus with a real local — instantly or planned.",
  keywords: [
    "Istanbul tour guide",
    "local guide Istanbul",
    "private tour Istanbul",
    "Istanbul walking tour",
    "Hagia Sophia tour",
    "Grand Bazaar guide",
    "Topkapi Palace tour",
    "Bosphorus tour",
    "Sultanahmet tour guide",
    "Balat tour",
  ],
  alternates: { canonical: "https://www.vibeguideapp.com/istanbul-tour-guide" },
  openGraph: {
    title: "Istanbul Tour Guide — Book a Local Expert | VibeGuide",
    description:
      "Verified local guides for Istanbul. Instant matching, group tours, or private full-day experiences. No tourist traps.",
    url: "https://www.vibeguideapp.com/istanbul-tour-guide",
    siteName: "VibeGuide",
    type: "website",
  },
};

const HIGHLIGHTS = [
  { icon: "🕌", name: "Hagia Sophia", desc: "1,500 years of history — Byzantine cathedral turned Ottoman mosque." },
  { icon: "🏰", name: "Topkapi Palace", desc: "The heart of the Ottoman Empire, overlooking the Bosphorus." },
  { icon: "🛍️", name: "Grand Bazaar", desc: "4,000+ shops in the world's oldest covered market — navigate it like a local." },
  { icon: "🎨", name: "Balat & Fener", desc: "Colourful streets, Greek Orthodox history, and hidden cafes." },
  { icon: "⛵", name: "Bosphorus", desc: "Where Europe meets Asia — a strait that has shaped civilisations." },
  { icon: "🕌", name: "Blue Mosque", desc: "Six minarets, 20,000 Iznik tiles, and one of Istanbul's most iconic skylines." },
];

const FAQS: Faq[] = [
  {
    q: "How much does a tour guide in Istanbul cost?",
    a: "Prices vary by tour type and duration. With VibeGuide you can see the exact price before you book — most half-day private tours in Istanbul start from a fixed per-person rate, with no hidden fees. Group tours (VibeSquad) are the most affordable option.",
  },
  {
    q: "Are VibeGuide's Istanbul guides licensed?",
    a: "Yes. Every guide on VibeGuide holds an official licence from the Turkish Ministry of Culture and Tourism, passes identity verification, and is reviewed after every tour. We have a zero-tolerance policy for unlicensed guiding.",
  },
  {
    q: "What's the best area to start an Istanbul tour?",
    a: "Most first-time visitors start in Sultanahmet (the historic peninsula), home to Hagia Sophia, the Blue Mosque, Topkapi Palace and the Grand Bazaar — all within walking distance. Your guide can also build a route around Balat, Galata, Karaköy or the Bosphorus depending on your interests.",
  },
  {
    q: "Can I book a guide for the same day?",
    a: "Yes. With VibeNow you can match with an available local guide in about 60 seconds and meet them at your location within minutes — no advance booking required. You can also schedule a private tour in advance.",
  },
  {
    q: "Do guides speak English?",
    a: "Yes. Most Istanbul guides on VibeGuide speak English, and many also offer tours in German, Russian, French, Spanish, Arabic and other languages. You can filter by language when choosing a tour.",
  },
  {
    q: "Is it better to explore Istanbul with a guide or alone?",
    a: "Istanbul rewards local knowledge. A licensed guide helps you skip queues, avoid tourist-trap restaurants, understand the real history behind each site, and discover neighbourhoods most visitors never reach — turning a checklist into a genuine experience.",
  },
];

const MODES = [
  {
    tag: "VibeNow",
    color: "bg-[#6C4CF1]",
    title: "Match in 60 seconds",
    text: "Open the app, tap VibeNow, and a verified local guide meets you at your location in minutes. No booking, no waiting.",
  },
  {
    tag: "VibeSquad",
    color: "bg-[#059669]",
    title: "Join a group tour",
    text: "Affordable, social, fun. Join an existing group exploring Istanbul right now — meet fellow travellers along the way.",
  },
  {
    tag: "Private Tour",
    color: "bg-[#D97706]",
    title: "Plan your perfect day",
    text: "Schedule a private guide for a half-day or full-day experience, fully tailored to your interests and pace.",
  },
];

export default function IstanbulTourGuidePage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F] antialiased">
      {/* Nav */}
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

      {/* Hero */}
      <section className="relative bg-[#0A0A0F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1600"
            alt="Istanbul skyline"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/70 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">Istanbul · Turkey</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight max-w-2xl">
            Istanbul Tour Guide<br />
            <span className="bg-gradient-to-r from-[#6C4CF1] to-[#8B5CF6] bg-clip-text text-transparent">
              Find Your Local Expert
            </span>
          </h1>
          <p className="mt-6 text-base text-white/50 max-w-lg leading-7">
            Skip the tourist traps. Explore Istanbul with a verified local guide who knows the hidden streets, real stories, and best food — from Sultanahmet to Balat.
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

      {/* Tour highlights */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">Top Destinations</p>
          <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">
            What your guide will show you
          </h2>
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

      {/* Real tours */}
      <CityTours citySlug="istanbul" cityName="Istanbul" />

      {/* Rich SEO content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Why explore Istanbul with a local guide?</h2>
          <div className="space-y-5 text-[15px] text-neutral-600 leading-8">
            <p>
              Istanbul is a city of layers — Roman, Byzantine and Ottoman empires all left their mark on the same streets. Two continents, three names (Byzantium, Constantinople, Istanbul), and more than 2,500 years of history are packed into one extraordinary skyline. For a first-time visitor, the sheer scale can be overwhelming, and the most rewarding corners are rarely the ones in the guidebooks.
            </p>
            <p>
              That&apos;s where a <strong>licensed Istanbul tour guide</strong> changes everything. Instead of queuing blindly at <strong>Hagia Sophia</strong> or getting lost in the 4,000 shops of the <strong>Grand Bazaar</strong>, you walk with someone who knows which entrance is fastest, which carpet seller is honest, and which tiny lokanta serves the best İskender kebab. A good guide doesn&apos;t just show you the <strong>Blue Mosque</strong> and <strong>Topkapi Palace</strong> — they tell you the stories that make them come alive.
            </p>
            <p>
              VibeGuide connects you with verified local guides across Istanbul&apos;s most iconic districts. Explore the historic peninsula of <strong>Sultanahmet</strong>, wander the colourful streets of <strong>Balat and Fener</strong>, climb to <strong>Galata Tower</strong> for the best view of the Golden Horn, or cruise the <strong>Bosphorus</strong> where Europe meets Asia. Whether you have two hours or two days, your guide builds the route around you.
            </p>
            <p>
              Every guide on our platform is licensed by the Turkish Ministry of Culture and Tourism, identity-verified, and reviewed after each tour — so you can explore with total confidence. No tourist traps, no scripted speeches, no pressure. Just a real local showing you their city.
            </p>
          </div>
        </div>
      </section>

      {/* 3 modes */}
      <section className="py-20 bg-[#F7F7FB]">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">How it works</p>
          <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">Three ways to explore Istanbul</h2>
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

      {/* Trust */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-3xl bg-[#0A0A0F] text-white p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Every guide is verified</h2>
            <p className="text-white/50 max-w-lg mx-auto leading-7 text-sm">
              All VibeGuide tour guides in Istanbul hold official Turkish Ministry of Culture licences, pass identity verification, and are reviewed after every tour.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/40 font-medium">
              {["🪪 Licensed by Ministry of Culture", "✅ Identity verified", "⭐ 4.9 avg rating", "🚫 Zero-tolerance policy"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ + schema */}
      <CityFaqSchema city="Istanbul" faqs={FAQS} />

      {/* Other destinations — internal linking */}
      <section className="py-16 bg-[#F7F7FB]">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-black mb-6 tracking-tight">Explore more of Turkey</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/cappadocia-tour-guide" className="group flex items-center gap-4 rounded-2xl bg-white border border-black/[0.06] p-5 hover:border-[#6C4CF1]/30 transition-colors">
              <span className="text-3xl">🎈</span>
              <div>
                <p className="font-black text-[#0A0A0F] group-hover:text-[#6C4CF1] transition-colors">Cappadocia Tour Guide</p>
                <p className="text-sm text-neutral-400">Hot air balloons, fairy chimneys & cave churches</p>
              </div>
            </Link>
            <Link href="/ephesus-tour-guide" className="group flex items-center gap-4 rounded-2xl bg-white border border-black/[0.06] p-5 hover:border-[#6C4CF1]/30 transition-colors">
              <span className="text-3xl">🏛️</span>
              <div>
                <p className="font-black text-[#0A0A0F] group-hover:text-[#6C4CF1] transition-colors">Ephesus Tour Guide</p>
                <p className="text-sm text-neutral-400">Ancient Roman ruins near Selçuk, İzmir</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section id="download" className="py-20 bg-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to explore Istanbul?</h2>
          <p className="text-neutral-500 mb-8 leading-7">Download VibeGuide free. Find a local guide in 60 seconds.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="flex items-center gap-3 rounded-2xl bg-[#0A0A0F] px-6 py-3.5 text-white font-bold text-sm hover:bg-black/80 transition-colors">
              <span>▶</span> Google Play
            </a>
            <a href="#" className="flex items-center gap-3 rounded-2xl bg-[#0A0A0F] px-6 py-3.5 text-white font-bold text-sm hover:bg-black/80 transition-colors">
              <span>📱</span> App Store
            </a>
          </div>
          <p className="mt-6 text-xs text-neutral-300">Free · No subscription · Istanbul available now</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/[0.06] py-8 px-6 text-center text-xs text-neutral-300">
        <Link href="/" className="hover:text-black transition-colors font-semibold">VibeGuide</Link> ·
        <Link href="/privacy" className="ml-2 hover:text-black transition-colors">Privacy</Link> ·
        <Link href="/terms" className="ml-2 hover:text-black transition-colors">Terms</Link>
        <p className="mt-2">© {new Date().getFullYear()} VibeGuide. All rights reserved.</p>
      </footer>
    </main>
  );
}
