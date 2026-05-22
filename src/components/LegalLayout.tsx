"use client";

import LocaleSwitcher from "./LocaleSwitcher";

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
    <div className="min-h-screen bg-[#FAF7F0] text-[#171717]">
      {/* NAV — matches homepage v7 */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="text-2xl font-bold tracking-tight">VibeGuide</a>
        <div className="hidden gap-8 text-sm font-medium md:flex">
          <a href="/#vibenow">VibeNow</a>
          <a href="/#vibesquad">VibeSquad</a>
          <a href="/#private">Private Tours</a>
          <a href="/#destinations">Destinations</a>
          <a href="/#guides">For Guides</a>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <a href="/#download" className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white">
            Get the App
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="mx-auto max-w-3xl px-6 pt-10 pb-6 md:pt-16">
        <h1 className="text-4xl font-black tracking-tight leading-[1.05] md:text-5xl">
          {title}
        </h1>
        {lastUpdated && lastUpdatedLabel && (
          <p className="mt-4 text-xs font-bold uppercase tracking-widest text-neutral-500">
            {lastUpdatedLabel}: {lastUpdated}
          </p>
        )}
        {intro && (
          <p className="mt-6 text-base leading-7 text-neutral-700 md:text-lg">
            {intro}
          </p>
        )}
      </section>

      {/* CONTENT */}
      <article className="mx-auto max-w-3xl px-6 pb-20 prose-vg">
        {children}
      </article>

      {/* FOOTER — matches homepage v7 */}
      <footer className="mt-10 border-t border-black/10 px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr_1fr_1fr_1.5fr]">
            <div>
              <h3 className="text-xl font-black">VibeGuide</h3>
              <p className="mt-3 max-w-xs text-xs leading-5 text-neutral-600">
                Instant local guides, private tours, walking tours, group tours
                and authentic city experiences in Turkey.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-black">Product</h4>
              <ul className="mt-3 space-y-2 text-xs text-neutral-600">
                <li><a href="/#vibenow">VibeNow</a></li>
                <li><a href="/#vibesquad">VibeSquad</a></li>
                <li><a href="/#private">Private Tours</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black">Destinations</h4>
              <ul className="mt-3 space-y-2 text-xs text-neutral-600">
                <li>Istanbul Tours</li>
                <li>Cappadocia Tours</li>
                <li>Ephesus Tours</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-black">Support</h4>
              <ul className="mt-3 space-y-2 text-xs text-neutral-600">
                <li><a href="/help">Help Center</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/account-deletion">Account Deletion</a></li>
              </ul>
            </div>
            <div className="text-right">
              <p className="text-xs text-neutral-500">© 2026 VibeGuide. All rights reserved.</p>
              <p className="mt-3 text-[11px] leading-5 text-neutral-500">
                #istanbultours · #guideinistanbul · #turkeytour
                <br />#oldistanbultour · #privatetour · #localguide
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .prose-vg h2 {
          font-size: 1.25rem;
          font-weight: 800;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          color: #171717;
          letter-spacing: -0.01em;
        }
        .prose-vg p {
          color: #404040;
          line-height: 1.75;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }
        .prose-vg ul {
          list-style: disc;
          padding-left: 1.25rem;
          margin-bottom: 1rem;
        }
        .prose-vg ul li {
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
