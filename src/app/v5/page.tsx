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
    <main className="min-h-screen bg-[#FAF7F0] text-[#171717]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="text-2xl font-bold tracking-tight">VibeGuide</div>
        <div className="hidden gap-8 text-sm font-medium md:flex">
          <a href="#vibenow">VibeNow</a>
          <a href="#vibesquad">VibeSquad</a>
          <a href="#private">Private Tours</a>
          <a href="#guides">For Guides</a>
        </div>
        <a
          href="#download"
          className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white"
        >
          Get the app
        </a>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">
            Now live in Istanbul · Cappadocia & Ephesus coming soon
          </p>

          <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
            Not a tour. <br />
            A real local experience.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-700">
            VibeGuide connects travelers with verified local guides, licensed
            tourist guides, private walking tours and group experiences in
            minutes. Explore the city through someone who actually knows the
            story.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#download"
              className="rounded-full bg-[#111] px-7 py-4 font-semibold text-white shadow-lg"
            >
              Find Your Guide
            </a>
            <a
              href="#how"
              className="rounded-full border border-neutral-300 bg-white px-7 py-4 font-semibold"
            >
              See how it works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium">
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
              ✓ Verified local guides
            </span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
              ✓ Instant or planned
            </span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
              ✓ No tourist-trap feeling
            </span>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-2xl">
          <div className="rounded-[1.5rem] bg-[#F4EFE6] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Good evening</p>
                <h3 className="text-2xl font-bold">Istanbul</h3>
              </div>
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                Live
              </span>
            </div>

            <div className="space-y-4">
              <ExperienceCard
                color="bg-yellow-300"
                title="VibeNow"
                subtitle="Tap. Match. Go."
                text="Find a verified local guide near you for a private city walk, museum visit or cultural experience today."
              />

              <ExperienceCard
                color="bg-green-300"
                title="VibeSquad"
                subtitle="Travel together. Pay less."
                text="Start a group, invite friends or join other travelers. As the squad grows, the price becomes smarter."
              />

              <ExperienceCard
                color="bg-purple-300"
                title="Private Tours"
                subtitle="Planned around you."
                text="Book licensed guides for families, food routes, historical sites and premium cultural experiences."
              />
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-6 py-20">
        <p className="mb-3 font-semibold text-neutral-500">How it works</p>
        <h2 className="max-w-3xl text-4xl font-extrabold md:text-5xl">
          Three simple ways to experience the city.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
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
            title="Explore without stress"
            text="No scripts, no queues, no tourist traps. Just a better way to discover the place you came to see."
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <ModeCard
            id="vibenow"
            tag="Instant"
            title="VibeNow"
            headline="Find a local guide instantly."
            bullets={[
              "Private guide matching",
              "Great for things to do today",
              "Ideal for city walks and museums",
            ]}
          />

          <ModeCard
            id="vibesquad"
            tag="Social"
            title="VibeSquad"
            headline="Start a group. Lower the price."
            bullets={[
              "Group-based pricing",
              "Social travel experience",
              "Great for friends, couples and solo travelers",
            ]}
          />

          <ModeCard
            id="private"
            tag="Planned"
            title="Private Tours"
            headline="Book the guide before the day begins."
            bullets={[
              "Licensed tourist guides",
              "Museum and historical routes",
              "Flexible language options",
            ]}
          />
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 font-semibold text-neutral-500">Why VibeGuide</p>
          <h2 className="max-w-3xl text-4xl font-extrabold md:text-5xl">
            Built for travelers who want more than a standard tour.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Feature
              title="Verified local guides"
              text="Travel with trusted local experts and licensed tourist guides where regulation requires it."
            />
            <Feature
              title="Your language matters"
              text="From common languages to premium rare-language specialists, VibeGuide helps travelers feel understood."
            />
            <Feature
              title="Transparent experiences"
              text="Choose instant tours, group experiences or private reservations with clear routes and clear expectations."
            />
            <Feature
              title="Curated city routes"
              text="Explore iconic places like Hagia Sophia, Topkapi Palace, Cappadocia valleys and Ephesus with local context."
            />
            <Feature
              title="No tourist-trap feeling"
              text="Designed for real stories, smart routes, cultural details and natural local experiences."
            />
            <Feature
              title="Flexible for every trip"
              text="Solo traveler, couple, family, cruise guest or group — choose the format that fits your day."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-3 font-semibold text-neutral-500">Explore Turkey</p>
        <h2 className="max-w-3xl text-4xl font-extrabold md:text-5xl">
          Start with the cities travelers search for most.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Destination
            title="Istanbul Tours"
            text="Hagia Sophia, Topkapi Palace, Grand Bazaar, Bosphorus, food streets and hidden neighborhoods with an Istanbul local guide."
          />
          <Destination
            title="Cappadocia Tours"
            text="Fairy chimneys, valleys, cave churches, sunrise viewpoints and local stories with a Cappadocia guide."
          />
          <Destination
            title="Ephesus Tours"
            text="Ancient streets, temples, theaters and Roman history with an Ephesus guide and licensed tourist expert."
          />
        </div>
      </section>

      <section id="guides" className="bg-[#171717] px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-semibold text-white/60">For guides</p>
          <h2 className="max-w-3xl text-4xl font-extrabold md:text-5xl">
            Your city. Your knowledge. Your next guest.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
            VibeGuide helps professional local guides become more visible to
            travelers looking for instant tours, private reservations and shared
            group experiences.
          </p>
          <a
            href="#download"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-4 font-semibold text-black"
          >
            Become a Guide
          </a>
        </div>
      </section>

      <section id="download" className="px-6 py-24 text-center">
        <h2 className="mx-auto max-w-3xl text-4xl font-extrabold md:text-6xl">
          Your next city has a story. Meet the local who knows it.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-700">
          From instant local guides to private tours and group experiences,
          VibeGuide helps travelers explore more naturally, safely and
          meaningfully.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a className="rounded-full bg-black px-7 py-4 font-semibold text-white">
            App Store
          </a>
          <a className="rounded-full border bg-white px-7 py-4 font-semibold">
            Google Play
          </a>
        </div>
      </section>

      <footer className="border-t bg-white px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">
          <div>
            <h3 className="text-xl font-bold">VibeGuide</h3>
            <p className="mt-2 max-w-md text-sm text-neutral-600">
              Instant local guides, private tours, walking tours, group tours
              and authentic city experiences.
            </p>
          </div>
          <p className="text-sm text-neutral-500">
            © 2026 VibeGuide. Built for travelers, by travelers.
          </p>
        </div>
      </footer>
    </main>
  );
}

