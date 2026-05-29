"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { uploadTourPhoto } from "@/lib/firebase-storage";
import {
  adminApi,
  type TourDetail,
  type TourTranslationRow,
  type TourPlacesDetail,
  type PlaceRow,
  type TourSettings,
  type TourInclude,
  type TourImportantInfo,
  type TourPhoto,
} from "@/lib/admin-api";

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

type Tab = "tour" | "places" | "photos" | "meeting" | "includes" | "info" | "settings";

function Editor({ id }: { id: number }) {
  const [tab, setTab] = useState<Tab>("tour");
  const [data, setData] = useState<TourDetail | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const loadTour = async () => {
    const r = await adminApi.getTour(id);
    if (r.ok) setData(r.data);
    else setErr(`${r.status}: ${r.error ?? "failed"}`);
  };

  useEffect(() => { loadTour(); }, [id]);

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

  if (!data) {
    return (
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 text-vg-muted">
        Loading tour…
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
      <Link href="/admin/tours" className="text-xs font-black text-vg-muted hover:text-vg-ink">
        ← All tours
      </Link>

      <div className="mt-3">
        <h1 className="text-2xl font-black text-vg-ink">{data.tour.title}</h1>
        <p className="text-sm text-vg-muted">
          {data.tour.city} · canonical: <strong>{data.tour.canonicalLocale.toUpperCase()}</strong>
        </p>
      </div>

      {/* Tab switcher */}
      <div className="mt-5 flex flex-wrap gap-1 border-b border-vg-border pb-0">
        {([
          ["tour", "Tour content"],
          ["places", "📍 Stops"],
          ["photos", "🖼️ Photos"],
          ["meeting", "🗺️ Meeting point"],
          ["includes", "✓ Includes"],
          ["info", "⚠️ Important info"],
          ["settings", "⚙️ Settings"],
        ] as [Tab, string][]).map(([t, label]) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-bold rounded-t-xl border border-b-0 transition-colors ${
              tab === t
                ? "bg-white border-vg-border text-vg-ink"
                : "bg-transparent border-transparent text-vg-muted hover:text-vg-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "tour" ? (
        <TourTranslationEditor data={data} reload={loadTour} />
      ) : tab === "places" ? (
        <PlacesTranslationEditor tourId={id} isTranslateConfigured={data.isTranslateConfigured} canonicalLocale={data.tour.canonicalLocale} />
      ) : tab === "photos" ? (
        <PhotosEditor tourId={id} />
      ) : tab === "meeting" ? (
        <MeetingPointEditor id={id} />
      ) : tab === "includes" ? (
        <IncludesEditor tourId={id} />
      ) : tab === "info" ? (
        <ImportantInfoEditor tourId={id} />
      ) : (
        <TourSettingsEditor id={id} />
      )}
    </div>
  );
}

// ─── Tour content translations ───────────────────────────────────────────────

function TourTranslationEditor({
  data,
  reload,
}: {
  data: TourDetail;
  reload: () => Promise<void>;
}) {
  const [activeLocale, setActiveLocale] = useState<string>(data.tour.canonicalLocale);
  const [draft, setDraft] = useState<Partial<TourTranslationRow>>({});
  const [saving, setSaving] = useState(false);
  const [autoTranslating, setAutoTranslating] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
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

  const onSave = async () => {
    if (!draft.title?.trim()) { setFlash("Title is required."); return; }
    setSaving(true); setFlash(null);
    const r = await adminApi.upsertTourTranslation(data.tour.id, activeLocale, {
      title: draft.title.trim(),
      summary: draft.summary?.toString() || null,
      description: draft.description?.toString() || null,
      highlights: draft.highlights?.toString() || null,
    });
    setSaving(false);
    if (r.ok) { setFlash("Saved ✓"); await reload(); }
    else setFlash(`Save failed: ${r.error ?? r.status}`);
  };

  const onDelete = async () => {
    if (!confirm(`Delete the ${activeLocale.toUpperCase()} translation?`)) return;
    const r = await adminApi.deleteTourTranslation(data.tour.id, activeLocale);
    if (r.ok) { setFlash("Deleted."); await reload(); }
    else setFlash(`Delete failed: ${r.error ?? r.status}`);
  };

  const onAutoTranslate = async (overwrite = false) => {
    const msg = overwrite
      ? `Re-translate ALL locales from ${data.tour.canonicalLocale.toUpperCase()}? This will overwrite existing translations.`
      : `Auto-translate from ${data.tour.canonicalLocale.toUpperCase()} to all missing locales?`;
    if (!confirm(msg)) return;
    setAutoTranslating(true); setFlash(null);
    const r = await adminApi.autoTranslateTour(data.tour.id, {
      sourceLocale: data.tour.canonicalLocale,
      overwriteHuman: overwrite,
    });
    setAutoTranslating(false);
    if (r.ok) {
      setFlash(`Wrote ${r.data.written.length}, skipped ${r.data.skipped.length}, failed ${r.data.failed.length}.`);
      await reload();
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
    <div className="mt-6">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div className="flex flex-wrap gap-1.5">
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
                {status === "human" ? "✓ " : status === "machine" ? "🤖 " : ""}
                {LOCALE_LABELS[loc] ?? loc}
              </button>
            );
          })}
        </div>
        {data.isTranslateConfigured ? (
          <div className="flex gap-2">
            <button
              onClick={() => onAutoTranslate(false)}
              disabled={autoTranslating}
              className="bg-white border border-vg-border text-vg-ink font-bold text-sm px-4 py-2 rounded-xl hover:bg-vg-bg-soft disabled:opacity-50"
            >
              {autoTranslating ? "Translating…" : "🌐 Auto-translate missing"}
            </button>
            <button
              onClick={() => onAutoTranslate(true)}
              disabled={autoTranslating}
              className="bg-white border border-amber-300 text-amber-700 font-bold text-sm px-4 py-2 rounded-xl hover:bg-amber-50 disabled:opacity-50"
            >
              🔄 Re-translate all
            </button>
          </div>
        ) : (
          <span className="text-xs text-vg-muted bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-semibold">
            Auto-translate: set GOOGLE_TRANSLATE_API_KEY on Railway
          </span>
        )}
      </div>

      {flash && (
        <div className="mb-4 rounded-xl bg-vg-bg-soft border border-vg-border px-4 py-3 text-sm">{flash}</div>
      )}

      <div className="rounded-3xl bg-white border border-vg-border p-6 shadow-sm">
        {draft.isMachineTranslated && (
          <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2 text-sm text-amber-900">
            🤖 This translation was auto-generated. Saving will mark it as human-reviewed (✓).
          </div>
        )}
        <Field label="Title" value={draft.title ?? ""} onChange={(v) => setDraft({ ...draft, title: v })}
          placeholder={`Title in ${LOCALE_LABELS[activeLocale] ?? activeLocale}`} maxLength={200} />
        <Field label="Summary" value={draft.summary ?? ""} onChange={(v) => setDraft({ ...draft, summary: v })}
          placeholder="One-line teaser" rows={2} />
        <Field label="Description" value={draft.description ?? ""} onChange={(v) => setDraft({ ...draft, description: v })}
          placeholder="Full description" rows={6} />
        <Field label="Highlights (one per line)" value={draft.highlights ?? ""} onChange={(v) => setDraft({ ...draft, highlights: v })}
          placeholder="• Visit Hagia Sophia&#10;• Walk through the Grand Bazaar" rows={4} />

        <div className="mt-6 flex gap-3">
          <button onClick={onSave} disabled={saving}
            className="bg-vibe-gradient text-white font-black px-6 py-3 rounded-xl shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform disabled:opacity-50">
            {saving ? "Saving…" : "💾 Save"}
          </button>
          {data.translations.find((t) => t.locale === activeLocale) && (
            <button onClick={onDelete}
              className="bg-white border border-red-200 text-red-700 font-bold px-5 py-3 rounded-xl hover:bg-red-50">
              Delete this locale
            </button>
          )}
        </div>
      </div>

      <details className="mt-6 rounded-2xl bg-white border border-vg-border p-5">
        <summary className="cursor-pointer font-bold text-vg-ink">Canonical reference (tours_test row)</summary>
        <div className="mt-3 space-y-2 text-sm">
          <p><strong>Title:</strong> {data.tour.title}</p>
          <p><strong>Description:</strong>{" "}
            <span className="text-vg-muted whitespace-pre-line">{data.tour.description ?? "—"}</span>
          </p>
        </div>
      </details>
    </div>
  );
}

