"use client";

import { useEffect, useState } from "react";
import { adminApi, type DeadLetterItem } from "@/lib/admin-api";
import Link from "next/link";

function fmt(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-GB");
}

export default function NotificationsPage() {
  const [items, setItems] = useState<DeadLetterItem[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);

  const load = async () => {
    setLoading(true);
    const r = await adminApi.listDeadLetters(200);
    setLoading(false);
    if (r.ok) {
      setItems(r.data.items);
      setCount(r.data.count);
    } else {
      setError(r.error ?? "Failed to load");
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: number) => {
    setDeleting(id);
    const r = await adminApi.deleteDeadLetter(id);
    setDeleting(null);
    if (r.ok) {
      setItems((prev) => prev.filter((x) => x.id !== id));
      setCount((c) => c - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
      <div className="flex items-center justify-between mb-2">
        <div>
          <Link href="/admin" className="text-sm text-vg-muted hover:text-vg-ink">← Admin</Link>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-vg-ink">Dead-letter Notifications</h1>
          <p className="mt-1 text-vg-muted text-sm">
            Notifications that failed FCM delivery after 3 attempts.
          </p>
        </div>
        {!loading && (
          <span className={`text-2xl font-black ${count > 0 ? "text-red-600" : "text-green-600"}`}>
            {count}
          </span>
        )}
      </div>

      {loading && (
        <div className="mt-10 text-center text-vg-muted animate-pulse">Loading…</div>
      )}

      {error && (
        <div className="mt-6 rounded-2xl bg-red-50 border border-red-200 p-4 text-red-700 font-medium">
          {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="mt-16 text-center">
          <div className="text-5xl mb-3">✅</div>
          <p className="text-vg-muted font-medium">Dead-letter queue is clean.</p>
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-white border border-vg-border p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-black uppercase tracking-widest text-red-500">
                      dead_letter
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 font-bold">
                      {item.type || "unknown"}
                    </span>
                    <span className="text-xs text-vg-muted">
                      userId: <span className="font-bold text-vg-ink">{item.userId}</span>
                    </span>
                    <span className="text-xs text-vg-muted">
                      {fmt(item.createdAtUtc)}
                    </span>
                    <span className="text-xs text-vg-muted">
                      retry: <span className="font-bold">{item.retryCount}</span>
                    </span>
                  </div>
                  <p className="font-bold text-vg-ink truncate">{item.title}</p>
                  <p className="text-sm text-vg-muted mt-0.5 truncate">{item.body}</p>
                  {item.lastError && (
                    <p className="mt-1.5 text-xs text-red-600 bg-red-50 rounded-lg px-3 py-1.5 font-mono break-all">
                      {item.lastError}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deleting === item.id}
                  className="shrink-0 text-xs font-bold text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-colors disabled:opacity-50"
                >
                  {deleting === item.id ? "…" : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
