import type { Metadata } from "next";
import LegalMarkdown from "@/components/LegalMarkdown";

export const metadata: Metadata = {
  alternates: { canonical: "/account-deletion" },
  title: "Hesabınızı Silin | VibeGuide",
  description: "VibeGuide hesabınızı uygulama içinden veya e-posta ile kalıcı olarak nasıl silersiniz.",
};

const BODY = `
VibeGuide hesabınızı dilediğiniz zaman kalıcı olarak silebilirsiniz.

VibeGuide, Apple App Store ve Google Play hesap silme gerekliliklerine uygun olarak hem uygulama içinden hesap silme seçeneği hem de e-posta yoluyla hesap silme talebi sunmaktadır.

## Yöntem 1 — Uygulama İçinden Silme (Önerilen)

1. VibeGuide uygulamasını açın ve hesabınıza giriş yapın.
2. Profil sekmesine gidin.
3. Aşağı kaydırarak **"Hesabımı Sil"** seçeneğine dokunun.
4. Silme işlemini onaylayın.

Hesabınız saniyeler içerisinde anonimleştirilir ve hesap silme süreci başlatılır.

Google, Apple veya diğer kimlik doğrulama sağlayıcıları ile giriş yaptıysanız, güvenlik amacıyla yeniden kimlik doğrulaması yapmanız istenebilir. Bu işlem Firebase Authentication ve benzeri güvenlik sistemlerinin standart bir gereksinimidir.

**Önemli:** Hesap silme işlemi geri alınamaz. Hesabınız silindikten sonra aynı bilgilerle yeniden giriş yapılamaz ve platformu tekrar kullanmak isterseniz yeni bir hesap oluşturmanız gerekebilir.

## Yöntem 2 — E-posta ile Hesap Silme Talebi

Uygulamaya erişiminiz bulunmuyorsa veya hesabınızı e-posta yoluyla silmek istiyorsanız, hesabınıza kayıtlı e-posta adresinden aşağıdaki adrese talep gönderebilirsiniz:

[support@vibeguideapp.com](mailto:support@vibeguideapp.com)

### Önerilen Konu

**Hesap Silme Talebi**

Kimlik doğrulamasının ardından hesabınız silinmek üzere işleme alınacaktır.

Hesap silme talepleri en geç 30 gün içerisinde sonuçlandırılır.

## Hesap Silindiğinde Neler Silinir?

Hesap silme işlemi tamamlandığında aşağıdaki veriler silinir veya anonim hale getirilir:

* Ad ve soyad bilgileriniz
* Profil fotoğrafınız
* Telefon numaranız
* Hesap tercihleri ve profil ayarlarınız
* Kimlik doğrulama hesabınız
* Push bildirim tokenları ve cihaz tanımlayıcıları
* Uygulama kullanımına ilişkin kişisel verileriniz
* Kaydedilmiş tercihleriniz
* Mesajlaşma ve destek kayıtları (yasal saklama zorunluluğu bulunmayanlar)

Rehber hesabına sahipseniz;

* Rehber doğrulama belgeleri
* Turist rehberi kokartı kayıtları
* KYC doğrulama belgeleri
* Mesleki doğrulama kayıtları
* Yüklenmiş destekleyici belgeler

uygulanabilir mevzuat ve operasyonel gereklilikler doğrultusunda silinir veya anonim hale getirilir.

Gerekli durumlarda bu süreç en geç **90 gün içerisinde** tamamlanır.

## Yasal Olarak Saklanabilecek Veriler

Bazı kayıtların silinmesi yasal yükümlülükler nedeniyle mümkün olmayabilir.

Aşağıdaki veriler ilgili mevzuat kapsamında saklanabilir:

* Rezervasyon kayıtları
* Fatura kayıtları
* Muhasebe kayıtları
* Ödeme işlem kayıtları
* Dolandırıcılık önleme kayıtları
* Güvenlik kayıtları
* Devam eden uyuşmazlıklara ilişkin kayıtlar
* Yasal talepler veya resmi makam süreçlerine ilişkin kayıtlar

Bu kayıtlar yalnızca; yasal yükümlülüklerin yerine getirilmesi, vergisel yükümlülüklerin karşılanması, dolandırıcılık önleme, güvenlik incelemeleri ve uyuşmazlık çözümü amaçlarıyla saklanır.

Vergi Usul Kanunu (VUK), Türk Ticaret Kanunu ve ilgili mevzuat kapsamında belirli finansal kayıtlar **10 yıla kadar** muhafaza edilebilir.

Silinen hesaplara ait yasal olarak saklanan kayıtlar;

* Pazarlama amacıyla kullanılmaz,
* Kullanıcıyla yeniden iletişim kurmak için kullanılmaz,
* Hesabı yeniden etkinleştirmek amacıyla kullanılmaz.

Bu kayıtlar mümkün olduğu ölçüde anonimleştirilmiş veya erişimi sınırlandırılmış şekilde tutulur.

## Hesap Silme Sonrası

Hesabınız silindikten sonra:

* Aktif rezervasyonlarınız iptal edilebilir.
* Gelecekteki rezervasyon haklarınız sona erebilir.
* Uygulama içindeki geçmiş verilerinize erişemezsiniz.
* Silinen içeriklerin geri getirilmesi mümkün olmayabilir.

Hesap silme işlemi tamamlandıktan sonra geri alınamaz.

## Sorular ve Destek

Hesap silme süreci veya kişisel verileriniz hakkında sorularınız için bizimle iletişime geçebilirsiniz:

**E-posta:** [support@vibeguideapp.com](mailto:support@vibeguideapp.com)

**Telefon:** +90 530 828 76 96

## Şirket Bilgileri

**VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ**

Marmaris / Muğla / Türkiye

E-posta: [support@vibeguideapp.com](mailto:support@vibeguideapp.com)

Telefon: +90 530 828 76 96

---

İlgili Belgeler: [Gizlilik Politikası](/privacy) · [KVKK Aydınlatma Metni](/kvkk) · [Kullanım Koşulları](/terms) · [Mesafeli Satış Sözleşmesi](/mesafeli-satis) · [Ön Bilgilendirme Formu](/on-bilgilendirme) · [İptal ve İade Politikası](/cancellation-policy)
`;

export default function AccountDeletionPage() {
  return (
    <LegalMarkdown
      title="VibeGuide Hesabınızı Silin"
      subtitle="Son Güncelleme: 2 Ocak 2026"
      body={BODY}
    />
  );
}
