"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import { useT } from "@/components/LanguageProvider";
import { track } from "@/lib/analytics";

// "Rehber ol" tanıtım sayfası. Rakamlar backend ile aynı olmalı:
//   - Komisyon %15 (HaritaApiTest Services/CommissionCalculator.cs DefaultPct)
//   - Promo indirimini VibeGuide karşılar (CommissionCalculator.SplitBooking)
//   - Ödeme: tamamlanan turlar haftalık payout döngüsünde IBAN'a
//   - Başvuru: kokart ön + arka yüz fotoğrafı (/register/guide)
// Diğer diller EN'e düşer.

const COMMISSION_PCT = 15;

const C = {
  en: {
    eyebrow: "For licensed guides",
    title: "Guide on your own terms",
    lead: "VibeGuide brings international travellers to licensed tourist guides in Türkiye. You set your tours and your days; we handle bookings, payments and support.",
    cta: "Apply as a guide",
    founded: "Built by guides, for guides. VibeGuide was founded by professional tourist guides who still work in the field.",
    whyTitle: "Why guide with VibeGuide",
    why: [
      { t: `You keep ${100 - COMMISSION_PCT}%`, d: `The platform fee is ${COMMISSION_PCT}% of the tour price. Promotional discounts are paid by VibeGuide, never taken from your share.` },
      { t: "Paid weekly", d: "Earnings from completed tours are paid to your IBAN in the weekly payout cycle. You can follow every booking in the app." },
      { t: "Your calendar", d: "Mark the days you are off. Travellers only see you on the dates you are available." },
      { t: "Three ways to earn", d: "Private tours booked in advance, VibeNow requests for right now, and VibeSquad group tours that fill up together." },
      { t: "Paid before you go", d: "Private tours are paid by card with 3D Secure before the tour. No cash collection, no chasing payments." },
      { t: "Real support", d: "Cancellations, no-shows and disputes go through our support team, not through you." },
    ],
    exampleTitle: "Example",
    exampleBody: (price: string, payout: string) => `A private tour priced at ${price} pays you ${payout}.`,
    stepsTitle: "How to join",
    steps: [
      { t: "Create your account", d: "Sign up and choose the guide account." },
      { t: "Upload your badge", d: "Upload photos of the front and back of your official tourist-guide badge (kokart)." },
      { t: "Get verified", d: "Our team reviews every application before a guide can accept bookings." },
      { t: "Start guiding", d: "Set up your profile, languages and tours in the app, and receive bookings." },
    ],
    reqTitle: "What you need",
    req: [
      "An official Turkish tourist-guide badge (kokart)",
      "A smartphone with the VibeGuide app",
      "An IBAN for payouts",
    ],
    faqTitle: "Questions",
    faq: [
      { q: "Is there a sign-up fee?", a: "No. VibeGuide only takes the platform fee from completed, paid bookings." },
      { q: "Can I keep working with my own clients and agencies?", a: "Yes. VibeGuide is one more channel. Bookings made through the platform must be paid through the platform." },
      { q: "What happens if a traveller cancels?", a: "The published cancellation policy applies. If you have to cancel, the traveller gets a full refund, so cancel only when you must." },
    ],
    contact: "Questions before you apply?",
    contactLink: "Contact us",
  },
  tr: {
    eyebrow: "Lisanslı rehberler için",
    title: "Kendi kurallarınla rehberlik yap",
    lead: "VibeGuide, Türkiye'deki lisanslı turist rehberlerini yabancı gezginlerle buluşturur. Turlarını ve günlerini sen belirlersin; rezervasyon, ödeme ve destek bizde.",
    cta: "Rehber olarak başvur",
    founded: "Rehberler tarafından, rehberler için. VibeGuide'ı hâlâ sahada çalışan profesyonel turist rehberleri kurdu.",
    whyTitle: "Neden VibeGuide",
    why: [
      { t: `Tutarın %${100 - COMMISSION_PCT}'i senin`, d: `Platform payı tur fiyatının %${COMMISSION_PCT}'i. Promosyon indirimlerini VibeGuide karşılar, senin payından asla düşmez.` },
      { t: "Haftalık ödeme", d: "Tamamlanan turların kazancı haftalık ödeme döngüsünde IBAN'ına yatar. Her rezervasyonu uygulamadan takip edersin." },
      { t: "Takvim senin", d: "İzinli olduğun günleri işaretle. Gezginler seni yalnız müsait olduğun tarihlerde görür." },
      { t: "Üç kazanç yolu", d: "Önceden rezerve edilen özel turlar, anlık VibeNow talepleri ve birlikte dolan VibeSquad grup turları." },
      { t: "Tur öncesi ödenmiş", d: "Özel turlar turdan önce 3D Secure ile kartla ödenir. Nakit tahsilat yok, ödeme peşinde koşmak yok." },
      { t: "Gerçek destek", d: "İptal, gelmeyen misafir ve anlaşmazlıklar seninle değil, destek ekibimizle çözülür." },
    ],
    exampleTitle: "Örnek",
    exampleBody: (price: string, payout: string) => `${price} fiyatlı bir özel turdan sana ${payout} kalır.`,
    stepsTitle: "Nasıl katılırım",
    steps: [
      { t: "Hesabını aç", d: "Kayıt ol ve rehber hesabını seç." },
      { t: "Kokartını yükle", d: "Resmi turist rehberi kokartının ön ve arka yüzünün fotoğrafını yükle." },
      { t: "Doğrulan", d: "Ekibimiz her başvuruyu inceler; rehber ancak onaydan sonra rezervasyon alabilir." },
      { t: "Rehberliğe başla", d: "Uygulamada profilini, dillerini ve turlarını ayarla, rezervasyon almaya başla." },
    ],
    reqTitle: "Gerekenler",
    req: [
      "Resmi turist rehberi kokartı",
      "VibeGuide uygulamasının yüklü olduğu bir akıllı telefon",
      "Ödemeler için bir IBAN",
    ],
    faqTitle: "Sorular",
    faq: [
      { q: "Üyelik ücreti var mı?", a: "Hayır. VibeGuide yalnız tamamlanmış ve ödenmiş rezervasyonlardan platform payı alır." },
      { q: "Kendi müşterilerimle ve acentelerle çalışmaya devam edebilir miyim?", a: "Evet. VibeGuide yalnız bir kanal daha. Platform üzerinden gelen rezervasyonun ödemesi platform üzerinden yapılmalı." },
      { q: "Gezgin iptal ederse ne olur?", a: "Yayınlanmış iptal politikası uygulanır. Sen iptal etmek zorunda kalırsan gezgine tam iade yapılır; bu yüzden yalnız zorunlu durumda iptal et." },
    ],
    contact: "Başvurmadan önce sorun mu var?",
    contactLink: "Bize ulaş",
  },
};

