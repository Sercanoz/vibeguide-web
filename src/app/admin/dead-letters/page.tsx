"use client";

import { useEffect, useRef, useState } from "react";
import { adminApi, type DeadLetterItem } from "@/lib/admin-api";

export default function DeadLettersPage() {
  const [items, setItems] = useState<DeadLetterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actioning, setActioning] = useState<string | null>(null);
  const [flash, setFlash] = useState<{ msg: string; ok: boolean } | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showFlash(msg: string, ok = true) {
    setFlash({ msg, ok });
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 4000);
  }

  async function load() {
    setLoading(true);
    const res = await adminApi.listDeadLettersV2(50, 0);
    if (!res.ok) {
      setError(res.error ?? "Yüklenemedi");
    } else {
      setItems(res.data.items);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleRetry(id: number) {
    setActioning(`retry-${id}`);
    const res = await adminApi.retryDeadLetter(id);
    if (res.ok) {
      showFlash("Bildirim yeniden gönderildi.");
      setItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      showFlash(res.error ?? "Yeniden gönderim başarısız", false);
    }
    setActioning(null);
  }

  async function handleDelete(id: number) {
    setActioning(`delete-${id}`);
    const res = await adminApi.deleteDeadLetterV2(id);
    if (res.ok) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      showFlash("Silindi.");
    } else {
      showFlash(res.error ?? "Silme başarısız", false);
    }
    setActioning(null);
  }

  async function handleRetryAll() {
    setActioning("retry-all");
    const ids = items.map((i) => i.id);
    let success = 0;
    for (const id of ids) {
      const res = await adminApi.retryDeadLetter(id);
      if (res.ok) {
        success++;
        setItems((prev) => prev.filter((i) => i.id !== id));
      }
    }
    showFlash(`${success} / ${ids.length} bildirim yeniden gönderildi.`, success > 0);
    setActioning(null);
  }

  if (loading)
    return <div className="flex justify-center items-center h-64 text-vg-muted text-sm">Yükleniyor…</div>;
  if (error)
    return <div className="max-w-4xl mx-auto px-5 py-12 text-red-600 font-semibold">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-vg-ink">Başarısız Bildirimler</h1>
          <p className="mt-1 text-sm text-vg-muted">
            Gönderilememiş bildirimler — toplam {items.length} kayıt.
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={handleRetryAll}
            disabled={actioning === "retry-all"}
            className="px-4 py-2 rounded-xl text-sm font-bold bg-vg-primary text-white hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Tümünü Yeniden Gönder
          </button>
        )}
      </div>

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

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white border border-vg-border p-10 text-center text-vg-muted text-sm shadow-sm">
          Başarısız bildirim yok ✓
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {items.map((item) => (
            <div key={item.id} className="rounded-2xl bg-white border border-vg-border p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-vg-ink text-sm">{item.title}</span>
                    <span className="text-xs text-vg-muted">#{item.id}</span>
                    {item.retryCount > 0 && (
                      <span className="text-xs bg-amber-50 border border-amber-200 text-amber-700 rounded-full px-2 py-0.5 font-bold">
                        {item.retryCount}x denendi
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-vg-muted">{item.body}</p>
                  <p className="mt-0.5 text-xs text-vg-muted">
                    Kullanıcı #{item.userId} · {new Date(item.createdAtUtc).toLocaleString("tr-TR")}
                  </p>
                  {item.lastError && (
                    <p className="mt-1.5 text-xs bg-red-50 border border-red-100 text-red-700 rounded-lg px-3 py-1.5 font-mono break-all">
                      {item.lastError}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    disabled={!!actioning}
                    onClick={() => handleRetry(item.id)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold border border-vg-primary bg-white text-vg-primary hover:bg-vg-primary hover:text-white transition-colors disabled:opacity-50"
                  >
                    Yeniden Gönder
                  </button>
                  <button
                    disabled={!!actioning}
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
