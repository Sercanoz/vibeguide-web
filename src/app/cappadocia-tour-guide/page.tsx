import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CityTours from "@/components/CityTours";
import CityFaqSchema, { type Faq } from "@/components/CityFaqSchema";

export const metadata: Metadata = {
  title: "Cappadocia Tour Guide — Hot Air Balloon & Valley Tours | VibeGuide",
  description:
    "Explore Cappadocia with a verified local guide. Hot air balloon tours, Göreme Valley, underground cities, fairy chimneys — book instantly with VibeGuide.",
  keywords: [
    "Cappadocia tour guide",
    "Cappadocia private tour",
    "hot air balloon Cappadocia",
    "Göreme tour guide",
    "Cappadocia valley tour",
    "underground city Cappadocia",
    "fairy chimneys tour",
    "Cappadocia local guide",
    "Uchisar tour",
    "Cappadocia travel guide",
  ],
  alternates: { canonical: "https://www.vibeguideapp.com/cappadocia-tour-guide" },
  openGraph: {
    title: "Cappadocia Tour Guide — Hot Air Balloon & Valley Tours | VibeGuide",
    description:
      "Discover Cappadocia's fairy chimneys, underground cities and hot air balloons with a verified local guide. Instant booking via VibeGuide.",
    url: "https://www.vibeguideapp.com/cappadocia-tour-guide",
    siteName: "VibeGuide",
    type: "website",
  },
};

const HIGHLIGHTS = [
  { icon: "🎈", name: "Hot Air Balloon", desc: "Sunrise over the valleys of Cappadocia — the world's most iconic balloon experience." },
  { icon: "🏔️", name: "Göreme Valley", desc: "Ancient cave churches with Byzantine frescoes, carved into volcanic rock." },
  { icon: "🏰", name: "Uchisar Castle", desc: "The highest point in Cappadocia — panoramic views across the entire region." },
  { icon: "🌋", name: "Derinkuyu Underground City", desc: "8 levels deep, housing 20,000 people. A labyrinth carved 2,000 years ago." },
  { icon: "🏜️", name: "Rose & Red Valley", desc: "Sunset hikes through pink and red rock formations — Cappadocia at its most cinematic." },
  { icon: "🐴", name: "Horseback Riding", desc: "Explore the valleys on horseback — a classic Cappadocia experience your guide can arrange." },
];

const FAQS: Faq[] = [
  {
    q: "How much does a tour guide in Cappadocia cost?",
    a: "Prices depend on the tour type and length. With VibeGuide you see the exact price before you book — most half-day private tours of Göreme and the valleys start from a fixed per-person rate, with no hidden fees. Group tours (VibeSquad) are the most affordable way to explore Cappadocia.",
  },
  {
    q: "Are VibeGuide's Cappadocia guides licensed?",
    a: "Yes. Every guide on VibeGuide holds an official licence from the Turkish Ministry of Culture and Tourism, passes identity verification, and is reviewed after every tour. We have a zero-tolerance policy for unlicensed guiding.",
  },
  {
    q: "Can a guide arrange a hot air balloon tour in Cappadocia?",
    a: "Your VibeGuide local can help you plan around a sunrise hot air balloon flight and recommend reputable, licensed balloon operators — but the balloon ride itself is operated and ticketed separately. Balloons launch at dawn, so most guides build the rest of your day around an early start.",
  },
  {
    q: "When is the best time to visit Cappadocia?",
    a: "Spring (April–June) and autumn (September–October) offer the mildest weather and the most reliable hot air balloon flights. Summer is hot but balloons still fly at dawn, and winter brings magical snow over the fairy chimneys. Your guide can tailor the route to the season.",
  },
  {
    q: "Which areas of Cappadocia will a guide show me?",
    a: "Most tours centre on Göreme and its open-air museum, with stops in Ürgüp, Uçhisar Castle, Avanos pottery workshops, and the Rose, Red and Pigeon valleys. A licensed guide builds a route across these areas based on your time and interests.",
  },
  {
    q: "Can I visit the underground cities with a guide?",
    a: "Yes. Cappadocia's underground cities — Derinkuyu and Kaymaklı — descend several levels into volcanic rock and once sheltered thousands of people. A guide explains the ventilation shafts, rolling stone doors and history, and makes the narrow tunnels far easier to navigate.",
  },
];

const MODES = [
  {
    tag: "VibeNow",
    color: "bg-[#6C4CF1]",
    title: "Instant local guide",
    text: "Arrived in Cappadocia without a plan? Match with a verified local guide in minutes and start exploring immediately.",
  },
  {
    tag: "VibeSquad",
    color: "bg-[#059669]",
    title: "Join a group",
    text: "Share the experience with other travellers. Join a small group tour of Göreme, the valleys or an underground city.",
  },
  {
    tag: "Private Tour",
    color: "bg-[#D97706]",
    title: "Plan your Cappadocia day",
    text: "Fully private guide for balloon day, valley hikes or a sunset dinner — designed entirely around your itinerary.",
  },
];

