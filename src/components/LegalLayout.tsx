"use client";

import Nav from "./Nav";
import Footer from "./Footer";

export default function LegalLayout({
  title,
  lastUpdated,
  lastUpdatedLabel,
  intro,
  children,
}: {
  title: string;
  lastUpdated?: string;
  lastUpdatedLabel?: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-vg-primary/15 blur-3xl" />
            <div className="absolute top-40 -right-40 w-[420px] h-[420px] rounded-full bg-vg-flame/10 blur-3xl" />
          </div>
          <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-12 pb-6 md:pt-20">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05]">
              <span className="text-vibe-gradient">{title}</span>
            </h1>
            {lastUpdated && lastUpdatedLabel && (
              <p className="mt-3 text-xs font-bold uppercase tracking-widest text-vg-muted">
                {lastUpdatedLabel}: {lastUpdated}
              </p>
            )}
            {intro && (
              <p className="mt-6 text-lg text-vg-muted leading-relaxed">
                {intro}
              </p>
            )}
          </div>
        </section>
        <article className="max-w-3xl mx-auto px-5 sm:px-8 pb-20 prose-vg">
          {children}
        </article>
      </main>
      <Footer />

      <style jsx global>{`
        .prose-vg h2 {
          font-size: 1.35rem;
          font-weight: 800;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          color: var(--vg-ink);
          letter-spacing: -0.01em;
        }
        .prose-vg p {
          color: var(--vg-muted);
          line-height: 1.75;
          margin-bottom: 0.75rem;
          font-size: 1rem;
        }
        .prose-vg ul {
          list-style: disc;
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .prose-vg ul li {
          color: var(--vg-muted);
          line-height: 1.7;
          margin-bottom: 0.45rem;
          font-size: 1rem;
        }
        .prose-vg a {
          color: var(--vg-primary);
          font-weight: 600;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
