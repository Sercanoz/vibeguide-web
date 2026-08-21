"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { clientFetch, API_BASE_URL } from "@/lib/api";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { paymentErrorText } from "@/lib/paymentErrors";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import Price from "@/components/Price";

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

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? ""
    : d.toLocaleString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
}

export default function PoolDetailClient() {
  const params = useParams();
  const poolId = Number(params?.id);

  const [data, setData] = useState<PoolDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

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
    if (!poolId) return;
    load();
    // Ödeme penceresi ve katılımcı sayısı canlı değişiyor.
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, [poolId, load]);

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
        setNotice(d.message ?? "Could not join this group.");
        return;
      }
      await load();
    } catch {
      setNotice("Something went wrong. Please try again.");
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
      setNotice("Please enter a valid card number.");
      return;
    }
    const [mm, yy] = expiry.split("/").map((s) => s.trim());
    if (!mm || !yy) {
      setNotice("Please enter the expiry date as MM/YY.");
      return;
    }
    if (cvv.replace(/\D/g, "").length < 3) {
      setNotice("Please enter the security code (CVV).");
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
          setNotice("Could not start the payment. Please try again.");
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
        paymentErrorText(d.error, d.code, d.message ?? "Payment could not be started."),
      );
    } catch {
      setNotice("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAFB]">
        <Navbar />
        <div className="pt-28 px-4">
          <div className="mx-auto max-w-2xl h-48 rounded-3xl bg-white border border-black/[0.06] animate-pulse" />
        </div>
      </main>
    );
  }

  if (!data?.pool) {
    return (
      <main className="min-h-screen bg-[#FAFAFB]">
        <Navbar />
        <div className="pt-28 pb-16 px-4">
          <div className="mx-auto max-w-md rounded-3xl border border-black/[0.06] bg-white p-8 text-center">
            <p className="font-black text-[#0A0A0F]">Group not found</p>
            <p className="mt-1 text-sm text-neutral-600">
              It may have been cancelled or already completed.
            </p>
            <Link
              href="/pools"
              className="mt-5 inline-flex rounded-2xl bg-[#6C4CF1] px-6 py-3 text-sm font-bold text-white"
            >
              See open groups →
            </Link>
          </div>
        </div>
        <MainFooter />
      </main>
    );
  }

  const p = data.pool;
  const mine = data.myParticipation;
  const awaitingPayment = mine?.status === "awaiting_payment";
  const confirmed = mine?.status === "confirmed";
  const canJoin = !mine && p.status === "open" && signedIn;

  const dueMs = mine?.paymentDueAt
    ? new Date(mine.paymentDueAt).getTime() - Date.now()
    : 0;
  const minsLeft = Math.max(0, Math.floor(dueMs / 60000));

  return (
    <main className="min-h-screen bg-[#FAFAFB]">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-2xl space-y-5">
          {/* Başlık */}
          <div className="rounded-3xl border border-black/[0.06] bg-white p-6">
            <h1 className="text-2xl font-black text-[#0A0A0F]">{p.tourTitle}</h1>
            <p className="mt-1.5 text-sm text-neutral-600">
              {fmtDate(p.scheduledAt)}
              {p.guideName ? ` · ${p.guideName}` : ""}
              {p.language ? ` · ${p.language.toUpperCase()}` : ""}
            </p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#6C4CF1]">
                <Price
                  amount={p.lockedPricePerPerson ?? p.currentPricePerPerson}
                  currency={p.currency}
                />
              </span>
              <span className="text-sm text-neutral-600">per person</span>
            </div>
            <p className="mt-3 text-xs text-neutral-600">
              {p.currentParticipants}/{p.maxParticipants} joined · minimum{" "}
              {p.minParticipants}
            </p>
          </div>

          {/* Ödeme penceresi */}
          {awaitingPayment && (
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
              <p className="font-black text-amber-900">
                Your group is ready — complete payment
              </p>
              <p className="mt-1 text-sm text-amber-800 leading-6">
                <Price amount={mine?.actualAmount ?? 0} currency={p.currency} /> per
                person. {minsLeft > 0
                  ? `${minsLeft} minute${minsLeft === 1 ? "" : "s"} left to confirm your spot.`
                  : "The payment window has closed."}
              </p>

              {minsLeft > 0 && !showCard && (
                <button
                  onClick={() => setShowCard(true)}
                  className="mt-4 w-full rounded-2xl bg-[#6C4CF1] py-3.5 text-sm font-bold text-white hover:bg-[#5a3dd4] transition-colors"
                >
                  Pay now
                </button>
              )}

              {minsLeft > 0 && showCard && (
                <div className="mt-4 space-y-3">
                  <input
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    inputMode="numeric"
                    placeholder="Card number"
                    className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm"
                  />
                  <input
                    value={holderName}
                    onChange={(e) => setHolderName(e.target.value)}
                    placeholder="Name on card"
                    className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      inputMode="numeric"
                      className="rounded-xl border border-black/10 px-4 py-3 text-sm"
                    />
                    <input
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="CVV"
                      inputMode="numeric"
                      className="rounded-xl border border-black/10 px-4 py-3 text-sm"
                    />
                  </div>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Mobile number (5XXXXXXXXX)"
                    inputMode="numeric"
                    className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm"
                  />
                  <button
                    onClick={pay}
                    disabled={busy}
                    className="w-full rounded-2xl bg-[#6C4CF1] py-3.5 text-sm font-bold text-white hover:bg-[#5a3dd4] disabled:opacity-50 transition-colors"
                  >
                    {busy ? "Processing…" : "Pay securely"}
                  </button>
                  <p className="text-center text-[11px] text-neutral-600">
                    🔒 3D Secure · Card details are never stored
                  </p>
                </div>
              )}
            </div>
          )}

          {confirmed && (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="font-black text-emerald-900">Your spot is confirmed 🎉</p>
              <p className="mt-1 text-sm text-emerald-800">
                See you on {fmtDate(p.scheduledAt)}.
              </p>
            </div>
          )}

          {/* Katılma */}
          {canJoin && (
            <button
              onClick={join}
              disabled={busy}
              className="w-full rounded-2xl bg-[#6C4CF1] py-4 text-sm font-bold text-white hover:bg-[#5a3dd4] disabled:opacity-50 transition-colors"
            >
              {busy ? "Joining…" : "Join this group"}
            </button>
          )}

          {!signedIn && signedIn !== null && (
            <div className="rounded-2xl border border-black/[0.06] bg-white p-5 text-center text-sm text-neutral-700">
              <Link href="/login" className="font-bold text-[#6C4CF1]">
                Sign in
              </Link>{" "}
              to join this group.
            </div>
          )}

          {notice && (
            <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">
              {notice}
            </div>
          )}

          <p className="text-xs text-neutral-600 leading-6">
            You are not charged when you join. Once the group is complete the
            final price is set and everyone gets 30 minutes to pay. If not enough
            travellers pay in time, the group is cancelled and anyone who paid is
            refunded.
          </p>
        </div>
      </div>
      <MainFooter />
    </main>
  );
}
