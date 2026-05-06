"use client";

import Link from "next/link";
import { useT } from "./LanguageProvider";

export default function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-vg-border bg-vg-bg-soft">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span className="font-black text-xl tracking-tight text-vibe-gradient">
                VibeGuide
              </span>
            </Link>
            <p className="mt-3 text-sm text-vg-muted max-w-md leading-relaxed">
              {t.footer.intro}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="#download"
                className="bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <span>📱</span> App Store
              </a>
              <a
                href="#download"
                className="bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <span>▶</span> Google Play
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-vg-ink mb-4">
              {t.footer.product}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#vibenow" className="text-vg-muted hover:text-vg-ink">VibeNow ⚡</a></li>
              <li><a href="#vibesquad" className="text-vg-muted hover:text-vg-ink">VibeSquad ✨</a></li>
              <li><a href="#how" className="text-vg-muted hover:text-vg-ink">{t.nav.how}</a></li>
              <li><a href="#guides" className="text-vg-muted hover:text-vg-ink">{t.nav.guides}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest text-vg-ink mb-4">
              {t.footer.company}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-vg-muted hover:text-vg-ink">{t.footer.about}</Link></li>
              <li><Link href="/contact" className="text-vg-muted hover:text-vg-ink">{t.footer.contact}</Link></li>
              <li><Link href="/privacy" className="text-vg-muted hover:text-vg-ink">{t.footer.privacy}</Link></li>
              <li><Link href="/terms" className="text-vg-muted hover:text-vg-ink">{t.footer.terms}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-vg-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-vg-muted">
            {t.footer.copyright.replace("{year}", String(new Date().getFullYear()))}
          </p>
          <p className="text-xs text-vg-muted">{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  );
}