export default function BecomeGuideView() {
  const { locale } = useT();
  const c = locale === "tr" ? C.tr : C.en;
  const tr = locale === "tr";
  const examplePrice = 200;
  const examplePayout = examplePrice - (examplePrice * COMMISSION_PCT) / 100;
  const fmt = (n: number) => (tr ? `${n} €` : `€${n}`);
  const onApply = () => track("guide_apply_click", { source: "become_a_guide" });

  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <Navbar />

      <section className="mx-auto max-w-5xl px-4 pb-14 pt-28 md:px-6 md:pt-36">
        <p className="text-sm font-medium text-[#5B3FD9]">{c.eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-normal leading-[1.05] tracking-[-0.01em] md:text-6xl">{c.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-700">{c.lead}</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/register/guide" onClick={onApply}
            className="inline-flex h-12 items-center rounded-full bg-[#5B3FD9] px-7 font-medium text-white transition-colors hover:bg-[#4A32B8]">
            {c.cta}
          </Link>
          <Link href="/guide-verification" className="text-sm font-medium text-neutral-900 underline underline-offset-2">
            {tr ? "Doğrulama süreci" : "Verification process"}
          </Link>
        </div>
        <p className="mt-8 max-w-2xl border-l-2 border-neutral-200 pl-4 text-sm leading-6 text-neutral-700">{c.founded}</p>
      </section>

      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
          <h2 className="font-display text-3xl font-normal">{c.whyTitle}</h2>
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {c.why.map((w) => (
              <div key={w.t}>
                <h3 className="font-semibold">{w.t}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-700">{w.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border border-neutral-200 p-5 text-sm">
            <span className="font-semibold">{c.exampleTitle}: </span>
            {c.exampleBody(fmt(examplePrice), fmt(examplePayout))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 py-14 md:grid-cols-[1.4fr_1fr] md:px-6">
          <div>
            <h2 className="font-display text-3xl font-normal">{c.stepsTitle}</h2>
            <ol className="mt-8 space-y-6">
              {c.steps.map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-sm font-semibold">{i + 1}</span>
                  <div>
                    <h3 className="font-semibold">{s.t}</h3>
                    <p className="mt-1 text-sm leading-6 text-neutral-700">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="font-display text-3xl font-normal">{c.reqTitle}</h2>
            <ul className="mt-8 space-y-3 text-sm text-neutral-800">
              {c.req.map((r) => (
                <li key={r} className="flex gap-2.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B3FD9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
          <h2 className="font-display text-3xl font-normal">{c.faqTitle}</h2>
          <div className="mt-6 divide-y divide-neutral-200 border-y border-neutral-200">
            {c.faq.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {f.q}
                  <span aria-hidden="true" className="text-neutral-500 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-6 text-neutral-700">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/register/guide" onClick={onApply}
              className="inline-flex h-12 items-center rounded-full bg-[#5B3FD9] px-7 font-medium text-white transition-colors hover:bg-[#4A32B8]">
              {c.cta}
            </Link>
            <p className="text-sm text-neutral-700">
              {c.contact}{" "}
              <Link href="/contact" className="font-medium text-neutral-900 underline underline-offset-2">{c.contactLink}</Link>
            </p>
          </div>
        </div>
      </section>

      <MainFooter />
    </main>
  );
}
