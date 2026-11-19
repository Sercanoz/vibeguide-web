"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useT } from "@/components/LanguageProvider";
import { fbAuth, buildAuthHeaders } from "@/lib/firebase-client";
import { API_BASE_URL } from "@/lib/api";

// Web mesajlaşma — backend /api/chat (uygulamayla aynı konuşmalar).
// Rezervasyon konuşmaları ödeme sonrası açılır; ödeme öncesi sorular VibeAsk
// (destek) konuşmasından gider. Gerçek zamanlı kanal yerine yoklama:
// liste 30 sn, açık konuşma 8 sn (uygulama da listeyi 30 sn'de bir yokluyor).

type Conversation = {
  id: number; bookingId: number | null; otherUserId: number; otherUserName: string;
  tourTitle: string; lastMessage: string; lastMessageAt: string; unread: number;
  remainingMessages: number; unlimited: boolean;
};
type Message = { id: number; senderId: number; content: string; isSystem: boolean; createdAt: string };

const L: Record<string, {
  title: string; empty: string; emptySub: string; pick: string; placeholder: string; send: string; back: string;
  remaining: (n: number) => string; limit: string; inappropriate: string; blocked: string; failed: string; support: string; tooLong: string;
}> = {
  en: {
    title: "Messages", empty: "No conversations yet", emptySub: "Ask a question from any tour page, or message your guide after booking.",
    pick: "Select a conversation", placeholder: "Write a message…", send: "Send", back: "Back",
    remaining: (n) => `${n} messages left before booking`, limit: "Message limit reached for this conversation.",
    inappropriate: "Your message contains inappropriate content.", blocked: "You can't send messages in this conversation.",
    failed: "Message could not be sent. Please try again.", support: "VibeGuide support", tooLong: "Max 500 characters",
  },
  tr: {
    title: "Mesajlar", empty: "Henüz konuşman yok", emptySub: "Herhangi bir tur sayfasından soru sorabilir ya da rezervasyondan sonra rehberine yazabilirsin.",
    pick: "Bir konuşma seç", placeholder: "Mesaj yaz…", send: "Gönder", back: "Geri",
    remaining: (n) => `Rezervasyon öncesi ${n} mesaj hakkın kaldı`, limit: "Bu konuşmada mesaj sınırına ulaştın.",
    inappropriate: "Mesajın uygun olmayan içerik içeriyor.", blocked: "Bu konuşmada mesaj gönderemezsin.",
    failed: "Mesaj gönderilemedi. Lütfen tekrar dene.", support: "VibeGuide destek", tooLong: "En fazla 500 karakter",
  },
};

export default function MessagesPage() {
  return <Suspense fallback={<main className="min-h-screen bg-white" />}><MessagesInner /></Suspense>;
}

