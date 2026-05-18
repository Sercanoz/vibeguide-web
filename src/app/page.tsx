"use client";

import Image from "next/image";
import { useT } from "@/components/LanguageProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { homeTranslations } from "@/lib/home-i18n";

const images = {
  hero:
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=85&w=1600",
  istanbul:
    "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=900",
  cappadocia:
    "https://static.independent.co.uk/2025/07/30/13/15/iStock-1339814820.jpeg?crop=1370.7,1370.7,x342.7,y43.7&width=1200&height=1200",
  ephesus:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVBHO_La8teZgkRSYhHRRlrKaEczLIqYuJqQ&s",
  bottom:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400",
};

export default function HomePage() {
  const { locale } = useT();
  const t = homeTranslations[locale];

  const destinations = [
    { title: t.dest.istanbul.title, image: images.istanbul, alt: "Istanbul skyline", text: t.dest.istanbul.text, tag: "#istanbultours" },
    { title: t.dest.cappadocia.title, image: images.cappadocia, alt: "Cappadocia balloons", text: t.dest.cappadocia.text, tag: "#cappadociatours" },
    { title: t.dest.ephesus.title, image: images.ephesus, alt: "Ephesus ruins", text: t.dest.ephesus.text, tag: "#ephesustours" },
  ];

  return (
    <main className="min-h-screen bg-[#FAF7F0] text-[#171717]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="text-2xl font-black">VibeGuide</div>

        <div className="hidden gap-8 text-sm font-semibold md:flex">
          <a href="#vibenow">{t.nav.vibenow}</a>
          <a href="#vibesquad">{t.nav.vibesquad}</a>
          <a href="#private">{t.nav.private}</a>
          <a href="#destinations">{t.nav.destinations}</a>
          <a href="#guides">{t.nav.guides}</a>
          <a href="#about">{t.nav.about}</a>
        </div>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <button className="rounded-full bg-black px-5 py-2 text-sm font-bold text-white">
            {t.nav.cta}
          </button>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <Image src={images.hero} alt="Istanbul skyline" fill priority className="object-cover opacity-30" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2">
          <div>
            <div className="mb-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">
                🟡 {t.hero.live}
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold shadow-sm">
                ✧ {t.hero.coming}
              </span>
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              {t.hero.titleA}
              <br />
              {t.hero.titleB}
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-700">{t.hero.sub}</p>

            <div className="mt-8 flex flex-wrap gap-5 text-sm font-bold">
              <span>✓ {t.hero.b1}</span>
              <span>⚡ {t.hero.b2}</span>
              <span>♡ {t.hero.b3}</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-black px-7 py-4 text-sm font-bold text-white">
                {t.hero.ctaPrimary} →
              </button>
              <button className="rounded-full bg-white px-7 py-4 text-sm font-bold shadow-sm">
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="mx-auto w-full max-w-[340px]">
            <div className="relative rounded-[3rem] bg-gradient-to-b from-[#1a1a1a] to-[#000] p-[6px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_0_2px_rgba(255,255,255,0.05)_inset]">
              <div className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l-md bg-[#2a2a2a]" />
              <div className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l-md bg-[#2a2a2a]" />
              <div className="absolute -left-[3px] top-56 h-14 w-[3px] rounded-l-md bg-[#2a2a2a]" />
              <div className="absolute -right-[3px] top-32 h-20 w-[3px] rounded-r-md bg-[#2a2a2a]" />

              <div className="relative overflow-hidden rounded-[2.6rem] bg-white">
                <div className="relative flex items-center justify-between px-7 pt-3 pb-3">
                  <span className="text-[14px] font-semibold text-black">9:41</span>
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

                <div className="px-5 pt-6 pb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-neutral-500">{t.phone.greet}</p>
                      <h2 className="text-3xl font-black">Istanbul</h2>
                    </div>
                    <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                      {t.phone.live}
                    </span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      ["⚡", "VibeNow", t.phone.vibenowSub, t.phone.vibenowText],
                      ["👥", "VibeSquad", t.phone.squadSub, t.phone.squadText],
                      ["📅", t.phone.privateTitle, t.phone.privateSub, t.phone.privateText],
                    ].map(([icon, name, type, text]) => (
                      <div key={name} className="rounded-2xl bg-[#FAF7F0] p-4">
                        <div className="text-2xl">{icon}</div>
                        <h3 className="mt-1 text-lg font-black">{name}</h3>
                        <p className="text-[11px] font-bold text-purple-600">{type}</p>
                        <p className="mt-1 text-xs leading-snug text-neutral-600">{text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex justify-center">
                    <div className="h-1 w-28 rounded-full bg-black" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-sm font-black uppercase tracking-widest">{t.how.eyebrow}</p>
        <h2 className="mt-3 text-center text-4xl font-black">{t.how.title}</h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            { icon: "🔍", iconBg: "bg-purple-100", title: t.how.s1Title, text: t.how.s1Text },
            { icon: "👤", iconBg: "bg-yellow-100", title: t.how.s2Title, text: t.how.s2Text },
            { icon: "🗺️", iconBg: "bg-green-100", title: t.how.s3Title, text: t.how.s3Text },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center px-6 text-center">
              <div className={`flex h-14 w-14 items-center justify-center rounded-full ${item.iconBg} text-2xl`}>
                {item.icon}
              </div>
              <h3 className="mt-6 text-xl font-black">{item.title}</h3>
              <p className="mt-3 max-w-xs leading-7 text-neutral-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mode cards */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3">
        {[
          {
            id: "vibenow", bg: "bg-[#F3EEFF]", labelColor: "text-purple-600",
            label: "VIBENOW", title: t.modes.vibenow.title, text: t.modes.vibenow.text, cta: t.modes.vibenow.cta,
            points: t.modes.vibenow.points,
          },
          {
            id: "vibesquad", bg: "bg-[#FFF5E6]", labelColor: "text-orange-500",
            label: "VIBESQUAD", title: t.modes.vibesquad.title, text: t.modes.vibesquad.text, cta: t.modes.vibesquad.cta,
            points: t.modes.vibesquad.points,
          },
          {
            id: "private", bg: "bg-[#F0FDF4]", labelColor: "text-green-600",
            label: "PRIVATE TOURS", title: t.modes.private.title, text: t.modes.private.text, cta: t.modes.private.cta,
            points: t.modes.private.points,
          },
        ].map((card) => (
          <article id={card.id} key={card.id} className={`overflow-hidden rounded-[2rem] ${card.bg} shadow-sm`}>
            <div className="p-7">
              <p className={`text-xs font-black uppercase tracking-widest ${card.labelColor}`}>{card.label}</p>
              <h2 className="mt-2 text-2xl font-black leading-tight">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{card.text}</p>
              <ul className="mt-5 space-y-2 text-xs font-semibold text-neutral-700">
                {card.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="mt-0.5 text-green-500">✓</span> {p}
                  </li>
                ))}
              </ul>
              <button className="mt-6 flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-xs font-bold text-white">
                {card.cta} <span>→</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* Destinations */}
      <section id="destinations" className="mx-auto max-w-7xl px-6 py-20">
        <p className="text-center text-sm font-black uppercase tracking-widest">{t.dest.eyebrow}</p>
        <h2 className="mt-3 text-center text-4xl font-black">{t.dest.title}</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {destinations.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[2rem] bg-white shadow-sm">
              <div className="relative h-56">
                <Image src={item.image} alt={item.alt} fill className="object-cover" />
              </div>
              <div className="p-7">
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-7 text-neutral-600">{item.text}</p>
                <p className="mt-4 text-sm font-bold text-purple-600">{item.tag}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-sm font-black uppercase tracking-widest text-yellow-400">{t.why.eyebrow}</p>
          <div className="mt-12 grid gap-8 md:grid-cols-6">
            {t.why.items.map(([title, text]) => (
              <div key={title} className="text-center">
                <h3 className="font-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden px-6 py-20">
        <Image src={images.bottom} alt="Travelers" fill className="object-cover opacity-30" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <h2 className="max-w-xl text-4xl font-black">
            {t.cta.titleA}
            <br />
            {t.cta.titleB}
          </h2>
          <div className="flex gap-4">
            <button className="rounded-xl bg-black px-6 py-3 text-sm font-bold text-white">{t.cta.appstore}</button>
            <button className="rounded-xl bg-black px-6 py-3 text-sm font-bold text-white">{t.cta.googleplay}</button>
          </div>
        </div>
      </section>

      <footer className="bg-white px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-5">
          <div>
            <h3 className="text-2xl font-black">VibeGuide</h3>
            <p className="mt-4 text-sm leading-6 text-neutral-600">{t.footer.tagline}</p>
          </div>
          {t.footer.cols.map(([title, links]) => (
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
        <p className="mx-auto mt-10 max-w-7xl text-sm text-neutral-500">{t.footer.copyright}</p>
        <p className="mx-auto mt-4 max-w-7xl text-sm font-semibold text-neutral-500">
          #istanbultours · #guideinistanbul · #turkeytour · #oldistanbultour · #privatetour · #localguide · #privateguide
        </p>
      </footer>
    </main>
  );
}
