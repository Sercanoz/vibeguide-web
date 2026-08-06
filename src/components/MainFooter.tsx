"use client";

import { useT } from "@/components/LanguageProvider";
import { homeTranslations } from "@/lib/home-i18n";
import { uiExtra } from "@/lib/ui-extra-i18n";
import { navbarI18n } from "@/lib/navbar-i18n";
import { DESTINATIONS, cityGuideHref } from "@/lib/destinations";
import { ATTRACTION_LANGS, ATTR_HUB } from "@/lib/attractions";
import { BLOG_HUB, isBlogLang } from "@/lib/blog";

/**
 * Sitenin tek footer'ı — ana sayfa, legal/support, mod ve atraksiyon sayfalarının
 * hepsinde kullanılır (tutarlı layout).
 */
export default function MainFooter() {
  const { locale } = useT();
  const t = homeTranslations[locale];
  const ux = uiExtra[locale] ?? uiExtra.en;
  const nb = navbarI18n[locale] ?? navbarI18n.en;
  // Atraksiyon hub'ı sadece 11 attraction dilinde var; dışındaysa EN'e düş.
  const hubLang = ((ATTRACTION_LANGS as readonly string[]).includes(locale)
    ? locale
    : "en") as (typeof ATTRACTION_LANGS)[number];

  return (
    <footer className="bg-white border-t border-black/[0.06] px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[2fr_auto_auto_auto_auto] md:justify-between">
          <div>
            <h3 className="flex items-center gap-2.5 text-xl font-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/vibeguide-icon.png" alt="VibeGuide" width={28} height={28} style={{ mixBlendMode: "multiply" }} />
              VibeGuide
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-neutral-800">{t.footer.tagline}</p>
            {/* Sosyal hesaplar açılınca gerçek URL'lerle geri eklenecek — boş
               href="#" ikonlar (ölü link) kaldırıldı. */}
            {/* App mağaza rozetleri — uygulama henüz store'da olmadığı için "yakında"
               durumunda: tıklanabilir ölü link yerine bilgilendirici, id="download"
               ile CTA'ların (/#download) indiği gerçek bir hedef. */}
            <div id="download" className="mt-6 flex flex-col items-start gap-3 scroll-mt-24">
              <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
                {locale === "tr" ? "Yakında App Store & Google Play" : "Coming soon to App Store & Google Play"}
              </p>
              <div className="flex flex-col items-start gap-3 opacity-60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/app-store-badge.svg" alt="Coming soon on the App Store" className="h-[52px] w-auto" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/google-play-badge.svg" alt="Coming soon on Google Play" className="h-[52px] w-auto" />
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-black">{nb.destinations}</h4>
            <ul className="mt-4 space-y-3 text-sm text-neutral-800">
              {DESTINATIONS.map((d) => (
                <li key={d.slug}>
                  <a href={cityGuideHref(d.slug, locale)} className="hover:text-black transition-colors">
                    {d.name}
                  </a>
                </li>
              ))}
              <li>
                <a href={`/attractions/${hubLang}`} className="hover:text-black transition-colors font-semibold text-[#6C4CF1]">
                  {ATTR_HUB[hubLang].h1} →
                </a>
              </li>
            </ul>
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
              <li><a href={`/blog/${isBlogLang(locale) ? locale : "en"}`} className="hover:text-black transition-colors">{BLOG_HUB[isBlogLang(locale) ? locale : "en"].h1}</a></li>
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
              <li>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new Event("vg:open-cookie-settings"))}
                  className="hover:text-black transition-colors text-left"
                >
                  {locale === "tr" ? "Çerez ayarları" : "Cookie settings"}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Şirket bilgileri — PayTR / ödeme kuruluşu gerekliliği */}
        <div className="mt-12 pt-8 border-t border-black/[0.06]">
          <div className="grid gap-2 md:grid-cols-2 text-xs text-neutral-800 leading-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-500 mb-0.5">{locale === "tr" ? "Platform işletmecisi" : "Platform operator"}</p>
              <p className="font-semibold text-neutral-700">{locale === "tr" ? "VibeCore Turizm Seyahat Acentası ve Dijital Hizmetler Ticaret Ltd. Şti." : "VibeCore Tourism Travel Agency and Digital Services Trade Co. Ltd."}</p>
              <p>{locale === "tr" ? "Vergi No" : "Tax No"}: 9251328389 · {locale === "tr" ? "Vergi Dairesi" : "Tax Office"}: {locale === "tr" ? "Marmaris V.D." : "Marmaris Tax Office"}</p>
              <p>{locale === "tr" ? "Ticaret Sicil No" : "Trade Registry No"}: 12686</p>
              <p>Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4 Marmaris/Muğla, {locale === "tr" ? "Türkiye" : "Türkiye"}</p>
            </div>
            <div className="md:text-right">
              <p>📧 <a href="mailto:support@vibeguideapp.com" className="hover:text-black transition-colors">support@vibeguideapp.com</a></p>
              <p>📞 <a href="tel:+905308287696" className="hover:text-black transition-colors">+90 530 828 76 96</a></p>
              <p>{ux.workingHours}</p>
            </div>
          </div>

          {/* Seyahat operasyonları — hizmetleri yürüten TÜRSAB A Grubu acente (1618 s.k.
             yasal zorunluluk + şeffaflık; VibeCore platformu işletir, acente seyahati organize eder). */}
          <div className="mt-6 rounded-2xl bg-[#F7F7FB] border border-black/[0.06] p-4 text-xs text-neutral-800 leading-6">
            <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-500 mb-1">{locale === "tr" ? "Seyahat operasyonları" : "Travel operations"}</p>
            {locale === "tr" ? (
              <p>
                Tur, rezervasyon ve seyahat hizmetleri, TÜRSAB A Grubu Seyahat Acentası{" "}
                <span className="font-semibold text-neutral-700">Anadolu Tur. Sey. Tur. Tic. Ltd. Şti.</span>{" "}
                (Helliantus Anadolu Tours, TÜRSAB Belge No: <span className="font-semibold text-neutral-700">5058</span>) tarafından organize edilmekte ve yürütülmektedir. Adres: Cumhuriyet Mah., İnönü Bulvarı, Şeref Gedik İş Merkezi, Kuşadası/Aydın.
              </p>
            ) : (
              <p>
                Tours, bookings and travel services offered through VibeGuide are organized and operated by{" "}
                <span className="font-semibold text-neutral-700">Anadolu Tur. Sey. Tur. Tic. Ltd. Şti.</span>{" "}
                (Helliantus Anadolu Tours), a TÜRSAB A Group Travel Agency (License No. <span className="font-semibold text-neutral-700">5058</span>). Address: Cumhuriyet Mah., İnönü Bulvarı, Şeref Gedik İş Merkezi, Kuşadası/Aydın, Türkiye.
              </p>
            )}
          </div>

          {/* Ödeme güvenliği logoları — Visa, Mastercard, Amex, Troy */}
          <div className="mt-8 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/visamastercard.jpg"
              alt="Mastercard · Visa · American Express · Troy"
              className="h-7 w-auto opacity-90"
            />
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
