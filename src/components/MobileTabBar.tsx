"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useT } from "./LanguageProvider";
import { fbAuth } from "@/lib/firebase-client";

// AuthModal yalnız misafir "Giriş" sekmesine dokunursa yüklenir.
const AuthModal = dynamic(() => import("./AuthModal"), { ssr: false });

// Mobil alt sekme çubuğu (md altı). Kendi alt çubuğu/akışı olan sayfalarda gizli:
// tur detayı + rezervasyon adımları, ödeme, admin, giriş/kayıt/doğrulama ekranları.
const HIDDEN = [/^\/tours\/[^/]+/, /^\/admin/, /^\/payment/, /^\/auth/, /^\/login/, /^\/register/, /^\/verif/, /^\/guide\//, /^\/trip/, /^\/messages/];

const L: Record<string, { explore: string; tours: string; groups: string; profile: string; signIn: string; nav: string }> = {
  en: { explore: "Explore", tours: "Tours", groups: "Groups", profile: "Profile", signIn: "Sign in", nav: "Main" },
  tr: { explore: "Keşfet", tours: "Turlar", groups: "Gruplar", profile: "Profil", signIn: "Giriş", nav: "Ana menü" },
};

export default function MobileTabBar() {
  const pathname = usePathname() ?? "/";
  const { locale } = useT();
  const l = L[locale] ?? L.en;
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [modal, setModal] = useState(false);

  useEffect(() => fbAuth().onAuthStateChanged((u) => setAuthed(!!u)), []);

  if (HIDDEN.some((r) => r.test(pathname))) return null;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const item = "flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-1.5 text-[11px] font-medium";
  const cls = (href: string) => `${item} ${isActive(href) ? "text-neutral-900" : "text-neutral-500"}`;

  return (
    <>
      <div className="h-16 md:hidden" aria-hidden="true" />
      <nav aria-label={l.nav}
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-neutral-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden">
        <Link href="/" className={cls("/")} aria-current={isActive("/") ? "page" : undefined}>
          <TabIcon active={isActive("/")}><circle cx="12" cy="12" r="10" /><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" /></TabIcon>
          {l.explore}
        </Link>
        <Link href="/tours" className={cls("/tours")} aria-current={isActive("/tours") ? "page" : undefined}>
          <TabIcon active={isActive("/tours")}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></TabIcon>
          {l.tours}
        </Link>
        <Link href="/pools" className={cls("/pools")} aria-current={isActive("/pools") ? "page" : undefined}>
          <TabIcon active={isActive("/pools")}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></TabIcon>
          {l.groups}
        </Link>
        {authed ? (
          <Link href="/profile" className={cls("/profile")} aria-current={isActive("/profile") ? "page" : undefined}>
            <TabIcon active={isActive("/profile")}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></TabIcon>
            {l.profile}
          </Link>
        ) : (
          <button type="button" onClick={() => setModal(true)} className={`${item} text-neutral-500`}>
            <TabIcon active={false}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" /></TabIcon>
            {l.signIn}
          </button>
        )}
      </nav>
      {modal && <AuthModal initialMode="signin" onClose={() => setModal(false)} />}
    </>
  );
}

function TabIcon({ children, active }: { children: React.ReactNode; active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.25 : 1.75}
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
  );
}
