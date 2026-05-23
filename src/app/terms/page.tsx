"use client";

import LegalLayout from "@/components/LegalLayout";
import { useT } from "@/components/LanguageProvider";
import { terms, extendedLocale, LAST_UPDATED } from "@/lib/legal-content";

export default function TermsPage() {
  const { locale } = useT();
  const c = terms[extendedLocale(locale)];
  return (
    <LegalLayout
      title={c.pageTitle}
      lastUpdated={LAST_UPDATED}
      lastUpdatedLabel={c.lastUpdatedLabel}
      intro={c.intro}
    >
      {c.sections.map((s, i) => (
        <section key={i}>
          <h2>{s.h}</h2>
          {s.p && <p>{s.p}</p>}
          {s.list && (
            <ul>
              {s.list.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </LegalLayout>
  );
}
