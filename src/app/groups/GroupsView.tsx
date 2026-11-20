"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import { useT } from "@/components/LanguageProvider";
import { clientFetch } from "@/lib/api";
import { track } from "@/lib/analytics";
import { WHATSAPP_NUMBER } from "@/lib/contact";

// Kurumsal / grup tur talebi. Backend: POST /api/inquiries/corporate (anonim,
// IP başına saatte 5). Talep DB'ye yazılır, ekibe ve talep sahibine e-posta gider.

const TYPES = ["corporate", "school", "cruise", "incentive", "other"] as const;

const C = {
  en: {
    title: "Group & corporate tours",
    lead: "Company trips, school groups, cruise shore excursions and incentive programmes — guided by licensed professional guides across Türkiye.",
    points: [
      "Several licensed guides for large groups, in the languages you need",
      "Itineraries planned by working guides, not a call centre",
      "One quote, one invoice, one contact person",
    ],
    formTitle: "Tell us about your group",
    company: "Company / organisation (optional)", name: "Your name", email: "Email", phone: "Phone (optional)",
    type: "Group type", types: { corporate: "Company trip", school: "School / university", cruise: "Cruise shore excursion", incentive: "Incentive / event", other: "Other" },
    size: "Number of people", cities: "Cities", citiesPh: "e.g. Istanbul, Cappadocia", date: "Preferred date (optional)",
    languages: "Languages", languagesPh: "e.g. English, German", message: "Anything else we should know?",
    submit: "Send request", sending: "Sending…",
    okTitle: "Request received", okBody: "Our team will get back to you within 1 business day. We also sent a confirmation to your email.",
    errName: "Enter your name.", errEmail: "Enter a valid email.", errSize: "Enter a group size between 2 and 2000.",
    errDate: "Choose a date in the future.", errRate: "Too many requests. Try again in an hour.", errGeneric: "The request couldn't be sent. Try again or contact us.",
    orTalk: "Prefer to talk?", whatsapp: "Message us on WhatsApp", contact: "Contact page",
  },
  tr: {
    title: "Grup ve kurumsal turlar",
    lead: "Şirket gezileri, okul grupları, kruvaziyer kara turları ve teşvik programları — Türkiye genelinde lisanslı profesyonel rehberlerle.",
    points: [
      "Kalabalık gruplar için ihtiyacın olan dillerde birden fazla lisanslı rehber",
      "Programı çağrı merkezi değil, sahada çalışan rehberler planlar",
      "Tek teklif, tek fatura, tek muhatap",
    ],
    formTitle: "Grubunu anlat",
    company: "Firma / kurum (isteğe bağlı)", name: "Adın", email: "E-posta", phone: "Telefon (isteğe bağlı)",
    type: "Grup türü", types: { corporate: "Şirket gezisi", school: "Okul / üniversite", cruise: "Kruvaziyer kara turu", incentive: "Teşvik / etkinlik", other: "Diğer" },
    size: "Kişi sayısı", cities: "Şehirler", citiesPh: "ör. İstanbul, Kapadokya", date: "Tercih edilen tarih (isteğe bağlı)",
    languages: "Diller", languagesPh: "ör. İngilizce, Almanca", message: "Bilmemiz gereken başka bir şey var mı?",
    submit: "Talebi gönder", sending: "Gönderiliyor…",
    okTitle: "Talebini aldık", okBody: "Ekibimiz en geç 1 iş günü içinde sana dönecek. E-posta adresine de bir onay gönderdik.",
    errName: "Adını gir.", errEmail: "Geçerli bir e-posta gir.", errSize: "2 ile 2000 arasında bir kişi sayısı gir.",
    errDate: "İleri bir tarih seç.", errRate: "Çok fazla talep gönderildi. Bir saat sonra tekrar dene.", errGeneric: "Talep gönderilemedi. Tekrar dene ya da bize ulaş.",
    orTalk: "Konuşmayı mı tercih edersin?", whatsapp: "WhatsApp'tan yaz", contact: "İletişim sayfası",
  },
};

