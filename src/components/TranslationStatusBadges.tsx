"use client";

const LOCALE_LABELS: Record<string, string> = {
  en: "EN", tr: "TR", de: "DE", fr: "FR", hr: "HR",
  ro: "RO", zh: "ZH", ru: "RU", es: "ES", ko: "KO", el: "EL",
};

export default function TranslationStatusBadges({
  supportedLocales,
  translations,
}: {
  supportedLocales: string[];
  translations: Record<string, "human" | "machine">;
}) {
  return (
    <div className="flex flex-wrap gap-1">
      {supportedLocales.map((loc) => {
        const status = translations[loc];
        const label = LOCALE_LABELS[loc] ?? loc.toUpperCase();
        const cls =
          status === "human"
            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
            : status === "machine"
              ? "bg-amber-100 text-amber-700 border-amber-200"
              : "bg-gray-100 text-gray-400 border-gray-200";
        const title =
          status === "human"
            ? "Human-translated"
            : status === "machine"
              ? "Machine-translated"
              : "Missing";
        const icon = status === "human" ? "✓" : status === "machine" ? "🤖" : "·";
        return (
          <span
            key={loc}
            title={title}
            className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-md border ${cls}`}
          >
            <span>{icon}</span>
            <span>{label}</span>
          </span>
        );
      })}
    </div>
  );
}
