"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import { useT } from "@/components/LanguageProvider";
import { languageByCode, parseLanguageCodes } from "@/lib/languages";
import { STAR_PATH } from "@/components/TourCard";

export interface DirectoryGuide {
  id: number;
  fullName: string;
  photoUrl?: string | null;
  city?: string | null;
  languages?: string | null;
  yearsOfExperience: number;
  rating: number;
  bio?: string | null;
}

const C = {
  en: {
    title: "Licensed guides in Türkiye",
    lead: "Every guide holds an official tourist-guide badge and is verified by our team before joining.",
    city: "City", allCities: "All cities", language: "Language", allLanguages: "All languages",
    count: (n: number) => (n === 1 ? "1 guide" : `${n} guides`),
    years: (n: number) => `${n} yrs experience`,
    newGuide: "New",
    empty: "No guides match these filters.",
    unavailable: "The guide list is not available right now. Please try again later.",
    reset: "Clear filters",
    ctaTitle: "Are you a licensed guide?",
    ctaLink: "Guide with VibeGuide",
  },
  tr: {
    title: "Türkiye'deki lisanslı rehberler",
    lead: "Her rehberin resmi turist rehberi kokartı var ve platforma katılmadan önce ekibimiz tarafından doğrulanıyor.",
    city: "Şehir", allCities: "Tüm şehirler", language: "Dil", allLanguages: "Tüm diller",
    count: (n: number) => `${n} rehber`,
    years: (n: number) => `${n} yıl deneyim`,
    newGuide: "Yeni",
    empty: "Bu filtrelere uyan rehber yok.",
    unavailable: "Rehber listesi şu an alınamıyor. Lütfen daha sonra tekrar dene.",
    reset: "Filtreleri temizle",
    ctaTitle: "Lisanslı rehber misin?",
    ctaLink: "VibeGuide'da rehberlik yap",
  },
};

export default function GuidesDirectoryClient({ guides }: { guides: DirectoryGuide[] }) {
  const { locale } = useT();
  const c = locale === "tr" ? C.tr : C.en;
  const [city, setCity] = useState("");
  const [lang, setLang] = useState("");

  const cities = useMemo(
    () => Array.from(new Set(guides.map((g) => g.city?.trim()).filter((x): x is string => !!x))).sort((a, b) => a.localeCompare(b)),
    [guides],
  );
  const langs = useMemo(
    () => Array.from(new Set(guides.flatMap((g) => parseLanguageCodes(g.languages)))).sort(),
    [guides],
  );
  const shown = guides.filter(
    (g) => (!city || g.city?.trim() === city) && (!lang || parseLanguageCodes(g.languages).includes(lang)),
  );

  const selectCls = "h-11 rounded-xl border border-neutral-300 bg-white px-3 text-sm text-neutral-900 focus:border-[#5B3FD9] focus:outline-none focus:ring-[3px] focus:ring-[#5B3FD9]/15";

  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-28 md:px-6 md:pt-32">
        <h1 className="font-display text-4xl font-normal tracking-[-0.01em] md:text-5xl">{c.title}</h1>
        <p className="mt-4 max-w-2xl leading-7 text-neutral-700">{c.lead}</p>

        {guides.length === 0 ? (
          <p role="status" className="mt-12 text-neutral-700">{c.unavailable}</p>
        ) : (
          <>
            <div className="mt-8 flex flex-wrap items-end gap-3">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-neutral-600">{c.city}</span>
                <select value={city} onChange={(e) => setCity(e.target.value)} className={selectCls}>
                  <option value="">{c.allCities}</option>
                  {cities.map((x) => <option key={x} value={x}>{x}</option>)}
                </select>
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-neutral-600">{c.language}</span>
                <select value={lang} onChange={(e) => setLang(e.target.value)} className={selectCls}>
                  <option value="">{c.allLanguages}</option>
                  {langs.map((x) => <option key={x} value={x}>{languageByCode(x).name}</option>)}
                </select>
              </label>
              <p className="pb-3 text-sm text-neutral-600" aria-live="polite">{c.count(shown.length)}</p>
            </div>

            {shown.length === 0 ? (
              <div className="mt-12">
                <p className="text-neutral-700">{c.empty}</p>
                <button type="button" onClick={() => { setCity(""); setLang(""); }}
                  className="mt-3 text-sm font-medium text-neutral-900 underline underline-offset-2">
                  {c.reset}
                </button>
              </div>
            ) : (
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((g) => {
                  const codes = parseLanguageCodes(g.languages);
                  return (
                    <li key={g.id}>
                      <Link href={`/guides/${g.id}`}
                        className="flex h-full flex-col rounded-2xl border border-neutral-200 p-5 transition-colors hover:border-neutral-400">
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-neutral-100">
                            {g.photoUrl ? (
                              <Image src={g.photoUrl} alt="" fill sizes="64px" className="object-cover" />
                            ) : (
                              <span aria-hidden="true" className="flex h-full w-full items-center justify-center font-display text-2xl text-neutral-500">{g.fullName.charAt(0)}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-semibold">{g.fullName}</p>
                            {g.city && <p className="text-sm text-neutral-600">{g.city}</p>}
                            <p className="mt-0.5 flex items-center gap-1 text-sm">
                              {g.rating > 0 ? (
                                <>
                                  <svg width="13" height="13" viewBox="0 0 24 24" fill="#0A0A0F" aria-hidden="true"><polygon points={STAR_PATH} /></svg>
                                  <span className="font-medium">{g.rating.toFixed(1)}</span>
                                </>
                              ) : (
                                <span className="text-neutral-600">{c.newGuide}</span>
                              )}
                              {g.yearsOfExperience > 0 && <span className="text-neutral-600"> · {c.years(g.yearsOfExperience)}</span>}
                            </p>
                          </div>
                        </div>
                        {g.bio && <p className="mt-4 line-clamp-3 text-sm leading-6 text-neutral-700">{g.bio}</p>}
                        {codes.length > 0 && (
                          <p className="mt-auto pt-4 text-xs text-neutral-600">
                            {codes.map((x) => languageByCode(x).name).join(" · ")}
                          </p>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </>
        )}

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-neutral-200 p-6">
          <p className="font-display text-2xl font-normal">{c.ctaTitle}</p>
          <Link href="/become-a-guide" className="inline-flex h-11 items-center rounded-full bg-[#5B3FD9] px-6 text-sm font-medium text-white hover:bg-[#4A32B8]">
            {c.ctaLink}
          </Link>
        </div>
      </div>
      <MainFooter />
    </main>
  );
}
