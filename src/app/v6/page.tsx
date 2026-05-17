import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title:
    "VibeGuide | Istanbul Tours, Private Guides & Local Experiences in Turkey",
  description:
    "Find verified local guides for Istanbul tours, Old Istanbul walking tours, private tours, Cappadocia tours, Ephesus tours and authentic Turkey travel experiences.",
  keywords: [
    "Istanbul tours",
    "private guide Istanbul",
    "guide in Istanbul",
    "Old Istanbul tour",
    "Turkey tour",
    "private tour Turkey",
    "licensed tourist guide Turkey",
    "Hagia Sophia tour",
    "Topkapi Palace tour",
    "Grand Bazaar tour",
    "Cappadocia tours",
    "Ephesus tours",
    "walking tour Istanbul",
    "#istanbultours",
    "#guideinistanbul",
    "#turkeytour",
    "#oldistanbultour",
    "#privatetour",
  ],
};

const images = {
  hero:
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=85&w=1600",
  istanbul:
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=900",
  cappadocia:
    "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=900",
  ephesus:
    "https://images.unsplash.com/photo-1589561253898-768105ca91a8?q=80&w=900",
  bottom:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400",
};

const destinations = [
  {
    title: "Istanbul Tours",
    image: images.istanbul,
    alt: "Istanbul skyline and historic city view",
    text: "Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar, Bosphorus, Balat, Galata and Old Istanbul with local experts.",
    tag: "#istanbultours",
  },
  {
    title: "Cappadocia Tours",
    image: images.cappadocia,
    alt: "Hot air balloons over Cappadocia valleys",
    text: "Fairy chimneys, cave churches, valleys, sunrise viewpoints and hidden local stories with Cappadocia guides.",
    tag: "#cappadociatours",
  },
  {
    title: "Ephesus Tours",
    image: images.ephesus,
    alt: "Ancient ruins of Ephesus in Turkey",
    text: "Ancient streets, Roman theaters, temples and the Library of Celsus with licensed tourist guides.",
    tag: "#ephesustours",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#171717]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="text-2xl font-black">VibeGuide</div>

        <div className="hidden gap-8 text-sm font-semibold md:flex">
          <a href="#vibenow">VibeNow</a>
          <a href="#vibesquad">VibeSquad</a>
          <a href="#private">Private Tours</a>
          <a href="#destinations">Destinations</a>
          <a href="#guides">For Guides</a>
          <a href="#about">About Us</a>
        </div>

        <button className="rounded-full bg-black px-5 py-2 text-sm font-bold text-white">
          Get the App
        </button>
      </nav>

      <section className="relative overflow-hidden">
        <Image
          src={images.hero}
          alt="Istanbul skyline with historic landmarks"
          fill
          priority
          className="object-cover opacity-30"
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">
                🟡 Now live in Istanbul
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">
                ✧ Cappadocia &amp; Ephesus coming soon
              </span>
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              Not a tour.
              <br />A real local experience.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
              Discover Istanbul, Old Istanbul, Cappadocia and Ephesus with
              verified local guides. Choose an instant guide, join a group
              experience or book a private tour in Turkey.
            </p>

            <div className="mt-8 flex flex-wrap gap-5 text-sm font-bold">
              <span>✓ Verified local guides</span>
              <span>⚡ Instant or planned</span>
              <span>♡ No tourist-trap feeling</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-black px-7 py-4 text-sm font-bold text-white">
                Find a Guide in Istanbul →
              </button>
              <button className="rounded-full bg-white px-7 py-4 text-sm font-bold shadow-sm">
                Explore Turkey Tours
              </button>
            </div>
          </div>

          {/* iPhone mockup — gerçek telefon görünümü */}
          <div className="mx-auto w-full max-w-[340px]">
            <div className="relative rounded-[3rem] bg-gradient-to-b from-[#1a1a1a] to-[#000] p-[6px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_0_2px_rgba(255,255,255,0.05)_inset]">
              {/* Side buttons */}
              <div className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l-md bg-[#2a2a2a]" />
              <div className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l-md bg-[#2a2a2a]" />
              <div className="absolute -left-[3px] top-56 h-14 w-[3px] rounded-l-md bg-[#2a2a2a]" />
              <div className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r-md bg-[#2a2a2a]" />

              {/* Screen */}
              <div className="relative overflow-hidden rounded-[2.6rem] bg-white">
                {/* Status bar */}
                <div className="relative flex items-center justify-between px-7 pt-3 pb-3">
                  <span className="text-[14px] font-semibold text-black">9:41</span>
                  {/* Dynamic Island */}
                  <div className="absolute left-1/2 top-2.5 h-[30px] w-28 -translate-x-1/2 rounded-full bg-black" />
                  <div className="flex items-center gap-1.5 text-black">
                    <svg width="18" height="11" viewBox="0 0 18 11" fill="currentColor">
                      <rect x="0" y="7" width="3.5" height="4" rx="0.6" />
                      <rect x="5" y="5" width="3.5" height="6" rx="0.6" />
                      <rect x="10" y="2.5" width="3.5" height="8.5" rx="0.6" />
                      <rect x="15" y="0" width="3.5" height="11" rx="0.6" />
                    </svg>
                    <svg width="16" height="11" viewBox="0 0 15 11" fill="currentColor">
                      <path d="M7.5 0C4.6 0 1.9 1.1 0 2.9l1.4 1.5C2.9 2.9 5.1 2 7.5 2s4.6.9 6.1 2.4L15 2.9C13.1 1.1 10.4 0 7.5 0zm0 4c-1.9 0-3.6.7-5 1.9l1.4 1.4C5 6.4 6.2 6 7.5 6c1.3 0 2.5.4 3.5 1.3l1.4-1.4C11.1 4.7 9.4 4 7.5 4zm0 4c-.9 0-1.8.3-2.5.9l1.5 1.6C7 10 7.2 9.9 7.5 9.9c.3 0 .5.1.5.1l1.5-1.6C8.8 8.3 7.9 8 7.5 8z" />
                    </svg>
                    <svg width="28" height="12" viewBox="0 0 27 11" fill="none">
                      <rect x="0.5" y="0.5" width="22" height="10" rx="2.5" stroke="currentColor" />
                      <rect x="2" y="2" width="19" height="7" rx="1" fill="currentColor" />
                      <rect x="23.5" y="3.5" width="2" height="4" rx="0.5" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* App content */}
                <div className="px-5 pt-6 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-neutral-500">Good evening</p>
                      <h2 className="text-3xl font-black">Istanbul</h2>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                      Live
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      ["⚡", "VibeNow", "Instant Guide", "Find a local guide near you and go."],
                      ["👥", "VibeSquad", "Group Experience", "Travel together. Pay less."],
                      ["📅", "Private Tours", "Planned Experience", "Your trip, your pace."],
                    ].map(([icon, name, type, text]) => (
                      <div key={name} className="rounded-2xl bg-[#FAF7F0] p-4">
                        <div className="text-2xl">{icon}</div>
                        <h3 className="mt-1 text-lg font-black">{name}</h3>
                        <p className="text-[11px] font-bold text-purple-600">{type}</p>
                        <p className="mt-1 text-xs leading-snug text-neutral-600">{text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Home indicator */}
                  <div className="mt-5 flex justify-center">
                    <div className="h-1 w-28 rounded-full bg-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-sm font-black uppercase tracking-widest">
          How it works
        </p>
        <h2 className="mt-3 text-center text-4xl font-black">
          Three simple ways to explore better.
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            [
              "Choose your experience",
              "Pick VibeNow for instant guide matching, VibeSquad for group travel or Private Tours for planned experiences.",
            ],
            [
              "Meet a local expert",
              "Connect with guides who know the city, the culture, the history and the routes travelers actually want.",
            ],
            [
              "Explore without stress",
              "Enjoy Istanbul tours, private walks and Turkey experiences without confusion, pressure or tourist traps.",
            ],
          ].map(([title, text]) => (
            <div key={title} className="rounded-[2rem] bg-white p-8 text-center shadow-sm">
              <h3 className="text-2xl font-black">{title}</h3>
              <p className="mt-4 leading-7 text-neutral-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3">
        {[
          {
            id: "vibenow",
            label: "VIBENOW",
            title: "Instant Guide",
            text: "Find a verified local guide near you for today's plans.",
            cta: "Find Now →",
            points: ["Instant matching", "Perfect for today", "Museums, food walks, city routes & more"],
          },
          {
            id: "vibesquad",
            label: "VIBESQUAD",
            title: "Group Experience",
            text: "Join other travelers, share the guide cost and explore Turkey together.",
            cta: "Create or Join →",
            points: ["Shared guide cost", "Social travel experience", "Great for solo travelers, couples & friends"],
          },
          {
            id: "private",
            label: "PRIVATE TOURS",
            title: "Planned Experience",
            text: "Reserve a private guide for your perfect day.",
            cta: "Reserve Now →",
            points: ["Private walking tours", "Flexible language options", "Clear routes and expectations"],
          },
        ].map((card) => (
          <article
            id={card.id}
            key={card.id}
            className="rounded-[2rem] bg-white p-8 shadow-sm"
          >
            <p className="text-sm font-black uppercase tracking-widest text-purple-600">
              {card.label}
            </p>
            <h2 className="mt-3 text-3xl font-black">{card.title}</h2>
            <p className="mt-4 leading-7 text-neutral-600">{card.text}</p>

            <ul className="mt-6 space-y-3 text-sm font-semibold text-neutral-700">
              {card.points.map((point) => (
                <li key={point}>✓ {point}</li>
              ))}
            </ul>

            <button className="mt-8 rounded-full bg-black px-6 py-3 text-sm font-bold text-white">
              {card.cta}
            </button>
          </article>
        ))}
      </section>

      <section id="destinations" className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-sm font-black uppercase tracking-widest">
          Explore Turkey
        </p>
        <h2 className="mt-3 text-center text-4xl font-black">
          The places travelers search for most.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {destinations.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
              <div className="relative h-56">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-neutral-600">{item.text}</p>
                <p className="mt-4 text-sm font-bold text-purple-600">
                  {item.tag}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm font-black uppercase tracking-widest text-yellow-400">
            Why choose VibeGuide?
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-6">
            {[
              ["Verified Local Guides", "Travel with trusted local experts who know Turkey inside out."],
              ["Your Language Matters", "Find guides in many languages for a comfortable and natural experience."],
              ["Curated City Routes", "Explore must-see places with real stories and hidden gems."],
              ["Transparent Experiences", "Instant tours, private tours or group experiences with clear details."],
              ["No Tourist Trap", "Designed for authentic moments and meaningful connections."],
              ["For Every Traveler", "Solo, couple, family, group or business — we've got you covered."],
            ].map(([title, text]) => (
              <div key={title} className="text-center">
                <h3 className="font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-20">
        <Image
          src={images.bottom}
          alt="Travelers exploring Turkey"
          fill
          className="object-cover opacity-30"
        />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <h2 className="max-w-xl text-4xl font-black">
            Your next city has a story.
            <br />
            Meet the local who knows it.
          </h2>

          <div className="flex gap-4">
            <button className="rounded-xl bg-black px-6 py-3 text-sm font-bold text-white">
              Download on the App Store
            </button>
            <button className="rounded-xl bg-black px-6 py-3 text-sm font-bold text-white">
              Get it on Google Play
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-white px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-5">
          <div>
            <h3 className="text-2xl font-black">VibeGuide</h3>
            <p className="mt-4 text-sm leading-6 text-neutral-600">
              Instant local guides, private tours, walking tours, group tours
              and authentic city experiences in Turkey.
            </p>
          </div>

          {(
            [
              ["Product", ["VibeNow", "VibeSquad", "Private Tours", "How It Works"]],
              ["Destinations", ["Istanbul Tours", "Cappadocia Tours", "Ephesus Tours", "Turkey Tours"]],
              ["Company", ["About Us", "For Guides", "Contact Us", "Blog"]],
              ["Support", ["Help Center", "Terms of Service", "Privacy Policy", "Cancellation Policy"]],
            ] as [string, string[]][]
          ).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-black">{title}</h4>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                {links.map((link) => (
                  <li key={link}>{link}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-7xl text-sm text-neutral-500">
          © 2026 VibeGuide. All rights reserved.
        </p>

        <p className="mx-auto mt-4 max-w-7xl text-sm font-semibold text-neutral-500">
          #istanbultours · #guideinistanbul · #turkeytour · #oldistanbultour ·
          #privatetour · #localguide · #privateguide
        </p>
      </footer>
    </main>
  );
}
