"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";
import { getToursT } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";

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
        setGuides(await res.json());
      } catch {
        setGuides("error");
      }
    });
    return () => unsub();
  }, [id, date, people, language, router]);

  function chooseGuide(guideId: number) {
    router.push(
      `/tours/${id}/checkout?date=${date}&people=${people}&guideId=${guideId}${language ? `&language=${language}` : ""}`
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFB] text-[#0A0A0F]">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-20">
        <Link href={`/tours/${id}`} className="text-sm font-semibold text-[#6C4CF1] hover:underline">
          ← {tt.coBack}
        </Link>
        <h1 className="mt-3 text-3xl md:text-4xl font-black">{tt.gsTitle}</h1>
        <p className="mt-2 text-sm text-neutral-700">
          {date ? `${date} · ` : ""}{people} {people === 1 ? tt.gsTraveler : tt.gsTravelers}
        </p>

        {guides === "loading" && (
          <div className="mt-10 text-center text-neutral-600">…</div>
        )}

        {guides === "error" && (
          <div className="mt-10 rounded-2xl bg-red-50 border border-red-100 px-5 py-4 text-sm text-red-600">
            {tt.errMsg}
          </div>
        )}

        {Array.isArray(guides) && guides.length === 0 && (
          <div className="mt-10 rounded-2xl bg-white border border-black/[0.06] px-6 py-8 text-center">
            <p className="font-semibold text-neutral-800">{tt.gsNone}</p>
            <p className="mt-1 text-sm text-neutral-600">{tt.gsNoneSub}</p>
            <Link href={`/tours/${id}`} className="mt-4 inline-block text-sm font-bold text-[#6C4CF1] hover:underline">
              ← {tt.coBack}
            </Link>
          </div>
        )}

        {Array.isArray(guides) && guides.length > 0 && (
          <div className="mt-8 space-y-4">
            {guides.map((g) => (
              <button
                key={g.id}
                onClick={() => chooseGuide(g.id)}
                className="w-full text-left rounded-2xl bg-white border border-black/[0.06] p-5 hover:border-[#6C4CF1]/40 hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#F7F7FB] overflow-hidden shrink-0">
                  {g.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={g.photoUrl} alt={g.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-black text-[#6C4CF1]/40">
                      {g.fullName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-black truncate">{g.fullName}</p>
                    {g.specializationMatch && (
                      <span className="text-[10px] font-bold uppercase tracking-wide text-[#6C4CF1] bg-[#6C4CF1]/10 rounded-full px-2 py-0.5">
                        {tt.gsSpecialist}
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-neutral-700">
                    {g.rating > 0 && <span>★ {g.rating.toFixed(1)}</span>}
                    {g.yearsOfExperience > 0 && <span>· {g.yearsOfExperience}y exp</span>}
                    <span>· {g.languages}</span>
                  </div>
                  {g.bio && <p className="mt-1 text-xs text-neutral-600 line-clamp-2">{g.bio}</p>}
                </div>
                <span className="text-[#6C4CF1] font-bold shrink-0">{tt.gsSelect} →</span>
              </button>
            ))}
          </div>
        )}
      </div>
      <MainFooter />
    </main>
  );
}