// ─── Place translations ───────────────────────────────────────────────────────

function PlacesTranslationEditor({
  tourId,
  isTranslateConfigured,
  canonicalLocale,
}: {
  tourId: number;
  isTranslateConfigured: boolean;
  canonicalLocale: string;
}) {
  const [data, setData] = useState<TourPlacesDetail | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [activeLocale, setActiveLocale] = useState<string>("en");
  const [selectedPlace, setSelectedPlace] = useState<PlaceRow | null>(null);
  const [draft, setDraft] = useState<{ name: string; description: string }>({ name: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [autoTranslating, setAutoTranslating] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);

  const load = async () => {
    const r = await adminApi.getTourPlaces(tourId);
    if (r.ok) {
      setData(r.data);
      if (!selectedPlace && r.data.places.length > 0) setSelectedPlace(r.data.places[0]);
    } else {
      setErr(`${r.status}: ${r.error ?? "failed"}`);
    }
  };

  useEffect(() => { load(); }, [tourId]);

  useEffect(() => {
    if (!selectedPlace || !activeLocale) return;
    const tr = selectedPlace.translations.find((t) => t.locale === activeLocale);
    // Fall back to base place.name/description if no translation yet (canonical content)
    setDraft({
      name: tr?.name ?? selectedPlace.name ?? "",
      description: tr?.description ?? selectedPlace.description ?? "",
    });
  }, [selectedPlace, activeLocale]);

  // Sync selectedPlace when data reloads
  useEffect(() => {
    if (!data || !selectedPlace) return;
    const updated = data.places.find((p) => p.id === selectedPlace.id);
    if (updated) setSelectedPlace(updated);
  }, [data]);

  const onSave = async () => {
    if (!draft.name.trim()) { setFlash("Name is required."); return; }
    if (!selectedPlace) return;
    setSaving(true); setFlash(null);
    const r = await adminApi.upsertPlaceTranslation(selectedPlace.id, activeLocale, {
      name: draft.name.trim(),
      description: draft.description.trim() || null,
    });
    setSaving(false);
    if (r.ok) { setFlash("Saved ✓"); await load(); }
    else setFlash(`Save failed: ${r.error ?? r.status}`);
  };

  const onDelete = async () => {
    if (!selectedPlace) return;
    if (!confirm(`Delete the ${activeLocale.toUpperCase()} translation for "${selectedPlace.name}"?`)) return;
    const r = await adminApi.deletePlaceTranslation(selectedPlace.id, activeLocale);
    if (r.ok) { setFlash("Deleted."); await load(); }
    else setFlash(`Delete failed: ${r.error ?? r.status}`);
  };

  const onAutoTranslate = async () => {
    if (!confirm(`Auto-translate ALL stops from ${canonicalLocale.toUpperCase()} to all missing locales?`)) return;
    setAutoTranslating(true); setFlash(null);
    const r = await adminApi.autoTranslatePlaces(tourId, {
      sourceLocale: canonicalLocale,
      overwriteHuman: false,
    });
    setAutoTranslating(false);
    if (r.ok) {
      setFlash(`Wrote ${r.data.written.length} locales, skipped ${r.data.skipped.length}, failed ${r.data.failed.length}.`);
      await load();
    } else {
      setFlash(`Auto-translate failed: ${r.error ?? r.status}`);
    }
  };

  const placeLocaleStatus = (place: PlaceRow, loc: string): "human" | "machine" | "missing" => {
    const tr = place.translations.find((t) => t.locale === loc);
    if (!tr) return "missing";
    return tr.isMachineTranslated ? "machine" : "human";
  };

  const onAddPlace = async () => {
    if (!newName.trim()) return;
    setAdding(true);
    const r = await adminApi.addPlace(tourId, newName.trim());
    setAdding(false);
    if (r.ok) { setNewName(""); load(); }
    else setFlash("Failed to add stop.");
  };

  const onDeletePlace = async (placeId: number) => {
    if (!confirm("Delete this stop?")) return;
    await adminApi.deletePlace(tourId, placeId);
    if (selectedPlace?.id === placeId) setSelectedPlace(null);
    load();
  };

  if (err) return <div className="mt-6 text-red-600 text-sm">{err}</div>;
  if (!data) return <div className="mt-6 text-vg-muted text-sm">Loading stops…</div>;
  if (data.places.length === 0) return (
    <div className="mt-6 space-y-4">
      <div className="rounded-2xl bg-white border border-vg-border p-8 text-center text-vg-muted text-sm">
        No stops added yet. Add your first stop below.
      </div>
      <div className="flex gap-2">
        <input value={newName} onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAddPlace()}
          className="flex-1 border border-vg-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-vg-primary"
          placeholder="Stop name (e.g. Hagia Sophia)" />
        <button onClick={onAddPlace} disabled={adding || !newName.trim()}
          className="bg-vg-primary text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50">
          {adding ? "Adding…" : "+ Add stop"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="mt-6 flex gap-5">
      {/* Place list sidebar */}
      <div className="w-56 shrink-0 space-y-1">
        {data.places.map((place) => {
          const allDone = data.supportedLocales.every(
            (l) => l === canonicalLocale || placeLocaleStatus(place, l) !== "missing"
          );
          const anyMissing = data.supportedLocales.some(
            (l) => l !== canonicalLocale && placeLocaleStatus(place, l) === "missing"
          );
          return (
            <div key={place.id} className="flex gap-1">
              <button
                onClick={() => setSelectedPlace(place)}
                className={`flex-1 text-left px-3 py-2.5 rounded-xl border text-sm transition-colors ${
                  selectedPlace?.id === place.id
                    ? "bg-vg-primary text-white border-vg-primary"
                    : "bg-white border-vg-border text-vg-ink hover:bg-vg-bg-soft"
                }`}
              >
                <span className="block font-bold truncate">{place.name}</span>
                <span className={`text-xs ${selectedPlace?.id === place.id ? "text-white/70" : "text-vg-muted"}`}>
                  {allDone ? "✓ all locales" : anyMissing ? "⚠ missing locales" : "🤖 machine only"}
                </span>
              </button>
              <button onClick={() => onDeletePlace(place.id)}
                className="px-2 rounded-xl border border-vg-border text-red-400 hover:bg-red-50 hover:border-red-200 transition-colors">
                ✕
              </button>
            </div>
          );
        })}

        {/* Add stop */}
        <div className="pt-2 space-y-1">
          <input value={newName} onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAddPlace()}
            className="w-full border border-vg-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-vg-primary"
            placeholder="New stop name…" />
          <button onClick={onAddPlace} disabled={adding || !newName.trim()}
            className="w-full bg-vg-primary text-white font-bold py-2 rounded-xl text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50">
            {adding ? "Adding…" : "+ Add stop"}
          </button>
        </div>
      </div>

      {/* Editor panel */}
      <div className="flex-1 min-w-0">
        {selectedPlace && (
          <>
            <div className="flex items-center justify-between gap-3 flex-wrap mb-3">
              <h2 className="font-black text-vg-ink">{selectedPlace.name}</h2>
              {isTranslateConfigured ? (
                <button
                  onClick={onAutoTranslate}
                  disabled={autoTranslating}
                  className="bg-white border border-vg-border text-vg-ink font-bold text-sm px-3 py-1.5 rounded-xl hover:bg-vg-bg-soft disabled:opacity-50"
                >
                  {autoTranslating ? "Translating…" : "🌐 Auto-translate all stops"}
                </button>
              ) : (
                <span className="text-xs text-vg-muted bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-semibold">
                  Set GOOGLE_TRANSLATE_API_KEY
                </span>
              )}
            </div>

            {/* Locale tabs */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {data.supportedLocales.map((loc) => {
                const status = placeLocaleStatus(selectedPlace, loc);
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
                    {status === "human" ? "✓ " : status === "machine" ? "🤖 " : ""}
                    {LOCALE_LABELS[loc] ?? loc}
                  </button>
                );
              })}
            </div>

            {flash && (
              <div className="mb-4 rounded-xl bg-vg-bg-soft border border-vg-border px-4 py-3 text-sm">{flash}</div>
            )}

            {false ? null : (
              <div className="rounded-3xl bg-white border border-vg-border p-6 shadow-sm">
                <Field
                  label="Name"
                  value={draft.name}
                  onChange={(v) => setDraft({ ...draft, name: v })}
                  placeholder={`Stop name in ${LOCALE_LABELS[activeLocale] ?? activeLocale}`}
                  maxLength={200}
                />
                <Field
                  label="Description"
                  value={draft.description}
                  onChange={(v) => setDraft({ ...draft, description: v })}
                  placeholder="Short description of this stop"
                  rows={4}
                />
                <div className="mt-5 flex gap-3">
                  <button onClick={onSave} disabled={saving}
                    className="bg-vibe-gradient text-white font-black px-6 py-3 rounded-xl shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform disabled:opacity-50">
                    {saving ? "Saving…" : "💾 Save"}
                  </button>
                  {selectedPlace.translations.find((t) => t.locale === activeLocale) && (
                    <button onClick={onDelete}
                      className="bg-white border border-red-200 text-red-700 font-bold px-5 py-3 rounded-xl hover:bg-red-50">
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
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
      {rows > 1 ? (
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

// ─── Tour Settings Editor ─────────────────────────────────────────────────────

function TourSettingsEditor({ id }: { id: number }) {
  const [settings, setSettings] = useState<TourSettings | null>(null);
  const [draft, setDraft] = useState<Partial<TourSettings>>({});
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    adminApi.getTourSettings(id).then((r) => {
      if (r.ok) { setSettings(r.data); setDraft(r.data); }
    });
  }, [id]);

  const set = (key: keyof TourSettings, value: unknown) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const onSave = async () => {
    if (!draft.title?.trim()) { setFlash("Title is required."); return; }
    if (!draft.city?.trim()) { setFlash("City is required."); return; }
    setSaving(true); setFlash(null);
    const r = await adminApi.updateTourSettings(id, draft);
    setSaving(false);
    if (r.ok) {
      setFlash("Saved ✓");
      const r2 = await adminApi.getTourSettings(id);
      if (r2.ok) { setSettings(r2.data); setDraft(r2.data); }
    } else {
      setFlash(`Save failed: ${r.error ?? r.status}`);
    }
  };

  if (!settings) return <div className="mt-6 text-vg-muted text-sm">Loading…</div>;

  return (
    <div className="mt-6 max-w-2xl">
      {flash && (
        <div className={`mb-5 rounded-xl px-4 py-3 text-sm border ${flash.includes("✓") ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-vg-bg-soft border-vg-border"}`}>
          {flash}
        </div>
      )}

      <div className="rounded-3xl bg-white border border-vg-border p-6 shadow-sm space-y-5">
        <SField label="Title" required>
          <input value={draft.title ?? ""} onChange={(e) => set("title", e.target.value)}
            className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary" placeholder="Tour title" maxLength={200} />
        </SField>

        <div className="grid grid-cols-2 gap-4">
          <SField label="City" required>
            <input value={draft.city ?? ""} onChange={(e) => set("city", e.target.value)}
              className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary" placeholder="Istanbul" />
          </SField>
          <SField label="Category">
            <input value={draft.category ?? ""} onChange={(e) => set("category", e.target.value)}
              className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary" placeholder="history, food, art…" />
          </SField>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <SField label="Base price">
            <input type="number" min={0} value={draft.basePrice ?? 0}
              onChange={(e) => set("basePrice", parseFloat(e.target.value) || 0)}
              className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary" />
          </SField>
          <SField label="Compare-at price">
            <input type="number" min={0} value={draft.compareAtPrice ?? ""}
              onChange={(e) => set("compareAtPrice", e.target.value ? parseFloat(e.target.value) : null)}
              className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary" placeholder="(optional)" />
          </SField>
          <SField label="Currency">
            <select value={draft.currency ?? "EUR"} onChange={(e) => set("currency", e.target.value)}
              className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary">
              {["EUR", "USD", "TRY", "GBP"].map((c) => <option key={c}>{c}</option>)}
            </select>
          </SField>
        </div>

        <SField label="Duration (minutes)">
          <input type="number" min={0} value={draft.durationMinutes ?? 0}
            onChange={(e) => set("durationMinutes", parseInt(e.target.value) || 0)}
            className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary" />
        </SField>

        <SField label="Languages offered (comma-separated codes)">
          <input value={draft.languagesOffered ?? ""} onChange={(e) => set("languagesOffered", e.target.value)}
            className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary" placeholder="en,tr,de,fr" />
        </SField>

        <SField label="Cover photo">
          {/* Preview */}
          {draft.coverPhotoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={draft.coverPhotoUrl} alt="cover preview" className="mb-2 h-40 w-full object-cover rounded-xl border border-vg-border" />
          )}

          {/* Upload button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setUploadProgress(0);
              uploadTourPhoto(id, file, ({ progress, url, error }) => {
                if (error) { setUploadProgress(null); setFlash(`Upload failed: ${error}`); return; }
                setUploadProgress(progress);
                if (url) { set("coverPhotoUrl", url); setUploadProgress(null); }
              });
              e.target.value = "";
            }}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadProgress !== null}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-vg-border bg-vg-bg-soft text-sm font-bold text-vg-ink hover:border-vg-primary hover:text-vg-primary transition-colors disabled:opacity-50"
            >
              {uploadProgress !== null ? `Uploading ${uploadProgress}%…` : "📁 Upload photo"}
            </button>
            {uploadProgress !== null && (
              <div className="flex-1 flex items-center">
                <div className="w-full bg-vg-border rounded-full h-1.5">
                  <div className="bg-vg-primary h-1.5 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Or paste URL manually */}
          <input
            value={draft.coverPhotoUrl ?? ""}
            onChange={(e) => set("coverPhotoUrl", e.target.value)}
            className="mt-2 w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-vg-primary text-vg-muted"
            placeholder="or paste URL directly…"
          />
        </SField>

        <SField label="Badges">
          <div className="flex flex-wrap gap-2 mb-2">
            {[
              { key: "skip_the_line", label: "⚡ Skip the line" },
              { key: "bestseller", label: "🏆 Bestseller" },
              { key: "free_cancellation", label: "✓ Free cancellation" },
              { key: "small_group", label: "👥 Small group" },
              { key: "private_tour", label: "🔒 Private tour" },
              { key: "instant_confirmation", label: "✅ Instant confirmation" },
              { key: "live_guide", label: "🎤 Live guide" },
              { key: "pickup_included", label: "🚌 Pickup included" },
            ].map(({ key, label }) => {
              const active = (draft.badges ?? "").split(",").map(s => s.trim()).filter(Boolean).includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    const current = (draft.badges ?? "").split(",").map(s => s.trim()).filter(Boolean);
                    const next = active ? current.filter(k => k !== key) : [...current, key];
                    set("badges", next.join(","));
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                    active
                      ? "bg-[#6C4CF1] text-white border-[#6C4CF1]"
                      : "bg-vg-bg-soft text-vg-muted border-vg-border hover:border-vg-primary hover:text-vg-primary"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </SField>

        <SField label="Rating & Reviews">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="text-xs text-vg-muted font-semibold mb-1 block">Rating (0–5)</label>
              <input
                type="number"
                min={0} max={5} step={0.1}
                value={draft.rating ?? ""}
                onChange={(e) => set("rating", e.target.value === "" ? null : parseFloat(e.target.value))}
                className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-vg-primary"
                placeholder="e.g. 4.8"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-vg-muted font-semibold mb-1 block">Review count</label>
              <input
                type="number"
                min={0}
                value={draft.reviewCount ?? 0}
                onChange={(e) => set("reviewCount", parseInt(e.target.value) || 0)}
                className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-vg-primary"
                placeholder="e.g. 124"
              />
            </div>
          </div>
        </SField>

        <SField label="Status">
          <select value={draft.status ?? "active"} onChange={(e) => set("status", e.target.value)}
            className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary">
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </SField>

        <div className="pt-2">
          <button onClick={onSave} disabled={saving}
            className="bg-vibe-gradient text-white font-black px-8 py-3 rounded-xl shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform disabled:opacity-50">
            {saving ? "Saving…" : "💾 Save settings"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Photos Editor ───────────────────────────────────────────────────────────

function PhotosEditor({ tourId }: { tourId: number }) {
  const [photos, setPhotos] = useState<TourPhoto[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [flash, setFlash] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const r = await adminApi.listPhotos(tourId);
    if (r.ok) setPhotos(r.data);
  };

  useEffect(() => { load(); }, [tourId]);

  const onFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setUploading(true); setUploadProgress(0); setFlash(null);
    uploadTourPhoto(tourId, file, async ({ progress, url, error }) => {
      if (error) { setUploading(false); setFlash(`Upload failed: ${error}`); return; }
      setUploadProgress(progress);
      if (url) {
        await adminApi.addPhoto(tourId, { url });
        await load();
        setUploading(false);
        setUploadProgress(0);
        // if more files queued, process next — for now one at a time
      }
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onDelete = async (id: number) => {
    await adminApi.deletePhoto(tourId, id);
    await load();
  };

  const onCaptionChange = async (photo: TourPhoto, caption: string) => {
    await adminApi.updatePhoto(tourId, photo.id, { caption });
    setPhotos((ps) => ps.map((p) => p.id === photo.id ? { ...p, caption } : p));
  };

  return (
    <div className="mt-6 max-w-3xl">
      {flash && (
        <div className="mb-4 rounded-xl px-4 py-3 text-sm bg-red-50 border border-red-200 text-red-800">{flash}</div>
      )}

      {/* Upload zone */}
      <div
        className="rounded-3xl border-2 border-dashed border-vg-border bg-vg-bg-soft hover:border-vg-primary transition-colors cursor-pointer p-8 text-center mb-6"
        onClick={() => !uploading && fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />
        {uploading ? (
          <div className="space-y-2">
            <p className="text-sm font-bold text-vg-ink">Uploading… {uploadProgress}%</p>
            <div className="w-full max-w-xs mx-auto bg-vg-border rounded-full h-2">
              <div className="bg-vg-primary h-2 rounded-full transition-all" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        ) : (
          <>
            <p className="text-4xl mb-3">🖼️</p>
            <p className="text-sm font-bold text-vg-ink">Click or drag & drop photos here</p>
            <p className="text-xs text-vg-muted mt-1">JPG, PNG, WebP · max 10 MB each</p>
          </>
        )}
      </div>

      {/* Photo grid */}
      {photos.length === 0 ? (
        <p className="text-sm text-vg-muted">No photos yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {photos.map((photo, i) => (
            <div key={photo.id} className="group relative rounded-2xl overflow-hidden border border-vg-border bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.url} alt={photo.caption ?? `photo ${i + 1}`} className="w-full h-36 object-cover" />
              <div className="p-2">
                <input
                  defaultValue={photo.caption ?? ""}
                  onBlur={(e) => onCaptionChange(photo, e.target.value)}
                  placeholder="Caption (optional)"
                  className="w-full text-xs bg-transparent border-b border-vg-border focus:outline-none focus:border-vg-primary text-vg-muted pb-0.5"
                />
              </div>
              <button
                onClick={() => onDelete(photo.id)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white text-xs font-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                ✕
              </button>
              {i === 0 && (
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#6C4CF1] text-white text-[10px] font-black">
                  Cover
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      <p className="text-xs text-vg-muted mt-3">First photo is used as the cover. Drag to reorder coming soon.</p>
    </div>
  );
}

// ─── Meeting Point Editor ─────────────────────────────────────────────────────

function MeetingPointEditor({ id }: { id: number }) {
  const [draft, setDraft] = useState<Pick<TourSettings, "meetingPointText" | "meetingPointLat" | "meetingPointLng">>({
    meetingPointText: null,
    meetingPointLat: null,
    meetingPointLng: null,
  });
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getTourSettings(id).then((r) => {
      if (r.ok) setDraft({
        meetingPointText: r.data.meetingPointText,
        meetingPointLat: r.data.meetingPointLat,
        meetingPointLng: r.data.meetingPointLng,
      });
    });
  }, [id]);

  const onSave = async () => {
    setSaving(true); setFlash(null);
    const r = await adminApi.updateTourSettings(id, draft);
    setSaving(false);
    if (r.ok) {
      setFlash("Saved ✓");
      const r2 = await adminApi.getTourSettings(id);
      if (r2.ok) setDraft({
        meetingPointText: r2.data.meetingPointText,
        meetingPointLat: r2.data.meetingPointLat,
        meetingPointLng: r2.data.meetingPointLng,
      });
    } else {
      setFlash(`Save failed: ${r.error ?? r.status}`);
    }
  };

  const mapsUrl = draft.meetingPointLat && draft.meetingPointLng
    ? `https://www.google.com/maps?q=${draft.meetingPointLat},${draft.meetingPointLng}`
    : null;

  return (
    <div className="mt-6 max-w-2xl">
      {flash && (
        <div className={`mb-5 rounded-xl px-4 py-3 text-sm border ${flash.includes("✓") ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-vg-bg-soft border-vg-border"}`}>
          {flash}
        </div>
      )}
      <div className="rounded-3xl bg-white border border-vg-border p-6 shadow-sm space-y-5">
        <SField label="Address / description">
          <input
            value={draft.meetingPointText ?? ""}
            onChange={(e) => setDraft((d) => ({ ...d, meetingPointText: e.target.value || null }))}
            className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
            placeholder="In front of Hagia Sophia main entrance"
          />
        </SField>
        <div className="grid grid-cols-2 gap-4">
          <SField label="Latitude">
            <input
              type="number"
              step="any"
              value={draft.meetingPointLat ?? ""}
              onChange={(e) => setDraft((d) => ({ ...d, meetingPointLat: e.target.value ? parseFloat(e.target.value) : null }))}
              className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
              placeholder="41.008240"
            />
          </SField>
          <SField label="Longitude">
            <input
              type="number"
              step="any"
              value={draft.meetingPointLng ?? ""}
              onChange={(e) => setDraft((d) => ({ ...d, meetingPointLng: e.target.value ? parseFloat(e.target.value) : null }))}
              className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
              placeholder="28.978359"
            />
          </SField>
        </div>
        {mapsUrl && (
          <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs font-bold text-vg-primary hover:underline">
            🗺️ Preview on Google Maps ↗
          </a>
        )}
        <div className="pt-2">
          <button onClick={onSave} disabled={saving}
            className="bg-vibe-gradient text-white font-black px-8 py-3 rounded-xl shadow-lg shadow-purple-500/30 hover:scale-[1.02] transition-transform disabled:opacity-50">
            {saving ? "Saving…" : "💾 Save meeting point"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Important Info Editor ────────────────────────────────────────────────────

function ImportantInfoEditor({ tourId }: { tourId: number }) {
  const [items, setItems] = useState<TourImportantInfo[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [adding, setAdding] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  const load = async () => {
    const r = await adminApi.listImportantInfo(tourId);
    if (r.ok) setItems(r.data);
  };

  useEffect(() => { load(); }, [tourId]);

  const onAdd = async () => {
    if (!newLabel.trim()) return;
    setAdding(true); setFlash(null);
    const r = await adminApi.addImportantInfo(tourId, { label: newLabel.trim() });
    setAdding(false);
    if (r.ok) { setNewLabel(""); await load(); }
    else setFlash(`Failed: ${r.error ?? r.status}`);
  };

  const onDelete = async (id: number) => {
    await adminApi.deleteImportantInfo(tourId, id);
    await load();
  };

  return (
    <div className="mt-6 max-w-2xl">
      <div className="rounded-3xl bg-white border border-vg-border p-6 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-widest text-vg-muted mb-1">
          Important Information
        </h3>
        <p className="text-xs text-vg-muted mb-4">Warnings, requirements, dress code, accessibility notes…</p>

        {flash && (
          <div className="mb-4 rounded-xl px-4 py-2 text-sm bg-red-50 border border-red-200 text-red-800">{flash}</div>
        )}

        <div className="space-y-2 mb-5">
          {items.length === 0 && <p className="text-sm text-vg-muted">No items yet.</p>}
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3">
              <span className="text-amber-500 text-base">⚠️</span>
              <span className="flex-1 text-sm text-amber-900">{item.label}</span>
              <button onClick={() => onDelete(item.id)} className="text-vg-muted hover:text-red-500 text-xs font-bold px-2">✕</button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAdd()}
            placeholder="e.g. Modest dress required, No flash photography…"
            className="flex-1 bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-vg-primary"
          />
          <button
            onClick={onAdd}
            disabled={adding || !newLabel.trim()}
            className="bg-vibe-gradient text-white font-black px-5 rounded-xl text-sm shadow-lg shadow-purple-500/30 disabled:opacity-40"
          >
            {adding ? "…" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Tour Includes Editor ─────────────────────────────────────────────────────

function IncludesEditor({ tourId }: { tourId: number }) {
  const [items, setItems] = useState<TourInclude[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [newIsIncluded, setNewIsIncluded] = useState(true);
  const [adding, setAdding] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);

  const load = async () => {
    const r = await adminApi.listIncludes(tourId);
    if (r.ok) setItems(r.data);
  };

  useEffect(() => { load(); }, [tourId]);

  const onAdd = async () => {
    if (!newLabel.trim()) return;
    setAdding(true); setFlash(null);
    const r = await adminApi.addInclude(tourId, { label: newLabel.trim(), isIncluded: newIsIncluded });
    setAdding(false);
    if (r.ok) { setNewLabel(""); await load(); }
    else setFlash(`Failed: ${r.error ?? r.status}`);
  };

  const onToggle = async (item: TourInclude) => {
    await adminApi.updateInclude(tourId, item.id, { label: item.label, isIncluded: !item.isIncluded });
    await load();
  };

  const onDelete = async (id: number) => {
    await adminApi.deleteInclude(tourId, id);
    await load();
  };

  return (
    <div className="mt-6 max-w-2xl">
      <div className="rounded-3xl bg-white border border-vg-border p-6 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-widest text-vg-muted mb-4">
          What&apos;s included / not included
        </h3>

        {flash && (
          <div className="mb-4 rounded-xl px-4 py-2 text-sm bg-red-50 border border-red-200 text-red-800">{flash}</div>
        )}

        {/* Existing items */}
        <div className="space-y-2 mb-5">
          {items.length === 0 && <p className="text-sm text-vg-muted">No items yet.</p>}
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-xl bg-vg-bg-soft border border-vg-border px-4 py-3">
              <button
                onClick={() => onToggle(item)}
                className={`text-lg w-7 h-7 flex items-center justify-center rounded-full border font-bold transition-colors ${
                  item.isIncluded
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                    : "bg-red-50 border-red-200 text-red-500"
                }`}
              >
                {item.isIncluded ? "✓" : "✗"}
              </button>
              <span className="flex-1 text-sm text-vg-ink">{item.label}</span>
              <button
                onClick={() => onDelete(item.id)}
                className="text-vg-muted hover:text-red-500 text-xs font-bold px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add new item */}
        <div className="flex gap-2">
          <button
            onClick={() => setNewIsIncluded(!newIsIncluded)}
            className={`text-lg w-10 h-10 flex-none flex items-center justify-center rounded-xl border font-bold transition-colors ${
              newIsIncluded
                ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                : "bg-red-50 border-red-200 text-red-500"
            }`}
          >
            {newIsIncluded ? "✓" : "✗"}
          </button>
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAdd()}
            placeholder="e.g. Entrance ticket, Lunch, Transport…"
            className="flex-1 bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-vg-primary"
          />
          <button
            onClick={onAdd}
            disabled={adding || !newLabel.trim()}
            className="bg-vibe-gradient text-white font-black px-5 rounded-xl text-sm shadow-lg shadow-purple-500/30 disabled:opacity-40"
          >
            {adding ? "…" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-vg-muted mb-1">
        {label}{required && <span className="text-vg-flame ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
