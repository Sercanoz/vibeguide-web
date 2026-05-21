"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/admin-api";
import TranslationStatusBadges from "@/components/TranslationStatusBadges";

type Row = {
  userId: number;
  fullName: string;
  city: string | null;
  bioPreview: string;
  translations: Record<string, "human" | "machine">;
  supportedLocales: string[];
};

export default function AdminGuides() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const r = await adminApi.listGuides();
      if (cancelled) return;
      if (r.ok) setRows(r.data);
      else setErr(`${r.status}: ${r.error ?? "failed"}`);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (err) {
    return (
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
        <div className="rounded-2xl bg-red-50 border border-red-200 p-5">
          <p className="font-black text-red-700">Failed to load guides</p>
          <p className="mt-1 text-sm text-red-900">{err}</p>
        </div>
      </div>
    );
  }

  if (rows == null) {
    return (
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 text-vg-muted">
        Loading guides…
      </div>
    );
  }

  const visible = filter
    ? rows.filter(
        (r) =>
          r.fullName.toLowerCase().includes(filter.toLowerCase()) ||
          (r.city ?? "").toLowerCase().includes(filter.toLowerCase())
      )
    : rows;

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
      <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-3xl font-black text-vg-ink">Guide bio translations</h1>
          <p className="text-sm text-vg-muted mt-1">
            {rows.length} guides · only guides with a non-empty bio.
          </p>
        </div>
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by name or city…"
          className="bg-white border border-vg-border rounded-xl px-4 py-2.5 text-sm w-72 focus:outline-none focus:border-vg-primary"
        />
      </div>

      <div className="rounded-2xl bg-white border border-vg-border overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-vg-bg-soft border-b border-vg-border">
            <tr className="text-left text-xs font-black uppercase tracking-widest text-vg-muted">
              <th className="px-4 py-3">Guide</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Bio preview</th>
              <th className="px-4 py-3">Translations</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr
                key={r.userId}
                className="border-b border-vg-border last:border-b-0 hover:bg-vg-bg-soft"
              >
                <td className="px-4 py-3 font-bold text-vg-ink">{r.fullName}</td>
                <td className="px-4 py-3 text-vg-muted">{r.city ?? "—"}</td>
                <td className="px-4 py-3 text-vg-muted text-xs max-w-xs truncate">
                  {r.bioPreview}
                </td>
                <td className="px-4 py-3">
                  <TranslationStatusBadges
                    supportedLocales={r.supportedLocales}
                    translations={r.translations}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/guides/${r.userId}`}
                    className="text-xs font-black text-vg-primary hover:underline"
                  >
                    Edit →
                  </Link>
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-vg-muted text-sm">
                  No guides match the filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
