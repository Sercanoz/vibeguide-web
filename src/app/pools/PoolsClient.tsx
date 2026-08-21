"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { clientFetch } from "@/lib/api";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";
import Price from "@/components/Price";

/** Backend PoolToDto ile aynı alanlar. */
interface Pool {
  id: number;
  tourId: number;
  tourTitle: string;
  guideName?: string | null;
  scheduledAt: string;
  minParticipants: number;
  maxParticipants: number;
  currentParticipants: number;
  currency: string;
  currentPricePerPerson: number;
  bestPricePerPerson: number;
  lockAt: string;
  status: string;
  language?: string | null;
}

/** Liste yanıtı `{ dto, lat, lng }` sarmalıyla geliyor. */
interface PoolRow {
  dto: Pool;
  lat?: number | null;
  lng?: number | null;
}

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PoolsClient() {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await clientFetch("/api/pools");
        if (!res.ok) throw new Error(String(res.status));
        const raw = (await res.json()) as PoolRow[] | Pool[];
        if (cancelled) return;
        // Liste `{dto,...}` sarmalıyla dönüyor; savunmacı olarak ikisini de karşıla.
        const list = (raw as PoolRow[]).map((r) =>
          r && typeof r === "object" && "dto" in r ? r.dto : (r as unknown as Pool),
        );
        setPools(list.filter(Boolean));
      } catch {
        if (!cancelled) setError("Could not load group tours. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#FAFAFB]">
      <Navbar />
      <div className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#0A0A0F]">
            Group tours
          </h1>
          <p className="mt-2 text-neutral-600 leading-7 max-w-2xl">
            Join an open group and share the cost. The more travellers join, the
            less each person pays. Payment is collected once the group is
            complete and the final price is set.
          </p>

          {loading && (
            <div className="mt-10 space-y-3">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-2xl bg-white border border-black/[0.06] animate-pulse"
                />
              ))}
            </div>
          )}

          {error && (
            <div className="mt-10 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && pools.length === 0 && (
            <div className="mt-10 rounded-3xl border border-black/[0.06] bg-white p-10 text-center">
              <p className="text-base font-black text-[#0A0A0F]">
                No open groups right now
              </p>
              <p className="mt-1 text-sm text-neutral-600">
                Browse tours and start your own group — others can join you.
              </p>
              <Link
                href="/tours"
                className="mt-5 inline-flex rounded-2xl bg-[#6C4CF1] px-6 py-3 text-sm font-bold text-white hover:bg-[#5a3dd4] transition-colors"
              >
                Browse tours →
              </Link>
            </div>
          )}

          <div className="mt-8 space-y-3">
            {pools.map((p) => {
              const spotsLeft = Math.max(0, p.maxParticipants - p.currentParticipants);
              const locked = p.status === "locked";
              return (
                <Link
                  key={p.id}
                  href={`/pools/${p.id}`}
                  className="block rounded-2xl border border-black/[0.06] bg-white p-5 hover:border-[#6C4CF1]/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-black text-[#0A0A0F] truncate">
                        {p.tourTitle}
                      </p>
                      <p className="mt-1 text-xs text-neutral-600">
                        {fmtDate(p.scheduledAt)}
                        {p.guideName ? ` · ${p.guideName}` : ""}
                        {p.language ? ` · ${p.language.toUpperCase()}` : ""}
                      </p>
                      <p className="mt-2 text-xs text-neutral-600">
                        {p.currentParticipants}/{p.maxParticipants} joined
                        {locked ? (
                          <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 font-bold text-amber-700">
                            Closed — payment in progress
                          </span>
                        ) : spotsLeft <= 2 ? (
                          <span className="ml-2 rounded-full bg-[#6C4CF1]/10 px-2 py-0.5 font-bold text-[#6C4CF1]">
                            {spotsLeft} spot{spotsLeft === 1 ? "" : "s"} left
                          </span>
                        ) : null}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-lg font-black text-[#6C4CF1]">
                        <Price
                          amount={p.currentPricePerPerson}
                          currency={p.currency}
                        />
                      </p>
                      <p className="text-[11px] text-neutral-500">per person now</p>
                      {p.bestPricePerPerson > 0 &&
                        p.bestPricePerPerson < p.currentPricePerPerson && (
                          <p className="mt-1 text-[11px] text-emerald-600 font-semibold">
                            as low as{" "}
                            <Price
                              amount={p.bestPricePerPerson}
                              currency={p.currency}
                            />
                          </p>
                        )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <MainFooter />
    </main>
  );
}
