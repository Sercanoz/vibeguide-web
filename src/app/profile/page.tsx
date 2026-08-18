"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fbAuth, signOut, buildAuthHeaders } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";
import Navbar from "@/components/Navbar";

type Me = {
  id: number;
  fullName: string;
  email: string;
  role: string;
  createdAtUtc: string;
  guideProfile?: { city: string | null; languages: string | null; rating: number | null };
};

type Booking = {
  id: number;
  tourTitle: string;
  guideName: string;
  touristName: string;
  scheduledAt: string;
  status: string;
  price: number;
  currency: string;
};

type PayoutSummary = {
  pendingThisWeek: number;
  pendingTotal: number;
  lifetime: number;
  nextPayoutAt: string;
  currency: string;
};

const STATUS_COLOR: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Paid: "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-neutral-100 text-neutral-700",
  Rejected: "bg-red-100 text-red-600",
};

const ROLE_META: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  Tourist: {
    label: "Tourist",
    color: "bg-[#6C4CF1]/10 text-[#6C4CF1]",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
  Guide: {
    label: "Verified Guide",
    color: "bg-emerald-100 text-emerald-700",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"/><path d="M9 20l1-5 2 2 1-5"/><path d="M6 11l2-4h8l1 4"/></svg>,
  },
  PendingGuide: {
    label: "Guide (Pending)",
    color: "bg-amber-100 text-amber-700",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
};

/** Mobil profildeki `_GroupLabel` karşılığı — bölüm başlığı. */
function GroupLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-2 pb-2 pt-1 text-xs font-black uppercase tracking-wide text-neutral-500">
      {children}
    </p>
  );
}

/** Mobil profildeki `_SectionGroup` karşılığı — kartın içinde bölünmüş satır grubu. */
function SectionGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-black/[0.06] shadow-sm overflow-hidden divide-y divide-black/[0.04]">
      {children}
    </div>
  );
}

