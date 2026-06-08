/** Renders an FAQ section + JSON-LD FAQPage schema for SEO rich snippets. */
import JsonLdScript from "@/components/JsonLdScript";

export type Faq = { q: string; a: string };

export default function CityFaqSchema({ city, faqs }: { city: string; faqs: Faq[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="py-20 bg-white">
      <JsonLdScript data={jsonLd} />
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6C4CF1] mb-4">FAQ</p>
        <h2 className="text-3xl md:text-4xl font-black mb-10 tracking-tight">
          {city} tour guide — frequently asked questions
        </h2>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <details key={i} className="group rounded-2xl border border-black/[0.06] bg-[#F7F7FB] overflow-hidden">
              <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-bold text-[#0A0A0F] list-none">
                {f.q}
                <span className="text-[#6C4CF1] transition-transform group-open:rotate-45 text-xl shrink-0 ml-3">+</span>
              </summary>
              <div className="px-5 pb-5 text-sm text-neutral-800 leading-7">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
