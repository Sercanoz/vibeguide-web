import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | VibeGuide",
  description: "VibeGuide kişisel verilerin korunması (KVKK 6698) aydınlatma metni.",
};

export default function KvkkPage() {
  return (
    <main className="min-h-screen bg-white text-[#0A0A0F]">
      <nav className="border-b border-black/[0.06] px-6 h-16 flex items-center">
        <Link href="/" className="text-xl font-black tracking-tight">VibeGuide</Link>
      </nav>

      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-black mb-2">KVKK Aydınlatma Metni</h1>
        <p className="text-sm text-neutral-400 mb-10">6698 sayılı Kişisel Verilerin Korunması Kanunu · Son güncelleme: Ocak 2026</p>

        <div className="space-y-8 text-sm text-neutral-700 leading-7">

          <section>
            <h2 className="font-black text-base mb-3">1 — VERİ SORUMLUSU</h2>
            <p>6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca, kişisel verileriniz; veri sorumlusu sıfatıyla aşağıda bilgileri yer alan şirketimiz tarafından işlenmektedir.</p>
            <div className="mt-3 space-y-1">
              <p>Unvan: VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ</p>
              <p>Adres: Beldibi Mah. Belmar Sk. No:9/1 İç Kapı No:4 Marmaris/Muğla, Türkiye</p>
              <p>Vergi No: 9251328389 · Vergi Dairesi: Marmaris V.D.</p>
              <p>E-posta: support@vibeguideapp.com</p>
            </div>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">2 — İŞLENEN KİŞİSEL VERİLER</h2>
            <p>Platformumuzu kullanımınıza bağlı olarak aşağıdaki kişisel verileriniz işlenebilir:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Kimlik bilgileri:</strong> ad, soyad</li>
              <li><strong>İletişim bilgileri:</strong> e-posta adresi, (varsa) telefon numarası</li>
              <li><strong>Hesap bilgileri:</strong> kullanıcı kimliği, profil tercihleri, dil seçimi</li>
              <li><strong>Rehber başvurusu kapsamında:</strong> meslek kokart/lisans görselleri (yalnızca doğrulama amacıyla)</li>
              <li><strong>İşlem bilgileri:</strong> rezervasyon geçmişi, değerlendirmeler</li>
              <li><strong>Konum bilgileri:</strong> hizmet sırasında, yalnızca açık rızanızla, rehber-turist eşleşmesi için</li>
              <li><strong>Teknik veriler:</strong> IP adresi, cihaz bilgisi, çerez verileri, kullanım istatistikleri</li>
            </ul>
            <p className="mt-2">Ödeme kartı bilgileriniz VibeGuide sunucularında saklanmaz; ödemeler lisanslı ödeme kuruluşu altyapısı üzerinden işlenir.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">3 — KİŞİSEL VERİLERİN İŞLENME AMAÇLARI</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Üyelik ve hesap oluşturma, kimlik doğrulama</li>
              <li>Turizm ve rehberlik hizmetlerinin sunulması, rezervasyonların yönetimi</li>
              <li>Rehber-turist eşleşmesinin sağlanması</li>
              <li>Müşteri destek taleplerinin karşılanması</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi (fatura, vergi, mevzuat)</li>
              <li>Hizmet kalitesinin ölçülmesi ve geliştirilmesi</li>
              <li>Güvenliğin sağlanması, dolandırıcılığın önlenmesi</li>
            </ul>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">4 — İŞLEMENİN HUKUKİ SEBEPLERİ</h2>
            <p>Kişisel verileriniz KVKK&rsquo;nın 5. maddesi uyarınca; sözleşmenin kurulması veya ifası, hukuki yükümlülüğün yerine getirilmesi, meşru menfaat ve gerektiğinde açık rızanız hukuki sebeplerine dayanılarak işlenir.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">5 — KİŞİSEL VERİLERİN AKTARILMASI</h2>
            <p>Kişisel verileriniz; hizmetin sunulması için gerekli olduğu ölçüde, yalnızca aşağıdaki taraflara aktarılabilir:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Eşleştiğiniz rehber/turist (yalnızca hizmet için gerekli asgari bilgi)</li>
              <li>Lisanslı ödeme kuruluşu (ödeme işlemleri için)</li>
              <li>Barındırma ve altyapı hizmet sağlayıcıları (Firebase, bulut sunucu)</li>
              <li>Yasal mercilerin talebi halinde yetkili kamu kurum ve kuruluşları</li>
            </ul>
            <p className="mt-2">Bazı altyapı sağlayıcılarımız yurt dışında bulunabilir; bu durumda aktarım KVKK&rsquo;nın 9. maddesine uygun olarak yapılır.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">6 — KVKK MADDE 11 KAPSAMINDAKİ HAKLARINIZ</h2>
            <p>KVKK&rsquo;nın 11. maddesi uyarınca veri sahibi olarak aşağıdaki haklara sahipsiniz:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme</li>
              <li>Verilerin silinmesini veya yok edilmesini isteme</li>
              <li>Düzeltme/silme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>Otomatik sistemlerle analiz sonucu aleyhinize bir sonuç çıkmasına itiraz etme</li>
              <li>Kanuna aykırı işleme nedeniyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
            </ul>
            <p className="mt-2">Bu haklarınızı kullanmak için <a href="mailto:support@vibeguideapp.com" className="text-[#6C4CF1] font-semibold">support@vibeguideapp.com</a> adresine başvurabilirsiniz. Talepleriniz en geç 30 gün içinde sonuçlandırılır.</p>
          </section>

          <section>
            <h2 className="font-black text-base mb-3">7 — VERİ GÜVENLİĞİ VE SAKLAMA</h2>
            <p>Kişisel verileriniz, işlenme amacının gerektirdiği süre boyunca ve ilgili mevzuatta öngörülen süreler kadar saklanır; süre sonunda silinir, yok edilir veya anonim hale getirilir. Verilerinizin güvenliği için SSL şifreleme, erişim kontrolü ve uygun teknik/idari tedbirler uygulanmaktadır.</p>
          </section>

          <div className="pt-6 border-t border-black/[0.06] text-xs text-neutral-400">
            <p>İlgili belgeler:
              {" "}<Link href="/privacy" className="text-[#6C4CF1]">Gizlilik Politikası</Link> ·
              {" "}<Link href="/cerez-politikasi" className="text-[#6C4CF1]">Çerez Politikası</Link> ·
              {" "}<Link href="/terms" className="text-[#6C4CF1]">Kullanım Koşulları</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
