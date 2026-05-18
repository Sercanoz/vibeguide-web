"use client";

import Image from "next/image";
import { useT } from "@/components/LanguageProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { homeTranslations } from "@/lib/home-i18n";

export default function HomePage() {
  const { locale } = useT();
  const t = homeTranslations[locale];

  const vibeIcons = ["🏛️", "🍴", "🍷", "⛵", "☕", "🛍️", "📷", "🧿"];
  const energyStats = [
    { icon: "👥", num: "12", text: t.energy.s1 },
    { icon: "👥", num: "3", text: t.energy.s2 },
    { icon: "☀️", num: "8", text: t.energy.s3 },
    { icon: "👤", num: "15", text: t.energy.s4 },
  ];

  const destinations = [
    {
      image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=900",
      title: t.explore.istanbul.title, text: t.explore.istanbul.text, tag: "#istanbultours",
    },
    {
      image: "https://static.independent.co.uk/2025/07/30/13/15/iStock-1339814820.jpeg?crop=1370.7,1370.7,x342.7,y43.7&width=1200&height=1200",
      title: t.explore.cappadocia.title, text: t.explore.cappadocia.text, tag: "#cappadociatours",
    },
    {
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVBHO_La8teZgkRSYhHRRlrKaEczLIqYuJqQ&s",
      title: t.explore.ephesus.title, text: t.explore.ephesus.text, tag: "#ephesustours",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#171717]">
      {/* NAV */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="text-2xl font-bold tracking-tight">VibeGuide</a>
        <div className="hidden gap-8 text-sm font-medium md:flex">
          <a href="#vibenow">{t.nav.vibenow}</a>
          <a href="#vibesquad">{t.nav.vibesquad}</a>
          <a href="#private">{t.nav.private}</a>
          <a href="#destinations">{t.nav.destinations}</a>
          <a href="#guides">{t.nav.guides}</a>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <a href="#download" className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white">
            {t.nav.cta}
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative">
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
              {t.hero.badge}
            </p>

            <h1 className="text-5xl font-black leading-[1.02] tracking-tight md:text-7xl">
              {t.hero.titleA}
              <br />
              <span className="text-[#FFD84D]">{t.hero.titleAccent}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-neutral-700">{t.hero.sub}</p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm font-semibold">
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15">🛡️</span>
                <span>{t.hero.b1}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15">⚡</span>
                <span>{t.hero.b2}</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15">♡</span>
                <span>{t.hero.b3}</span>
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#vibenow" className="rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white shadow-lg">
                {t.hero.ctaPrimary} →
              </a>
              <a href="#destinations" className="rounded-full border border-black/15 bg-white px-7 py-3.5 text-sm font-bold">
                {t.hero.ctaSecondary}
              </a>
            </div>

            <p className="mt-5 text-xs text-neutral-500">
              #istanbultours · #guideinistanbul · #turkeytour · #oldistanbultour · #privatetour
            </p>
          </div>

          {/* Phone mockup */}
          <div className="mx-auto w-full max-w-[320px]">
            <Phone>
              <div className="px-5 pt-7 pb-10">
                <div className="flex items-center justify-end">
                  <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-xs font-bold text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-600" /> {t.phone.live}
                  </span>
                </div>
                <p className="mt-6 text-sm font-semibold text-neutral-500">{t.phone.greet}</p>
                <h2 className="text-3xl font-black">Istanbul</h2>

                <div className="mt-8 space-y-5">
                  {[
                    { color: "bg-[#FFD84D]", icon: "⚡", title: "VibeNow", text: t.phoneCards.vibenow },
                    { color: "bg-[#B8F2D0]", icon: "👥", title: "VibeSquad", text: t.phoneCards.vibesquad },
                    { color: "bg-[#D8C7FF]", icon: "📅", title: "Private Tours", text: t.phoneCards.private },
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
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#FFD84D]">{t.energy.eyebrow}</p>
              <h2 className="mt-3 text-2xl font-black md:text-3xl">
                {t.energy.titleA}<br />{t.energy.titleB}
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/60">{t.energy.sub}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {energyStats.map((s) => (
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
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">{t.modesIntro.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">{t.modesIntro.title}</h2>
          <p className="mt-3 text-base leading-7 text-neutral-700">{t.modesIntro.sub}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            { id: "vibenow", bg: "bg-[#FFD84D]", data: t.modes.vibenow },
            { id: "vibesquad", bg: "bg-[#B8F2D0]", data: t.modes.vibesquad },
            { id: "private", bg: "bg-[#D8C7FF]", data: t.modes.private },
          ].map((card) => (
            <article key={card.id} id={card.id} className={`overflow-hidden rounded-[2rem] ${card.bg} p-6 shadow-sm`}>
              <p className="text-[10px] font-black uppercase tracking-widest">{card.data.tag}</p>
              <h2 className="mt-2 text-2xl font-black leading-tight">{card.data.title}</h2>
              <p className="mt-2 text-xs leading-5 text-neutral-700">{card.data.text}</p>
              <ul className="mt-4 space-y-1.5 text-[11px] font-semibold text-neutral-700">
                {card.data.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <button className="mt-5 flex items-center gap-2 rounded-full bg-black px-4 py-2 text-xs font-bold text-white">
                {card.data.cta} <span>→</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="mx-auto max-w-5xl px-6 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-500">{t.manifesto.eyebrow}</p>
        <h2 className="mt-4 text-3xl font-black tracking-tight md:text-5xl">
          {t.manifesto.titleA}
          <br />
          <span className="text-neutral-400">{t.manifesto.titleB}</span>
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-neutral-700 md:text-lg">
          {t.manifesto.sub}
        </p>
      </section>

      {/* EXPLORE BY VIBE + TRUST */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="text-2xl font-black">{t.vibe.title}</h2>
            <p className="mt-1 text-sm text-neutral-600">{t.vibe.sub}</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {t.vibe.items.map((label, i) => (
                <div key={label} className="flex flex-col items-center justify-center rounded-2xl border border-black/10 bg-white px-3 py-4 text-center shadow-sm">
                  <span className="text-2xl">{vibeIcons[i]}</span>
                  <p className="mt-2 text-xs font-bold">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-black">{t.explore.title}</h2>
              <p className="mt-1 text-sm text-neutral-600">{t.explore.sub}</p>

              <div id="destinations" className="mt-5 grid gap-4 md:grid-cols-3">
                {destinations.map((d) => (
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

          <aside id="guides" className="rounded-[2rem] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-black">{t.trust.title}</h2>
            <div className="mt-5 space-y-5">
              {t.trust.items.map((item, i) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-base">
                    {["👤", "✓", "📋", "🚫"][i]}
                  </div>
                  <div>
                    <p className="text-sm font-black">{item.title}</p>
                    <p className="mt-1 text-xs leading-5 text-neutral-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="mt-6 inline-block text-sm font-bold underline">{t.trust.cta}</a>
          </aside>
        </div>
      </section>

      {/* TESTIMONIALS + DOWNLOAD */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_1fr_1.2fr]">
          <div className="rounded-2xl bg-black p-5 text-white md:col-span-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#FFD84D]">{t.testimonials.eyebrow}</p>
            <h3 className="mt-3 text-lg font-black leading-tight">{t.testimonials.title}</h3>
            <div className="mt-4 flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-7 w-7 rounded-full bg-neutral-400 border-2 border-black" />
              ))}
            </div>
            <p className="mt-2 text-[10px] text-white/60">{t.testimonials.sub}</p>
          </div>

          {t.testimonials.quotes.map((q) => (
            <div key={q.name} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-amber-400">★★★★★</p>
              <p className="mt-2 text-xs leading-5 text-neutral-700">{q.quote}</p>
              <p className="mt-3 text-[11px] font-semibold text-neutral-500">{q.name}</p>
            </div>
          ))}

          <div id="download" className="rounded-2xl bg-[#FFD84D] p-5">
            <h3 className="text-base font-black">{t.download.title}</h3>
            <p className="mt-2 text-xs leading-5 text-neutral-800">{t.download.sub}</p>
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
              <p className="mt-3 max-w-xs text-xs leading-5 text-neutral-600">{t.footer.tagline}</p>
            </div>
            <div>
              <h4 className="text-sm font-black">{t.footer.product}</h4>
              <ul className="mt-3 space-y-2 text-xs text-neutral-600">
                <li><a href="#vibenow">VibeNow</a></li>
                <li><a href="#vibesquad">VibeSquad</a></li>
                <li><a href="#private">{t.nav.private}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black">{t.footer.destinations}</h4>
              <ul className="mt-3 space-y-2 text-xs text-neutral-600">
                <li>{t.explore.istanbul.title}</li>
                <li>{t.explore.cappadocia.title}</li>
                <li>{t.explore.ephesus.title}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black">{t.footer.support}</h4>
              <ul className="mt-3 space-y-2 text-xs text-neutral-600">
                <li>Help Center</li>
                <li>Terms</li>
                <li>Privacy</li>
              </ul>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-500">{t.footer.copyright}</p>
              <p className="mt-3 text-[11px] leading-5 text-neutral-500">
                #istanbultours · #guideinistanbul · #turkeytour
                <br />#oldistanbultour · #privatetour · #localguide
              </p>
              <div className="mt-4 flex justify-end gap-3 text-neutral-400">
                <a href="#">📷</a>
                <a href="#">♪</a>
                <a href="#">▶</a>
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