function ExperienceCard({
  color,
  title,
  subtitle,
  text,
}: {
  color: string;
  title: string;
  subtitle: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className={`mb-4 h-2 w-14 rounded-full ${color}`} />
      <h4 className="text-xl font-bold">{title}</h4>
      <p className="mt-1 font-semibold text-neutral-700">{subtitle}</p>
      <p className="mt-3 text-sm leading-6 text-neutral-600">{text}</p>
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
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <p className="text-sm font-bold text-neutral-400">{number}</p>
      <h3 className="mt-4 text-2xl font-bold">{title}</h3>
      <p className="mt-4 leading-7 text-neutral-600">{text}</p>
    </div>
  );
}

function ModeCard({
  id,
  tag,
  title,
  headline,
  bullets,
}: {
  id: string;
  tag: string;
  title: string;
  headline: string;
  bullets: string[];
}) {
  return (
    <div id={id} className="rounded-[2rem] bg-white p-8 shadow-sm">
      <p className="text-sm font-bold text-neutral-500">{tag}</p>
      <h3 className="mt-3 text-3xl font-extrabold">{title}</h3>
      <p className="mt-2 text-lg font-semibold">{headline}</p>
      <ul className="mt-6 space-y-3 text-neutral-700">
        {bullets.map((item) => (
          <li key={item}>✓ {item}</li>
        ))}
      </ul>
    </div>
  );
}

function Feature({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl bg-[#FAF7F0] p-7">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-neutral-600">{text}</p>
    </div>
  );
}

function Destination({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-sm">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 leading-7 text-neutral-600">{text}</p>
    </div>
  );
}
