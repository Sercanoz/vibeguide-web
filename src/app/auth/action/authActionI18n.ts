/**
 * /auth/action sayfasının metinleri (10 dil).
 *
 * Firebase'in hazır `firebaseapp.com` ekranı yerine kendi sayfamızı
 * kullanıyoruz; kullanıcı baştan sona vibeguideapp.com'da kalıyor.
 */

export interface AuthActionT {
  // Şifre sıfırlama
  resetTitle: string;
  resetSub: string;
  newPassword: string;
  confirmPassword: string;
  resetCta: string;
  resetDone: string;
  resetDoneSub: string;
  // E-posta doğrulama
  verifyTitle: string;
  verifyWorking: string;
  verifyDone: string;
  verifyDoneSub: string;
  // Ortak
  goSignIn: string;
  goHome: string;
  working: string;
  // Hatalar
  errWeak: string;
  errMismatch: string;
  errExpired: string;
  errInvalid: string;
  errGeneric: string;
  errUnsupported: string;
}

const en: AuthActionT = {
  resetTitle: "Set a new password",
  resetSub: "Choose a new password for {email}.",
  newPassword: "New password",
  confirmPassword: "Confirm password",
  resetCta: "Update password",
  resetDone: "Password updated",
  resetDoneSub: "You can now sign in with your new password.",
  verifyTitle: "Verifying your email",
  verifyWorking: "Just a moment…",
  verifyDone: "Email verified",
  verifyDoneSub: "Your email address has been confirmed. You're all set.",
  goSignIn: "Sign in",
  goHome: "Back to VibeGuide",
  working: "Please wait…",
  errWeak: "Password must be at least 6 characters.",
  errMismatch: "Passwords don't match.",
  errExpired: "This link has expired. Please request a new one.",
  errInvalid: "This link is invalid or has already been used.",
  errGeneric: "Something went wrong. Please try again.",
  errUnsupported: "This link isn't supported.",
};

const tr: AuthActionT = {
  resetTitle: "Yeni şifre belirle",
  resetSub: "{email} hesabın için yeni bir şifre seç.",
  newPassword: "Yeni şifre",
  confirmPassword: "Şifreyi tekrarla",
  resetCta: "Şifreyi güncelle",
  resetDone: "Şifren güncellendi",
  resetDoneSub: "Artık yeni şifrenle giriş yapabilirsin.",
  verifyTitle: "E-postan doğrulanıyor",
  verifyWorking: "Bir saniye…",
  verifyDone: "E-posta doğrulandı",
  verifyDoneSub: "E-posta adresin onaylandı. Her şey hazır.",
  goSignIn: "Giriş yap",
  goHome: "VibeGuide'a dön",
  working: "Lütfen bekle…",
  errWeak: "Şifre en az 6 karakter olmalı.",
  errMismatch: "Şifreler eşleşmiyor.",
  errExpired: "Bu bağlantının süresi dolmuş. Lütfen yenisini iste.",
  errInvalid: "Bu bağlantı geçersiz ya da daha önce kullanılmış.",
  errGeneric: "Bir şeyler ters gitti. Lütfen tekrar dene.",
  errUnsupported: "Bu bağlantı desteklenmiyor.",
};

const de: AuthActionT = {
  resetTitle: "Neues Passwort festlegen",
  resetSub: "Wähle ein neues Passwort für {email}.",
  newPassword: "Neues Passwort",
  confirmPassword: "Passwort bestätigen",
  resetCta: "Passwort aktualisieren",
  resetDone: "Passwort aktualisiert",
  resetDoneSub: "Du kannst dich jetzt mit deinem neuen Passwort anmelden.",
  verifyTitle: "E-Mail wird bestätigt",
  verifyWorking: "Einen Moment…",
  verifyDone: "E-Mail bestätigt",
  verifyDoneSub: "Deine E-Mail-Adresse wurde bestätigt. Alles bereit.",
  goSignIn: "Anmelden",
  goHome: "Zurück zu VibeGuide",
  working: "Bitte warten…",
  errWeak: "Das Passwort muss mindestens 6 Zeichen haben.",
  errMismatch: "Die Passwörter stimmen nicht überein.",
  errExpired: "Dieser Link ist abgelaufen. Bitte fordere einen neuen an.",
  errInvalid: "Dieser Link ist ungültig oder wurde bereits verwendet.",
  errGeneric: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
  errUnsupported: "Dieser Link wird nicht unterstützt.",
};

