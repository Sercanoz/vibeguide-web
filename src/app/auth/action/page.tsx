"use client";

import { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  applyActionCode,
  type Auth,
} from "firebase/auth";
import { fbAuth } from "@/lib/firebase-client";
import { useT } from "@/components/LanguageProvider";
import { getAuthActionT } from "./authActionI18n";
import Navbar from "@/components/Navbar";
import MainFooter from "@/components/MainFooter";

/**
 * Firebase auth action handler — şifre sıfırlama + e-posta doğrulama.
 *
 * NEDEN VAR: Firebase varsayılan olarak kullanıcıyı
 * `vibeguide-2da83.firebaseapp.com/__/auth/action` adresine gönderiyordu —
 * proje ID'si görünen, markasız bir ekran. Firebase Console'da Action URL
 * buraya çevrilince kullanıcı baştan sona vibeguideapp.com'da kalıyor.
 *
 * Firebase'in gönderdiği query parametreleri: mode, oobCode, apiKey, lang.
 */

type Phase =
  | "loading"      // oobCode doğrulanıyor
  | "resetForm"    // şifre girişi bekleniyor
  | "resetDone"
  | "verifyDone"
  | "error";

function ActionInner() {
  const search = useSearchParams();
  const { locale } = useT();
  const t = getAuthActionT(locale);

  const mode = search.get("mode") ?? "";
  const oobCode = search.get("oobCode") ?? "";

  const [phase, setPhase] = useState<Phase>("loading");
  const [email, setEmail] = useState("");
  const [pw1, setPw1] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  /** Firebase hata kodunu yerelleştirilmiş metne çevirir. */
  const mapError = useCallback(
    (code: string): string => {
      switch (code) {
        case "auth/expired-action-code":
          return t.errExpired;
        case "auth/invalid-action-code":
        case "auth/user-disabled":
        case "auth/user-not-found":
          return t.errInvalid;
        case "auth/weak-password":
          return t.errWeak;
        default:
          return t.errGeneric;
      }
    },
    [t]
  );

  // Link geldiğinde kodu doğrula (şifre sıfırlama) veya doğrudan uygula (e-posta).
  useEffect(() => {
    let alive = true;

    (async () => {
      if (!oobCode) {
        if (alive) { setErr(t.errInvalid); setPhase("error"); }
        return;
      }

      let auth: Auth;
      try {
        auth = fbAuth();
      } catch {
        if (alive) { setErr(t.errGeneric); setPhase("error"); }
        return;
      }

      try {
        if (mode === "resetPassword") {
          // Kodu doğrula ve hangi hesaba ait olduğunu öğren — kullanıcıya
          // hangi e-posta için şifre belirlediğini göstermek için.
          const mail = await verifyPasswordResetCode(auth, oobCode);
          if (!alive) return;
          setEmail(mail);
          setPhase("resetForm");
        } else if (mode === "verifyEmail") {
          await applyActionCode(auth, oobCode);
          if (!alive) return;
          setPhase("verifyDone");
        } else {
          if (alive) { setErr(t.errUnsupported); setPhase("error"); }
        }
      } catch (e) {
        if (!alive) return;
        const code = (e as { code?: string })?.code ?? "";
        setErr(mapError(code));
        setPhase("error");
      }
    })();

    return () => { alive = false; };
  }, [mode, oobCode, t, mapError]);

  async function submitNewPassword(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    if (pw1.length < 6) { setErr(t.errWeak); return; }
    if (pw1 !== pw2) { setErr(t.errMismatch); return; }

    setBusy(true);
    try {
      await confirmPasswordReset(fbAuth(), oobCode, pw1);
      setPhase("resetDone");
    } catch (e) {
      const code = (e as { code?: string })?.code ?? "";
      setErr(mapError(code));
    } finally {
      setBusy(false);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#6C4CF1] focus:ring-2 focus:ring-[#6C4CF1]/10 transition-all";

  return (
    <main className="min-h-screen bg-[#FAFAFB] text-[#0A0A0F]">
      <Navbar />
      <div className="mx-auto max-w-md px-6 pt-32 pb-24">
        <div className="rounded-3xl bg-white border border-black/[0.06] shadow-sm p-7">
          {phase === "loading" && (
            <div className="text-center py-6">
              <div className="w-10 h-10 rounded-full border-2 border-[#6C4CF1]/20 border-t-[#6C4CF1] animate-spin mx-auto mb-4" />
              <p className="text-sm text-neutral-600">
                {mode === "verifyEmail" ? t.verifyWorking : t.working}
              </p>
            </div>
          )}

          {phase === "resetForm" && (
            <>
              <h1 className="text-xl font-black">{t.resetTitle}</h1>
              <p className="mt-1.5 text-sm text-neutral-600">
                {t.resetSub.replace("{email}", email)}
              </p>

              <form onSubmit={submitNewPassword} className="mt-6 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    {t.newPassword}
                  </label>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={pw1}
                    onChange={(ev) => setPw1(ev.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">
                    {t.confirmPassword}
                  </label>
                  <input
                    type="password"
                    autoComplete="new-password"
                    value={pw2}
                    onChange={(ev) => setPw2(ev.target.value)}
                    className={inputCls}
                  />
                </div>

                {err && (
                  <p className="text-sm text-red-600 font-medium">{err}</p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-full bg-[#6C4CF1] text-white font-bold px-6 py-3 text-sm hover:bg-[#5a3dd4] transition-colors disabled:opacity-60"
                >
                  {busy ? t.working : t.resetCta}
                </button>
              </form>
            </>
          )}

          {(phase === "resetDone" || phase === "verifyDone") && (
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h1 className="text-xl font-black">
                {phase === "resetDone" ? t.resetDone : t.verifyDone}
              </h1>
              <p className="mt-2 text-sm text-neutral-600">
                {phase === "resetDone" ? t.resetDoneSub : t.verifyDoneSub}
              </p>
              <Link
                href="/login"
                className="mt-6 inline-block rounded-full bg-[#6C4CF1] text-white font-bold px-6 py-3 text-sm hover:bg-[#5a3dd4] transition-colors"
              >
                {t.goSignIn}
              </Link>
            </div>
          )}

          {phase === "error" && (
            <div className="text-center py-2">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-5">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <p className="text-sm text-neutral-700">{err ?? t.errGeneric}</p>
              <Link
                href="/"
                className="mt-6 inline-block rounded-full border border-black/10 font-bold px-6 py-3 text-sm hover:bg-neutral-50 transition-colors"
              >
                {t.goHome}
              </Link>
            </div>
          )}
        </div>
      </div>
      <MainFooter />
    </main>
  );
}

export default function AuthActionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFB]" />}>
      <ActionInner />
    </Suspense>
  );
}
