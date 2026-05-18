import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title:
    "VibeGuide | Don't Just Visit Istanbul. Enter It.",
  description:
    "Discover Istanbul with verified local guides. Instant guides, social group experiences and private tours in Turkey — without tourist traps.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#171717]">
      {/* NAV */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="text-2xl font-bold tracking-tight">VibeGuide</a>
        <div className="hidden gap-8 text-sm font-medium md:flex">
          <a href="#vibenow">VibeNow</a>
          <a href="#vibesquad">VibeSquad</a>
          <a href="#private">Private Tours</a>
          <a href="#destinations">Destinations</a>
          <a href="#guides">For Guides</a>
        </div>
        <a href="#download" className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white">
          Get the App
        </a>
      </nav>

      {/* HERO */}
      <section className="relative">
        {/* Istanbul background fading on right side */}
        <div className="absolute right-0 top-0 hidden h-full w-1/2 md:block">
          <Image
            src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=85&w=1400"
            alt="Istanbul skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F0] via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-12 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#FFD84D] px-4 py-2 text-sm font-semibold">
              ◆ Now live in Istanbul + Cappadocia &amp; Ephesus coming soon
            </p>

            <h1 className="text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Don&apos;t just visit Istanbul.
              <br />
              <span className="text-[#FFD84D]">Enter it.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-700">
              Forget the audio guides and crowded buses. VibeGuide drops you next to a
              <strong> verified local</strong> who actually lives the city — in
              <strong> 60 seconds with VibeNow</strong>, with travelers like you through
              <strong> VibeSquad</strong>, or as a polished day out with a
              <strong> Private Tour</strong>. One app. Three ways. Zero tourist traps.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm font-semibold">
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15">🛡️</span>
                <span>Licensed<br />local guides</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15">⚡</span>
                <span>Instant<br />or planned</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15">♡</span>
                <span>Real local<br />connection</span>
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#vibenow" className="rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white shadow-lg">
                Find a Guide in Istanbul →
              </a>
              <a href="#destinations" className="rounded-full border border-black/15 bg-white px-7 py-3.5 text-sm font-bold">
                Explore Turkey Tours
              </a>
            </div>

            <p className="mt-5 text-xs text-neutral-500">
              #istanbultours · #guideinistanbul · #turkeytour · #oldistanbultour · #privatetour
            </p>
          </div>

          {/* Phone mockup — narrower & taller */}
          <div className="mx-auto w-full max-w-[320px]">
            <Phone>
              <div className="px-5 pt-7 pb-10">
                <div className="flex items-center justify-end">
                  <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-600" /> Live
                  </span>
                </div>
                <p className="mt-6 text-sm font-semibold text-neutral-500">Good evening</p>
                <h2 className="text-3xl font-black">Istanbul</h2>

                <div className="mt-8 space-y-5">
                  {[
                    { color: "bg-[#FFD84D]", icon: "⚡", title: "VibeNow", text: "Tap. Match. Walk out the door in 60 seconds." },
                    { color: "bg-[#B8F2D0]", icon: "👥", title: "VibeSquad", text: "Join travelers heading the same way. Split the price." },
                    { color: "bg-[#D8C7FF]", icon: "📅", title: "Private Tours", text: "Hand-pick your guide. Plan the perfect day." },
                  ].map((c) => (
                    <div key={c.title} className={`flex items-center gap-3 rounded-2xl ${c.color} p-4 shadow-sm`}>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/80 text-lg shadow-sm">
                        {c.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black">{c.title}</p>
                        <p className="text-[11px] leading-snug text-neutral-700">{c.text}</p>
                      </div>
                      <span className="text-neutral-700 text-sm">→</span>
                    </div>
                  ))}
                </div>
              </div>
            </Phone>
          </div>
        </div>
      </section>

      {/* LIVE CITY ENERGY */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-[2rem] bg-black p-6 text-white md:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD84D]">
                Live City Energy
              </p>
              <h2 className="mt-3 text-2xl font-black md:text-3xl">
                Istanbul never stops.
                <br />
                Catch it while it&apos;s alive.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/60">
                Real-time pulse from the streets. While you read this, travelers and guides
                are matching, walking and discovering.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {[
                { icon: "👥", num: "12", text: "Travelers exploring Sultanahmet" },
                { icon: "👥", num: "3", text: "VibeSquads forming daily" },
                { icon: "☀️", num: "8", text: "Sunset Bosphorus routes trending" },
                { icon: "👤", num: "15", text: "Old City guides ready to meet" },
              ].map((s) => (
                <div key={s.text}>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-2xl font-black">{s.num}</span>
                  </div>
                  <p className="mt-1 text-xs leading-snug text-white/70">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODE CARDS */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
            Three ways. One promise.
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
            Pick how you want to meet your city.
          </h2>
          <p className="mt-3 text-base leading-7 text-neutral-700">
            Last-minute and curious? Social and budget-aware? Or planning the day of your life?
            VibeGuide has a mode for every traveler — built around real local guides, not scripts.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* VibeNow */}
          <article id="vibenow" className="overflow-hidden rounded-[2rem] bg-[#FFD84D] p-6 shadow-sm">
            <div className="grid grid-cols-[1fr_auto] gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">VIBENOW · INSTANT</p>
                <h2 className="mt-2 text-2xl font-black leading-tight">Tap. Match. Go.</h2>
                <p className="mt-2 text-xs leading-5 text-neutral-700">
                  Open the app and a verified local is on the way in under a minute.
                  Perfect when you&apos;ve just landed, just woke up, or just decided
                  &quot;let&apos;s do something today.&quot;
                </p>
                <ul className="mt-4 space-y-1.5 text-[11px] font-semibold text-neutral-700">
                  <li>⚡ 60-second matching</li>
                  <li>📍 Real guides near you, right now</li>
                  <li>🏛️ Museums, food walks, hidden streets</li>
                </ul>
                <button className="mt-5 flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-bold text-white">
                  Find Now <span>→</span>
                </button>
              </div>
              <MiniPhone>
                <div className="px-2 pt-1 pb-3">
                  <p className="text-[9px] font-bold">Find a guide<br />near you →</p>
                  <div className="mt-2 h-24 rounded-md bg-gradient-to-br from-[#E0E7FF] via-[#F5F3FF] to-[#FCE7F3] relative">
                    <div className="absolute left-2 top-2 h-5 w-5 rounded-full bg-purple-400 border border-white" />
                    <div className="absolute right-2 top-3 h-5 w-5 rounded-full bg-pink-400 border border-white" />
                    <div className="absolute left-5 bottom-2 h-5 w-5 rounded-full bg-orange-400 border border-white" />
                  </div>
                  <div className="mt-2 rounded-md bg-white p-1.5 shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <div className="h-6 w-6 rounded-full bg-purple-200" />
                      <div className="flex-1">
                        <p className="text-[8px] font-black">Emre</p>
                        <p className="text-[7px] text-neutral-500">Local Guide</p>
                        <p className="text-[7px] text-amber-500">⭐ 4.9 (130)</p>
                      </div>
                      <span className="text-[8px] text-neutral-300">→</span>
                    </div>
                  </div>
                </div>
              </MiniPhone>
            </div>
          </article>

          {/* VibeSquad */}
          <article id="vibesquad" className="overflow-hidden rounded-[2rem] bg-[#B8F2D0] p-6 shadow-sm">
            <div className="grid grid-cols-[1fr_auto] gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">VIBESQUAD · SOCIAL</p>
                <h2 className="mt-2 text-2xl font-black leading-tight">Travel together. Pay less.</h2>
                <p className="mt-2 text-xs leading-5 text-neutral-700">
                  Start a squad or jump into one. As more travelers join the same route,
                  the price per person drops. Same guide, same city, half the cost,
                  ten times the stories.
                </p>
                <ul className="mt-4 space-y-1.5 text-[11px] font-semibold text-neutral-700">
                  <li>💸 Smarter group pricing</li>
                  <li>🌍 Meet travelers from everywhere</li>
                  <li>🤝 Solo? Couple? Best with friends</li>
                </ul>
                <button className="mt-5 flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-bold text-white">
                  Create or Join <span>→</span>
                </button>
              </div>
              <MiniPhone>
                <div className="px-2 pt-1 pb-3 text-center">
                  <p className="text-[9px] font-black">VibeSquad</p>
                  <p className="text-[8px] text-neutral-600">Explore together</p>
                  <p className="text-[7px] font-bold text-green-700">Pay less</p>
                  <div className="mt-1 h-24 rounded-md bg-gradient-to-br from-amber-100 to-pink-100 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end justify-center gap-1 p-1">
                      <div className="h-12 w-4 rounded-t-full bg-neutral-400" />
                      <div className="h-14 w-4 rounded-t-full bg-neutral-500" />
                      <div className="h-12 w-4 rounded-t-full bg-neutral-400" />
                      <div className="h-16 w-4 rounded-t-full bg-neutral-600" />
                      <div className="h-12 w-4 rounded-t-full bg-neutral-400" />
                    </div>
                    <span className="absolute right-1 top-1 rounded-full bg-black px-1 py-0.5 text-[6px] font-bold text-white">+4</span>
                  </div>
                  <div className="mt-1 flex justify-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-4 w-4 rounded-full bg-neutral-300 border border-white" />
                    ))}
                  </div>
                </div>
              </MiniPhone>
            </div>
          </article>

          {/* Private Tours */}
          <article id="private" className="overflow-hidden rounded-[2rem] bg-[#D8C7FF] p-6 shadow-sm">
            <div className="grid grid-cols-[1fr_auto] gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest">PRIVATE TOURS · PLANNED</p>
                <h2 className="mt-2 text-2xl font-black leading-tight">Your day, perfectly tailored.</h2>
                <p className="mt-2 text-xs leading-5 text-neutral-700">
                  Pick your guide, your language, your pace. Licensed tourist guides
                  craft a route just for you — Hagia Sophia at sunrise, Bosphorus by boat,
                  food crawl by night. You decide, they deliver.
                </p>
                <ul className="mt-4 space-y-1.5 text-[11px] font-semibold text-neutral-700">
                  <li>🎓 Licensed tourist guides</li>
                  <li>🗣️ 9+ language options</li>
                  <li>🗺️ Custom routes, zero surprises</li>
                </ul>
                <button className="mt-5 flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-bold text-white">
                  Reserve Now <span>→</span>
                </button>
              </div>
              <MiniPhone>
                <div className="px-2 pt-1 pb-3">
                  <p className="text-[9px] font-black">Private Tour</p>
                  <p className="text-[8px] text-neutral-600">Your trip,<br />your pace</p>
                  <div className="mt-1 h-20 rounded-md bg-gradient-to-br from-amber-200 to-orange-300" />
                  <div className="mt-1 flex items-center gap-1.5">
                    <div className="h-6 w-6 rounded-full bg-purple-200" />
                    <div className="flex-1">
                      <p className="text-[8px] font-black">Ayşe</p>
                      <p className="text-[7px] text-neutral-500">Licensed Guide</p>
                      <p className="text-[7px] text-amber-500">⭐ 5.0 (86)</p>
                    </div>
                    <span className="text-[8px] text-neutral-300">→</span>
                  </div>
                </div>
              </MiniPhone>
            </div>
          </article>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">
          Why VibeGuide Exists
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
          Tourism became too robotic.
          <br />
          <span className="text-neutral-400">We&apos;re making it human again.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg">
          Bus tours read the same script in every city. QR codes replaced real conversations.
          Travelers spend more time queuing than discovering. <strong>VibeGuide flips it.</strong>
          One tap, one local, one real day. Whether you go solo with VibeNow, join a squad
          with VibeSquad, or plan it all with Private Tours — there&apos;s always a real human
          on the other side. <strong>No scripts. No traps. Just the city, told by someone who lives it.</strong>
        </p>
      </section>

      {/* EXPLORE BY VIBE + TRUST & SAFETY (side by side) */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          {/* Vibe categories */}
          <div>
            <h2 className="text-2xl font-black">Explore by vibe</h2>
            <p className="mt-1 text-sm text-neutral-600">Choose the feeling — we&apos;ll match the place and the guide.</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {[
                ["🏛️", "History"],
                ["🍴", "Food & Drink"],
                ["🍷", "Nightlife"],
                ["⛵", "Bosphorus"],
                ["☕", "Hidden Cafés"],
                ["🛍️", "Local Markets"],
                ["📷", "Photo Spots"],
                ["🧿", "Cultural Gems"],
              ].map(([icon, label]) => (
                <div key={label} className="flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-white px-3 py-4 text-center shadow-sm">
                  <span className="text-2xl">{icon}</span>
                  <p className="mt-2 text-xs font-bold">{label}</p>
                </div>
              ))}
            </div>

            {/* EXPLORE TURKEY */}
            <div className="mt-10">
              <h2 className="text-2xl font-black">Explore Turkey</h2>
              <p className="mt-1 text-sm text-neutral-600">The places travelers search for most.</p>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {[
                  {
                    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=900",
                    title: "Istanbul Tours",
                    text: "Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar, Bosphorus, Balat, Galata and Old Istanbul with local experts.",
                    tag: "#istanbultours",
                  },
                  {
                    image: "https://static.independent.co.uk/2025/07/30/13/15/iStock-1339814820.jpeg?crop=1370.7,1370.7,x342.7,y43.7&width=1200&height=1200",
                    title: "Cappadocia Tours",
                    text: "Fairy chimneys, cave churches, valleys, sunrise viewpoints and hidden local stories with Cappadocia guides.",
                    tag: "#cappadociatours",
                  },
                  {
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVBHO_La8teZgkRSYhHRRlrKaEczLIqYuJqQ&s",
                    title: "Ephesus Tours",
                    text: "Ancient streets, Roman theaters, temples and the Library of Celsus with licensed tourist guides.",
                    tag: "#ephesustours",
                  },
                ].map((d) => (
                  <article key={d.title} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                    <div className="relative h-40">
                      <Image src={d.image} alt={d.title} fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-black">{d.title}</h3>
                      <p className="mt-2 text-xs leading-5 text-neutral-600">{d.text}</p>
                      <p className="mt-3 text-xs font-bold text-purple-600">{d.tag}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          {/* Trust & Safety side panel */}
          <aside id="guides" className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">Trust &amp; Safety</h2>
            <div className="mt-5 space-y-5">
              {[
                { icon: "👤", title: "Licensed Tourist Guides", text: "Travel with professionals who know Turkey's culture, history and local rules." },
                { icon: "✓", title: "Verified Local Experts", text: "Profiles are reviewed so travelers can feel safe before meeting their guide." },
                { icon: "📋", title: "Clear Experience Details", text: "Know the route, duration, language, meeting point and expectations." },
                { icon: "🚫", title: "No Tourist Trap Feeling", text: "Designed for authentic moments, local stories and real connections." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-base">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-black">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-neutral-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="mt-6 inline-block text-sm font-bold underline">
              See all safety standards →
            </a>
          </aside>
        </div>
      </section>

      {/* TESTIMONIALS + DOWNLOAD */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_1fr_1.2fr]">
          {/* Quote header */}
          <div className="rounded-2xl bg-black p-5 text-white md:col-span-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFD84D]">Traveler feeling</p>
            <h3 className="mt-3 text-lg font-black leading-tight">The city feels different with the right guide.</h3>
            <div className="mt-4 flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-7 w-7 rounded-full bg-neutral-400 border-2 border-black" />
              ))}
            </div>
            <p className="mt-2 text-[10px] text-white/60">Loved by travelers<br />around the world.</p>
          </div>

          {/* 3 testimonials */}
          {[
            { quote: "It felt less like a tour and more like discovering Istanbul with a local friend.", name: "— Sarah, USA" },
            { quote: "Perfect for a last-minute plan. We found a guide and explored without stress.", name: "— Marco, Italy" },
            { quote: "VibeSquad made the experience social, affordable and way more fun.", name: "— Lina, Germany" },
          ].map((t) => (
            <div key={t.name} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-amber-400">★★★★★</p>
              <p className="mt-2 text-xs leading-5 text-neutral-700">{t.quote}</p>
              <p className="mt-3 text-[11px] font-semibold text-neutral-500">{t.name}</p>
            </div>
          ))}

          {/* Download card */}
          <div id="download" className="rounded-2xl bg-[#FFD84D] p-5">
            <h3 className="text-base font-black">Download VibeGuide</h3>
            <p className="mt-2 text-xs leading-5 text-neutral-800">
              Instant local guides, private tours, walking tours, group experiences and authentic city discovery in Turkey.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a href="#" className="flex items-center justify-center gap-2 rounded-lg bg-black px-3 py-2 text-white">
                <span></span>
                <div className="text-left">
                  <p className="text-[8px] leading-none text-white/60">Download on the</p>
                  <p className="text-xs font-bold">App Store</p>
                </div>
              </a>
              <a href="#" className="flex items-center justify-center gap-2 rounded-lg bg-black px-3 py-2 text-white">
                <span>▶</span>
                <div className="text-left">
                  <p className="text-[8px] leading-none text-white/60">GET IT ON</p>
                  <p className="text-xs font-bold">Google Play</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-10 border-t border-black/10 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr_1fr_1.5fr]">
            <div>
              <h3 className="text-xl font-black">VibeGuide</h3>
              <p className="mt-3 max-w-xs text-xs leading-5 text-neutral-600">
                Instant local guides, private tours, walking tours, group tours and authentic city experiences in Turkey.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-black">Product</h4>
              <ul className="mt-3 space-y-2 text-xs text-neutral-600">
                <li><a href="#vibenow">VibeNow</a></li>
                <li><a href="#vibesquad">VibeSquad</a></li>
                <li><a href="#private">Private Tours</a></li>
                <li><a href="#">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black">Destinations</h4>
              <ul className="mt-3 space-y-2 text-xs text-neutral-600">
                <li>Istanbul Tours</li>
                <li>Cappadocia Tours</li>
                <li>Ephesus Tours</li>
                <li>Turkey Tours</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black">Support</h4>
              <ul className="mt-3 space-y-2 text-xs text-neutral-600">
                <li>Help Center</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
                <li>Cancellation Policy</li>
              </ul>
            </div>

            <div className="text-right">
              <p className="text-xs text-neutral-500">© 2026 VibeGuide. All rights reserved.</p>
              <p className="mt-3 text-[11px] leading-5 text-neutral-500">
                #istanbultours · #guideinistanbul · #turkeytour
                <br />#oldistanbultour · #privatetour · #localguide
                <br />#privateguide · #istanbulprivatetour
              </p>
              <div className="mt-4 flex justify-end gap-3 text-neutral-400">
                <a href="#" aria-label="Instagram">📷</a>
                <a href="#" aria-label="TikTok">♪</a>
                <a href="#" aria-label="YouTube">▶</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[3rem] bg-gradient-to-b from-[#1a1a1a] to-[#000] p-[5px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
      <div className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l-md bg-[#2a2a2a]" />
      <div className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l-md bg-[#2a2a2a]" />
      <div className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r-md bg-[#2a2a2a]" />
      <div className="relative overflow-hidden rounded-[2.6rem] bg-white">
        <div className="relative flex items-center justify-between px-7 pt-3 pb-2">
          <span className="text-[13px] font-semibold text-black">9:41</span>
          <div className="absolute left-1/2 top-2.5 h-7 w-24 -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center gap-1.5 text-black">
            <svg width="16" height="10" viewBox="0 0 18 11" fill="currentColor">
              <rect x="0" y="7" width="3.5" height="4" rx="0.6" />
              <rect x="5" y="5" width="3.5" height="6" rx="0.6" />
              <rect x="10" y="2.5" width="3.5" height="8.5" rx="0.6" />
              <rect x="15" y="0" width="3.5" height="11" rx="0.6" />
            </svg>
            <svg width="24" height="10" viewBox="0 0 27 11" fill="none">
              <rect x="0.5" y="0.5" width="22" height="10" rx="2.5" stroke="currentColor" />
              <rect x="2" y="2" width="19" height="7" rx="1" fill="currentColor" />
            </svg>
          </div>
        </div>
        {children}
        <div className="flex justify-center pb-2">
          <div className="h-1 w-24 rounded-full bg-black" />
        </div>
      </div>
    </div>
  );
}

function MiniPhone({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[110px] shrink-0">
      <div className="relative rounded-[1.3rem] bg-[#0a0a0a] p-[2.5px] shadow-lg">
        <div className="relative overflow-hidden rounded-[1.1rem] bg-white">
          <div className="relative flex items-center justify-between px-2 pt-1 pb-0.5">
            <span className="text-[6px] font-semibold">9:41</span>
            <div className="absolute left-1/2 top-1 h-2 w-8 -translate-x-1/2 rounded-full bg-black" />
            <div className="flex items-center gap-0.5">
              <svg width="7" height="4" viewBox="0 0 18 11" fill="currentColor">
                <rect x="0" y="7" width="3.5" height="4" rx="0.6" />
                <rect x="5" y="5" width="3.5" height="6" rx="0.6" />
                <rect x="10" y="2.5" width="3.5" height="8.5" rx="0.6" />
                <rect x="15" y="0" width="3.5" height="11" rx="0.6" />
              </svg>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
