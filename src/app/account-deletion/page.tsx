"use client";

import LegalLayout from "@/components/LegalLayout";
import { useT } from "@/components/LanguageProvider";
import {
  accountDeletion,
  legalLocale,
  SUPPORT_EMAIL,
} from "@/lib/legal-content";

export default function AccountDeletionPage() {
  const { locale } = useT();
  const c = accountDeletion[legalLocale(locale)];

  const subject =
    locale === "tr"
      ? "Hesap silme talebi"
      : "Account deletion request";
  const body =
    locale === "tr"
      ? "Merhaba,\n\nVibeGuide hesabımın kalıcı olarak silinmesini talep ediyorum. Lütfen kayıtlı e-posta adresimi onaylayıp 30 gün içinde tamamlayın.\n\nKayıtlı e-posta: \nKayıtlı telefon (varsa): \n\nTeşekkürler."
      : "Hello,\n\nI would like to permanently delete my VibeGuide account. Please verify my registered email and complete the deletion within 30 days.\n\nRegistered email: \nRegistered phone (optional): \n\nThank you.";

  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <LegalLayout title={c.pageTitle} intro={c.intro}>
      <section>
        <h2>{c.inAppHeading}</h2>
        <ol className="space-y-2 list-decimal pl-5 text-vg-muted leading-relaxed">
          {c.inAppSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-vg-muted italic">{c.inAppNote}</p>
      </section>

      <section>
        <h2>{c.webHeading}</h2>
        <p>{c.webBody}</p>

        <div className="mt-5 rounded-2xl bg-vg-bg-soft border border-vg-border p-5">
          <p className="text-xs font-black uppercase tracking-widest text-vg-muted">
            {c.formEmailLabel}
          </p>
          <p className="mt-1 text-lg font-black text-vg-ink break-all">
            {SUPPORT_EMAIL}
          </p>
          <p className="mt-4 text-xs font-black uppercase tracking-widest text-vg-muted">
            {c.formReasonLabel}
          </p>
          <p className="mt-1 text-base font-bold text-vg-ink">
            {locale === "tr"
              ? "Hesap silme talebi"
              : "Account deletion request"}
          </p>
          <a
            href={mailto}
            className="mt-5 inline-flex items-center gap-2 bg-vibe-gradient text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform"
          >
            ✉️ {c.formSubmit}
          </a>
        </div>
      </section>

      <section>
        <h2>{c.whatHappensHeading}</h2>
        <ul>
          {c.whatHappensList.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{c.retentionHeading}</h2>
        <p>{c.retentionBody}</p>
      </section>

      <p className="mt-10 text-sm text-vg-muted">{c.contactBody}</p>
    </LegalLayout>
  );
}
