"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 3DS ara sayfası.
 *
 * Checkout, backend'den gelen base64 3DS HTML'ini sessionStorage'a yazıp
 * buraya yönlendirir (HTML uzun ve kart bağlamı taşır → URL'e konmaz).
 * Burada içerik bir iframe'e srcdoc ile verilir; iframe içindeki form
 * kullanıcıyı bankanın ACS sayfasına POST eder.
 *
 * Neden iframe: HTML'i document.write ile ana sayfaya yazmak Next.js'in
 * CSP'sini miras alır ve form-action bankaya POST'u bloklar. Bu route için
 * middleware ayrı (gevşetilmiş form-action) bir CSP gönderiyor.
 */

const STORAGE_KEY = "vg_3ds_html";

export default function ThreeDsPage() {
  const [html, setHtml] = useState<string | null>(null);
  const [missing, setMissing] = useState(false);
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    let raw: string | null = null;
    try {
      raw = sessionStorage.getItem(STORAGE_KEY);
      // Tek kullanımlık: geri tuşuyla dönülüp tekrar POST edilmesin.
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      raw = null;
    }

    if (!raw) {
      setMissing(true);
      return;
    }

    try {
      // base64 → UTF-8 (banka sayfasında Türkçe karakterler var).
      const bin = window.atob(raw);
      const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
      setHtml(new TextDecoder("utf-8").decode(bytes));
    } catch {
      setMissing(true);
    }
  }, []);

  if (missing) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-xl font-bold mb-2">Payment session expired</h1>
          <p className="text-gray-400 mb-6">
            Please return to your booking and start the payment again.
          </p>
          <a
            href="/bookings"
            className="inline-block rounded-full bg-[#6C4CF1] px-6 py-3 font-semibold text-white"
          >
            Back to my bookings
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col">
      {!html && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-400">Redirecting to secure payment…</p>
        </div>
      )}
      {html && (
        <iframe
          ref={frameRef}
          srcDoc={html}
          title="3D Secure"
          // allow-top-navigation: banka ACS'i onay sonrası üst pencereyi
          // callback URL'ine taşıyabilsin (aksi halde akış iframe'de kilitlenir).
          sandbox="allow-forms allow-scripts allow-same-origin allow-top-navigation allow-top-navigation-by-user-activation"
          className="flex-1 w-full border-0"
          style={{ minHeight: "100vh" }}
        />
      )}
    </main>
  );
}
