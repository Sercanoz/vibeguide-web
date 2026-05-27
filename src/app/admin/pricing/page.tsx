"use client";

import { useEffect, useRef, useState } from "react";
import { adminApi, type LanguagePricing } from "@/lib/admin-api";

type RowEdit = {
  displayName: string;
  multiplier: string;
  isRare: boolean;
  isActive: boolean;
};

export default function PricingPage() {
  const [rows, setRows] = useState<LanguagePricing[]>([]);
  const [edits, setEdits] = useState<Record<string, RowEdit>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [flash, setFlash] = useState<{ msg: string; ok: boolean } | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showFlash(msg: string, ok = true) {
    setFlash({ msg, ok });
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 4000);
  }

  useEffect(() => {
    adminApi.listLanguagePricing().then((res) => {
      if (!res.ok) {
        setError(res.error ?? "Failed to load");
      } else {
        setRows(res.data);
        const initEdits: Record<string, RowEdit> = {};
        res.data.forEach((r) => {
          initEdits[r.code] = {
            displayName: r.displayName,
            multiplier: String(r.multiplier),
            isRare: r.isRare,
            isActive: r.isActive,
          };
        });
        setEdits(initEdits);
      }
      setLoading(false);
    });
  }, []);

  function patchEdit(code: string, patch: Partial<RowEdit>) {
    setEdits((prev) => ({ ...prev, [code]: { ...prev[code], ...patch } }));
  }

  async function handleSave(code: string) {
    const edit = edits[code];
    if (!edit) return;
    const multiplier = parseFloat(edit.multiplier);
    if (isNaN(multiplier) || multiplier <= 0) {
      showFlash("Invalid multiplier value", false);
      return;
    }
    setSaving(code);
    const res = await adminApi.updateLanguagePricing(code, {
      displayName: edit.displayName,
      multiplier,
      isRare: edit.isRare,
      isActive: edit.isActive,
    });
    if (res.ok) {
      setRows((prev) =>
        prev.map((r) =>
          r.code === code
            ? { ...r, displayName: edit.displayName, multiplier, isRare: edit.isRare, isActive: edit.isActive }
            : r
        )
      );
      showFlash(`${code} updated.`);
    } else {
      showFlash(res.error ?? "Save failed", false);
    }
    setSaving(null);
  }

  async function handleDelete(code: string) {
    if (!confirm(`Are you sure you want to delete language "${code}"?`)) return;
    setDeleting(code);
    const res = await adminApi.deleteLanguagePricing(code);
    if (res.ok) {
      setRows((prev) => prev.filter((r) => r.code !== code));
      showFlash(`${code} deleted.`);
    } else {
      showFlash(res.error ?? "Delete failed", false);
    }
    setDeleting(null);
  }

  if (loading)
    return <div className="flex justify-center items-center h-64 text-vg-muted text-sm">Loading…</div>;
  if (error)
    return <div className="max-w-4xl mx-auto px-5 py-12 text-red-600 font-semibold">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      <h1 className="text-2xl font-black tracking-tight text-vg-ink">Language Pricing</h1>
      <p className="mt-1 text-sm text-vg-muted">Manage per-language price multipliers.</p>

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

      <div className="mt-6 rounded-2xl bg-white border border-vg-border overflow-x-auto shadow-sm">
        <table className="w-full text-sm min-w-[700px]">
          <thead className="bg-vg-bg-soft border-b border-vg-border">
            <tr>
              <th className="text-left px-5 py-3 font-bold text-vg-muted w-20">Code</th>
              <th className="text-left px-5 py-3 font-bold text-vg-muted">Display Name</th>
              <th className="text-left px-5 py-3 font-bold text-vg-muted w-28">Multiplier</th>
              <th className="text-center px-5 py-3 font-bold text-vg-muted w-24">Rare</th>
              <th className="text-center px-5 py-3 font-bold text-vg-muted w-24">Active</th>
              <th className="text-right px-5 py-3 font-bold text-vg-muted w-36">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-vg-border">
            {rows.map((r) => {
              const edit = edits[r.code] ?? {
                displayName: r.displayName,
                multiplier: String(r.multiplier),
                isRare: r.isRare,
                isActive: r.isActive,
              };
              const isSaving = saving === r.code;
              const isDeleting = deleting === r.code;
              return (
                <tr key={r.code} className="hover:bg-vg-bg-soft transition-colors">
                  <td className="px-5 py-3 font-black text-vg-ink">{r.code}</td>
                  <td className="px-5 py-3">
                    <input
                      type="text"
                      value={edit.displayName}
                      onChange={(e) => patchEdit(r.code, { displayName: e.target.value })}
                      className="w-full text-sm border border-vg-border rounded-lg px-2 py-1 focus:outline-none focus:border-vg-primary"
                    />
                  </td>
                  <td className="px-5 py-3">
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      value={edit.multiplier}
                      onChange={(e) => patchEdit(r.code, { multiplier: e.target.value })}
                      className="w-full text-sm border border-vg-border rounded-lg px-2 py-1 focus:outline-none focus:border-vg-primary"
                    />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={edit.isRare}
                      onChange={(e) => patchEdit(r.code, { isRare: e.target.checked })}
                      className="w-4 h-4 accent-vg-primary cursor-pointer"
                    />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <input
                      type="checkbox"
                      checked={edit.isActive}
                      onChange={(e) => patchEdit(r.code, { isActive: e.target.checked })}
                      className="w-4 h-4 accent-vg-primary cursor-pointer"
                    />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <div className="flex gap-2 justify-end">
                      <button
                        disabled={isSaving || isDeleting}
                        onClick={() => handleSave(r.code)}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-vg-primary text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isSaving ? "Saving…" : "Save"}
                      </button>
                      <button
                        disabled={isSaving || isDeleting}
                        onClick={() => handleDelete(r.code)}
                        className="px-3 py-1 rounded-lg text-xs font-bold border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors disabled:opacity-50"
                      >
                        {isDeleting ? "…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
