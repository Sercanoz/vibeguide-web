"use client";

import { useCallback, useEffect, useState } from "react";
import { adminApi, type InquiryRow } from "@/lib/admin-api";

const STATUSES: InquiryRow["status"][] = ["new", "contacted", "won", "lost"];

export default function AdminInquiriesPage() {
  const [rows, setRows] = useState<InquiryRow[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (status: string) => {
    const r = await adminApi.listInquiries(status || undefined);
    if (r.ok) { setRows(r.data); setError(null); } else setError(r.error ?? `HTTP ${r.status}`);
    setLoading(false);
  }, []);

  useEffect(() => { load(filter); }, [filter, load]);

  async function setStatus(id: number, status: string) {
    const r = await adminApi.updateInquiry(id, { status });
    if (r.ok) setRows((p) => p.map((x) => (x.id === id ? r.data : x)));
  }

  async function saveNote(id: number, adminNote: string) {
    const r = await adminApi.updateInquiry(id, { adminNote });
    if (r.ok) setRows((p) => p.map((x) => (x.id === id ? r.data : x)));
  }

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-normal text-[#0A0A0F]">Group Requests</h1>
          <p className="text-sm text-neutral-500 mt-1">Requests from the /groups form. The team also gets each one by email.</p>
        </div>
        <label className="text-sm">
          <span className="mr-2 text-neutral-600">Status</span>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-10 rounded-xl border border-neutral-300 px-3">
            <option value="">All</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </div>

      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
      {loading ? (
        <div className="mt-6 space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
      ) : rows.length === 0 ? (
        <div className="mt-6 bg-white rounded-2xl border border-black/[0.06] p-10 text-center text-sm text-neutral-500">No requests.</div>
      ) : (
        <ul className="mt-6 space-y-3">
          {rows.map((q) => (
            <li key={q.id} className="bg-white rounded-2xl border border-black/[0.06] p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#0A0A0F]">#{q.id} · {q.companyName ?? q.contactName} · {q.groupSize} people</p>
                  <p className="text-sm text-neutral-600">
                    {q.contactName} · <a href={`mailto:${q.email}`} className="text-[#5B3FD9] hover:underline">{q.email}</a>
                    {q.phone ? ` · ${q.phone}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    {q.groupType} · {q.cities ?? "—"} · {q.preferredDate ?? "no date"} · {q.languages ?? "—"} · {new Date(q.createdAt).toLocaleString("en-GB")}
                  </p>
                </div>
                <select value={q.status} onChange={(e) => setStatus(q.id, e.target.value)} className="h-9 rounded-lg border border-neutral-300 px-2 text-sm">
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              {q.message && <p className="mt-3 whitespace-pre-wrap text-sm text-neutral-800">{q.message}</p>}
              <textarea defaultValue={q.adminNote ?? ""} placeholder="Internal note (saved on blur)" rows={2} maxLength={1000}
                onBlur={(e) => { if (e.target.value !== (q.adminNote ?? "")) saveNote(q.id, e.target.value); }}
                className="mt-3 w-full rounded-xl border border-neutral-200 px-3 py-2 text-sm" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