function MessagesInner() {
  const { locale } = useT();
  const l = L[locale] ?? L.en;
  const dl = locale === "tr" ? "tr-TR" : "en-GB";
  const router = useRouter();
  const search = useSearchParams();
  const activeId = parseInt(search.get("c") ?? "0", 10) || 0;

  const [ready, setReady] = useState(false);
  const [convs, setConvs] = useState<Conversation[] | null>(null);
  const [thread, setThread] = useState<{ id: number; messages: Message[]; remaining: number; unlimited: boolean } | null>(null);
  const [draft, setDraft] = useState(() => search.get("q") ?? "");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const loadConvs = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/conversations`, { headers: await buildAuthHeaders() });
      if (res.ok) setConvs(await res.json());
      else setConvs((c) => c ?? []);
    } catch { setConvs((c) => c ?? []); }
  }, []);

  const loadThread = useCallback(async (id: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/${id}/messages?limit=200`, { headers: await buildAuthHeaders() });
      if (!res.ok) return;
      const d = await res.json();
      setThread({ id, messages: d.messages, remaining: d.remainingMessages, unlimited: d.unlimited });
    } catch { /* bir sonraki yoklamada tekrar denenir */ }
  }, []);

  // Oturum: yoksa girişe yönlendir.
  useEffect(() => {
    const unsub = fbAuth().onAuthStateChanged((u) => {
      if (!u) { router.replace(`/login?next=${encodeURIComponent(`/messages${activeId ? `?c=${activeId}` : ""}`)}`); return; }
      setReady(true);
    });
    return () => unsub();
  }, [router, activeId]);

  // Konuşma listesi: açılışta + 30 sn'de bir.
  useEffect(() => {
    if (!ready) return;
    let alive = true;
    const tick = () => { if (alive) loadConvs(); };
    tick();
    const t = setInterval(tick, 30000);
    return () => { alive = false; clearInterval(t); };
  }, [ready, loadConvs]);

  // Açık konuşma: seçilince + 8 sn'de bir.
  useEffect(() => {
    if (!ready || !activeId) return;
    let alive = true;
    const tick = () => { if (alive) loadThread(activeId); };
    tick();
    const t = setInterval(tick, 8000);
    return () => { alive = false; clearInterval(t); };
  }, [ready, activeId, loadThread]);

  const msgCount = thread?.id === activeId ? thread.messages.length : 0;
  useEffect(() => { endRef.current?.scrollIntoView({ block: "end" }); }, [msgCount]);

  const active = convs?.find((c) => c.id === activeId) ?? null;

  async function send() {
    const content = draft.trim();
    if (!content || !activeId || sending) return;
    setSending(true); setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/chat/${activeId}/messages`, {
        method: "POST",
        headers: await buildAuthHeaders({ extra: { "Content-Type": "application/json" } }),
        body: JSON.stringify({ content }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({} as { error?: string }));
        setError(d.error === "limit_reached" ? l.limit : d.error === "inappropriate_content" ? l.inappropriate
          : d.error === "blocked" ? l.blocked : d.error === "too_long" ? l.tooLong : l.failed);
        return;
      }
      setDraft("");
      await Promise.all([loadThread(activeId), loadConvs()]);
    } catch { setError(l.failed); }
    finally { setSending(false); }
  }

  const name = (c: Conversation) => c.otherUserName || l.support;
  const time = (iso: string) => {
    const d = new Date(iso);
    return d.toDateString() === new Date().toDateString()
      ? d.toLocaleTimeString(dl, { hour: "2-digit", minute: "2-digit" })
      : d.toLocaleDateString(dl, { day: "numeric", month: "short" });
  };

  return (
    <main className="flex h-[100dvh] flex-col bg-white text-neutral-900 antialiased">
      <Navbar />
      <div className="mx-auto flex min-h-0 w-full max-w-6xl flex-1 pt-16">
        {/* Konuşma listesi */}
        <aside className={`${activeId ? "hidden md:flex" : "flex"} w-full min-h-0 flex-col border-neutral-200 md:w-80 md:border-r`}>
          <h1 className="px-4 pb-3 pt-6 font-display text-3xl font-normal md:px-5">{l.title}</h1>
          <ul className="min-h-0 flex-1 overflow-y-auto">
            {convs === null && [0, 1, 2].map((i) => (
              <li key={i} className="flex animate-pulse gap-3 px-5 py-4"><div className="h-10 w-10 rounded-full bg-neutral-100" /><div className="flex-1 space-y-2"><div className="h-3 w-1/2 rounded bg-neutral-100" /><div className="h-3 w-3/4 rounded bg-neutral-100" /></div></li>
            ))}
            {convs?.length === 0 && (
              <li className="px-5 py-10 text-center"><p className="font-semibold">{l.empty}</p><p className="mt-1 text-sm text-neutral-600">{l.emptySub}</p></li>
            )}
            {convs?.map((c) => (
              <li key={c.id}>
                <button type="button" onClick={() => { setError(null); router.push(`/messages?c=${c.id}`); }}
                  className={`flex w-full gap-3 px-4 py-3.5 text-left transition-colors md:px-5 ${c.id === activeId ? "bg-neutral-100" : "hover:bg-neutral-50"}`}>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-sm font-semibold text-neutral-700">{name(c).charAt(0).toUpperCase()}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline justify-between gap-2">
                      <span className={`truncate text-sm ${c.unread ? "font-semibold" : "font-medium"}`}>{name(c)}</span>
                      <span className="shrink-0 text-xs text-neutral-500">{c.lastMessageAt ? time(c.lastMessageAt) : ""}</span>
                    </span>
                    {c.tourTitle && <span className="block truncate text-xs text-neutral-500">{c.tourTitle}</span>}
                    <span className="mt-0.5 flex items-center gap-2">
                      <span className={`truncate text-sm ${c.unread ? "text-neutral-900" : "text-neutral-600"}`}>{c.lastMessage}</span>
                      {c.unread > 0 && <span className="ml-auto flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#5B3FD9] px-1.5 text-[11px] font-semibold text-white">{c.unread}</span>}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Mesajlar */}
        <section className={`${activeId ? "flex" : "hidden md:flex"} min-h-0 min-w-0 flex-1 flex-col`}>
          {!activeId ? (
            <div className="flex flex-1 items-center justify-center text-sm text-neutral-500">{l.pick}</div>
          ) : (
            <>
              <header className="flex items-center gap-3 border-b border-neutral-200 px-4 py-3 md:px-6">
                <button type="button" onClick={() => router.push("/messages")} aria-label={l.back} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100 md:hidden">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                </button>
                <div className="min-w-0">
                  <p className="truncate font-semibold">{active ? name(active) : "…"}</p>
                  {active?.tourTitle && <p className="truncate text-xs text-neutral-500">{active.tourTitle}</p>}
                </div>
              </header>
              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto px-4 py-4 md:px-6" aria-live="polite">
                {thread?.id === activeId && thread.messages.map((m) => {
                  if (m.isSystem) return <p key={m.id} className="mx-auto max-w-md py-1 text-center text-xs text-neutral-500">{m.content}</p>;
                  const mine = active ? m.senderId !== active.otherUserId : false;
                  return (
                    <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[15px] leading-6 ${mine ? "rounded-br-md bg-[#5B3FD9] text-white" : "rounded-bl-md bg-neutral-100 text-neutral-900"}`}>
                        <p className="whitespace-pre-wrap break-words">{m.content}</p>
                        <p className={`mt-0.5 text-right text-[11px] ${mine ? "text-white/70" : "text-neutral-500"}`}>{time(m.createdAt)}</p>
                      </div>
                    </div>
                  );
                })}
                <div ref={endRef} />
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="border-t border-neutral-200 px-4 py-3 md:px-6">
                {error && <p role="alert" className="mb-2 text-sm text-red-700">{error}</p>}
                {thread && !thread.unlimited && thread.remaining >= 0 && (
                  <p className="mb-2 text-xs text-neutral-500">{l.remaining(thread.remaining)}</p>
                )}
                <div className="flex items-end gap-2">
                  <label className="sr-only" htmlFor="msg-input">{l.placeholder}</label>
                  <textarea id="msg-input" value={draft} onChange={(e) => setDraft(e.target.value.slice(0, 500))} rows={1} placeholder={l.placeholder}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                    className="max-h-32 min-h-11 flex-1 resize-none rounded-2xl border border-neutral-300 px-4 py-2.5 text-base focus:border-[#5B3FD9] focus:outline-none focus:ring-[3px] focus:ring-[#5B3FD9]/15" />
                  <button type="submit" disabled={sending || !draft.trim()}
                    className="h-11 shrink-0 rounded-full bg-[#5B3FD9] px-5 text-sm font-semibold text-white hover:bg-[#4A32B8] disabled:opacity-50">
                    {l.send}
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
