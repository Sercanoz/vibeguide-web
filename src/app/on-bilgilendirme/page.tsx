import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ön Bilgilendirme Formu | VibeGuide",
  description: "VibeGuide ön bilgilendirme formu — mesafeli sözleşme öncesi tüketici bilgilendirmesi.",
};

export default function OnBilgilendirmePage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <nav className="border-b border-black/[0.06] px-6 h-16 flex items-center">
        <Link href="/" className="text-xl font-black tracking-tight">VibeGuide</Link>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-black mb-2">Ön Bilgilendirme Formu</h1>
        <p className="text-sm text-neutral-400 mb-2">6502 Sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği kapsamında</p>
        <p className="text-sm text-neutral-400 mb-10">Son güncelleme: Ocak 2026</p>

        <div className="space-y-8 text-sm text-neutral-700 leading-7">

          <section>
            <h2 className="font-black text-base mb-3">1. SATICI BİLGİLERİ</h2>
            <div className="bg-neutral-50 rounded-xl p-5 space-y-1">
              <p><strong>Unvan:</strong> VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ</p>
              <p><strong>Adres:</strong> Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4 Marmaris/Muğla, Türkiye</p>
              <p><strong>Vergi No:</strong> 9251328389 · <strong>Vergi Dairesi:</strong> Marmaris V.D.</p>
              <p><strong>Ticaret Sicil No:</strong> 12686</p>
              <p><strong>E-posta:</strong> support@vibeguideapp.com</p>
              <p><strong>Telefon:</strong> +90 530 828 76 96</p>
              <p><strong>Çalışma saatleri:</strong> Hafta içi 09:00 – 18:00 (UTC+3)</p>
            </div>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">2. HİZMETİN TEMEL NİTELİKLERİ</h2>
            <p>VibeGuide; doğrulanmış yerel rehberlerle anlık (VibeNow), grup bazlı (VibeSquad) ve özel planlı (Private Tour) şehir deneyimleri sunan dijital bir turizm rezervasyon platformudur. Her hizmetin kapsamı, süresi, buluşma noktası, dahil ve dahil olmayan unsurlar rezervasyon öncesinde Alıcı'ya açıkça bildirilir.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">3. TOPLAM FİYAT</h2>
            <p>Hizmet bedeli, KDV dahil olmak üzere, rezervasyon ekranında satın alma işlemi tamamlanmadan önce gösterilir. Bilet ücreti, ulaşım, yemek-içecek veya üçüncü taraf hizmetleri ayrıca ücretlendirilir ve bu hizmetlere ait koşullar ilgili sağlayıcı tarafından belirlenir.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">4. ÖDEME VE TESLİMAT KOŞULLARI</h2>
            <p>Ödeme, güvenli ödeme altyapısı üzerinden anlık olarak alınır. Hizmet, belirlenen tarih, saat ve buluşma noktasında sunulur. Alıcı, onay bilgilerini uygulama üzerinden ve/veya e-posta ile alır.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">5. CAYMA HAKKI</h2>
            <p>Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesi uyarınca, belirli bir tarih/dönem için yapılan turizm rezervasyonlarında cayma hakkı uygulanmaz.</p>
            <p className="mt-2">Bununla birlikte VibeGuide, deneyim başlangıcından en az <strong>24 saat önce</strong> yapılan iptallerde tam iade sağlamaktadır. Ayrıntılar için <Link href="/cancellation-policy" className="underline text-[#6C4CF1]">İptal ve İade Politikası</Link>'na bakınız.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">6. ŞİKAYET VE UYUŞMAZLIK</h2>
            <p>Şikayetler için: <a href="mailto:support@vibeguideapp.com" className="underline text-[#6C4CF1]">support@vibeguideapp.com</a></p>
            <p className="mt-1">Uyuşmazlık durumunda ilgili Tüketici Hakem Heyeti veya Tüketici Mahkemesi'ne başvurulabilir. Ayrıca e-Devlet üzerinden TÜBİS'e başvuru yapılabilir.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">7. ONAY</h2>
            <p>Alıcı, rezervasyonu tamamlayarak bu ön bilgilendirme formunu okuduğunu, anladığını ve kabul ettiğini beyan eder.</p>
          </section>

        </div>
      </div>
    </main>
  );
}
