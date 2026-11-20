"use client";

import { FOUNDERS } from "@/lib/founders";

// Hakkımızda sayfasındaki kurucu kartları. FOUNDERS boşsa hiçbir şey çizmez.
export default function FoundersSection({ locale }: { locale: string }) {
  if (FOUNDERS.length === 0) return null;
  const tr = locale === "tr";
  const year = new Date().getFullYear();

  return (
    <section className="mt-12 border-t border-neutral-200 pt-10" aria-labelledby="founders-title">
      <h2 id="founders-title" className="font-display text-2xl font-normal text-[#0A0A0F]">
        {tr ? "Kurucular" : "The founders"}
      </h2>
      <p className="mt-2 text-sm leading-6 text-neutral-700">
        {tr
          ? "VibeGuide'ı sahada çalışan profesyonel turist rehberleri kurdu."
          : "VibeGuide was founded by professional tourist guides who still work in the field."}
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {FOUNDERS.map((f) => {
          const initials = f.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
          const years = f.guidingSince ? year - f.guidingSince : null;
          return (
            <article key={f.name} className="rounded-2xl border border-neutral-200 p-5">
              <div className="flex items-center gap-4">
                {f.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={f.photo} alt={f.name} className="h-16 w-16 shrink-0 rounded-full object-cover" />
                ) : (
                  <div aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-lg font-semibold text-neutral-700">
                    {initials}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-[#0A0A0F]">{f.name}</p>
                  <p className="text-sm text-neutral-600">{tr ? f.role.tr : f.role.en}</p>
                </div>
              </div>
              <dl className="mt-4 space-y-1 text-sm">
                {f.licenseNo && (
                  <div className="flex gap-2"><dt className="text-neutral-600">{tr ? "Rehber belge no:" : "Guide licence no:"}</dt><dd className="font-medium">{f.licenseNo}</dd></div>
                )}
                {years != null && years > 0 && (
                  <div className="flex gap-2"><dt className="text-neutral-600">{tr ? "Deneyim:" : "Experience:"}</dt><dd className="font-medium">{tr ? `${years} yıl` : `${years} years`}</dd></div>
                )}
                {f.languages && f.languages.length > 0 && (
                  <div className="flex gap-2"><dt className="text-neutral-600">{tr ? "Diller:" : "Languages:"}</dt><dd className="font-medium">{f.languages.join(" · ")}</dd></div>
                )}
              </dl>
              <p className="mt-4 text-sm leading-6 text-neutral-800">{tr ? f.bio.tr : f.bio.en}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
