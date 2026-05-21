"use client";

import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as fbSignOut,
  onIdTokenChanged,
  type User,
  type Auth,
} from "firebase/auth";

/// Web SDK config — keys are public per Firebase docs.
/// All values can be overridden via NEXT_PUBLIC_* env vars.
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
    "AIzaSyA2cace0CczAkLrmbjnHxWXEPUZYbfKg1w",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    "vibeguide-2da83.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "vibeguide-2da83",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    "vibeguide-2da83.appspot.com",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "185953014325",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
    "1:185953014325:web:59143b3fcc121d4d39177c",
};

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

export function fbApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("Firebase client is browser-only");
  }
  if (_app) return _app;
  _app = getApps()[0] ?? initializeApp(firebaseConfig);
  return _app;
}

export function fbAuth(): Auth {
  if (_auth) return _auth;
  _auth = getAuth(fbApp());
  return _auth;
}

export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const cred = await signInWithPopup(fbAuth(), provider);
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
