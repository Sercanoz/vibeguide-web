"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fbAuth, signOut } from "@/lib/firebase-client";
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
  Cancelled: "bg-neutral-100 text-neutral-500",
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

export default function ProfilePage() {
  const router = useRouter();
  const [me, setMe] = useState<Me | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [payout, setPayout] = useState<PayoutSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged(async (user) => {
      if (!user) { router.push("/"); return; }
      await user.reload();
      // Block access until email is verified
      if (!user.emailVerified) { await signOut(); router.push("/"); return; }
      const token = await user.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };

      const [meRes, bookingsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/auth/me`, { headers }),
        fetch(`${API_BASE_URL}/api/bookings/my`, { headers }),
      ]);

      if (!meRes.ok) { router.push("/"); return; }
      const meData: Me = await meRes.json();
      setMe(meData);

      if (bookingsRes.ok) setBookings(await bookingsRes.json());

      if (meData.role === "Guide") {
        const payoutRes = await fetch(`${API_BASE_URL}/api/payouts/me/summary`, { headers });
        if (payoutRes.ok) setPayout(await payoutRes.json());
      }

      setLoading(false);
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

  if (!me) return null;

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
                  className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-black/10 text-sm font-semibold text-neutral-500 hover:border-red-200 hover:text-red-500 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Sign out
                </button>
              </div>
              <h1 className="text-xl font-black text-[#0A0A0F]">{me.fullName}</h1>
              <p className="text-sm text-neutral-400">{me.email}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${roleMeta.color}`}>
                  {roleMeta.icon} {roleMeta.label}
                </span>
                <span className="text-xs text-neutral-400">
                  Member since {new Date(me.createdAtUtc).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                </span>
              </div>
              {me.guideProfile?.languages && (
                <p className="mt-2 text-xs text-neutral-400">
                  🌐 Guides in: <span className="font-semibold text-neutral-600">{me.guideProfile.languages.toUpperCase().split(",").join(" · ")}</span>
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
              <p className="text-xs font-black uppercase tracking-wide text-neutral-400 mb-4">Earnings</p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-black text-[#6C4CF1]">{payout.pendingThisWeek.toLocaleString()} <span className="text-sm font-bold">{payout.currency}</span></p>
                  <p className="text-xs text-neutral-400 mt-0.5">This week</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0A0A0F]">{payout.pendingTotal.toLocaleString()} <span className="text-sm font-bold">{payout.currency}</span></p>
                  <p className="text-xs text-neutral-400 mt-0.5">Pending total</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-[#0A0A0F]">{payout.lifetime.toLocaleString()} <span className="text-sm font-bold">{payout.currency}</span></p>
                  <p className="text-xs text-neutral-400 mt-0.5">Lifetime</p>
                </div>
              </div>
              <p className="text-xs text-neutral-400 mt-4 pt-4 border-t border-black/[0.06]">
                Next payout: <span className="font-semibold text-neutral-600">{new Date(payout.nextPayoutAt).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}</span>
              </p>
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
                    <p className="text-xs text-neutral-400">{new Date(b.scheduledAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-bold text-[#6C4CF1]">{b.price} {b.currency}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLOR[b.status] ?? "bg-neutral-100 text-neutral-500"}`}>{b.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Past bookings */}
          {pastBookings.length > 0 && (
            <div className="bg-white rounded-3xl border border-black/[0.06] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between">
                <p className="text-sm font-black text-[#0A0A0F]">Past tours</p>
                <span className="text-xs text-neutral-400">{pastBookings.length} total</span>
              </div>
              {pastBookings.slice(0, 5).map((b) => (
                <div key={b.id} className="flex items-center gap-4 px-6 py-4 border-b border-black/[0.04] last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0A0A0F] truncate">{b.tourTitle ?? `Booking #${b.id}`}</p>
                    <p className="text-xs text-neutral-400">{new Date(b.scheduledAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-semibold text-neutral-500">{b.price} {b.currency}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLOR[b.status] ?? "bg-neutral-100 text-neutral-500"}`}>{b.status}</span>
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
              <p className="text-sm text-neutral-400 mt-1">Download the app to book your first tour</p>
              <Link href="/#download"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-[#6C4CF1] text-white font-bold px-6 py-3 text-sm hover:bg-[#5a3dd4] transition-colors"
                style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
                Download app →
              </Link>
            </div>
          )}

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