export default function GroupsView() {
  const { locale } = useT();
  const tr = locale === "tr";
  const c = tr ? C.tr : C.en;

  const [f, setF] = useState({ companyName: "", contactName: "", email: "", phone: "", groupType: "corporate", groupSize: "", cities: "", preferredDate: "", languages: "", message: "", website: "" });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  async function submit() {
    setErr(null);
    const size = Number(f.groupSize);
    if (!f.contactName.trim()) { setErr(c.errName); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) { setErr(c.errEmail); return; }
    if (!Number.isInteger(size) || size < 2 || size > 2000) { setErr(c.errSize); return; }
    setBusy(true);
    try {
      const res = await clientFetch(`/api/inquiries/corporate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, groupSize: size, preferredDate: f.preferredDate || null, locale }),
      });
      if (res.ok) {
        setDone(true);
        track("generate_lead", { lead_type: "group", group_type: f.groupType, travelers: size });
        return;
      }
      const d = await res.json().catch(() => ({}));
      setErr(res.status === 429 ? c.errRate : d.error === "invalid_email" ? c.errEmail : d.error === "invalid_group_size" ? c.errSize : d.error === "invalid_date" ? c.errDate : c.errGeneric);
    } catch {
      setErr(c.errGeneric);
    } finally {
      setBusy(false);
    }
  }

  const inputCls = "h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[#5B3FD9] focus:outline-none focus:ring-[3px] focus:ring-[#5B3FD9]/15";
  const label = "mb-1.5 block text-sm font-medium text-neutral-900";
  const today = new Date().toISOString().slice(0, 10);

  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <Navbar />
      <div className="mx-auto grid max-w-5xl gap-12 px-4 pb-20 pt-28 md:px-6 md:pt-32 lg:grid-cols-[1fr_460px]">
        <section>
          <h1 className="font-display text-4xl font-normal tracking-[-0.01em] md:text-5xl">{c.title}</h1>
          <p className="mt-4 max-w-xl leading-7 text-neutral-700">{c.lead}</p>
          <ul className="mt-6 space-y-2 text-sm text-neutral-800">
            {c.points.map((p) => (
              <li key={p} className="flex gap-2.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5B3FD9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-10 text-sm text-neutral-700">
            <p className="font-medium text-neutral-900">{c.orTalk}</p>
            <p className="mt-1">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="font-medium text-neutral-900 underline underline-offset-2">{c.whatsapp}</a>
              {" · "}
              <Link href="/contact" className="font-medium text-neutral-900 underline underline-offset-2">{c.contact}</Link>
            </p>
          </div>
        </section>

        <aside className="rounded-2xl border border-neutral-200 p-5 lg:p-6">
          {done ? (
            <div role="status">
              <h2 className="font-display text-2xl font-normal">{c.okTitle}</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-700">{c.okBody}</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-4" noValidate>
              <h2 className="font-display text-2xl font-normal">{c.formTitle}</h2>
              {/* Bal küpü — gerçek kullanıcı görmez. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} /></label>
              </div>
              <div>
                <label htmlFor="g-company" className={label}>{c.company}</label>
                <input id="g-company" autoComplete="organization" maxLength={150} value={f.companyName} onChange={set("companyName")} className={inputCls} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="g-name" className={label}>{c.name}</label>
                  <input id="g-name" autoComplete="name" maxLength={100} required value={f.contactName} onChange={set("contactName")} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="g-email" className={label}>{c.email}</label>
                  <input id="g-email" type="email" autoComplete="email" maxLength={256} required value={f.email} onChange={set("email")} className={inputCls} />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="g-phone" className={label}>{c.phone}</label>
                  <input id="g-phone" type="tel" autoComplete="tel" maxLength={32} value={f.phone} onChange={set("phone")} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="g-size" className={label}>{c.size}</label>
                  <input id="g-size" inputMode="numeric" required value={f.groupSize} onChange={(e) => setF((p) => ({ ...p, groupSize: e.target.value.replace(/\D/g, "").slice(0, 4) }))} className={inputCls} />
                </div>
              </div>
              <div>
                <label htmlFor="g-type" className={label}>{c.type}</label>
                <select id="g-type" value={f.groupType} onChange={set("groupType")} className={inputCls}>
                  {TYPES.map((t) => <option key={t} value={t}>{c.types[t]}</option>)}
                </select>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="g-cities" className={label}>{c.cities}</label>
                  <input id="g-cities" maxLength={200} placeholder={c.citiesPh} value={f.cities} onChange={set("cities")} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="g-date" className={label}>{c.date}</label>
                  <input id="g-date" type="date" min={today} value={f.preferredDate} onChange={set("preferredDate")} className={inputCls} />
                </div>
              </div>
              <div>
                <label htmlFor="g-langs" className={label}>{c.languages}</label>
                <input id="g-langs" maxLength={100} placeholder={c.languagesPh} value={f.languages} onChange={set("languages")} className={inputCls} />
              </div>
              <div>
                <label htmlFor="g-msg" className={label}>{c.message}</label>
                <textarea id="g-msg" rows={4} maxLength={2000} value={f.message} onChange={set("message")}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-base focus:border-[#5B3FD9] focus:outline-none focus:ring-[3px] focus:ring-[#5B3FD9]/15" />
              </div>
              {err && <p role="alert" className="text-sm text-red-700">{err}</p>}
              <button type="submit" disabled={busy}
                className="flex h-12 w-full items-center justify-center rounded-xl bg-[#5B3FD9] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#4A32B8] disabled:opacity-50">
                {busy ? c.sending : c.submit}
              </button>
            </form>
          )}
        </aside>
      </div>
      <MainFooter />
    </main>
  );
}
