"use client";

import LegalMarkdown from "@/components/LegalMarkdown";
import { useT } from "@/components/LanguageProvider";

const SUBTITLE_TR = "Son Güncelleme: 04.06.2026";
const SUBTITLE_EN = "Last updated: 04.06.2026";

const BODY_TR = `
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

const BODY_EN = `
You can permanently delete your VibeGuide account at any time.

In line with Apple App Store and Google Play account-deletion requirements, VibeGuide offers both an in-app account-deletion option and an account-deletion request by email.

## Method 1 — Delete from Within the App (Recommended)

1. Open the VibeGuide app and sign in to your account.
2. Go to the Profile tab.
3. Scroll down and tap **"Delete My Account"**.
4. Confirm the deletion.

Your account is anonymized within seconds and the account-deletion process is started.

If you signed in with Google, Apple, or other authentication providers, you may be asked to re-authenticate for security. This is a standard requirement of Firebase Authentication and similar security systems.

**Important:** Account deletion is irreversible. After your account is deleted, you cannot sign in again with the same details, and you may need to create a new account if you want to use the platform again.

## Method 2 — Account-Deletion Request by Email

If you do not have access to the app or want to delete your account by email, you can send a request from the email address registered to your account to the following address:

[support@vibeguideapp.com](mailto:support@vibeguideapp.com)

### Suggested Subject

**Account Deletion Request**

After identity verification, your account will be processed for deletion.

Account-deletion requests are concluded within at most 30 days.

## What Is Deleted When an Account Is Deleted?

When the account-deletion process is completed, the following data is deleted or anonymized:

* Your first name and surname
* Your profile photo
* Your phone number
* Your account preferences and profile settings
* Your authentication account
* Push-notification tokens and device identifiers
* Your personal data relating to app usage
* Your saved preferences
* Messaging and support records (those without a legal retention obligation)

If you have a guide account, the following:

* Guide-verification documents
* Tourist-guide badge (kokart) records
* KYC verification documents
* Professional-verification records
* Uploaded supporting documents

are deleted or anonymized in line with applicable legislation and operational requirements.

Where necessary, this process is completed within at most **90 days**.

## Data That May Be Retained by Law

Some records may not be deletable due to legal obligations.

The following data may be retained under the relevant legislation:

* Booking records
* Invoice records
* Accounting records
* Payment transaction records
* Fraud-prevention records
* Security records
* Records relating to ongoing disputes
* Records relating to legal requests or official-authority processes

These records are retained solely for the purposes of fulfilling legal obligations, meeting tax obligations, fraud prevention, security reviews, and dispute resolution.

Under the Tax Procedure Law (VUK), the Turkish Commercial Code, and the relevant legislation, certain financial records may be retained for **up to 10 years**.

Legally retained records belonging to deleted accounts are:

* Not used for marketing,
* Not used to re-contact the user,
* Not used to reactivate the account.

These records are kept anonymized or with restricted access to the extent possible.

## After Account Deletion

After your account is deleted:

* Your active bookings may be cancelled.
* Your future booking rights may end.
* You cannot access your past in-app data.
* Deleted content may not be recoverable.

Account deletion is irreversible once completed.

## Questions and Support

For questions about the account-deletion process or your personal data, you can contact us:

**Email:** [support@vibeguideapp.com](mailto:support@vibeguideapp.com)

**Phone:** +90 530 828 76 96

## Company Information

**VİBECORE TURİZM SEYAHAT ACENTASI VE DİJİTAL HİZMETLER TİCARET LİMİTED ŞİRKETİ**

Marmaris / Muğla / Türkiye

Email: [support@vibeguideapp.com](mailto:support@vibeguideapp.com)

Phone: +90 530 828 76 96

---

Related Documents: [Privacy Policy](/privacy) · [Data Protection Notice (KVKK)](/kvkk) · [Terms of Service](/terms) · [Distance Sales Agreement](/mesafeli-satis) · [Pre-Information Form](/on-bilgilendirme) · [Cancellation & Refund Policy](/cancellation-policy)
`;

export default function AccountDeletionView() {
  const { locale } = useT();
  const tr = locale === "tr";
  return (
    <LegalMarkdown
      title={tr ? "VibeGuide Hesabınızı Silin" : "Delete Your VibeGuide Account"}
      subtitle={tr ? SUBTITLE_TR : SUBTITLE_EN}
      body={tr ? BODY_TR : BODY_EN}
    />
  );
}
