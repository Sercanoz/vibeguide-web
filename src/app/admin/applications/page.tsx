"use client";

import { useEffect, useRef, useState } from "react";
import { adminApi, type GuideApplication } from "@/lib/admin-api";

type StatusFilter = "Pending" | "Approved" | "Rejected";

function StatusBadge({ status }: { status: string }) {
  const color =
    status === "Pending" ? "bg-amber-100 text-amber-700" :
    status === "Approved" ? "bg-green-100 text-green-700" :
    "bg-red-100 text-red-700";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${color}`}>
      {status === "Pending" ? "Beklemede" : status === "Approved" ? "Onaylandı" : "Reddedildi"}
    </span>
  );
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<GuideApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<StatusFilter>("Pending");
  const [acting, setActing] = useState<number | null>(null);
  const [flash, setFlash] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  function showFlash(msg: string, type: "ok" | "err" = "ok") {
    setFlash({ msg, type });
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setFlash(null), 4000);
  }

  async function loadTab(status: StatusFilter) {
    setLoading(true);
    setError(null);
    const res = await adminApi.listApplications(status);
    if (res.ok) {
      setApplications(res.data);
    } else {
      setError(res.error ?? "Başvurular yüklenemedi");
    }
    setLoading(false);
  }

  useEffect(() => { loadTab(tab); }, [tab]);

  async function approve(id: number) {
    setActing(id);
    const res = await adminApi.approveApplication(id);
    if (res.ok) {
      setApplications((prev) => prev.filter((a) => a.id !== id));
      showFlash("Başvuru onaylandı.", "ok");
    } else {
      showFlash(res.error ?? "Onay başarısız", "err");
    }
    setActing(null);
  }

  async function reject(id: number) {
    const reason = window.prompt("Reddedilme sebebi girin:");
    if (!reason) return;
    setActing(id);
    const res = await adminApi.rejectApplication(id, reason);
    if (res.ok) {
      setApplications((prev) => prev.filter((a) => a.id !== id));
      showFlash("Başvuru reddedildi.", "ok");
    } else {
      showFlash(res.error ?? "Red işlemi başarısız", "err");
    }
    setActing(null);
  }

  const TABS: StatusFilter[] = ["Pending", "Approved", "Rejected"];

  return (
    <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10">
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="KYC" className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl" />
        </div>
      )}

      <h1 className="text-2xl font-black tracking-tight text-vg-ink">Rehber Başvuruları</h1>
      <p className="mt-1 text-sm text-vg-muted">KYC fotoğraflarını incele ve başvuruları onayla veya reddet.</p>

      {flash && (
        <div className={`mt-3 rounded-xl px-4 py-3 text-sm font-semibold border ${
          flash.type === "ok"
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          {flash.msg}
        </div>
      )}

      {/* Tabs */}
      <div className="mt-6 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
              tab === t
                ? "bg-vg-primary text-white border-vg-primary"
                : "bg-white text-vg-muted border-vg-border hover:border-vg-primary hover:text-vg-primary"
            }`}
          >
            {t === "Pending" ? "Beklemede" : t === "Approved" ? "Onaylı" : "Reddedilmiş"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-vg-muted text-sm">Yükleniyor…</div>
      ) : error ? (
        <div className="mt-8 rounded-2xl bg-white border border-vg-border p-10 text-center text-red-600 font-semibold text-sm shadow-sm">
          {error}
        </div>
      ) : applications.length === 0 ? (
        <div className="mt-8 rounded-2xl bg-white border border-vg-border p-10 text-center text-vg-muted text-sm shadow-sm">
          Bu kategoride başvuru yok ✓
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          {applications.map((app) => (
            <div key={app.id} className="rounded-2xl bg-white border border-vg-border p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-vg-ink text-sm">{app.fullName}</span>
                    <span className="text-xs text-vg-muted">#{app.id}</span>
                    <StatusBadge status={app.status} />
                  </div>
                  <p className="mt-0.5 text-xs text-vg-muted">
                    {app.email} · Başvuru: {new Date(app.appliedAt).toLocaleDateString("tr-TR")}
                  </p>
                  {app.rejectionReason && (
                    <p className="mt-2 text-xs text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                      Red sebebi: {app.rejectionReason}
                    </p>
                  )}

                  {/* KYC thumbnails */}
                  {app.kycPhotoUrls && app.kycPhotoUrls.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {app.kycPhotoUrls.map((url, i) => (
                        <button
                          key={i}
                          onClick={() => setLightbox(url)}
                          className="rounded-xl overflow-hidden border border-vg-border hover:border-vg-primary transition-colors"
                          title={`KYC fotoğraf ${i + 1}`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={url}
                            alt={`KYC ${i + 1}`}
                            className="w-20 h-20 object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {tab === "Pending" && (
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <button
                      disabled={acting === app.id}
                      onClick={() => approve(app.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors disabled:opacity-50 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    >
                      Onayla
                    </button>
                    <button
                      disabled={acting === app.id}
                      onClick={() => reject(app.id)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors disabled:opacity-50 bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                    >
                      Reddet
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
