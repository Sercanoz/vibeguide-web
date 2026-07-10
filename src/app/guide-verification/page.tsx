import type { Metadata } from "next";
import LegalMarkdown from "@/components/LegalMarkdown";

export const metadata: Metadata = {
  alternates: { canonical: "/guide-verification" },
  title: "Guide Verification",
  description:
    "Every guide on VibeGuide goes through identity verification, professional credential checks and platform quality standards before joining.",
};

const BODY = `
## Every guide is vetted before joining the platform

VibeGuide does not allow unverified guides to offer services through the platform.

Founded by licensed professional tourist guides, VibeGuide applies a structured verification process to protect service quality, traveler trust and operational reliability.

Every guide must complete the relevant verification and review processes before accepting bookings through the platform.

## 🪪 Identity Verification

A guide's identity is verified before they are admitted to the platform.

Where necessary, additional verification documents may be requested and security checks may be performed.

This process helps protect platform safety and prevent fake accounts.

## 🎓 Professional Verification

Guides may be reviewed for their professional background, destination knowledge, guiding experience and compliance with applicable tourism legislation.

Where legally required, the following may be verified:

* Professional tourist guide license (cockade)
* Official guiding authorizations
* Professional licenses
* Related documents and certificates

## 🗣️ Language Authorization

Professional tourist guides on VibeGuide may only provide guiding services in the languages listed on their official tourist guide license.

These language authorizations are determined through official qualification processes under the legislation of the Republic of Türkiye and assessments carried out by the relevant institutions.

VibeGuide may verify the language authorizations listed on guides' official tourist guide documents and licenses.

This helps travelers receive their experience in the language they selected at booking.

## 🗺️ Route and Experience Suitability

Guides may be matched with experiences based on their areas of expertise, destination knowledge, language authorizations and operational availability.

The goal is for travelers to meet guides who know the region they are visiting well.

## 📋 Platform Standards

Every guide must review and accept the following policies and rules:

* Service quality standards
* Code of conduct towards travelers
* Cancellation and booking rules
* Communication standards
* Platform usage rules
* Operational procedures

Failure to comply with these standards may result in account restrictions, suspension or termination of platform access.

## 🛡️ Safety and Trust Standards

Traveler safety and professional conduct are core priorities of the platform.

Guides are expected to:

* Act in accordance with applicable legislation
* Follow platform rules
* Maintain professional service standards
* Provide travelers with a respectful and safe experience

## Ongoing Review

Verification does not end at onboarding.

Guide accounts may be reviewed regularly against the following criteria:

* Completion rates
* On-time attendance performance
* User feedback
* Operational reliability indicators
* Policy compliance

Guides who do not meet platform standards may have their accounts restricted, suspended or removed from the platform.

## Trust Starts Before You Even Meet Your Guide

Our guide verification process is designed to help travelers feel confident before they even book.

By combining identity verification, professional verification, official language authorizations, operational reviews and ongoing quality checks, VibeGuide helps travelers book safer, more transparent and higher-quality experiences.

---

Related documents: [Help Center](/help) · [Safety & Payments](/security) · [Terms of Service](/terms) · [Privacy Policy](/privacy)
`;

export default function GuideVerificationPage() {
  return (
    <LegalMarkdown
      title="Guide Verification"
      body={BODY}
    />
  );
}
