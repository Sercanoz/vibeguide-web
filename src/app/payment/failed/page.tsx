"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";

const REASON_TEXT: Record<string, string> = {
  declined: "Your card was declined. No charge was made — please try again or use another card.",
  signature: "We couldn't verify the payment result. No charge was made.",
  complete_failed: "The payment could not be completed. No charge was made.",
  complete_error: "Something went wrong finalizing the payment. No charge was made.",
  mismatch: "This payment didn't match your reservation. No charge was made.",
  notfound: "We couldn't find your reservation. Please try again.",
  orderid: "Invalid payment reference. Please try again.",
};

function FailedInner() {
  const search = useSearchParams();
  const reason = search.get("reason") ?? "";
  const msg = REASON_TEXT[reason] ?? "The payment didn't go through. No charge was made.";

  return (
    <main className="min-h-screen bg-[#FAFAFB] text-[#0A0A0F]">
      <Navbar />
      <div className="mx-auto max-w-lg px-6 pt-32 pb-24 text-center">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <h1 className="text-3xl font-black">Payment not completed</h1>
        <p className="mt-3 text-neutral-700">{msg}</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/profile" className="rounded-full bg-[#6C4CF1] text-white font-bold px-6 py-3 text-sm hover:bg-[#5a3dd4] transition-colors">
            My reservations
          </Link>
          <Link href="/tours" className="rounded-full border border-black/10 font-bold px-6 py-3 text-sm hover:bg-neutral-50 transition-colors">
            Back to tours
          </Link>
        </div>
      </div>
      <MainFooter />
    </main>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFB]" />}>
      <FailedInner />
    </Suspense>
  );
}
