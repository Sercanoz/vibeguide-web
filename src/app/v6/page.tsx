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
    "local guide Istanbul",
    "walking tour Istanbul",
    "instant guide Istanbul",
  ],
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#171717]">

      {/* NAV */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="text-2xl font-black tracking-tight">VibeGuide</div>
        <div className="hidden gap-8 text-sm font-semibold md:flex">
          <a href="#vibenow" className="hover:text-neutral-500">VibeNow</a>
          <a href="#vibesquad" className="hover:text-neutral-500">VibeSquad</a>
          <a href="#private" className="hover:text-neutral-500">Private Tours</a>
          <div className="flex items-center gap-1 cursor-pointer hover:text-neutral-500">
            <span>Destinations</span>
            <span className="text-xs">▾</span>
          </div>
          <a href="#guides" className="hover:text-neutral-500">For Guides</a>
          <a href="#about" className="hover:text-neutral-500">About Us</a>
        </div>
        <a href="#download" className="rounded-full bg-black px-5 py-2 text-sm font-bold text-white">
          Get the App
        </a>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative h-[600px] w-full md:h-[680px]">
          <Image
            src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1600&q=85"
            alt="Istanbul skyline with Hagia Sophia"
            fill
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />

          <div className="absolute inset-0 mx-auto flex max-w-7xl items-center px-6">
            <div className="w-full md:w-1/2">
              <div className="mb-5 flex flex-wrap items-center gap-3 text-sm font-bold">
                <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  Now live in Istanbul
                </span>
                <span className="flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-neutral-500 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-neutral-300" />
                  Cappadocia &amp; Ephesus coming soon
                </span>
              </div>

              <h1 className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                Not a tour.
                <br />
                A real local
                <br />
                experience.
              </h1>

              <p className="mt-6 max-w-md text-base leading-7 text-neutral-700">
                Discover Istanbul, Old Istanbul, Cappadocia and Ephesus with
                verified local guides. Choose an instant guide, join a group
                experience or book a private tour in Turkey.
              </p>

              <div className="mt-6 flex flex-wrap gap-6 text-sm font-bold text-neutral-700">
                <span className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white text-xs">✓</span>
                  Verified local guides
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white text-xs">⚡</span>
                  Instant or planned
                </span>
                <span className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white text-xs">♡</span>
                  No tourist-trap feeling
                </span>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#download" className="flex items-center gap-2 rounded-full bg-black px-7 py-4 text-sm font-bold text-white">
                  Find a Guide in Istanbul
                  <span>→</span>
                </a>
                <a href="#destinations" className="rounded-full bg-white px-7 py-4 text-sm font-bold shadow-sm">
                  Explore Turkey Tours
                </a>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 md:block lg:right-16">
              <div className="w-72 rounded-[3rem] border-4 border-[#1a1a1a] bg-white shadow-2xl overflow-hidden">
                <div className="bg-[#1a1a1a] px-6 py-2 flex justify-between items-center">
                  <span className="text-white text-xs font-bold">9:41</span>
                  <span className="text-white text-xs">●●●</span>
                </div>
                <div className="bg-[#F6EFE3] p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-neutral-500">Good evening</p>
                      <p className="text-xl font-black">Istanbul</p>
                    </div>
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-bold text-green-700">● Live</span>
                  </div>
                  {[
                    { color: "bg-purple-500", label: "VibeNow", sub: "Instant Guide", text: "Find a local guide near you and go." },
                    { color: "bg-orange-400", label: "VibeSquad", sub: "Group Experience", text: "Travel together. Pay less." },
                    { color: "bg-green-500", label: "Private Tours", sub: "Planned Experience", text: "Your trip, your pace." },
                  ].map((item) => (
                    <div key={item.label} className="mb-3 rounded-2xl bg-white p-3 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.color} text-white text-lg`}>
                          {item.label === "VibeNow" ? "⚡" : item.label === "VibeSquad" ? "👥" : "📅"}
                        </div>
                        <div>
                          <p className="text-xs font-black text-[#6366f1]">{item.label}</p>
                          <p className="text-xs font-black text-neutral-500">{item.sub}</p>
                          <p className="text-xs font-semibold mt-0.5">{item.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-xs font-black uppercase tracking-widest text-neutral-500">
          How it works
        </p>
        <h2 className="mt-3 text-center text-4xl font-black tracking-tight md:text-5xl">
          Three simple ways to explore better.
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { icon: "🔍", title: "Choose your experience", text: "Pick VibeNow for instant guide matching, VibeSquad for group travel or Private Tours for planned experiences." },
            { icon: "👤", title: "Meet a local expert", text: "Connect with guides who know the city, the culture, the history and the routes travelers actually want." },
            { icon: "🗺️", title: "Explore without stress", text: "Enjoy Istanbul tours, private walks and Turkey experiences without confusion, pressure or tourist traps." },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100 text-2xl">
                {item.icon}
              </div>
              <h3 className="mt-5 text-xl font-black">{item.title}</h3>
              <p className="mt-3 leading-7 text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MODE CARDS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-6 md:grid-cols-3">

          {/* VibeNow */}
          <div id="vibenow" className="rounded-[2rem] bg-white p-7 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-purple-400">VIBENOW</p>
            <h2 className="mt-2 text-3xl font-black">Instant Guide</h2>
            <p className="mt-3 leading-7 text-neutral-600">Find a verified local guide near you for today&apos;s plans.</p>
            <ul className="mt-5 space-y-2 text-sm font-semibold text-neutral-700">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Instant matching</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Perfect for today</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Museums, food walks, city routes &amp; more</li>
            </ul>
            <a href="#download" className="mt-6 flex items-center gap-2 text-sm font-black">
              Find Now <span>→</span>
            </a>
            {/* Mini app card */}
            <div className="mt-6 rounded-2xl bg-[#F6EFE3] p-4">
              <div className="rounded-xl bg-white p-3 shadow-sm">
                <p className="text-xs font-bold text-neutral-500">Find a Guide Near You</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-200" />
                  <div>
                    <p className="text-xs font-black">Masons Kişim</p>
                    <p className="text-xs text-neutral-400">⭐ 4.9 · Istanbul</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* VibeSquad */}
          <div id="vibesquad" className="rounded-[2rem] bg-white p-7 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-orange-400">VIBESQUAD</p>
            <h2 className="mt-2 text-3xl font-black">Group Experience</h2>
            <p className="mt-3 leading-7 text-neutral-600">Join other travelers, share the guide cost and explore Turkey together.</p>
            <ul className="mt-5 space-y-2 text-sm font-semibold text-neutral-700">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Shared guide cost</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Social travel experience</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Great for solo travelers, couples &amp; friends</li>
            </ul>
            <a href="#download" className="mt-6 flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-white w-fit">
              Create or Join <span>→</span>
            </a>
            {/* Mini squad card */}
            <div className="mt-6 rounded-2xl bg-[#F6EFE3] p-4">
              <p className="text-xs font-black">Your Squad</p>
              <p className="text-xs text-neutral-500">Topkapi Palace Tour · 4/6 joined</p>
              <div className="mt-2 space-y-1">
                {["Alex", "Maria", "You"].map((name) => (
                  <div key={name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 rounded-full bg-neutral-200" />
                      <span className="text-xs font-semibold">{name}</span>
                    </div>
                    <span className="text-xs text-green-600 font-bold">Joined</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between text-xs font-black">
                <span>Per person <span className="text-lg">€25</span></span>
                <span>Group <span className="text-lg">€18</span></span>
              </div>
            </div>
          </div>

          {/* Private Tours */}
          <div id="private" className="rounded-[2rem] bg-white p-7 shadow-sm">
            <p className="text-xs font-black uppercase tracking-widest text-green-500">PRIVATE TOURS</p>
            <h2 className="mt-2 text-3xl font-black">Planned Experience</h2>
            <p className="mt-3 leading-7 text-neutral-600">Reserve a private guide for your perfect day.</p>
            <ul className="mt-5 space-y-2 text-sm font-semibold text-neutral-700">
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Private walking tours</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Flexible language options</li>
              <li className="flex items-center gap-2"><span className="text-green-500">✓</span> Clear routes and expectations</li>
            </ul>
            <a href="#download" className="mt-6 flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-black text-white w-fit">
              Reserve Now <span>→</span>
            </a>
            {/* Mini tour card */}
            <div className="mt-6 rounded-2xl bg-[#F6EFE3] p-4">
              <p className="text-xs font-black">Private Tour</p>
              <p className="text-sm font-black mt-1">Hagia Sophia &amp;<br />Old City Walk</p>
              <p className="text-xs text-neutral-500 mt-1">4 Hours · From <strong>€120</strong> per group</p>
              <p className="text-xs text-neutral-400 mt-2">Languages: English, Español, 中文</p>
            </div>
          </div>

        </div>
      </section>

      {/* DESTINATIONS */}
      <section id="destinations" className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-xs font-black uppercase tracking-widest text-neutral-500">Explore Turkey</p>
        <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
          The places travelers search for most.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
              alt: "Istanbul skyline",
              title: "Istanbul Tours",
              text: "Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar, Bosphorus, Balat, Galata and Old Istanbul with local experts.",
              tag: "#istanbultours",
            },
            {
              img: "https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80",
              alt: "Cappadocia balloons",
              title: "Cappadocia Tours",
              text: "Fairy chimneys, cave churches, valleys, sunrise viewpoints and hidden local stories with Cappadocia guides.",
              tag: "#cappadociatours",
            },
            {
              img: "https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=800&q=80",
              alt: "Ephesus ruins",
              title: "Ephesus Tours",
              text: "Ancient streets, Roman theaters, temples and the Library of Celsus with licensed tourist guides.",
              tag: "#ephesustours",
            },
          ].map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
              <div className="relative h-52 w-full">
                <Image src={item.img} alt={item.alt} fill className="object-cover" unoptimized />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-3 leading-7 text-neutral-600">{item.text}</p>
                <p className="mt-4 text-sm font-black text-[#6366f1]">{item.tag}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY VIBEGUIDE */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[2.5rem] bg-black p-8 text-white md:p-14">
          <p className="text-center text-xs font-black uppercase tracking-widest text-yellow-400">
            Why choose VibeGuide?
          </p>
          <div className="mt-10 grid gap-8 md:grid-cols-6">
            {[
              { icon: "🛡️", title: "Verified Local Guides", text: "Travel with trusted local experts who know Turkey inside out." },
              { icon: "🌐", title: "Your Language Matters", text: "Find guides in many languages for a comfortable and natural experience." },
              { icon: "🗺️", title: "Curated City Routes", text: "Explore must-see places with real stories and hidden gems." },
              { icon: "⭐", title: "Transparent Experiences", text: "Instant tours, private tours or group experiences with clear details." },
              { icon: "♡", title: "No Tourist Trap", text: "Designed for authentic moments and meaningful connections." },
              { icon: "👥", title: "For Every Traveler", text: "Solo, couple, family, group or business — we've got you covered." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center md:col-span-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 text-2xl">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / DOWNLOAD */}
      <section id="download" className="relative mx-auto mt-10 max-w-7xl overflow-hidden rounded-[2.5rem] px-6">
        <div className="relative h-[420px] w-full overflow-hidden rounded-[2.5rem]">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1400&q=80"
            alt="Travelers in Cappadocia"
            fill
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 flex flex-col items-start justify-center px-10 md:px-16">
            <h2 className="max-w-2xl text-4xl font-black leading-tight text-white md:text-5xl">
              Your next city has a story.
              <br />
              Meet the local who knows it.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-white/70">
              From Istanbul private tours to Cappadocia, Ephesus and Old Istanbul
              walking tours, VibeGuide helps travelers explore Turkey with better local connection.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#" className="flex items-center gap-3 rounded-2xl bg-black px-6 py-3 text-white shadow-lg">
                <span className="text-2xl"></span>
                <div>
                  <p className="text-xs text-white/60">Download on the</p>
                  <p className="text-sm font-black">App Store</p>
                </div>
              </a>
              <a href="#" className="flex items-center gap-3 rounded-2xl bg-white px-6 py-3 shadow-lg">
                <span className="text-2xl">▶</span>
                <div>
                  <p className="text-xs text-neutral-500">GET IT ON</p>
                  <p className="text-sm font-black text-black">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-black/10 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-6">

            {/* Brand */}
            <div className="md:col-span-2">
              <h3 className="text-2xl font-black">VibeGuide</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Instant local guides, private tours, walking tours, group tours
                and authentic city experiences in Turkey.
              </p>
              <div className="mt-5 flex gap-4 text-neutral-400">
                <a href="#" className="hover:text-black font-black text-lg">f</a>
                <a href="#" className="hover:text-black font-black text-lg">in</a>
                <a href="#" className="hover:text-black font-black text-lg">tt</a>
                <a href="#" className="hover:text-black font-black text-lg">▶</a>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-4 grid grid-cols-2 gap-8 text-sm md:grid-cols-4">
              <div>
                <p className="font-black">Product</p>
                <ul className="mt-3 space-y-2 text-neutral-600">
                  <li><a href="#vibenow" className="hover:text-black">VibeNow</a></li>
                  <li><a href="#vibesquad" className="hover:text-black">VibeSquad</a></li>
                  <li><a href="#private" className="hover:text-black">Private Tours</a></li>
                  <li><a href="#how" className="hover:text-black">How it Works</a></li>
                </ul>
              </div>
              <div>
                <p className="font-black">Destinations</p>
                <ul className="mt-3 space-y-2 text-neutral-600">
                  <li><a href="#destinations" className="hover:text-black">Istanbul Tours</a></li>
                  <li><a href="#destinations" className="hover:text-black">Cappadocia Tours</a></li>
                  <li><a href="#destinations" className="hover:text-black">Ephesus Tours</a></li>
                  <li><a href="#destinations" className="hover:text-black">Turkey Tours</a></li>
                </ul>
              </div>
              <div>
                <p className="font-black">Company</p>
                <ul className="mt-3 space-y-2 text-neutral-600">
                  <li><a href="#" className="hover:text-black">About Us</a></li>
                  <li><a href="#guides" className="hover:text-black">For Guides</a></li>
                  <li><a href="#" className="hover:text-black">Contact Us</a></li>
                  <li><a href="#" className="hover:text-black">Blog</a></li>
                </ul>
              </div>
              <div>
                <p className="font-black">Support</p>
                <ul className="mt-3 space-y-2 text-neutral-600">
                  <li><a href="#" className="hover:text-black">Help Center</a></li>
                  <li><a href="#" className="hover:text-black">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-black">Cancellation Policy</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-black/10 pt-10 md:flex-row md:items-center">
            <div>
              <p className="font-black">Subscribe</p>
              <p className="text-sm text-neutral-500">Get travel tips and updates from local experts.</p>
            </div>
            <div className="flex w-full max-w-sm gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm outline-none focus:border-black"
              />
              <button className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white">→</button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-500">
            <p>© 2026 VibeGuide. All rights reserved.</p>
            <p>#istanbultours · #guideinistanbul · #turkeytour · #oldistanbultour · #privatetour · #localguide · #privateguide</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
