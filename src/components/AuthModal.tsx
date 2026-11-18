"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmail, signInWithGoogle, registerWithEmail, fbAuth, signOut, buildAuthHeaders
} from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";
import { useT } from "@/components/LanguageProvider";

type Mode = "signin" | "register";
type Role = "tourist" | "guide";
type Step = "form" | "role" | "verify";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"/>
  </svg>
);

interface Props {
  initialMode?: Mode;
  onClose: () => void;
}

export default function AuthModal({ initialMode = "signin", onClose }: Props) {
  const router = useRouter();
  const { locale } = useT();
  const tr = locale === "tr";
  const am = {
    verifyFirst: tr ? "Lütfen önce e-postanı doğrula. Onay bağlantısı için gelen kutunu kontrol et." : "Please verify your email first. Check your inbox for the confirmation link.",
    registrationFailed: tr ? "Kayıt başarısız." : "Registration failed.",
    googleFailed: tr ? "Google ile giriş başarısız. Lütfen tekrar dene." : "Google sign-in failed. Please try again.",
    incorrectCreds: tr ? "E-posta veya şifre hatalı." : "Incorrect email or password.",
    tooMany: tr ? "Çok fazla deneme. Lütfen sonra tekrar dene." : "Too many attempts. Try again later.",
    signInFailed: tr ? "Giriş başarısız. Lütfen tekrar dene." : "Sign in failed. Please try again.",
    passMismatch: tr ? "Şifreler eşleşmiyor." : "Passwords do not match.",
    passMin: tr ? "Şifre en az 6 karakter olmalı." : "Password must be at least 6 characters.",
    emailInUse: tr ? "Bu e-posta zaten kayıtlı." : "This email is already registered.",
    weakPass: tr ? "Şifre çok zayıf." : "Password is too weak.",
    registerFailedRetry: tr ? "Kayıt başarısız. Lütfen tekrar dene." : "Registration failed. Please try again.",
    checkEmail: tr ? "E-postanı kontrol et" : "Check your email",
    verifySentA: tr ? "Doğrulama bağlantısını şu adrese gönderdik: " : "We sent a verification link to ",
    verifySentB: tr ? ". Hesabını etkinleştirmek için gelen kutundaki bağlantıya tıkla, sonra giriş yap." : ". Click the link in your inbox to activate your account, then sign in.",
    gotIt: tr ? "Anladım" : "Got it",
    didntReceive: tr ? "Almadın mı? " : "Didn't receive it? ",
    emailSent: tr ? "E-posta gönderildi ✓" : "Email sent ✓",
    sending: tr ? "Gönderiliyor…" : "Sending…",
    resend: tr ? "Tekrar gönder" : "Resend email",
    welcomeBack: tr ? "Tekrar hoş geldin" : "Welcome back",
    whoAreYou: tr ? "Kimsin?" : "Who are you?",
    applyAsGuide: tr ? "Rehber olarak başvur" : "Apply as guide",
    createAccount: tr ? "Hesap oluştur" : "Create account",
    subSignin: tr ? "Maceranı sürdürmek için giriş yap" : "Sign in to continue your adventure",
    subRole: tr ? "VibeGuide'ı nasıl kullanacağını söyle" : "Tell us how you'll use VibeGuide",
    subGuide: tr ? "Doğrulanmış rehber ağımıza katıl" : "Join our verified guide network",
    subTourist: tr ? "Yerel rehberlerle keşfetmeye başla" : "Start exploring with local guides",
    tabSignin: tr ? "Giriş yap" : "Sign in",
    tabRegister: tr ? "Kayıt ol" : "Register",
    imTourist: tr ? "Turistim" : "I'm a tourist",
    imTouristSub: tr ? "Doğrulanmış yerel rehberlerle şehirleri keşfet" : "Discover cities with verified local guides",
    imGuide: tr ? "Rehberim" : "I'm a guide",
    imGuideSub: tr ? "Şehrini paylaş · sevdiğin işi yaparak kazan" : "Share your city · earn doing what you love",
    guideInfo: tr ? "Rehber kaydı, doğrulama için resmi kokart fotoğraflarının yüklenmesini gerektirir. Seni tam başvuru formuna yönlendireceğiz." : "Guide registration requires uploading your official badge photos for verification. We'll take you to the full application form.",
    continueGuide: tr ? "Rehber başvurusuna devam et" : "Continue to guide application",
    guideTime: tr ? "Yaklaşık 2 dakika sürer · Admin 1–2 gün içinde inceler" : "Takes about 2 minutes · Admin reviews within 1–2 days",
    continueGoogle: tr ? "Google ile devam et" : "Continue with Google",
    or: tr ? "veya" : "or",
    phFullName: tr ? "Ad soyad" : "Full name",
    phEmail: tr ? "E-posta adresi" : "Email address",
    passHint: tr ? "en az 6 karakter" : "min. 6 characters",
    phPassConfirm: tr ? "Şifreyi onayla" : "Confirm password",
    phPassword: tr ? "Şifre" : "Password",
    pleaseWait: tr ? "Lütfen bekle…" : "Please wait…",
    createAccountBtn: tr ? "Hesap oluştur" : "Create account",
    signingIn: tr ? "Giriş yapılıyor…" : "Signing in…",
    signinBtn: tr ? "Giriş yap" : "Sign in",
    forgotPass: tr ? "Şifremi unuttum" : "Forgot password?",
    forgotNeedEmail: tr ? "Önce yukarıya e-postanı gir, sonra Şifremi unuttum'a dokun." : "Enter your email above first, then tap Forgot password.",
    forgotSent: tr ? "Bu e-postaya ait bir hesap varsa, sıfırlama bağlantısı yolda." : "If an account exists for that email, a reset link is on its way.",
    forgotInvalid: tr ? "Bu geçerli bir e-posta gibi görünmüyor." : "That doesn't look like a valid email.",
    tooManyRequests: tr ? "Çok fazla deneme. Lütfen daha sonra tekrar dene." : "Too many attempts. Please try again later.",
    consentRequired: tr ? "Devam etmek için Şartlar, Gizlilik ve KVKK metnini kabul edin." : "Please accept the Terms, Privacy Policy and KVKK notice to continue.",
    consentAgree: tr ? "Şunları kabul ediyorum:" : "I agree to the",
    consentTerms: tr ? "Şartlar" : "Terms",
    consentPrivacy: tr ? "Gizlilik" : "Privacy Policy",
    showPass: tr ? "Şifreyi göster" : "Show password",
    hidePass: tr ? "Şifreyi gizle" : "Hide password",
    close: tr ? "Kapat" : "Close",
    back: tr ? "Geri" : "Back",
    consentKvkk: tr ? "KVKK metni" : "KVKK notice",
  };
  const [mode, setMode] = useState<Mode>(initialMode);
  const [step, setStep] = useState<Step>(initialMode === "register" ? "role" : "form");
  const [role, setRole] = useState<Role | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);

  async function onForgotPassword() {
    setError(null);
    setResetMsg(null);
    if (!email.trim()) { setError(am.forgotNeedEmail); return; }
    try {
      const { sendPasswordResetEmail } = await import("firebase/auth");
      await sendPasswordResetEmail(fbAuth(), email.trim());
      setResetMsg(am.forgotSent);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/invalid-email") setError(am.forgotInvalid);
      else if (code === "auth/too-many-requests") setError(am.tooManyRequests ?? am.forgotSent);
      else setResetMsg(am.forgotSent); // enumeration önleme: hata olsa da nötr mesaj
    }
  }



  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function switchMode(m: Mode) {
    setMode(m);
    setStep(m === "register" ? "role" : "form");
    setRole(null);
    setError(null);
  }

  async function handleAfterLogin() {
    const user = fbAuth().currentUser;
    if (!user) return;
    await user.reload();

    const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: await buildAuthHeaders({ forceRefresh: true }),
    });
    // Kayıtlı kullanıcı (turist/rehber/admin) → içeri al. Email doğrulama kuralını
    // backend uygular (turist için zorunlu, rehber admin KYC onaylı olduğu için muaf).
    // Web'de erken Firebase emailVerified bloğu KALDIRILDI — rehberi içeri sokmuyordu.

    // me 404 = henüz DB kaydı yok → turist kaydını tamamla.
    // NOT: Firebase hesabı sunucuda verified olsa bile, yeni basılan ID token bir süre
    // email_verified=false taşıyabilir (Admin SDK propagation gecikmesi). Bu yüzden
    // stale client property'sine (user.emailVerified) TAKILMA — token'ı zorla tazele ve
    // doğrulamayı BACKEND'e bırak (registerTouristOnBackend gerekirse retry eder).
    if (res.status === 404) {
      await user.getIdToken(true);
      await registerTouristOnBackend();
      return;
    }
    if (res.ok) {
      const me = await res.json();
      onClose();
      if (me.role === "Admin") router.push("/admin");
      else if (me.role === "PendingGuide") router.push("/guide/pending");
      // Tam reload — Navbar'ın Firebase auth listener'ı router.refresh()'te yeniden
      // çalışmıyor; reload ile navbar kesin "giriş yapıldı" durumuna geçer.
      else window.location.reload();
    } else { onClose(); }
  }

  async function registerTouristOnBackend() {
    const user = fbAuth().currentUser;
    if (!user) throw new Error("No user");
    // Login'de fullName state'i boş olabilir → makul bir isme düş (backend zorunlu tutuyor).
    const name = fullName.trim() || user.displayName || (user.email?.split("@")[0] ?? "Traveller");

    const attempt = async () => {
      await user.reload();
      return fetch(`${API_BASE_URL}/api/auth/register-tourist`, {
        method: "POST",
        headers: await buildAuthHeaders({
          forceRefresh: true,
          extra: { "Content-Type": "application/json" },
        }),
        body: JSON.stringify({ fullName: name }),
      });
    };

    let res = await attempt();

    // Token'ın email_verified claim'i propagation yüzünden geç kalmış olabilir →
    // kısa bekleyip token'ı tazele, 1 kez daha dene.
    if (!res.ok && res.status !== 409) {
      const d = await res.json().catch(() => ({} as { error?: string; message?: string }));
      if (d.error === "email_not_verified") {
        await new Promise((r) => setTimeout(r, 1500));
        await user.getIdToken(true);
        res = await attempt();
      } else {
        setError(d.message ?? am.registrationFailed);
        return;
      }
    }

    if (res.ok) { window.location.reload(); return; }
    if (res.status === 409) {
      const d = await res.json().catch(() => ({} as { error?: string }));
      if (d.error === "email_already_in_use") { setError(am.emailInUse); return; }
      // already_registered (bu UID zaten kayıtlı) → içeri al (tam reload → navbar güncellenir)
      window.location.reload(); return;
    }
    const d = await res.json().catch(() => ({} as { error?: string; message?: string }));
    if (d.error === "email_not_verified") { setError(am.verifyFirst); return; }
    setError(d.message ?? am.registrationFailed);
  }

  async function onGoogleSignIn() {
    setError(null);
    // V4: Google ile KAYIT'ta da KVKK/GDPR rızası şart (tourist). Guide zaten
    // /register/guide'a yönlendiği için orada checkbox'la doğrulanır.
    if (mode === "register" && role === "tourist" && !consent) {
      setError(am.consentRequired);
      return;
    }
    setLoading(true);
    try {
      await signInWithGoogle();
      if (mode === "register" && role === "tourist") {
        await registerTouristOnBackend();
      } else if (mode === "register" && role === "guide") {
        onClose();
        router.push("/register/guide");
      } else {
        await handleAfterLogin();
      }
    } catch { setError(am.googleFailed); }
    finally { setLoading(false); }
  }

  async function onEmailSignIn(e: React.FormEvent) {
    e.preventDefault(); setError(null); setLoading(true);
    try {
      await signInWithEmail(email, password);
      await handleAfterLogin();
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found")
        setError(am.incorrectCreds);
      else if (code === "auth/too-many-requests")
        setError(am.tooMany);
      else setError(am.signInFailed);
    } finally { setLoading(false); }
  }

  async function onEmailRegister(e: React.FormEvent) {
    e.preventDefault(); setError(null);
    if (password !== password2) { setError(am.passMismatch); return; }
    if (password.length < 6) { setError(am.passMin); return; }
    if (role === "guide") {
      // Guide kayıt sayfasına yönlendir — KYC foto gerekli
      onClose();
      router.push("/register/guide");
      return;
    }
    if (!consent) { setError(am.consentRequired); return; }
    setLoading(true);
    try {
      await registerWithEmail(email, password);
      // Persist pending registration so /verified can complete it after email click
      localStorage.setItem("vg_pending_register", JSON.stringify({ fullName: fullName.trim(), role: "tourist" }));
      await sendVerificationEmail();
      // Sign out — user must verify email before they can log in
      await signOut();
      setStep("verify");
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? "";
      if (code === "auth/email-already-in-use") setError(am.emailInUse);
      else if (code === "auth/weak-password") setError(am.weakPass);
      else setError(am.registerFailedRetry);
    } finally { setLoading(false); }
  }

  async function sendVerificationEmail() {
    const user = fbAuth().currentUser;
    if (!user) return;
    await fetch(`${API_BASE_URL}/api/auth/send-verification`, {
      method: "POST",
      headers: await buildAuthHeaders(),
    });
  }

  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle");

  async function onResend() {
    setResendState("sending");
    try {
      // Re-auth with the credentials still in state, resend, then sign out again
      await signInWithEmail(email, password);
      await sendVerificationEmail();
      await signOut();
      setResendState("sent");
      setTimeout(() => setResendState("idle"), 5000);
    } catch {
      setResendState("idle");
    }
  }

  const signinOrBack = mode === "register" && step === "form";
  const title = mode === "signin" ? am.welcomeBack : step === "role" ? am.whoAreYou : role === "guide" ? am.applyAsGuide : am.createAccount;
  const subtitle = mode === "signin" ? am.subSignin : step === "role" ? am.subRole : role === "guide" ? am.subGuide : am.subTourist;

  const errorBox = error && (
    <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
  );

  const googleAndDivider = (
    <>
      <button type="button" onClick={onGoogleSignIn} disabled={loading} className={SECONDARY_BTN}>
        <GoogleIcon /> {am.continueGoogle}
      </button>
      <div className="my-5 flex items-center gap-3" aria-hidden="true">
        <div className="h-px flex-1 bg-neutral-200" />
        <span className="text-xs text-neutral-500">{am.or}</span>
        <div className="h-px flex-1 bg-neutral-200" />
      </div>
    </>
  );

  /* ── Verify email ── */
  if (step === "verify") {
    return (
      <Shell onClose={onClose} labelledBy="auth-title" closeLabel={am.close}>
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100 text-neutral-900">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h2 id="auth-title" className="font-display text-[28px] font-normal leading-tight tracking-[-0.01em] text-neutral-900">{am.checkEmail}</h2>
          <p className="mt-3 text-[15px] leading-6 text-neutral-600">
            {am.verifySentA}<strong className="font-semibold text-neutral-900">{email}</strong>{am.verifySentB}
          </p>
          <button type="button" onClick={onClose} className={`${PRIMARY_BTN} mt-7`}>{am.gotIt}</button>
          <p className="mt-4 text-sm text-neutral-600">
            {am.didntReceive}
            {resendState === "sent" ? (
              <span className="font-medium text-emerald-700">{am.emailSent}</span>
            ) : (
              <button type="button" onClick={onResend} disabled={resendState === "sending"}
                className="font-medium text-neutral-900 underline underline-offset-4 hover:text-[#5B3FD9] disabled:opacity-50">
                {resendState === "sending" ? am.sending : am.resend}
              </button>
            )}
          </p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell onClose={onClose} labelledBy="auth-title" closeLabel={am.close}>
      {/* Başlık */}
      <div className="mb-6 pr-10">
        {signinOrBack ? (
          <button type="button" onClick={() => { setStep("role"); setError(null); }}
            className="-ml-1 mb-3 inline-flex items-center gap-1.5 rounded-md px-1 py-0.5 text-sm text-neutral-600 hover:text-neutral-900">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            {am.back}
          </button>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src="/vibeguide-icon.png" alt="VibeGuide" width={32} height={32} className="mb-4" style={{ mixBlendMode: "multiply" }} />
        )}
        <h2 id="auth-title" className="font-display text-[30px] font-normal leading-tight tracking-[-0.01em] text-neutral-900">{title}</h2>
        <p className="mt-1.5 text-[15px] text-neutral-600">{subtitle}</p>
      </div>

      {/* Sekmeler — rol seçildikten sonra gizli (geri butonu var) */}
      {!signinOrBack && (
        <div role="tablist" className="mb-6 grid grid-cols-2 rounded-xl bg-neutral-100 p-1">
          {(["signin", "register"] as Mode[]).map((m) => (
            <button key={m} type="button" role="tab" aria-selected={mode === m} onClick={() => switchMode(m)}
              className={`rounded-lg py-2 text-sm font-medium transition-colors ${mode === m ? "bg-white text-neutral-900 shadow-sm" : "text-neutral-600 hover:text-neutral-900"}`}>
              {m === "signin" ? am.tabSignin : am.tabRegister}
            </button>
          ))}
        </div>
      )}

      {/* ── ROL SEÇİMİ ── */}
      {mode === "register" && step === "role" && (
        <div className="space-y-3">
          <RoleCard
            onClick={() => { setRole("tourist"); setStep("form"); }}
            title={am.imTourist} sub={am.imTouristSub}
            icon={<><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>}
          />
          <RoleCard
            onClick={() => { setRole("guide"); setStep("form"); }}
            title={am.imGuide} sub={am.imGuideSub}
            icon={<><path d="M3 11l18-8-8 18-2-8-8-2z"/></>}
          />
        </div>
      )}

      {/* ── KAYIT FORMU ── */}
      {mode === "register" && step === "form" && (
        role === "guide" ? (
          /* Rehber — KYC gerektiğinden tam sayfaya yönlendir */
          <div>
            <p className="text-[15px] leading-6 text-neutral-700">{am.guideInfo}</p>
            <Link href="/register/guide" onClick={onClose} className={`${PRIMARY_BTN} mt-6`}>{am.continueGuide}</Link>
            <p className="mt-3 text-center text-sm text-neutral-500">{am.guideTime}</p>
          </div>
        ) : (
          /* Turist formu */
          <>
            {googleAndDivider}
            <form onSubmit={onEmailRegister} className="space-y-4" noValidate={false}>
              <Field id="auth-name" label={am.phFullName} value={fullName} onChange={setFullName} autoComplete="name" />
              <Field id="auth-email" label={am.phEmail} type="email" value={email} onChange={setEmail} autoComplete="email" />
              <Field id="auth-pass" label={am.phPassword} hint={am.passHint} type="password" value={password} onChange={setPassword}
                autoComplete="new-password" showLabel={am.showPass} hideLabel={am.hidePass} />
              <Field id="auth-pass2" label={am.phPassConfirm} type="password" value={password2} onChange={setPassword2}
                autoComplete="new-password" showLabel={am.showPass} hideLabel={am.hidePass} />
              {/* KVKK/GDPR — açık rıza (guide, KYC sayfasına yönlendiği için orada da doğrulanır) */}
              <label className="flex items-start gap-3 pt-1 text-sm leading-5 text-neutral-600">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#5B3FD9]" />
                <span>
                  {am.consentAgree}{" "}
                  <Link href="/terms" target="_blank" className={INLINE_LINK}>{am.consentTerms}</Link>,{" "}
                  <Link href="/privacy" target="_blank" className={INLINE_LINK}>{am.consentPrivacy}</Link>,{" "}
                  <Link href="/kvkk" target="_blank" className={INLINE_LINK}>{am.consentKvkk}</Link>.
                </span>
              </label>
              {errorBox}
              <button type="submit" disabled={loading || !consent} className={PRIMARY_BTN}>
                {loading ? am.pleaseWait : am.createAccountBtn}
              </button>
            </form>
          </>
        )
      )}

      {/* ── GİRİŞ FORMU ── */}
      {mode === "signin" && (
        <>
          {googleAndDivider}
          <form onSubmit={onEmailSignIn} className="space-y-4">
            <Field id="auth-email" label={am.phEmail} type="email" value={email} onChange={setEmail} autoComplete="email" />
            <Field id="auth-pass" label={am.phPassword} type="password" value={password} onChange={setPassword}
              autoComplete="current-password" showLabel={am.showPass} hideLabel={am.hidePass}
              aside={
                <button type="button" onClick={onForgotPassword} className="text-sm text-neutral-600 underline-offset-4 hover:text-neutral-900 hover:underline">
                  {am.forgotPass}
                </button>
              }
            />
            {errorBox}
            {resetMsg && <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{resetMsg}</p>}
            <button type="submit" disabled={loading} className={PRIMARY_BTN}>
              {loading ? am.signingIn : am.signinBtn}
            </button>
          </form>
        </>
      )}
    </Shell>
  );
}

