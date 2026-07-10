import type { Metadata } from "next";
import LegalMarkdown from "@/components/LegalMarkdown";

export const metadata: Metadata = {
  alternates: { canonical: "/how-it-works" },
  title: "How It Works",
  description:
    "How booking a VibeGuide tour works, step by step — from choosing an experience to meeting your verified local guide.",
};

const BODY = `
## The booking process, step by step

VibeGuide is a digital tourism booking platform built on verified guides, predefined experiences, secure payment infrastructure and supported operational processes.

## 1. Choose Your Experience

Pick the experience that suits you from city tours, cultural walks, museum experiences, food routes and private tours.

For every experience, the following is clearly presented before you book:

* What the experience covers
* Duration
* Guide language
* Meeting point
* Participation conditions
* Pricing details

## 2. Create Your Booking

Create your booking by selecting the date, time, language and number of participants.

Payments are processed through secure, licensed payment institutions.

Once your booking is complete, your confirmation details are sent to you.

## 3. Guide Matching and Verification

Every guide on the platform goes through VibeGuide's verification processes.

Depending on the case, verification may include:

* Identity verification
* Professional credential checks
* Licensed tourist guide (cockade) verification
* Confirmation of language authorizations
* Acceptance of platform standards

Guides are only assigned or matched to experiences within their expertise and availability.

## 4. Receive Your Meeting Details

After your booking is confirmed, the following is shared with you:

* Meeting point
* Start time
* Experience details
* Guide information (where applicable)

So you have everything you need before the experience begins.

## 5. Explore the City with a Local Expert

Meet your guide and start your experience.

VibeGuide experiences are built on genuine local knowledge, delivered by local experts and professional tourist guides who know the destination inside out.

The goal is to go beyond standard tourist narratives and offer more meaningful, more personal and more authentic experiences.

## 6. Support and Resolution

If a delay, cancellation or operational issue occurs, VibeGuide's support process steps in.

Depending on the situation, one of the following may be offered:

* An alternative guide
* An alternative date
* An alternative experience
* A refund

All bookings are subject to the published [Cancellation & Refund Policy](/cancellation-policy).

## 🔒 A Safe and Supported Experience

Bookings made through VibeGuide are backed by:

* Secure payment infrastructure
* Verified guides
* Transparent pricing
* Published policies
* Customer support
* Dispute resolution processes

Payments are processed through licensed payment institutions.

Guide verification, booking management, customer support and operational coordination are handled by VibeGuide.

---

Related documents: [Guide Verification](/guide-verification) · [Safety & Payments](/security) · [Help Center](/help) · [Cancellation & Refund Policy](/cancellation-policy)
`;

export default function HowItWorksPage() {
  return (
    <LegalMarkdown
      title="How It Works"
      body={BODY}
    />
  );
}
