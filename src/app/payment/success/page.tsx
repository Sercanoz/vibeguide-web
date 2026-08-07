"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";

function SuccessInner() {
  const search = useSearchParams();
  const bookingId = search.get("bookingId");

  return (
    <main className="min-h-screen bg-[#FAFAFB] text-[#0A0A0F]">
      <Navbar />
      <div className="mx-auto max-w-lg px-6 pt-32 pb-24 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-black">Payment complete 🎉</h1>
        <p className="mt-3 text-neutral-700">
          Your tour is booked and confirmed. You&apos;ll find all the details in your reservations.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/profile" className="rounded-full bg-[#6C4CF1] text-white font-bold px-6 py-3 text-sm hover:bg-[#5a3dd4] transition-colors">
            My reservations
          </Link>
          <Link href="/tours" className="rounded-full border border-black/10 font-bold px-6 py-3 text-sm hover:bg-neutral-50 transition-colors">
            Explore more tours
          </Link>
        </div>
        {bookingId && <p className="mt-6 text-xs text-neutral-500">Reservation #{bookingId}</p>}
      </div>
      <MainFooter />
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFB]" />}>
      <SuccessInner />
    </Suspense>
  );
}
