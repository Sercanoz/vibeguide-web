"use client";

import { useState } from "react";
import { authedFetch } from "@/lib/admin-api";

export default function AdminPushPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [role, setRole] = useState("all");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ sent: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    if (!confirm(`Send "${title}" to ${role === "all" ? "all users" : role + "s"}?`)) return;
    setLoading(true); setError(null); setResult(null);
    const r = await authedFetch<{ ok: boolean; sent: number }>("/api/admin/push", {
      method: "POST",
      body: JSON.stringify({ title, body, role: role === "all" ? null : role }),
    });
    setLoading(false);
    if (r.ok) { setResult({ sent: r.data.sent }); setTitle(""); setBody(""); }
    else setError(r.error ?? "Failed to send");
  }

  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-2xl font-black text-[#0A0A0F] mb-2">Push Notification</h1>
      <p className="text-sm text-neutral-400 mb-8">Send a broadcast push notification to users</p>

      <div className="bg-white rounded-2xl border border-black/[0.06] p-6 shadow-sm">
        <form onSubmit={onSend} className="space-y-4">
          <div>
            <label className="text-xs font-black text-neutral-500 uppercase tracking-wide mb-1.5 block">Target audience</label>
            <div className="flex gap-2">
              {[["all","Everyone"],["Tourist","Tourists only"],["Guide","Guides only"]].map(([v, l]) => (
                <button key={v} type="button" onClick={() => setRole(v)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${role === v ? "bg-[#6C4CF1] text-white border-[#6C4CF1]" : "bg-neutral-50 text-neutral-500 border-black/10 hover:border-[#6C4CF1]/30"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-black text-neutral-500 uppercase tracking-wide mb-1.5 block">Title *</label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] transition-colors"
              placeholder="e.g. New tour available in Istanbul!" />
          </div>

          <div>
            <label className="text-xs font-black text-neutral-500 uppercase tracking-wide mb-1.5 block">Message *</label>
            <textarea required value={body} onChange={(e) => setBody(e.target.value)} rows={4}
              className="w-full border border-black/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] transition-colors resize-none"
              placeholder="Write your message here…" />
          </div>

          {error && <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}
          {result && (
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-700 font-semibold">
              ✓ Sent to {result.sent} users
            </div>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-[#6C4CF1] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
            style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
            {loading ? "Sending…" : "Send notification →"}
          </button>
        </form>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-800">
        <p className="font-bold mb-1">Tips</p>
        <ul className="space-y-1 text-xs list-disc pl-4">
          <li>Keep title under 50 characters</li>
          <li>Message under 100 characters for best display</li>
          <li>Only users with the app installed and notifications enabled will receive it</li>
        </ul>
      </div>
    </div>
  );
}