const fr: AuthActionT = {
  resetTitle: "Définir un nouveau mot de passe",
  resetSub: "Choisissez un nouveau mot de passe pour {email}.",
  newPassword: "Nouveau mot de passe",
  confirmPassword: "Confirmer le mot de passe",
  resetCta: "Mettre à jour",
  resetDone: "Mot de passe mis à jour",
  resetDoneSub: "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
  verifyTitle: "Vérification de votre e-mail",
  verifyWorking: "Un instant…",
  verifyDone: "E-mail vérifié",
  verifyDoneSub: "Votre adresse e-mail a été confirmée. Tout est prêt.",
  goSignIn: "Se connecter",
  goHome: "Retour à VibeGuide",
  working: "Veuillez patienter…",
  errWeak: "Le mot de passe doit contenir au moins 6 caractères.",
  errMismatch: "Les mots de passe ne correspondent pas.",
  errExpired: "Ce lien a expiré. Veuillez en demander un nouveau.",
  errInvalid: "Ce lien est invalide ou a déjà été utilisé.",
  errGeneric: "Une erreur s'est produite. Veuillez réessayer.",
  errUnsupported: "Ce lien n'est pas pris en charge.",
};

const es: AuthActionT = {
  resetTitle: "Establece una nueva contraseña",
  resetSub: "Elige una nueva contraseña para {email}.",
  newPassword: "Nueva contraseña",
  confirmPassword: "Confirmar contraseña",
  resetCta: "Actualizar contraseña",
  resetDone: "Contraseña actualizada",
  resetDoneSub: "Ya puedes iniciar sesión con tu nueva contraseña.",
  verifyTitle: "Verificando tu correo",
  verifyWorking: "Un momento…",
  verifyDone: "Correo verificado",
  verifyDoneSub: "Tu dirección de correo ha sido confirmada. Todo listo.",
  goSignIn: "Iniciar sesión",
  goHome: "Volver a VibeGuide",
  working: "Espera un momento…",
  errWeak: "La contraseña debe tener al menos 6 caracteres.",
  errMismatch: "Las contraseñas no coinciden.",
  errExpired: "Este enlace ha caducado. Solicita uno nuevo.",
  errInvalid: "Este enlace no es válido o ya se ha utilizado.",
  errGeneric: "Algo salió mal. Inténtalo de nuevo.",
  errUnsupported: "Este enlace no es compatible.",
};

const it: AuthActionT = {
  resetTitle: "Imposta una nuova password",
  resetSub: "Scegli una nuova password per {email}.",
  newPassword: "Nuova password",
  confirmPassword: "Conferma password",
  resetCta: "Aggiorna password",
  resetDone: "Password aggiornata",
  resetDoneSub: "Ora puoi accedere con la tua nuova password.",
  verifyTitle: "Verifica dell'email",
  verifyWorking: "Un attimo…",
  verifyDone: "Email verificata",
  verifyDoneSub: "Il tuo indirizzo email è stato confermato. Tutto pronto.",
  goSignIn: "Accedi",
  goHome: "Torna a VibeGuide",
  working: "Attendere…",
  errWeak: "La password deve contenere almeno 6 caratteri.",
  errMismatch: "Le password non coincidono.",
  errExpired: "Questo link è scaduto. Richiedine uno nuovo.",
  errInvalid: "Questo link non è valido o è già stato usato.",
  errGeneric: "Qualcosa è andato storto. Riprova.",
  errUnsupported: "Questo link non è supportato.",
};

