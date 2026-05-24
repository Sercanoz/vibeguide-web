"use client";

import { useEffect, useRef, useState } from "react";
import { adminApi, type BookingDispute, type PoolDispute } from "@/lib/admin-api";

type Resolution = "refund_tourist" | "uphold_guide" | "dismiss";

const RESOLUTION_LABELS: Record<Resolution, string> = {
  refund_tourist: "İade et",
  uphold_guide: "Rehberi onayla",
  dismiss: "Reddet",
};

const RESOLUTION_STYLES: Record<Resolution, string> = {
  refund_tourist: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  uphold_guide: "bg-green-50 text-green-700 border-green-200 hover:bg-green-100",
  dismiss: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
};

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "disputed" || status === "no_show" ? "bg-amber-100 text-amber-700" :
    status === "resolved" || status === "refunded" ? "bg-green-100 text-green-700" :
    "bg-gray-100 text-gray-600";
  return <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>{status}</span>;
}

function fmt(val: number | null | undefined, currency = "TRY") {
  if (val == null) return "—";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency, maximumFractionDigits: 0 }).format(val);
}

function NoShowFlags({ guideAt, touristAt }: { guideAt: string | null; touristAt: string | null }) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-1.5">
      {guideAt && (
        <span className="text-xs bg-orange-50 border border-orange-200 text-orange-700 rounded-lg px-2 py-0.5 font-semibold">
          Rehber: turist no-show işaretledi
        </span>
      )}
      {touristAt && (
        <span className="text-xs bg-purple-50 border border-purple-200 text-purple-700 rounded-lg px-2 py-0.5 font-semibold">
          Turist: rehber no-show bildirdi
        </span>
      )}
    </div>
  );
}

