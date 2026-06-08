"use client";

import { use, useEffect, useState } from "react";
import { clientFetch } from "@/lib/api";
// (review submission page)

type Props = { params: Promise<{ id: string }> };

type Tour = { id: number; title: string; city: string; coverPhotoUrl?: string };

export default function TourReviewPage(props: Props) {
  const { id } = use(props.params);
  const tourId = parseInt(id, 10);

  const [tour, setTour] = useState<Tour | null>(null);
  const [fullName, setFullName] = useState("");
  const [nationality, setNationality] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    clientFetch(`/api/tours/${tourId}?locale=en`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setTour({ id: d.id, title: d.title, city: d.city, coverPhotoUrl: d.coverPhotoUrl ?? d.photos?.[0]?.url }))
      .catch(() => {});
  }, [tourId]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!fullName.trim()) { setError("Please enter your name."); return; }
    if (rating < 1) { setError("Please select a star rating."); return; }
    setSubmitting(true);
    try {
      const res = await clientFetch(`/api/tours/${tourId}/public-reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: fullName.trim(), nationality: nationality.trim() || null, rating, comment: comment.trim() || null }),
      });
      if (!res.ok) { setError("Something went wrong. Please try again."); setSubmitting(false); return; }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-emerald-500/8 to-transparent rounded-full blur-[80px] pointer-events-none" />
        <div className="relative w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h1 className="text-2xl font-black text-[#0A0A0F]">Thank you! 🙏</h1>
          <p className="mt-2 text-sm text-neutral-800 leading-6">
            Your review has been submitted and will appear once approved. We appreciate you sharing your experience!
          </p>
          <a href={`/tours/${tourId}`} className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-[#6C4CF1] text-white font-bold px-7 py-3 text-sm hover:bg-[#5a3dd4] transition-colors"
            style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
            View this tour →
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F7FB] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <a href="/" className="inline-flex items-center gap-2.5 text-lg font-black text-[#0A0A0F]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/vibeguide-icon.png" alt="VibeGuide" width={28} height={28} style={{ mixBlendMode: "multiply" }} />
            VibeGuide
          </a>
        </div>

        <div className="bg-white rounded-3xl border border-black/[0.06] shadow-sm overflow-hidden">
          {/* Tour header */}
          {tour && (
            <div className="relative h-32">
              {tour.coverPhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tour.coverPhotoUrl} alt={tour.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#6C4CF1]/20 to-[#8B5CF6]/20" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div>
                  <p className="text-white/70 text-xs font-semibold">{tour.city}</p>
                  <h1 className="text-white font-black text-lg leading-tight">{tour.title}</h1>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={onSubmit} className="p-6">
            <h2 className="text-xl font-black text-[#0A0A0F]">Leave a review</h2>
            <p className="text-sm text-neutral-800 mt-1 mb-5">Share your experience with this tour</p>

            {/* Stars */}
            <div className="mb-5">
              <label className="text-xs font-bold text-neutral-700 mb-2 block">Your rating *</label>
              <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button"
                    onClick={() => setRating(n)}
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110">
                    <svg width="36" height="36" viewBox="0 0 24 24"
                      fill={(hover || rating) >= n ? "#F59E0B" : "#E5E7EB"} stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-neutral-700 mb-1.5 block">Full name *</label>
                <input value={fullName} onChange={(e) => setFullName(e.target.value)} required
                  className="w-full border border-black/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] transition-colors"
                  placeholder="John Doe" />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-700 mb-1.5 block">Nationality</label>
                <input value={nationality} onChange={(e) => setNationality(e.target.value)}
                  className="w-full border border-black/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] transition-colors"
                  placeholder="American" />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-700 mb-1.5 block">Your review</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4}
                  className="w-full border border-black/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] transition-colors resize-none"
                  placeholder="Tell us about your experience…" />
              </div>
            </div>

            {error && <div className="mt-4 rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}

            <button type="submit" disabled={submitting}
              className="mt-5 w-full rounded-2xl bg-[#6C4CF1] text-white font-bold py-3.5 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
              style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
              {submitting ? "Submitting…" : "Submit review →"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-neutral-800 mt-4">Powered by VibeGuide</p>
      </div>
    </main>
  );
}
