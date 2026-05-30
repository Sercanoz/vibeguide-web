"use client";

import { useEffect, useState } from "react";
import { adminApi, type SubscriberRow } from "@/lib/admin-api";

export default function AdminSubscribersPage() {
  const [rows, setRows] = useState<SubscriberRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  async function load() {
    const r = await adminApi.listSubscribers(1000);
    if (r.ok) { setRows(r.data.rows); setTotal(r.data.total); }
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function del(id: number) {
    if (!confirm("Remove this subscriber?")) return;
    await adminApi.deleteSubscriber(id);
    load();
  }

  function exportCsv() {
    const header = "email,promo_code,source,locale,created_at\n";
    const body = rows.map((r) =>
      `${r.email},${r.promoCode ?? ""},${r.source ?? ""},${r.locale ?? ""},${r.createdAt}`
    ).join("\n");
    const blob = new Blob([header + body], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vibeguide-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#0A0A0F]">Email Subscribers</h1>
          <p className="text-sm text-neutral-400 mt-1">Leads captured via the homepage discount popup. {total} total.</p>
        </div>
        {rows.length > 0 && (
          <button onClick={exportCsv}
            className="shrink-0 border border-black/10 text-[#0A0A0F] font-bold px-5 py-2.5 rounded-2xl text-sm hover:border-[#6C4CF1] transition-colors">
            ⬇ Export CSV
          </button>
        )}
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
      ) : rows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/[0.06] p-10 text-center text-sm text-neutral-400">
          No subscribers yet. They&apos;ll appear here when visitors claim their discount.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.06] bg-neutral-50">
                <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide">Email</th>
                <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide">Code</th>
                <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide hidden sm:table-cell">Source</th>
                <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide hidden md:table-cell">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-b border-black/[0.04] hover:bg-neutral-50 transition-colors">
                  <td className="px-4 py-3 font-semibold text-[#0A0A0F]">{s.email}</td>
                  <td className="px-4 py-3 font-mono text-xs text-[#6C4CF1]">{s.promoCode ?? "—"}</td>
                  <td className="px-4 py-3 text-neutral-400 text-xs hidden sm:table-cell">{s.source ?? "—"}</td>
                  <td className="px-4 py-3 text-neutral-400 text-xs hidden md:table-cell">{new Date(s.createdAt).toLocaleDateString("en-GB")}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => del(s.id)} className="text-red-300 hover:text-red-500 text-xs font-bold">✕</button>
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
