"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { adminApi } from "@/lib/admin-api";

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
  ja: "🇯🇵 日本語",
  bg: "🇧🇬 Български",
  sr: "🇷🇸 Srpski",
  it: "🇮🇹 Italiano",
  ar: "🇸🇦 العربية",
  nl: "🇳🇱 Nederlands",
  pl: "🇵🇱 Polski",
  uk: "🇺🇦 Українська",
  id: "🇮🇩 Bahasa Indonesia",
  pt: "🇵🇹 Português",
};

type Props = { params: Promise<{ userId: string }> };

type GuideDetail = {
  guide: {
    userId: number;
    fullName: string;
    canonicalBio: string | null;
    canonicalLocale: string;
    languages: string | null;
    city: string | null;
  };
  translations: {
    guideUserId: number;
    locale: string;
    bio: string;
    isMachineTranslated: boolean;
    updatedAt: string;
  }[];
  supportedLocales: string[];
};

export default function AdminGuideEditor(props: Props) {
  const { userId: idStr } = use(props.params);
  const userId = parseInt(idStr, 10);
  return <Editor userId={userId} />;
}

function Editor({ userId }: { userId: number }) {
  const [data, setData] = useState<GuideDetail | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [activeLocale, setActiveLocale] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ bio: string; isMachineTranslated: boolean }>({
    bio: "",
    isMachineTranslated: false,
  });
  const [saving, setSaving] = useState(false);
  const [autoTranslating, setAutoTranslating] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [languages, setLanguages] = useState("");
  const [savingLang, setSavingLang] = useState(false);

  const load = async () => {
    const r = await adminApi.getGuide(userId);
    if (r.ok) setData(r.data);
    else setErr(`${r.status}: ${r.error ?? "failed"}`);
  };

  useEffect(() => {
    load();
  }, [userId]);

  useEffect(() => {
    if (data && !activeLocale) setActiveLocale(data.guide.canonicalLocale);
    if (data) setLanguages(data.guide.languages ?? "");
  }, [data, activeLocale]);

  useEffect(() => {
    if (!data || !activeLocale) return;
    const existing = data.translations.find((t) => t.locale === activeLocale);
    setDraft({
      bio: existing?.bio ?? "",
      isMachineTranslated: existing?.isMachineTranslated ?? false,
    });
  }, [activeLocale, data]);

  if (err) {
    return (
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10">
        <div className="rounded-2xl bg-red-50 border border-red-200 p-5">
          <p className="font-black text-red-700">Failed to load</p>
          <p className="mt-1 text-sm text-red-900">{err}</p>
          <Link
            href="/admin/guides"
            className="mt-3 inline-block text-xs font-black text-vg-primary"
          >
            ← Back to guides
          </Link>
        </div>
      </div>
    );
  }

  if (!data || !activeLocale) {
    return (
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 text-vg-muted">
        Loading guide…
      </div>
    );
  }

  const localeStatus = (loc: string): "human" | "machine" | "missing" => {
    const tr = data.translations.find((t) => t.locale === loc);
    if (!tr) return "missing";
    return tr.isMachineTranslated ? "machine" : "human";
  };

  const onSave = async () => {
    if (!draft.bio.trim()) {
      setFlash("Bio is required.");
      return;
    }
    setSaving(true);
    setFlash(null);
    const r = await adminApi.upsertGuideBio(userId, activeLocale, draft.bio.trim());
    setSaving(false);
    if (r.ok) {
      setFlash("Saved ✓");
      await load();
    } else {
      setFlash(`Save failed: ${r.error ?? r.status}`);
    }
  };

  const onDelete = async () => {
    if (!confirm(`Delete the ${activeLocale.toUpperCase()} bio?`)) return;
    const r = await adminApi.deleteGuideBio(userId, activeLocale);
    if (r.ok) {
      setFlash("Deleted.");
      await load();
    } else {
      setFlash(`Delete failed: ${r.error ?? r.status}`);
    }
  };

  const onSaveLanguages = async () => {
    setSavingLang(true);
    const r = await adminApi.updateGuideLanguages(userId, languages);
    setSavingLang(false);
    if (r.ok) setFlash("Languages saved ✓");
    else setFlash(`Failed: ${r.error ?? r.status}`);
  };

  const onAutoTranslate = async () => {
    if (!confirm(
      `Auto-translate from ${data.guide.canonicalLocale.toUpperCase()} to all missing locales?`
    )) return;
    setAutoTranslating(true);
    setFlash(null);
    const r = await adminApi.autoTranslateGuide(userId, {
      sourceLocale: data.guide.canonicalLocale,
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

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-8">
      <Link
        href="/admin/guides"
        className="text-xs font-black text-vg-muted hover:text-vg-ink"
      >
        ← All guides
      </Link>

      <div className="mt-3 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-black text-vg-ink">{data.guide.fullName}</h1>
          <p className="text-sm text-vg-muted">
            User #{data.guide.userId} · {data.guide.city ?? "–"} · canonical:{" "}
            <strong>{data.guide.canonicalLocale.toUpperCase()}</strong>
          </p>
        </div>
        <span className="text-xs text-vg-muted bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl font-semibold">
          Auto-translate: set GOOGLE_TRANSLATE_API_KEY on Railway
        </span>
      </div>

      {/* Languages */}
      <div className="mt-5 bg-white border border-vg-border rounded-2xl p-5">
        <p className="text-xs font-black uppercase tracking-widest text-vg-muted mb-3">Guide Languages</p>
        <div className="flex gap-2 mb-3 flex-wrap">
          {["en","tr","de","fr","ru","es","it","ar","zh","ja","ko","nl","pl","uk","ro","el","bg","sr","hr","pt"].map((lang) => {
            const active = languages.split(",").map(s => s.trim()).filter(Boolean).includes(lang);
            return (
              <button key={lang} type="button"
                onClick={() => {
                  const cur = languages.split(",").map(s => s.trim()).filter(Boolean);
                  const next = active ? cur.filter(l => l !== lang) : [...cur, lang];
                  setLanguages(next.join(","));
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                  active ? "bg-[#6C4CF1] text-white border-[#6C4CF1]" : "bg-vg-bg-soft text-vg-muted border-vg-border hover:border-vg-primary hover:text-vg-primary"
                }`}>
                {lang.toUpperCase()}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3">
          <input value={languages} onChange={(e) => setLanguages(e.target.value)}
            className="flex-1 bg-vg-bg-soft border border-vg-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-vg-primary"
            placeholder="e.g. en,tr,de" />
          <button onClick={onSaveLanguages} disabled={savingLang}
            className="bg-vg-primary text-white font-bold px-5 py-2 rounded-xl text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50">
            {savingLang ? "Saving…" : "Save"}
          </button>
        </div>
        <p className="text-[10px] text-vg-muted mt-1.5">Comma-separated codes from guide&apos;s official badge</p>
      </div>

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
              {status === "human" ? "✓ " : status === "machine" ? "🤖 " : ""}
              {LOCALE_LABELS[loc] ?? loc}
            </button>
          );
        })}
      </div>

      {flash && (
        <div className="mt-4 rounded-xl bg-vg-bg-soft border border-vg-border px-4 py-3 text-sm">
          {flash}
        </div>
      )}

      <div className="mt-6 rounded-3xl bg-white border border-vg-border p-6 shadow-sm">
        {draft.isMachineTranslated && (
          <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-2 text-sm text-amber-900">
            🤖 Auto-generated. Saving will mark as human-reviewed (✓).
          </div>
        )}

        <label className="block text-xs font-black uppercase tracking-widest text-vg-muted mb-1">
          Bio
          <span className="float-right font-normal normal-case tracking-normal">
            {draft.bio.length}/500
          </span>
        </label>
        <textarea
          value={draft.bio}
          onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
          rows={6}
          maxLength={500}
          placeholder={`Bio in ${LOCALE_LABELS[activeLocale] ?? activeLocale}`}
          className="w-full bg-vg-bg-soft border border-vg-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-vg-primary"
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

      <details className="mt-6 rounded-2xl bg-white border border-vg-border p-5">
        <summary className="cursor-pointer font-bold text-vg-ink">
          Canonical bio
        </summary>
        <p className="mt-3 text-sm text-vg-muted whitespace-pre-line">
          {data.guide.canonicalBio ?? "—"}
        </p>
      </details>
    </div>
  );
}
