"use client";

import { useEffect, useState } from "react";
import { authedFetch } from "@/lib/admin-api";

type Banner = {
  id: number; message: string; linkUrl: string | null; linkLabel: string | null;
  color: string; isActive: boolean; createdAt: string;
};

const COLOR_OPTIONS = [
  { value: "purple", label: "Purple", cls: "bg-[#6C4CF1] text-white" },
  { value: "amber", label: "Amber", cls: "bg-amber-500 text-white" },
  { value: "emerald", label: "Green", cls: "bg-emerald-500 text-white" },
  { value: "red", label: "Red", cls: "bg-red-500 text-white" },
];

function BannerPreview({ message, linkLabel, color }: { message: string; linkLabel?: string | null; color: string }) {
  const cls = COLOR_OPTIONS.find(c => c.value === color)?.cls ?? "bg-[#6C4CF1] text-white";
  return (
    <div className={`rounded-xl px-4 py-3 text-sm font-semibold flex items-center justify-between ${cls}`}>
      <span>{message || "Banner preview…"}</span>
      {linkLabel && <span className="ml-4 text-xs font-black opacity-80 underline">{linkLabel}</span>}
    </div>
  );
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkLabel, setLinkLabel] = useState("");
  const [color, setColor] = useState("purple");

  async function load() {
    const r = await authedFetch<Banner[]>("/api/admin/banners");
    if (r.ok) setBanners(r.data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const r = await authedFetch<Banner>("/api/admin/banners", {
      method: "POST",
      body: JSON.stringify({ message, linkUrl: linkUrl || null, linkLabel: linkLabel || null, color }),
    });
    setCreating(false);
    if (r.ok) { setMessage(""); setLinkUrl(""); setLinkLabel(""); load(); setFlash("Banner created ✓"); }
    else setFlash(r.error ?? "Failed");
    setTimeout(() => setFlash(null), 3000);
  }

  async function onToggle(id: number) {
    await authedFetch(`/api/admin/banners/${id}/toggle`, { method: "PATCH" });
    load();
  }

  async function onDelete(id: number) {
    if (!confirm("Delete this banner?")) return;
    await authedFetch(`/api/admin/banners/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-black text-[#0A0A0F] mb-2">Banners & Announcements</h1>
      <p className="text-sm text-neutral-400 mb-6">Active banners are shown at the top of the website</p>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Create */}
        <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-sm">
          <h2 className="text-sm font-black text-[#0A0A0F] mb-4">Create banner</h2>
          <form onSubmit={onCreate} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-neutral-500 mb-1 block">Message *</label>
              <input required value={message} onChange={(e) => setMessage(e.target.value)}
                className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6C4CF1]"
                placeholder="🎉 New Istanbul tour available!" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-500 mb-1 block">Link URL</label>
                <input value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)}
                  className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6C4CF1]"
                  placeholder="/tours" />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-500 mb-1 block">Link label</label>
                <input value={linkLabel} onChange={(e) => setLinkLabel(e.target.value)}
                  className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#6C4CF1]"
                  placeholder="View tours →" />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-500 mb-1.5 block">Color</label>
              <div className="flex gap-2">
                {COLOR_OPTIONS.map((c) => (
                  <button key={c.value} type="button" onClick={() => setColor(c.value)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${c.cls} ${color === c.value ? "border-black/30 scale-105" : "border-transparent opacity-70"}`}>
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Preview */}
            <div>
              <label className="text-xs font-bold text-neutral-500 mb-1.5 block">Preview</label>
              <BannerPreview message={message} linkLabel={linkLabel} color={color} />
            </div>
            {flash && <p className="text-sm font-semibold text-emerald-600">{flash}</p>}
            <button type="submit" disabled={creating}
              className="w-full bg-[#6C4CF1] text-white font-bold py-2.5 rounded-xl text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50">
              {creating ? "Creating…" : "Publish banner →"}
            </button>
          </form>
        </div>

        {/* List */}
        <div>
          <h2 className="text-sm font-black text-[#0A0A0F] mb-4">Published banners</h2>
          {loading ? (
            <div className="space-y-2">{[...Array(3)].map((_, i) => <div key={i} className="h-20 bg-neutral-100 rounded-xl animate-pulse" />)}</div>
          ) : banners.length === 0 ? (
            <div className="text-sm text-neutral-400 bg-white rounded-2xl border border-black/[0.06] p-6 text-center">No banners yet</div>
          ) : (
            <div className="space-y-3">
              {banners.map((b) => (
                <div key={b.id} className={`bg-white rounded-2xl border p-4 transition-all ${b.isActive ? "border-[#6C4CF1]/20" : "border-black/[0.06] opacity-60"}`}>
                  <BannerPreview message={b.message} linkLabel={b.linkLabel} color={b.color} />
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${b.isActive ? "bg-emerald-100 text-emerald-700" : "bg-neutral-100 text-neutral-500"}`}>
                      {b.isActive ? "Active" : "Hidden"}
                    </span>
                    <div className="flex gap-2">
                      <button onClick={() => onToggle(b.id)}
                        className="text-xs font-bold text-[#6C4CF1] hover:underline">
                        {b.isActive ? "Hide" : "Show"}
                      </button>
                      <button onClick={() => onDelete(b.id)}
                        className="text-xs font-bold text-red-400 hover:text-red-600">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
