"use client";

import { useEffect, useRef, useState } from "react";
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
    badgeGuide: tr ? "🎤 Rehber başvurusu" : "🎤 Guide application",
    badgeTourist: tr ? "✈️ Turist" : "✈️ Tourist",
    guideInfo: tr ? "Rehber kaydı, doğrulama için resmi kokart fotoğraflarının yüklenmesini gerektirir. Seni tam başvuru formuna yönlendireceğiz." : "Guide registration requires uploading your official badge photos for verification. We'll take you to the full application form.",
    continueGuide: tr ? "Rehber başvurusuna devam et →" : "Continue to guide application →",
    guideTime: tr ? "Yaklaşık 2 dakika sürer · Admin 1–2 gün içinde inceler" : "Takes about 2 minutes · Admin reviews within 1–2 days",
    continueGoogle: tr ? "Google ile devam et" : "Continue with Google",
    or: tr ? "veya" : "or",
    phFullName: tr ? "Ad soyad" : "Full name",
    phEmail: tr ? "E-posta adresi" : "Email address",
    phPassMin: tr ? "Şifre (en az 6 karakter)" : "Password (min. 6 chars)",
    phPassConfirm: tr ? "Şifreyi onayla" : "Confirm password",
    phPassword: tr ? "Şifre" : "Password",
    pleaseWait: tr ? "Lütfen bekle…" : "Please wait…",
    createAccountBtn: tr ? "Hesap oluştur →" : "Create account →",
    signingIn: tr ? "Giriş yapılıyor…" : "Signing in…",
    signinBtn: tr ? "Giriş yap →" : "Sign in →",
    forgotPass: tr ? "Şifremi unuttum?" : "Forgot password?",
    forgotNeedEmail: tr ? "Önce yukarıya e-postanı gir, sonra Şifremi unuttum'a dokun." : "Enter your email above first, then tap Forgot password.",
    forgotSent: tr ? "Bu e-postaya ait bir hesap varsa, sıfırlama bağlantısı yolda." : "If an account exists for that email, a reset link is on its way.",
    forgotInvalid: tr ? "Bu geçerli bir e-posta gibi görünmüyor." : "That doesn't look like a valid email.",
    tooManyRequests: tr ? "Çok fazla deneme. Lütfen daha sonra tekrar dene." : "Too many attempts. Please try again later.",
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

  const overlayRef = useRef<HTMLDivElement>(null);

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
    setError(null); setLoading(true);
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

  const inputCls = "w-full border border-black/10 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:border-[#6C4CF1] focus:ring-2 focus:ring-[#6C4CF1]/10 transition-all placeholder:text-neutral-700";

  /* ── Verify email ── */
  if (step === "verify") {
    return (
      <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}>
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 hover:bg-neutral-200 transition-colors text-sm">✕</button>
          <div className="w-14 h-14 rounded-full bg-[#6C4CF1]/10 flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6C4CF1" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h2 className="text-xl font-black text-[#0A0A0F]">{am.checkEmail}</h2>
          <p className="mt-2 text-sm text-neutral-800 leading-6">
            {am.verifySentA}<strong className="text-[#0A0A0F]">{email}</strong>{am.verifySentB}
          </p>
          <button onClick={onClose}
            className="mt-6 w-full rounded-2xl bg-[#6C4CF1] text-white font-bold py-3 text-sm hover:bg-[#5a3dd4] transition-colors"
            style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
            {am.gotIt}
          </button>
          <p className="mt-4 text-xs text-neutral-800">
            {am.didntReceive}
            {resendState === "sent" ? (
              <span className="text-emerald-600 font-semibold">{am.emailSent}</span>
            ) : (
              <button onClick={onResend} disabled={resendState === "sending"}
                className="text-[#6C4CF1] font-semibold hover:underline disabled:opacity-50">
                {resendState === "sending" ? am.sending : am.resend}
              </button>
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm relative overflow-hidden">

        <div className="p-7">
          <button onClick={onClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-800 hover:bg-neutral-200 transition-colors text-sm">✕</button>

          {/* Logo + title */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/vibeguide-icon.png" alt="VibeGuide" width={28} height={28} style={{ mixBlendMode: "multiply" }} />
              <span className="text-sm font-black text-[#0A0A0F]">VibeGuide</span>
            </div>
            <h2 className="text-2xl font-black text-[#0A0A0F]">
              {mode === "signin" ? am.welcomeBack : step === "role" ? am.whoAreYou : role === "guide" ? am.applyAsGuide : am.createAccount}
            </h2>
            <p className="mt-1 text-sm text-neutral-800">
              {mode === "signin" ? am.subSignin : step === "role" ? am.subRole : role === "guide" ? am.subGuide : am.subTourist}
            </p>
          </div>

          {/* Mode tabs */}
          <div className="flex gap-1 p-1 bg-neutral-100 rounded-2xl mb-5">
            {(["signin", "register"] as Mode[]).map((m) => (
              <button key={m} onClick={() => switchMode(m)}
                className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${mode === m ? "bg-white text-[#0A0A0F] shadow-sm" : "text-neutral-800 hover:text-neutral-800"}`}>
                {m === "signin" ? am.tabSignin : am.tabRegister}
              </button>
            ))}
          </div>

          {/* ── ROLE SELECTION ── */}
          {mode === "register" && step === "role" && (
            <div className="space-y-3">
              <button
                onClick={() => { setRole("tourist"); setStep("form"); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-black/[0.06] hover:border-[#6C4CF1]/40 hover:bg-[#6C4CF1]/[0.02] transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#6C4CF1]/8 flex items-center justify-center shrink-0 text-[#6C4CF1] group-hover:bg-[#6C4CF1]/15 transition-colors">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-black text-[#0A0A0F]">{am.imTourist}</p>
                  <p className="text-xs text-neutral-800 mt-0.5">{am.imTouristSub}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6C4CF1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><path d="M9 18l6-6-6-6"/></svg>
              </button>

              <button
                onClick={() => { setRole("guide"); setStep("form"); }}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-black/[0.06] hover:border-emerald-400/60 hover:bg-emerald-50/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5" r="1"/><path d="M9 20l1-5 2 2 1-5"/><path d="M6 11l2-4h8l1 4"/>
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-black text-[#0A0A0F]">{am.imGuide}</p>
                  <p className="text-xs text-neutral-800 mt-0.5">{am.imGuideSub}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          )}

          {/* ── REGISTER FORM ── */}
          {mode === "register" && step === "form" && (
            <>
              {/* Role badge + back */}
              <div className="flex items-center gap-2 mb-4">
                <button onClick={() => { setStep("role"); setError(null); }} className="text-neutral-800 hover:text-[#0A0A0F] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                </button>
                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${role === "guide" ? "bg-emerald-50 text-emerald-700" : "bg-[#6C4CF1]/8 text-[#6C4CF1]"}`}>
                  {role === "guide" ? am.badgeGuide : am.badgeTourist}
                </span>
              </div>

              {role === "guide" ? (
                /* Guide — KYC gerektiğinden tam sayfaya yönlendir */
                <div className="text-center py-4">
                  <p className="text-sm text-neutral-700 leading-6 mb-4">
                    {am.guideInfo}
                  </p>
                  <a href="/register/guide"
                    onClick={onClose}
                    className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500 text-white font-bold px-6 py-3 text-sm hover:bg-emerald-600 transition-colors">
                    {am.continueGuide}
                  </a>
                  <p className="mt-3 text-xs text-neutral-800">{am.guideTime}</p>
                </div>
              ) : (
                /* Tourist form */
                <>
                  <button onClick={onGoogleSignIn} disabled={loading}
                    className="w-full flex items-center justify-center gap-3 border border-black/10 rounded-2xl px-5 py-3 text-sm font-bold text-[#0A0A0F] hover:bg-neutral-50 transition-colors disabled:opacity-50 mb-4">
                    <GoogleIcon /> {am.continueGoogle}
                  </button>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px bg-black/[0.06]" />
                    <span className="text-xs text-neutral-700 font-medium">{am.or}</span>
                    <div className="flex-1 h-px bg-black/[0.06]" />
                  </div>
                  <form onSubmit={onEmailRegister} className="space-y-3">
                    <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} placeholder={am.phFullName} />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder={am.phEmail} />
                    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder={am.phPassMin} />
                    <input type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)} className={inputCls} placeholder={am.phPassConfirm} />
                    {error && <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}
                    <button type="submit" disabled={loading}
                      className="w-full rounded-2xl bg-[#6C4CF1] text-white font-bold py-3 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
                      style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
                      {loading ? am.pleaseWait : am.createAccountBtn}
                    </button>
                  </form>
                </>
              )}
            </>
          )}

          {/* ── SIGN IN FORM ── */}
          {mode === "signin" && (
            <>
              <button onClick={onGoogleSignIn} disabled={loading}
                className="w-full flex items-center justify-center gap-3 border border-black/10 rounded-2xl px-5 py-3 text-sm font-bold text-[#0A0A0F] hover:bg-neutral-50 transition-colors disabled:opacity-50 mb-4">
                <GoogleIcon /> {am.continueGoogle}
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-black/[0.06]" />
                <span className="text-xs text-neutral-700 font-medium">{am.or}</span>
                <div className="flex-1 h-px bg-black/[0.06]" />
              </div>
              <form onSubmit={onEmailSignIn} className="space-y-3">
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder={am.phEmail} />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder={am.phPassword} />
                {error && <div className="rounded-2xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{error}</div>}
                <button type="submit" disabled={loading}
                  className="w-full rounded-2xl bg-[#6C4CF1] text-white font-bold py-3 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-50"
                  style={{ boxShadow: "0 4px 16px rgba(108,76,241,0.25)" }}>
                  {loading ? am.signingIn : am.signinBtn}
                </button>
              </form>
              <p className="mt-3 text-center text-xs text-neutral-800">
                <button type="button" onClick={onForgotPassword} className="text-[#6C4CF1] font-semibold hover:underline">{am.forgotPass}</button>
              </p>
              {resetMsg && <p className="mt-2 text-center text-xs text-emerald-700">{resetMsg}</p>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
