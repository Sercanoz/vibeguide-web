export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fffdf8] text-[#111]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div className="text-2xl font-black">👋 VibeGuide</div>

        <div className="hidden gap-8 text-sm font-semibold md:flex">
          <a>VibeNow</a>
          <a>VibeSquad</a>
          <a>How it works</a>
          <a>For Guides</a>
        </div>

        <button className="rounded-full bg-[#FFC400] px-6 py-3 text-sm font-bold">
          Get the app
        </button>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex rounded-full bg-[#FFF2B8] px-4 py-2 text-sm font-bold">
            ✨ Not a tour. A real local moment.
          </div>

          <h1 className="max-w-xl text-6xl font-black leading-[0.95] tracking-tight md:text-7xl">
            Travel like you <span className="text-[#FFC400]">belong.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-neutral-600">
            Connect with verified local guides, join travelers heading your way,
            or plan a private experience before you arrive. Real people. Real
            cities. Real stories.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-2xl bg-[#FFC400] px-7 py-4 font-bold shadow-sm">
              Explore Experiences
            </button>
            <button className="rounded-2xl border border-neutral-300 bg-white px-7 py-4 font-bold">
              See how it works
            </button>
          </div>

          <p className="mt-6 text-sm font-semibold text-neutral-500">
            📍 Launching first in Istanbul
          </p>
        </div>

        <div className="rounded-[2rem] bg-white p-5 shadow-xl ring-1 ring-black/5">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-[#fff6cc] to-[#f7f7f7] p-6">
            <div className="mb-5 flex justify-between">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold">
                Istanbul
              </span>
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                Live soon
              </span>
            </div>

            <h3 className="text-3xl font-black">Your local guide is one tap away.</h3>

            <div className="mt-8 grid gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm font-bold text-[#FFC400]">VibeNow ⚡</p>
                <h4 className="mt-2 text-xl font-black">Tap. Match. Go.</h4>
                <p className="mt-2 text-sm text-neutral-600">
                  Find available local guides when you want to explore now.
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm font-bold text-green-600">VibeSquad ✨</p>
                <h4 className="mt-2 text-xl font-black">Travel together. Pay less.</h4>
                <p className="mt-2 text-sm text-neutral-600">
                  Join other travelers, split the experience, and share the vibe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            ["Verified Guides", "Licensed and identity-checked local professionals."],
            ["Secure Payments", "Clear pricing, protected payments, no surprises."],
            ["Flexible Experiences", "Go now, join a squad, or reserve ahead."],
            ["Real Connections", "Meet locals, not scripts."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <h3 className="font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 text-center">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FFC400]">
          How VibeGuide Works
        </p>
        <h2 className="mt-3 text-4xl font-black">
          Three ways to feel the city.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            ["VibeNow", "Explore right now", "Open the app and connect with available guides nearby."],
            ["VibeSquad", "Join the vibe", "Share the experience with other travelers and lower the cost."],
            ["Reservation", "Plan ahead", "Book a private guide before your trip begins."],
          ].map(([tag, title, text]) => (
            <div key={title} className="rounded-[2rem] bg-white p-8 text-left shadow-sm ring-1 ring-black/5">
              <span className="rounded-full bg-[#FFF2B8] px-3 py-1 text-xs font-black">
                {tag}
              </span>
              <h3 className="mt-5 text-2xl font-black">{title}</h3>
              <p className="mt-3 leading-7 text-neutral-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#FFC400]">
              Why VibeGuide?
            </p>
            <h2 className="mt-3 text-5xl font-black leading-tight">
              Tourism should feel human again.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-neutral-600">
            <p>
              No crowded buses. No copy-paste scripts. No feeling like just
              another booking number.
            </p>
            <p>
              VibeGuide helps travelers discover the city through verified local
              guides, shared experiences, and moments that feel personal.
            </p>
            <p className="font-black text-black">
              Don&apos;t just visit. Belong.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="rounded-[2rem] bg-[#111] p-10 text-white md:p-16">
          <h2 className="max-w-2xl text-5xl font-black leading-tight">
            Your next city is calling.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
            Download VibeGuide and experience the city with people who know its
            streets, stories, food, and soul.
          </p>

          <button className="mt-8 rounded-2xl bg-[#FFC400] px-8 py-4 font-black text-black">
            Get the app
          </button>
        </div>
      </section>
    </main>
  );
}
