"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { paymentErrorText } from "@/lib/paymentErrors";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import Price from "@/components/Price";
import { useT } from "@/components/LanguageProvider";

interface Pool {
  id: number;
  tourId: number;
  tourTitle: string;
  guideName?: string | null;
  scheduledAt: string;
  minParticipants: number;
  maxParticipants: number;
  currentParticipants: number;
  currency: string;
  currentPricePerPerson: number;
  bestPricePerPerson: number;
  lockAt: string;
  status: string;
  lockedPricePerPerson?: number | null;
  language?: string | null;
}

/** Kullanıcının bu havuzdaki katılım kaydı. */
interface MyParticipation {
  status: string; // joined | awaiting_payment | confirmed | dropped | refunded | ...
  actualAmount?: number | null;
  paymentDueAt?: string | null;
}

interface PoolDetail {
  pool: Pool;
  myParticipation?: MyParticipation | null;
}

function fmtDate(iso: string, locale = "en"): string {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? ""
    : d.toLocaleString(locale === "tr" ? "tr-TR" : "en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
}

export default function PoolDetailClient() {
  const { locale } = useT();
  const l = PL[locale] ?? PL.en;
  const params = useParams();
  const poolId = Number(params?.id);

  const [data, setData] = useState<PoolDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  // Ödeme geri sayımı için "şimdi": render saf kalsın diye state; 30 sn'de bir güncellenir.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  // Kart formu
  const [showCard, setShowCard] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [phone, setPhone] = useState("");

  const load = useCallback(async () => {
    try {
      const headers = await buildAuthHeaders();
      const res = await fetch(`${API_BASE_URL}/api/pools/${poolId}`, { headers });
      if (res.ok) setData(await res.json());
    } catch {
      /* sessiz — poll tekrar dener */
    } finally {
      setLoading(false);
    }
  }, [poolId]);

  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged((u) => setSignedIn(!!u));
    return () => unsub();
  }, []);

  useEffect(() => {
    // Oturum çözülmeden istek atma: backend giriş istiyor; eskiden ilk istek
    // token'sız gidip 401 alıyor, sayfa ilk poll'a (15 sn) kadar boş kalıyordu.
    if (!poolId || signedIn === null) return;
    if (!signedIn) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- oturum yok: yükleme göstergesini kapat (istek atılmaz)
      setLoading(false);
      return;
    }
    load();
    // Ödeme penceresi ve katılımcı sayısı canlı değişiyor.
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, [poolId, load, signedIn]);

  async function join() {
    if (busy) return;
    setBusy(true);
    setNotice(null);
    try {
      const headers = await buildAuthHeaders({ extra: { "Content-Type": "application/json" } });
      const res = await fetch(`${API_BASE_URL}/api/pools/${poolId}/join`, {
        method: "POST",
        headers,
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        setNotice(d.message ?? l.joinFailed);
        return;
      }
      await load();
    } catch {
      setNotice(l.generic);
    } finally {
      setBusy(false);
    }
  }

  /// Havuz payını öder — bireysel checkout ile AYNI 3DS akışı, tek fark
  /// /pool-3ds ucuna gitmesi. Kart bilgisi saklanmaz, yalnız backend
  /// üzerinden TAMİ'ye iletilir.
  async function pay() {
    if (busy) return;
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 15 || digits.length > 19) {
      setNotice(l.badCard);
      return;
    }
    const [mm, yy] = expiry.split("/").map((s) => s.trim());
    if (!mm || !yy) {
      setNotice(l.badExpiry);
      return;
    }
    if (cvv.replace(/\D/g, "").length < 3) {
      setNotice(l.badCvv);
      return;
    }

    setBusy(true);
    setNotice(null);
    try {
      const headers = await buildAuthHeaders({ extra: { "Content-Type": "application/json" } });
      const res = await fetch(`${API_BASE_URL}/api/payments/tami/pool-3ds`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          poolId,
          cardNumber: digits,
          holderName: holderName.trim(),
          cvv,
          expireMonth: mm.padStart(2, "0"),
          expireYear: yy.length === 2 ? `20${yy}` : yy,
          phone: phone.replace(/\D/g, "") || undefined,
        }),
      });
      const d = await res.json().catch(() => ({}));

      if (res.ok && d.threeDsHtml) {
        // Bankanın 3DS sayfası /payment/3ds üzerinden açılır — bu sayfanın
        // CSP'si form-action'ı bankaya POST etmeyi engelliyor.
        try {
          sessionStorage.setItem("vg_3ds_html", d.threeDsHtml);
        } catch {
          setNotice(l.payStartFailed);
          return;
        }
        window.location.href = "/payment/3ds";
        return;
      }
      if (res.ok && d.alreadyPaid) {
        await load();
        return;
      }
      setNotice(
        paymentErrorText(d.error, d.code, d.message ?? l.payNotStarted),
      );
    } catch {
      setNotice(l.generic);
    } finally {
      setBusy(false);
    }
  }

  const page = (children: React.ReactNode) => (
    <main className="min-h-screen bg-white text-neutral-900 antialiased">
      <Navbar />
      <div className="px-4 pb-20 pt-24 md:px-6 md:pt-28">
        <div className="mx-auto max-w-2xl space-y-5">{children}</div>
      </div>
      <MainFooter />
    </main>
  );
  const primary = "flex h-12 w-full items-center justify-center rounded-xl bg-[#5B3FD9] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#4A32B8] disabled:opacity-50";
  const input = "h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base focus:border-[#5B3FD9] focus:outline-none focus:ring-[3px] focus:ring-[#5B3FD9]/15";
  const label = "mb-1.5 block text-sm font-medium text-neutral-900";

  if (loading) {
    return page(<div className="h-48 animate-pulse rounded-2xl bg-neutral-100" aria-busy="true" />);
  }

  if (signedIn === false) {
    return page(
      <div className="rounded-2xl border border-dashed border-neutral-300 px-6 py-12 text-center">
        <p className="font-semibold">{l.signInTitle}</p>
        <p className="mt-1 text-sm text-neutral-600">{l.signInSub}</p>
        <Link href={`/login?next=${encodeURIComponent(`/pools/${poolId}`)}`} className="mt-5 inline-flex h-11 items-center rounded-full bg-[#5B3FD9] px-6 text-sm font-semibold text-white hover:bg-[#4A32B8]">
          {l.signIn}
        </Link>
      </div>,
    );
  }

  if (!data?.pool) {
    return page(
      <div className="rounded-2xl border border-dashed border-neutral-300 px-6 py-12 text-center">
        <p className="font-semibold">{l.notFound}</p>
        <p className="mt-1 text-sm text-neutral-600">{l.notFoundSub}</p>
        <Link href="/pools" className="mt-5 inline-flex h-11 items-center rounded-full bg-[#5B3FD9] px-6 text-sm font-semibold text-white hover:bg-[#4A32B8]">
          {l.seeOpen}
        </Link>
      </div>,
    );
  }

  const p = data.pool;
  const mine = data.myParticipation;
  const awaitingPayment = mine?.status === "awaiting_payment";
  const confirmed = mine?.status === "confirmed";
  const canJoin = !mine && p.status === "open" && signedIn;

  const dueMs = mine?.paymentDueAt
    ? new Date(mine.paymentDueAt).getTime() - now
    : 0;
  const minsLeft = Math.max(0, Math.floor(dueMs / 60000));

  return page(
    <>
      {/* Başlık */}
      <div>
        <Link href="/pools" className="text-sm text-neutral-600 hover:text-neutral-900">← {l.title}</Link>
        <h1 className="mt-3 font-display text-3xl font-normal tracking-[-0.01em] md:text-4xl">{p.tourTitle}</h1>
        <p className="mt-2 text-neutral-600">
          {fmtDate(p.scheduledAt, locale)}
          {p.guideName ? ` · ${p.guideName}` : ""}
          {p.language ? ` · ${p.language.toUpperCase()}` : ""}
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 p-6">
        <div className="flex items-baseline gap-2">
          <span className="text-[28px] font-semibold leading-none tracking-tight">
            <Price amount={p.lockedPricePerPerson ?? p.currentPricePerPerson} currency={p.currency} />
          </span>
          <span className="text-sm text-neutral-600">{l.perPerson}</span>
        </div>
        <p className="mt-3 text-sm text-neutral-600">{l.joined(p.currentParticipants, p.maxParticipants, p.minParticipants)}</p>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-200" aria-hidden="true">
          <div className="h-full rounded-full bg-neutral-900" style={{ width: `${Math.min(100, (p.currentParticipants / Math.max(1, p.maxParticipants)) * 100)}%` }} />
        </div>
      </div>

      {/* Ödeme penceresi */}
      {awaitingPayment && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <p className="font-semibold text-amber-900">{l.readyTitle}</p>
          <p className="mt-1 text-sm leading-6 text-amber-900">
            <Price amount={mine?.actualAmount ?? 0} currency={p.currency} /> {l.perPerson}.{" "}
            {minsLeft > 0 ? l.minsLeft(minsLeft) : l.windowClosed}
          </p>

          {minsLeft > 0 && !showCard && (
            <button type="button" onClick={() => setShowCard(true)} className={`${primary} mt-4`}>{l.payNow}</button>
          )}

          {minsLeft > 0 && showCard && (
            <form onSubmit={(e) => { e.preventDefault(); pay(); }} className="mt-5 space-y-4">
              <div>
                <label htmlFor="pool-cc" className={label}>{l.cardNumber}</label>
                <input id="pool-cc" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" className={input} />
              </div>
              <div>
                <label htmlFor="pool-name" className={label}>{l.cardName}</label>
                <input id="pool-name" value={holderName} onChange={(e) => setHolderName(e.target.value)} autoComplete="cc-name" className={input} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="pool-exp" className={label}>{l.expiry}</label>
                  <input id="pool-exp" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" inputMode="numeric" autoComplete="cc-exp" className={input} />
                </div>
                <div>
                  <label htmlFor="pool-cvv" className={label}>CVV</label>
                  <input id="pool-cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" inputMode="numeric" autoComplete="cc-csc" className={input} />
                </div>
              </div>
              <div>
                <label htmlFor="pool-phone" className={label}>{l.phone}</label>
                <input id="pool-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="5XXXXXXXXX" inputMode="tel" autoComplete="tel" className={input} />
              </div>
              <button type="submit" disabled={busy} className={primary}>{busy ? l.processing : l.paySecure}</button>
              <p className="text-center text-xs text-neutral-600">{l.secureNote}</p>
            </form>
          )}
        </div>
      )}

      {confirmed && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <p className="font-semibold text-emerald-900">{l.confirmedTitle}</p>
          <p className="mt-1 text-sm text-emerald-800">{l.seeYou(fmtDate(p.scheduledAt, locale))}</p>
        </div>
      )}

      {/* Katılma */}
      {canJoin && (
        <button type="button" onClick={join} disabled={busy} className={primary}>{busy ? l.joining : l.join}</button>
      )}

      {notice && (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{notice}</div>
      )}

      <p className="text-sm leading-6 text-neutral-600">{l.howItWorks}</p>
    </>,
  );
}

