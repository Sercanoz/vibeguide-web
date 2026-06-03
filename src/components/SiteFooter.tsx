"use client";

import { useT } from "@/components/LanguageProvider";
import { homeTranslations } from "@/lib/home-i18n";

export default function SiteFooter() {
  const { locale } = useT();
  const t = homeTranslations[locale];

  return (
    <footer className="bg-[#F7F7FB] border-t border-black/[0.06] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[2.5fr_1fr_1fr_1fr]">
          <div>
            <h3 className="flex items-center gap-2.5 text-xl font-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/vibeguide-icon.png" alt="VibeGuide" width={28} height={28} style={{ mixBlendMode: "multiply" }} />
              VibeGuide
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-800">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-2">
              {["Instagram", "TikTok", "YouTube"].map((s) => (
                <a key={s} href="#" className="h-9 w-9 flex items-center justify-center rounded-xl bg-white border border-black/8 text-xs font-bold text-neutral-800 hover:text-black hover:border-black/20 transition-colors">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-black">{t.footer.product}</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-800">
              <li><a href="/#modes" className="hover:text-black transition-colors">VibeNow</a></li>
              <li><a href="/#modes" className="hover:text-black transition-colors">VibeSquad</a></li>
              <li><a href="/#modes" className="hover:text-black transition-colors">{t.nav.private}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black">{t.footer.destinations}</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-800">
              <li><a href="/istanbul-tour-guide" className="hover:text-black transition-colors">Istanbul Tour Guide</a></li>
              <li><a href="/cappadocia-tour-guide" className="hover:text-black transition-colors">Cappadocia Tour Guide</a></li>
              <li><a href="/ephesus-tour-guide" className="hover:text-black transition-colors">Ephesus Tour Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black">{t.footer.support}</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-800">
              <li><a href="/help" className="hover:text-black transition-colors">{t.footerLinks.helpCenter}</a></li>
              <li><a href="/terms" className="hover:text-black transition-colors">{t.footerLinks.terms}</a></li>
              <li><a href="/privacy" className="hover:text-black transition-colors">{t.footerLinks.privacy}</a></li>
              <li><a href="/account-deletion" className="hover:text-black transition-colors">{t.footerLinks.accountDeletion}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-black/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-700">{t.footer.copyright}</p>
          <p className="text-xs text-neutral-200">#istanbultours · #guideinistanbul · #turkeytour · #localguide</p>
        </div>
      </div>
    </footer>
  );
}
