"use client";

import { usePathname } from "next/navigation";
import { useT } from "@/components/LanguageProvider";
import { track } from "@/lib/analytics";
import { WHATSAPP_NUMBER } from "@/lib/contact";

// Sitenin her yerinde sağ altta WhatsApp destek butonu.
// Ödeme, admin, giriş ve mesajlaşma ekranlarında gösterilmez (dikkat dağıtmasın).
const HIDDEN = [/^\/admin/, /^\/payment/, /^\/auth/, /^\/login/, /^\/register/, /^\/verif/, /^\/messages/, /\/checkout/];
// MobileTabBar'ın göründüğü yollar dışında, mobilde alt şeridi olan sayfalar.
const HAS_BOTTOM_CTA = [/^\/tours\/[^/]+$/];
const TABBAR_HIDDEN = [/^\/tours\/[^/]+/, /^\/guide\//, /^\/trip/];

export default function WhatsAppButton() {
  const pathname = usePathname() ?? "/";
  const { locale } = useT();
  if (!WHATSAPP_NUMBER || HIDDEN.some((r) => r.test(pathname))) return null;

  const tr = locale === "tr";
  const text = tr
    ? "Merhaba VibeGuide, bir sorum var:"
    : "Hi VibeGuide, I have a question:";
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

  // Mobilde alt menü (h-16) ya da turun "Rezervasyon" şeridi varsa üstünde dur.
  const mobileBottom = HAS_BOTTOM_CTA.some((r) => r.test(pathname))
    ? "bottom-24"
    : TABBAR_HIDDEN.some((r) => r.test(pathname))
      ? "bottom-5"
      : "bottom-20";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("contact_whatsapp", { page_path: pathname })}
      aria-label={tr ? "WhatsApp ile yaz" : "Chat on WhatsApp"}
      className={`fixed right-4 ${mobileBottom} z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 md:bottom-6 md:right-6 md:h-14 md:w-14`}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35ZM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.39 9.39 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43Zm8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.28l5.68-1.49a11.32 11.32 0 0 0 5.77 1.47h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02Z" />
      </svg>
    </a>
  );
}
