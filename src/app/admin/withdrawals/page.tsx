"use client";

import { useRef, useState } from "react";
import { adminApi } from "@/lib/admin-api";

type ProcessResult = { processed?: number; totalAmount?: number; ok?: true };

export default function WithdrawalsPage() {
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [flash, setFlash] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showFlash(msg: string, type: "ok" | "err" = "ok") {
    setFlash({ msg, type });
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 8000);
  }

  async function processPayouts() {
    if (!window.confirm("Are you sure you want to process this week's payouts? This action cannot be undone.")) return;
    setProcessing(true);
    setResult(null);
    const res = await adminApi.processWeeklyPayouts();
    if (res.ok) {
      setResult(res.data as ProcessResult);
      showFlash("Payouts processed successfully!", "ok");
    } else {
      showFlash(res.error ?? "Payout processing failed", "err");
    }
    setProcessing(false);
  }

  function fmt(val: number, currency = "TRY") {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(val);
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="text-2xl font-black tracking-tight text-vg-ink">Withdrawal Requests</h1>
      <p className="mt-1 text-sm text-vg-muted">Process weekly payouts for guides.</p>

      {flash && (
        <div className={`mt-3 rounded-xl px-4 py-3 text-sm font-semibold border ${
          flash.type === "ok"
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {flash.msg}
        </div>
      )}

      {/* Process Payouts Card */}
      <div className="mt-8 rounded-2xl bg-white border border-vg-border p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-vg-primary/10 flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-vg-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-black text-vg-ink">Process Weekly Payouts</h2>
            <p className="mt-1 text-sm text-vg-muted">
              Batch-processes guide earnings for all tours completed this week.
              Payouts are initiated for guides with a verified IBAN.
            </p>
            <button
              onClick={processPayouts}
              disabled={processing}
              className="mt-4 px-6 py-3 rounded-xl font-bold text-white bg-vg-primary hover:bg-vg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {processing ? "Processing…" : "Start Weekly Payouts"}
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">
            <p className="text-sm font-bold text-green-800">Payout processing complete</p>
            <div className="mt-2 flex flex-wrap gap-4">
              {result.processed != null && (
                <div>
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">Processed</p>
                  <p className="text-2xl font-black text-green-700">{result.processed}</p>
                  <p className="text-xs text-green-600">payouts</p>
                </div>
              )}
              {result.totalAmount != null && (
                <div>
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">Total</p>
                  <p className="text-2xl font-black text-green-700">{fmt(result.totalAmount)}</p>
                  <p className="text-xs text-green-600">transferred</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Coming Soon Card */}
      <div className="mt-6 rounded-2xl bg-white border border-vg-border border-dashed p-8 shadow-sm">
        <div className="text-center">
          <p className="text-sm font-bold text-vg-muted">Withdrawal request list coming soon</p>
          <p className="mt-1 text-xs text-vg-muted">
            The backend endpoint for listing individual withdrawal requests does not exist yet.
            Once added, they will be listed here.
          </p>
        </div>
      </div>
    </div>
  );
}
