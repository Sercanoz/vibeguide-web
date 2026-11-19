"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import CheckoutSteps from "@/components/CheckoutSteps";
import { languageNames } from "@/lib/languages";
import { track } from "@/lib/analytics";

interface AvailableGuide {
  id: number;
  fullName: string;
  photoUrl?: string | null;
  rating: number;
  languages: string;
  yearsOfExperience: number;
  responseTimeMinutes: number;
  bio?: string | null;
  specializationMatch: boolean;
}

export default function GuideSelectionPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white" />}>
      <GuideSelectionInner />
    </Suspense>
  );
}

function GuideSelectionInner() {
  const params = useParams();
  const search = useSearchParams();
  const router = useRouter();
  const id = params?.id as string;
  const { locale } = useT();
  const tt = getToursT(locale);

  const date = search.get("date") ?? "";
  const people = Math.max(1, parseInt(search.get("people") ?? "1", 10) || 1);
  const language = search.get("language") ?? "";

  const [guides, setGuides] = useState<AvailableGuide[] | "loading" | "error" | "auth">("loading");
  // "Rehber yok" çıkmazında önerilecek en yakın müsait tarihler (takvim ucundan).
  const [alts, setAlts] = useState<string[] | null>(null);

  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged(async (user) => {
      if (!user) {
        // Login değil → login'e yönlendir, geri dönüşte bu sayfaya gel.
        const back = encodeURIComponent(
          `/tours/${id}/guides?date=${date}&people=${people}${language ? `&language=${language}` : ""}`
        );
        router.replace(`/login?next=${back}`);
        return;
      }
      try {
        const headers = await buildAuthHeaders();
        const qs = new URLSearchParams();
        if (date) qs.set("date", new Date(date).toISOString());
        if (language) qs.set("language", language);
        const res = await fetch(
          `${API_BASE_URL}/api/tours/${id}/available-guides?${qs.toString()}`,
          { headers }
        );
        if (!res.ok) { setGuides("error"); return; }
        const list: AvailableGuide[] = await res.json();
        setGuides(list);
        // GA4 huni: rehber listesi görüldü; 0 ise "rehber yok" çıkmazı ayrıca sayılır.
        track("view_guide_list", { tour_id: id, booking_date: date, travelers: people, guide_count: list.length });
        if (list.length === 0) {
          track("no_guides_available", { tour_id: id, booking_date: date });
          try {
            const a = await fetch(`${API_BASE_URL}/api/tours/${id}/availability?from=${date}&days=60${language ? `&language=${language}` : ""}`);
            if (a.ok) {
              const d: { days: { date: string; available: boolean }[] } = await a.json();
              setAlts(d.days.filter((x) => x.available && x.date !== date).slice(0, 3).map((x) => x.date));
            } else setAlts([]);
          } catch { setAlts([]); }
        }
      } catch {
        setGuides("error");
      }
    });
    return () => unsub();
  }, [id, date, people, language, router]);

  function chooseGuide(guideId: number) {
    track("select_guide", { tour_id: id, guide_id: guideId, booking_date: date });
    router.push(
      `/tours/${id}/checkout?date=${date}&people=${people}&guideId=${guideId}${language ? `&language=${language}` : ""}`
    );
  }

  const gc = GC[locale] ?? GC.en;
  const fmtDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-GB", { weekday: "short", day: "numeric", month: "long" })
    : "";

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 pb-20 pt-24 md:px-6 md:pt-28">
        <CheckoutSteps current={1} locale={locale} />
        <Link href={`/tours/${id}`} className="mt-6 inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
          {tt.coBack}
        </Link>
        <h1 className="mt-3 font-display text-3xl font-normal tracking-[-0.01em] md:text-[40px]">{tt.gsTitle}</h1>
        <p className="mt-2 text-neutral-600">
          {fmtDate ? `${fmtDate} · ` : ""}{people} {people === 1 ? tt.gsTraveler : tt.gsTravelers}
        </p>

        {guides === "loading" && (
          <ul className="mt-8 space-y-4" aria-busy="true" aria-label="Loading">
            {[0, 1, 2].map((i) => (
              <li key={i} className="flex animate-pulse items-center gap-4 rounded-2xl border border-neutral-200 p-5">
                <div className="h-16 w-16 shrink-0 rounded-full bg-neutral-100" />
                <div className="flex-1 space-y-2"><div className="h-4 w-1/3 rounded bg-neutral-100" /><div className="h-3 w-1/2 rounded bg-neutral-100" /><div className="h-3 w-3/4 rounded bg-neutral-100" /></div>
              </li>
            ))}
          </ul>
        )}

        {guides === "error" && (
          <div role="alert" className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">{tt.errMsg}</div>
        )}

        {Array.isArray(guides) && guides.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 px-6 py-12 text-center">
            <p className="font-semibold">{tt.gsNone}</p>
            <p className="mt-1 text-sm text-neutral-600">{tt.gsNoneSub}</p>
            {alts && alts.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-neutral-900">{gc.nearest}</p>
                <div className="mt-3 flex flex-wrap justify-center gap-2">
                  {alts.map((d) => (
                    <Link key={d}
                      href={`/tours/${id}/guides?date=${d}&people=${people}${language ? `&language=${language}` : ""}`}
                      onClick={() => track("select_alternative_date", { tour_id: id, from_date: date, to_date: d })}
                      className="inline-flex h-10 items-center rounded-full bg-[#5B3FD9] px-5 text-sm font-semibold text-white hover:bg-[#4A32B8]">
                      {new Date(`${d}T00:00:00`).toLocaleDateString(locale === "tr" ? "tr-TR" : "en-GB", { weekday: "short", day: "numeric", month: "short" })}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <Link href={`/tours/${id}`} className="mt-5 inline-flex h-10 items-center rounded-full border border-neutral-300 px-5 text-sm font-semibold hover:border-neutral-900">
              {gc.otherDate}
            </Link>
          </div>
        )}

        {Array.isArray(guides) && guides.length > 0 && (
          <ul className="mt-8 space-y-4">
            {guides.map((g) => (
              <li key={g.id} className="rounded-2xl border border-neutral-200 p-5 transition-colors hover:border-neutral-400">
                <div className="flex gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-neutral-200">
                    {g.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={g.photoUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center font-display text-2xl text-neutral-500">{g.fullName.charAt(0)}</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-base font-semibold">{g.fullName}</p>
                      {g.specializationMatch && (
                        <span className="rounded-md bg-neutral-900 px-1.5 py-0.5 text-[11px] font-semibold text-white">{tt.gsSpecialist}</span>
                      )}
                    </div>
                    <p className="mt-0.5 flex flex-wrap items-center gap-x-2 text-sm text-neutral-600">
                      {g.rating > 0 && (
                        <span className="inline-flex items-center gap-1 font-medium text-neutral-900">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="#0A0A0F" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                          {g.rating.toFixed(1)}
                        </span>
                      )}
                      {g.yearsOfExperience > 0 && <span>{gc.years(g.yearsOfExperience)}</span>}
                      {g.languages && <span>{languageNames(g.languages)}</span>}
                    </p>
                    {g.bio && <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-700">{g.bio}</p>}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end gap-3 border-t border-neutral-100 pt-4">
                  <Link href={`/guides/${g.id}`} target="_blank" className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-[#5B3FD9]">
                    {gc.viewProfile}
                  </Link>
                  <button type="button" onClick={() => chooseGuide(g.id)}
                    className="h-10 rounded-xl bg-[#5B3FD9] px-5 text-sm font-semibold text-white hover:bg-[#4A32B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B3FD9] focus-visible:ring-offset-2">
                    {tt.gsSelect}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <MainFooter />
    </main>
  );
}

const GC: Record<string, { years: (n: number) => string; viewProfile: string; otherDate: string; nearest: string }> = {
  en: { years: (n) => `${n} ${n === 1 ? "year" : "years"} experience`, viewProfile: "View profile", otherDate: "Pick another date", nearest: "Nearest dates with guides available:" },
  tr: { years: (n) => `${n} yıl deneyim`, viewProfile: "Profili gör", otherDate: "Başka tarih seç", nearest: "Rehberi müsait en yakın tarihler:" },
};
