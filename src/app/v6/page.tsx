import type { Metadata } from "next";

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
    "#istanbultours",
    "#guideinistanbul",
    "#turkeytour",
    "#oldistanbultour",
    "#privatetour",
  ],
};

const experiences = [
  {
    label: "VibeNow",
    title: "Instant Guide",
    text: "Find a verified local guide near you for today's Istanbul tour, museum visit, food walk or city experience.",
  },
  {
    label: "VibeSquad",
    title: "Group Experience",
    text: "Join other travelers, share the guide cost and explore Turkey together with a smarter group price.",
  },
  {
    label: "Private Tours",
    title: "Planned Experience",
    text: "Reserve a private guide for Istanbul, Old Istanbul, Cappadocia, Ephesus and custom Turkey tours.",
  },
];

const destinations = [
  {
    title: "Istanbul Tours",
    text: "Hagia Sophia, Blue Mosque, Topkapi Palace, Grand Bazaar, Bosphorus, Balat, Galata and Old Istanbul with local experts.",
    tag: "#istanbultours",
  },
  {
    title: "Cappadocia Tours",
    text: "Fairy chimneys, cave churches, valleys, sunrise viewpoints and hidden local stories with Cappadocia guides.",
    tag: "#cappadociatours",
  },
  {
    title: "Ephesus Tours",
    text: "Ancient streets, Roman theaters, temples and the Library of Celsus with licensed tourist guides.",
    tag: "#ephesustours",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#171717]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="text-2xl font-black tracking-tight">VibeGuide</div>

        <div className="hidden gap-8 text-sm font-semibold md:flex">
          <a href="#vibenow">VibeNow</a>
          <a href="#vibesquad">VibeSquad</a>
          <a href="#private">Private Tours</a>
          <a href="#destinations">Destinations</a>
          <a href="#guides">For Guides</a>
        </div>

        <a
          href="#download"
          className="rounded-full bg-black px-5 py-2 text-sm font-bold text-white"
        >
          Get the App
        </a>
      </nav>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">
            Built with verified local guides in Turkey
          </p>

          <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Not a tour.
            <br />
            A real local experience.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">
            Discover Istanbul, Old Istanbul, Cappadocia and Ephesus with
            verified local guides. Choose an instant guide, join a group
            experience or book a private tour in Turkey.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-neutral-700">
            <span>✓ Verified local guides</span>
            <span>✓ Instant or planned</span>
            <span>✓ No tourist-trap feeling</span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#download"
              className="rounded-full bg-black px-7 py-4 text-sm font-bold text-white"
            >
              Find a Guide in Istanbul
            </a>
            <a
              href="#destinations"
              className="rounded-full bg-white px-7 py-4 text-sm font-bold shadow-sm"
            >
              Explore Turkey Tours
            </a>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-2xl">
          <div className="rounded-[1.5rem] bg-[#F6EFE3] p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-neutral-500">
                  Good evening
                </p>
                <h2 className="text-2xl font-black">Istanbul</h2>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                Live
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {experiences.map((item) => (
                <div key={item.label} className="rounded-3xl bg-white p-5">
                  <p className="text-xs font-black uppercase tracking-widest text-neutral-400">
                    {item.label}
                  </p>
                  <h3 className="mt-1 text-xl font-black">{item.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-sm font-black uppercase tracking-widest text-neutral-500">
          How it works
        </p>
        <h2 className="mt-3 text-center text-4xl font-black tracking-tight md:text-5xl">
          Three simple ways to explore better.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-[2rem] bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-black">Choose your experience</h3>
            <p className="mt-4 leading-7 text-neutral-600">
              Pick VibeNow for instant guide matching, VibeSquad for group
              travel or Private Tours for planned experiences.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-black">Meet a local expert</h3>
            <p className="mt-4 leading-7 text-neutral-600">
              Connect with guides who know the city, the culture, the history
              and the routes travelers actually want.
            </p>
          </div>

          <div className="rounded-[2rem] bg-white p-7 shadow-sm">
            <h3 className="text-2xl font-black">Explore without stress</h3>
            <p className="mt-4 leading-7 text-neutral-600">
              Enjoy Istanbul tours, private walks and Turkey experiences without
              confusion, pressure or tourist traps.
            </p>
          </div>
        </div>
      </section>

      {/* Mode cards */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-3">
        {experiences.map((item) => (
          <article
            key={item.label}
            id={
              item.label === "VibeNow"
                ? "vibenow"
                : item.label === "VibeSquad"
                  ? "vibesquad"
                  : "private"
            }
            className="rounded-[2rem] bg-white p-7 shadow-sm"
          >
            <p className="text-sm font-black uppercase tracking-widest text-neutral-400">
              {item.label}
            </p>
            <h2 className="mt-3 text-3xl font-black">{item.title}</h2>
            <p className="mt-4 leading-7 text-neutral-600">{item.text}</p>
          </article>
        ))}
      </section>

      {/* Destinations */}
      <section id="destinations" className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-sm font-black uppercase tracking-widest text-neutral-500">
          Explore Turkey
        </p>
        <h2 className="mt-3 max-w-4xl text-4xl font-black tracking-tight md:text-5xl">
          Start with the places travelers search for most.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {destinations.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] bg-white p-7 shadow-sm"
            >
              <p className="text-sm font-black text-neutral-400">{item.tag}</p>
              <h3 className="mt-4 text-3xl font-black">{item.title}</h3>
              <p className="mt-4 leading-7 text-neutral-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Why VibeGuide */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2.5rem] bg-black p-8 text-white md:p-14">
          <p className="text-sm font-black uppercase tracking-widest text-neutral-400">
            Why choose VibeGuide?
          </p>
          <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Built for travelers who want more than a standard tour.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {(
              [
                [
                  "Verified local guides",
                  "Travel with trusted guides who understand Turkey, local culture and traveler expectations.",
                ],
                [
                  "Your language matters",
                  "Find local guide experiences in common and rare languages depending on availability.",
                ],
                [
                  "Curated city routes",
                  "Explore Hagia Sophia, Topkapi Palace, Grand Bazaar, Bosphorus, Cappadocia and Ephesus with context.",
                ],
                [
                  "Private or social",
                  "Choose a private tour, instant guide or shared VibeSquad group experience.",
                ],
                [
                  "No tourist-trap feeling",
                  "Designed for real stories, natural routes and meaningful local connection.",
                ],
                [
                  "For every traveler",
                  "Solo traveler, couple, family, cruise guest or group — VibeGuide fits your travel style.",
                ],
              ] as [string, string][]
            ).map(([title, text]) => (
              <div key={title} className="rounded-[2rem] bg-white/10 p-6">
                <h3 className="text-xl font-black">{title}</h3>
                <p className="mt-3 leading-7 text-neutral-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Guides */}
      <section id="guides" className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-10 rounded-[2.5rem] bg-white p-8 shadow-sm md:grid-cols-2 md:p-14">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-neutral-500">
              For guides
            </p>
            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Your city. Your knowledge. Your next guest.
            </h2>
            <p className="mt-6 leading-8 text-neutral-600">
              VibeGuide helps local guides become visible to travelers searching
              for Istanbul tours, private tours, walking tours, Turkey tours and
              authentic cultural experiences.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#FAF7F0] p-7">
            <h3 className="text-2xl font-black">Guide benefits</h3>
            <ul className="mt-5 space-y-3 font-semibold text-neutral-700">
              <li>✓ Receive instant and planned tour requests</li>
              <li>✓ Show your languages and specialties</li>
              <li>✓ Connect with travelers who are ready to explore</li>
              <li>✓ Build a stronger digital guide profile</li>
            </ul>
            <a
              href="#download"
              className="mt-7 inline-flex rounded-full bg-black px-6 py-3 text-sm font-bold text-white"
            >
              Become a Guide
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="download" className="mx-auto max-w-7xl px-6 py-20 text-center">
        <h2 className="mx-auto max-w-4xl text-5xl font-black tracking-tight md:text-7xl">
          Your next city has a story.
          <br />
          Meet the local who knows it.
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-neutral-600">
          From Istanbul private tours to Cappadocia, Ephesus and Old Istanbul
          walking tours, VibeGuide helps travelers explore Turkey with better
          local connection.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <a className="rounded-full bg-black px-7 py-4 text-sm font-bold text-white">
            Download on the App Store
          </a>
          <a className="rounded-full bg-white px-7 py-4 text-sm font-bold shadow-sm">
            Get it on Google Play
          </a>
        </div>

        <p className="mt-8 text-sm font-semibold text-neutral-500">
          #istanbultours · #guideinistanbul · #turkeytour · #oldistanbultour ·
          #privatetour · #localguide · #privateguide
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">
          <div>
            <h3 className="text-2xl font-black">VibeGuide</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-neutral-600">
              Instant local guides, private tours, walking tours, group tours
              and authentic city experiences in Turkey.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 text-sm font-semibold md:grid-cols-3">
            <div>
              <p className="font-black">Product</p>
              <ul className="mt-3 space-y-2 text-neutral-600">
                <li>VibeNow</li>
                <li>VibeSquad</li>
                <li>Private Tours</li>
              </ul>
            </div>

            <div>
              <p className="font-black">Destinations</p>
              <ul className="mt-3 space-y-2 text-neutral-600">
                <li>Istanbul Tours</li>
                <li>Cappadocia Tours</li>
                <li>Ephesus Tours</li>
                <li>Turkey Tours</li>
              </ul>
            </div>

            <div>
              <p className="font-black">Company</p>
              <ul className="mt-3 space-y-2 text-neutral-600">
                <li>About</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-7xl text-sm text-neutral-500">
          © 2026 VibeGuide. Built for travelers who want real local experiences.
        </p>
      </footer>
    </main>
  );
}
