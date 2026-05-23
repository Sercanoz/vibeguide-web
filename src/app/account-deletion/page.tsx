"use client";

import LegalLayout from "@/components/LegalLayout";
import { useT } from "@/components/LanguageProvider";
import {
  accountDeletion,
  extendedLocale,
  SUPPORT_EMAIL,
} from "@/lib/legal-content";

export default function AccountDeletionPage() {
  const { locale } = useT();
  const c = accountDeletion[extendedLocale(locale)];

  const subjectMap: Record<string, string> = {
    tr: "Hesap silme talebi",
    ru: "Запрос на удаление аккаунта",
    de: "Konto löschen Anfrage",
    es: "Solicitud de eliminación de cuenta",
    ja: "アカウント削除リクエスト",
    zh: "账户删除请求",
    el: "Αίτημα διαγραφής λογαριασμού",
    bg: "Заявка за изтриване на акаунт",
    sr: "Zahtev za brisanje naloga",
    ko: "계정 삭제 요청",
    it: "Richiesta di eliminazione account",
    hr: "Zahtjev za brisanje računa",
    fr: "Demande de suppression de compte",
    ro: "Solicitare de ștergere a contului",
    ar: "طلب حذف الحساب",
    nl: "Verzoek tot accountverwijdering",
    pl: "Prośba o usunięcie konta",
    uk: "Запит на видалення акаунту",
    id: "Permintaan penghapusan akun",
    pt: "Pedido de eliminação de conta",
  };
  const bodyMap: Record<string, string> = {
    tr: "Merhaba,\n\nVibeGuide hesabımın kalıcı olarak silinmesini talep ediyorum. Lütfen kayıtlı e-posta adresimi onaylayıp 30 gün içinde tamamlayın.\n\nKayıtlı e-posta: \nKayıtlı telefon (varsa): \n\nTeşekkürler.",
    ru: "Здравствуйте,\n\nПрошу постоянно удалить мой аккаунт VibeGuide. Пожалуйста, проверьте мой зарегистрированный email и выполните удаление в течение 30 дней.\n\nЗарегистрированный email: \nТелефон (опционально): \n\nСпасибо.",
    de: "Hallo,\n\nIch möchte mein VibeGuide-Konto dauerhaft löschen. Bitte bestätigen Sie meine registrierte E-Mail und führen Sie die Löschung innerhalb von 30 Tagen durch.\n\nRegistrierte E-Mail: \nRegistriertes Telefon (optional): \n\nDanke.",
    es: "Hola,\n\nDeseo eliminar permanentemente mi cuenta de VibeGuide. Por favor, verifica mi correo registrado y completa la eliminación en 30 días.\n\nCorreo registrado: \nTeléfono registrado (opcional): \n\nGracias.",
    ja: "こんにちは、\n\nVibeGuideアカウントを完全に削除をリクエストします。登録済みメールアドレスを確認し、30日以内に削除を完了してください。\n\n登録済みメール: \n電話番号（任意）: \n\nよろしくお願いします。",
    zh: "您好，\n\n我希望永久删除我的VibeGuide账户。请验证我的注册邮箱并在30天内完成删除。\n\n注册邮箱: \n注册电话（可选）: \n\n谢谢。",
    el: "Γεια σας,\n\nΘα ήθελα να διαγράψω μόνιμα τον λογαριασμό μου στο VibeGuide. Παρακαλώ επαληθεύστε το καταχωρημένο email μου και ολοκληρώστε τη διαγραφή εντός 30 ημερών.\n\nΚαταχωρημένο email: \nΤηλέφωνο (προαιρετικό): \n\nΕυχαριστώ.",
    bg: "Здравейте,\n\nИскам да изтрия постоянно акаунта си в VibeGuide. Моля, потвърдете регистрирания ми имейл и завършете изтриването в рамките на 30 дни.\n\nРегистриран имейл: \nТелефон (по желание): \n\nБлагодаря.",
    sr: "Zdravo,\n\nŽelim da trajno obrišem svoj VibeGuide nalog. Molim vas da verifikujete moj registrovani email i završite brisanje u roku od 30 dana.\n\nRegistrovani email: \nTelefon (opciono): \n\nHvala.",
    ko: "안녕하세요,\n\nVibeGuide 계정을 영구적으로 삭제하고 싶습니다. 등록된 이메일을 확인하고 30일 이내에 삭제를 완료해 주세요.\n\n등록된 이메일: \n전화번호 (선택): \n\n감사합니다.",
    it: "Salve,\n\nDesidero eliminare permanentemente il mio account VibeGuide. La prego di verificare la mia email registrata e completare l'eliminazione entro 30 giorni.\n\nEmail registrata: \nTelefono registrato (opzionale): \n\nGrazie.",
    hr: "Pozdrav,\n\nŽelim trajno obrisati svoj VibeGuide račun. Molim vas potvrdite moju registriranu e-mail adresu i dovršite brisanje unutar 30 dana.\n\nRegistrirana e-mail adresa: \nTelefon (neobavezno): \n\nHvala.",
    fr: "Bonjour,\n\nJe souhaite supprimer définitivement mon compte VibeGuide. Veuillez vérifier mon e-mail enregistré et compléter la suppression dans les 30 jours.\n\nE-mail enregistré : \nTéléphone enregistré (optionnel) : \n\nMerci.",
    ro: "Bună ziua,\n\nDoresc să șterg permanent contul meu VibeGuide. Vă rog să verificați e-mailul meu înregistrat și să finalizați ștergerea în 30 de zile.\n\nE-mail înregistrat: \nTelefon înregistrat (opțional): \n\nMulțumesc.",
    ar: "مرحباً،\n\nأرغب في حذف حسابي في VibeGuide بشكل دائم. يُرجى التحقق من بريدي الإلكتروني المسجَّل وإتمام الحذف في غضون 30 يوماً.\n\nالبريد الإلكتروني المسجَّل: \nرقم الهاتف (اختياري): \n\nشكراً.",
    nl: "Hallo,\n\nIk wil mijn VibeGuide-account permanent verwijderen. Verifieer mijn geregistreerde e-mail en voltooi de verwijdering binnen 30 dagen.\n\nGeregistreerde e-mail: \nGeregistreerde telefoon (optioneel): \n\nBedankt.",
    pl: "Dzień dobry,\n\nChciałbym(-abym) trwale usunąć moje konto VibeGuide. Proszę zweryfikować mój zarejestrowany e-mail i zakończyć usuwanie w ciągu 30 dni.\n\nZarejestrowany e-mail: \nZarejestrowany telefon (opcjonalnie): \n\nDziękuję.",
    uk: "Добрий день,\n\nЯ хочу назавжди видалити свій акаунт VibeGuide. Будь ласка, перевірте мою зареєстровану електронну пошту та завершіть видалення протягом 30 днів.\n\nЗареєстрована пошта: \nТелефон (необов'язково): \n\nДякую.",
    id: "Halo,\n\nSaya ingin menghapus akun VibeGuide saya secara permanen. Mohon verifikasi email terdaftar saya dan selesaikan penghapusan dalam 30 hari.\n\nEmail terdaftar: \nTelepon terdaftar (opsional): \n\nTerima kasih.",
    pt: "Olá,\n\nGostaria de eliminar permanentemente a minha conta VibeGuide. Por favor, verifique o meu e-mail registado e conclua a eliminação em 30 dias.\n\nE-mail registado: \nTelefone registado (opcional): \n\nObrigado(a).",
  };
  const subject = subjectMap[locale] ?? "Account deletion request";
  const body = bodyMap[locale] ?? "Hello,\n\nI would like to permanently delete my VibeGuide account. Please verify my registered email and complete the deletion within 30 days.\n\nRegistered email: \nRegistered phone (optional): \n\nThank you.";

  const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return (
    <LegalLayout title={c.pageTitle} intro={c.intro}>
      <section>
        <h2>{c.inAppHeading}</h2>
        <ol className="space-y-2 list-decimal pl-5 text-vg-muted leading-relaxed">
          {c.inAppSteps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-vg-muted italic">{c.inAppNote}</p>
      </section>

      <section>
        <h2>{c.webHeading}</h2>
        <p>{c.webBody}</p>

        <div className="mt-5 rounded-2xl bg-vg-bg-soft border border-vg-border p-5">
          <p className="text-xs font-black uppercase tracking-widest text-vg-muted">
            {c.formEmailLabel}
          </p>
          <p className="mt-1 text-lg font-black text-vg-ink break-all">
            {SUPPORT_EMAIL}
          </p>
          <p className="mt-4 text-xs font-black uppercase tracking-widest text-vg-muted">
            {c.formReasonLabel}
          </p>
          <p className="mt-1 text-base font-bold text-vg-ink">{subject}</p>
          <a
            href={mailto}
            className="mt-5 inline-flex items-center gap-2 bg-vibe-gradient text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform"
          >
            ✉️ {c.formSubmit}
          </a>
        </div>
      </section>

      <section>
        <h2>{c.whatHappensHeading}</h2>
        <ul>
          {c.whatHappensList.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>{c.retentionHeading}</h2>
        <p>{c.retentionBody}</p>
      </section>

      <p className="mt-10 text-sm text-vg-muted">{c.contactBody}</p>
    </LegalLayout>
  );
}
