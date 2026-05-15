import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VibeGuide | Instant Local Guides, Private Tours & Group Experiences",
  description:
    "Book verified local guides, licensed tourist guides, private walking tours, group experiences and authentic city tours in Istanbul, Cappadocia, Ephesus and beyond.",
  keywords: [
    "VibeGuide",
    "instant local guide",
    "licensed tourist guide",
    "private tours",
    "walking tours",
    "Istanbul tours",
    "Cappadocia tours",
    "Ephesus tours",
    "group tours",
    "local experiences",
    "Turkey travel guide",
    "book a tour guide",
  ],
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1F1F1F]">
      <section className="mx-auto max-w-7xl px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight">VibeGuide</div>
          <div className="hidden gap-8 text-sm font-medium md:flex">
            <a href="#vibenow">VibeNow</a>
            <a href="#vibesquad">VibeSquad</a>
            <a href="#private-tours">Private Tours</a>
            <a href="#guides">For Guides</a>
          </div>
          <a
            href="#download"
            className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white"
          >
            Get the app
          </a>
        </nav>

        <div className="grid items-center gap-12 py-20 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">
              Instant guides. Real locals. Better travel.
            </p>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              Not a tour.
              <br />
              A real local experience.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
              VibeGuide connects travelers with verified local guides, licensed
              tourist guides, private walking tours and group experiences in
              minutes. Explore Istanbul, Cappadocia, Ephesus and unforgettable
              cities with people who actually know the story.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#download"
                className="rounded-full bg-black px-7 py-4 text-center font-bold text-white"
              >
                Find Your Guide
              </a>
              <a
                href="#how-it-works"
                className="rounded-full border border-black/15 bg-white px-7 py-4 text-center font-bold"
              >
                See how it works
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="block text-xl">Verified</strong>
                Local guides
              </div>
              <div>
                <strong className="block text-xl">Flexible</strong>
                Instant or planned
              </div>
              <div>
                <strong className="block text-xl">Local</strong>
                No tourist traps
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-5 shadow-2xl">
            <div className="rounded-[1.5rem] bg-[#F5EFE6] p-5">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500">Good evening</p>
                  <h3 className="text-2xl font-black">Istanbul</h3>
                </div>
                <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                  Live
                </span>
              </div>

              <div className="space-y-4">
                <FeatureCard
                  label="VibeNow"
                  title="Tap. Match. Go."
                  text="Find a verified local guide near you for a private city walk, museum visit or cultural experience today."
                />
                <FeatureCard
                  label="VibeSquad"
                  title="Travel together. Pay less."
                  text="Start a group, invite friends or join other travelers. As the squad grows, the price becomes smarter."
                />
                <FeatureCard
                  label="Private Tours"
                  title="Planned around you."
                  text="Book licensed tourist guides for private tours, family trips, food routes and historical experiences."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-bold uppercase tracking-widest text-neutral-500">
            How it works
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-black md:text-5xl">
            Three simple ways to experience the city.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Step
              number="01"
              title="Choose your experience"
              text="Pick VibeNow for instant guide matching, VibeSquad for group savings or Private Tours for planned experiences."
            />
            <Step
              number="02"
              title="Match with a local expert"
              text="Connect with verified guides who know the city, the culture, the history and your language."
            />
            <Step
              number="03"
              title="Explore without the stress"
              text="No scripts, no queues, no tourist traps. Just a better way to discover the place you came to see."
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <Mode
              id="vibenow"
              eyebrow="Instant"
              title="VibeNow"
              headline="Find a local guide instantly."
              text="Perfect for travelers who just landed, finished breakfast, left the hotel or suddenly decided they want to explore today."
              points={[
                "Private guide matching",
                "Great for things to do today",
                "Ideal for city walks and museums",
              ]}
            />

            <Mode
              id="vibesquad"
              eyebrow="Social"
              title="VibeSquad"
              headline="Start a group. Lower the price."
              text="Create a shared experience, invite friends or join other travelers heading to the same place."
              points={[
                "Group-based pricing",
                "Social travel experience",
                "Great for friends, couples and solo travelers",
              ]}
            />

            <Mode
              id="private-tours"
              eyebrow="Planned"
              title="Private Tours"
              headline="Book the guide before the day begins."
              text="For families, business travelers, cultural visitors and guests who want a more organized premium tour."
              points={[
                "Licensed tourist guides",
                "Museum and historical routes",
                "Flexible language options",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="bg-black py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-bold uppercase tracking-widest text-white/50">
            Why VibeGuide
          </p>
          <h2 className="mt-3 max-w-4xl text-4xl font-black md:text-5xl">
            Built for travelers who want more than a standard tour.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Benefit
              title="Verified local guides"
              text="Travel with trusted local experts and licensed tourist guides where regulation requires it."
            />
            <Benefit
              title="Your language matters"
              text="From common languages to premium rare-language specialists, VibeGuide helps travelers feel understood."
            />
            <Benefit
              title="Transparent experiences"
              text="Choose instant tours, group experiences or private reservations with clear routes and clear expectations."
            />
            <Benefit
              title="Curated city routes"
              text="Explore iconic places like Hagia Sophia, Topkapi Palace, Cappadocia valleys and Ephesus with local context."
            />
            <Benefit
              title="No tourist-trap feeling"
              text="Designed for real stories, smart routes, cultural details and natural local experiences."
            />
            <Benefit
              title="Flexible for every trip"
              text="Solo traveler, couple, family, cruise guest or group — choose the format that fits your day."
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="font-bold uppercase tracking-widest text-neutral-500">
            Explore Turkey
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-black md:text-5xl">
            Start with the cities travelers search for most.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <City
              title="Istanbul Tours"
              text="Hagia Sophia, Topkapi Palace, Grand Bazaar, Bosphorus, food streets and hidden neighborhoods with an Istanbul local guide."
            />
            <City
              title="Cappadocia Tours"
              text="Fairy chimneys, valleys, cave churches, sunrise viewpoints and local stories with a Cappadocia guide."
            />
            <City
              title="Ephesus Tours"
              text="Ancient streets, temples, theaters and Roman history with an Ephesus guide and licensed tourist expert."
            />
          </div>
        </div>
      </section>

      <section id="guides" className="py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
          <div>
            <p className="font-bold uppercase tracking-widest text-neutral-500">
              For guides
            </p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              Your city. Your knowledge. Your next guest.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-neutral-700">
              VibeGuide helps professional local guides become more visible to
              travelers looking for instant tours, private reservations and
              shared group experiences. Build trust with a verified profile,
              language skills, specialties and authentic local expertise.
            </p>
            <a
              href="#download"
              className="mt-8 inline-flex rounded-full bg-black px-7 py-4 font-bold text-white"
            >
              Become a Guide
            </a>
          </div>
        </div>
      </section>

      <section id="download" className="bg-[#F5EFE6] py-24 text-center">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-4xl font-black md:text-6xl">
            Your next city has a story.
            <br />
            Meet the local who knows it.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-700">
            From instant local guides to private tours and group experiences,
            VibeGuide helps travelers explore more naturally, safely and
            meaningfully.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a className="rounded-full bg-black px-7 py-4 font-bold text-white">
              App Store
            </a>
            <a className="rounded-full bg-white px-7 py-4 font-bold">
              Google Play
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-black px-6 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">
          <div>
            <div className="text-2xl font-black">VibeGuide</div>
            <p className="mt-2 max-w-md text-white/60">
              Instant local guides, private tours, walking tours, group tours
              and authentic city experiences.
            </p>
          </div>
          <div className="text-sm text-white/50">
            © 2026 VibeGuide. Built for travelers, by travelers.
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm font-bold text-neutral-500">{label}</p>
      <h4 className="mt-1 text-xl font-black">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
    </div>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-[#FAF7F2] p-8">
      <p className="text-sm font-black text-neutral-400">{number}</p>
      <h3 className="mt-4 text-2xl font-black">{title}</h3>
      <p className="mt-3 leading-7 text-neutral-700">{text}</p>
    </div>
  );
}

function Mode({
  id,
  eyebrow,
  title,
  headline,
  text,
  points,
}: {
  id: string;
  eyebrow: string;
  title: string;
  headline: string;
  text: string;
  points: string[];
}) {
  return (
    <article id={id} className="rounded-[2rem] bg-white p-8 shadow-sm">
      <p className="font-bold uppercase tracking-widest text-neutral-400">
        {eyebrow}
      </p>
      <h3 className="mt-3 text-3xl font-black">{title}</h3>
      <h4 className="mt-4 text-xl font-bold">{headline}</h4>
      <p className="mt-3 leading-7 text-neutral-700">{text}</p>
      <ul className="mt-6 space-y-3">
        {points.map((point) => (
          <li key={point} className="font-semibold">
            ✓ {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Benefit({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl bg-white/10 p-7">
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-3 leading-7 text-white/70">{text}</p>
    </div>
  );
}

function City({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-black/10 p-8">
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-3 leading-7 text-neutral-700">{text}</p>
    </div>
  );
}