/** Mobil profildeki `_MenuTile` karşılığı — ikon + başlık + alt metin + chevron. */
function MenuTile({
  icon, title, subtitle, href, external, onClick, danger,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  danger?: boolean;
}) {
  const body = (
    <div className="flex items-center gap-4 px-5 py-4 hover:bg-neutral-50 transition-colors w-full text-left">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${danger ? "bg-red-50" : "bg-[#6C4CF1]/8"}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-bold ${danger ? "text-red-600" : "text-[#0A0A0F]"}`}>{title}</p>
        {subtitle && <p className="text-xs text-neutral-500 mt-0.5 leading-5">{subtitle}</p>}
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  );

  if (href) {
    return external ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">{body}</a>
    ) : (
      <Link href={href} className="block">{body}</Link>
    );
  }
  return <button onClick={onClick} className="block w-full">{body}</button>;
}

// Menü ikonları — mobildeki Material ikonlarının web karşılıkları.
const ico = (path: React.ReactNode, color = "#6C4CF1") => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    {path}
  </svg>
);

export default function ProfilePage() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [guideRequests, setGuideRequests] = useState<Booking[]>([]);
  const [payout, setPayout] = useState<PayoutSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actingId, setActingId] = useState<number | null>(null);
  // İptal akışı: önce cancel-preview (iade %), sonra onay → /cancel.
  const [cancelFor, setCancelFor] = useState<Booking | null>(null);
  const [cancelPreview, setCancelPreview] = useState<{ refundPct: number; refundAmount: number; currency: string; allowed: boolean } | null>(null);
  const [cancelBusy, setCancelBusy] = useState(false);

  // Rehberin gelen (kendisinin GuideId olduğu) Pending taleplerini tazele.
  async function loadGuideRequests() {
    const headers = await buildAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/api/bookings/my?role=guide`, { headers });
    if (res.ok) {
      const all: Booking[] = await res.json();
      setGuideRequests(all.filter((b) => b.status === "Pending"));
    }
  }

  // Rehber bir talebi kabul/red eder → backend accept/reject → listeyi tazele.
  async function actOnRequest(bookingId: number, action: "accept" | "reject") {
    setActingId(bookingId);
    try {
      const headers = await buildAuthHeaders({ extra: { "Content-Type": "application/json" } });
      const res = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/${action}`, {
        method: "POST",
        headers,
        body: action === "reject" ? JSON.stringify({ reason: "" }) : undefined,
      });
      if (res.ok) {
        await loadGuideRequests();
      }
    } finally {
      setActingId(null);
    }
  }

  async function reloadBookings() {
    const headers = await buildAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/api/bookings/my`, { headers });
    if (res.ok) setBookings(await res.json());
  }

  // İptal: önce preview (iade %) al, modal aç.
  async function openCancel(b: Booking) {
    setCancelFor(b);
    setCancelPreview(null);
    try {
      const headers = await buildAuthHeaders();
      const res = await fetch(`${API_BASE_URL}/api/bookings/${b.id}/cancel-preview`, { headers });
      if (res.ok) setCancelPreview(await res.json());
    } catch { /* modal yine de açık, preview olmadan onaylayabilir */ }
  }

  // İptali onayla → /cancel → listeleri tazele.
  async function confirmCancel() {
    if (!cancelFor) return;
    setCancelBusy(true);
    try {
      const headers = await buildAuthHeaders({ extra: { "Content-Type": "application/json" } });
      const res = await fetch(`${API_BASE_URL}/api/bookings/${cancelFor.id}/cancel`, {
        method: "POST",
        headers,
        body: JSON.stringify({ reason: "" }),
      });
      if (res.ok) {
        setCancelFor(null);
        setCancelPreview(null);
        await reloadBookings();
      }
    } finally {
      setCancelBusy(false);
    }
  }

  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged(async (user) => {
      if (!user) { router.push("/"); return; }
      await user.reload();
      // Email doğrulama kuralını backend uygular (rehber admin KYC onaylı, muaf).
      // me.ok değilse zaten aşağıda yönlendiriliyor — erken emailVerified bloğu yok.
      const headers = await buildAuthHeaders();

      const [meRes, bookingsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/auth/me`, { headers }),
        fetch(`${API_BASE_URL}/api/bookings/my`, { headers }),
      ]);

      // /api/auth/me başarısızsa sayfa eskiden `!me → return null` ile TAMAMEN
      // boş kalıyordu (Navbar bile yok). Artık hatayı sakla ve aşağıda göster.
      if (!meRes.ok) {
        setLoadError(
          meRes.status === 401
            ? "Your session has expired. Please sign in again."
            : `Could not load your profile (error ${meRes.status}). Please try again.`,
        );
        setLoading(false);
        return;
      }

      try {
        const meData: Me = await meRes.json();
        setMe(meData);

        if (bookingsRes.ok) setBookings(await bookingsRes.json());

        if (meData.role === "Guide") {
          const payoutRes = await fetch(`${API_BASE_URL}/api/payouts/me/summary`, { headers });
          if (payoutRes.ok) setPayout(await payoutRes.json());
          await loadGuideRequests();
        }
      } catch {
        setLoadError("Could not load your profile. Please try again.");
      } finally {
        setLoading(false);
      }
    });
    return () => unsub();
  }, [router]);

  async function onSignOut() {
    await signOut();
    router.push("/");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-16 flex items-center justify-center h-screen">
          <div className="w-8 h-8 rounded-full border-2 border-[#6C4CF1] border-t-transparent animate-spin" />
        </div>
      </main>
    );
  }

  // Eskiden burada `return null` vardı → profil yüklenemeyince BOMBOŞ BEYAZ EKRAN.
  // Artık ne olduğunu söyleyip çıkış yolu veriyoruz.
  if (!me) {
    return (
      <main className="min-h-screen bg-[#F7F7FB]">
        <Navbar />
        <div className="pt-24 pb-16 px-4">
          <div className="mx-auto max-w-md bg-white rounded-3xl border border-black/[0.06] shadow-sm p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="text-base font-black text-[#0A0A0F]">Profile unavailable</p>
            <p className="text-sm text-neutral-600 mt-1.5 leading-6">
              {loadError ?? "We couldn't load your profile."}
            </p>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 rounded-2xl border border-black/10 font-bold py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
              >
                Try again
              </button>
              <button
                onClick={onSignOut}
                className="flex-1 rounded-2xl bg-[#6C4CF1] text-white font-bold py-2.5 text-sm hover:bg-[#5a3dd4] transition-colors"
              >
                Sign in again
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const roleMeta = ROLE_META[me.role] ?? ROLE_META.Tourist;
  const activeBookings = bookings.filter(b => ["Pending","Paid"].includes(b.status));
  const pastBookings = bookings.filter(b => ["Completed","Cancelled","Rejected"].includes(b.status));
  const initials = me.fullName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <main className="min-h-screen bg-[#F7F7FB]">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-3xl space-y-5">

          {/* Profile card */}
          <div className="bg-white rounded-3xl border border-black/[0.06] shadow-sm overflow-hidden">
            {/* Header gradient */}
            <div className="h-20 bg-gradient-to-r from-[#6C4CF1]/10 via-[#8B5CF6]/8 to-[#EC4899]/5" />
            <div className="px-6 pb-6">
              {/* Avatar */}
              <div className="flex items-end justify-between -mt-10 mb-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#6C4CF1] to-[#8B5CF6] flex items-center justify-center text-2xl font-black text-white border-4 border-white shadow-lg">
                  {initials}
                </div>
                <button onClick={onSignOut}
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-black/10 text-sm font-semibold text-neutral-700 hover:border-red-200 hover:text-red-500 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sign out
                </button>
              </div>
              <h1 className="text-xl font-black text-[#0A0A0F]">{me.fullName}</h1>
              <p className="text-sm text-neutral-800">{me.email}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${roleMeta.color}`}>
                  {roleMeta.icon} {roleMeta.label}
                </span>
                {/* Tarih yoksa/bozuksa satırı hiç gösterme — "Invalid Date" yazıyordu. */}
                {(() => {
                  const d = me.createdAtUtc ? new Date(me.createdAtUtc) : null;
                  if (!d || isNaN(d.getTime())) return null;
                  return (
                    <span className="text-xs text-neutral-800">
                      Member since {d.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                    </span>
                  );
                })()}
              </div>
              {me.guideProfile?.languages && (
                <p className="mt-2 text-xs text-neutral-800">
                  🌐 Guides in: <span className="font-semibold text-neutral-800">{me.guideProfile.languages.toUpperCase().split(",").join(" · ")}</span>
                </p>
              )}
            </div>
          </div>

          {/* PendingGuide banner */}
          {me.role === "PendingGuide" && (
            <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-black text-amber-800">Application under review</p>
                <p className="text-xs text-amber-600 mt-0.5 leading-5">Our team is verifying your guide badge. This usually takes 1–2 business days. We&apos;ll email you once approved.</p>
              </div>
            </div>
          )}

          {/* Guide earnings */}
          {me.role === "Guide" && payout && (
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-sm p-6">
              <p className="text-xs font-black uppercase tracking-wide text-neutral-800 mb-4">Earnings</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-black text-[#6C4CF1]">{payout.pendingThisWeek.toLocaleString()} <span className="text-sm font-bold">{payout.currency}</span></p>
                  <p className="text-xs text-neutral-800 mt-0.5">This week</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0A0A0F]">{payout.pendingTotal.toLocaleString()} <span className="text-sm font-bold">{payout.currency}</span></p>
                  <p className="text-xs text-neutral-800 mt-0.5">Pending total</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0A0A0F]">{payout.lifetime.toLocaleString()} <span className="text-sm font-bold">{payout.currency}</span></p>
                  <p className="text-xs text-neutral-800 mt-0.5">Lifetime</p>
                </div>
              </div>
              <p className="text-xs text-neutral-800 mt-4 pt-4 border-t border-black/[0.06]">
                Next payout: <span className="font-semibold text-neutral-800">{new Date(payout.nextPayoutAt).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</span>
              </p>
            </div>
          )}

          {/* Guide: gelen rezervasyon talepleri (Pending) — kabul/red */}
          {me.role === "Guide" && guideRequests.length > 0 && (
            <div className="bg-white rounded-3xl border border-amber-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-black/[0.06] bg-amber-50/50">
                <p className="text-sm font-black text-amber-800">
                  Reservation requests ({guideRequests.length})
                </p>
                <p className="text-xs text-amber-600 mt-0.5">Tourists waiting for your response.</p>
              </div>
              {guideRequests.map((b) => (
                <div key={b.id} className="px-6 py-4 border-b border-black/[0.04] last:border-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-[#0A0A0F] truncate">{b.tourTitle ?? `Tour #${b.id}`}</p>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        {b.touristName ? `${b.touristName} · ` : ""}
                        {new Date(b.scheduledAt).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        {" · "}{b.price} {b.currency}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => actOnRequest(b.id, "accept")}
                      disabled={actingId !== null}
                      className="flex-1 rounded-full bg-[#6C4CF1] text-white font-bold py-2 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
                    >
                      {actingId === b.id ? "…" : "Accept"}
                    </button>
                    <button
                      onClick={() => actOnRequest(b.id, "reject")}
                      disabled={actingId !== null}
                      className="flex-1 rounded-full border border-black/10 font-bold py-2 text-sm text-neutral-700 hover:border-red-200 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active bookings */}
          {activeBookings.length > 0 && (
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-black/[0.06]">
                <p className="text-sm font-black text-[#0A0A0F]">Active bookings</p>
              </div>
              {activeBookings.map((b) => (
                <div key={b.id} className="flex items-center gap-4 px-6 py-4 border-b border-black/[0.04] last:border-0 hover:bg-neutral-50 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-[#6C4CF1]/8 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6C4CF1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#0A0A0F] truncate">{b.tourTitle ?? `Booking #${b.id}`}</p>
                    <p className="text-xs text-neutral-800">{new Date(b.scheduledAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold text-[#6C4CF1]">{b.price} {b.currency}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLOR[b.status] ?? "bg-neutral-100 text-neutral-700"}`}>{b.status}</span>
                    <button
                      onClick={() => openCancel(b)}
                      className="text-xs font-semibold text-neutral-400 hover:text-red-500 transition-colors px-2 py-1"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* İptal onay modalı */}
          {cancelFor && (
            <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => !cancelBusy && setCancelFor(null)}>
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-lg font-black text-[#0A0A0F]">Cancel reservation?</h2>
                <p className="mt-1 text-sm text-neutral-600">{cancelFor.tourTitle ?? `Booking #${cancelFor.id}`}</p>
                {cancelPreview ? (
                  cancelPreview.allowed ? (
                    <div className="mt-4 rounded-2xl bg-[#6C4CF1]/[0.06] border border-[#6C4CF1]/20 px-4 py-3">
                      <p className="text-sm text-neutral-700">
                        Refund: <b className="text-[#6C4CF1]">{cancelPreview.refundAmount} {cancelPreview.currency}</b>
                        {" "}({cancelPreview.refundPct}%)
                      </p>
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                      This reservation can no longer be cancelled.
                    </div>
                  )
                ) : (
                  <p className="mt-4 text-sm text-neutral-400">…</p>
                )}
                <div className="flex gap-2 mt-5">
                  <button
                    onClick={() => setCancelFor(null)}
                    disabled={cancelBusy}
                    className="flex-1 rounded-full border border-black/10 font-bold py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
                  >
                    Keep it
                  </button>
                  <button
                    onClick={confirmCancel}
                    disabled={cancelBusy || (cancelPreview !== null && !cancelPreview.allowed)}
                    className="flex-1 rounded-full bg-red-500 text-white font-bold py-2.5 text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {cancelBusy ? "…" : "Cancel reservation"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Past bookings */}
          {pastBookings.length > 0 && (
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between">
                <p className="text-sm font-black text-[#0A0A0F]">Past tours</p>
                <span className="text-xs text-neutral-800">{pastBookings.length} total</span>
              </div>
              {pastBookings.slice(0, 5).map((b) => (
                <div key={b.id} className="flex items-center gap-4 px-6 py-4 border-b border-black/[0.04] last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0A0A0F] truncate">{b.tourTitle ?? `Booking #${b.id}`}</p>
                    <p className="text-xs text-neutral-800">{new Date(b.scheduledAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-semibold text-neutral-700">{b.price} {b.currency}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLOR[b.status] ?? "bg-neutral-100 text-neutral-700"}`}>{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty state */}
          {bookings.length === 0 && (
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-sm p-10 text-center">
              <div className="w-16 h-16 rounded-3xl bg-[#6C4CF1]/8 flex items-center justify-center mx-auto mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6C4CF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <p className="text-base font-black text-[#0A0A0F]">No tours yet</p>
              <p className="text-sm text-neutral-800 mt-1">Download the app to book your first tour</p>
              <Link href="/#download"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#6C4CF1] text-white font-bold px-6 py-3 text-sm hover:bg-[#5a3dd4] transition-colors"
                style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
                Download app →
              </Link>
            </div>
          )}

          {/* ===== MENÜ — mobil profil sayfasıyla aynı bölümler ===== */}

          {/* Bookings / Guide */}
          <div>
            <GroupLabel>{me.role === "Guide" ? "Guide" : "Bookings"}</GroupLabel>
            <SectionGroup>
              <MenuTile
                href="/tours"
                icon={ico(<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>)}
                title="Browse tours"
                subtitle="Find and book a local guide"
              />
              <MenuTile
                href="/vibenow"
                icon={ico(<><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>)}
                title="VibeNow"
                subtitle="Match with a guide right now"
              />
              <MenuTile
                href="/vibesquad"
                icon={ico(<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></>)}
                title="VibeSquad"
                subtitle="Join a group tour"
              />
            </SectionGroup>
          </div>

          {/* Settings */}
          <div>
            <GroupLabel>Settings</GroupLabel>
            <SectionGroup>
              <MenuTile
                href="/account-deletion"
                icon={ico(<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>)}
                title="Account"
                subtitle="Manage or delete your account"
              />
              <MenuTile
                href="/security"
                icon={ico(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>)}
                title="Security"
                subtitle="How we protect your data"
              />
            </SectionGroup>
          </div>

          {/* Support */}
          <div>
            <GroupLabel>Support</GroupLabel>
            <SectionGroup>
              <MenuTile
                href="/help"
                icon={ico(<><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></>)}
                title="Help center"
                subtitle="Answers to common questions"
              />
              <MenuTile
                href="/contact"
                icon={ico(<><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>)}
                title="Contact us"
                subtitle="Get in touch with our team"
              />
              <MenuTile
                href="/how-it-works"
                icon={ico(<><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>)}
                title="How it works"
                subtitle="Booking, meeting and payment"
              />
            </SectionGroup>
          </div>

          {/* Legal */}
          <div>
            <GroupLabel>Legal</GroupLabel>
            <SectionGroup>
              <MenuTile
                href="/terms"
                icon={ico(<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></>)}
                title="Terms of service"
              />
              <MenuTile
                href="/privacy"
                icon={ico(<><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>)}
                title="Privacy policy"
              />
              <MenuTile
                href="/cancellation-policy"
                icon={ico(<><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>)}
                title="Cancellation policy"
              />
            </SectionGroup>
          </div>

          {/* Sign out + delete */}
          <div className="pt-1 space-y-3">
            <button
              onClick={onSignOut}
              className="w-full rounded-2xl border border-red-200 text-red-600 font-bold py-3.5 text-sm hover:bg-red-50 transition-colors"
            >
              Sign out
            </button>
            <Link
              href="/account-deletion"
              className="block text-center text-sm font-semibold text-red-500 underline underline-offset-4 hover:text-red-600 transition-colors py-2"
            >
              Delete account
            </Link>
          </div>

          {/* App download CTA */}
          <div className="bg-gradient-to-r from-[#6C4CF1] to-[#8B5CF6] rounded-3xl p-6 flex items-center gap-5">
            <div className="flex-1">
              <p className="text-white font-black text-base">Get the full experience</p>
              <p className="text-white/70 text-xs mt-1 leading-5">Real-time guide matching, live tracking, in-app chat and more — only in the app.</p>
            </div>
            <Link href="/#download"
              className="shrink-0 bg-white text-[#6C4CF1] font-black text-sm px-5 py-2.5 rounded-2xl hover:bg-white/90 transition-colors whitespace-nowrap">
              Download →
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
