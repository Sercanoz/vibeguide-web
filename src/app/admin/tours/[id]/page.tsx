"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { adminApi, type TourDetail, type TourTranslationRow } from "@/lib/admin-api";

const LOCALE_LABELS: Record<string, string> = {
  en: "🇬🇧 English",
  tr: "🇹🇷 Türkçe",
  de: "🇩🇪 Deutsch",
  fr: "🇫🇷 Français",
  hr: "🇭🇷 Hrvatski",
  ro: "🇷🇴 Română",
  zh: "🇨🇳 中文",
  ru: "🇷🇺 Русский",
  es: "🇪🇸 Español",
  ko: "🇰🇷 한국어",
  el: "🇬🇷 Ελληνικά",
};

type Props = { params: Promise<{ id: string }> };

export default function AdminTourEditor(props: Props) {
  const { id: idStr } = use(props.params);
  const id = parseInt(idStr, 10);
  return <Editor id={id} />;
}

function Editor({ id }: { id: number }) {
  const [data, setData] = useState<TourDetail | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [activeLocale, setActiveLocale] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<TourTranslationRow>>({});
  const [saving, setSaving] = useState(false);
  const [autoTranslating, setAutoTranslating] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  const load = async () => {
    const r = await adminApi.getTour(id);
    if (r.ok) setData(r.data);
    else setErr(`${r.status}: ${r.error ?? "failed"}`);
  };

  useEffect(() => {
    load();
  }, [id]);

  useEffect(() => {
    if (data && !activeLocale) {
      setActiveLocale(data.tour.canonicalLocale);
    }
  }, [data, activeLocale]);

  useEffect(() => {
    if (!data || !activeLocale) return;
    const existing = data.translations.find((t) => t.locale === activeLocale);
    setDraft(
      existing ?? {
        locale: activeLocale,
        title: "",
        summary: "",
        description: "",
        highlights: "",
        isMachineTranslated: false,
      }
    );
  }, [activeLocale, data]);

  if (err) {
    return (
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10">
        <div className="rounded-2xl bg-red-50 border border-red-200 p-5">
          <p className="font-black text-red-700">Failed to load</p>
          <p className="mt-1 text-sm text-red-900">{err}</p>
          <Link href="/admin/tours" className="mt-3 inline-block text-xs font-black text-vg-primary">
            ← Back to tours
          </Link>
        </div>
      </div>
    );
  }

  if (!data || !activeLocale) {
    return (
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 text-vg-muted">
        Loading tour…
      </div>
    );
  }

  const onSave = async () => {
    if (!draft.title || !draft.title.trim()) {
      setFlash("Title is required.");
      return;
    }
    setSaving(true);
    setFlash(null);
    const r = await adminApi.upsertTourTranslation(id, activeLocale, {
      title: draft.title.trim(),
      summary: draft.summary?.toString() || null,
      description: draft.description?.toString() || null,
      highlights: draft.highlights?.toString() || null,
    });
    setSaving(false);
    if (r.ok) {
      setFlash("Saved ✓");
      await load();
    } else {
      setFlash(`Save failed: ${r.error ?? r.status}`);
    }
  };

  const onDelete = async () => {
    if (!confirm(`Delete the ${activeLocale.toUpperCase()} translation?`)) return;
    const r = await adminApi.deleteTourTranslation(id, activeLocale);
    if (r.ok) {
      setFlash("Deleted.");
      await load();
    } else {
      setFlash(`Delete failed: ${r.error ?? r.status}`);
    }
  };

  const onAutoTranslate = async () => {
    if (!confirm(
      `Auto-translate from ${data.tour.canonicalLocale.toUpperCase()} to all missing locales? Existing human translations will be skipped.`
    )) return;
    setAutoTranslating(true);
    setFlash(null);
    const r = await adminApi.autoTranslateTour(id, {
      sourceLocale: data.tour.canonicalLocale,
      overwriteHuman: false,
    });
    setAutoTranslating(false);
    if (r.ok) {
      setFlash(
        `Wrote ${r.data.written.length}, skipped ${r.data.skipped.length}, failed ${r.data.failed.length}.`
      );
      await load();
    } else {
      setFlash(`Auto-translate failed: ${r.error ?? r.status}`);
    }
  };

  const localeStatus = (loc: string): "human" | "machine" | "missing" => {
    const tr = data.translations.find((t) => t.locale === loc);
    if (!tr) return "missing";
    return tr.isMachineTranslated ? "machine" : "human";
  };

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
      <Link href="/admin/tours" className="text-xs font-black text-vg-muted hover:text-vg-ink">
        ← All tours
      </Link>

      <div className="mt-3 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-vg-ink">{data.tour.title}</h1>
          <p className="text-sm text-vg-muted">
            {data.tour.city} · canonical: <strong>{data.tour.canonicalLocale.toUpperCase()}</strong>
          </p>
        </div>
        <span className="text-xs text-vg-muted bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-semibold">
          Auto-translate: set GOOGLE_TRANSLATE_API_KEY on Railway
        </span>
      </div>

      {/* Locale tabs */}
      <div className="mt-6 flex flex-wrap gap-1.5 border-b border-vg-border pb-3">
        {data.supportedLocales.map((loc) => {
          const status = localeStatus(loc);
          const active = loc === activeLocale;
          return (
            <button
              key={loc}
              onClick={() => setActiveLocale(loc)}
              className={`text-sm font-bold px-3 py-1.5 rounded-lg border transition-colors ${
                active
                  ? "bg-vg-primary text-white border-vg-primary"
                  : status === "human"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    : status === "machine"
                      ? "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                      : "bg-white text-vg-muted border-vg-border hover:bg-vg-bg-soft"
              }`}
            >
              <span>
                {status === "human" ? "✓ " : status === "machine" ? "🤖 " : ""}
                {LOCALE_LABELS[loc] ?? loc}
              </span>
            </button>
          );
        })}
      </div>

      {flash && (
        <div className="mt-4 rounded-xl bg-vg-bg-soft border border-vg-border px-4 py-3 text-sm">
          {flash}
        </div>
      )}

      {/* Editor */}
      <div className="mt-6 rounded-3xl bg-white border border-vg-border p-6 shadow-sm">
        {draft.isMachineTranslated && (
          <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2 text-sm text-amber-900">
            🤖 This translation was auto-generated. Saving will mark it as
            human-reviewed (✓).
          </div>
        )}

        <Field
          label="Title"
          value={draft.title ?? ""}
          onChange={(v) => setDraft({ ...draft, title: v })}
          placeholder={`Title in ${LOCALE_LABELS[activeLocale] ?? activeLocale}`}
          maxLength={200}
        />
        <Field
          label="Summary"
          value={draft.summary ?? ""}
          onChange={(v) => setDraft({ ...draft, summary: v })}
          placeholder="One-line teaser"
          rows={2}
        />
        <Field
          label="Description"
          value={draft.description ?? ""}
          onChange={(v) => setDraft({ ...draft, description: v })}
          placeholder="Full description"
          rows={6}
        />
        <Field
          label="Highlights (one per line)"
          value={draft.highlights ?? ""}
          onChange={(v) => setDraft({ ...draft, highlights: v })}
          placeholder="• Visit Hagia Sophia&#10;• Walk through the Grand Bazaar"
          rows={4}
        />

        <div className="mt-6 flex gap-3">
          <button
            onClick={onSave}
            disabled={saving}
            className="bg-vibe-gradient text-white font-black px-6 py-3 rounded-xl shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {saving ? "Saving…" : "💾 Save"}
          </button>
          {data.translations.find((t) => t.locale === activeLocale) && (
            <button
              onClick={onDelete}
              className="bg-white border border-red-200 text-red-700 font-bold px-5 py-3 rounded-xl hover:bg-red-50"
            >
              Delete this locale
            </button>
          )}
        </div>
      </div>

      {/* Canonical reference */}
      <details className="mt-6 rounded-2xl bg-white border border-vg-border p-5">
        <summary className="cursor-pointer font-bold text-vg-ink">
          Canonical reference (tours_test row)
        </summary>
        <div className="mt-3 space-y-2 text-sm">
          <p>
            <strong>Title:</strong> {data.tour.title}
          </p>
          <p>
            <strong>Description:</strong>{" "}
            <span className="text-vg-muted whitespace-pre-line">
              {data.tour.description ?? "—"}
            </span>
          </p>
        </div>
      </details>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  rows = 1,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}) {
  const isTextarea = rows > 1;
  return (
    <div className="mb-4">
      <label className="block text-xs font-black uppercase tracking-widest text-vg-muted mb-1">
        {label}
        {maxLength && (
          <span className="float-right font-normal normal-case tracking-normal">
            {value.length}/{maxLength}
          </span>
        )}
      </label>
      {isTextarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
        />
      )}
    </div>
  );
}