const ru: AuthActionT = {
  resetTitle: "Задайте новый пароль",
  resetSub: "Выберите новый пароль для {email}.",
  newPassword: "Новый пароль",
  confirmPassword: "Подтвердите пароль",
  resetCta: "Обновить пароль",
  resetDone: "Пароль обновлён",
  resetDoneSub: "Теперь вы можете войти с новым паролем.",
  verifyTitle: "Проверяем вашу почту",
  verifyWorking: "Секунду…",
  verifyDone: "Почта подтверждена",
  verifyDoneSub: "Ваш адрес электронной почты подтверждён. Всё готово.",
  goSignIn: "Войти",
  goHome: "Вернуться в VibeGuide",
  working: "Пожалуйста, подождите…",
  errWeak: "Пароль должен содержать не менее 6 символов.",
  errMismatch: "Пароли не совпадают.",
  errExpired: "Срок действия ссылки истёк. Запросите новую.",
  errInvalid: "Ссылка недействительна или уже использована.",
  errGeneric: "Что-то пошло не так. Попробуйте ещё раз.",
  errUnsupported: "Эта ссылка не поддерживается.",
};

const zh: AuthActionT = {
  resetTitle: "设置新密码",
  resetSub: "为 {email} 选择一个新密码。",
  newPassword: "新密码",
  confirmPassword: "确认密码",
  resetCta: "更新密码",
  resetDone: "密码已更新",
  resetDoneSub: "现在可以使用新密码登录了。",
  verifyTitle: "正在验证您的邮箱",
  verifyWorking: "请稍候…",
  verifyDone: "邮箱已验证",
  verifyDoneSub: "您的邮箱地址已确认，一切就绪。",
  goSignIn: "登录",
  goHome: "返回 VibeGuide",
  working: "请稍候…",
  errWeak: "密码至少需要 6 个字符。",
  errMismatch: "两次输入的密码不一致。",
  errExpired: "此链接已过期，请重新申请。",
  errInvalid: "此链接无效或已被使用。",
  errGeneric: "出了点问题，请重试。",
  errUnsupported: "不支持此链接。",
};

const ko: AuthActionT = {
  resetTitle: "새 비밀번호 설정",
  resetSub: "{email} 계정의 새 비밀번호를 입력하세요.",
  newPassword: "새 비밀번호",
  confirmPassword: "비밀번호 확인",
  resetCta: "비밀번호 변경",
  resetDone: "비밀번호가 변경되었습니다",
  resetDoneSub: "이제 새 비밀번호로 로그인할 수 있습니다.",
  verifyTitle: "이메일 확인 중",
  verifyWorking: "잠시만 기다려 주세요…",
  verifyDone: "이메일 인증 완료",
  verifyDoneSub: "이메일 주소가 확인되었습니다. 모두 준비되었습니다.",
  goSignIn: "로그인",
  goHome: "VibeGuide로 돌아가기",
  working: "잠시만 기다려 주세요…",
  errWeak: "비밀번호는 6자 이상이어야 합니다.",
  errMismatch: "비밀번호가 일치하지 않습니다.",
  errExpired: "이 링크는 만료되었습니다. 새로 요청해 주세요.",
  errInvalid: "이 링크는 유효하지 않거나 이미 사용되었습니다.",
  errGeneric: "문제가 발생했습니다. 다시 시도해 주세요.",
  errUnsupported: "지원하지 않는 링크입니다.",
};

const ja: AuthActionT = {
  resetTitle: "新しいパスワードを設定",
  resetSub: "{email} の新しいパスワードを入力してください。",
  newPassword: "新しいパスワード",
  confirmPassword: "パスワードの確認",
  resetCta: "パスワードを更新",
  resetDone: "パスワードを更新しました",
  resetDoneSub: "新しいパスワードでログインできます。",
  verifyTitle: "メールアドレスを確認中",
  verifyWorking: "少々お待ちください…",
  verifyDone: "メールアドレスを確認しました",
  verifyDoneSub: "メールアドレスの確認が完了しました。",
  goSignIn: "ログイン",
  goHome: "VibeGuide に戻る",
  working: "お待ちください…",
  errWeak: "パスワードは6文字以上で入力してください。",
  errMismatch: "パスワードが一致しません。",
  errExpired: "このリンクは有効期限が切れています。再度お試しください。",
  errInvalid: "このリンクは無効か、すでに使用されています。",
  errGeneric: "問題が発生しました。もう一度お試しください。",
  errUnsupported: "このリンクはサポートされていません。",
};

const MAP: Record<string, AuthActionT> = {
  en, tr, de, fr, es, it, ru, zh, ko, ja,
};

export function getAuthActionT(locale: string): AuthActionT {
  return MAP[locale] ?? en;
}
