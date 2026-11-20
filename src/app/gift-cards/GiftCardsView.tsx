"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import { useT } from "@/components/LanguageProvider";
import { API_BASE_URL } from "@/lib/api";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { paymentErrorText } from "@/lib/paymentErrors";
import { track } from "@/lib/analytics";

// Hediye kartı satın alma. Kurallar backend GiftCardService ile aynı olmalı:
// yalnız TRY, 500–50.000 TRY, 24 ay geçerli, planlı özel rezervasyonda ödeme olarak düşer.
const MIN = 500;
const MAX = 50000;
const PRESETS = [1000, 2500, 5000];

interface MyCard {
  id: number; code: string | null; amount: number; balance: number; currency: string; status: string;
  recipientName: string; recipientEmail: string; paidAt: string | null; expiresAt: string | null;
}

const C = {
  en: {
    title: "VibeGuide gift cards",
    lead: "Give a private tour with a licensed local guide in Türkiye. The recipient picks the tour and the date.",
    points: ["Valid for 24 months", "Use it for any private tour priced in TRY", "Any remaining balance stays on the card"],
    amount: "Amount", custom: "Other amount (TRY)", from: "Your name", to: "Recipient's name", toEmail: "Recipient's email",
    message: "Message (optional)", continue: "Continue to payment", signIn: "Sign in to buy a gift card",
    payTitle: "Pay by card", payFor: (n: string, a: string) => `${a} gift card for ${n}`, edit: "Edit",
    cardNumber: "Card number", holder: "Name on card", expM: "Month", expY: "Year", cvv: "CVV", phone: "Mobile phone",
    phoneHint: "Required by the payment provider. We save it to your profile.",
    pay: (a: string) => `Pay ${a}`, secure: "3D Secure payment. Card details are never stored.",
    errAmount: `Enter an amount between ${MIN} and ${MAX} TRY.`, errFields: "Fill in all required fields.",
    errEmail: "Enter a valid recipient email.", errCard: "Check your card details.", errGeneric: "Something went wrong. Try again.",
    checkTitle: "Check a gift card balance", checkPh: "Gift card code", check: "Check",
    balance: (b: string, d: string) => `Balance: ${b} · valid until ${d}`, inactive: "This gift card can't be used.",
    notFound: "This gift card code isn't valid.",
    mineTitle: "Gift cards you bought", remaining: "remaining", how: "How to use it",
    howBody: "At the payment step of a private tour booking, enter the code in the “Gift card” field. If the card covers the full price, no card payment is needed.",
  },
  tr: {
    title: "VibeGuide hediye kartı",
    lead: "Türkiye'de lisanslı yerel bir rehberle özel bir tur hediye et. Turu ve tarihi alıcı seçer.",
    points: ["24 ay geçerli", "TRY fiyatlı tüm özel turlarda kullanılır", "Kalan bakiye kartta kalır"],
    amount: "Tutar", custom: "Başka tutar (TRY)", from: "Adın", to: "Alıcının adı", toEmail: "Alıcının e-postası",
    message: "Mesaj (isteğe bağlı)", continue: "Ödemeye geç", signIn: "Hediye kartı almak için giriş yap",
    payTitle: "Kartla öde", payFor: (n: string, a: string) => `${n} için ${a} hediye kartı`, edit: "Düzenle",
    cardNumber: "Kart numarası", holder: "Kart üzerindeki isim", expM: "Ay", expY: "Yıl", cvv: "CVV", phone: "Cep telefonu",
    phoneHint: "Ödeme kuruluşu istiyor. Profiline de kaydedilir.",
    pay: (a: string) => `${a} öde`, secure: "3D Secure ödeme. Kart bilgisi saklanmaz.",
    errAmount: `${MIN} ile ${MAX} TRY arasında bir tutar gir.`, errFields: "Zorunlu alanları doldur.",
    errEmail: "Geçerli bir alıcı e-postası gir.", errCard: "Kart bilgilerini kontrol et.", errGeneric: "Bir sorun oluştu. Tekrar dene.",
    checkTitle: "Hediye kartı bakiyesi sorgula", checkPh: "Hediye kartı kodu", check: "Sorgula",
    balance: (b: string, d: string) => `Bakiye: ${b} · son kullanma ${d}`, inactive: "Bu hediye kartı kullanılamıyor.",
    notFound: "Bu hediye kartı kodu geçerli değil.",
    mineTitle: "Satın aldığın hediye kartları", remaining: "kaldı", how: "Nasıl kullanılır",
    howBody: "Özel tur rezervasyonunun ödeme adımında kodu “Hediye kartı” alanına gir. Kart tutarın tamamını karşılarsa kartla ödeme gerekmez.",
  },
};

