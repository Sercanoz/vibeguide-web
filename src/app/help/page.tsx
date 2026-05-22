"use client";

import LegalLayout from "@/components/LegalLayout";
import { useT } from "@/components/LanguageProvider";
import { help, legalLocale, LAST_UPDATED } from "@/lib/legal-content";

export default function HelpPage() {
  const { locale } = useT();
  const c = help[legalLocale(locale)];
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
          {s.steps && (
            <ol>
              {s.steps.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ol>
          )}
          {s.list && (
            <ul>
              {s.list.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          )}
          {s.p2 && <p>{s.p2}</p>}
        </section>
      ))}
    </LegalLayout>
  );
}
