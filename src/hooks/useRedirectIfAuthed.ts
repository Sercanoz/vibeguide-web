"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fbAuth } from "@/lib/firebase-client";

/**
 * Redirects already-signed-in (and email-verified) users away from auth pages
 * (login / register) to their profile. Returns `checking` so the page can
 * show a loader instead of flashing the form to a logged-in user.
 */
export function useRedirectIfAuthed(to: string = "/profile") {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged(async (user) => {
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          router.replace(to);
          return; // keep `checking` true → loader stays until navigation
        }
      }
      setChecking(false);
    });
    return () => unsub();
  }, [router, to]);

  return checking;
}
