"use client";

import { useEffect, useState } from "react";
import { adminApi } from "@/lib/admin-api";

type Stats = Awaited<ReturnType<typeof adminApi.getStats>> extends { ok: true; data: infer D } ? D : never;
type GuidePerf = Awaited<ReturnType<typeof adminApi.listGuidePerformance>> extends { ok: true; data: infer D } ? D : never;

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
  const [stats, setStats] = useState<Stats | null>(null);
  const [guides, setGuides] = useState<GuidePerf | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([adminApi.getStats(), adminApi.listGuidePerformance()])
      .then(([statsRes, guidesRes]) => {
        if (!statsRes.ok) { setError(statsRes.error ?? "Stats yüklenemedi"); setLoading(false); return; }
        if (!guidesRes.ok) { setError(guidesRes.error ?? "Rehber verileri yüklenemedi"); setLoading(false); return; }
        setStats(statsRes.data);
        setGuides(guidesRes.data);
        setLoading(false);
      })
      .catch((e: unknown) => {
        setError("Veri yüklenemedi: " + (e instanceof Error ? e.message : String(e)));
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64 text-vg-muted text-sm">Yükleniyor…</div>;
  if (error) return <div className="max-w-4xl mx-auto px-5 py-12 text-red-600 font-semibold">{error}</div>;
  if (!stats || !guides) return null;

  const revenueFormatted = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(stats.last30Days.revenue);

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="text-2xl font-black tracking-tight text-vg-ink">Analytics</h1>
      <p className="mt-1 text-sm text-vg-muted">Platform genel durum ve performans istatistikleri.</p>

      {/* User KPIs */}
      <h2 className="mt-8 text-xs font-black uppercase tracking-widest text-vg-muted">Kullanıcılar</h2>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard label="Turistler" value={stats.users.tourist} />
        <KpiCard label="Rehberler" value={stats.users.guide} />
        <KpiCard label="Onay bekleyen" value={stats.users.pendingGuide} />
        <KpiCard label="Admin" value={stats.users.admin} />
      </div>

      {/* Content KPIs */}
      <h2 className="mt-8 text-xs font-black uppercase tracking-widest text-vg-muted">İçerik</h2>
      <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
        <KpiCard label="Toplam tur" value={stats.tours.total} />
        <KpiCard label="Aktif tur" value={stats.tours.active} />
        <KpiCard label="Açık havuz" value={stats.pools.open} />
        <KpiCard label="Son 30 gün rezervasyon" value={stats.last30Days.bookings} />
      </div>

      {/* Revenue */}
      <h2 className="mt-8 text-xs font-black uppercase tracking-widest text-vg-muted">Gelir (son 30 gün)</h2>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <KpiCard label="Toplam gelir" value={revenueFormatted} sub="Tüm tamamlanan rezervasyonlar" />
        <KpiCard label="Ortalama rezervasyon" value={
          stats.last30Days.bookings > 0
            ? new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(stats.last30Days.revenue / stats.last30Days.bookings)
            : "—"
        } sub="Rezervasyon başına" />
      </div>

      {/* Top Tours */}
      {stats.last30Days.topTours.length > 0 && (
        <>
          <h2 className="mt-8 text-xs font-black uppercase tracking-widest text-vg-muted">En popüler turlar (son 30 gün)</h2>
          <div className="mt-3 rounded-2xl bg-white border border-vg-border overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-vg-bg-soft border-b border-vg-border">
                <tr>
                  <th className="text-left px-5 py-3 font-bold text-vg-muted">#</th>
                  <th className="text-left px-5 py-3 font-bold text-vg-muted">Tur</th>
                  <th className="text-right px-5 py-3 font-bold text-vg-muted">Rezervasyon</th>
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
      <h2 className="mt-10 text-xs font-black uppercase tracking-widest text-vg-muted">Rehber performansı</h2>
      {guides.length === 0 ? (
        <p className="mt-3 text-sm text-vg-muted">Henüz veri yok.</p>
      ) : (
        <div className="mt-3 rounded-2xl bg-white border border-vg-border overflow-x-auto shadow-sm">
          <table className="w-full text-sm min-w-[640px]">
            <thead className="bg-vg-bg-soft border-b border-vg-border">
              <tr>
                <th className="text-left px-5 py-3 font-bold text-vg-muted">Rehber</th>
                <th className="text-left px-5 py-3 font-bold text-vg-muted">Şehir</th>
                <th className="text-right px-5 py-3 font-bold text-vg-muted">Puan</th>
                <th className="text-right px-5 py-3 font-bold text-vg-muted">Yorum</th>
                <th className="text-right px-5 py-3 font-bold text-vg-muted">Tamamlanan</th>
                <th className="text-right px-5 py-3 font-bold text-vg-muted">Kazanç (TRY)</th>
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
