"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authedFetch } from "@/lib/admin-api";

type Stats = {
  users: { tourist: number; guide: number; pendingGuide: number; admin: number };
  tours: { total: number; active: number };
  pools: { open: number; locked: number };
  last30Days: { bookings: number; revenue: number; topTours: { tourId: number; title: string; bookings: number }[] };
  generatedAt: string;
};

function StatCard({ label, value, sub, color, icon }: { label: string; value: string | number; sub?: string; color: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-black/[0.06] p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide">{label}</p>
          <p className={`mt-2 text-3xl font-black ${color}`}>{value}</p>
          {sub && <p className="mt-1 text-xs text-neutral-400">{sub}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color.replace("text-", "bg-").replace("[#", "[#").replace("]", "/10]")}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

const QUICK_LINKS = [
  { href: "/admin/applications", label: "Review applications", desc: "Approve or reject pending guide applications", color: "border-amber-200 hover:border-amber-400", dot: "bg-amber-400" },
  { href: "/admin/tours", label: "Manage tours", desc: "Add, edit and publish tour experiences", color: "border-[#6C4CF1]/20 hover:border-[#6C4CF1]/50", dot: "bg-[#6C4CF1]" },
  { href: "/admin/guides", label: "Guide profiles", desc: "Edit bios and manage guide languages", color: "border-emerald-200 hover:border-emerald-400", dot: "bg-emerald-500" },
  { href: "/admin/withdrawals", label: "Withdrawals", desc: "Process pending payout requests", color: "border-blue-200 hover:border-blue-400", dot: "bg-blue-500" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authedFetch<Stats>("/api/admin/stats")
      .then((r) => { if (r.ok) setStats(r.data); })
      .finally(() => setLoading(false));
  }, []);

  const now = new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm text-neutral-400 font-medium">{greeting} 👋</p>
        <h1 className="mt-1 text-3xl font-black text-[#0A0A0F]">Dashboard</h1>
        <p className="mt-1 text-sm text-neutral-400">
          {now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-neutral-100 animate-pulse" />
          ))}
        </div>
      ) : stats ? (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard label="Tourists" value={stats.users.tourist} sub="registered" color="text-[#6C4CF1]"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6C4CF1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>} />
            <StatCard label="Active Guides" value={stats.users.guide} sub="approved" color="text-emerald-600"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1"/><path d="M9 20l1-5 2 2 1-5"/><path d="M6 11l2-4h8l1 4"/></svg>} />
            <StatCard label="Pending" value={stats.users.pendingGuide} sub="awaiting review" color="text-amber-600"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>} />
            <StatCard label="Active Tours" value={stats.tours.active} sub={`${stats.tours.total} total`} color="text-blue-600"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>} />
            <StatCard label="Bookings (30d)" value={stats.last30Days.bookings} sub="last 30 days" color="text-[#0A0A0F]"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0A0A0F" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>} />
            <StatCard label="Revenue (30d)" value={`${stats.last30Days.revenue.toLocaleString()} TRY`} sub="completed bookings" color="text-[#6C4CF1]"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6C4CF1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>} />
            <StatCard label="Open Pools" value={stats.pools.open} sub={`${stats.pools.locked} locked`} color="text-teal-600"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0D9488" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} />
            <StatCard label="Total Users" value={stats.users.tourist + stats.users.guide + stats.users.pendingGuide} sub="all roles" color="text-neutral-700"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Quick links */}
            <div>
              <h2 className="text-sm font-black text-[#0A0A0F] mb-3">Quick actions</h2>
              <div className="space-y-2">
                {QUICK_LINKS.map((l) => (
                  <Link key={l.href} href={l.href}
                    className={`flex items-center gap-3 p-4 rounded-2xl bg-white border transition-all hover:shadow-sm ${l.color}`}>
                    <span className={`w-2 h-2 rounded-full shrink-0 ${l.dot}`} />
                    <div>
                      <p className="text-sm font-bold text-[#0A0A0F]">{l.label}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{l.desc}</p>
                    </div>
                    <svg className="ml-auto text-neutral-300" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  </Link>
                ))}
              </div>
            </div>

            {/* Top tours */}
            <div>
              <h2 className="text-sm font-black text-[#0A0A0F] mb-3">Top tours (last 30 days)</h2>
              {stats.last30Days.topTours.length === 0 ? (
                <div className="bg-white rounded-2xl border border-black/[0.06] p-6 text-center text-sm text-neutral-400">No bookings yet</div>
              ) : (
                <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden">
                  {stats.last30Days.topTours.map((t, i) => (
                    <Link key={t.tourId} href={`/admin/tours/${t.tourId}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors border-b border-black/[0.04] last:border-0">
                      <span className="w-6 h-6 rounded-lg bg-[#6C4CF1]/8 flex items-center justify-center text-[11px] font-black text-[#6C4CF1]">{i + 1}</span>
                      <span className="flex-1 text-sm font-semibold text-[#0A0A0F] truncate">{t.title}</span>
                      <span className="text-xs font-bold text-neutral-400">{t.bookings} bookings</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pending applications alert */}
              {stats.users.pendingGuide > 0 && (
                <Link href="/admin/applications"
                  className="mt-4 flex items-center gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 hover:border-amber-300 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-amber-800">{stats.users.pendingGuide} pending application{stats.users.pendingGuide > 1 ? "s" : ""}</p>
                    <p className="text-xs text-amber-600">Click to review and approve</p>
                  </div>
                  <svg className="ml-auto text-amber-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </Link>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-sm text-neutral-400">Could not load stats.</div>
      )}
    </div>
  );
}
