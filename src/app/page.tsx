"use client";

import Image from "next/image";
import { useT } from "@/components/LanguageProvider";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import { homeTranslations } from "@/lib/home-i18n";

export default function HomePage() {
  const { locale } = useT();
  const t = homeTranslations[locale];

  return (
    <main className="min-h-screen bg-white text-[#111827] antialiased">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16">
          <a href="/" className="text-xl font-black tracking-tight">
            Vibe<span className="text-[#6C4CF1]">Guide</span>
          </a>
          <div className="hidden gap-8 text-sm font-medium text-neutral-600 md:flex">
            <a href="#how" className="hover:text-black transition-colors">How it works</a>
            <a href="#modes" className="hover:text-black transition-colors">{t.nav.vibenow}</a>
            <a href="#destinations" className="hover:text-black transition-colors">{t.nav.destinations}</a>
            <a href="#guides" className="hover:text-black transition-colors">{t.nav.guides}</a>
          </div>
          <div className="flex items-center gap-3">
            <LocaleSwitcher />
            <a
              href="#download"
              className="rounded-full bg-[#6C4CF1] px-5 py-2 text-sm font-semibold text-white hover:bg-[#4f37c9] transition-colors"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-[#0A0A0F]">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=85&w=1800"
            alt="Istanbul"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-2 gap-16 items-center w-full">
          {/* Left — copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
              {t.hero.badge}
            </span>

            <h1 className="text-5xl md:text-7xl font-black leading-[1.0] tracking-tight text-white">
              {t.hero.titleA}
              <br />
              <span className="text-vibe-gradient">{t.hero.titleAccent}</span>
            </h1>

            <p className="mt-6 text-base leading-7 text-white/60 max-w-lg">
              {t.hero.sub}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#download"
                className="rounded-full bg-[#6C4CF1] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#6C4CF1]/30 hover:bg-[#4f37c9] transition-all hover:shadow-[#6C4CF1]/50"
              >
                {t.hero.ctaPrimary} →
              </a>
              <a
                href="#modes"
                className="rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { icon: "🛡️", label: t.hero.b1 },
                { icon: "⚡", label: t.hero.b2 },
                { icon: "❤️", label: t.hero.b3 },
              ].map((b) => (
                <span key={b.label} className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <span className="text-base">{b.icon}</span>
                  {b.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — phone */}
          <div className="hidden md:flex justify-center">
            <Phone>
              <div className="px-5 pt-6 pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-neutral-500">{t.phone.greet}</p>
                    <h2 className="text-2xl font-black">Istanbul 🇹🇷</h2>
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-[10px] font-bold text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    {t.phone.live}
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { color: "bg-[#EDE9FE]", accent: "bg-[#6C4CF1]", icon: "⚡", title: "VibeNow", text: t.phoneCards.vibenow },
                    { color: "bg-[#D1FAE5]", accent: "bg-[#10B981]", icon: "👥", title: "VibeSquad", text: t.phoneCards.vibesquad },
                    { color: "bg-[#FEF3C7]", accent: "bg-[#F59E0B]", icon: "📅", title: "Private", text: t.phoneCards.private },
                  ].map((c) => (
                    <div key={c.title} className={`flex items-center gap-3 rounded-2xl ${c.color} p-3.5`}>
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${c.accent} text-base shadow-sm`}>
                        <span>{c.icon}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-[#111827]">{c.title}</p>
                        <p className="text-[10px] leading-snug text-neutral-500 truncate">{c.text}</p>
                      </div>
                      <span className="text-neutral-400 text-sm shrink-0">›</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl bg-[#6C4CF1] p-4 text-white">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold opacity-70">Guides online near you</p>
                    <span className="flex items-center gap-1 text-[10px] font-bold bg-white/20 rounded-full px-2 py-0.5">
                      <span className="h-1 w-1 rounded-full bg-[#10B981]" /> Live
                    </span>
                  </div>
                  <p className="mt-1 text-3xl font-black">24</p>
                  <p className="mt-2 text-[10px] opacity-60">Avg. wait time · <span className="font-bold text-white">58 sec</span></p>
                </div>
              </div>
            </Phone>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" className="py-24 bg-[#F7F7FB]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6C4CF1]">Simple as it gets</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">
              Guide in your pocket,<br />
              <span className="text-neutral-400">city in your hands.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: "01", icon: "📱", title: "Open the app", text: "Choose VibeNow for instant, VibeSquad for group, or Private for a full day." },
              { step: "02", icon: "🤝", title: "Match with a guide", text: "Verified local guides near you. Real people, real expertise, real passion for their city." },
              { step: "03", icon: "🚶", title: "Walk out the door", text: "In 60 seconds with VibeNow. No planning, no waiting, no tourist traps." },
            ].map((item) => (
              <div key={item.step} className="relative rounded-3xl bg-white p-8 shadow-sm border border-black/5 hover:shadow-md transition-shadow">
                <span className="text-6xl font-black text-black/5 absolute top-6 right-8">{item.step}</span>
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-500">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3 MODES ── */}
      <section id="modes" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">{t.modesIntro.eyebrow}</p>
            <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight max-w-2xl">{t.modesIntro.title}</h2>
            <p className="mt-4 text-base leading-7 text-neutral-500 max-w-xl">{t.modesIntro.sub}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: "vibenow",
                bg: "bg-[#0A0A0F]",
                accent: "bg-[#6C4CF1]",
                textColor: "text-white",
                mutedColor: "text-white/50",
                tagColor: "text-[#6C4CF1]",
                data: t.modes.vibenow,
              },
              {
                id: "vibesquad",
                bg: "bg-[#D1FAE5]",
                accent: "bg-[#10B981]",
                textColor: "text-[#111827]",
                mutedColor: "text-neutral-500",
                tagColor: "text-[#10B981]",
                data: t.modes.vibesquad,
              },
              {
                id: "private",
                bg: "bg-[#EDE9FE]",
                accent: "bg-[#6C4CF1]",
                textColor: "text-[#111827]",
                mutedColor: "text-neutral-500",
                tagColor: "text-[#6C4CF1]",
                data: t.modes.private,
              },
            ].map((card) => (
              <article key={card.id} id={card.id} className={`rounded-3xl ${card.bg} p-8 flex flex-col`}>
                <p className={`text-[10px] font-black uppercase tracking-widest ${card.tagColor}`}>{card.data.tag}</p>
                <h2 className={`mt-3 text-2xl font-black leading-tight ${card.textColor}`}>{card.data.title}</h2>
                <p className={`mt-3 text-sm leading-6 ${card.mutedColor}`}>{card.data.text}</p>
                <ul className={`mt-5 space-y-2 text-xs font-semibold ${card.mutedColor} flex-1`}>
                  {card.data.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">{p}</li>
                  ))}
                </ul>
                <button className={`mt-7 self-start flex items-center gap-2 rounded-full ${card.accent} px-5 py-2.5 text-xs font-bold text-white`}>
                  {card.data.cta} <span>→</span>
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section id="destinations" className="py-24 bg-[#F7F7FB]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">{t.explore.title}</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-black tracking-tight">{t.explore.sub}</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=900",
                title: t.explore.istanbul.title,
                text: t.explore.istanbul.text,
                tag: "Most popular",
                tagColor: "bg-[#6C4CF1] text-white",
              },
              {
                image: "https://images.unsplash.com/photo-1692025552340-5e74c5bfbd3c?q=80&w=900",
                title: t.explore.cappadocia.title,
                text: t.explore.cappadocia.text,
                tag: "Coming soon",
                tagColor: "bg-black/80 text-white",
              },
              {
                image: "https://images.unsplash.com/photo-1589561253898-768105ca91a8?q=80&w=900",
                title: t.explore.ephesus.title,
                text: t.explore.ephesus.text,
                tag: "Coming soon",
                tagColor: "bg-black/80 text-white",
              },
            ].map((d) => (
              <article key={d.title} className="group overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-[10px] font-bold ${d.tagColor}`}>
                    {d.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black">{d.title}</h3>
                  <p className="mt-2 text-sm leading-5 text-neutral-500">{d.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section id="guides" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-neutral-400">Every guide is verified</p>
              <h2 className="mt-3 text-3xl md:text-5xl font-black tracking-tight">
                {t.trust.title}
              </h2>
              <div className="mt-10 space-y-6">
                {t.trust.items.map((item, i) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7F7FB] text-xl">
                      {["🪪", "✅", "📋", "🚫"][i]}
                    </div>
                    <div>
                      <p className="font-black">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-neutral-500">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-[#0A0A0F] p-6 text-white col-span-2">
                <p className="text-xs font-bold uppercase tracking-widest text-[#6C4CF1]">{t.testimonials.eyebrow}</p>
                <h3 className="mt-3 text-lg font-black leading-tight">{t.testimonials.title}</h3>
                <div className="mt-4 flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-gradient-to-br from-[#6C4CF1] to-[#10B981] border-2 border-[#0A0A0F]" />
                  ))}
                  <div className="h-8 w-8 rounded-full bg-white/10 border-2 border-[#0A0A0F] flex items-center justify-center text-[10px] font-bold">+99</div>
                </div>
                <p className="mt-2 text-xs text-white/40">{t.testimonials.sub}</p>
              </div>
              {t.testimonials.quotes.slice(0, 2).map((q) => (
                <div key={q.name} className="rounded-3xl bg-[#F7F7FB] p-5">
                  <p className="text-amber-400 text-sm">★★★★★</p>
                  <p className="mt-2 text-xs leading-5 text-neutral-600">"{q.quote}"</p>
                  <p className="mt-3 text-[11px] font-bold text-neutral-400">{q.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD ── */}
      <section id="download" className="py-24 bg-[#0A0A0F] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#6C4CF1] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-[#10B981] rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#6C4CF1]">Available now</p>
          <h2 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">
            {t.download.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-white/50 max-w-lg mx-auto">{t.download.sub}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="#"
              className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-black hover:bg-white/90 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <p className="text-[10px] leading-none text-black/50">Download on the</p>
                <p className="text-sm font-bold">App Store</p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-black hover:bg-white/90 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.18 23.76c.3.17.64.19.96.08l13.12-7.57-2.8-2.8-11.28 10.29zM20.9 10.42L17.96 8.7 14.84 11.8l3.13 3.12 2.95-1.7c.84-.48.84-2.32-.02-2.8zM2.14.75C2.05 1 2 1.26 2 1.56v20.89c0 .3.04.57.14.81L13.61 11.8 2.14.75zM3.18.24L14.84 11.8l-2.8 2.8L.22.32C.56.21.9.23 1.22.4l1.96 1.13V.24z"/>
              </svg>
              <div className="text-left">
                <p className="text-[10px] leading-none text-black/50">GET IT ON</p>
                <p className="text-sm font-bold">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#F7F7FB] border-t border-black/5 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
            <div>
              <h3 className="text-xl font-black">Vibe<span className="text-[#6C4CF1]">Guide</span></h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-500">{t.footer.tagline}</p>
              <div className="mt-5 flex gap-3">
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-black/10 text-neutral-500 hover:text-black hover:border-black/30 transition-colors text-sm">ig</a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-black/10 text-neutral-500 hover:text-black hover:border-black/30 transition-colors text-sm">tt</a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-black/10 text-neutral-500 hover:text-black hover:border-black/30 transition-colors text-sm">yt</a>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-black">{t.footer.product}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-500">
                <li><a href="#vibenow" className="hover:text-black transition-colors">VibeNow</a></li>
                <li><a href="#vibesquad" className="hover:text-black transition-colors">VibeSquad</a></li>
                <li><a href="#private" className="hover:text-black transition-colors">{t.nav.private}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black">{t.footer.destinations}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-500">
                <li>{t.explore.istanbul.title}</li>
                <li>{t.explore.cappadocia.title}</li>
                <li>{t.explore.ephesus.title}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black">{t.footer.support}</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-neutral-500">
                <li><a href="/help" className="hover:text-black transition-colors">Help Center</a></li>
                <li><a href="/terms" className="hover:text-black transition-colors">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-black transition-colors">Privacy</a></li>
                <li><a href="/account-deletion" className="hover:text-black transition-colors">Account Deletion</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-neutral-400">{t.footer.copyright}</p>
            <p className="text-xs text-neutral-300">#istanbultours · #guideinistanbul · #turkeytour · #localguide</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-[280px] rounded-[3rem] bg-gradient-to-b from-[#2a2a2a] to-[#000] p-[5px] shadow-[0_40px_80px_-20px_rgba(108,76,241,0.4)]">
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
