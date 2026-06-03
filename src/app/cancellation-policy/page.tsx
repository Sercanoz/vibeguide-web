import type { Metadata } from "next";
import LegalMarkdown from "@/components/LegalMarkdown";

export const metadata: Metadata = {
  alternates: { canonical: "/cancellation-policy" },
  title: "Cancellation & Refund Policy | VibeGuide",
  description: "VibeGuide's cancellation and refund terms for all experience types — VibeNow, VibeSquad and Private Tours.",
};

const BODY = `
At VibeGuide, we want every traveler to feel confident when booking an experience. This Cancellation & Refund Policy explains when and how you may cancel a booking and when refunds are available.

By completing a booking on VibeGuide, you agree to the terms below.

## 1. Standard Cancellation

You may cancel most experiences and receive a **full refund** if you cancel at least **24 hours** before the scheduled start time.

* **Cancelled 24 hours or more before start:** Full refund
* **Cancelled less than 24 hours before start:** No refund
* **No-show:** No refund

Refunds are issued to the original payment method.

## 2. Cancellations by the Guide or VibeGuide

If a guide, provider, or VibeGuide cancels an experience for any reason, you are always entitled to one of the following, at your choice where possible:

* A full refund, or
* An alternative date, or
* An equivalent experience with another verified guide.

## 3. Weather and Force Majeure

Some experiences depend on outdoor conditions. If an experience cannot be carried out safely due to severe weather, official restrictions, safety risks, natural events, transport disruptions, or other circumstances beyond our control, the experience may be rescheduled, modified, or cancelled.

In these cases we will offer, where possible, an alternative arrangement or an appropriate refund.

## 4. Late Arrival

Please arrive at the meeting point at the scheduled time. If you arrive late and the guide can no longer reasonably accommodate you, or you cannot be reached within a reasonable waiting period, the booking may be treated as a no-show and no refund will be due.

## 5. Third-Party Costs

Entrance fees to museums and historical sites, transport, food and beverages, and other third-party costs are generally **not included** unless explicitly stated. These third-party costs are non-refundable once incurred, even if part of the experience is later affected.

## 6. Group Experiences (VibeSquad)

Shared group experiences may require a minimum number of participants to take place. If the minimum is not met, the experience may be cancelled and you will receive a **full refund**, or you may join an alternative date where available.

## 7. How to Cancel

To cancel a booking, use the cancellation option in the VibeGuide app, or contact us at [support@vibeguideapp.com](mailto:support@vibeguideapp.com). The cancellation time is recorded based on when your request is received.

## 8. Refund Processing

Approved refunds are processed to your original payment method. Depending on your bank or payment provider, it may take several business days for the refunded amount to appear in your account. VibeGuide does not store your card details; all payments and refunds are handled by licensed payment providers.

## 9. Legal Note

For experiences scheduled for a specific date or period, the statutory right of withdrawal may not apply under applicable consumer protection law. This policy is offered as part of our customer-satisfaction commitment and does not limit any non-waivable rights you may have under the law that governs your booking.

## 10. Contact

Questions about a cancellation or refund? Reach us anytime at [support@vibeguideapp.com](mailto:support@vibeguideapp.com).

---

Related: [Pre-Information Form](/on-bilgilendirme) · [Distance Sales Agreement](/mesafeli-satis) · [Terms of Service](/terms)
`;

export default function CancellationPolicyPage() {
  return (
    <LegalMarkdown
      title="Cancellation & Refund Policy"
      subtitle="Last Updated: January 2, 2026"
      body={BODY}
    />
  );
}
