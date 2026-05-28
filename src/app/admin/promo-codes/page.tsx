"use client";

import { useEffect, useState } from "react";
import { authedFetch } from "@/lib/admin-api";

type PromoCode = {
  id: number; code: string; discountType: string; discountValue: number;
  maxUses: number | null; useCount: number; expiresAt: string | null; createdAt: string;
};

export default function AdminPromoCodesPage() {
  const [codes, setCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  const [code, setCode] = useState("");
  const [type, setType] = useState<"percent" | "fixed">("percent");
  const [value, setValue] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  async function load() {
    const r = await authedFetch<PromoCode[]>("/api/admin/promo-codes");
    if (r.ok) setCodes(r.data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const r = await authedFetch<PromoCode>("/api/admin/promo-codes", {
      method: "POST",
      body: JSON.stringify({
        code, discountType: type,
        discountValue: parseFloat(value),
        maxUses: maxUses ? parseInt(maxUses) : null,
        expiresAt: expiresAt || null,
      }),
    });
    setCreating(false);
    if (r.ok) { setCode(""); setValue(""); setMaxUses(""); setExpiresAt(""); load(); setFlash("Created ✓"); }
    else setFlash(r.error ?? "Failed");
    setTimeout(() => setFlash(null), 3000);
  }

  async function onDelete(id: number, codeStr: string) {
    if (!confirm(`Delete promo code "${codeStr}"?`)) return;
    await authedFetch(`/api/admin/promo-codes/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-black text-[#0A0A0F] mb-6">Promo Codes</h1>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Create form */}
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-sm">
          <h2 className="text-sm font-black text-[#0A0A0F] mb-4">Create new code</h2>
          <form onSubmit={onCreate} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-neutral-500 mb-1 block">Code *</label>
              <input required value={code} onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm font-mono uppercase focus:outline-none focus:border-[#6C4CF1]"
                placeholder="SUMMER25" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-500 mb-1 block">Type</label>
                <select value={type} onChange={(e) => setType(e.target.value as "percent" | "fixed")}
                  className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6C4CF1] bg-white">
                  <option value="percent">% Percent</option>
                  <option value="fixed">Fixed amount</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-500 mb-1 block">Value *</label>
                <input required type="number" min="0" step="0.01" value={value} onChange={(e) => setValue(e.target.value)}
                  className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6C4CF1]"
                  placeholder={type === "percent" ? "25" : "100"} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-500 mb-1 block">Max uses</label>
                <input type="number" min="1" value={maxUses} onChange={(e) => setMaxUses(e.target.value)}
                  className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6C4CF1]"
                  placeholder="Unlimited" />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-500 mb-1 block">Expires at</label>
                <input type="date" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)}
                  className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6C4CF1]" />
              </div>
            </div>
            {flash && <p className="text-sm font-semibold text-emerald-600">{flash}</p>}
            <button type="submit" disabled={creating}
              className="w-full bg-[#6C4CF1] text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50">
              {creating ? "Creating…" : "Create code →"}
            </button>
          </form>
        </div>

        {/* List */}
        <div>
          <h2 className="text-sm font-black text-[#0A0A0F] mb-4">Active codes ({codes.length})</h2>
          {loading ? (
            <div className="space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="h-16 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
          ) : codes.length === 0 ? (
            <div className="text-sm text-neutral-400 bg-white rounded-2xl border border-black/[0.06] p-6 text-center">No promo codes yet</div>
          ) : (
            <div className="space-y-2">
              {codes.map((c) => (
                <div key={c.id} className="bg-white rounded-2xl border border-black/[0.06] px-4 py-3 flex items-center gap-3">
                  <div className="flex-1">
                    <p className="font-mono font-black text-[#6C4CF1] text-sm">{c.code}</p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      {c.discountType === "percent" ? `${c.discountValue}% off` : `${c.discountValue} TRY off`}
                      {c.maxUses ? ` · ${c.useCount}/${c.maxUses} uses` : ` · ${c.useCount} uses`}
                      {c.expiresAt ? ` · expires ${new Date(c.expiresAt).toLocaleDateString("en-GB")}` : ""}
                    </p>
                  </div>
                  <button onClick={() => onDelete(c.id, c.code)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