// Metinler EN + TR; diğer diller EN'e düşer.
const PL: Record<string, {
  title: string; signInTitle: string; signInSub: string; signIn: string; notFound: string; notFoundSub: string; seeOpen: string;
  perPerson: string; joined: (n: number, max: number, min: number) => string; readyTitle: string; minsLeft: (m: number) => string;
  windowClosed: string; payNow: string; cardNumber: string; cardName: string; expiry: string; phone: string; processing: string;
  paySecure: string; secureNote: string; confirmedTitle: string; seeYou: (d: string) => string; joining: string; join: string;
  howItWorks: string; joinFailed: string; generic: string; badCard: string; badExpiry: string; badCvv: string; payStartFailed: string; payNotStarted: string;
}> = {
  en: {
    title: "Group tours", signInTitle: "Sign in to view this group", signInSub: "Group tours are available to registered travellers.", signIn: "Sign in",
    notFound: "Group not found", notFoundSub: "It may have been cancelled or already completed.", seeOpen: "See open groups",
    perPerson: "per person", joined: (n, max, min) => `${n}/${max} joined · minimum ${min}`,
    readyTitle: "Your group is ready — complete payment", minsLeft: (m) => `${m} minute${m === 1 ? "" : "s"} left to confirm your spot.`,
    windowClosed: "The payment window has closed.", payNow: "Pay now", cardNumber: "Card number", cardName: "Name on card", expiry: "Expiry",
    phone: "Mobile number", processing: "Processing…", paySecure: "Pay securely", secureNote: "3D Secure · card details are never stored",
    confirmedTitle: "Your spot is confirmed", seeYou: (d) => `See you on ${d}.`, joining: "Joining…", join: "Join this group",
    howItWorks: "You are not charged when you join. Once the group is complete the final price is set and everyone gets 30 minutes to pay. If not enough travellers pay in time, the group is cancelled and anyone who paid is refunded.",
    joinFailed: "Could not join this group.", generic: "Something went wrong. Please try again.", badCard: "Please enter a valid card number.",
    badExpiry: "Please enter the expiry date as MM/YY.", badCvv: "Please enter the security code (CVV).",
    payStartFailed: "Could not start the payment. Please try again.", payNotStarted: "Payment could not be started.",
  },
  tr: {
    title: "Grup turları", signInTitle: "Bu grubu görmek için giriş yap", signInSub: "Grup turları kayıtlı gezginlere açıktır.", signIn: "Giriş yap",
    notFound: "Grup bulunamadı", notFoundSub: "İptal edilmiş ya da tamamlanmış olabilir.", seeOpen: "Açık grupları gör",
    perPerson: "kişi başı", joined: (n, max, min) => `${n}/${max} katıldı · en az ${min}`,
    readyTitle: "Grubun hazır — ödemeyi tamamla", minsLeft: (m) => `Yerini onaylamak için ${m} dakikan kaldı.`,
    windowClosed: "Ödeme süresi doldu.", payNow: "Şimdi öde", cardNumber: "Kart numarası", cardName: "Kart üzerindeki isim", expiry: "Son kullanma",
    phone: "Cep telefonu", processing: "İşleniyor…", paySecure: "Güvenle öde", secureNote: "3D Secure · kart bilgileri saklanmaz",
    confirmedTitle: "Yerin onaylandı", seeYou: (d) => `${d} tarihinde görüşmek üzere.`, joining: "Katılınıyor…", join: "Bu gruba katıl",
    howItWorks: "Katıldığında ücret alınmaz. Grup tamamlanınca son fiyat belli olur ve herkesin ödemek için 30 dakikası olur. Yeterli gezgin zamanında ödemezse grup iptal edilir ve ödeme yapan herkese iade yapılır.",
    joinFailed: "Bu gruba katılınamadı.", generic: "Bir şeyler ters gitti. Lütfen tekrar dene.", badCard: "Lütfen geçerli bir kart numarası gir.",
    badExpiry: "Son kullanma tarihini AA/YY olarak gir.", badCvv: "Lütfen güvenlik kodunu (CVV) gir.",
    payStartFailed: "Ödeme başlatılamadı. Lütfen tekrar dene.", payNotStarted: "Ödeme başlatılamadı.",
  },
};
