"use client";

import { useEffect, useRef, useState } from "react";
import { adminApi, type AdminPool } from "@/lib/admin-api";

type StatusFilter = "open" | "locked" | "completed" | "cancelled";

const STATUS_COLORS: Record<string, string> = {
  open: "bg-green-100 text-green-700",
  locked: "bg-blue-100 text-blue-700",
  completed: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-700",
};

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_COLORS[status.toLowerCase()] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${cls}`}>
      {status}
    </span>
  );
}

export default function PoolsPage() {
  const [pools, setPools] = useState<AdminPool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<StatusFilter>("open");
  const [actioning, setActioning] = useState<string | null>(null);
  const [flash, setFlash] = useState<{ msg: string; ok: boolean } | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showFlash(msg: string, ok = true) {
    setFlash({ msg, ok });
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 4000);
  }

  async function load(status: StatusFilter) {
    setLoading(true);
    const res = await adminApi.listAdminPools(status);
    if (!res.ok) {
      setError(res.error ?? "Havuzlar yüklenemedi");
    } else {
      setPools(res.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    load(tab);
  }, [tab]);

  async function handleCancel(id: number) {
    const reason = prompt("İptal sebebini girin:");
    if (!reason || !reason.trim()) return;
    setActioning(`cancel-${id}`);
    const res = await adminApi.cancelPool(id, reason.trim());
    if (res.ok) {
      setPools((prev) => prev.filter((p) => p.id !== id));
      showFlash("Havuz iptal edildi.");
    } else {
      showFlash(res.error ?? "İptal başarısız", false);
    }
    setActioning(null);
  }

  async function handleLock(id: number) {
    setActioning(`lock-${id}`);
    const res = await adminApi.lockPool(id);
    if (res.ok) {
      setPools((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: "locked" } : p))
      );
      showFlash("Havuz kilitlendi.");
    } else {
      showFlash(res.error ?? "Kilitleme başarısız", false);
    }
    setActioning(null);
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="text-2xl font-black tracking-tight text-vg-ink">Havuz Yönetimi</h1>
      <p className="mt-1 text-sm text-vg-muted">Tur havuzlarını yönet, kilitle veya iptal et.</p>

      {flash && (
        <div
          className={`mt-3 rounded-xl px-4 py-3 text-sm font-semibold border ${
            flash.ok
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {flash.msg}
        </div>
      )}

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {(["open", "locked", "completed", "cancelled"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
              tab === t
                ? "bg-vg-primary text-white border-vg-primary"
                : "bg-white text-vg-muted border-vg-border hover:border-vg-primary hover:text-vg-primary"
            }`}
          >
            {t === "open"
              ? "Açık"
              : t === "locked"
              ? "Kilitli"
              : t === "completed"
              ? "Tamamlandı"
              : "İptal"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48 text-vg-muted text-sm">Yükleniyor…</div>
      ) : error ? (
        <div className="mt-8 text-red-600 font-semibold">{error}</div>
      ) : pools.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white border border-vg-border p-10 text-center text-vg-muted text-sm shadow-sm">
          Bu durumda havuz yok.
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {pools.map((p) => {
            const isActioning = actioning?.endsWith(`-${p.id}`);
            return (
              <div key={p.id} className="rounded-2xl bg-white border border-vg-border p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-vg-ink text-sm">{p.tourTitle}</span>
                      <span className="text-xs text-vg-muted">#{p.id}</span>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="mt-1 text-xs text-vg-muted">
                      {new Date(p.scheduledAt).toLocaleString("tr-TR")}
                      {" · "}
                      <span className="font-bold text-vg-ink">
                        {p.participantCount} / {p.capacity}
                      </span>{" "}
                      katılımcı
                      {p.guideName && (
                        <>
                          {" · "}Rehber: <span className="font-semibold text-vg-ink">{p.guideName}</span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    {p.status.toLowerCase() === "open" && (
                      <button
                        disabled={isActioning}
                        onClick={() => handleLock(p.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors disabled:opacity-50"
                      >
                        Kilitle
                      </button>
                    )}
                    {(p.status.toLowerCase() === "open" || p.status.toLowerCase() === "locked") && (
                      <button
                        disabled={isActioning}
                        onClick={() => handleCancel(p.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        İptal Et
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
