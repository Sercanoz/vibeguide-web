"use client";

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  initializeAppCheck,
  ReCaptchaV3Provider,
  getToken as getAppCheckTokenRaw,
  type AppCheck,
} from "firebase/app-check";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  onIdTokenChanged,
  type User,
  type Auth,
} from "firebase/auth";

/// Web SDK config — keys are public per Firebase docs.
/// All values can be overridden via NEXT_PUBLIC_* env vars.
if (
  !process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
  !process.env.NEXT_PUBLIC_FIREBASE_APP_ID
) {
  console.warn(
    "[VibeGuide] NEXT_PUBLIC_FIREBASE_* env vars not set. Set them in Vercel environment variables."
  );
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _appCheck: AppCheck | null = null;

export function fbApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("Firebase client is browser-only");
  }
  if (_app) return _app;
  _app = getApps()[0] ?? initializeApp(firebaseConfig);
  // App Check (reCAPTCHA v3) — backend AppCheckMiddleware'in beklediği
  // X-Firebase-AppCheck token'ını üretir. Site key yoksa init atlanır
  // (lokal/dev'de güvenli no-op; backend AppCheck:Enabled=false ise zaten gerekmez).
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (siteKey && !_appCheck) {
    try {
      _appCheck = initializeAppCheck(_app, {
        provider: new ReCaptchaV3Provider(siteKey),
        isTokenAutoRefreshEnabled: true,
      });
    } catch {
      // Çift init / SSR kenar durumlarını yut.
    }
  }
  return _app;
}

/// App Check token'ı al (backend X-Firebase-AppCheck header'ı için).
/// Site key yoksa veya init olmadıysa null döner → header eklenmez.
export async function getAppCheckToken(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  fbApp(); // init'i garanti et
  if (!_appCheck) return null;
  try {
    const res = await getAppCheckTokenRaw(_appCheck, /* forceRefresh */ false);
    return res.token;
  } catch (e) {
    console.error("[AppCheck DEBUG] getToken FAILED:", e);
    return null;
  }
}

/// Authenticated backend istekleri için header seti: Firebase ID token +
/// (varsa) App Check token. Mevcut `user.getIdToken()` + elle Authorization
/// kalıbının yerine geçer; App Check header'ını tek yerden ekler.
/// Oturum yoksa Authorization eklenmez (çağıran 401'i kendi ele alır).
export async function buildAuthHeaders(
  opts?: { forceRefresh?: boolean; extra?: Record<string, string> }
): Promise<Record<string, string>> {
  const headers: Record<string, string> = { ...(opts?.extra ?? {}) };
  const user = fbAuth().currentUser;
  if (user) {
    try {
      const token = await user.getIdToken(opts?.forceRefresh ?? false);
      headers["Authorization"] = `Bearer ${token}`;
    } catch {
      // token alınamadı → Authorization eklenmez
    }
  }
  const appCheck = await getAppCheckToken();
  if (appCheck) headers["X-Firebase-AppCheck"] = appCheck;
  return headers;
}

/// Public (auth gerektirmeyen) backend istekleri için: yalnızca App Check
/// header'ı (varsa). /api/public/* gibi anonim ama App Check'li akışlar için.
export async function buildAppCheckHeaders(
  extra?: Record<string, string>
): Promise<Record<string, string>> {
  const headers: Record<string, string> = { ...(extra ?? {}) };
  const appCheck = await getAppCheckToken();
  if (appCheck) headers["X-Firebase-AppCheck"] = appCheck;
  return headers;
}

export function fbAuth(): Auth {
  if (_auth) return _auth;
  _auth = getAuth(fbApp());
  return _auth;
}

export async function registerWithEmail(email: string, password: string): Promise<User> {
  // Firebase hesabını oluştur. Doğrulama maili Firebase'in kendi (spam'e düşen)
  // sisteminden değil, backend /api/auth/send-verification → Resend ile gönderilir.
  const cred = await createUserWithEmailAndPassword(fbAuth(), email, password);
  return cred.user;
}

export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const cred = await signInWithPopup(fbAuth(), provider);
  return cred.user;
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(fbAuth(), email, password);
  return cred.user;
}

export async function signOut(): Promise<void> {
  await fbSignOut(fbAuth());
}

export { onIdTokenChanged };
export type { User };

/// Get current Firebase ID token for backend Authorization header.
/// Backend resolves Firebase UID → DB user row → enforces RequireAdmin policy.
/// Frontend just trusts; on 401/403 the API client surfaces the error.
export async function getIdToken(user: User | null): Promise<string | null> {
  if (!user) return null;
  try {
    return await user.getIdToken();
  } catch {
    return null;
  }
}
