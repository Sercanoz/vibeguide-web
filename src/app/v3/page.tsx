import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VibeGuide | Instant Local Guides, Private Tours & Group Experiences",
  description:
    "Book verified local guides for instant private tours, walking tours, city experiences and group tours. Explore Istanbul, Cappadocia, Ephesus and more with licensed tourist guides.",
  keywords: [
    "VibeGuide",
    "local guide app",
    "instant tour guide",
    "private tour guide",
    "licensed tourist guide",
    "Istanbul local guide",
    "Istanbul private tour",
    "things to do in Istanbul",
    "Cappadocia guide",
    "Ephesus guide",
    "Turkey travel app",
    "walking tours",
    "group tours",
    "city experiences",
    "verified tour guides",
    "book a tour guide",
  ],
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F8F6F1] text-[#1F1F1F]">
      {/* HERO */}
      <section className="px-6 py-24 text-center max-w-5xl mx-auto">
        <p className="mb-4 text-sm font-semibold tracking-[0.25em] uppercase text-[#8B6F47]">
          VibeGuide
        </p>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Not a tour. A real local experience.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-[#555] max-w-3xl mx-auto leading-relaxed">
          VibeGuide connects travelers with verified local guides, licensed
          tourist guides and private walking tours in minutes. Explore Istanbul,
          Cappadocia, Ephesus and the world&apos;s most unforgettable cities with
          real locals — no scripts, no queues, no tourist traps.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="rounded-full bg-[#1F1F1F] text-white px-8 py-4 font-semibold">
            Find Your Guide
          </button>

          <button className="rounded-full border border-[#1F1F1F] px-8 py-4 font-semibold">
            Explore Experiences
          </button>
        </div>
      </section>

      {/* OPTIONS */}
      <section className="px-6 py-16 max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            VibeNow — Find a Local Guide Instantly
          </h2>
          <p className="text-[#555] leading-relaxed">
            Just landed? Open VibeGuide and match with a verified local guide
            for an instant private tour, city walk or cultural experience near
            you. Perfect for travelers searching for things to do today.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            VibeSquad — Group Tours That Cost Less
          </h2>
          <p className="text-[#555] leading-relaxed">
            Start a group tour, invite friends or join other travelers. The more
            people join, the lower the price gets. Discover the city together
            with a real local guide.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">
            Private Tours — Planned Around You
          </h2>
          <p className="text-[#555] leading-relaxed">
            Book licensed tourist guides for private tours, museum visits,
            walking tours, food experiences, family trips and cultural routes in
            your own language.
          </p>
        </div>
      </section>

      {/* WHY */}
      <section className="px-6 py-20 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold">
          Why Travelers Choose VibeGuide
        </h2>

        <p className="mt-6 text-lg text-[#555] leading-relaxed max-w-3xl mx-auto">
          VibeGuide is built for travelers who want safe, flexible and authentic
          city experiences. Book verified guides, private tours, walking tours
          and local experiences in your own language.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold mb-2">Verified Guides</h3>
            <p className="text-sm text-[#555]">
              Travel with trusted local guides and licensed tourist guides.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold mb-2">Instant Matching</h3>
            <p className="text-sm text-[#555]">
              Find a guide near you when you need one.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold mb-2">Local Experiences</h3>
            <p className="text-sm text-[#555]">
              Discover culture, food, history and hidden corners.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold mb-2">Flexible Tours</h3>
            <p className="text-sm text-[#555]">
              Choose instant tours, group tours or private reservations.
            </p>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Explore Turkey With Local Experts
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-3">Istanbul Tours</h3>
            <p className="text-[#555] leading-relaxed">
              Discover Hagia Sophia, Topkapi Palace, Grand Bazaar, Bosphorus,
              food streets and hidden neighborhoods with an Istanbul local
              guide.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-3">Cappadocia Tours</h3>
            <p className="text-[#555] leading-relaxed">
              Explore fairy chimneys, valleys, cave churches, sunrise viewpoints
              and authentic local stories with a Cappadocia guide.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-3">Ephesus Tours</h3>
            <p className="text-[#555] leading-relaxed">
              Walk through ancient streets, temples, theaters and Roman history
              with an Ephesus guide and licensed tourist expert.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 py-24 text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold">
          Your next city has a story. Meet the local who knows it.
        </h2>

        <p className="mt-6 text-lg text-[#555] leading-relaxed">
          From instant local guides to private tours and group experiences,
          VibeGuide helps travelers explore more naturally, safely and
          meaningfully.
        </p>

        <button className="mt-10 rounded-full bg-[#1F1F1F] text-white px-8 py-4 font-semibold">
          Start Exploring
        </button>
      </section>

      {/* FOOTER SEO LINE */}
      <footer className="px-6 py-10 border-t border-[#E5E0D6] text-center">
        <p className="text-sm text-[#666] max-w-4xl mx-auto leading-relaxed">
          VibeGuide is a travel app for booking instant local guides, licensed
          tourist guides, private tours, walking tours, group tours and
          authentic city experiences in Istanbul, Cappadocia, Ephesus and
          beyond.
        </p>
      </footer>
    </main>
  );
}
