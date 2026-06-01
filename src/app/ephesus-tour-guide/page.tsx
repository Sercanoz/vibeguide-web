import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CityTours from "@/components/CityTours";
import CityFaqSchema, { type Faq } from "@/components/CityFaqSchema";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";

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

const FAQS: Faq[] = [
  {
    q: "How much does a tour guide at Ephesus cost?",
    a: "Prices depend on the tour type and duration. With VibeGuide you see the exact price before you book — most half-day private tours of Ephesus start from a fixed per-person rate, with no hidden fees. Group tours (VibeSquad) are the most affordable way to explore the ancient city.",
  },
  {
    q: "Are VibeGuide's Ephesus guides licensed?",
    a: "Yes. Every guide on VibeGuide holds an official licence from the Turkish Ministry of Culture and Tourism, passes identity verification, and is reviewed after every tour. Many Ephesus guides are also trained in archaeology and ancient history. We have a zero-tolerance policy for unlicensed guiding.",
  },
  {
    q: "Will I see the Library of Celsus on the tour?",
    a: "Yes. The Library of Celsus is the iconic centrepiece of Ephesus, and every guided route includes it. Your guide explains its 2nd-century Roman architecture, the statues representing wisdom and virtue, and how it once held thousands of scrolls.",
  },
  {
    q: "Can I visit the Temple of Artemis with a guide?",
    a: "Yes. The Temple of Artemis — one of the Seven Wonders of the Ancient World — sits just minutes from the main site near Selçuk. Only a single column remains standing today, and a guide brings its scale and history to life in a way the ruins alone cannot.",
  },
  {
    q: "Is the House of the Virgin Mary included?",
    a: "It can be. The House of the Virgin Mary, in the hills above Ephesus, is a pilgrimage site sacred to both Christians and Muslims. Many private and full-day tours combine it with Ephesus and the Temple of Artemis — just let your guide know you'd like to include it.",
  },
  {
    q: "Where is Ephesus and can I combine it with Şirince village?",
    a: "Ephesus is near the town of Selçuk in İzmir province, on Turkey's Aegean coast, close to Kuşadası. The charming hillside village of Şirince, famous for its fruit wines and Ottoman houses, is just a short drive away — guides often combine the two into one relaxed day.",
  },
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
      <Navbar />

      <section className="relative bg-[#0A0A0F] text-white pt-32 pb-24 overflow-hidden">
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

      {/* Real tours */}
      <CityTours citySlug="izmir" cityName="Ephesus" />

      {/* Rich SEO content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">Why explore Ephesus with a local guide?</h2>
          <div className="space-y-5 text-[15px] text-neutral-600 leading-8">
            <p>
              <strong>Ephesus</strong> is one of the best-preserved ancient cities in the world — a Greek and later Roman metropolis that was once home to a quarter of a million people. Walking its marble streets, you pass temples, baths, fountains and grand civic buildings exactly where they stood two thousand years ago. But ruins are silent on their own. Without context, a column is just a column; with a knowledgeable <strong>Ephesus tour guide</strong>, the same stones become the story of emperors, merchants, philosophers and saints who shaped the ancient Mediterranean.
            </p>
            <p>
              The undisputed icon of the site is the <strong>Library of Celsus</strong>, a soaring 2nd-century Roman façade that once held thousands of scrolls. A few steps away, the vast <strong>Great Theatre</strong> seated some 25,000 spectators and is where, according to tradition, St Paul preached to the Ephesians. A guide explains the engineering, the acoustics, and the daily life that filled these spaces — turning a quick photo stop into a genuine understanding of how the city worked.
            </p>
            <p>
              Just minutes from the main entrance, near Selçuk, stands what remains of the <strong>Temple of Artemis</strong> — once one of the <strong>Seven Wonders of the Ancient World</strong>, now reduced to a single reconstructed column, yet still powerful when its history is told well. Many tours also climb into the hills to the <strong>House of the Virgin Mary</strong>, a pilgrimage site revered by Christians and Muslims alike, and pause at the extraordinary <strong>Terrace Houses</strong>, where mosaic floors and painted walls of wealthy Roman villas survive under climate-controlled shelters.
            </p>
            <p>
              Ephesus sits near the town of <strong>Selçuk</strong> in <strong>İzmir</strong> province, on Turkey&apos;s Aegean coast and close to Kuşadası, making it easy to combine with the wine village of Şirince. Because so much of Ephesus is interpretation — reading inscriptions, picturing vanished roofs, understanding Roman politics — a licensed, archaeology-savvy guide makes all the difference. Every guide on VibeGuide is licensed by the Turkish Ministry of Culture and Tourism, identity-verified, and reviewed after each tour, so you can walk through history with someone who truly knows it.
            </p>
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

      {/* FAQ + schema */}
      <CityFaqSchema city="Ephesus" faqs={FAQS} />

      {/* Other destinations — internal linking */}
      <section className="py-16 bg-[#F7F7FB]">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-2xl font-black mb-6 tracking-tight">Explore more of Turkey</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/attractions/en/ephesus" className="group flex items-center gap-4 rounded-2xl bg-white border border-black/[0.06] p-5 hover:border-[#6C4CF1]/30 transition-colors">
              <span className="text-3xl">🏛️</span>
              <div>
                <p className="font-black text-[#0A0A0F] group-hover:text-[#6C4CF1] transition-colors">Ephesus Travel Guide</p>
                <p className="text-sm text-neutral-400">Library of Celsus, Great Theatre & more</p>
              </div>
            </Link>
            <Link href="/istanbul-tour-guide" className="group flex items-center gap-4 rounded-2xl bg-white border border-black/[0.06] p-5 hover:border-[#6C4CF1]/30 transition-colors">
              <span className="text-3xl">🕌</span>
              <div>
                <p className="font-black text-[#0A0A0F] group-hover:text-[#6C4CF1] transition-colors">Istanbul Tour Guide</p>
                <p className="text-sm text-neutral-400">Hagia Sophia, Grand Bazaar & the Bosphorus</p>
              </div>
            </Link>
            <Link href="/cappadocia-tour-guide" className="group flex items-center gap-4 rounded-2xl bg-white border border-black/[0.06] p-5 hover:border-[#6C4CF1]/30 transition-colors">
              <span className="text-3xl">🎈</span>
              <div>
                <p className="font-black text-[#0A0A0F] group-hover:text-[#6C4CF1] transition-colors">Cappadocia Tour Guide</p>
                <p className="text-sm text-neutral-400">Hot air balloons, fairy chimneys & cave churches</p>
              </div>
            </Link>
            <Link href="/tours" className="group flex items-center gap-4 rounded-2xl bg-white border border-black/[0.06] p-5 hover:border-[#6C4CF1]/30 transition-colors">
              <span className="text-3xl">🗺️</span>
              <div>
                <p className="font-black text-[#0A0A0F] group-hover:text-[#6C4CF1] transition-colors">All Tours</p>
                <p className="text-sm text-neutral-400">Browse every VibeGuide experience</p>
              </div>
            </Link>
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

      {/* BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "VibeGuide", item: "https://www.vibeguideapp.com" },
              { "@type": "ListItem", position: 2, name: "Ephesus Tour Guide", item: "https://www.vibeguideapp.com/ephesus-tour-guide" },
            ],
          }),
        }}
      />

      <MainFooter />
    </main>
  );
}