export default function DisputesPage() {
  const [bookingDisputes, setBookingDisputes] = useState<BookingDispute[]>([]);
  const [poolDisputes, setPoolDisputes] = useState<PoolDispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [resolving, setResolving] = useState<string | null>(null);
  const [tab, setTab] = useState<"booking" | "pool">("booking");
  const [flash, setFlash] = useState<string | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showFlash(msg: string) {
    setFlash(msg);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 4000);
  }

  useEffect(() => {
    Promise.all([adminApi.listBookingDisputes(), adminApi.listPoolDisputes()])
      .then(([bRes, pRes]) => {
        if (!bRes.ok) { setError(bRes.error ?? "Uyuşmazlıklar yüklenemedi"); setLoading(false); return; }
        if (!pRes.ok) { setError(pRes.error ?? "Havuz uyuşmazlıkları yüklenemedi"); setLoading(false); return; }
        setBookingDisputes(bRes.data.disputes);
        setPoolDisputes(pRes.data.disputes);
        setLoading(false);
      })
      .catch((e: unknown) => {
        setError("Veri yüklenemedi: " + (e instanceof Error ? e.message : String(e)));
        setLoading(false);
      });
  }, []);

  async function resolveBooking(id: number, resolution: Resolution) {
    setResolving(`booking-${id}`);
    const res = await adminApi.resolveBookingDispute(id, resolution);
    if (res.ok) {
      setBookingDisputes((prev) => prev.filter((d) => d.bookingId !== id));
    } else {
      showFlash(res.error ?? "Çözüm uygulanamadı");
    }
    setResolving(null);
  }

  async function resolvePool(id: number, resolution: Resolution) {
    setResolving(`pool-${id}`);
    const res = await adminApi.resolvePoolDispute(id, resolution);
    if (res.ok) {
      setPoolDisputes((prev) => prev.filter((d) => d.participantId !== id));
    } else {
      showFlash(res.error ?? "Çözüm uygulanamadı");
    }
    setResolving(null);
  }

  if (loading) return <div className="flex justify-center items-center h-64 text-vg-muted text-sm">Yükleniyor…</div>;
  if (error) return <div className="max-w-4xl mx-auto px-5 py-12 text-red-600 font-semibold">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="text-2xl font-black tracking-tight text-vg-ink">Uyuşmazlıklar</h1>
      <p className="mt-1 text-sm text-vg-muted">VibeNow rezervasyon ve tur havuzu anlaşmazlıklarını çöz.</p>
      {flash && (
        <div className="mt-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-800 font-semibold">
          {flash}
        </div>
      )}

      {/* Tabs */}
      <div className="mt-6 flex gap-2">
        {(["booking", "pool"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
              tab === t
                ? "bg-vg-primary text-white border-vg-primary"
                : "bg-white text-vg-muted border-vg-border hover:border-vg-primary hover:text-vg-primary"
            }`}
          >
            {t === "booking" ? "VibeNow" : "Havuz"}{" "}
            <span className="ml-1 font-black">
              ({t === "booking" ? bookingDisputes.length : poolDisputes.length})
            </span>
          </button>
        ))}
      </div>

      {tab === "booking" && (
        bookingDisputes.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white border border-vg-border p-10 text-center text-vg-muted text-sm shadow-sm">
            Bekleyen uyuşmazlık yok ✓
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {bookingDisputes.map((d) => (
              <div key={d.bookingId} className="rounded-2xl bg-white border border-vg-border p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-vg-ink text-sm">{d.tourTitle}</span>
                      <span className="text-xs text-vg-muted">#{d.bookingId}</span>
                      <StatusBadge status={String(d.status)} />
                    </div>
                    <p className="mt-0.5 text-xs text-vg-muted">
                      {d.touristName} → {d.guideName} · {fmt(d.price, d.currency ?? "TRY")} ·{" "}
                      {new Date(d.scheduledAt).toLocaleDateString("tr-TR")}
                    </p>
                    <NoShowFlags guideAt={d.guideMarkedNoShowAt} touristAt={d.touristReportedGuideNoShowAt} />
                    {d.cancelReason && (
                      <p className="mt-2 text-sm text-vg-ink bg-vg-bg-soft rounded-xl px-3 py-2">{d.cancelReason}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {(["refund_tourist", "uphold_guide", "dismiss"] as Resolution[]).map((r) => (
                      <button
                        key={r}
                        disabled={resolving === `booking-${d.bookingId}`}
                        onClick={() => resolveBooking(d.bookingId, r)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors disabled:opacity-50 ${RESOLUTION_STYLES[r]}`}
                      >
                        {RESOLUTION_LABELS[r]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {tab === "pool" && (
        poolDisputes.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white border border-vg-border p-10 text-center text-vg-muted text-sm shadow-sm">
            Bekleyen uyuşmazlık yok ✓
          </div>
        ) : (
          <div className="mt-5 space-y-4">
            {poolDisputes.map((d) => (
              <div key={d.participantId} className="rounded-2xl bg-white border border-vg-border p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-vg-ink text-sm">{d.tourTitle}</span>
                      <span className="text-xs text-vg-muted">katılımcı #{d.participantId}</span>
                      <StatusBadge status={String(d.status)} />
                    </div>
                    <p className="mt-0.5 text-xs text-vg-muted">
                      {d.touristName} · rehber: {d.guideName} ·{" "}
                      {fmt(d.holdAmount)} tutulan · {new Date(d.scheduledAt).toLocaleDateString("tr-TR")}
                    </p>
                    <NoShowFlags guideAt={d.guideMarkedNoShowAt} touristAt={d.touristReportedGuideNoShowAt} />
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {(["refund_tourist", "uphold_guide", "dismiss"] as Resolution[]).map((r) => (
                      <button
                        key={r}
                        disabled={resolving === `pool-${d.participantId}`}
                        onClick={() => resolvePool(d.participantId, r)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors disabled:opacity-50 ${RESOLUTION_STYLES[r]}`}
                      >
                        {RESOLUTION_LABELS[r]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
