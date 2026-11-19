"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";
import { track } from "@/lib/analytics";

// Ödeme öncesi soru: VibeAsk destek konuşmasını açar (POST /api/chat/vibeask —
// rezervasyonsuz, mesaj limiti 30) ve mesaj kutusunu tur adıyla doldurur.
// Rezervasyon sonrası rehberle konuşma ayrı (ödeme yapılınca otomatik açılır).

const L: Record<string, { ask: string; prefill: (t: string) => string; unavailable: string }> = {
  en: { ask: "Ask a question about this tour", prefill: (t) => `Hi! I have a question about "${t}": `, unavailable: "Messaging is unavailable right now. Please use the contact page." },
  tr: { ask: "Bu tur hakkında soru sor", prefill: (t) => `Merhaba! "${t}" turu hakkında bir sorum var: `, unavailable: "Mesajlaşma şu an kullanılamıyor. Lütfen iletişim sayfasını kullan." },
};

export default function AskQuestionButton({ tourId, tourTitle, locale }: { tourId: number; tourTitle: string; locale: string }) {
  const l = L[locale] ?? L.en;
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    if (!fbAuth().currentUser) { router.push(`/login?next=${encodeURIComponent(`/tours/${tourId}`)}`); return; }
    setBusy(true); setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/vibeask`, { method: "POST", headers: await buildAuthHeaders() });
      if (!res.ok) { setError(l.unavailable); return; }
      const d: { conversationId: number } = await res.json();
      track("ask_question", { tour_id: tourId });
      router.push(`/messages?c=${d.conversationId}&q=${encodeURIComponent(l.prefill(tourTitle))}`);
    } catch {
      setError(l.unavailable);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={onClick} disabled={busy}
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-900 underline underline-offset-4 hover:text-[#5B3FD9] disabled:opacity-50">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        {l.ask}
      </button>
      {error && <p role="alert" className="mt-1 text-xs text-red-700">{error}</p>}
    </div>
  );
}
