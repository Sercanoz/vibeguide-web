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
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              ),
              iconBg: "bg-purple-100 text-purple-700",
              title: "Choose your experience",
              text: "Pick VibeNow for instant guide matching, VibeSquad for group travel or Private Tours for planned experiences.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
              ),
              iconBg: "bg-yellow-100 text-yellow-700",
              title: "Meet a local expert",
              text: "Connect with guides who know the city, the culture, the history and the routes travelers actually want.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" />
                  <path d="M9 4v16" />
                  <path d="M15 6v16" />
                </svg>
              ),
              iconBg: "bg-green-100 text-green-700",
              title: "Explore without stress",
              text: "Enjoy Istanbul tours, private walks and Turkey experiences without confusion, pressure or tourist traps.",
            },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center px-6 text-center">
              <div className={`flex h-14 w-14 items-center justify-center rounded-full ${item.iconBg}`}>
                {item.icon}
              </div>
              <h3 className="mt-6 text-xl font-black">{item.title}</h3>
              <p className="mt-3 max-w-xs leading-7 text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODE CARDS — split with mini phone preview */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3">
        {/* VibeNow */}
        <article id="vibenow" className="overflow-hidden rounded-[2rem] bg-[#F3EEFF] shadow-sm">
          <div className="grid grid-cols-[1fr_auto] gap-4 p-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-purple-600">VIBENOW</p>
              <h2 className="mt-2 text-2xl font-black leading-tight">Instant Guide</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">Find a verified local guide near you for today&apos;s plans.</p>
              <ul className="mt-5 space-y-2 text-xs font-semibold text-neutral-700">
                <li className="flex items-start gap-2"><span className="mt-0.5 text-green-500">✓</span> Instant matching</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-green-500">✓</span> Perfect for today</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-green-500">✓</span> Museums, food walks, city routes &amp; more</li>
              </ul>
              <button className="mt-5 flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white">
                Find Now <span>→</span>
              </button>
            </div>
            {/* Mini phone */}
            <MiniPhone>
              <p className="text-[9px] font-bold text-neutral-500">Find a Guide Near You</p>
              <div className="mt-2 h-32 rounded-md bg-gradient-to-br from-[#E0E7FF] via-[#F5F3FF] to-[#FCE7F3] relative">
                <div className="absolute left-3 top-3 h-7 w-7 rounded-full bg-purple-300 border-2 border-white" />
                <div className="absolute right-4 top-6 h-7 w-7 rounded-full bg-pink-300 border-2 border-white" />
                <div className="absolute left-8 bottom-3 h-7 w-7 rounded-full bg-orange-300 border-2 border-white" />
              </div>
              <p className="mt-2 text-[8px] font-bold">Marjorie Kitabis</p>
              <div className="mt-2 flex items-center gap-1.5">
                <div className="h-5 w-5 rounded-full bg-purple-200" />
                <div>
                  <p className="text-[8px] font-black">Elif A.</p>
                  <p className="text-[7px] text-neutral-400">⭐ 4.9</p>
                </div>
              </div>
            </MiniPhone>
          </div>
        </article>

        {/* VibeSquad */}
        <article id="vibesquad" className="overflow-hidden rounded-[2rem] bg-[#FFF5E6] shadow-sm">
          <div className="grid grid-cols-[1fr_auto] gap-4 p-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-orange-500">VIBESQUAD</p>
              <h2 className="mt-2 text-2xl font-black leading-tight">Group Experience</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">Join other travelers, share the guide cost and explore together.</p>
              <ul className="mt-5 space-y-2 text-xs font-semibold text-neutral-700">
                <li className="flex items-start gap-2"><span className="mt-0.5 text-green-500">✓</span> Shared guide cost</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-green-500">✓</span> Social travel experience</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-green-500">✓</span> Great for solo travelers, couples &amp; friends</li>
              </ul>
              <button className="mt-5 flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white">
                Create or Join <span>→</span>
              </button>
            </div>
            <MiniPhone>
              <p className="text-[9px] font-black">Your Squad</p>
              <p className="text-[8px] font-bold">Topkapi Palace Tour</p>
              <p className="text-[7px] text-neutral-400">4/6 joined</p>
              <div className="mt-2 space-y-1.5">
                {[
                  ["Alex", "Joined"],
                  ["Maria", "Joined"],
                  ["You", "Joined"],
                  ["James", "Invite"],
                ].map(([name, status]) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="h-3.5 w-3.5 rounded-full bg-neutral-300" />
                      <span className="text-[8px] font-semibold">{name}</span>
                    </div>
                    <span className={`text-[7px] font-bold ${status === "Invite" ? "rounded-full bg-black px-1.5 py-0.5 text-white" : "text-green-600"}`}>{status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between border-t border-neutral-200 pt-1.5">
                <div>
                  <p className="text-[6px] text-neutral-500">Price per person</p>
                  <p className="text-xs font-black">€25</p>
                </div>
                <div className="text-right">
                  <p className="text-[6px] text-neutral-500">Group price</p>
                  <p className="text-xs font-black">€18</p>
                </div>
              </div>
            </MiniPhone>
          </div>
        </article>

        {/* Private Tours */}
        <article id="private" className="overflow-hidden rounded-[2rem] bg-[#F0FDF4] shadow-sm">
          <div className="grid grid-cols-[1fr_auto] gap-4 p-6">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-green-600">PRIVATE TOURS</p>
              <h2 className="mt-2 text-2xl font-black leading-tight">Planned Experience</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">Reserve a private guide for your perfect day.</p>
              <ul className="mt-5 space-y-2 text-xs font-semibold text-neutral-700">
                <li className="flex items-start gap-2"><span className="mt-0.5 text-green-500">✓</span> Private walking tours</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-green-500">✓</span> Flexible language options</li>
                <li className="flex items-start gap-2"><span className="mt-0.5 text-green-500">✓</span> Clear routes and expectations</li>
              </ul>
              <button className="mt-5 flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white">
                Reserve Now <span>→</span>
              </button>
            </div>
            <MiniPhone>
              <p className="text-[8px] font-bold text-neutral-500">Private Tour</p>
              <p className="mt-1 text-[11px] font-black leading-tight">Hagia Sophia &amp;<br />Old City Walk</p>
              <div className="mt-2 h-16 rounded-md bg-gradient-to-br from-amber-200 to-orange-300" />
              <div className="mt-2 flex justify-between">
                <div>
                  <p className="text-[7px] text-neutral-500">4 Hours</p>
                  <p className="text-[7px] text-neutral-500">From</p>
                  <p className="text-xs font-black">€120</p>
                  <p className="text-[6px] text-neutral-400">per group</p>
                </div>
              </div>
              <div className="mt-1.5 border-t border-neutral-200 pt-1.5">
                <p className="text-[7px] text-neutral-500">Languages</p>
                <p className="text-[7px] font-semibold">English, Español, 中文</p>
              </div>
              <button className="mt-2 w-full rounded-full bg-black py-1 text-[8px] font-bold text-white">Reserve Now</button>
            </MiniPhone>
          </div>
        </article>
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

function MiniPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[120px] shrink-0">
      <div className="relative rounded-[1.5rem] bg-[#0a0a0a] p-[3px] shadow-xl">
        <div className="relative overflow-hidden rounded-[1.3rem] bg-white">
          {/* Status bar */}
          <div className="relative flex items-center justify-between px-3 pt-1.5 pb-1">
            <span className="text-[7px] font-semibold">9:41</span>
            <div className="absolute left-1/2 top-1 h-2.5 w-10 -translate-x-1/2 rounded-full bg-black" />
            <div className="flex items-center gap-0.5">
              <svg width="8" height="5" viewBox="0 0 18 11" fill="currentColor">
                <rect x="0" y="7" width="3.5" height="4" rx="0.6" />
                <rect x="5" y="5" width="3.5" height="6" rx="0.6" />
                <rect x="10" y="2.5" width="3.5" height="8.5" rx="0.6" />
                <rect x="15" y="0" width="3.5" height="11" rx="0.6" />
              </svg>
              <svg width="10" height="5" viewBox="0 0 27 11" fill="none">
                <rect x="0.5" y="0.5" width="22" height="10" rx="2.5" stroke="currentColor" />
                <rect x="2" y="2" width="19" height="7" rx="1" fill="currentColor" />
              </svg>
            </div>
          </div>
          <div className="px-2.5 pb-3">{children}</div>
        </div>
      </div>
    </div>
  );
}
