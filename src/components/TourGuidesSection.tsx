"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { clientFetch } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";
import { languageByCode, parseLanguageCodes } from "@/lib/languages";
import { STAR_PATH } from "@/components/TourCard";

// Tur detayında "Bu turu kimler veriyor". Backend'de tur ↔ rehber eşlemesi şehir
// üzerinden (ToursController.AvailableGuides: onaylı + aktif + aynı şehir). Liste
// aynı kuralla /api/guides/directory?city= ile alınır. Rehber, tarih seçildikten
// sonra rehber seçim adımında seçilir — burası yalnız tanıtım.

interface G {
  id: number;
  fullName: string;
  photoUrl?: string | null;
  languages?: string | null;
  yearsOfExperience: number;
  rating: number;
}

const MAX = 6;

export default function TourGuidesSection({ city, headingClass }: { city: string; headingClass: string }) {
  const { locale } = useT();
  const tr = locale === "tr";
  const [guides, setGuides] = useState<G[] | null>(null);

  useEffect(() => {
    if (!city) return;
    let alive = true;
    clientFetch(`/api/guides/directory?city=${encodeURIComponent(city)}&limit=${MAX + 1}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d: G[]) => { if (alive) setGuides(Array.isArray(d) ? d : []); })
      .catch(() => { if (alive) setGuides([]); });
    return () => { alive = false; };
  }, [city]);

  if (!guides || guides.length === 0) return null;
  const shown = guides.slice(0, MAX);

  return (
    <section>
      <h2 className={headingClass}>{tr ? "Bu turu veren rehberler" : "Guides who lead this tour"}</h2>
      <p className="mt-2 text-sm text-neutral-600">
        {tr
          ? "Hepsi lisanslı ve ekibimizce doğrulanmış. Tarihini seçince o gün müsait olanlar arasından rehberini sen seçersin."
          : "All licensed and verified by our team. After you pick a date, you choose your guide from those available that day."}
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {shown.map((g) => {
          const langs = parseLanguageCodes(g.languages).slice(0, 4).map((x) => languageByCode(x).name);
          return (
            <li key={g.id}>
              <Link href={`/guides/${g.id}`} className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3 transition-colors hover:border-neutral-400">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-neutral-100">
                  {g.photoUrl ? (
                    <Image src={g.photoUrl} alt="" fill sizes="48px" className="object-cover" />
                  ) : (
                    <span aria-hidden="true" className="flex h-full w-full items-center justify-center font-display text-lg text-neutral-500">{g.fullName.charAt(0)}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-neutral-900">{g.fullName}</p>
                  <p className="flex items-center gap-1 text-xs text-neutral-600">
                    {g.rating > 0 && (
                      <>
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="#0A0A0F" aria-hidden="true"><polygon points={STAR_PATH} /></svg>
                        <span className="font-medium text-neutral-900">{g.rating.toFixed(1)}</span>
                        <span aria-hidden="true">·</span>
                      </>
                    )}
                    {g.yearsOfExperience > 0 && <span>{tr ? `${g.yearsOfExperience} yıl` : `${g.yearsOfExperience} yrs`}</span>}
                  </p>
                  {langs.length > 0 && <p className="truncate text-xs text-neutral-500">{langs.join(" · ")}</p>}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      {guides.length > MAX && (
        <Link href="/guides" className="mt-4 inline-block text-sm font-medium text-neutral-900 underline underline-offset-2">
          {tr ? "Tüm rehberleri gör" : "See all guides"}
        </Link>
      )}
    </section>
  );
}
