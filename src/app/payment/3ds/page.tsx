"use client";

import { useEffect, useState } from "react";

/**
 * 3DS ara sayfası.
 *
 * Checkout, backend'den gelen base64 3DS HTML'ini sessionStorage'a yazıp
 * buraya yönlendirir (HTML uzun ve kart bağlamı taşır → URL'e konmaz).
 *
 * Banka HTML'i ANA PENCEREDE document.write ile yazılır — iframe DEĞİL.
 * iframe denendi ve kırıldı: banka onayı sonrası callback bizim success
 * sayfamıza dönüyor, dönüş iframe içinde olduğu için `frame-ancestors 'none'`
 * kendi sitemizi bloklayıp akışı "bağlanmayı reddetti" ile kilitliyordu.
 * Ana pencerede yazınca 3DS → callback → success normal top-level navigasyon
 * olur ve bu route'un gevşetilmiş form-action CSP'si geçerli kalır.
 */

const STORAGE_KEY = "vg_3ds_html";

export default function ThreeDsPage() {
  const [missing, setMissing] = useState(false);

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

    let html: string;
    try {
      // base64 → UTF-8 (banka sayfasında Türkçe karakterler var).
      const bin = window.atob(raw);
      const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
      html = new TextDecoder("utf-8").decode(bytes);
    } catch {
      setMissing(true);
      return;
    }

    // Bankanın sayfasını bu pencereye yaz. Kendi <head>'imiz (gtag vb.) gider;
    // zaten istenen bu — sayfa tamamen bankaya devredilir.
    document.open();
    document.write(html);
    document.close();
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
            href="/profile"
            className="inline-block rounded-full bg-[#6C4CF1] px-6 py-3 font-semibold text-white"
          >
            Back to my bookings
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400">Redirecting to secure payment…</p>
    </main>
  );
}