/* ───────────────────────── Yardımcı bileşenler ───────────────────────── */

const PRIMARY_BTN =
  "flex h-12 w-full items-center justify-center rounded-xl bg-[#5B3FD9] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#4A32B8] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B3FD9] focus-visible:ring-offset-2";
const SECONDARY_BTN =
  "flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-neutral-300 bg-white px-5 text-[15px] font-medium text-neutral-900 transition-colors hover:bg-neutral-50 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2";
// text-base (16px): iOS Safari 16px altı input'ta sayfayı zoom'luyor.
const INPUT =
  "h-12 w-full rounded-xl border border-neutral-300 bg-white px-4 text-base text-neutral-900 transition-[border-color,box-shadow] focus:border-[#5B3FD9] focus:outline-none focus:ring-[3px] focus:ring-[#5B3FD9]/15";
const INLINE_LINK = "font-medium text-neutral-900 underline underline-offset-2 hover:text-[#5B3FD9]";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Mobilde alttan açılan sheet, md+ ekranda ortada pencere. Odak tuzağı + odak iadesi. */
function Shell({ onClose, labelledBy, closeLabel, children }: {
  onClose: () => void; labelledBy: string; closeLabel: string; children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    // Masaüstünde ilk alana odak; mobilde klavye ekranı kapatmasın diye panelin kendisine.
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    (desktop ? panel?.querySelector<HTMLElement>("input") ?? panel : panel)?.focus();
    return () => prev?.focus?.();
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Tab" || !panelRef.current) return;
    const els = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (els.length === 0) return;
    const first = els[0], last = els[els.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === first || active === panelRef.current)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 md:items-center md:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="vg-sheet relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-2xl bg-white px-6 pb-8 pt-3 shadow-2xl outline-none md:max-w-[440px] md:rounded-2xl md:px-8 md:pb-8 md:pt-8"
      >
        {/* Mobil sheet tutamacı */}
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-neutral-300 md:hidden" aria-hidden="true" />
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 md:top-5"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

/** Etiketli input; type="password" ise göster/gizle düğmesi. */
function Field({ id, label, hint, aside, type = "text", value, onChange, autoComplete, showLabel, hideLabel }: {
  id: string; label: string; hint?: string; aside?: React.ReactNode;
  type?: "text" | "email" | "password"; value: string; onChange: (v: string) => void;
  autoComplete?: string; showLabel?: string; hideLabel?: string;
}) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-neutral-900">
          {label}
          {hint && <span className="ml-1.5 font-normal text-neutral-500">· {hint}</span>}
        </label>
        {aside}
      </div>
      <div className="relative">
        <input
          id={id}
          type={isPw && show ? "text" : type}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          inputMode={type === "email" ? "email" : undefined}
          spellCheck={type === "text" ? undefined : false}
          className={`${INPUT} ${isPw ? "pr-12" : ""}`}
        />
        {isPw && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? hideLabel : showLabel}
            aria-pressed={show}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center rounded-r-xl text-neutral-500 hover:text-neutral-900"
          >
            {show ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24M1 1l22 22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

function RoleCard({ onClick, title, sub, icon }: { onClick: () => void; title: string; sub: string; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-xl border border-neutral-300 p-4 text-left transition-colors hover:border-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-900">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icon}</svg>
      </span>
      <span className="flex-1">
        <span className="block text-[15px] font-semibold text-neutral-900">{title}</span>
        <span className="mt-0.5 block text-sm text-neutral-600">{sub}</span>
      </span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-neutral-900" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
    </button>
  );
}
