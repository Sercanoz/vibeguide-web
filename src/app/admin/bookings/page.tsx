"use client";

import { useEffect, useState } from "react";
import { authedFetch } from "@/lib/admin-api";

type Booking = {
  id: number; tourId: number; touristId: number; guideId: number;
  scheduledAt: string; status: string; price: number; currency: string;
  createdAt: string; tourTitle: string; touristName: string; guideName: string;
};

const STATUS_TABS = ["all","Pending","Paid","Completed","Cancelled","Rejected"];

const STATUS_COLOR: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700",
  Paid: "bg-blue-100 text-blue-700",
  Completed: "bg-emerald-100 text-emerald-700",
  Cancelled: "bg-neutral-100 text-neutral-500",
  Rejected: "bg-red-100 text-red-600",
};

export default function AdminBookingsPage() {
  const [tab, setTab] = useState("all");
  const [rows, setRows] = useState<Booking[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const LIMIT = 50;

  async function load(status: string, off: number) {
    setLoading(true);
    const qs = status === "all" ? "" : `&status=${status}`;
    const r = await authedFetch<{ total: number; rows: Booking[] }>(`/api/admin/bookings?limit=${LIMIT}&offset=${off}${qs}`);
    if (r.ok) { setRows(r.data.rows); setTotal(r.data.total); }
    setLoading(false);
  }

  useEffect(() => { setOffset(0); load(tab, 0); }, [tab]);
  useEffect(() => { load(tab, offset); }, [offset]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-black text-[#0A0A0F] mb-6">Bookings</h1>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {STATUS_TABS.map((s) => (
          <button key={s} onClick={() => setTab(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${tab === s ? "bg-[#6C4CF1] text-white border-[#6C4CF1]" : "bg-white border-black/10 text-neutral-500 hover:border-[#6C4CF1]/40"}`}>
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(8)].map((_, i) => <div key={i} className="h-14 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
      ) : rows.length === 0 ? (
        <div className="text-center py-20 text-neutral-400">No bookings found</div>
      ) : (
        <>
          <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.06] bg-neutral-50">
                  <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide">ID</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide">Tour</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide">Tourist</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide">Guide</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide">Price</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((b) => (
                  <tr key={b.id} className="border-b border-black/[0.04] hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-neutral-400">#{b.id}</td>
                    <td className="px-4 py-3 font-semibold text-[#0A0A0F] max-w-[180px] truncate">{b.tourTitle ?? `Tour #${b.tourId}`}</td>
                    <td className="px-4 py-3 text-neutral-600">{b.touristName ?? `#${b.touristId}`}</td>
                    <td className="px-4 py-3 text-neutral-600">{b.guideName ?? `#${b.guideId}`}</td>
                    <td className="px-4 py-3 text-neutral-500 text-xs">{new Date(b.scheduledAt).toLocaleDateString("en-GB")}</td>
                    <td className="px-4 py-3 font-bold text-[#6C4CF1]">{b.price} {b.currency}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLOR[b.status] ?? "bg-neutral-100 text-neutral-500"}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 text-sm text-neutral-400">
            <p>{total} total · showing {offset + 1}–{Math.min(offset + LIMIT, total)}</p>
            <div className="flex gap-2">
              <button disabled={offset === 0} onClick={() => setOffset(Math.max(0, offset - LIMIT))}
                className="px-4 py-1.5 rounded-xl border border-black/10 font-semibold disabled:opacity-40 hover:border-[#6C4CF1]/40 transition-colors">
                ← Prev
              </button>
              <button disabled={offset + LIMIT >= total} onClick={() => setOffset(offset + LIMIT)}
                className="px-4 py-1.5 rounded-xl border border-black/10 font-semibold disabled:opacity-40 hover:border-[#6C4CF1]/40 transition-colors">
                Next →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
