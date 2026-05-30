"use client";

import { usePathname } from "next/navigation";
import EmailCaptureModal from "./EmailCaptureModal";

// Only show the lead-capture popup on public marketing/booking pages.
const HIDDEN_PREFIXES = ["/admin", "/profile", "/login", "/register", "/verify", "/verified", "/guide/pending"];

export default function EmailCaptureGate() {
  const pathname = usePathname();
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;
  return <EmailCaptureModal />;
}
