"use client";

import { useEffect, useState } from "react";
import { adminApi, type AdminStats, type GuidePerf } from "@/lib/admin-api";

function KpiCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-2xl bg-white border border-vg-border p-5 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-widest text-vg-muted">{label}</p>
      <p className="mt-1.5 text-3xl font-black text-vg-ink">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-vg-muted">{sub}</p>}
    </div>
  );
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [guides, setGuides] = useState<GuidePerf[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([adminApi.getStats(), adminApi.listGuidePerformance()])
      .then(([statsRes, guidesRes]) => {
        if (!statsRes.ok) { setError(statsRes.error ?? "Failed to load stats"); setLoading(false); return; }
        if (!guidesRes.ok) { setError(guidesRes.error ?? "Failed to load guide data"); setLoading(false); return; }
        setStats(statsRes.data);
        setGuides(guidesRes.data);
        setLoading(false);
      })
      .catch((e: unknown) => {
        setError("Failed to load data: " + (e instanceof Error ? e.message : String(e)));
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64 text-vg-muted text-sm">Loading…</div>;
  if (error) return <div className="max-w-4xl mx-auto px-5 py-12 text-red-600 font-semibold">{error}</div>;
  if (!stats || !guides) return null;

  const revenueFormatted = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(stats.last30Days.revenue);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="text-2xl font-black tracking-tight text-vg-ink">Analytics</h1>
      <p className="mt-1 text-sm text-vg-muted">Platform overview and performance statistics.</p>

      {/* User KPIs */}
      <h2 className="mt-8 text-xs font-black uppercase tracking-widest text-vg-muted">Users</h2>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard label="Tourists" value={stats.users.tourist} />
        <KpiCard label="Guides" value={stats.users.guide} />
        <KpiCard label="Pending approval" value={stats.users.pendingGuide} />
        <KpiCard label="Admin" value={stats.users.admin} />
      </div>

      {/* Content KPIs */}
      <h2 className="mt-8 text-xs font-black uppercase tracking-widest text-vg-muted">Content</h2>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard label="Total tours" value={stats.tours.total} />
        <KpiCard label="Active tours" value={stats.tours.active} />
        <KpiCard label="Open pools" value={stats.pools.open} />
        <KpiCard label="Bookings (last 30 days)" value={stats.last30Days.bookings} />
      </div>

      {/* Revenue */}
      <h2 className="mt-8 text-xs font-black uppercase tracking-widest text-vg-muted">Revenue (last 30 days)</h2>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <KpiCard label="Total revenue" value={revenueFormatted} sub="All completed bookings" />
        <KpiCard label="Average booking" value={
          stats.last30Days.bookings > 0
            ? new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(stats.last30Days.revenue / stats.last30Days.bookings)
            : "—"
        } sub="Per booking" />
      </div>

      {/* Top Tours */}
      {stats.last30Days.topTours.length > 0 && (
        <>
          <h2 className="mt-8 text-xs font-black uppercase tracking-widest text-vg-muted">Top tours (last 30 days)</h2>
          <div className="mt-3 rounded-2xl bg-white border border-vg-border overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-vg-bg-soft border-b border-vg-border">
                <tr>
                  <th className="text-left px-5 py-3 font-bold text-vg-muted">#</th>
                  <th className="text-left px-5 py-3 font-bold text-vg-muted">Tour</th>
                  <th className="text-right px-5 py-3 font-bold text-vg-muted">Bookings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-vg-border">
                {stats.last30Days.topTours.map((t, i) => (
                  <tr key={t.tourId} className="hover:bg-vg-bg-soft transition-colors">
                    <td className="px-5 py-3 text-vg-muted font-bold">{i + 1}</td>
                    <td className="px-5 py-3 text-vg-ink font-semibold">{t.title}</td>
                    <td className="px-5 py-3 text-right font-black text-vg-primary">{t.bookings}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Guide Performance */}
      <h2 className="mt-10 text-xs font-black uppercase tracking-widest text-vg-muted">Guide performance</h2>
      {guides.length === 0 ? (
        <p className="mt-3 text-sm text-vg-muted">No data yet.</p>
      ) : (
        <div className="mt-3 rounded-2xl bg-white border border-vg-border overflow-x-auto shadow-sm">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-vg-bg-soft border-b border-vg-border">
              <tr>
                <th className="text-left px-5 py-3 font-bold text-vg-muted">Guide</th>
                <th className="text-left px-5 py-3 font-bold text-vg-muted">City</th>
                <th className="text-right px-5 py-3 font-bold text-vg-muted">Rating</th>
                <th className="text-right px-5 py-3 font-bold text-vg-muted">Reviews</th>
                <th className="text-right px-5 py-3 font-bold text-vg-muted">Completed</th>
                <th className="text-right px-5 py-3 font-bold text-vg-muted">Earnings (TRY)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-vg-border">
              {guides
                .sort((a, b) => (b.completedBookings ?? 0) - (a.completedBookings ?? 0))
                .map((g) => (
                  <tr key={g.guideUserId} className="hover:bg-vg-bg-soft transition-colors">
                    <td className="px-5 py-3 font-semibold text-vg-ink">{g.fullName}</td>
                    <td className="px-5 py-3 text-vg-muted">{g.city ?? "—"}</td>
                    <td className="px-5 py-3 text-right">
                      {g.rating != null ? (
                        <span className="font-black text-amber-500">★ {g.rating.toFixed(1)}</span>
                      ) : "—"}
                    </td>
                    <td className="px-5 py-3 text-right text-vg-muted">{g.totalReviews}</td>
                    <td className="px-5 py-3 text-right font-bold text-vg-ink">{g.completedBookings} / {g.totalBookings}</td>
                    <td className="px-5 py-3 text-right font-black text-vg-primary">
                      {new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 }).format(g.totalEarnings)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
