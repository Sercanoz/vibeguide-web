// Rezervasyon akışı adım göstergesi: Rehber seç → Talep gönder → Ödeme.
// current: 1..3 aktif adım; 4 = hepsi tamam (ödendi).

const STEPS: Record<string, string[]> = {
  en: ["Choose guide", "Send request", "Payment"],
  tr: ["Rehber seç", "Talep gönder", "Ödeme"],
};

export default function CheckoutSteps({ current, locale }: { current: 1 | 2 | 3 | 4; locale: string }) {
  const labels = STEPS[locale] ?? STEPS.en;
  return (
    <ol className="flex items-center gap-2 text-sm" aria-label={locale === "tr" ? "Rezervasyon adımları" : "Booking steps"}>
      {labels.map((label, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <li key={label} className="flex min-w-0 items-center gap-2" aria-current={active ? "step" : undefined}>
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
              done ? "bg-neutral-900 text-white" : active ? "border-2 border-neutral-900 text-neutral-900" : "border border-neutral-300 text-neutral-400"
            }`}>
              {done ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
              ) : n}
            </span>
            <span className={`truncate ${active ? "font-semibold text-neutral-900" : done ? "text-neutral-700" : "text-neutral-400"} ${active ? "" : "hidden sm:inline"}`}>{label}</span>
            {n < labels.length && <span className="mx-1 h-px w-6 shrink-0 bg-neutral-300 sm:w-10" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
