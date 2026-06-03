"use client";

import { useT } from "@/components/LanguageProvider";
import { homeTranslations } from "@/lib/home-i18n";
import { uiExtra } from "@/lib/ui-extra-i18n";
import { navbarI18n } from "@/lib/navbar-i18n";

/**
 * Sitenin tek footer'ı — ana sayfa, legal/support, mod ve atraksiyon sayfalarının
 * hepsinde kullanılır (tutarlı layout).
 */
export default function MainFooter() {
  const { locale } = useT();
  const t = homeTranslations[locale];
  const ux = uiExtra[locale] ?? uiExtra.en;
  const nb = navbarI18n[locale] ?? navbarI18n.en;

  return (
    <footer className="bg-white border-t border-black/[0.06] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[2fr_auto_auto_auto] md:justify-between">
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
            {/* App mağaza rozetleri — ikisi de kenardan kenara dolu SVG, aynı yükseklik
               (eşit görünür boyut). Google PNG yerine padding'siz Wikimedia SVG kullanıldı. */}
            <div className="mt-6 flex flex-col items-start gap-3">
              <a href="#" aria-label="Download on the App Store" className="block transition-opacity hover:opacity-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/app-store-badge.svg" alt="Download on the App Store" className="h-[52px] w-auto" />
              </a>
              <a href="#" aria-label="Get it on Google Play" className="block transition-opacity hover:opacity-80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/google-play-badge.svg" alt="Get it on Google Play" className="h-[52px] w-auto" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-black">{t.footer.product}</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-800">
              <li><a href="/vibenow" className="hover:text-black transition-colors">VibeNow</a></li>
              <li><a href="/vibesquad" className="hover:text-black transition-colors">VibeSquad</a></li>
              <li><a href="/private" className="hover:text-black transition-colors">{t.nav.private}</a></li>
              <li><a href="/tours" className="hover:text-black transition-colors">{nb.tours}</a></li>
              <li><a href="/how-it-works" className="hover:text-black transition-colors">{nb.howItWorks}</a></li>
              <li><a href="/guide-verification" className="hover:text-black transition-colors">{t.footerLinks.guideVerification}</a></li>
              <li><a href="/register/guide" className="hover:text-black transition-colors font-semibold text-emerald-600">{nb.becomeGuide}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black">{t.footer.support}</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-800">
              <li><a href="/about" className="hover:text-black transition-colors">{t.footerLinks.aboutUs}</a></li>
              <li><a href="/contact" className="hover:text-black transition-colors">{t.footerLinks.contact}</a></li>
              <li><a href="/help" className="hover:text-black transition-colors">{t.footerLinks.helpCenter}</a></li>
              <li><a href="/security" className="hover:text-black transition-colors">{ux.securityPayment}</a></li>
              <li><a href="/account-deletion" className="hover:text-black transition-colors">{t.footerLinks.accountDeletion}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-black">{ux.legal}</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-800">
              <li><a href="/terms" className="hover:text-black transition-colors">{ux.terms}</a></li>
              <li><a href="/privacy" className="hover:text-black transition-colors">{ux.privacy}</a></li>
              <li><a href="/cancellation-policy" className="hover:text-black transition-colors">{ux.cancellation}</a></li>
              <li><a href="/mesafeli-satis" className="hover:text-black transition-colors">{ux.distanceSales}</a></li>
              <li><a href="/on-bilgilendirme" className="hover:text-black transition-colors">{ux.preInfo}</a></li>
              <li><a href="/kvkk" className="hover:text-black transition-colors">{ux.kvkk}</a></li>
              <li><a href="/cerez-politikasi" className="hover:text-black transition-colors">{ux.cookies}</a></li>
            </ul>
          </div>
        </div>

        {/* Şirket bilgileri — PayTR / ödeme kuruluşu gerekliliği */}
        <div className="mt-12 pt-8 border-t border-black/[0.06]">
          <div className="grid gap-2 md:grid-cols-2 text-xs text-neutral-800 leading-6">
            <div>
              <p className="font-semibold text-neutral-700">VibeCore Turizm Seyahat Acentası ve Dijital Hizmetler Ticaret Ltd. Şti.</p>
              <p>Vergi No: 9251328389 · Vergi Dairesi: Marmaris V.D.</p>
              <p>Ticaret Sicil No: 12686</p>
              <p>Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4 Marmaris/Muğla, Türkiye</p>
            </div>
            <div className="md:text-right">
              <p>📧 <a href="mailto:support@vibeguideapp.com" className="hover:text-black transition-colors">support@vibeguideapp.com</a></p>
              <p>📞 <a href="tel:+905308287696" className="hover:text-black transition-colors">+90 530 828 76 96</a></p>
              <p>{ux.workingHours}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-700">{t.footer.copyright}</p>
            <p className="text-xs text-neutral-700">{ux.trustLine}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
