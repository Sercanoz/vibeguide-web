"use client";

import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12">
      <h1 className="text-3xl font-black tracking-tight text-vg-ink">
        Admin tools
      </h1>
      <p className="mt-2 text-vg-muted">
        Manage translations and content. Backend enforces admin role.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-5">
        <Link
          href="/admin/analytics"
          className="block rounded-3xl bg-white border border-vg-border p-7 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <div className="text-4xl mb-3">📊</div>
          <h2 className="text-xl font-black text-vg-ink">Analytics</h2>
          <p className="mt-1 text-sm text-vg-muted leading-relaxed">
            Platform KPI'ları, gelir özeti, en popüler turlar ve rehber performansı.
          </p>
        </Link>

        <Link
          href="/admin/disputes"
          className="block rounded-3xl bg-white border border-vg-border p-7 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <div className="text-4xl mb-3">⚖️</div>
          <h2 className="text-xl font-black text-vg-ink">Uyuşmazlıklar</h2>
          <p className="mt-1 text-sm text-vg-muted leading-relaxed">
            VibeNow rezervasyon ve havuz anlaşmazlıklarını görüntüle, iade et veya onayla.
          </p>
        </Link>
      </div>

      <div className="mt-5 grid sm:grid-cols-2 gap-5">
        <Link
          href="/admin/tours"
          className="block rounded-3xl bg-white border border-vg-border p-7 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <div className="text-4xl mb-3">🗺️</div>
          <h2 className="text-xl font-black text-vg-ink">Tour translations</h2>
          <p className="mt-1 text-sm text-vg-muted leading-relaxed">
            Edit title, summary, description, highlights per locale.
            Auto-translate missing locales via Google.
          </p>
        </Link>

        <Link
          href="/admin/guides"
          className="block rounded-3xl bg-white border border-vg-border p-7 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
        >
          <div className="text-4xl mb-3">🎙️</div>
          <h2 className="text-xl font-black text-vg-ink">Guide bio translations</h2>
          <p className="mt-1 text-sm text-vg-muted leading-relaxed">
            Edit guide bios per locale. Same auto-translate flow.
          </p>
        </Link>
      </div>

      <div className="mt-10 rounded-2xl bg-amber-50 border border-amber-200 p-5">
        <p className="text-xs font-black uppercase tracking-widest text-amber-700">
          Setup checklist
        </p>
        <ul className="mt-2 text-sm text-amber-900 list-disc pl-5 space-y-1">
          <li>
            Backend env: <code className="font-mono text-xs">GOOGLE_TRANSLATE_API_KEY</code>{" "}
            set on Railway.
          </li>
          <li>
            Run backfill SQL{" "}
            <code className="font-mono text-xs">2026-05-10_translation_backfill.sql</code>{" "}
            from pgAdmin to seed canonical TR rows.
          </li>
          <li>Your Firebase user must have role=Admin in the User table.</li>
        </ul>
      </div>
    </div>
  );
}
