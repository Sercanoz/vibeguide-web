"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminApi, type TourReviewRow } from "@/lib/admin-api";

const TABS = ["pending", "approved", "rejected"];

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= n ? "#F59E0B" : "#E5E7EB"} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </span>
  );
}

export default function AdminReviewsPage() {
  const [tab, setTab] = useState("pending");
  const [rows, setRows] = useState<TourReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState<number | null>(null);

  async function load(status: string) {
    setLoading(true);
    const r = await adminApi.listTourReviews(status);
    if (r.ok) setRows(r.data);
    setLoading(false);
  }

  useEffect(() => { load(tab); }, [tab]);

  async function act(id: number, action: "approve" | "reject" | "delete") {
    setActing(id);
    if (action === "approve") await adminApi.approveTourReview(id);
    else if (action === "reject") await adminApi.rejectTourReview(id);
    else { if (!confirm("Delete this review permanently?")) { setActing(null); return; } await adminApi.deleteTourReview(id); }
    setActing(null);
    load(tab);
  }

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-2xl font-black text-[#0A0A0F] mb-1">Tour Reviews</h1>
      <p className="text-sm text-neutral-400 mb-6">Moderate public reviews collected via QR codes. Approved reviews update the tour&apos;s star rating.</p>

      <div className="flex gap-2 mb-6">
        {TABS.map((s) => (
          <button key={s} onClick={() => setTab(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold border capitalize transition-all ${tab === s ? "bg-[#6C4CF1] text-white border-[#6C4CF1]" : "bg-white border-black/10 text-neutral-500 hover:border-[#6C4CF1]/40"}`}>
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-neutral-100 rounded-2xl animate-pulse" />)}</div>
      ) : rows.length === 0 ? (
        <div className="bg-white rounded-2xl border border-black/[0.06] p-10 text-center text-sm text-neutral-400">
          No {tab} reviews.
        </div>
      ) : (
        <div className="space-y-3">
          {rows.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl border border-black/[0.06] p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-[#0A0A0F]">{r.fullName}</span>
                    {r.nationality && <span className="text-xs text-neutral-400">· {r.nationality}</span>}
                    <Stars n={r.rating} />
                  </div>
                  <Link href={`/admin/tours/${r.tourId}`} className="text-xs text-[#6C4CF1] font-semibold hover:underline">
                    {r.tourTitle ?? `Tour #${r.tourId}`}
                  </Link>
                  {r.comment && <p className="mt-2 text-sm text-neutral-600 leading-6">{r.comment}</p>}
                  <p className="mt-2 text-[11px] text-neutral-400">{new Date(r.createdAt).toLocaleString("en-GB")}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-black/[0.06]">
                {tab !== "approved" && (
                  <button onClick={() => act(r.id, "approve")} disabled={acting === r.id}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition-colors disabled:opacity-50">
                    ✓ Approve
                  </button>
                )}
                {tab !== "rejected" && (
                  <button onClick={() => act(r.id, "reject")} disabled={acting === r.id}
                    className="px-4 py-2 rounded-xl border border-black/10 text-neutral-600 text-sm font-bold hover:bg-neutral-50 transition-colors disabled:opacity-50">
                    Reject
                  </button>
                )}
                <button onClick={() => act(r.id, "delete")} disabled={acting === r.id}
                  className="ml-auto px-4 py-2 rounded-xl text-red-500 text-sm font-bold hover:bg-red-50 transition-colors disabled:opacity-50">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