export default function GiftCardsView() {
  const { locale } = useT();
  const tr = locale === "tr";
  const c = tr ? C.tr : C.en;
  const router = useRouter();
  const fmt = (n: number) => new Intl.NumberFormat(tr ? "tr-TR" : "en-GB", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
  const fmtDate = (iso: string) => new Date(iso).toLocaleDateString(tr ? "tr-TR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });

  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [amount, setAmount] = useState<number>(PRESETS[1]);
  const [customAmount, setCustomAmount] = useState("");
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [message, setMessage] = useState("");
  const [giftId, setGiftId] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneOnProfile, setPhoneOnProfile] = useState<boolean | null>(null);

  const [checkCode, setCheckCode] = useState("");
  const [checkMsg, setCheckMsg] = useState<string | null>(null);
  const [mine, setMine] = useState<MyCard[]>([]);

  const finalAmount = customAmount ? Number(customAmount) : amount;

  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged(async (user) => {
      setSignedIn(!!user);
      if (!user) return;
      try {
        const headers = await buildAuthHeaders();
        const [me, cards] = await Promise.all([
          fetch(`${API_BASE_URL}/api/auth/me`, { headers }).then((r) => (r.ok ? r.json() : null)),
          fetch(`${API_BASE_URL}/api/gift-cards/mine`, { headers }).then((r) => (r.ok ? r.json() : [])),
        ]);
        if (me?.fullName) setSender((s) => s || me.fullName);
        setPhoneOnProfile(String(me?.phoneNumber ?? "").replace(/\D/g, "").length >= 10);
        setMine(Array.isArray(cards) ? cards : []);
      } catch {
        setPhoneOnProfile(false);
      }
    });
    return () => unsub();
  }, []);

  async function createCard() {
    setNotice(null);
    if (!Number.isFinite(finalAmount) || finalAmount < MIN || finalAmount > MAX) { setNotice(c.errAmount); return; }
    if (!sender.trim() || !recipient.trim()) { setNotice(c.errFields); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim())) { setNotice(c.errEmail); return; }
    setBusy(true);
    try {
      const headers = await buildAuthHeaders({ extra: { "Content-Type": "application/json" } });
      const res = await fetch(`${API_BASE_URL}/api/gift-cards`, {
        method: "POST", headers,
        body: JSON.stringify({ amount: Math.round(finalAmount), senderName: sender.trim(), recipientName: recipient.trim(), recipientEmail: recipientEmail.trim(), message: message.trim() || undefined, locale }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) { setNotice(d.error === "invalid_amount" ? c.errAmount : d.error === "invalid_email" ? c.errEmail : c.errGeneric); return; }
      setGiftId(d.id);
      track("begin_checkout", { currency: "TRY", value: Math.round(finalAmount), items: [{ item_id: "gift_card", item_name: "Gift card", price: Math.round(finalAmount) }] });
    } catch {
      setNotice(c.errGeneric);
    } finally {
      setBusy(false);
    }
  }

  async function pay() {
    if (!giftId) return;
    setNotice(null);
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 15 || !/^\d{2}$/.test(expMonth) || !/^\d{2,4}$/.test(expYear) || !/^\d{3,4}$/.test(cvv)) { setNotice(c.errCard); return; }
    const phoneDigits = phone.replace(/\D/g, "").replace(/^00/, "");
    if (phoneOnProfile === false && !/^(5\d{9}|\d{8,15})$/.test(phoneDigits)) { setNotice(c.errFields); return; }
    setBusy(true);
    try {
      const headers = await buildAuthHeaders({ extra: { "Content-Type": "application/json" } });
      const res = await fetch(`${API_BASE_URL}/api/payments/tami/gift-3ds`, {
        method: "POST", headers,
        body: JSON.stringify({ giftCardId: giftId, cardNumber: digits, holderName: holderName.trim(), cvv, expireMonth: expMonth, expireYear: expYear.length === 2 ? `20${expYear}` : expYear, phone: phoneDigits || undefined }),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok && d.alreadyPaid) { router.push(`/payment/success?giftCardId=${giftId}`); return; }
      if (res.ok && d.threeDsHtml) {
        try { sessionStorage.setItem("vg_3ds_html", d.threeDsHtml); } catch { setNotice(c.errGeneric); return; }
        window.location.href = "/payment/3ds";
        return;
      }
      setNotice(paymentErrorText(d.error, d.code, d.message ?? c.errGeneric));
    } catch {
      setNotice(c.errGeneric);
    } finally {
      setBusy(false);
    }
  }

  async function checkBalance() {
    const code = checkCode.trim();
    if (!code) return;
    setCheckMsg(null);
    try {
      const headers = await buildAuthHeaders({ extra: { "Content-Type": "application/json" } });
      const res = await fetch(`${API_BASE_URL}/api/gift-cards/check`, { method: "POST", headers, body: JSON.stringify({ code }) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) { setCheckMsg(c.notFound); return; }
      setCheckMsg(d.active ? c.balance(fmt(d.balance), d.expiresAt ? fmtDate(d.expiresAt) : "—") : c.inactive);
    } catch {
      setCheckMsg(c.errGeneric);
    }
  }

  const inputCls = "h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base text-neutral-900 placeholder:text-neutral-400 focus:border-[#5B3FD9] focus:outline-none focus:ring-[3px] focus:ring-[#5B3FD9]/15";
  const label = "mb-1.5 block text-sm font-medium text-neutral-900";
  const primary = "flex h-12 w-full items-center justify-center rounded-xl bg-[#5B3FD9] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#4A32B8] disabled:cursor-not-allowed disabled:opacity-50";
  const loginHref = `/login?next=${encodeURIComponent("/gift-cards")}`;

  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <Navbar />
      <div className="mx-auto grid max-w-5xl gap-12 px-4 pb-20 pt-28 md:px-6 md:pt-32 lg:grid-cols-[1fr_420px]">
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

          <h2 className="mt-12 font-display text-2xl font-normal">{c.how}</h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-700">{c.howBody}</p>

          {signedIn && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-normal">{c.checkTitle}</h2>
              <form onSubmit={(e) => { e.preventDefault(); checkBalance(); }} className="mt-4 flex max-w-md gap-2">
                <label htmlFor="check" className="sr-only">{c.checkPh}</label>
                <input id="check" value={checkCode} onChange={(e) => setCheckCode(e.target.value.toUpperCase())} placeholder={c.checkPh} maxLength={20} autoComplete="off" className={`${inputCls} h-11 uppercase`} />
                <button type="submit" disabled={!checkCode.trim()} className="h-11 shrink-0 rounded-xl border border-neutral-300 px-4 text-sm font-medium hover:bg-neutral-50 disabled:opacity-50">{c.check}</button>
              </form>
              {checkMsg && <p role="status" className="mt-2 text-sm text-neutral-700">{checkMsg}</p>}
            </div>
          )}

          {mine.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-normal">{c.mineTitle}</h2>
              <ul className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
                {mine.map((g) => (
                  <li key={g.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                    <div>
                      <p className="font-medium">{g.recipientName} · {fmt(g.amount)}</p>
                      <p className="text-neutral-600">{g.recipientEmail}</p>
                    </div>
                    <div className="text-right">
                      {g.code && <p className="font-mono text-[#5B3FD9]">{g.code}</p>}
                      <p className="text-neutral-600">{fmt(g.balance)} {c.remaining}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <aside className="rounded-2xl border border-neutral-200 p-5 lg:p-6">
          {signedIn === false ? (
            <Link href={loginHref} className={primary}>{c.signIn}</Link>
          ) : !giftId ? (
            <form onSubmit={(e) => { e.preventDefault(); createCard(); }} className="space-y-4">
              <fieldset>
                <legend className={label}>{c.amount}</legend>
                <div className="grid grid-cols-3 gap-2">
                  {PRESETS.map((p) => (
                    <button key={p} type="button" onClick={() => { setAmount(p); setCustomAmount(""); }}
                      aria-pressed={!customAmount && amount === p}
                      className={`h-11 rounded-xl border text-sm font-medium transition-colors ${!customAmount && amount === p ? "border-[#5B3FD9] bg-[#5B3FD9]/5 text-[#5B3FD9]" : "border-neutral-300 hover:bg-neutral-50"}`}>
                      {fmt(p)}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div>
                <label htmlFor="gc-custom" className={label}>{c.custom}</label>
                <input id="gc-custom" inputMode="numeric" value={customAmount} placeholder={`${MIN}–${MAX}`}
                  onChange={(e) => setCustomAmount(e.target.value.replace(/\D/g, "").slice(0, 5))} className={inputCls} />
              </div>
              <div>
                <label htmlFor="gc-from" className={label}>{c.from}</label>
                <input id="gc-from" value={sender} maxLength={100} onChange={(e) => setSender(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="gc-to" className={label}>{c.to}</label>
                <input id="gc-to" value={recipient} maxLength={100} onChange={(e) => setRecipient(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="gc-email" className={label}>{c.toEmail}</label>
                <input id="gc-email" type="email" autoComplete="off" value={recipientEmail} maxLength={256} onChange={(e) => setRecipientEmail(e.target.value)} className={inputCls} />
              </div>
              <div>
                <label htmlFor="gc-msg" className={label}>{c.message}</label>
                <textarea id="gc-msg" rows={3} maxLength={500} value={message} onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-base focus:border-[#5B3FD9] focus:outline-none focus:ring-[3px] focus:ring-[#5B3FD9]/15" />
              </div>
              {notice && <p role="alert" className="text-sm text-red-700">{notice}</p>}
              <button type="submit" disabled={busy || signedIn === null} className={primary}>
                {c.continue} · {Number.isFinite(finalAmount) && finalAmount > 0 ? fmt(finalAmount) : "—"}
              </button>
            </form>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); pay(); }} className="space-y-4" autoComplete="on">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl font-normal">{c.payTitle}</h2>
                  <p className="mt-1 text-sm text-neutral-600">{c.payFor(recipient, fmt(finalAmount))}</p>
                </div>
                <button type="button" onClick={() => setGiftId(null)} className="text-sm font-medium underline underline-offset-2">{c.edit}</button>
              </div>
              <div>
                <label htmlFor="gc-cc" className={label}>{c.cardNumber}</label>
                <input id="gc-cc" inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" value={cardNumber}
                  onChange={(e) => { const d = e.target.value.replace(/\D/g, "").slice(0, 19); setCardNumber(d.replace(/(.{4})/g, "$1 ").trim()); }}
                  className={`${inputCls} tabular-nums`} />
              </div>
              <div>
                <label htmlFor="gc-holder" className={label}>{c.holder}</label>
                <input id="gc-holder" autoComplete="cc-name" value={holderName} onChange={(e) => setHolderName(e.target.value.toUpperCase())} className={inputCls} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label htmlFor="gc-m" className={label}>{c.expM}</label>
                  <input id="gc-m" inputMode="numeric" autoComplete="cc-exp-month" placeholder="MM" maxLength={2} value={expMonth} onChange={(e) => setExpMonth(e.target.value.replace(/\D/g, "").slice(0, 2))} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="gc-y" className={label}>{c.expY}</label>
                  <input id="gc-y" inputMode="numeric" autoComplete="cc-exp-year" placeholder="YYYY" maxLength={4} value={expYear} onChange={(e) => setExpYear(e.target.value.replace(/\D/g, "").slice(0, 4))} className={inputCls} />
                </div>
                <div>
                  <label htmlFor="gc-cvv" className={label}>{c.cvv}</label>
                  <input id="gc-cvv" inputMode="numeric" autoComplete="cc-csc" placeholder="123" maxLength={4} value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))} className={inputCls} />
                </div>
              </div>
              {phoneOnProfile === false && (
                <div>
                  <label htmlFor="gc-phone" className={label}>{c.phone}</label>
                  <input id="gc-phone" inputMode="tel" autoComplete="tel" maxLength={20} value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s()-]/g, ""))} className={inputCls} />
                  <p className="mt-1.5 text-xs text-neutral-500">{c.phoneHint}</p>
                </div>
              )}
              <p className="text-xs leading-5 text-neutral-500">{c.secure}</p>
              {notice && <p role="alert" className="text-sm text-red-700">{notice}</p>}
              <button type="submit" disabled={busy} className={primary}>{c.pay(fmt(finalAmount))}</button>
            </form>
          )}
        </aside>
      </div>
      <MainFooter />
    </main>
  );
}
