"use client";

import { useEffect, useRef, useState } from "react";
import { adminApi, type ModerationReport } from "@/lib/admin-api";

type StatusFilter = "pending" | "resolved";
type ActionType = "dismiss" | "warn" | "ban";

const ACTION_LABELS: Record<ActionType, string> = {
  dismiss: "Kapat",
  warn: "Uyar",
  ban: "Yasakla",
};

const ACTION_STYLES: Record<ActionType, string> = {
  dismiss: "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100",
  warn: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  ban: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
};

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "pending"
      ? "bg-amber-100 text-amber-700"
      : status === "resolved"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>
      {status}
    </span>
  );
}

export default function ReportsPage() {
  const [reports, setReports] = useState<ModerationReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<StatusFilter>("pending");
  const [actioning, setActioning] = useState<number | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [noteMap, setNoteMap] = useState<Record<number, string>>({});
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showFlash(msg: string) {
    setFlash(msg);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 4000);
  }

  async function load(status: StatusFilter) {
    setLoading(true);
    const res = await adminApi.listReports(status);
    if (!res.ok) {
      setError(res.error ?? "Raporlar yüklenemedi");
    } else {
      setReports(res.data);
    }
    setLoading(false);
  }

  useEffect(() => {
    load(tab);
  }, [tab]);

  async function handleAction(id: number, action: ActionType) {
    setActioning(id);
    const note = noteMap[id];
    const res = await adminApi.actionReport(id, action, note || undefined);
    if (res.ok) {
      setReports((prev) => prev.filter((r) => r.id !== id));
      showFlash(`Rapor ${ACTION_LABELS[action]} olarak işlendi.`);
    } else {
      showFlash(res.error ?? "İşlem başarısız");
    }
    setActioning(null);
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="text-2xl font-black tracking-tight text-vg-ink">Moderasyon Raporları</h1>
      <p className="mt-1 text-sm text-vg-muted">Kullanıcı şikayetlerini incele ve işlem uygula.</p>

      {flash && (
        <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800 font-semibold">
          {flash}
        </div>
      )}

      {/* Tabs */}
      <div className="mt-6 flex gap-2">
        {(["pending", "resolved"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
              tab === t
                ? "bg-vg-primary text-white border-vg-primary"
                : "bg-white text-vg-muted border-vg-border hover:border-vg-primary hover:text-vg-primary"
            }`}
          >
            {t === "pending" ? "Bekleyen" : "Çözümlenen"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48 text-vg-muted text-sm">Yükleniyor…</div>
      ) : error ? (
        <div className="mt-8 text-red-600 font-semibold">{error}</div>
      ) : reports.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white border border-vg-border p-10 text-center text-vg-muted text-sm shadow-sm">
          {tab === "pending" ? "Bekleyen rapor yok ✓" : "Çözümlenen rapor yok"}
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {reports.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white border border-vg-border p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-vg-ink text-sm">Rapor #{r.id}</span>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="mt-1 text-xs text-vg-muted">
                    Şikayet eden: <span className="font-bold text-vg-ink">#{r.reporterId}</span>
                    {" · "}Şikayet edilen: <span className="font-bold text-vg-ink">#{r.reportedUserId}</span>
                    {" · "}{new Date(r.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-vg-ink">{r.reason}</p>
                  {r.details && (
                    <p className="mt-1 text-sm text-vg-muted bg-vg-bg-soft rounded-xl px-3 py-2">{r.details}</p>
                  )}
                  {tab === "pending" && (
                    <input
                      type="text"
                      placeholder="Not ekle (opsiyonel)"
                      value={noteMap[r.id] ?? ""}
                      onChange={(e) => setNoteMap((prev) => ({ ...prev, [r.id]: e.target.value }))}
                      className="mt-2 w-full max-w-sm text-xs border border-vg-border rounded-lg px-3 py-1.5 focus:outline-none focus:border-vg-primary"
                    />
                  )}
                </div>
                {tab === "pending" && (
                  <div className="flex flex-wrap gap-2 shrink-0">
                    {(["dismiss", "warn", "ban"] as ActionType[]).map((action) => (
                      <button
                        key={action}
                        disabled={actioning === r.id}
                        onClick={() => handleAction(r.id, action)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors disabled:opacity-50 ${ACTION_STYLES[action]}`}
                      >
                        {ACTION_LABELS[action]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
