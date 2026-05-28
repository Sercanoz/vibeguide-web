"use client";

import { useEffect, useRef, useState } from "react";
import { adminApi, authedFetch } from "@/lib/admin-api";

type ProcessResult = { processed?: number; totalAmount?: number; ok?: true; guideCount?: number; rows?: PendingRow[] };
type PendingRow = {
  guideId: number; guideName: string; amount: number; currency: string;
  tourCount: number; iban: string | null; ibanAccountName: string | null;
};
type PendingData = { totalAmount: number; guideCount: number; rows: PendingRow[] };

export default function WithdrawalsPage() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [flash, setFlash] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [pending, setPending] = useState<PendingData | null>(null);
  const [loadingPending, setLoadingPending] = useState(true);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showFlash(msg: string, type: "ok" | "err" = "ok") {
    setFlash({ msg, type });
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 8000);
  }

  async function loadPending() {
    setLoadingPending(true);
    const r = await authedFetch<PendingData>("/api/payouts/admin/pending");
    if (r.ok) setPending(r.data);
    setLoadingPending(false);
  }

  useEffect(() => { loadPending(); }, []);

  async function processPayouts() {
    if (!window.confirm("Are you sure you want to process this week's payouts? This action cannot be undone.")) return;
    setProcessing(true);
    setResult(null);
    const res = await adminApi.processWeeklyPayouts();
    if (res.ok) {
      setResult(res.data as ProcessResult);
      showFlash("Payouts processed successfully!", "ok");
      loadPending();
    } else {
      showFlash(res.error ?? "Payout processing failed", "err");
    }
    setProcessing(false);
  }

  function fmt(val: number, currency = "TRY") {
    return new Intl.NumberFormat("tr-TR", { style: "currency", currency, maximumFractionDigits: 0 }).format(val);
  }

  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-2xl font-black text-[#0A0A0F] mb-1">Withdrawals & Payouts</h1>
      <p className="text-sm text-neutral-400 mb-6">Process weekly guide payouts and view pending amounts.</p>

      {flash && (
        <div className={`mb-4 rounded-xl px-4 py-3 text-sm font-semibold border ${flash.type === "ok" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-700"}`}>
          {flash.msg}
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-black/[0.06] p-5 shadow-sm">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Pending amount</p>
          <p className="mt-2 text-3xl font-black text-[#6C4CF1]">
            {loadingPending ? "…" : pending ? fmt(pending.totalAmount) : "—"}
          </p>
          <p className="text-xs text-neutral-400 mt-1">awaiting payout</p>
        </div>
        <div className="bg-white rounded-2xl border border-black/[0.06] p-5 shadow-sm">
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Guides to pay</p>
          <p className="mt-2 text-3xl font-black text-[#0A0A0F]">
            {loadingPending ? "…" : pending?.guideCount ?? "—"}
          </p>
          <p className="text-xs text-neutral-400 mt-1">with pending earnings</p>
        </div>
        <div className="bg-white rounded-2xl border border-black/[0.06] p-5 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold text-neutral-400 uppercase tracking-wide">Action</p>
            <p className="text-sm text-neutral-500 mt-1 leading-5">Mark all completed tours as paid and generate payout summary.</p>
          </div>
          <button onClick={processPayouts} disabled={processing}
            className="mt-4 w-full bg-[#6C4CF1] text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50">
            {processing ? "Processing…" : "Process payouts →"}
          </button>
        </div>
      </div>

      {result && (
        <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
          <p className="font-bold text-emerald-800 mb-3">✓ Payout complete</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {result.guideCount != null && <div><p className="text-xs text-emerald-600">Guides paid</p><p className="text-xl font-black text-emerald-700">{result.guideCount}</p></div>}
            {result.totalAmount != null && <div><p className="text-xs text-emerald-600">Total amount</p><p className="text-xl font-black text-emerald-700">{fmt(result.totalAmount)}</p></div>}
          </div>
        </div>
      )}

      {/* Pending list */}
      <div>
        <h2 className="text-sm font-black text-[#0A0A0F] mb-3">Pending payouts by guide</h2>
        {loadingPending ? (
          <div className="space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
        ) : !pending || pending.rows.length === 0 ? (
          <div className="bg-white rounded-2xl border border-black/[0.06] p-8 text-center text-sm text-neutral-400">No pending payouts</div>
        ) : (
          <div className="bg-white rounded-2xl border border-black/[0.06] overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-black/[0.06] bg-neutral-50">
                  <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide">Guide</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide">Tours</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide hidden md:table-cell">IBAN</th>
                  <th className="text-left px-4 py-3 text-xs font-black text-neutral-400 uppercase tracking-wide hidden md:table-cell">Account name</th>
                </tr>
              </thead>
              <tbody>
                {pending.rows.map((r) => (
                  <tr key={r.guideId} className="border-b border-black/[0.04] hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#0A0A0F]">{r.guideName}</td>
                    <td className="px-4 py-3 text-neutral-500">{r.tourCount}</td>
                    <td className="px-4 py-3 font-black text-[#6C4CF1]">{fmt(r.amount, r.currency)}</td>
                    <td className="px-4 py-3 font-mono text-xs text-neutral-400 hidden md:table-cell">{r.iban ?? "—"}</td>
                    <td className="px-4 py-3 text-neutral-500 hidden md:table-cell">{r.ibanAccountName ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