export default function CappadociaTourGuidePage() {
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
            src="https://images.unsplash.com/photo-1570939274717-7eda259b50ed?q=80&w=1600"
            alt="Cappadocia hot air balloons"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/70 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">Cappadocia · Turkey</p>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight max-w-2xl">
            Cappadocia Tour Guide<br />
            <span className="bg-gradient-to-r from-[#6C4CF1] to-[#8B5CF6] bg-clip-text text-transparent">
              Beyond the Balloon
            </span>
          </h1>
          <p className="mt-6 text-base text-white/50 max-w-lg leading-7">
            Cappadocia is more than a balloon photo. Explore fairy chimneys, underground cities and ancient cave churches with a local who knows every valley.
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
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">Top Experiences</p>
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

      {/* Real tours */}
      <CityTours citySlug="nevsehir" cityName="Cappadocia" />

      {/* Rich SEO content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Why explore Cappadocia with a local guide?</h2>
          <div className="space-y-5 text-[15px] text-neutral-600 leading-8">
            <p>
              Cappadocia is a landscape unlike anywhere else on Earth. Millions of years of volcanic eruptions laid down soft tuff rock, and wind and water carved it into the surreal <strong>fairy chimneys</strong>, ridges and valleys you see today. Early Christians then hollowed the rock into homes, churches and entire underground cities. For a first-time visitor the region can feel overwhelming — the sites are spread across a wide plateau, and the most magical corners are rarely the busy ones.
            </p>
            <p>
              That&apos;s where a <strong>licensed Cappadocia tour guide</strong> changes everything. The region&apos;s most famous sight is the dawn sky filled with colour: a <strong>hot air balloon</strong> ride at sunrise over the valleys is the experience most travellers come for. A good guide helps you plan around an early balloon launch, then builds the rest of your day around the light — golden-hour hikes through the Rose and Red valleys, and panoramic views from <strong>Uçhisar</strong> Castle, the highest point in the region.
            </p>
            <p>
              At the heart of it all is <strong>Göreme</strong> and its open-air museum, a UNESCO World Heritage site where cave churches carved into the rock still hold vivid Byzantine frescoes a thousand years old. Your guide reads the stories in the paintings, points out the monastic refectories, and explains how a community lived inside the stone. Nearby, the towns of <strong>Ürgüp</strong>, <strong>Avanos</strong> — famous for its riverside pottery — and the valleys around them reward anyone willing to step off the standard route.
            </p>
            <p>
              Then there is what lies beneath. Cappadocia&apos;s <strong>underground cities</strong> — <strong>Derinkuyu</strong> and <strong>Kaymaklı</strong> — descend many levels into the earth, complete with ventilation shafts, wells, stables and huge rolling stone doors that once sealed thousands of people safely inside. The narrow tunnels are far easier to understand and navigate with a guide who knows the history and the layout. Every guide on VibeGuide is licensed by the Turkish Ministry of Culture and Tourism, identity-verified, and reviewed after each tour — so you explore the fairy chimneys, churches and underground worlds of Cappadocia with total confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F7F7FB]">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 mb-4">How it works</p>
          <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">Three ways to explore Cappadocia</h2>
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
              All VibeGuide tour guides in Cappadocia hold official Turkish Ministry of Culture licences, pass identity verification, and are reviewed after every tour.
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
      <CityFaqSchema city="Cappadocia" faqs={FAQS} />

      {/* Other destinations — internal linking */}
      <section className="py-16 bg-[#F7F7FB]">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-black mb-6 tracking-tight">Explore more of Turkey</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/istanbul-tour-guide" className="group flex items-center gap-4 rounded-2xl bg-white border border-black/[0.06] p-5 hover:border-[#6C4CF1]/30 transition-colors">
              <span className="text-3xl">🕌</span>
              <div>
                <p className="font-black text-[#0A0A0F] group-hover:text-[#6C4CF1] transition-colors">Istanbul Tour Guide</p>
                <p className="text-sm text-neutral-400">Hagia Sophia, Grand Bazaar & the Bosphorus</p>
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

      <section id="download" className="py-20 bg-[#F7F7FB]">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to explore Cappadocia?</h2>
          <p className="text-neutral-500 mb-8 leading-7">Download VibeGuide free. Find a local guide in 60 seconds.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="flex items-center gap-3 rounded-2xl bg-[#0A0A0F] px-6 py-3.5 text-white font-bold text-sm hover:bg-black/80 transition-colors">
              <span>▶</span> Google Play
            </a>
            <a href="#" className="flex items-center gap-3 rounded-2xl bg-[#0A0A0F] px-6 py-3.5 text-white font-bold text-sm hover:bg-black/80 transition-colors">
              <span>📱</span> App Store
            </a>
          </div>
          <p className="mt-6 text-xs text-neutral-300">Free · No subscription · Cappadocia available now</p>
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
