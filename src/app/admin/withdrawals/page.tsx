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
    if (!window.confirm("Bu haftanın ödemelerini işlemek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) return;
    setProcessing(true);
    setResult(null);
    const res = await adminApi.processWeeklyPayouts();
    if (res.ok) {
      setResult(res.data as ProcessResult);
      showFlash("Ödemeler başarıyla işlendi!", "ok");
    } else {
      showFlash(res.error ?? "Ödeme işlemi başarısız", "err");
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
      <h1 className="text-2xl font-black tracking-tight text-vg-ink">Para Çekme Talepleri</h1>
      <p className="mt-1 text-sm text-vg-muted">Rehberlere ait haftalık ödemeleri işle.</p>

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
            <h2 className="text-lg font-black text-vg-ink">Haftalık Ödemeleri İşle</h2>
            <p className="mt-1 text-sm text-vg-muted">
              Bu hafta tamamlanan tüm turlara ait rehber kazançlarını toplu olarak işler.
              IBAN&apos;ı onaylı rehberlere ödeme başlatılır.
            </p>
            <button
              onClick={processPayouts}
              disabled={processing}
              className="mt-4 px-6 py-3 rounded-xl font-bold text-white bg-vg-primary hover:bg-vg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {processing ? "İşleniyor…" : "Haftalık Ödemeleri Başlat"}
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">
            <p className="text-sm font-bold text-green-800">Ödeme işlemi tamamlandı</p>
            <div className="mt-2 flex flex-wrap gap-4">
              {result.processed != null && (
                <div>
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">İşlenen</p>
                  <p className="text-2xl font-black text-green-700">{result.processed}</p>
                  <p className="text-xs text-green-600">ödeme</p>
                </div>
              )}
              {result.totalAmount != null && (
                <div>
                  <p className="text-xs text-green-600 font-semibold uppercase tracking-wide">Toplam</p>
                  <p className="text-2xl font-black text-green-700">{fmt(result.totalAmount)}</p>
                  <p className="text-xs text-green-600">aktarıldı</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Coming Soon Card */}
      <div className="mt-6 rounded-2xl bg-white border border-vg-border border-dashed p-8 shadow-sm">
        <div className="text-center">
          <p className="text-sm font-bold text-vg-muted">Para çekme talep listesi yakında geliyor</p>
          <p className="mt-1 text-xs text-vg-muted">
            Bireysel para çekme taleplerini listeleme endpoint&apos;i backend&apos;de henüz mevcut değil.
            Eklendiğinde buraya listelenecek.
          </p>
        </div>
      </div>
    </div>
  );
}
