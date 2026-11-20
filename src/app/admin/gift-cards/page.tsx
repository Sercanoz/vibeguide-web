"use client";

import { useEffect, useState } from "react";
import { adminApi, type GiftCardRow } from "@/lib/admin-api";

const fmt = (n: number, cur: string) => `${n.toFixed(2)} ${cur}`;

export default function AdminGiftCardsPage() {
  const [rows, setRows] = useState<GiftCardRow[]>([]);
  const [sold, setSold] = useState(0);
  const [outstanding, setOutstanding] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi.listGiftCards(1000).then((r) => {
      if (r.ok) { setRows(r.data.rows); setSold(r.data.sold); setOutstanding(r.data.outstanding); }
      else setError(r.error ?? `HTTP ${r.status}`);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-8 max-w-6xl">
      <h1 className="text-2xl font-display font-normal text-[#0A0A0F]">Gift Cards</h1>
      <p className="text-sm text-neutral-500 mt-1">
        Sold: <strong>{fmt(sold, "TRY")}</strong> · Unused balance (liability): <strong>{fmt(outstanding, "TRY")}</strong>
      </p>

      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
      {loading ? (
        <div className="mt-6 space-y-2">{[...Array(6)].map((_, i) => <div key={i} className="h-12 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
      ) : rows.length === 0 ? (
        <div className="mt-6 bg-white rounded-2xl border border-black/[0.06] p-10 text-center text-sm text-neutral-500">No gift cards sold yet.</div>
      ) : (
        <div className="mt-6 bg-white rounded-2xl border border-black/[0.06] overflow-x-auto shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.06] bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">From → To</th>
                <th className="px-4 py-3">Buyer</th>
                <th className="px-4 py-3">Paid</th>
                <th className="px-4 py-3">Expires</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((g) => (
                <tr key={g.id} className="border-b border-black/[0.04]">
                  <td className="px-4 py-3 font-mono text-xs text-[#5B3FD9]">{g.code ?? "—"}</td>
                  <td className="px-4 py-3">{fmt(g.amount, g.currency)}</td>
                  <td className="px-4 py-3 font-semibold">{fmt(g.balance, g.currency)}</td>
                  <td className="px-4 py-3">{g.status}{g.refundStatus ? ` · ${g.refundStatus}` : ""}</td>
                  <td className="px-4 py-3">{g.senderName} → {g.recipientName}<br /><span className="text-xs text-neutral-500">{g.recipientEmail}</span></td>
                  <td className="px-4 py-3 text-xs text-neutral-600">{g.purchaserEmail ?? "—"}</td>
                  <td className="px-4 py-3 text-xs text-neutral-600">{g.paidAt ? new Date(g.paidAt).toLocaleDateString("en-GB") : "—"}</td>
                  <td className="px-4 py-3 text-xs text-neutral-600">{g.expiresAt ? new Date(g.expiresAt).toLocaleDateString("en-GB") : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
