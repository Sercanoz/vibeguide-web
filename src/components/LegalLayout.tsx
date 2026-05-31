"use client";

import Navbar from "./Navbar";
import MainFooter from "./MainFooter";

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
    <div className="min-h-screen bg-white text-[#0A0A0F] antialiased">
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-3xl px-6 pt-28 pb-6 md:pt-32">
        <h1 className="text-4xl font-black tracking-tight leading-[1.05] md:text-5xl text-[#0A0A0F]">
          {title}
        </h1>
        {lastUpdated && lastUpdatedLabel && (
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-400">
            {lastUpdatedLabel}: {lastUpdated}
          </p>
        )}
        {intro && (
          <p className="mt-6 text-base leading-7 text-neutral-600 md:text-lg">
            {intro}
          </p>
        )}
      </section>

      {/* CONTENT */}
      <article className="mx-auto max-w-3xl px-6 pb-24 prose-vg">
        {children}
      </article>

      <MainFooter />

      <style jsx global>{`
        .prose-vg h2 {
          font-size: 1.15rem;
          font-weight: 800;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          color: #0A0A0F;
          letter-spacing: -0.01em;
        }
        .prose-vg p {
          color: #404040;
          line-height: 1.75;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }
        .prose-vg ul, .prose-vg ol {
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .prose-vg ul {
          list-style: disc;
        }
        .prose-vg ol {
          list-style: decimal;
        }
        .prose-vg ul li, .prose-vg ol li {
          color: #404040;
          line-height: 1.7;
          margin-bottom: 0.45rem;
          font-size: 0.95rem;
        }
        .prose-vg a {
          color: #6c4cf1;
          font-weight: 600;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
