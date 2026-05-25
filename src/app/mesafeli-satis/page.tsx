import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi | VibeGuide",
  description: "VibeGuide mesafeli satış sözleşmesi — 6502 sayılı Tüketicinin Korunması Hakkında Kanun kapsamında.",
};

export default function MesafeliSatisPage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <nav className="border-b border-black/[0.06] px-6 h-16 flex items-center">
        <Link href="/" className="text-xl font-black tracking-tight">VibeGuide</Link>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-black mb-2">Mesafeli Satış Sözleşmesi</h1>
        <p className="text-sm text-neutral-400 mb-10">Son güncelleme: Ocak 2026</p>

        <div className="space-y-8 text-sm text-neutral-700 leading-7">

          <section>
            <h2 className="font-black text-base mb-3">MADDE 1 — TARAFLAR</h2>
            <div className="space-y-2">
              <p><strong>SATICI:</strong></p>
              <p>Unvan: VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ</p>
              <p>Adres: Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4 Marmaris/Muğla, Türkiye</p>
              <p>Vergi No: 9251328389 · Vergi Dairesi: Marmaris V.D.</p>
              <p>Ticaret Sicil No: 12686</p>
              <p>E-posta: support@vibeguideapp.com</p>
              <p className="mt-4"><strong>ALICI:</strong> VibeGuide uygulaması veya web sitesi üzerinden rezervasyon yapan kullanıcı.</p>
            </div>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">MADDE 2 — KONU</h2>
            <p>Bu sözleşme, Alıcı'nın VibeGuide platformu üzerinden satın aldığı turizm ve rehberlik hizmetlerine ilişkin koşulları düzenlemektedir. Söz konusu hizmetler; VibeNow (anlık rehber eşleşmesi), VibeSquad (grup deneyimi) ve Özel Tur (planlı özel rehberlik) kategorilerini kapsar.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">MADDE 3 — HİZMET BİLGİLERİ</h2>
            <p>Satın alınan hizmetin türü, kapsamı, süresi, buluşma noktası, dil seçeneği ve fiyatı rezervasyon tamamlanmadan önce Alıcı'ya açıkça gösterilir. Hizmetin temel nitelikleri uygulama ve web sitesi üzerinden her zaman erişilebilir durumdadır.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">MADDE 4 — FİYAT VE ÖDEME</h2>
            <p>Hizmet bedeli, rezervasyon ekranında KDV dahil olarak gösterilir. Ödeme, güvenli ödeme altyapısı üzerinden kredi kartı veya diğer desteklenen yöntemlerle alınır. Kart bilgileri VibeGuide sunucularında saklanmaz.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">MADDE 5 — TESLİMAT</h2>
            <p>Hizmet, rezervasyon onayının ardından belirlenen tarih, saat ve buluşma noktasında sunulur. Alıcı, rezervasyon onay bilgilerini uygulama üzerinden ve/veya e-posta ile alır.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">MADDE 6 — CAYMA HAKKI</h2>
            <p>6502 sayılı Kanun'un 15. maddesi uyarınca, belirli bir tarih veya dönem için gerçekleştirilecek konaklama, taşımacılık, araç kiralama, yiyecek-içecek tedariki ve eğlence veya dinlenme amacıyla yapılan rezervasyonlarda cayma hakkı kullanılamaz.</p>
            <p className="mt-2">Ancak VibeGuide, deneyim başlangıcından en az 24 saat önce yapılan iptallerde tam iade sağlamaktadır. Ayrıntılar için <Link href="/cancellation-policy" className="underline text-[#6C4CF1]">İptal ve İade Politikası</Link>'na bakınız.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">MADDE 7 — UYUŞMAZLIK ÇÖZÜMÜ</h2>
            <p>Bu sözleşmeden doğan uyuşmazlıklarda Türk hukuku geçerlidir. Tüketici şikayetleri için ilgili Tüketici Hakem Heyeti veya Tüketici Mahkemesi'ne başvurulabilir. Ayrıca e-Devlet üzerinden Tüketici Bilgi Sistemi'ne (TÜBİS) başvuru yapılabilir.</p>
          </section>

          <div className="p-5 bg-neutral-50 rounded-xl">
            <p>İletişim: <a href="mailto:support@vibeguideapp.com" className="underline text-[#6C4CF1]">support@vibeguideapp.com</a> · Hafta içi 09:00–18:00</p>
          </div>
        </div>
      </div>
    </main>
  );
}
