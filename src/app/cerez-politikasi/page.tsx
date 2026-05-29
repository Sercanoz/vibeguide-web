import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Çerez Politikası | VibeGuide",
  description: "VibeGuide web sitesinde kullanılan çerezler ve çerez tercihleri hakkında bilgilendirme.",
};

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <nav className="border-b border-black/[0.06] px-6 h-16 flex items-center">
        <Link href="/" className="text-xl font-black tracking-tight">VibeGuide</Link>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-black mb-2">Çerez Politikası</h1>
        <p className="text-sm text-neutral-400 mb-10">Son güncelleme: Ocak 2026</p>

        <div className="space-y-8 text-sm text-neutral-700 leading-7">

          <section>
            <h2 className="font-black text-base mb-3">1 — ÇEREZ NEDİR?</h2>
            <p>Çerezler (cookies), web sitelerini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Bu dosyalar, sitenin düzgün çalışması, tercihlerinizin hatırlanması ve kullanım istatistiklerinin toplanması için kullanılır.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">2 — KULLANDIĞIMIZ ÇEREZ TÜRLERİ</h2>

            <div className="mt-3 space-y-4">
              <div className="rounded-2xl border border-black/[0.06] p-4">
                <p className="font-bold text-[#0A0A0F]">Zorunlu Çerezler <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">Her zaman aktif</span></p>
                <p className="mt-1 text-xs text-neutral-500">Sitenin temel işlevleri için gereklidir. Dil tercihiniz (vg_locale), oturum yönetimi ve çerez onayınız (vg_cookie_consent) bu kapsamdadır. Devre dışı bırakılamaz.</p>
              </div>

              <div className="rounded-2xl border border-black/[0.06] p-4">
                <p className="font-bold text-[#0A0A0F]">Analitik Çerezler <span className="ml-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6C4CF1]/10 text-[#6C4CF1]">Opsiyonel</span></p>
                <p className="mt-1 text-xs text-neutral-500">Google Analytics aracılığıyla, ziyaretçilerin siteyi nasıl kullandığını anonim olarak ölçeriz (hangi sayfalar görüntülendi, hangi ülkeden gelindi vb.). Bu çerezler yalnızca açık onayınızla etkinleşir.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">3 — ÇEREZ TERCİHLERİNİZ</h2>
            <p>Siteye ilk girişinizde gösterilen çerez bildirimi üzerinden analitik çerezleri kabul edebilir veya reddedebilirsiniz. Onay vermemeniz halinde yalnızca zorunlu çerezler kullanılır ve analitik veri toplanmaz.</p>
            <p className="mt-2">Tarayıcınızın ayarlarından da çerezleri istediğiniz zaman silebilir veya engelleyebilirsiniz. Ancak zorunlu çerezlerin engellenmesi sitenin bazı bölümlerinin düzgün çalışmamasına yol açabilir.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">4 — ÜÇÜNCÜ TARAF ÇEREZLERİ</h2>
            <p>Analitik amaçla Google Analytics kullanmaktayız. Google&rsquo;ın veri işleme uygulamaları hakkında bilgi için Google Gizlilik Politikası&rsquo;na başvurabilirsiniz. Ödeme işlemleri sırasında, lisanslı ödeme kuruluşu kendi çerezlerini kullanabilir.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">5 — İLETİŞİM</h2>
            <p>Çerez politikamız hakkında sorularınız için: <a href="mailto:support@vibeguideapp.com" className="text-[#6C4CF1] font-semibold">support@vibeguideapp.com</a></p>
          </section>

          <div className="pt-6 border-t border-black/[0.06] text-xs text-neutral-400">
            <p>İlgili belgeler:
              {" "}<Link href="/privacy" className="text-[#6C4CF1]">Gizlilik Politikası</Link> ·
              {" "}<Link href="/kvkk" className="text-[#6C4CF1]">KVKK Aydınlatma Metni</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
