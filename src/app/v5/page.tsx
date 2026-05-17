import type { Metadata } from "next";
import Image from "next/image";

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

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div>
          <p className="mb-5 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">
            Now live in Istanbul · Cappadocia &amp; Ephesus coming soon
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
                ● Live
              </span>
            </div>

            <div className="space-y-4">
              <ExperienceCard
                icon="⚡"
                iconBg="bg-yellow-400"
                title="VibeNow"
                subtitle="Tap. Match. Go."
                text="Find a verified local guide near you for a private city walk, museum visit or cultural experience today."
              />
              <ExperienceCard
                icon="👥"
                iconBg="bg-green-400"
                title="VibeSquad"
                subtitle="Travel together. Pay less."
                text="Start a group, invite friends or join other travelers. As the squad grows, the price becomes smarter."
              />
              <ExperienceCard
                icon="📅"
                iconBg="bg-purple-400"
                title="Private Tours"
                subtitle="Planned around you."
                text="Book licensed guides for families, food routes, historical sites and premium cultural experiences."
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-6 py-20">
        <p className="mb-3 font-semibold text-neutral-500">How it works</p>
        <h2 className="max-w-3xl text-4xl font-extrabold md:text-5xl">
          Three simple ways to experience the city.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Step
            number="01"
            icon="📍"
            iconBg="bg-yellow-100"
            title="Choose your experience"
            text="Pick VibeNow for instant guide matching, VibeSquad for group savings or Private Tours for planned experiences."
          />
          <Step
            number="02"
            icon="👥"
            iconBg="bg-green-100"
            title="Match with a local expert"
            text="Connect with verified guides who know the city, the culture, the history and your language."
          />
          <Step
            number="03"
            icon="❤️"
            iconBg="bg-purple-100"
            title="Explore without stress"
            text="No scripts, no queues, no tourist traps. Just a better way to discover the place you came to see."
          />
        </div>
      </section>

      {/* Mode cards */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <ModeCard
            id="vibenow"
            tag="Instant"
            tagColor="bg-yellow-100 text-yellow-800"
            icon="⚡"
            iconBg="bg-yellow-400"
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
            tagColor="bg-green-100 text-green-800"
            icon="👥"
            iconBg="bg-green-400"
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
            tagColor="bg-purple-100 text-purple-800"
            icon="📅"
            iconBg="bg-purple-400"
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

      {/* Why VibeGuide */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 font-semibold text-neutral-500">Why VibeGuide</p>
          <h2 className="max-w-3xl text-4xl font-extrabold md:text-5xl">
            Built for travelers who want more than a standard tour.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Feature icon="🛡️" title="Verified local guides" text="Travel with trusted local experts and licensed tourist guides where regulation requires it." />
            <Feature icon="🌐" title="Your language matters" text="From common languages to premium rare-language specialists, VibeGuide helps travelers feel understood." />
            <Feature icon="🗺️" title="Transparent experiences" text="Choose instant tours, group experiences or private reservations with clear routes and clear expectations." />
            <Feature icon="🏛️" title="Curated city routes" text="Explore iconic places like Hagia Sophia, Topkapi Palace, Cappadocia valleys and Ephesus with local context." />
            <Feature icon="🚫" title="No tourist-trap feeling" text="Designed for real stories, smart routes, cultural details and natural local experiences." />
            <Feature icon="👨‍👩‍👧‍👦" title="Flexible for every trip" text="Solo traveler, couple, family, cruise guest or group — choose the format that fits your day." />
          </div>
        </div>
      </section>

      {/* Explore Turkey */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <p className="mb-3 font-semibold text-neutral-500">Explore Turkey</p>
        <h2 className="max-w-3xl text-4xl font-extrabold md:text-5xl">
          Start with the cities travelers search for most.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Destination
            image="https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800&q=80"
            alt="Istanbul Hagia Sophia"
            title="Istanbul Tours"
            text="Hagia Sophia, Topkapi Palace, Grand Bazaar, Bosphorus, food streets and hidden neighborhoods with an Istanbul local guide."
          />
          <Destination
            image="https://images.unsplash.com/photo-1570939274717-7eda259b50ed?w=800&q=80"
            alt="Cappadocia hot air balloons"
            title="Cappadocia Tours"
            text="Fairy chimneys, valleys, cave churches, sunrise viewpoints and local stories with a Cappadocia guide."
          />
          <Destination
            image="https://images.unsplash.com/photo-1589561253898-768105ca91a8?w=800&q=80"
            alt="Ephesus ancient ruins"
            title="Ephesus Tours"
            text="Ancient streets, temples, theaters and Roman history with an Ephesus guide and licensed tourist expert."
          />
        </div>
      </section>

      {/* For Guides */}
      <section
        id="guides"
        className="relative overflow-hidden bg-[#171717] px-6 py-24 text-white"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=1400&q=80')",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
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

      {/* CTA / Download */}
      <section id="download" className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="rounded-[2rem] bg-[#F4EFE6] p-8">
              <div className="rounded-[1.5rem] bg-white p-5 shadow-lg">
                <p className="text-sm font-semibold text-neutral-500">VibeGuide App</p>
                <h3 className="mt-2 text-2xl font-bold">Istanbul</h3>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-2xl">
                    ⚡
                  </div>
                  <div>
                    <p className="font-bold">VibeNow</p>
                    <p className="text-sm text-neutral-500">3 guides available nearby</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-400 text-2xl">
                    👥
                  </div>
                  <div>
                    <p className="font-bold">VibeSquad</p>
                    <p className="text-sm text-neutral-500">2 travelers joining now</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-extrabold md:text-5xl">
                Your next city has a story.
                <br />
                Meet the local who knows it.
              </h2>
              <p className="mt-6 text-lg text-neutral-700">
                From instant local guides to private tours and group experiences,
                VibeGuide helps travelers explore more naturally, safely and
                meaningfully.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-2xl bg-black px-6 py-4 text-white"
                >
                  <span className="text-2xl"></span>
                  <div className="text-left">
                    <p className="text-xs text-white/60">Download on the</p>
                    <p className="font-bold">App Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-6 py-4"
                >
                  <span className="text-2xl">▶</span>
                  <div className="text-left">
                    <p className="text-xs text-neutral-500">GET IT ON</p>
                    <p className="font-bold">Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
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
  icon,
  iconBg,
  title,
  subtitle,
  text,
}: {
  icon: string;
  iconBg: string;
  title: string;
  subtitle: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl ${iconBg}`}
        >
          {icon}
        </div>
        <div>
          <h4 className="text-lg font-bold">{title}</h4>
          <p className="font-semibold text-neutral-600">{subtitle}</p>
          <p className="mt-2 text-sm leading-6 text-neutral-500">{text}</p>
        </div>
      </div>
    </div>
  );
}

function Step({
  number,
  icon,
  iconBg,
  title,
  text,
}: {
  number: string;
  icon: string;
  iconBg: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${iconBg}`}
      >
        {icon}
      </div>
      <p className="text-sm font-bold text-neutral-400">{number}</p>
      <h3 className="mt-2 text-2xl font-bold">{title}</h3>
      <p className="mt-4 leading-7 text-neutral-600">{text}</p>
    </div>
  );
}

function ModeCard({
  id,
  tag,
  tagColor,
  icon,
  iconBg,
  title,
  headline,
  bullets,
}: {
  id: string;
  tag: string;
  tagColor: string;
  icon: string;
  iconBg: string;
  title: string;
  headline: string;
  bullets: string[];
}) {
  return (
    <div id={id} className="rounded-[2rem] bg-white p-8 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${tagColor}`}
          >
            {tag}
          </span>
          <h3 className="mt-3 text-3xl font-extrabold">{title}</h3>
          <p className="mt-2 text-lg font-semibold">{headline}</p>
        </div>
        <div
          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${iconBg}`}
        >
          {icon}
        </div>
      </div>
      <ul className="mt-6 space-y-3 text-neutral-700">
        {bullets.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="text-green-500">✓</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-[#FAF7F0] p-7">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-7 text-neutral-600">{text}</p>
    </div>
  );
}

function Destination({
  image,
  alt,
  title,
  text,
}: {
  image: string;
  alt: string;
  title: string;
  text: string;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
      <div className="relative h-48 w-full">
        <Image src={image} alt={alt} fill className="object-cover" unoptimized />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="mt-4 leading-7 text-neutral-600">{text}</p>
      </div>
    </div>
  );
}
