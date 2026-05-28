"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { adminApi, type TourListRow } from "@/lib/admin-api";
import TranslationStatusBadges from "@/components/TranslationStatusBadges";

export default function AdminTours() {
  const [rows, setRows] = useState<TourListRow[] | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const load = async () => {
    const r = await adminApi.listTours();
    if (r.ok) setRows(r.data);
    else setErr(`${r.status}: ${r.error ?? "failed"}`);
  };

  useEffect(() => { load(); }, []);

  if (err) {
    return (
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
        <div className="rounded-2xl bg-red-50 border border-red-200 p-5">
          <p className="font-black text-red-700">Failed to load tours</p>
          <p className="mt-1 text-sm text-red-900">{err}</p>
          {err.startsWith("403") && (
            <p className="mt-3 text-xs text-red-900">
              Your Firebase user does not have admin role in the database.
            </p>
          )}
        </div>
      </div>
    );
  }

  if (rows == null) {
    return (
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 text-vg-muted">
        Loading tours…
      </div>
    );
  }

  const visible = filter
    ? rows.filter(
        (r) =>
          r.title.toLowerCase().includes(filter.toLowerCase()) ||
          r.city.toLowerCase().includes(filter.toLowerCase())
      )
    : rows;

  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
      <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-3xl font-black text-vg-ink">Tours</h1>
          <p className="text-sm text-vg-muted mt-1">
            {rows.length} tours · click a row to edit.
          </p>
        </div>
        <div className="flex gap-3">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by title or city…"
            className="bg-white border border-vg-border rounded-xl px-4 py-2.5 text-sm w-64 focus:outline-none focus:border-vg-primary"
          />
          <button
            onClick={() => setShowCreate(true)}
            className="bg-vibe-gradient text-white font-black px-5 py-2.5 rounded-xl text-sm shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform whitespace-nowrap"
          >
            ＋ New Tour
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-vg-border overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-vg-bg-soft border-b border-vg-border">
            <tr className="text-left text-xs font-black uppercase tracking-widest text-vg-muted">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Translations</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((r) => (
              <tr
                key={r.id}
                className="border-b border-vg-border last:border-b-0 hover:bg-vg-bg-soft"
              >
                <td className="px-4 py-3 font-bold text-vg-ink">{r.title}</td>
                <td className="px-4 py-3 text-vg-muted">{r.city}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                      r.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <TranslationStatusBadges
                    supportedLocales={r.supportedLocales}
                    translations={r.translations}
                  />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/tours/${r.id}`}
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
                  No tours match the filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showCreate && (
        <CreateTourModal
          onClose={() => setShowCreate(false)}
          onCreated={() => { setShowCreate(false); load(); }}
        />
      )}
    </div>
  );
}

function CreateTourModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    city: "",
    category: "",
    durationMinutes: 120,
    basePrice: 0,
    currency: "EUR",
    status: "draft",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const set = (key: keyof typeof form, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onCreate = async () => {
    if (!form.title.trim()) { setErr("Title is required."); return; }
    if (!form.city.trim()) { setErr("City is required."); return; }
    if (form.durationMinutes <= 0) { setErr("Duration must be > 0."); return; }
    setSaving(true); setErr(null);
    const r = await adminApi.createTour({
      title: form.title.trim(),
      city: form.city.trim(),
      category: form.category.trim() || undefined,
      durationMinutes: form.durationMinutes,
      basePrice: form.basePrice,
      currency: form.currency,
      status: form.status,
    });
    setSaving(false);
    if (r.ok) {
      router.push(`/admin/tours/${r.data.id}`);
      onCreated();
    } else {
      setErr(`Failed: ${r.error ?? r.status}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-7">
        <h2 className="text-xl font-black text-vg-ink mb-1">New Tour</h2>
        <p className="text-sm text-vg-muted mb-6">Fill in the basics — you can edit everything else after.</p>

        {err && (
          <div className="mb-4 rounded-xl px-4 py-3 text-sm bg-red-50 border border-red-200 text-red-800">{err}</div>
        )}

        <div className="space-y-4">
          <Field label="Title *">
            <input
              autoFocus
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onCreate()}
              className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
              placeholder="Hagia Sophia & Blue Mosque Walking Tour"
              maxLength={200}
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="City *">
              <input
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
                placeholder="Istanbul"
              />
            </Field>
            <Field label="Category">
              <input
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
                placeholder="history"
              />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Field label="Duration (min)">
              <input
                type="number"
                min={1}
                value={form.durationMinutes}
                onChange={(e) => set("durationMinutes", parseInt(e.target.value) || 0)}
                className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
              />
            </Field>
            <Field label="Base price">
              <input
                type="number"
                min={0}
                value={form.basePrice}
                onChange={(e) => set("basePrice", parseFloat(e.target.value) || 0)}
                className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
              />
            </Field>
            <Field label="Currency">
              <select
                value={form.currency}
                onChange={(e) => set("currency", e.target.value)}
                className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
              >
                {["EUR", "USD", "TRY", "GBP"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </Field>
          </div>

          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => set("status", e.target.value)}
              className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
          </Field>
        </div>

        <div className="flex gap-3 mt-7">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-vg-border text-sm font-bold text-vg-muted hover:bg-vg-bg-soft transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            disabled={saving}
            className="flex-1 bg-vibe-gradient text-white font-black py-3 rounded-xl text-sm shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {saving ? "Creating…" : "Create & Edit →"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-vg-muted mb-1">{label}</label>
      {children}
    </div>
  );
}
