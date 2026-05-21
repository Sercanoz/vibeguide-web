"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useT } from "@/components/LanguageProvider";
import { fetchPublicTrip, type TripResponse } from "@/lib/api";
import { trip as tripDict, legalLocale } from "@/lib/legal-content";

type InitialState =
  | { kind: "data"; data: TripResponse }
  | { kind: "error"; status: number };

export default function TripView({
  token,
  initial,
}: {
  token: string;
  initial: InitialState;
}) {
  const { locale } = useT();
  const c = tripDict[legalLocale(locale)];

  const [state, setState] = useState<InitialState>(initial);
  const [refreshing, setRefreshing] = useState(false);
  const lastFetchRef = useRef<number>(Date.now());

  // Poll active tours every 10s
  useEffect(() => {
    if (state.kind !== "data" || state.data.status !== "active") return;

    const tick = async () => {
      const r = await fetchPublicTrip(token);
      if (r.ok) {
        setState({ kind: "data", data: r.data });
        lastFetchRef.current = Date.now();
      }
    };
    const id = setInterval(tick, 10_000);
    return () => clearInterval(id);
  }, [token, state]);

  const onRefresh = async () => {
    setRefreshing(true);
    const r = await fetchPublicTrip(token);
    setRefreshing(false);
    if (r.ok) {
      setState({ kind: "data", data: r.data });
    }
  };

  // 404 / network error
  if (state.kind === "error") {
    return (
      <Frame>
        <BigCard
          icon="🚫"
          title={c.errorTitle}
          body={c.errorBody}
          tone="muted"
        />
        <Cta c={c} />
      </Frame>
    );
  }

  const data = state.data;

  if (data.status === "ended") {
    return (
      <Frame>
        <BigCard
          icon="✅"
          title={c.completedTitle}
          body={c.completedBody}
          tone="success"
        />
        <p className="mt-6 text-sm text-vg-muted text-center">
          {c.reassureFooter}
        </p>
        <Cta c={c} />
      </Frame>
    );
  }

  // status === "active"
  const loc = data.location;
  const tourStarted = loc?.tourStarted === true;
  const mapsUrl = loc
    ? `https://www.google.com/maps?q=${loc.guideLat},${loc.guideLng}`
    : null;

  return (
    <Frame>
      <div className="rounded-3xl overflow-hidden border border-vg-border shadow-2xl shadow-purple-500/10 bg-white">
        {/* Live banner */}
        <div className="bg-flash-gradient px-5 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
            </span>
            <span className="text-xs font-black uppercase tracking-widest">
              {tourStarted ? c.liveBadge : c.notStartedTitle}
            </span>
          </div>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="text-xs font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors disabled:opacity-50"
          >
            {refreshing ? "…" : `↻ ${c.refreshLabel}`}
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-vg-ink">
            {tourStarted ? c.liveTitle : c.notStartedTitle}
          </h1>
          {tourStarted ? (
            <p className="mt-1 text-sm text-vg-muted">{c.liveSubtitle}</p>
          ) : (
            <p className="mt-1 text-sm text-vg-muted">{c.notStartedBody}</p>
          )}

          <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.tourTitle && (
              <Field label={c.meetingLabel} value={data.tourTitle} />
            )}
            {data.guideName && (
              <Field label={c.guideLabel} value={data.guideName} />
            )}
            {data.scheduledAt && (
              <Field
                label={c.startedLabel}
                value={new Date(data.scheduledAt).toLocaleString(locale)}
              />
            )}
            {loc && (
              <Field
                label="ETA"
                value={
                  loc.eta
                    ? loc.eta
                    : `${Math.round(loc.distanceMeters)} m`
                }
              />
            )}
          </dl>

          {loc && mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center gap-2 bg-vibe-gradient text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-purple-500/30 hover:scale-[1.03] transition-transform"
            >
              📍 Open in Google Maps
            </a>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-vg-muted text-center">
        {c.reassureFooter}
      </p>
      <Cta c={c} />
    </Frame>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-vg-bg-soft py-12 md:py-20">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 group"
        >
          <Image
            src="/app-icon.png"
            alt="VibeGuide"
            width={32}
            height={32}
            className="rounded-lg shadow-md shadow-purple-500/20"
          />
          <span className="font-black text-lg tracking-tight text-vibe-gradient">
            VibeGuide
          </span>
        </Link>
        {children}
      </div>
    </main>
  );
}

function BigCard({
  icon,
  title,
  body,
  tone,
}: {
  icon: string;
  title: string;
  body: string;
  tone: "muted" | "success";
}) {
  return (
    <div
      className={`rounded-3xl p-8 md:p-10 text-center border ${
        tone === "success"
          ? "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200"
          : "bg-white border-vg-border"
      } shadow-xl`}
    >
      <div className="text-6xl mb-3">{icon}</div>
      <h1 className="text-2xl md:text-3xl font-black tracking-tight text-vg-ink">
        {title}
      </h1>
      <p className="mt-3 text-vg-muted leading-relaxed">{body}</p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-vg-bg-soft rounded-2xl px-4 py-3 border border-vg-border">
      <dt className="text-[10px] font-black uppercase tracking-widest text-vg-muted">
        {label}
      </dt>
      <dd className="mt-1 text-base font-bold text-vg-ink">{value}</dd>
    </div>
  );
}

function Cta({
  c,
}: {
  c: { ctaInstall: string; ctaInstallSub: string };
}) {
  return (
    <div className="mt-10 rounded-3xl bg-vg-ink text-white p-6 md:p-8 text-center">
      <p className="text-xs font-black uppercase tracking-widest text-vg-amber">
        {c.ctaInstall}
      </p>
      <p className="mt-2 text-lg font-bold">{c.ctaInstallSub}</p>
      <div className="mt-5 flex flex-wrap gap-3 justify-center">
        <a
          href="https://play.google.com/store/apps/details?id=com.vibeguide"
          className="bg-white text-vg-ink px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <span>▶</span> Google Play
        </a>
        <a
          href="https://apps.apple.com/app/vibeguide"
          className="bg-white text-vg-ink px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <span>📱</span> App Store
        </a>
      </div>
    </div>
  );
}
